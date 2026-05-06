#!/usr/bin/env python3
"""
open_pr.py
MCF Weekly News Monitor -- Step 4: Commit drafts and open a GitHub PR.

Reads all draft files generated today, commits them to a new branch,
updates data/brand-news.json, and opens a pull request for review.

Usage:
    python open_pr.py [--date YYYY-MM-DD] [--dry-run]

Options:
    --date      Match the date used in previous steps (default: today)
    --dry-run   Print what would be committed without touching GitHub
"""

import argparse
import base64
import json
import os
import sys
from datetime import datetime
from pathlib import Path

from github import Github, GithubException

SCRIPT_DIR = Path(__file__).parent
REPO_ROOT  = SCRIPT_DIR.parent.parent
DRAFTS_DIR = REPO_ROOT / "drafts" / "news"
INDIV_DIR  = DRAFTS_DIR / "individual"
DATA_DIR   = REPO_ROOT / "data"

REPO_NAME  = "yigyo/massagechairfinder"
BASE_BRANCH = "main"


def load_json(path: Path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def collect_draft_files(date_str: str) -> list[tuple[Path, str]]:
    """
    Collect all files to include in the PR.
    Returns list of (local_path, repo_relative_path) tuples.
    """
    files = []

    # Weekly roundup
    roundup = DRAFTS_DIR / f"weekly-roundup-{date_str}.md"
    if roundup.exists():
        files.append((roundup, f"drafts/news/weekly-roundup-{date_str}.md"))

    # Individual articles
    if INDIV_DIR.exists():
        for f in sorted(INDIV_DIR.glob(f"{date_str}-*.md")):
            files.append((f, f"drafts/news/individual/{f.name}"))

    # Updated brand-news.json
    brand_news = DATA_DIR / "brand-news.json"
    if brand_news.exists():
        files.append((brand_news, "data/brand-news.json"))

    # Raw and classified story data (for audit trail)
    for prefix in [f"raw_stories_{date_str}", f"classified_stories_{date_str}"]:
        p = DRAFTS_DIR / f"{prefix}.json"
        if p.exists():
            files.append((p, f"drafts/news/{prefix}.json"))

    return files


def build_pr_body(date_str: str, classified_path: Path, draft_files: list) -> str:
    """Build a descriptive PR body summarizing what's in this week's run."""
    lines = [
        f"## MCF Weekly News Monitor -- {date_str}",
        "",
        "This PR was generated automatically by the weekly news monitor pipeline.",
        "Review the drafts below, edit as needed, then merge to publish.",
        "",
    ]

    # Story summary from classified file
    if classified_path.exists():
        data     = load_json(classified_path)
        stories  = data.get("stories", [])
        total    = len(stories)
        skipped  = sum(1 for s in stories if s.get("content_action") == "skip")
        actionable = total - skipped

        from collections import Counter
        actions = Counter(
            s["content_action"] for s in stories if s.get("content_action") != "skip"
        )
        cats = Counter(
            s["category"] for s in stories if s.get("content_action") != "skip"
        )

        lines += [
            f"### Stories This Week",
            f"- Total fetched: {total}",
            f"- Actionable: {actionable}",
            f"- Skipped (off-topic/duplicate): {skipped}",
            "",
        ]

        if actions:
            lines.append("**By content action:**")
            for action, count in sorted(actions.items()):
                lines.append(f"- {action}: {count}")
            lines.append("")

        # High-value stories
        high_val = sorted(
            [s for s in stories if (s.get("relevance_score") or 0) >= 7],
            key=lambda x: -(x.get("relevance_score") or 0),
        )
        if high_val:
            lines.append("### High-Value Stories (score >= 7)")
            for s in high_val:
                score  = s.get("relevance_score", "?")
                title  = s.get("title", "")[:80]
                action = s.get("content_action", "")
                lines.append(f"- [{score}] **{action}** -- {title}")
            lines.append("")

    # Draft files included
    draft_names = [repo_path for _, repo_path in draft_files
                   if repo_path.endswith(".md")]
    if draft_names:
        lines.append("### Draft Files in This PR")
        for name in draft_names:
            lines.append(f"- `{name}`")
        lines.append("")

    lines += [
        "### Review Checklist",
        "- [ ] No invented specs -- all figures attributed to the brand or marked as preliminary",
        "- [ ] No em dashes in copy",
        "- [ ] At least 5 internal links per article, including /finder",
        "- [ ] Voice reads like MCF editorial, not a press release",
        "- [ ] Brand names and model names match chairs.ts naming conventions",
        "",
        "Merge this PR when the drafts are approved. Vercel will deploy automatically.",
    ]

    return "\n".join(lines)


def commit_files_to_branch(
    repo,
    branch_name: str,
    files: list[tuple[Path, str]],
    date_str: str,
    dry_run: bool = False,
) -> None:
    """Create a branch and commit all draft files to it."""
    if dry_run:
        print(f"  [DRY RUN] Would create branch: {branch_name}")
        for local, repo_path in files:
            size = local.stat().st_size
            print(f"  [DRY RUN] Would commit: {repo_path} ({size:,} bytes)")
        return

    # Get the SHA of the base branch
    base_ref = repo.get_branch(BASE_BRANCH)
    base_sha = base_ref.commit.sha

    # Create new branch
    try:
        repo.create_git_ref(ref=f"refs/heads/{branch_name}", sha=base_sha)
        print(f"  Created branch: {branch_name}")
    except GithubException as e:
        if e.status == 422:
            print(f"  Branch {branch_name} already exists -- updating")
        else:
            raise

    # Commit each file
    commit_message = f"news-monitor: weekly drafts {date_str}"
    for local_path, repo_path in files:
        content = local_path.read_bytes()
        content_encoded = base64.b64encode(content).decode()

        try:
            # Try to get existing file SHA (needed for updates)
            existing = repo.get_contents(repo_path, ref=branch_name)
            repo.update_file(
                path=repo_path,
                message=commit_message,
                content=content,
                sha=existing.sha,
                branch=branch_name,
            )
            print(f"  Updated: {repo_path}")
        except GithubException as e:
            if e.status == 404:
                repo.create_file(
                    path=repo_path,
                    message=commit_message,
                    content=content,
                    branch=branch_name,
                )
                print(f"  Created: {repo_path}")
            else:
                raise


def main():
    parser = argparse.ArgumentParser(description="MCF News Monitor -- open PR step")
    parser.add_argument("--date",    default=datetime.now().strftime("%Y-%m-%d"))
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        print("[ERR] GITHUB_TOKEN not set")
        sys.exit(1)

    print(f"=== MCF Open PR: {args.date} ===\n")

    # Collect files
    draft_files = collect_draft_files(args.date)
    if not draft_files:
        print("[WARN] No draft files found for this date. Nothing to PR.")
        print("       Check that generate_content.py ran successfully.")
        sys.exit(0)

    print(f"Files to include in PR: {len(draft_files)}")
    for _, repo_path in draft_files:
        print(f"  {repo_path}")
    print()

    classified_path = DRAFTS_DIR / f"classified_stories_{args.date}.json"
    branch_name     = f"news-{args.date}"
    pr_title        = f"[News] Weekly drafts -- {args.date}"
    pr_body         = build_pr_body(args.date, classified_path, draft_files)

    if args.dry_run:
        print(f"[DRY RUN] Branch: {branch_name}")
        print(f"[DRY RUN] PR title: {pr_title}")
        print(f"\n[DRY RUN] PR body preview:\n{pr_body[:600]}...")
        commit_files_to_branch(None, branch_name, draft_files, args.date, dry_run=True)
        return 0

    g    = Github(token)
    repo = g.get_repo(REPO_NAME)

    # Commit files to new branch
    print("[Committing files...]")
    commit_files_to_branch(repo, branch_name, draft_files, args.date)
    print()

    # Open PR
    print("[Opening PR...]")
    try:
        pr = repo.create_pull(
            title=pr_title,
            body=pr_body,
            head=branch_name,
            base=BASE_BRANCH,
        )
        pr.add_to_labels("news-draft")
        print(f"\n[Done] PR opened: {pr.html_url}")
        print(f"       Review, edit if needed, then merge to publish.")
    except GithubException as e:
        if e.status == 422 and "pull request already exists" in str(e).lower():
            print(f"[INFO] PR already open for branch {branch_name}")
        else:
            raise

    return 0


if __name__ == "__main__":
    sys.exit(main())
