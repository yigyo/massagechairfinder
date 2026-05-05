#!/usr/bin/env python3
"""
audit-compare.py -- MassageChairFinder compare page canonical audit

Checks all compare page files for banned patterns and required patterns.
Run before every commit that touches compare pages.
Also run with --git to verify the git tree (not just disk) after any commit.

Usage:
  python3 scripts/audit-compare.py              # audit disk files
  python3 scripts/audit-compare.py --git        # audit git HEAD tree
"""

import subprocess
import sys
import os
import re

COMPARE_DIR = "app/compare"

STUB_SLUGS = {"inada-dreamwave-vs-jpmedics-kumo-4d", "synca-jp970-vs-kahuna-lm-6800"}

REQUIRED_PATTERNS = {
    "Specs Compared heading":   r"Specs Compared",
    "Choose the ... if:":       r"Choose the .{3,60} if:",
    "items-baseline bullets":   r"items-baseline",
    "navy or teal arrow bullet": r"text-navy[^>]*>.*?[›>]|text-teal[^>]*>.*?[›>]",
    "warm linen callout":       r"F5F1EB|bg-sand",
}

BANNED_PATTERNS = {
    "quiz":             r"\bquiz\b",
    "Who should buy":   r"Who should buy",
    "side by side":     r"side by side",
    "em dash":          r"—|&mdash;",
    "double hyphen":    r" -- ",
}

def get_slugs():
    slugs = []
    for entry in sorted(os.listdir(COMPARE_DIR)):
        full = os.path.join(COMPARE_DIR, entry)
        if os.path.isdir(full) and entry not in STUB_SLUGS:
            page = os.path.join(full, "page.tsx")
            if os.path.exists(page):
                slugs.append(entry)
    return slugs

def read_disk(slug):
    with open(os.path.join(COMPARE_DIR, slug, "page.tsx"), encoding="utf-8") as f:
        return f.read()

def read_git(slug):
    path = f"{COMPARE_DIR}/{slug}/page.tsx"
    result = subprocess.run(
        ["git", "show", f"HEAD:{path}"],
        capture_output=True, text=True
    )
    if result.returncode != 0:
        return None
    return result.stdout

def audit_content(slug, content):
    errors = []

    for name, pattern in REQUIRED_PATTERNS.items():
        if not re.search(pattern, content, re.DOTALL):
            errors.append(f"MISSING required: {name}")

    for name, pattern in BANNED_PATTERNS.items():
        if re.search(pattern, content, re.DOTALL | re.IGNORECASE):
            errors.append(f"BANNED pattern found: {name}")

    return errors

def main():
    use_git = "--git" in sys.argv
    source = "git HEAD" if use_git else "disk"

    os.chdir(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    slugs = get_slugs()
    print(f"\nMCF Compare Page Audit -- {source.upper()}")
    print(f"Checking {len(slugs)} pages (excluding {len(STUB_SLUGS)} stubs)\n")

    all_pass = True
    for slug in slugs:
        content = read_git(slug) if use_git else read_disk(slug)
        if content is None:
            print(f"  ERROR  {slug}  (could not read from {source})")
            all_pass = False
            continue

        errors = audit_content(slug, content)
        if errors:
            all_pass = False
            print(f"  FAIL  {slug}")
            for e in errors:
                print(f"         {e}")
        else:
            print(f"  PASS  {slug}")

    print()
    if all_pass:
        print("All compare pages PASS.")
    else:
        print("FAILURES FOUND. Fix before pushing.")
        sys.exit(1)

if __name__ == "__main__":
    main()
