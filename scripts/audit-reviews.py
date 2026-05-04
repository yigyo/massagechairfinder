#!/usr/bin/env python3
"""
scripts/audit-reviews.py
------------------------
Review data refresh tool for the MCF twice-weekly catalog audit.

Run from the massagechairfinder repo root:
    python3 scripts/audit-reviews.py               # dry run, report only
    python3 scripts/audit-reviews.py --apply        # report + apply to chairs.ts
    python3 scripts/audit-reviews.py --list-manual  # output JSON of Chrome-MCP chairs
    python3 scripts/audit-reviews.py --apply-manual \'[{"id":"...","reviewRating":5.0,"reviewCount":3}]\'

Audit workflow (twice-weekly)
-----------------------------
Phase 1 — automated (Python):
    python3 scripts/audit-reviews.py --apply
    This handles: syncamassagechair.com (Yotpo API), massagechairstore.com (JSON-LD),
    amazon.com (aria-label), massagechairwarehouse / recovathlete / primemassagechairs /
    osakimassagechair.com (Judge.me static badge).

Phase 2 — Chrome MCP (Claude runs this automatically during audit sessions):
    python3 scripts/audit-reviews.py --list-manual
    For each chair in the JSON output, Claude navigates to the URL, scrolls
    the AliReviews widget into view, waits for it to render, reads the rating
    and count, then calls:
    python3 scripts/audit-reviews.py --apply-manual \'[{"id":"...","reviewRating":4.9,"reviewCount":5}]\'

Domain coverage
---------------
    syncamassagechair.com          Yotpo public bottomline API
    massagechairstore.com          JSON-LD aggregateRating in @graph
    amazon.com                     aria-label regex
    massagechairwarehouse.com      Judge.me static badge attrs
    recovathlete.com               Judge.me static badge attrs
    primemassagechairs.com         Judge.me static badge attrs
    osakimassagechair.com          Judge.me static badge attrs (confirmed in static HTML)
    massagechairheaven.com         AliReviews — Chrome MCP phase (lazy JS, needs scrollIntoView + 6s wait)
    wishrockrelaxation.com         SKIP — store-level aggregate, not product-specific
"""

import sys
import re
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

APPLY        = "--apply" in sys.argv
LIST_MANUAL  = "--list-manual" in sys.argv
_am_idx      = next((i for i, a in enumerate(sys.argv) if a == "--apply-manual"), None)
APPLY_MANUAL = sys.argv[_am_idx + 1] if _am_idx is not None else None

CHAIRS_TS = "lib/chairs.ts"
HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept-Language": "en-US,en;q=0.9",
}


# ── Retailer review-fetch methods ─────────────────────────────────────────────

def _fetch(url, timeout=12):
    try:
        r = requests.get(url, headers=HEADERS, timeout=timeout)
        return r.text if r.status_code == 200 else None
    except Exception:
        return None


def fetch_yotpo(affiliate_url):
    """
    syncamassagechair.com and other Yotpo stores.
    Re-detects app key from the page loader URL each run (survives key rotation).
    """
    html = _fetch(affiliate_url)
    if not html:
        return None, None
    key_match = re.search(
        r"cdn-widgetsrepository\.yotpo\.com/v1/loader/([A-Za-z0-9_-]{20,})",
        html
    )
    if not key_match:
        return None, None
    app_key = key_match.group(1)
    soup = BeautifulSoup(html, "html.parser")
    el = soup.find(attrs={"data-yotpo-product-id": True})
    if not el:
        return None, None
    product_id = el.get("data-yotpo-product-id")
    api_url = f"https://api.yotpo.com/products/{app_key}/{product_id}/bottomline"
    try:
        r = requests.get(api_url, headers=HEADERS, timeout=8)
        if r.status_code != 200:
            return None, None
        bl = r.json().get("response", {}).get("bottomline", {})
        avg = bl.get("average_score")
        total = bl.get("total_reviews", 0)
        if total and total > 0:
            return round(float(avg), 2), int(total)
    except Exception:
        pass
    return None, None


def fetch_jsonld(affiliate_url):
    """
    massagechairstore.com — aggregateRating inside a @graph JSON-LD block.
    """
    html = _fetch(affiliate_url)
    if not html:
        return None, None
    soup = BeautifulSoup(html, "html.parser")
    for tag in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(tag.string or "")
            candidates = (
                data if isinstance(data, list)
                else data.get("@graph", [data])
            )
            for node in candidates:
                if not isinstance(node, dict):
                    continue
                ar = node.get("aggregateRating", {})
                if isinstance(ar, dict):
                    rv = ar.get("ratingValue") or ar.get("ratingvalue")
                    rc = int(float(str(
                        ar.get("reviewCount")
                        or ar.get("reviewcount")
                        or ar.get("ratingCount")
                        or 0
                    )))
                    if rv and rc > 0:
                        return round(float(rv), 2), rc
                if node.get("@type") == "AggregateRating":
                    rv = node.get("ratingValue")
                    rc_raw = (
                        node.get("reviewCount")
                        or node.get("ratingCount")
                        or 0
                    )
                    rc = int(float(str(rc_raw)))
                    if rv and rc > 0:
                        desc = node.get("description", "")
                        if "Automatic" in desc:
                            return None, None
                        return round(float(rv), 2), rc
        except Exception:
            pass
    return None, None


def fetch_amazon(affiliate_url):
    """
    Amazon product pages — extract from aria-label attribute.
    Pattern: aria-label="X.X out of 5 stars with N reviews"
    """
    html = _fetch(affiliate_url)
    if not html:
        return None, None
    m = re.search(
        r"aria-label=\"([0-9.]+) out of 5 stars with (\d[\d,]+) reviews?\"",
        html, re.I
    )
    if m:
        rv = round(float(m.group(1)), 2)
        rc = int(m.group(2).replace(",", ""))
        if rc > 0:
            return rv, rc
    return None, None


def fetch_jdgm(affiliate_url):
    """
    Judge.me stores: massagechairwarehouse, recovathlete, primemassagechairs,
    osakimassagechair.com (confirmed: badge attrs are in static HTML, not JS-injected).
    """
    html = _fetch(affiliate_url)
    if not html:
        return None, None
    soup = BeautifulSoup(html, "html.parser")
    badge = soup.find(class_=re.compile("jdgm-prev-badge", re.I))
    if badge:
        avg = badge.get("data-average-rating")
        num = badge.get("data-number-of-reviews")
        if avg and num:
            try:
                rc = int(num)
                rv = float(avg)
                if rc > 0:
                    return round(rv, 2), rc
            except Exception:
                pass
    return None, None


# ── Domain -> fetch method mapping ───────────────────────────────────────────

DOMAIN_METHODS = {
    "syncamassagechair.com":        fetch_yotpo,
    "massagechairstore.com":        fetch_jsonld,
    "amazon.com":                   fetch_amazon,
    "www.amazon.com":               fetch_amazon,
    "massagechairwarehouse.com":    fetch_jdgm,
    "www.massagechairwarehouse.com":fetch_jdgm,
    "recovathlete.com":             fetch_jdgm,
    "www.recovathlete.com":         fetch_jdgm,
    "primemassagechairs.com":       fetch_jdgm,
    "www.primemassagechairs.com":   fetch_jdgm,
    "osakimassagechair.com":        fetch_jdgm,
    "www.osakimassagechair.com":    fetch_jdgm,
}

# massagechairheaven.com uses AliReviews — fully lazy JS, no public API.
# Handled via Chrome MCP in Phase 2 (--list-manual / --apply-manual).
CHROME_MCP_DOMAINS = {
    "massagechairheaven.com",
    "www.massagechairheaven.com",
}

# Store-level aggregate ratings not tied to individual products — skip silently.
SKIP_DOMAINS = {
    "wishrockrelaxation.com",
    "www.wishrockrelaxation.com",
}


# ── Parse chairs.ts ───────────────────────────────────────────────────────────

def parse_chairs(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    chairs = []
    blocks = re.split(r"(?=\{\s*id:)", content)
    for block in blocks:
        id_m = re.search(r"id:\s*[\'\"]([\w-]+)[\'\"]", block)
        if not id_m:
            continue
        if "mcfActive: true" not in block:
            continue
        chair_id = id_m.group(1)

        name_m = re.search(r"name:\s*[\'\"](.*?)[\'\"]", block)
        chair_name = name_m.group(1) if name_m else chair_id

        url_m = re.search(r"affiliateUrl:\s*[\'\"](https?://.*?)[\'\"]", block)
        affiliate_url = url_m.group(1) if url_m else None

        rv_m = re.search(r"reviewRating:\s*([0-9.]+)", block)
        rc_m = re.search(r"reviewCount:\s*(\d+)", block)
        current_rv = float(rv_m.group(1)) if rv_m else None
        current_rc = int(rc_m.group(1)) if rc_m else None

        chairs.append({
            "id": chair_id,
            "name": chair_name,
            "affiliateUrl": affiliate_url,
            "currentRating": current_rv,
            "currentCount": current_rc,
        })
    return chairs, content


# ── Apply changes to chairs.ts ────────────────────────────────────────────────

def apply_update(content, chair_id, new_rv, new_rc):
    """
    Update or insert reviewRating / reviewCount for a chair in chairs.ts.
    Scopes replacement to the specific chair block to prevent cross-chair edits.
    """
    pattern = rf"(id:\s*[\'\"]{{0}}[\'\"]\s*,.*?mcfActive:\s*true\s*,)".format(
        re.escape(chair_id)
    )
    m = re.search(pattern, content, re.DOTALL)
    if not m:
        return content, False

    block_start = content.rfind("{", 0, m.start())
    depth = 0
    block_end = block_start
    for i, ch in enumerate(content[block_start:], block_start):
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                block_end = i
                break

    block = content[block_start : block_end + 1]

    if "reviewRating" in block:
        new_block = re.sub(r"reviewRating:\s*[0-9.]+,", f"reviewRating: {new_rv},", block)
        new_block = re.sub(r"reviewCount:\s*\d+,", f"reviewCount: {new_rc},", new_block)
        content = content[:block_start] + new_block + content[block_end + 1 :]
    else:
        insert_pos = m.end()
        insert_text = f"\n  reviewRating: {new_rv},\n  reviewCount: {new_rc},"
        content = content[:insert_pos] + insert_text + content[insert_pos:]

    return content, True


# ── --list-manual mode ────────────────────────────────────────────────────────

def run_list_manual():
    """
    Output a JSON array of chairs that require Chrome MCP review fetching.
    Claude reads this during an audit session and fetches each URL automatically.

    Chrome MCP fetch instructions for massagechairheaven.com (AliReviews):
      1. navigate to url
      2. wait 6 seconds for page load
      3. javascript: document.querySelector("[id*=\'alireviews\']").scrollIntoView()
      4. wait 6 more seconds for lazy widget to render
      5. javascript: document.querySelector("[id*=\'alireviews\']").innerText
      6. Parse: first numeric line = reviewRating, "Based on X reviews" = reviewCount
         If "Based on 0 reviews" or widget empty -> no data for this chair
    """
    chairs, _ = parse_chairs(CHAIRS_TS)
    result = []
    for chair in chairs:
        url = chair["affiliateUrl"]
        if not url:
            continue
        domain = urlparse(url).netloc.replace("www.", "")
        full_domain = urlparse(url).netloc
        if full_domain in CHROME_MCP_DOMAINS or domain in {
            d.replace("www.", "") for d in CHROME_MCP_DOMAINS
        }:
            result.append({
                "id": chair["id"],
                "name": chair["name"],
                "url": url,
                "domain": domain,
                "currentRating": chair["currentRating"],
                "currentCount": chair["currentCount"],
            })
    print(json.dumps(result, indent=2))


# ── --apply-manual mode ───────────────────────────────────────────────────────

def run_apply_manual(raw_json):
    """
    Accept Chrome MCP results and apply them to chairs.ts.
    Input JSON: [{"id": "...", "reviewRating": 4.9, "reviewCount": 5}, ...]
    """
    try:
        items = json.loads(raw_json)
    except Exception as e:
        print(f"ERROR: could not parse JSON: {e}")
        sys.exit(1)

    _, content = parse_chairs(CHAIRS_TS)
    chairs_map = {c["id"]: c for c in parse_chairs(CHAIRS_TS)[0]}

    applied = 0
    skipped = 0
    for item in items:
        cid = item.get("id")
        new_rv = item.get("reviewRating")
        new_rc = item.get("reviewCount")
        if not cid or new_rv is None or new_rc is None or new_rc == 0:
            print(f"  SKIP (no data): {cid}")
            skipped += 1
            continue
        new_rv = round(float(new_rv), 2)
        new_rc = int(new_rc)
        cur = chairs_map.get(cid, {})
        if cur.get("currentRating") == new_rv and cur.get("currentCount") == new_rc:
            print(f"  UNCHANGED: {cid} ({new_rv}/{new_rc})")
            skipped += 1
            continue
        content, ok = apply_update(content, cid, new_rv, new_rc)
        if ok:
            applied += 1
            action = "UPDATED" if cur.get("currentRating") else "NEW"
            print(f"  {action}: {cid} -> {new_rv} / {new_rc}")
        else:
            print(f"  FAILED: {cid} — block not found")

    with open(CHAIRS_TS, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"\nchairs.ts written. {applied} change(s) applied, {skipped} skipped.")
    print("Next step: commit via git plumbing workflow, then verify Vercel build.")


# ── Main (Phase 1 — automated fetch) ─────────────────────────────────────────

def main():
    if LIST_MANUAL:
        run_list_manual()
        return

    if APPLY_MANUAL is not None:
        run_apply_manual(APPLY_MANUAL)
        return

    print("=" * 60)
    print("MCF Review Data Audit — Phase 1 (automated)")
    print("=" * 60)
    if APPLY:
        print("Mode: APPLY (changes will be written to chairs.ts)")
    else:
        print("Mode: DRY RUN (pass --apply to write changes)")
    print()

    chairs, content = parse_chairs(CHAIRS_TS)
    print(f"Loaded {len(chairs)} mcfActive chairs from chairs.ts\n")

    updated  = []
    new_data = []
    no_data  = []
    chrome_mcp = []

    for chair in chairs:
        chair_id = chair["id"]
        url = chair["affiliateUrl"]
        cur_rv = chair["currentRating"]
        cur_rc = chair["currentCount"]

        if not url:
            no_data.append((chair_id, "no affiliateUrl"))
            continue

        domain = urlparse(url).netloc.replace("www.", "")
        full_domain = urlparse(url).netloc

        if full_domain in SKIP_DOMAINS or domain in {
            d.replace("www.", "") for d in SKIP_DOMAINS
        }:
            no_data.append((chair_id, f"skip ({domain} — store-level rating only)"))
            continue

        if full_domain in CHROME_MCP_DOMAINS or domain in {
            d.replace("www.", "") for d in CHROME_MCP_DOMAINS
        }:
            chrome_mcp.append((chair_id, domain))
            continue

        fetch_fn = DOMAIN_METHODS.get(full_domain) or DOMAIN_METHODS.get(domain)
        if not fetch_fn:
            no_data.append((chair_id, f"no fetch method for {domain}"))
            continue

        print(f"  Checking {chair_id} ({domain})...", end=" ", flush=True)
        new_rv, new_rc = fetch_fn(url)

        if new_rv is None or new_rc is None or new_rc == 0:
            print("no data")
            no_data.append((chair_id, f"0 reviews or fetch failed ({domain})"))
            continue

        print(f"{new_rv} / {new_rc}")

        if cur_rv is None and cur_rc is None:
            new_data.append((chair_id, new_rv, new_rc))
        elif new_rv != cur_rv or new_rc != cur_rc:
            updated.append((chair_id, cur_rv, cur_rc, new_rv, new_rc))

    # Report
    print()
    print("=" * 60)
    print("PHASE 1 RESULTS")
    print("=" * 60)

    if updated:
        print(f"\nUPDATED ({len(updated)}) — rating or count changed:")
        for cid, old_rv, old_rc, nrv, nrc in updated:
            print(f"  {cid}: {old_rv}/{old_rc} -> {nrv}/{nrc}")
    else:
        print("\nUPDATED: none")

    if new_data:
        print(f"\nNEW DATA ({len(new_data)}) — reviews found, previously none:")
        for cid, nrv, nrc in new_data:
            print(f"  {cid}: {nrv} / {nrc}")
    else:
        print("\nNEW DATA: none")

    if chrome_mcp:
        print(f"\nPHASE 2 REQUIRED ({len(chrome_mcp)}) — Chrome MCP fetch (massagechairheaven.com):")
        for cid, domain in chrome_mcp:
            print(f"  {cid} ({domain})")
        print("  Run: python3 scripts/audit-reviews.py --list-manual")
        print("  Then Claude fetches each URL and runs: --apply-manual \'[...]\' ")

    print(f"\nNO DATA: {len(no_data)} chairs (0 reviews, fetch failed, or skipped)")

    # Apply
    changes = updated + [(cid, None, None, rv, rc) for cid, rv, rc in new_data]
    if not changes:
        print("\nNothing to apply.")
        return
    if not APPLY:
        print(f"\nDry run. Run with --apply to write {len(changes)} change(s).")
        return

    print(f"\nApplying {len(changes)} change(s)...")
    applied = 0
    for item in changes:
        cid, _, _, new_rv, new_rc = item[0], item[1], item[2], item[3], item[4]
        content, ok = apply_update(content, cid, new_rv, new_rc)
        if ok:
            applied += 1
            print(f"  Applied: {cid} -> {new_rv} / {new_rc}")
        else:
            print(f"  FAILED:  {cid} — could not locate block")

    with open(CHAIRS_TS, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"\nchairs.ts written. {applied}/{len(changes)} changes applied.")
    print("Next step: run Phase 2 (--list-manual), then commit.")


if __name__ == "__main__":
    main()
