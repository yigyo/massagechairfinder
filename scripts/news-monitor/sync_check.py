#!/usr/bin/env python3
"""
sync_check.py
MCF News Monitor -- Brand list integrity check.

Compares the brands monitored in sources.json against the active brands
in chairs.ts. Flags any brand that is monitored but removed from chairs.ts,
or active in chairs.ts but missing from monitoring.

Run this after any chairs.ts update that adds or removes brands.

Usage:
    python sync_check.py [--fix]

Options:
    --fix   Print a sources.json patch suggestion (does not auto-apply)
"""

import argparse
import json
import re
import sys
from pathlib import Path

SCRIPT_DIR   = Path(__file__).parent
REPO_ROOT    = SCRIPT_DIR.parent.parent
SOURCES_FILE = SCRIPT_DIR / "sources.json"
CHAIRS_FILE  = REPO_ROOT / "lib" / "chairs.ts"

# Brands that are intentionally excluded from monitoring regardless of chairs.ts status
HARD_EXCLUDED = {
    "Inada",       # defunct brand, hard ban per project rules
    "Cozzia",      # all chairs active:false
    "Real Relax",  # all chairs active:false
}


def extract_active_brands_from_chairs_ts(path: Path) -> set[str]:
    """
    Parse chairs.ts and return the set of brand names that have at least
    one chair with active: true.

    Strategy: find all occurrences of brand: 'X' and the nearest following
    active: true/false, then group by brand.
    """
    if not path.exists():
        print(f"[ERR] chairs.ts not found at {path}", file=sys.stderr)
        sys.exit(1)

    text = path.read_text(encoding="utf-8")

    # Extract (brand, active) pairs in document order
    # Pattern: brand: 'BrandName' ... active: true/false
    # We walk through chair objects by finding brand: then active: within ~2000 chars
    pairs: list[tuple[str, bool]] = []
    for m in re.finditer(r"brand:\s*'([^']+)'", text):
        brand = m.group(1).strip()
        # Look ahead up to 2000 chars for the active: field
        chunk = text[m.start():m.start() + 2000]
        active_match = re.search(r"active:\s*(true|false)", chunk)
        if active_match:
            pairs.append((brand, active_match.group(1) == "true"))

    # A brand is "active" if at least one chair has active: true
    brand_status: dict[str, bool] = {}
    for brand, is_active in pairs:
        if brand not in brand_status:
            brand_status[brand] = is_active
        elif is_active:
            brand_status[brand] = True

    return {b for b, active in brand_status.items() if active}


def extract_monitored_brands(sources: dict) -> set[str]:
    """Return the set of brand names in sources.json google_news brand_queries."""
    return {item["brand"] for item in sources["google_news"]["brand_queries"]}


def main():
    parser = argparse.ArgumentParser(description="MCF brand list sync check")
    parser.add_argument("--fix", action="store_true",
                        help="Print suggested additions/removals (does not auto-apply)")
    args = parser.parse_args()

    with open(SOURCES_FILE, encoding="utf-8") as f:
        sources = json.load(f)

    active_in_chairs   = extract_active_brands_from_chairs_ts(CHAIRS_FILE)
    monitored          = extract_monitored_brands(sources)

    # Expected monitored = active brands minus hard-excluded ones
    expected_monitored = active_in_chairs - HARD_EXCLUDED

    missing_from_monitor = expected_monitored - monitored   # in chairs.ts but not sources.json
    extra_in_monitor     = monitored - expected_monitored   # in sources.json but not chairs.ts

    print("=" * 60)
    print("MCF News Monitor -- Brand List Sync Check")
    print("=" * 60)
    print(f"\nActive brands in chairs.ts:     {len(active_in_chairs)}")
    print(f"Hard-excluded brands:           {len(HARD_EXCLUDED)}")
    print(f"Expected monitored brands:      {len(expected_monitored)}")
    print(f"Currently monitored in sources: {len(monitored)}")

    ok = True

    if missing_from_monitor:
        ok = False
        print(f"\n[ALERT] {len(missing_from_monitor)} brand(s) active in chairs.ts "
              "but NOT in sources.json monitoring:")
        for b in sorted(missing_from_monitor):
            print(f"  + ADD: {b}")

    if extra_in_monitor:
        ok = False
        print(f"\n[ALERT] {len(extra_in_monitor)} brand(s) monitored in sources.json "
              "but NOT active in chairs.ts:")
        for b in sorted(extra_in_monitor):
            print(f"  - REMOVE: {b}")

    if ok:
        print("\n[OK] Brand lists are in sync.")
    else:
        print("\nRun with --fix to see suggested query templates for new brands.")

    if args.fix and missing_from_monitor:
        print("\n--- Suggested google_news brand_queries entries to add ---")
        for b in sorted(missing_from_monitor):
            entry = {"brand": b, "q": f'"{b}" "massage chair"'}
            print(f'  {json.dumps(entry)},')
        print("--- Paste these into sources.json google_news.brand_queries ---")

    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
