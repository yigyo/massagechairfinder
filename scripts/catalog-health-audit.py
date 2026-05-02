#!/usr/bin/env python3
"""
catalog-health-audit.py
MassageChairFinder structural catalog health check.

Checks:
  1. All PICK_IDS on /best/* pages reference active, mcfActive chairs
  2. All compare pages reference active chairs (errors on inactive, warns on OOS)
  3. All /best/* PICK_IDS have a matching EDITORIAL entry (label + why)

Run from the massagechairfinder project root:
  python3 scripts/catalog-health-audit.py

Exits with code 1 if any ERRORS are found (inactive chairs in picks/compares).
Warnings (OOS chairs in compare pages) are printed but do not fail the check.
"""

import os, re, sys
from datetime import date

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHAIRS_TS = os.path.join(BASE, 'lib', 'chairs.ts')
BEST_DIR  = os.path.join(BASE, 'app', 'best')
CMP_DIR   = os.path.join(BASE, 'app', 'compare')

# ── load catalog ──────────────────────────────────────────────────────────────

def load_catalog():
    with open(CHAIRS_TS, 'r', encoding='utf-8') as f:
        content = f.read()
    chairs = {}
    for m in re.finditer(r"id: '([^']+)'", content):
        cid = m.group(1)
        block = content[m.start():m.start() + 400]
        chairs[cid] = {
            'active':    'active: true'    in block,
            'mcfActive': 'mcfActive: true' in block,
        }
    return chairs

# ── helpers ───────────────────────────────────────────────────────────────────

def chair_status(chairs, cid):
    if cid not in chairs:
        return 'NOT_IN_CATALOG'
    c = chairs[cid]
    if not c['active']:
        return 'INACTIVE'
    if not c['mcfActive']:
        return 'OOS'
    return 'OK'

# ── check /best/* pages ───────────────────────────────────────────────────────

def check_best_pages(chairs):
    errors, warnings = [], []
    best_pages = sorted([
        d for d in os.listdir(BEST_DIR)
        if os.path.isdir(os.path.join(BEST_DIR, d))
        and os.path.exists(os.path.join(BEST_DIR, d, 'page.tsx'))
        and d != '[category]'
    ])

    for page in best_pages:
        path = os.path.join(BEST_DIR, page, 'page.tsx')
        with open(path, 'r', encoding='utf-8') as f:
            content = f.read()

        pick_match = re.search(r'const PICK_IDS\s*=\s*\[(.*?)\]', content, re.DOTALL)
        if not pick_match:
            errors.append(f'/best/{page}: PICK_IDS not found')
            continue
        pick_ids = re.findall(r"'([^']+)'", pick_match.group(1))

        ed_start = content.find('const EDITORIAL')
        ed_end   = content.find('\nfunction fmtFt', ed_start)
        if ed_end == -1:
            ed_end = content.find('\nexport default', ed_start)
        editorial_block = content[ed_start:ed_end] if ed_start != -1 else ''

        for cid in pick_ids:
            status = chair_status(chairs, cid)
            if status == 'INACTIVE':
                errors.append(f'ERROR /best/{page}: pick "{cid}" is INACTIVE')
            elif status in ('NOT_IN_CATALOG', 'OOS'):
                errors.append(f'ERROR /best/{page}: pick "{cid}" is {status}')

            if ed_start != -1 and f"'{cid}'" not in editorial_block:
                errors.append(f'ERROR /best/{page}: pick "{cid}" missing EDITORIAL entry')

    return errors, warnings

# ── check compare pages ───────────────────────────────────────────────────────

def check_compare_pages(chairs):
    errors, warnings = [], []
    if not os.path.exists(CMP_DIR):
        return errors, warnings

    for slug in sorted(os.listdir(CMP_DIR)):
        page_path = os.path.join(CMP_DIR, slug, 'page.tsx')
        if slug == '__pycache__' or not os.path.isfile(page_path):
            continue

        with open(page_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Skip redirect stubs
        if 'redirect(' in content and len(content.strip()) < 200:
            continue

        referenced = [cid for cid in chairs if cid in content]
        if not referenced:
            warnings.append(f'WARN /compare/{slug}: no catalog chair IDs found')
            continue

        for cid in referenced[:4]:
            status = chair_status(chairs, cid)
            if status == 'INACTIVE':
                # Fully discontinued chair in a compare page is an error
                errors.append(f'ERROR /compare/{slug}: references INACTIVE chair "{cid}"')
            elif status == 'OOS':
                # OOS chair in a compare page is a warning — page may still be useful
                warnings.append(f'WARN  /compare/{slug}: references OOS chair "{cid}" (mcfActive=false) — consider updating')

    return errors, warnings

# ── check compare index ───────────────────────────────────────────────────────

def check_compare_index(chairs):
    errors, warnings = [], []
    index = os.path.join(CMP_DIR, 'page.tsx')
    if not os.path.exists(index):
        return errors, warnings

    with open(index, 'r', encoding='utf-8') as f:
        content = f.read()

    slugs = re.findall(r"slug: '([^']+)'", content)
    for slug in slugs:
        slug_dir = os.path.join(CMP_DIR, slug)
        if not os.path.isdir(slug_dir):
            errors.append(f'ERROR compare index: slug "{slug}" has no matching directory')

    return errors, warnings

# ── main ──────────────────────────────────────────────────────────────────────

def main():
    chairs = load_catalog()
    print(f'Loaded {len(chairs)} chair IDs from catalog.\n')

    all_errors, all_warnings = [], []

    e, w = check_best_pages(chairs)
    all_errors += e; all_warnings += w

    e, w = check_compare_pages(chairs)
    all_errors += e; all_warnings += w

    e, w = check_compare_index(chairs)
    all_errors += e; all_warnings += w

    today = date.today().isoformat()

    if not all_errors and not all_warnings:
        print(f'[{today}] CATALOG HEALTH: ALL CLEAR')
        sys.exit(0)

    if all_errors:
        print(f'[{today}] ERRORS ({len(all_errors)}):')
        for e in all_errors:
            print(f'  {e}')
        print()

    if all_warnings:
        print(f'[{today}] WARNINGS ({len(all_warnings)}):')
        for w in all_warnings:
            print(f'  {w}')
        print()

    if all_errors:
        sys.exit(1)
    else:
        print(f'[{today}] CATALOG HEALTH: OK (warnings only)')
        sys.exit(0)

if __name__ == '__main__':
    main()
