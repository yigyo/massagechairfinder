#!/usr/bin/env python3
"""
classify_stories.py
MCF Weekly News Monitor -- Step 2: Classify and score fetched stories.

Reads raw_stories_YYYY-MM-DD.json, sends batches to the Claude API for
classification, and writes classified_stories_YYYY-MM-DD.json.

Usage:
    python classify_stories.py [--date YYYY-MM-DD] [--batch-size N] [--dry-run]

Options:
    --date          Match the date used in fetch_sources.py (default: today)
    --batch-size    Stories per Claude API call (default: 20)
    --dry-run       Print what would be classified without calling the API
"""

import argparse
import json
import os
import sys
import time
from datetime import datetime
from pathlib import Path

import anthropic

SCRIPT_DIR    = Path(__file__).parent
REPO_ROOT     = SCRIPT_DIR.parent.parent
PROMPTS_DIR   = SCRIPT_DIR / "prompts"
OUTPUT_DIR    = REPO_ROOT / "drafts" / "news"
AGENTS_DIR    = REPO_ROOT.parent / ".agents"  # eComm/.agents/

CLASSIFY_PROMPT = (PROMPTS_DIR / "classify.txt").read_text(encoding="utf-8")

# Load MCF context to include in the system prompt for brand/category awareness
def load_context() -> str:
    files = [
        AGENTS_DIR / "shared-context.md",
        AGENTS_DIR / "mcf-context.md",
    ]
    parts = []
    for f in files:
        if f.exists():
            parts.append(f"### {f.name}\n{f.read_text(encoding='utf-8')[:3000]}")
        else:
            print(f"  [WARN] Context file not found: {f}")
    return "\n\n".join(parts)

def load_json(path: Path) -> dict | list:
    with open(path, encoding="utf-8") as f:
        return json.load(f)

def save_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)

def story_to_input(story: dict) -> dict:
    """Trim a story to just what the classifier needs."""
    return {
        "id":          story["id"],
        "title":       story["title"],
        "url":         story["url"],
        "source":      story["source"],
        "source_type": story["source_type"],
        "brand":       story.get("brand"),
        "summary":     story.get("summary", "")[:400],
        "published_at":story.get("published_at", ""),
    }

def classify_batch(
    client: anthropic.Anthropic,
    stories: list[dict],
    system_prompt: str,
    retries: int = 3,
) -> list[dict]:
    """Send a batch of stories to Claude and return classification results."""
    user_message = (
        "Classify the following massage chair news stories according to your instructions.\n\n"
        "Stories to classify:\n"
        f"{json.dumps([story_to_input(s) for s in stories], indent=2)}\n\n"
        "Return only the JSON array. No other text."
    )

    for attempt in range(retries):
        try:
            response = client.messages.create(
                model="claude-haiku-4-5-20251001",   # fast + cheap for classification
                max_tokens=4096,
                system=system_prompt,
                messages=[{"role": "user", "content": user_message}],
            )
            raw = response.content[0].text.strip()

            # Strip markdown code fences if present
            if raw.startswith("```"):
                raw = raw.split("```")[1]
                if raw.startswith("json"):
                    raw = raw[4:]
            raw = raw.strip()

            results = json.loads(raw)
            if not isinstance(results, list):
                raise ValueError("Expected a JSON array from classifier")
            return results

        except (json.JSONDecodeError, ValueError) as exc:
            print(f"  [WARN] Batch parse error (attempt {attempt + 1}/{retries}): {exc}")
            if attempt == retries - 1:
                # Return safe skip entries for the whole batch
                return [
                    {
                        "id":              s["id"],
                        "category":        "skip",
                        "brands_mentioned": [],
                        "relevance_score": 0,
                        "content_action":  "skip",
                        "draft_angle":     None,
                        "skip_reason":     f"Classification parse error: {exc}",
                    }
                    for s in stories
                ]
            time.sleep(2 ** attempt)

        except anthropic.APIError as exc:
            print(f"  [ERR] API error (attempt {attempt + 1}/{retries}): {exc}")
            if attempt == retries - 1:
                raise
            time.sleep(5 * (attempt + 1))

    return []

def merge_classifications(
    raw_stories: list[dict],
    classifications: list[dict],
) -> list[dict]:
    """Merge classifier output back into the full story objects."""
    class_by_id = {c["id"]: c for c in classifications}
    results = []
    for story in raw_stories:
        cls = class_by_id.get(story["id"], {})
        merged = {**story}
        merged["category"]        = cls.get("category", "skip")
        merged["brands_mentioned"] = cls.get("brands_mentioned", [])
        merged["relevance_score"] = cls.get("relevance_score", 0)
        merged["content_action"]  = cls.get("content_action", "skip")
        merged["draft_angle"]     = cls.get("draft_angle")
        merged["skip_reason"]     = cls.get("skip_reason")
        results.append(merged)
    return results

def print_summary(stories: list[dict]) -> None:
    from collections import Counter
    actions  = Counter(s["content_action"] for s in stories)
    cats     = Counter(s["category"]       for s in stories)
    high_val = [s for s in stories if s["relevance_score"] and s["relevance_score"] >= 7]

    print(f"\n{'='*55}")
    print("CLASSIFICATION SUMMARY")
    print(f"{'='*55}")
    print(f"Total stories classified: {len(stories)}")
    print(f"\nContent actions:")
    for action, count in sorted(actions.items()):
        print(f"  {action:<28} {count}")
    print(f"\nCategories:")
    for cat, count in sorted(cats.items()):
        print(f"  {cat:<28} {count}")
    if high_val:
        print(f"\nHigh-value stories (score >= 7):")
        for s in sorted(high_val, key=lambda x: -x["relevance_score"]):
            print(f"  [{s['relevance_score']:>2}] {s['title'][:70]}")
            if s.get("draft_angle"):
                print(f"       Angle: {s['draft_angle'][:80]}")
    print(f"{'='*55}\n")

def main():
    parser = argparse.ArgumentParser(description="MCF News Monitor -- classify step")
    parser.add_argument("--date",       default=datetime.now().strftime("%Y-%m-%d"))
    parser.add_argument("--batch-size", type=int, default=20)
    parser.add_argument("--dry-run",    action="store_true",
                        help="Preview without calling the Claude API")
    args = parser.parse_args()

    # Locate input file
    raw_path = OUTPUT_DIR / f"raw_stories_{args.date}.json"
    if not raw_path.exists():
        print(f"[ERR] Input file not found: {raw_path}")
        print("      Run fetch_sources.py first.")
        sys.exit(1)

    raw_data   = load_json(raw_path)
    all_stories = raw_data.get("stories", [])
    print(f"=== MCF Classify: {args.date} ===")
    print(f"Input: {len(all_stories)} stories from {raw_path.name}")

    if args.dry_run:
        print("\n[DRY RUN] Would classify the following stories:")
        for s in all_stories[:10]:
            print(f"  {s['id'][:10]}  {s['title'][:70]}")
        if len(all_stories) > 10:
            print(f"  ... and {len(all_stories) - 10} more")
        print(f"\n  Batch size: {args.batch_size}")
        print(f"  Batches needed: {-(-len(all_stories) // args.batch_size)}")
        return 0

    api_key = os.environ.get("ANTHROPIC_API_KEY")
    if not api_key:
        print("[ERR] ANTHROPIC_API_KEY not set")
        sys.exit(1)

    client        = anthropic.Anthropic(api_key=api_key)
    context       = load_context()
    system_prompt = CLASSIFY_PROMPT + "\n\n---\n\n## MCF CONTEXT (for brand/category awareness)\n\n" + context

    # Process in batches
    all_classifications: list[dict] = []
    batches = [
        all_stories[i:i + args.batch_size]
        for i in range(0, len(all_stories), args.batch_size)
    ]
    print(f"\nClassifying in {len(batches)} batch(es) of up to {args.batch_size}...\n")

    for i, batch in enumerate(batches, 1):
        print(f"[Batch {i}/{len(batches)}] {len(batch)} stories...")
        results = classify_batch(client, batch, system_prompt)
        all_classifications.extend(results)
        print(f"  -> {len(results)} classified")
        if i < len(batches):
            time.sleep(1)  # brief pause between batches

    # Merge back into full story objects
    classified = merge_classifications(all_stories, all_classifications)

    # Save output
    out_path = OUTPUT_DIR / f"classified_stories_{args.date}.json"
    save_json(out_path, {
        "date":         args.date,
        "story_count":  len(classified),
        "actionable":   sum(1 for s in classified if s["content_action"] != "skip"),
        "stories":      classified,
    })

    print_summary(classified)
    print(f"[Done] -> {out_path.relative_to(REPO_ROOT)}")
    return 0

if __name__ == "__main__":
    sys.exit(main())
