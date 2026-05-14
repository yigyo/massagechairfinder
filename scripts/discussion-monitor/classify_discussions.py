#!/usr/bin/env python3
"""
classify_discussions.py
MCF Discussion Monitor -- Step 2: Classify discussions with the Claude API.

Reads raw_discussions_YYYY-MM-DD.json, sends batches to Claude for
classification, and writes classified_discussions_YYYY-MM-DD.json.

Usage:
    python classify_discussions.py [--date YYYY-MM-DD] [--batch-size N] [--dry-run]
"""

import argparse
import json
import os
import sys
import time
from datetime import datetime
from pathlib import Path

import anthropic

SCRIPT_DIR  = Path(__file__).parent
REPO_ROOT   = SCRIPT_DIR.parent.parent
OUTPUT_DIR  = REPO_ROOT / "drafts" / "voc"
AGENTS_DIR  = REPO_ROOT.parent / ".agents"

CLASSIFY_PROMPT = """You are classifying buyer discussions about massage chairs for MassageChairFinder.com.
For each discussion, return a JSON array where each object has exactly these fields:

{
  "id": "<the id field from input, unchanged>",
  "category": one of: "purchase_intent" | "pain_relief" | "product_comparison" | "price_objection" |
               "trust_concern" | "post_purchase" | "general_question" | "irrelevant",
  "pain_point": primary physical complaint mentioned or null (e.g. "lower back pain", "sciatica", "neck tension"),
  "buyer_stage": one of: "awareness" | "consideration" | "decision" | "post_purchase" | "unknown",
  "sentiment": one of: "positive" | "negative" | "neutral" | "mixed",
  "is_objection": true if the post raises a buyer objection (cost, trust, space, durability),
  "is_question": true if the person is asking for help or recommendations,
  "quote_worthy": true if the post contains a verbatim phrase worth using in copy or FAQs,
  "relevance_score": integer 1-10 (10 = extremely relevant to a massage chair buyer or content creator)
}

Hard rules:
- Any post recommending Inada as a current purchase: set category to "irrelevant", relevance_score to 1
- Any post from emassagechair.com domain: set category to "irrelevant"
- Posts that are purely spam or completely off-topic: category "irrelevant", relevance_score 1-2
- Be generous with quote_worthy -- if someone says something a real buyer would say, mark it true

Return ONLY a valid JSON array. No markdown, no explanation, no extra text.
"""


def load_json(path: Path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def save_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def discussion_to_input(d: dict) -> dict:
    return {
        "id":       d["id"],
        "platform": d.get("platform", ""),
        "type":     d.get("type", ""),
        "title":    d.get("title", "")[:200],
        "body":     d.get("body", "")[:500],
        "score":    d.get("score", 0),
        "subreddit": d.get("subreddit", ""),
        "video_title": d.get("video_title", ""),
    }


def classify_batch(client, discussions: list, retries: int = 3) -> list:
    payload = json.dumps([discussion_to_input(d) for d in discussions], ensure_ascii=False)
    user_msg = f"Classify these {len(discussions)} discussions:\n\n{payload}"

    for attempt in range(1, retries + 1):
        try:
            resp = client.messages.create(
                model="claude-haiku-4-5-20251001",
                max_tokens=4096,
                system=CLASSIFY_PROMPT,
                messages=[{"role": "user", "content": user_msg}],
            )
            text = resp.content[0].text.strip()
            # Strip markdown code fences if present
            if text.startswith("```"):
                text = text.split("```")[1]
                if text.startswith("json"):
                    text = text[4:]
            results = json.loads(text)
            if not isinstance(results, list):
                raise ValueError("Expected JSON array")
            return results
        except Exception as exc:
            print(f"  [WARN] Classify attempt {attempt}/{retries} failed: {exc}")
            if attempt < retries:
                time.sleep(5 * attempt)

    print(f"  [ERR] All retries failed for batch of {len(discussions)}")
    return []


def apply_classifications(discussions: list, results: list) -> list:
    result_map = {r["id"]: r for r in results if isinstance(r, dict) and "id" in r}
    for d in discussions:
        r = result_map.get(d["id"], {})
        d["category"]        = r.get("category",        "irrelevant")
        d["pain_point"]      = r.get("pain_point",       None)
        d["buyer_stage"]     = r.get("buyer_stage",      "unknown")
        d["sentiment"]       = r.get("sentiment",        "neutral")
        d["is_objection"]    = r.get("is_objection",     False)
        d["is_question"]     = r.get("is_question",      False)
        d["quote_worthy"]    = r.get("quote_worthy",     False)
        d["relevance_score"] = r.get("relevance_score",  1)
    return discussions


def main():
    parser = argparse.ArgumentParser(description="MCF Discussion Monitor -- classify step")
    parser.add_argument("--date",       default=datetime.now().strftime("%Y-%m-%d"))
    parser.add_argument("--batch-size", type=int, default=25)
    parser.add_argument("--dry-run",    action="store_true")
    args = parser.parse_args()

    print(f"=== MCF Discussion Classify: {args.date} ===\n")

    input_path = OUTPUT_DIR / f"raw_discussions_{args.date}.json"
    if not input_path.exists():
        print(f"[ERR] Input not found: {input_path}")
        print("      Run fetch_discussions.py first.")
        sys.exit(1)

    data        = load_json(input_path)
    discussions = data.get("discussions", [])
    print(f"Loaded {len(discussions)} discussions to classify")

    if args.dry_run:
        print(f"[DRY RUN] Would classify {len(discussions)} discussions in batches of {args.batch_size}")
        print(f"[DRY RUN] Estimated API calls: {len(discussions) // args.batch_size + 1}")
        return 0

    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        print("[ERR] ANTHROPIC_API_KEY not set")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    # Process in batches
    classified = []
    for i in range(0, len(discussions), args.batch_size):
        batch = discussions[i : i + args.batch_size]
        print(f"\nBatch {i // args.batch_size + 1}: classifying {len(batch)} discussions...")
        results = classify_batch(client, batch)
        if results:
            batch = apply_classifications(batch, results)
            classified.extend(batch)
            success = sum(1 for d in batch if d.get("category") != "irrelevant")
            print(f"  -> {success}/{len(batch)} relevant")
        else:
            # Mark as unclassified rather than drop them
            for d in batch:
                d["category"]        = "unclassified"
                d["relevance_score"] = None
            classified.extend(batch)

    # Summary stats
    relevant   = [d for d in classified if d.get("category") not in ("irrelevant", "unclassified")]
    objections = [d for d in relevant if d.get("is_objection")]
    questions  = [d for d in relevant if d.get("is_question")]
    quotes     = [d for d in relevant if d.get("quote_worthy")]

    print(f"\n=== Classification Summary ===")
    print(f"Total: {len(classified)} | Relevant: {len(relevant)} | Irrelevant: {len(classified) - len(relevant)}")
    print(f"Objections: {len(objections)} | Questions: {len(questions)} | Quote-worthy: {len(quotes)}")

    output_path = OUTPUT_DIR / f"classified_discussions_{args.date}.json"
    save_json(output_path, {
        "date":             args.date,
        "classified_at":    datetime.now().isoformat(),
        "total":            len(classified),
        "relevant":         len(relevant),
        "objection_count":  len(objections),
        "question_count":   len(questions),
        "quote_worthy_count": len(quotes),
        "discussions":      classified,
    })
    print(f"\n[Done] -> {output_path.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
