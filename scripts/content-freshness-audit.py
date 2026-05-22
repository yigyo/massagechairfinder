#!/usr/bin/env python3
"""
content-freshness-audit.py
MCF monthly content freshness audit.

Scans hardcoded prose content for references to chairs that are no longer
active or mcfActive in the catalog. Covers:
  - lib/local-brands.ts  (brand description paragraphs, taglines, bestFor)
  - app/best/*/page.tsx  (EDITORIAL 'why' copy)
  - app/compare/*/page.tsx  (full page body, skips redirect-only pages)
  - app/page.tsx  (homepage featured content)

Exits 0 always (informational only). Report saved to eComm/audit-report-content-[DATE].md
"""

import os, re, sys
from datetime import date

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHAIRS_TS     = os.path.join(BASE, 'lib', 'chairs.ts')
BRANDS_TS     = os.path.join(BASE, 'lib', 'local-brands.ts')
BEST_DIR      = os.path.join(BASE, 'app', 'best')
CMP_DIR       = os.path.join(BASE, 'app', 'compare')
HOME_PAGE     = os.path.join(BASE, 'app', 'page.tsx')
ECOMM_DIR     = os.path.dirname(BASE)

TODAY = date.today().isoformat()


# ── load catalog ──────────────────────────────────────────────────────────────

def load_catalog():
    """Returns dict of id -> {name, active, mcfActive}"""
    with open(CHAIRS_TS, encoding='utf-8') as f:
        content = f.read()
    chairs = {}
    # Find each id: 'xxx' and grab a 500-char window to extract fields
    for m in re.finditer(r"id:\s*'([^']+)'", content):
        cid = m.group(1)
        window = content[m.start():m.start() + 600]
        name_m = re.search(r"name:\s*'([^']+)'", window)
        name = name_m.group(1) if name_m else cid
        chairs[cid] = {
            'name': name,
            'active':    'active: true'    in window,
            'mcfActive': 'mcfActive: true' in window,
        }
    return chairs


def inactive_chairs(catalog):
    """Returns list of (id, name) for chairs that are inactive or not mcfActive."""
    return [(cid, info['name']) for cid, info in catalog.items()
            if not info['active'] or not info['mcfActive']]


# ── text search helpers ────────────────────────────────────────────────────────

def find_stale_refs(text, stale_list):
    """
    Returns list of (chair_name, snippet) for each stale chair whose name
    appears in text. Snippet is 120 chars of context around the match.
    """
    hits = []
    for cid, name in stale_list:
        # Match the chair name (case-insensitive, word-boundary-ish)
        pattern = re.escape(name)
        for m in re.finditer(pattern, text, re.IGNORECASE):
            start = max(0, m.start() - 50)
            end   = min(len(text), m.end() + 70)
            snippet = text[start:end].replace('\n', ' ').strip()
            hits.append((name, cid, snippet))
    return hits


def strip_code(text):
    """Remove JSX/HTML tags and import lines to focus on prose."""
    text = re.sub(r'import\s+.*?;', '', text)
    text = re.sub(r'<[^>]+>', ' ', text)
    text = re.sub(r'\{[^}]{0,200}\}', ' ', text)
    return text


# ── scan targets ──────────────────────────────────────────────────────────────

def audit_brands(stale_list):
    findings = []
    with open(BRANDS_TS, encoding='utf-8') as f:
        content = f.read()
    hits = find_stale_refs(content, stale_list)
    for name, cid, snippet in hits:
        findings.append({
            'file': 'lib/local-brands.ts',
            'chair': name,
            'id': cid,
            'snippet': snippet,
        })
    return findings


def audit_best_pages(stale_list):
    findings = []
    if not os.path.isdir(BEST_DIR):
        return findings
    for page_dir in sorted(os.listdir(BEST_DIR)):
        path = os.path.join(BEST_DIR, page_dir, 'page.tsx')
        if not os.path.isfile(path) or page_dir == '[category]':
            continue
        with open(path, encoding='utf-8') as f:
            content = f.read()
        # Only scan the EDITORIAL block (prose), not PICK_IDS (structural)
        ed_start = content.find('const EDITORIAL')
        if ed_start == -1:
            continue
        ed_end = content.find('\nexport default', ed_start)
        prose = strip_code(content[ed_start:ed_end] if ed_end != -1 else content[ed_start:])
        hits = find_stale_refs(prose, stale_list)
        for name, cid, snippet in hits:
            findings.append({
                'file': f'app/best/{page_dir}/page.tsx (EDITORIAL)',
                'chair': name,
                'id': cid,
                'snippet': snippet,
            })
    return findings


def audit_compare_pages(stale_list):
    findings = []
    if not os.path.isdir(CMP_DIR):
        return findings
    for slug_dir in sorted(os.listdir(CMP_DIR)):
        path = os.path.join(CMP_DIR, slug_dir, 'page.tsx')
        if not os.path.isfile(path) or slug_dir == 'page.tsx':
            continue
        with open(path, encoding='utf-8') as f:
            content = f.read()
        # Skip redirect-only pages (< 200 chars of meaningful content)
        if 'redirect(' in content and len(content) < 400:
            continue
        prose = strip_code(content)
        hits = find_stale_refs(prose, stale_list)
        for name, cid, snippet in hits:
            findings.append({
                'file': f'app/compare/{slug_dir}/page.tsx',
                'chair': name,
                'id': cid,
                'snippet': snippet,
            })
    return findings


def audit_homepage(stale_list):
    findings = []
    if not os.path.isfile(HOME_PAGE):
        return findings
    with open(HOME_PAGE, encoding='utf-8') as f:
        content = f.read()
    prose = strip_code(content)
    hits = find_stale_refs(prose, stale_list)
    for name, cid, snippet in hits:
        findings.append({
            'file': 'app/page.tsx',
            'chair': name,
            'id': cid,
            'snippet': snippet,
        })
    return findings


# ── report ────────────────────────────────────────────────────────────────────

def render_report(all_findings, catalog):
    stale_count = len(set(f['id'] for f in all_findings))
    lines = [
        f"# MCF Content Freshness Audit -- {TODAY}",
        "",
        "## Summary",
        f"- Stale chair references found in {len(all_findings)} location(s) across {len(set(f['file'] for f in all_findings))} file(s)",
        f"- Distinct inactive/OOS chairs referenced in prose: {stale_count}",
        "",
        "Scope: lib/local-brands.ts, app/best/*/page.tsx (EDITORIAL blocks), "
        "app/compare/*/page.tsx, app/page.tsx",
        "",
        "Note: best page PICK_IDS and compare page chair refs are covered by the "
        "weekly catalog-health-audit.py. This audit focuses on hardcoded prose copy.",
        "",
    ]

    if not all_findings:
        lines += ["## Result", "", "No stale chair references found. All prose content is consistent with the active catalog.", ""]
        return '\n'.join(lines)

    # Group by file
    by_file = {}
    for f in all_findings:
        by_file.setdefault(f['file'], []).append(f)

    lines += ["## Stale References by File", ""]
    for fname, hits in sorted(by_file.items()):
        lines.append(f"### {fname}")
        lines.append("")
        seen = set()
        for h in hits:
            key = (h['id'], h['snippet'][:40])
            if key in seen:
                continue
            seen.add(key)
            chair_info = catalog.get(h['id'], {})
            status = "inactive" if not chair_info.get('active') else "OOS (mcfActive: false)"
            lines.append(f"- **{h['chair']}** (`{h['id']}`) -- {status}")
            lines.append(f"  > ...{h['snippet']}...")
            lines.append("")
        lines.append("")

    lines += [
        "## Recommended Actions",
        "",
        "For each file listed above, update the prose to remove or replace references "
        "to inactive chairs. Check chairs.ts for the current active lineup for that brand "
        "or price tier before rewriting.",
        "",
        "Run `python3 scripts/catalog-health-audit.py` separately to check structural "
        "issues (PICK_IDS, compare page chair refs).",
        "",
    ]
    return '\n'.join(lines)


# ── main ──────────────────────────────────────────────────────────────────────

def main():
    catalog  = load_catalog()
    stale    = inactive_chairs(catalog)

    print(f"Catalog loaded: {len(catalog)} chairs total, {len(stale)} inactive/OOS")

    findings = []
    findings += audit_brands(stale)
    findings += audit_best_pages(stale)
    findings += audit_compare_pages(stale)
    findings += audit_homepage(stale)

    report = render_report(findings, catalog)

    # Save to eComm root
    out_path = os.path.join(ECOMM_DIR, f'audit-report-content-{TODAY}.md')
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(report)

    print(f"Report saved: {out_path}")
    print(f"Findings: {len(findings)} stale references in {len(set(f['file'] for f in findings))} files")

    # Print summary to stdout for the skill
    if findings:
        from collections import Counter
        by_file = Counter(f['file'] for f in findings)
        print("\nTop files with stale refs:")
        for fname, count in by_file.most_common(5):
            print(f"  {count}x  {fname}")

    return 0


if __name__ == '__main__':
    sys.exit(main())
