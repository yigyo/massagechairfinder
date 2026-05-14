#!/usr/bin/env python3
"""
open_pr.py
MCF Discussion Monitor -- Step 4: Commit VOC report and open a GitHub PR.

Usage:
    python open_pr.py [--date YYYY-MM-DD] [--dry-run]
"""

import argparse
import json
import os
import sys
from datetime import datetime
from pathlib import Path

from github import Github, GithubException

SCRIPT_DIR  = Path(__file__).parent
REPO_ROOT   = SCRIPT_DIR.parent.parent
OUTPUT_DIR  = REPO_ROOT / "drafts" / "voc"

REPO_NAME   = "yigyo/massagechairfinder"
BASE_BRANCH = "main"


def load_json(path: Path):
    if path.exists():
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    return {}


def collect_files(date_str: str) -> list:
    """Collect all files to include in the PR."""
    files = []

    # VOC report (primary output)
    report = OUTPUT_DIR / f"voc-report-{date_str}.md"
    if report.exists():
        files.append((report, f"drafts/voc/voc-report-{date_str}.md"))

    # Classified data (audit trail)
    classified = OUTPUT_DIR / f"classified_discussions_{date_str}.json"
    if classified.exists():
        files.append((classified, f"drafts/voc/classified_discussions_{date_str}.json"))

    return files


def build_pr_body(date_str: str, classified_path: Path) -> str:
    lines = [
        f"## MCF Discussion Monitor -- {date_str}",
        "",
        "This PR was generated automatically by the monthly discussion monitor pipeline.",
        "It contains a Voice of Customer report synthesized from Reddit and YouTube discussions.",
        "Review and use as input for copy, FAQ, and content planning. Do not merge as-is.",
        "",
    ]

    if classified_path.exists():
        data = load_json(classified_path)
        total    = data.get("total", 0)
        relevant = data.get("relevant", 0)
        objs     = data.get("objection_count", 0)
        qs       = data.get("question_count", 0)
        quotes   = data.get("quote_worthy_count", 0)

        lines += [
            "### This Month's Data",
            f"- Total discussions fetched: {total}",
            f"- Relevant: {relevant}",
            f"- Buyer objections surfaced: {objs}",
            f"- Questions asked: {qs}",
            f"- Quote-worthy phrases: {quotes}",
            "",
        ]

    lines += [
        "### How to Use This Report",
        "- **Copy team:** Mine the 'Exact Phrases' section for homepage, product page, and email copy",
        "- **Content team:** Turn 'Questions Buyers Are Asking' into FAQ entries and blog briefs",
        "- **Emily/KODA:** Update knowledge base with new objections and their responses",
        "- **Quiz:** Check if any new pain points or decision factors need quiz questions",
        "",
        "### Checklist Before Acting",
        "- [ ] Verify any quoted phrases are real (check the linked Reddit/YouTube threads)",
        "- [ ] Flag any new objections to address in product page copy",
        "- [ ] Add top unanswered questions to the content backlog",
        "- [ ] Check Pain Point Breakdown against current buying guide coverage",
        "",
        "Do not merge this PR -- it is a working document, not publishable content.",
    ]

    return "\n".join(lines)


def commit_files(repo, branch_name: str, files: list, date_str: str, dry_run: bool = False) -> None:
    if dry_run:
        print(f"  [DRY RUN] Branch: {branch_name}")
        for local, repo_path in files:
            print(f"  [DRY RUN] Would commit: {repo_path}")
        return

    base_ref = repo.get_branch(BASE_BRANCH)
    base_sha = base_ref.commit.sha

    try:
        repo.create_git_ref(ref=f"refs/heads/{branch_name}", sha=base_sha)
        print(f"  Created branch: {branch_name}")
    except GithubException as e:
        if e.status == 422:
            print(f"  Branch {branch_name} already exists -- updating")
        else:
            raise

    commit_msg = f"discussion-monitor: VOC report {date_str}"
    for local_path, repo_path in files:
        content = local_path.read_bytes()
        try:
            existing = repo.get_contents(repo_path, ref=branch_name)
            repo.update_file(repo_path, commit_msg, content, existing.sha, branch=branch_name)
            print(f"  Updated: {repo_path}")
        except GithubException as e:
            if e.status == 404:
                repo.create_file(repo_path, commit_msg, content, branch=branch_name)
                print(f"  Created: {repo_path}")
            else:
                raise


def main():
    parser = argparse.ArgumentParser(description="MCF Discussion Monitor -- open PR step")
    parser.add_argument("--date",    default=datetime.now().strftime("%Y-%m-%d"))
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        print("[ERR] GITHUB_TOKEN not set")
        sys.exit(1)

    print(f"=== MCF Discussion Open PR: {args.date} ===\n")

    files = collect_files(args.date)
    if not files:
        print("[WARN] No output files found. Check that generate_insights.py ran successfully.")
        sys.exit(0)

    print(f"Files to include: {len(files)}")
    for _, repo_path in files:
        print(f"  {repo_path}")

    classified_path = OUTPUT_DIR / f"classified_discussions_{args.date}.json"
    branch_name = f"voc-{args.date}"
    pr_title    = f"[VOC] Discussion report -- {args.date}"
    pr_body     = build_pr_body(args.date, classified_path)

    if args.dry_run:
        print(f"\n[DRY RUN] PR title: {pr_title}")
        commit_files(None, branch_name, files, args.date, dry_run=True)
        return 0

    g    = Github(token)
    repo = g.get_repo(REPO_NAME)

    print("\n[Committing files...]")
    commit_files(repo, branch_name, files, args.date)

    print("\n[Opening PR...]")
    try:
        pr = repo.create_pull(
            title=pr_title,
            body=pr_body,
            head=branch_name,
            base=BASE_BRANCH,
        )
        pr.add_to_labels("voc-report")
        print(f"\n[Done] PR opened: {pr.html_url}")
    except GithubException as e:
        if e.status == 422 and "pull request already exists" in str(e).lower():
            print(f"[INFO] PR already open for branch {branch_name}")
        else:
            raise

    return 0


if __name__ == "__main__":
    sys.exit(main())
