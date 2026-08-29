#!/usr/bin/env python3
"""Build lib/content-revisions.json, the sitemap's lastmod source of truth.

Why this exists
---------------
The sitemap used to stamp every non-article URL with CONTENT_REVISION, a
constant bumped by hand. It was last bumped 2026-08-07, so from Google's side
the sitemap looked frozen even while articles were being expanded and the
catalog was being edited. Search Console last read the sitemap 2026-07-16.

A build-time timestamp is the wrong fix. Google ignores, and can distrust, a
sitemap where every URL carries the build date, because it tells the crawler
nothing about what changed. That was the original 2026-05-07 defect.

So: hash the source data per section. When a section's content hash changes,
its revision date advances to the run date. When it does not, the stored date
is preserved untouched. lastmod then moves exactly when content moves, which
is what the field is supposed to mean.

Run it after any content commit, and from the weekly SEO check-in. It is
idempotent: running it twice with no content change writes nothing.
"""
import hashlib, json, os, subprocess, sys
from datetime import date, timezone, datetime

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT  = os.path.join(ROOT, "lib", "content-revisions.json")

# section -> list of files and/or directories whose content defines that section
SECTIONS = {
    "chairs":   ["lib/chairs.ts"],
    "brands":   ["lib/local-brands.ts"],
    "articles": ["lib/local-articles.ts"],
    "best":     ["app/best"],
    "compare":  ["app/compare"],
    "core":     ["app/page.tsx", "app/finder", "app/buyers-guide",
                 "app/how-we-review", "app/about", "app/contact",
                 "app/disclosure", "app/privacy-policy", "app/terms"],
}


def _hash_path(h, p):
    full = os.path.join(ROOT, p)
    if os.path.isfile(full):
        h.update(p.encode())
        with open(full, "rb") as f:
            for chunk in iter(lambda: f.read(65536), b""):
                h.update(chunk)
    elif os.path.isdir(full):
        for dirpath, dirnames, filenames in os.walk(full):
            dirnames[:] = sorted(d for d in dirnames
                                 if d not in ("__pycache__", "node_modules", ".next"))
            for fn in sorted(filenames):
                if fn.endswith((".pyc", ".map")):
                    continue
                rel = os.path.relpath(os.path.join(dirpath, fn), ROOT)
                _hash_path(h, rel)


def section_hash(paths):
    h = hashlib.sha256()
    for p in paths:
        _hash_path(h, p)
    return h.hexdigest()[:16]


def main():
    today = date.today().isoformat()
    try:
        prev = json.load(open(OUT, encoding="utf-8"))
    except Exception:
        prev = {}

    out, changed = {}, []
    for name, paths in sorted(SECTIONS.items()):
        digest = section_hash(paths)
        old = prev.get(name) or {}
        if old.get("hash") == digest and old.get("revised"):
            out[name] = {"hash": digest, "revised": old["revised"]}
        else:
            out[name] = {"hash": digest, "revised": today}
            changed.append(name)

    if out == prev:
        print("content-revisions.json unchanged")
        return 0

    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, indent=2, sort_keys=True)
        f.write("\n")
    print("wrote", os.path.relpath(OUT, ROOT))
    for name in sorted(out):
        mark = "  <- advanced" if name in changed else ""
        print(f"  {name:9s} {out[name]['revised']}  {out[name]['hash']}{mark}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
