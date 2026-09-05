#!/usr/bin/env python3
"""Generate lib/best-membership.ts: which /best/ directories each chair is picked for.

WHY THIS EXISTS
---------------
Search Console shows category-intent queries ("heavy duty massage chair",
"commercial massage chairs", "massage chair for big and tall people") landing on
individual /chairs/ pages at positions 1 to 3 with zero clicks, while the
matching /best/ directories that actually answer those queries take almost no
impressions. The chair page template had no link into any /best/ directory, so
none of that authority routed anywhere.

The membership is not editorial. A chair belongs to a directory if and only if
that directory's own PICK_IDS array already names it, so this file is a
mechanical read of what is on disk. Regenerate it whenever a PICK_IDS array or a
/best/ page title changes.

USAGE
    python3 scripts/build-best-membership.py
"""
import json, os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BEST = os.path.join(ROOT, "app", "best")
OUT = os.path.join(ROOT, "lib", "best-membership.ts")

PICKS_RE = re.compile(r"const PICK_IDS[^=]*=\s*\[(.*?)\]", re.S)
ID_RE = re.compile(r"['\"]([a-z0-9][a-z0-9-]*)['\"]")
TITLE_RE = re.compile(r"^\s*title:\s*['\"](.+?)['\"]\s*,?\s*$", re.M)


def short_label(title):
    """'Best Heavy-Duty Massage Chairs (2026)' -> 'Best Heavy-Duty Massage Chairs'."""
    return re.sub(r"\s*\(\d{4}\)\s*$", "", title).strip()


def main():
    membership = {}
    dirs = 0
    for slug in sorted(os.listdir(BEST)):
        d = os.path.join(BEST, slug)
        page = os.path.join(d, "page.tsx")
        if slug.startswith("[") or not os.path.isfile(page):
            continue
        src = open(page, encoding="utf-8").read()
        m = PICKS_RE.search(src)
        t = TITLE_RE.search(src)
        if not m or not t:
            continue
        label = short_label(t.group(1))
        ids = ID_RE.findall(m.group(1))
        dirs += 1
        for cid in ids:
            membership.setdefault(cid, [])
            if not any(e["slug"] == slug for e in membership[cid]):
                membership[cid].append({"slug": slug, "label": label})

    for cid in membership:
        membership[cid].sort(key=lambda e: e["slug"])

    body = json.dumps(membership, indent=2, sort_keys=True, ensure_ascii=False)
    body = body.replace('"slug"', "slug").replace('"label"', "label")
    ts = (
        "// GENERATED FILE. Do not edit by hand.\n"
        "// Source: the PICK_IDS array and metadata title of every app/best/<slug>/page.tsx.\n"
        "// Regenerate: python3 scripts/build-best-membership.py\n"
        "//\n"
        "// Maps a chair id to the /best/ directories that already name it in their\n"
        "// picks, so a chair page can link into the category pages that answer the\n"
        "// category-level query the chair page is currently intercepting.\n\n"
        "export interface BestMembership {\n  slug: string\n  label: string\n}\n\n"
        "export const BEST_MEMBERSHIP: Record<string, BestMembership[]> = "
        + body
        + "\n\nexport function bestDirectoriesFor(chairId: string): BestMembership[] {\n"
        "  return BEST_MEMBERSHIP[chairId] || []\n}\n"
    )
    with open(OUT, "w", encoding="utf-8") as f:
        f.write(ts)
    print("wrote %s" % OUT)
    print("  directories parsed: %d" % dirs)
    print("  chairs with at least one membership: %d" % len(membership))
    return 0


if __name__ == "__main__":
    sys.exit(main())
