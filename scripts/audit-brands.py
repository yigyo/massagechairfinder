#!/usr/bin/env python3
"""
audit-brands.py
Run from the massagechairfinder/ directory:
  python3 scripts/audit-brands.py

Checks local-brands.ts against chairs.ts for:
  1. priceRange accuracy (now informational only -- priceRange is computed dynamically)
  2. Model names referenced in prose that no longer exist in the active catalog
  3. Model counts mentioned in prose vs actual catalog count
  4. Prices mentioned in taglines/descriptions that don't match current chair prices
"""
import re, sys, os
from pathlib import Path

ROOT = Path(__file__).parent.parent

def parse_chairs(path):
    content = path.read_text(encoding='utf-8')
    chairs = []
    # Extract each chair object
    lines = content.split('\n')
    depth = 0
    in_block = False
    block_lines = []

    for line in lines:
        opens = line.count('{') - line.count("'{") - line.count('`{')
        closes = line.count('}') - line.count("'}") - line.count('`}')
        if depth == 0 and opens > 0:
            depth += opens - closes
            in_block = True
            block_lines = [line]
        elif in_block:
            block_lines.append(line)
            depth += opens - closes
            if depth <= 0:
                depth = 0
                in_block = False
                block = '\n'.join(block_lines)
                id_m = re.search(r"id:\s*'([^']+)'", block)
                name_m = re.search(r"name:\s*'([^']+)'", block)
                brand_m = re.search(r"brand:\s*'([^']+)'", block)
                pmin_m = re.search(r'priceMin:\s*(\d+)', block)
                pmax_m = re.search(r'priceMax:\s*(\d+)', block)
                active_m = re.search(r'\bactive:\s*(true|false)', block)
                mcf_m = re.search(r'mcfActive:\s*(true|false)', block)
                if id_m and name_m and brand_m:
                    active = active_m.group(1) == 'true' if active_m else True
                    mcf = mcf_m.group(1) if mcf_m else 'true'
                    chairs.append({
                        'id': id_m.group(1),
                        'name': name_m.group(1),
                        'brand': brand_m.group(1),
                        'priceMin': int(pmin_m.group(1)) if pmin_m else 0,
                        'priceMax': int(pmax_m.group(1)) if pmax_m else 0,
                        'active': active,
                        'mcfActive': mcf,
                    })
                block_lines = []
    return chairs

def parse_brands(path):
    content = path.read_text(encoding='utf-8')
    brands = []
    # Find each brand block by slug
    for m in re.finditer(r'slug:\s*"([^"]+)"', content):
        slug = m.group(1)
        start = m.start()
        end = content.find('\n  },', start)
        if end == -1:
            end = len(content)
        block = content[start:end]
        name_m = re.search(r'name:\s*"([^"]+)"', block)
        pr_m = re.search(r'priceRange:\s*"([^"]+)"', block)
        tagline_m = re.search(r'tagline:\s*"([^"]+)"', block)
        desc_m = re.findall(r'"<p>([^"]*)</p>"', block)
        bestfor_m = re.search(r'bestFor:\s*"([^"]+)"', block)
        if name_m:
            brands.append({
                'slug': slug,
                'name': name_m.group(1),
                'priceRange': pr_m.group(1) if pr_m else '',
                'tagline': tagline_m.group(1) if tagline_m else '',
                'description': ' '.join(desc_m),
                'bestFor': bestfor_m.group(1) if bestfor_m else '',
            })
    return brands

def fmt_price(n):
    return f'${n:,}'

def main():
    chairs_path = ROOT / 'lib' / 'chairs.ts'
    brands_path = ROOT / 'lib' / 'local-brands.ts'

    if not chairs_path.exists() or not brands_path.exists():
        print("ERROR: Must run from the massagechairfinder/ directory")
        sys.exit(1)

    chairs = parse_chairs(chairs_path)
    brands = parse_brands(brands_path)

    issues = []

    for brand in brands:
        slug = brand['slug']
        name = brand['name']

        # Get active in-stock chairs for this brand
        bc = [c for c in chairs if c['brand'] == name and c['active'] and c['mcfActive'] != 'false']
        oos = [c for c in chairs if c['brand'] == name and c['active'] and c['mcfActive'] == 'false']

        if not bc and not oos:
            continue  # Brand not in catalog at all -- skip

        # 1. Compute correct price range
        prices = [c['priceMin'] for c in bc] + [c['priceMax'] for c in bc if c['priceMax']]
        if prices:
            actual_min = min(prices)
            actual_max = max(prices)
            static_pr = brand['priceRange']
            # Parse static price range
            static_prices = [int(p.replace('$','').replace(',','')) for p in re.findall(r'\$[\d,]+', static_pr)]
            if static_prices and (min(static_prices) != actual_min or max(static_prices) != actual_max):
                issues.append(f"[{name}] priceRange in local-brands.ts: '{static_pr}' -- actual: '{fmt_price(actual_min)} to {fmt_price(actual_max)}' (NOTE: price box now auto-computed; fix tagline/seoDescription if they mention wrong prices)")

        # 2. Check for OOS model names mentioned in prose
        all_text = brand['tagline'] + ' ' + brand['description'] + ' ' + brand['bestFor']
        # Build a set of words that appear in ACTIVE chair names (these are not unique OOS identifiers)
        active_name_words = set()
        for ac in bc:
            active_name_words.update(w.lower() for w in ac['name'].split())

        for c in oos:
            # Only flag if a non-brand, non-shared part of the OOS chair name appears in the prose
            # Skip parts that are just the brand name or shared with active chair names
            brand_words = set(name.lower().split())
            model_parts = c['name'].split()
            matched = False
            for part in model_parts:
                part_lower = part.lower()
                # Skip if part is a brand word or also used in an active chair name
                if part_lower in brand_words or part_lower in active_name_words:
                    continue
                if len(part) >= 4 and re.search(re.escape(part), all_text, re.IGNORECASE):
                    issues.append(f"[{name}] PROSE REFERENCES OOS CHAIR: '{c['name']}' (part: '{part}') -- update or remove from description/tagline")
                    matched = True
                    break

        # 3. Check for non-existent model names in prose
        active_names_flat = ' '.join(c['name'] for c in bc).lower()
        # Look for dollar amounts in prose that don't match any active chair price
        prose_prices = re.findall(r'\$(\d[\d,]+)', all_text)
        active_prices = set(c['priceMin'] for c in bc) | set(c['priceMax'] for c in bc if c['priceMax'])
        for pp in prose_prices:
            pval = int(pp.replace(',',''))
            if pval > 500 and pval not in active_prices:
                issues.append(f"[{name}] STALE PRICE IN PROSE: ${pval:,} -- not in active catalog. Active prices: {', '.join(fmt_price(p) for p in sorted(active_prices))}")

        # 4. Active chair count vs. any numeric count mentioned in prose
        # Use negative lookbehind to avoid matching numbers inside prices (e.g. "990" from "$11,990 chair")
        count_mentions = re.findall(r'(?<![,\d])(one|two|three|four|five|six|seven|eight|nine|ten)\s+(?:current\s+)?(?:active\s+)?(?:US\s+)?(?:chair|model)', all_text, re.IGNORECASE)
        word_to_num = {'one':1,'two':2,'three':3,'four':4,'five':5,'six':6,'seven':7,'eight':8,'nine':9,'ten':10}
        # Only flag if NO count mention in the prose matches the catalog count (sub-group counts are OK)
        count_values = []
        for mention in count_mentions:
            n = word_to_num.get(mention.lower())
            if n:
                count_values.append((mention, n))
        if count_values and not any(n == len(bc) for _, n in count_values):
            # All count mentions disagree with catalog -- flag the first one
            mention, n = count_values[0]
            issues.append(f"[{name}] STALE MODEL COUNT: prose says '{mention}' but catalog has {len(bc)} active chairs")

    print(f"\n{'='*60}")
    print(f"BRAND PAGE AUDIT -- {len(brands)} brands checked")
    print(f"{'='*60}\n")

    if not issues:
        print("NO ISSUES FOUND. All brand pages are consistent with the catalog.")
    else:
        print(f"{len(issues)} issue(s) found:\n")
        for i, issue in enumerate(issues, 1):
            print(f"  {i}. {issue}")

    print(f"\n{'='*60}")
    print("Run this script after any catalog change (chairs.ts update).")
    print("Schedule: Tuesdays and Fridays.")

if __name__ == '__main__':
    main()
