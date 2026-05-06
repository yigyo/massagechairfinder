#!/usr/bin/env python3
"""
generate_content.py
MCF Weekly News Monitor -- Step 3: Draft articles and update brand data.

Reads classified_stories_YYYY-MM-DD.json, loads MCF context files, then:
  - Drafts standalone articles for stories with content_action=draft_individual_article
  - Drafts the weekly roundup from all roundup-worthy stories
  - Updates data/brand-news.json with the latest news per brand

Usage:
    python generate_content.py [--date YYYY-MM-DD] [--skip-roundup] [--skip-articles]

Options:
    --date           Match the classified stories date (default: today)
    --skip-roundup   Skip the weekly roundup draft
    --skip-articles  Skip individual article drafts (still updates brand-news.json)
"""

import argparse
import json
import os
import re
import sys
import time
from datetime import datetime
from pathlib import Path

import anthropic

SCRIPT_DIR  = Path(__file__).parent
REPO_ROOT   = SCRIPT_DIR.parent.parent
PROMPTS_DIR = SCRIPT_DIR / "prompts"
DRAFTS_DIR  = REPO_ROOT / "drafts" / "news"
INDIV_DIR   = DRAFTS_DIR / "individual"
DATA_DIR    = REPO_ROOT / "data"
AGENTS_DIR  = REPO_ROOT.parent / ".agents"
GUIDELINES  = REPO_ROOT.parent / "mcf-content-guidelines.md"

ROUNDUP_PROMPT = (PROMPTS_DIR / "draft_roundup.txt").read_text(encoding="utf-8")
ARTICLE_PROMPT = (PROMPTS_DIR / "draft_article.txt").read_text(encoding="utf-8")


# ---------------------------------------------------------------------------
# Context loading
# ---------------------------------------------------------------------------

def load_context() -> str:
    """Load MCF context files into a single string for the system prompt."""
    parts = []
    files = [
        (AGENTS_DIR / "shared-context.md",  3000),
        (AGENTS_DIR / "mcf-context.md",     3000),
        (GUIDELINES,                         4000),
    ]
    for path, max_chars in files:
        if path.exists():
            text = path.read_text(encoding="utf-8")[:max_chars]
            parts.append(f"### {path.name}\n{text}")
        else:
            print(f"  [WARN] Context file not found: {path}")
    return "\n\n---\n\n".join(parts)


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def load_json(path: Path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)

def save_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def slug_from_title(title: str) -> str:
    """Convert a title to a URL-safe slug."""
    s = title.lower()
    s = re.sub(r"[^a-z0-9\s-]", "", s)
    s = re.sub(r"\s+", "-", s.strip())
    s = re.sub(r"-+", "-", s)
    return s[:60].rstrip("-")

def brand_to_slug(brand: str) -> str:
    return brand.lower().replace(" ", "-").replace("/", "-")

def strip_code_fence(text: str) -> str:
    """Remove markdown code fences if the model wrapped its output."""
    text = text.strip()
    if text.startswith("```"):
        lines = text.split("\n")
        # Remove first line (```markdown or ```) and last line (```)
        inner = lines[1:] if lines[-1].strip() == "```" else lines[1:]
        if inner and inner[-1].strip() == "```":
            inner = inner[:-1]
        text = "\n".join(inner).strip()
    return text

def call_claude(
    client: anthropic.Anthropic,
    system: str,
    user_message: str,
    max_tokens: int = 4096,
    retries: int = 3,
) -> str:
    """Call Claude Sonnet for content generation with retry logic."""
    for attempt in range(retries):
        try:
            response = client.messages.create(
                model="claude-sonnet-4-6",  # Sonnet for content quality
                max_tokens=max_tokens,
                system=system,
                messages=[{"role": "user", "content": user_message}],
            )
            return strip_code_fence(response.content[0].text)
        except anthropic.APIError as exc:
            print(f"  [WARN] API error (attempt {attempt + 1}/{retries}): {exc}")
            if attempt == retries - 1:
                raise
            time.sleep(5 * (attempt + 1))
    return ""


# ---------------------------------------------------------------------------
# Individual articles
# ---------------------------------------------------------------------------

def draft_individual_article(
    client: anthropic.Anthropic,
    story: dict,
    context: str,
    date_str: str,
) -> Path | None:
    """Draft a standalone article for a high-priority story."""
    system = ARTICLE_PROMPT + "\n\n---\n\n## MCF CONTEXT\n\n" + context

    story_input = {
        "title":           story["title"],
        "url":             story["url"],
        "source":          story["source"],
        "brand":           story.get("brand"),
        "summary":         story.get("summary", ""),
        "category":        story["category"],
        "relevance_score": story["relevance_score"],
        "draft_angle":     story.get("draft_angle", ""),
    }

    user_msg = (
        f"Today's date: {date_str}\n\n"
        f"Story to cover:\n{json.dumps(story_input, indent=2)}\n\n"
        "Write the full article now."
    )

    print(f"  Drafting article: {story['title'][:60]}...")
    draft = call_claude(client, system, user_msg, max_tokens=3000)

    if not draft:
        print(f"  [ERR] Empty draft returned for: {story['title'][:60]}")
        return None

    filename = f"{date_str}-{slug_from_title(story['title'])}.md"
    out_path  = INDIV_DIR / filename
    out_path.parent.mkdir(parents=True, exist_ok=True)

    with open(out_path, "w", encoding="utf-8") as f:
        f.write(draft)

    print(f"  -> {out_path.relative_to(REPO_ROOT)}")
    return out_path


# ---------------------------------------------------------------------------
# Weekly roundup
# ---------------------------------------------------------------------------

def draft_weekly_roundup(
    client: anthropic.Anthropic,
    roundup_stories: list[dict],
    context: str,
    date_str: str,
) -> Path | None:
    """Draft the weekly roundup article from all roundup-worthy stories."""
    system = ROUNDUP_PROMPT + "\n\n---\n\n## MCF CONTEXT\n\n" + context

    story_inputs = [
        {
            "title":           s["title"],
            "url":             s["url"],
            "source":          s["source"],
            "brand":           s.get("brand"),
            "summary":         s.get("summary", "")[:300],
            "category":        s["category"],
            "relevance_score": s["relevance_score"],
            "draft_angle":     s.get("draft_angle", ""),
        }
        for s in sorted(roundup_stories, key=lambda x: -(x.get("relevance_score") or 0))
    ]

    user_msg = (
        f"Today's date: {date_str}\n\n"
        f"Stories for this week's roundup ({len(story_inputs)} total):\n"
        f"{json.dumps(story_inputs, indent=2)}\n\n"
        "Write the full weekly roundup article now."
    )

    print(f"  Drafting weekly roundup from {len(story_inputs)} stories...")
    draft = call_claude(client, system, user_msg, max_tokens=4096)

    if not draft:
        print("  [ERR] Empty roundup draft returned")
        return None

    out_path = DRAFTS_DIR / f"weekly-roundup-{date_str}.md"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(draft)

    print(f"  -> {out_path.relative_to(REPO_ROOT)}")
    return out_path


# ---------------------------------------------------------------------------
# Brand news update
# ---------------------------------------------------------------------------

def update_brand_news(stories: list[dict], date_str: str) -> None:
    """
    Update data/brand-news.json with the latest news items per brand.
    Keeps the 5 most recent items per brand, newest first.
    """
    brand_news_path = DATA_DIR / "brand-news.json"
    existing        = load_json(brand_news_path) if brand_news_path.exists() else {}

    # Stories eligible for brand alert (all non-skipped stories with a brand)
    eligible = [
        s for s in stories
        if s.get("content_action") != "skip"
        and s.get("brands_mentioned")
    ]

    updated_count = 0
    for story in eligible:
        for brand in story.get("brands_mentioned", []):
            slug = brand_to_slug(brand)
            if slug not in existing or isinstance(existing.get(slug), str):
                # Skip unknown brands or the _comment key
                continue

            new_item = {
                "title":    story["title"][:120],
                "url":      story["url"],
                "date":     date_str,
                "summary":  story.get("summary", "")[:200],
                "category": story.get("category", "industry_news"),
            }

            current = existing.get(slug, [])
            if not isinstance(current, list):
                current = []

            # Prepend and keep latest 5, deduplicate by URL
            seen_urls = set()
            deduped   = []
            for item in [new_item] + current:
                if item["url"] not in seen_urls:
                    seen_urls.add(item["url"])
                    deduped.append(item)

            existing[slug] = deduped[:5]
            updated_count += 1

    save_json(brand_news_path, existing)
    print(f"  [brand-news.json] Updated {updated_count} brand slot(s)")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="MCF News Monitor -- generate step")
    parser.add_argument("--date",          default=datetime.now().strftime("%Y-%m-%d"))
    parser.add_argument("--skip-roundup",  action="store_true")
    parser.add_argument("--skip-articles", action="store_true")
    args = parser.parse_args()

    # Locate classified stories
    classified_path = DRAFTS_DIR / f"classified_stories_{args.date}.json"
    if not classified_path.exists():
        print(f"[ERR] Classified stories not found: {classified_path}")
        print("      Run classify_stories.py first.")
        sys.exit(1)

    data           = load_json(classified_path)
    all_stories    = data.get("stories", [])
    print(f"=== MCF Generate: {args.date} ===")
    print(f"Input: {len(all_stories)} classified stories\n")

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("[ERR] ANTHROPIC_API_KEY not set")
        sys.exit(1)

    client  = anthropic.Anthropic(api_key=api_key)
    context = load_context()

    # Segment stories by action
    individual_stories = [
        s for s in all_stories if s.get("content_action") == "draft_individual_article"
    ]
    roundup_stories = [
        s for s in all_stories if s.get("content_action") in (
            "draft_individual_article", "include_in_roundup"
        )
    ]

    print(f"Individual articles to draft: {len(individual_stories)}")
    print(f"Stories for roundup:          {len(roundup_stories)}")
    print()

    generated_files: list[Path] = []

    # 1. Individual articles
    if not args.skip_articles and individual_stories:
        print("[Individual Articles]")
        for story in individual_stories:
            path = draft_individual_article(client, story, context, args.date)
            if path:
                generated_files.append(path)
            time.sleep(2)  # brief pause between API calls
        print()

    # 2. Weekly roundup
    if not args.skip_roundup:
        if roundup_stories:
            print("[Weekly Roundup]")
            path = draft_weekly_roundup(client, roundup_stories, context, args.date)
            if path:
                generated_files.append(path)
        else:
            print("[Weekly Roundup] No roundup-worthy stories this week -- skipping")
        print()

    # 3. Brand news update (always runs)
    print("[Brand News Update]")
    update_brand_news(all_stories, args.date)

    # Summary
    print(f"\n{'='*50}")
    print(f"Generated {len(generated_files)} draft file(s):")
    for f in generated_files:
        print(f"  {f.relative_to(REPO_ROOT)}")
    print(f"{'='*50}")
    print("\nNext step: run open_pr.py to create a GitHub PR for review.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
