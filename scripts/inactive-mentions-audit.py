#!/usr/bin/env python3
"""
inactive-mentions-audit.py
Run from massagechairfinder/:  python3 scripts/inactive-mentions-audit.py

Finds every rendered mention of a chair that is inactive in lib/chairs.ts
(active: false, or mcfActive: false): its display name in prose, a
/chairs/<id> link, or a quoted id, across app/**/*.tsx, local-articles.ts
and local-brands.ts. catalog-health-audit.py only checks PICK_IDS and compare
pages; this catches the prose, FAQ and article mentions it misses.

Exit 1 when any hit is not on the ALLOW list, so a deactivation is not done
until this passes. Added 2026-11-27 after the Osaki OS-Pro Admiral II stayed
recommended on 17 rendered spots for 18 days after it was deactivated.
"""
import re, glob, sys

ALLOW = [
    # (file, chair id): intentional mentions
    ("app/chairs/[slug]/page.tsx", "*"),          # per-chair code for discontinued pages
    ("lib/nav-data.ts", "osaki-os-pro-admiral-ii"), # label of a compare stub that redirects to /compare
    ("lib/nav-data.ts", "kahuna-lm-6800s"),
    ("lib/local-brands.ts", "kahuna-lm-6800"),      # Kahuna FAQ explaining the LM-6800 retirement
    ("lib/local-brands.ts", "kahuna-lm-6800s"),
]

src = open("lib/chairs.ts", encoding="utf-8").read()
active, inactive = set(), {}
for b in re.split(r"\n  \{\n", src)[1:]:
    i = re.search(r"id:\s*'([^']+)'", b); n = re.search(r"name:\s*'([^']+)'", b)
    a = re.search(r"\bactive:\s*(true|false)", b); m = re.search(r"\bmcfActive:\s*(true|false)", b)
    if not (i and n and a): continue
    if a.group(1) == "true" and not (m and m.group(1) == "false"):
        active.add(n.group(1))
    else:
        inactive[i.group(1)] = n.group(1)
active_ids = {re.search(r"id:\s*'([^']+)'", b).group(1) for b in re.split(r"\n  \{\n", src)[1:]
              if re.search(r"id:\s*'([^']+)'", b) and re.search(r"\bactive:\s*true", b)}

files = [f for f in glob.glob("app/**/*.tsx", recursive=True) if "/api/" not in f]
files += ["lib/local-articles.ts", "lib/local-brands.ts", "lib/nav-data.ts"]
hits = []
for f in files:
    try: t = open(f, encoding="utf-8").read()
    except OSError: continue
    for cid, name in inactive.items():
        if cid in active_ids: continue  # duplicate record of an active chair
        if any(f == af and (ac == "*" or ac == cid) for af, ac in ALLOW): continue
        pats = [re.escape("/chairs/" + cid) + r"[\"'`]", r"['\"]" + re.escape(cid) + r"['\"]"]
        if name not in active and not any(x != name and x.startswith(name) for x in active):
            pats.append(re.escape(name) + r"(?![\w-])")
        for p in pats:
            for mm in re.finditer(p, t):
                hits.append((f, t.count("\n", 0, mm.start()) + 1, cid, name))
hits = sorted(set(hits))
for f, ln, cid, name in hits:
    print(f"{f}:{ln}  {cid}  ({name})")
print(f"INACTIVE MENTIONS: {'FAIL' if hits else 'OK'} ({len(hits)} hit(s), {len(inactive)} inactive chairs checked)")
sys.exit(1 if hits else 0)
