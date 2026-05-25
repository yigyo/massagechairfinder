#!/usr/bin/env python3
"""
catalog-audit-prepass.py

Emits a deterministic JSON list of every chair the weekly affiliate audit must check.
The audit task reads this file and iterates it -- coverage becomes provable instead
of dependent on the agent's parsing of chairs.ts.

Targets: every chair with active === true AND (mcfActive === true OR goodwinActive === true)
that has an affiliateUrl. Discontinued (active:false) chairs are excluded.

Usage:
    cd massagechairfinder/
    python3 scripts/catalog-audit-prepass.py
    # Writes scripts/audit-targets.json (overwrites previous)

The audit task spec must then read scripts/audit-targets.json and report:
    "PREPASS=<N>, CHECKED=<M>, MISSING=<N-M>". If MISSING > 0, fail loudly.
"""

import json, os, re, sys
from datetime import date

HERE     = os.path.dirname(os.path.abspath(__file__))
CHAIRS   = os.path.join(HERE, '..', 'lib', 'chairs.ts')
OUT      = os.path.join(HERE, 'audit-targets.json')

def parse_chairs(src):
    """Find every chair block by id-position with a balanced-brace walk forward."""
    # Locate each chair-opening id: every "id: 'xxx'" preceded by an opening "{"
    chairs = []
    for m in re.finditer(r"""id:\s*['"]([^'"]+)['"]""", src):
        pre = src[max(0, m.start()-200):m.start()]
        if not re.search(r'\{\s*$', pre):
            continue
        cid = m.group(1)
        # Find the next chair-opening id OR end of file -- that's our block boundary
        next_m = re.search(r"""\bid:\s*['"]""", src[m.end():])
        end = m.end() + next_m.start() if next_m else len(src)
        block = src[m.start():end]
        chairs.append({'id': cid, 'block': block})
    return chairs

def field_bool(block, key):
    m = re.search(rf'\b{re.escape(key)}:\s*(true|false)\b', block)
    if m is None:
        return None
    return m.group(1) == 'true'

def field_string(block, key):
    """Match key: 'value' or key: \"value\" (terminated by , or newline)."""
    m = re.search(rf"""{re.escape(key)}:\s*['"]([^'"]+)['"]""", block)
    return m.group(1) if m else None

def field_number(block, key):
    m = re.search(rf'\b{re.escape(key)}:\s*(\d+)', block)
    return int(m.group(1)) if m else None

def main():
    src = open(CHAIRS, encoding='utf-8').read()
    chairs = parse_chairs(src)
    print(f'Parsed {len(chairs)} total chair records from chairs.ts', file=sys.stderr)

    targets = []
    skipped = []
    for c in chairs:
        b = c['block']
        active   = field_bool(b, 'active')
        mcf      = field_bool(b, 'mcfActive')
        goodwin  = field_bool(b, 'goodwinActive')
        url      = field_string(b, 'affiliateUrl')
        in_stock = field_bool(b, 'inStock')

        if not active:
            skipped.append((c['id'], 'discontinued'))
            continue
        if not (mcf or goodwin):
            skipped.append((c['id'], 'both-off'))
            continue
        if not url:
            skipped.append((c['id'], 'no-affiliateUrl'))
            continue

        targets.append({
            'id':                 c['id'],
            'name':               field_string(b, 'name'),
            'brand':              field_string(b, 'brand'),
            'affiliateUrl':       url,
            'affiliateRetailer':  field_string(b, 'affiliateRetailer'),
            'priceMin':           field_number(b, 'priceMin'),
            'priceMax':           field_number(b, 'priceMax'),
            'mcfActive':          mcf,
            'goodwinActive':      goodwin,
            'inStockCurrent':     False if in_stock is False else True,
        })

    out = {
        'generatedAt':   date.today().isoformat(),
        'totalRecords':  len(chairs),
        'targetCount':   len(targets),
        'skippedCount':  len(skipped),
        'skipped':       [{'id': i, 'reason': r} for i, r in skipped],
        'targets':       targets,
    }
    open(OUT, 'w', encoding='utf-8').write(json.dumps(out, indent=2))
    print(f'Wrote {OUT}: {len(targets)} audit targets ({len(skipped)} skipped)', file=sys.stderr)
    print(f'  by retailer:', file=sys.stderr)
    by_ret = {}
    for t in targets:
        by_ret[t['affiliateRetailer']] = by_ret.get(t['affiliateRetailer'], 0) + 1
    for ret, n in sorted(by_ret.items(), key=lambda x: -x[1]):
        print(f'    {ret or "(none)"}: {n}', file=sys.stderr)

if __name__ == '__main__':
    main()
