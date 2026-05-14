#!/usr/bin/env python3
"""
generate_outputs.py
MCF Discussion Monitor -- Step 4: Generate actionable content from the VOC report.

Reads the VOC report and classified discussions, then produces:
  1. 2-3 Learning Center article drafts (from Content Gap Signals)
  2. Emily KB additions (from Questions + Objections)
  3. Social swipe file (from Exact Phrases + Themes)

All outputs land in drafts/voc/ and are included in the PR by open_pr.py.

Usage:
    python generate_outputs.py [--date YYYY-MM-DD] [--dry-run] [--skip-articles]
"""

import argparse
import json
import os
import re
import sys
from collections import Counter
from datetime import datetime
from pathlib import Path

import anthropic

SCRIPT_DIR = Path(__file__).parent
REPO_ROOT  = SCRIPT_DIR.parent.parent
OUTPUT_DIR = REPO_ROOT / "drafts" / "voc"
AGENTS_DIR = REPO_ROOT.parent / ".agents"

def load_json(path: Path):
    with open(path, encoding="utf-8") as f:
        return json.load(f)

def load_text(path: Path) -> str:
    with open(path, encoding="utf-8") as f:
        return f.read()

def save_text(path: Path, text: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)

def load_context(max_chars: int = 3000) -> str:
    files = [AGENTS_DIR / "shared-context.md", AGENTS_DIR / "mcf-context.md"]
    parts = []
    for f in files:
        if f.exists():
            parts.append(f.read_text(encoding="utf-8")[:max_chars])
    return "\n\n".join(parts)


# ---------------------------------------------------------------------------
# 1. Learning Center article drafts
# ---------------------------------------------------------------------------

ARTICLE_SYSTEM = """You are a content writer for MassageChairFinder.com, a premium massage chair
buying guide. Your audience is U.S. buyers considering a $2,000-$10,000+ purchase, typically
ages 50-65, with chronic back pain. They are researching carefully over months.

Write in MCF editorial voice: Wirecutter-style authority, warm and reassuring tone, specific and
honest. Think independent advisor, not salesperson.

Hard rules (non-negotiable):
- No em dashes. Use commas, periods, or restructure.
- No "authorized dealer" language.
- No mention of Inada as a current brand.
- No links to emassagechair.com.
- No invented specs. Do not cite specific model numbers or prices you are not certain of.
- Minimum 5 internal links per article. Always include a link to /finder.
- Write in HTML (not markdown) for the article body.
- Article body only -- no frontmatter, no JSON, just the HTML.

Internal links to use (use relative paths):
- /finder (Chair Finder quiz)
- /learn/what-is-an-sl-track-massage-chair (track types guide)
- /learn/zero-gravity-massage-chairs (zero gravity guide)
- /learn/massage-chair-roller-dimensions (roller guide)
- /learn/massage-chair-body-scan (body scan guide)
- /learn/best-massage-chairs-for-back-pain (back pain guide)
- /chairs (full catalog)
"""

ARTICLE_USER_TEMPLATE = """Write a Learning Center article for MassageChairFinder.com on this topic:

TOPIC: {topic}
BUYER QUESTION IT ANSWERS: {question}
CONTENT GAP SIGNAL: {gap_signal}

Target length: 800-1200 words. Write the full HTML article body only.
Start with a <p> tag (no <h1> -- that comes from the page template).
Use <h2> and <h3> for subheadings. Use <p> for paragraphs.
End with a short paragraph linking to /finder with anchor text like "use our Chair Finder".
"""

def extract_content_gaps(voc_report: str) -> list:
    """Pull the Content Gap Signals section from the VOC report."""
    gaps = []
    in_section = False
    for line in voc_report.splitlines():
        if "## Content Gap Signals" in line:
            in_section = True
            continue
        if in_section and line.startswith("## "):
            break
        if in_section and line.strip().startswith("Buyers ask about"):
            gaps.append(line.strip())
    return gaps[:4]  # Top 4 gaps max


def gap_to_article_spec(gap: str) -> dict:
    """Parse a gap signal line into topic + question + gap."""
    # Format: "Buyers ask about X -- MCF should add Y"
    parts = gap.split("--")
    buyer_part = parts[0].strip() if parts else gap
    mcf_part   = parts[1].strip() if len(parts) > 1 else ""

    # Extract topic from MCF part
    topic = mcf_part.replace("MCF should add", "").replace("MCF should", "").strip()
    if not topic:
        topic = buyer_part.replace("Buyers ask about", "").strip()

    # Question from buyer part
    question = buyer_part.replace("Buyers ask about", "Buyers want to know about").strip()

    return {"topic": topic, "question": question, "gap_signal": gap}


def generate_article(client, spec: dict, context: str) -> tuple:
    """Generate one Learning Center article. Returns (slug, title, html_body)."""
    system = ARTICLE_SYSTEM + (f"\n\nSite context:\n{context}" if context else "")
    user   = ARTICLE_USER_TEMPLATE.format(**spec)

    resp = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=4096,
        system=system,
        messages=[{"role": "user", "content": user}],
    )
    body = resp.content[0].text.strip()

    # Derive a slug and title from the topic
    raw_slug  = re.sub(r"[^a-z0-9\s-]", "", spec["topic"].lower())
    raw_slug  = re.sub(r"\s+", "-", raw_slug.strip())[:60].rstrip("-")
    title     = spec["topic"].title()

    return raw_slug, title, body


def write_article_draft(slug: str, title: str, body: str, date_str: str) -> Path:
    """Write a draft markdown file wrapping the HTML body."""
    content = f"""# DRAFT: {title}

> Generated by Discussion Monitor pipeline -- {date_str}
> Review before publishing. Check all internal links, verify any claims.
> To publish: add to lib/local-articles.ts with appropriate slug, title, excerpt, order, publishedAt.

**Suggested slug:** `{slug}`
**Suggested excerpt:** (write a 1-2 sentence summary of the article for meta description)

---

{body}
"""
    path = OUTPUT_DIR / "articles" / f"{date_str}-{slug}.md"
    save_text(path, content)
    return path


# ---------------------------------------------------------------------------
# 2. Emily KB additions
# ---------------------------------------------------------------------------

KB_SYSTEM = """You are writing knowledge base additions for Emily, MassageChairFinder.com's
AI customer service agent. Emily is warm, knowledgeable, and never pushy. She helps buyers
make confident decisions about $2,000-$10,000+ massage chairs.

Format each KB entry as:

### [Question or objection]
**What buyers say:** "[verbatim-style phrase]"
**Emily's response guidance:** [2-3 sentences Emily can use to address this. Specific, not generic.]
**Key points to cover:** [bullet list of facts or reassurances to include]

Hard rules:
- No em dashes.
- No Inada mentions.
- No invented specs or prices.
- Keep responses warm and advisor-like, not salesy.
- Always suggest /finder when a buyer seems uncertain about which chair fits them.
"""

def generate_kb_additions(client, classified: dict, voc_report: str) -> str:
    """Generate Emily KB additions from top questions and objections."""
    discussions = classified.get("discussions", [])

    questions  = [d for d in discussions if d.get("is_question") and
                  d.get("relevance_score", 0) >= 5][:15]
    objections = [d for d in discussions if d.get("is_objection") and
                  d.get("relevance_score", 0) >= 5][:10]

    payload_lines = ["TOP BUYER QUESTIONS (from real discussions):"]
    for d in questions:
        payload_lines.append(f"- {d.get('title') or d.get('body', '')[:150]}")

    payload_lines.append("\nTOP BUYER OBJECTIONS (from real discussions):")
    for d in objections:
        payload_lines.append(f"- {d.get('title') or d.get('body', '')[:150]}")

    payload = "\n".join(payload_lines)

    user_msg = (
        f"Based on these real buyer questions and objections from this month's "
        f"discussion data, write KB additions for Emily.\n\n{payload}\n\n"
        f"Focus on the most common and highest-stakes items. "
        f"Write 6-8 KB entries total."
    )

    resp = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=3000,
        system=KB_SYSTEM,
        messages=[{"role": "user", "content": user_msg}],
    )

    header = f"""# Emily KB Additions -- {datetime.now().strftime('%Y-%m-%d')}

> Generated by Discussion Monitor pipeline. Review before adding to emily-knowledge-base.md.
> These are suggestions based on real buyer questions and objections from this month.
> Edit for accuracy before publishing. Do not publish invented specs.

---

"""
    return header + resp.content[0].text.strip() + "\n"


# ---------------------------------------------------------------------------
# 3. Social swipe file
# ---------------------------------------------------------------------------

SOCIAL_SYSTEM = """You are a social media content strategist for MassageChairFinder.com.
Your job is to turn real buyer language into content angles for organic social.

The audience: buyers aged 50-65, chronic back pain, suburban homeowners considering a
$3,000-$8,000 massage chair. They respond to specificity, honesty, and relief-focused language.
They do NOT respond to hype, urgency, or influencer-style content.

For each angle, write:
**Platform:** [Reddit | YouTube comment | Instagram caption | LinkedIn | Email subject line]
**Angle:** [1-sentence content hook]
**Draft:** [The actual post/comment/caption -- 50-150 words, ready to use or lightly edit]
**Why it works:** [One sentence on why this resonates with the buyer]

Hard rules:
- No em dashes.
- No invented specs or prices.
- No hype language ("revolutionary", "ultimate", "life-changing").
- Write like a trusted person, not a brand account.
- Reddit/YouTube should read like genuine helpful comments, not ads.
"""

def generate_social_swipe(client, voc_report: str) -> str:
    """Generate social content angles from the VOC report."""

    # Extract exact phrases and top themes from the report
    relevant_sections = []
    capture = False
    for line in voc_report.splitlines():
        if any(h in line for h in ["## Top Themes", "## Exact Phrases", "## Recurring Buyer"]):
            capture = True
        elif line.startswith("## ") and capture:
            if "## Content Gap" in line or "## Pain Point" in line or "## Questions" in line:
                capture = False
        if capture:
            relevant_sections.append(line)

    section_text = "\n".join(relevant_sections[:80])  # Cap length

    user_msg = (
        f"Based on these real buyer themes and phrases from this month's discussion data, "
        f"write 8-10 social content angles for MassageChairFinder.com.\n\n"
        f"Mix platform types. Prioritize angles that would generate genuine engagement "
        f"from real buyers -- not vanity metrics.\n\n"
        f"Source material:\n{section_text}"
    )

    resp = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=3000,
        system=SOCIAL_SYSTEM,
        messages=[{"role": "user", "content": user_msg}],
    )

    header = f"""# Social Content Swipe File -- {datetime.now().strftime('%Y-%m-%d')}

> Generated by Discussion Monitor pipeline from real buyer language.
> These are angles and drafts -- edit before posting.
> Reddit/YouTube angles should be posted as genuine helpful comments, not branded content.

---

"""
    return header + resp.content[0].text.strip() + "\n"


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="MCF Discussion Monitor -- generate outputs")
    parser.add_argument("--date",          default=datetime.now().strftime("%Y-%m-%d"))
    parser.add_argument("--dry-run",       action="store_true")
    parser.add_argument("--skip-articles", action="store_true",
                        help="Skip article generation (faster, useful for testing KB/social)")
    args = parser.parse_args()

    print(f"=== MCF Discussion Generate Outputs: {args.date} ===\n")

    # Load inputs
    voc_path        = OUTPUT_DIR / f"voc-report-{args.date}.md"
    classified_path = OUTPUT_DIR / f"classified_discussions_{args.date}.json"

    if not voc_path.exists():
        print(f"[ERR] VOC report not found: {voc_path}")
        print("      Run generate_insights.py first.")
        sys.exit(1)
    if not classified_path.exists():
        print(f"[ERR] Classified discussions not found: {classified_path}")
        sys.exit(1)

    voc_report = load_text(voc_path)
    classified  = load_json(classified_path)

    if args.dry_run:
        gaps = extract_content_gaps(voc_report)
        print(f"[DRY RUN] Content gaps found: {len(gaps)}")
        for g in gaps:
            print(f"  - {g[:100]}")
        print(f"[DRY RUN] Would generate: {min(len(gaps), 3)} articles, KB additions, social swipe file")
        return 0

    api_key = os.environ.get("ANTHROPIC_API_KEY", "")
    if not api_key:
        print("[ERR] ANTHROPIC_API_KEY not set")
        sys.exit(1)

    client  = anthropic.Anthropic(api_key=api_key)
    context = load_context()
    output_files = []

    # -- Articles --
    if not args.skip_articles:
        gaps = extract_content_gaps(voc_report)
        specs = [gap_to_article_spec(g) for g in gaps[:3]]
        print(f"[Articles] Generating {len(specs)} drafts from content gaps...\n")
        for i, spec in enumerate(specs, 1):
            print(f"  Article {i}: {spec['topic'][:60]}")
            try:
                slug, title, body = generate_article(client, spec, context)
                path = write_article_draft(slug, title, body, args.date)
                output_files.append(path)
                print(f"  -> {path.relative_to(REPO_ROOT)}")
            except Exception as exc:
                print(f"  [ERR] Article {i} failed: {exc}")
    else:
        print("[Articles] Skipped (--skip-articles)")

    # -- Emily KB additions --
    print("\n[KB] Generating Emily KB additions...")
    try:
        kb_text = generate_kb_additions(client, classified, voc_report)
        kb_path = OUTPUT_DIR / f"emily-kb-additions-{args.date}.md"
        save_text(kb_path, kb_text)
        output_files.append(kb_path)
        print(f"  -> {kb_path.relative_to(REPO_ROOT)}")
    except Exception as exc:
        print(f"  [ERR] KB generation failed: {exc}")

    # -- Social swipe file --
    print("\n[Social] Generating social swipe file...")
    try:
        social_text = generate_social_swipe(client, voc_report)
        social_path = OUTPUT_DIR / f"social-angles-{args.date}.md"
        save_text(social_path, social_text)
        output_files.append(social_path)
        print(f"  -> {social_path.relative_to(REPO_ROOT)}")
    except Exception as exc:
        print(f"  [ERR] Social generation failed: {exc}")

    print(f"\n[Done] {len(output_files)} output files generated")
    return 0


if __name__ == "__main__":
    sys.exit(main())
