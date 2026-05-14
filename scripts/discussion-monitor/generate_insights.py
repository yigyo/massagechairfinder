#!/usr/bin/env python3
"""
generate_insights.py
MCF Discussion Monitor -- Step 3: Synthesize a Voice of Customer report.

Reads classified_discussions_YYYY-MM-DD.json, sends relevant discussions
to Claude for synthesis, and writes a VOC report as a Markdown file.

Usage:
    python generate_insights.py [--date YYYY-MM-DD] [--dry-run]
"""

import argparse
import json
import os
import sys
from collections import Counter
from datetime import datetime
from pathlib import Path

import anthropic

SCRIPT_DIR = Path(__file__).parent
REPO_ROOT  = SCRIPT_DIR.parent.parent
OUTPUT_DIR = REPO_ROOT / "drafts" / "voc"
AGENTS_DIR = REPO_ROOT.parent / ".agents"

INSIGHTS_SYSTEM = """You are a market research analyst for MassageChairFinder.com, a premium massage chair
buying guide serving U.S. buyers in the $2,000-$10,000+ range. Your primary customer is Margaret or David,
ages 52-60, with chronic back pain, looking to make a considered purchase.

You will receive a batch of classified buyer discussions from Reddit and YouTube. Your job is to synthesize
a concise Voice of Customer (VOC) report that the content team and copywriter can act on directly.

Report structure (use these exact headings):

## Top Themes This Month
List the 5-8 most common topics buyers are discussing. Each theme gets one sentence.

## Recurring Buyer Objections
List the top objections verbatim-style. Quote actual phrases where possible (in "quotes").
Focus on: cost justification, durability concerns, trust in the seller, return anxiety.

## Questions Buyers Are Asking
List 8-12 specific questions being asked. These are candidates for FAQ entries or blog posts.
Format: Q: [exact or paraphrased question]

## Exact Phrases Worth Capturing
List 10-15 verbatim phrases from real buyers that capture how they describe their pain, hesitation,
or dream outcome. These are gold for copy. Format each as a blockquote.

## Content Gap Signals
What topics are buyers asking about that MCF does not clearly answer? These become content briefs.
Format: "Buyers ask about X -- MCF should add Y"

## Pain Point Breakdown
Which physical complaints came up most? Rank the top 5 with a short note on context.

Hard rules for the report:
- No em dashes anywhere. Use commas or restructure.
- No mention of Inada as a current brand.
- Do not link to or mention emassagechair.com.
- Do not invent data. Only report what the discussions actually show.
- Keep each section tight. This is a working document, not a long article.
"""


def load_json(path: Path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def save_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)


def build_synthesis_payload(discussions: list, max_chars: int = 80000) -> str:
    """Build the text payload to send to Claude for synthesis."""
    lines = []
    total = 0
    for d in discussions:
        title = d.get("title", "").strip()
        body  = d.get("body", "").strip()
        platform   = d.get("platform", "")
        category   = d.get("category", "")
        pain_point = d.get("pain_point", "") or ""
        is_q       = d.get("is_question", False)
        is_obj     = d.get("is_objection", False)
        quote      = d.get("quote_worthy", False)
        score      = d.get("relevance_score", 0) or 0

        flags = []
        if is_q:   flags.append("QUESTION")
        if is_obj: flags.append("OBJECTION")
        if quote:  flags.append("QUOTE")

        entry = (
            f"[{platform.upper()} | {category} | score:{score}"
            + (f" | {pain_point}" if pain_point else "")
            + (f" | {','.join(flags)}" if flags else "")
            + "]\n"
        )
        if title:
            entry += f"Title: {title}\n"
        if body:
            entry += f"Body: {body[:400]}\n"
        entry += "\n"

        if total + len(entry) > max_chars:
            break
        lines.append(entry)
        total += len(entry)

    return "\n".join(lines)


def generate_report(client, discussions: list, date_str: str) -> str:
    """Call Claude to synthesize the VOC report."""
    relevant = [
        d for d in discussions
        if d.get("category") not in ("irrelevant", "unclassified")
        and (d.get("relevance_score") or 0) >= 4
    ]
    relevant.sort(key=lambda x: -(x.get("relevance_score") or 0))
    print(f"Sending {len(relevant)} relevant discussions to Claude for synthesis")

    payload = build_synthesis_payload(relevant)

    # Category breakdown for context
    cats = Counter(d.get("category") for d in relevant)
    pain = Counter(d.get("pain_point") for d in relevant if d.get("pain_point"))
    platforms = Counter(d.get("platform") for d in relevant)

    context = (
        f"Data from: {date_str}\n"
        f"Total relevant discussions: {len(relevant)}\n"
        f"Platforms: {dict(platforms)}\n"
        f"Category breakdown: {dict(cats)}\n"
        f"Top pain points: {dict(pain.most_common(8))}\n\n"
        "---\n\n"
        "Discussions:\n\n"
    )

    user_msg = context + payload

    resp = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        system=INSIGHTS_SYSTEM,
        messages=[{"role": "user", "content": user_msg}],
    )
    return resp.content[0].text.strip()


def build_markdown_report(report_body: str, date_str: str, stats: dict) -> str:
    header = f"""# MCF Voice of Customer Report -- {date_str}

> Generated automatically by the Discussion Monitor pipeline.
> Review and use as input for copy, FAQ, and content planning.
> Do not publish directly.

**Data summary:** {stats['total']} discussions fetched | {stats['relevant']} relevant
| {stats['objections']} objections | {stats['questions']} questions | {stats['quotes']} quote-worthy
| Sources: Reddit ({stats['reddit']}) + YouTube ({stats['youtube']})

---

"""
    return header + report_body + "\n"


def main():
    parser = argparse.ArgumentParser(description="MCF Discussion Monitor -- insights step")
    parser.add_argument("--date",    default=datetime.now().strftime("%Y-%m-%d"))
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    print(f"=== MCF Discussion Insights: {args.date} ===\n")

    input_path = OUTPUT_DIR / f"classified_discussions_{args.date}.json"
    if not input_path.exists():
        print(f"[ERR] Input not found: {input_path}")
        print("      Run classify_discussions.py first.")
        sys.exit(1)

    data        = load_json(input_path)
    discussions = data.get("discussions", [])

    stats = {
        "total":     data.get("total", len(discussions)),
        "relevant":  data.get("relevant", 0),
        "objections": data.get("objection_count", 0),
        "questions":  data.get("question_count", 0),
        "quotes":     data.get("quote_worthy_count", 0),
        "reddit":     sum(1 for d in discussions if d.get("platform") == "reddit"),
        "youtube":    sum(1 for d in discussions if d.get("platform") == "youtube"),
    }

    if args.dry_run:
        print(f"[DRY RUN] Would synthesize report from {stats['relevant']} relevant discussions")
        print(f"[DRY RUN] Reddit: {stats['reddit']} | YouTube: {stats['youtube']}")
        return 0

    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        print("[ERR] ANTHROPIC_API_KEY not set")
        sys.exit(1)

    client = anthropic.Anthropic(api_key=api_key)

    print("Generating VOC report...")
    report_body = generate_report(client, discussions, args.date)

    full_report = build_markdown_report(report_body, args.date, stats)

    output_path = OUTPUT_DIR / f"voc-report-{args.date}.md"
    save_text(output_path, full_report)
    print(f"\n[Done] VOC report -> {output_path.relative_to(REPO_ROOT)}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
