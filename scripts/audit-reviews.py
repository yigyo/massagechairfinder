#!/usr/bin/env python3
"""
scripts/audit-reviews.py
------------------------
Review data refresh tool for the MCF twice-weekly catalog audit.

Run from the massagechairfinder repo root:
    python3 scripts/audit-reviews.py

What it does
------------
1. Reads all mcfActive chairs from lib/chairs.ts
2. For each chair, attempts to fetch the current review rating and count
   from the affiliate retailer using whichever method works for that retailer:
     - syncamassagechair.com : Yotpo public bottomline API
     - massagechairstore.com : JSON-LD aggregateRating in @graph
     - amazon.com            : aria-label regex on product page
     - massagechairwarehouse / recovathlete / primemassagechairs : Judge.me badge attrs
3. Compares fetched data to current chairs.ts values
4. Reports three categories:
     UPDATED : review count or rating changed since last audit
     NEW     : chair now has reviews but had none in chairs.ts
     NO DATA : could not extract review data (JS-rendered or 0 reviews)
5. Applies updates to chairs.ts in place (via direct Python file write)
   Only writes if --apply flag is passed.

Usage
-----
    python3 scripts/audit-reviews.py            # dry run, report only
    python3 scripts/audit-reviews.py --apply    # report + apply changes to chairs.ts

NOTES
-----
- massagechairheaven.com uses AliReviews (fully JS-rendered, no API).
  Those chairs are listed as MANUAL CHECK required — use Chrome MCP to load
  the page and read the star count from the rendered widget.
- wishrockrelaxation.com shows a store-level aggregate rating (same 4.86/7
  for every product). Skip — it is not product-specific review data.
- The syncamassagechair.com Yotpo app key is embedded in the loader URL.
  It is re-detected from the page automatically each run, so a key rotation
  won't silently break the script.
"""

import sys
import re
import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse

APPLY = "--apply" in sys.argv
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
    1. Load the product page to get the Yotpo app_key + product_id.
    2. Call the public bottomline API — no auth needed.
    """
    html = _fetch(affiliate_url)
    if not html:
        return None, None

    # Extract app key from loader URL
    key_match = re.search(
        r'cdn-widgetsrepository\.yotpo\.com/v1/loader/([A-Za-z0-9_-]{20,})',
        html
    )
    if not key_match:
        return None, None
    app_key = key_match.group(1)

    # Extract product ID
    soup = BeautifulSoup(html, "html.parser")
    el = soup.find(attrs={"data-yotpo-product-id": True})
    if not el:
        return None, None
    product_id = el.get("data-yotpo-product-id")

    # Call bottomline API
    api_url = (
        f"https://api.yotpo.com/products/{app_key}/{product_id}/bottomline"
    )
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
                # Standalone AggregateRating node
                if node.get("@type") == "AggregateRating":
                    rv = node.get("ratingValue")
                    rc_raw = (
                        node.get("reviewCount")
                        or node.get("ratingCount")
                        or 0
                    )
                    rc = int(float(str(rc_raw)))
                    if rv and rc > 0:
                        # Reject store-level aggregates (same count on all pages)
                        # Wishrockrelaxation uses this pattern — skip description check
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
        r'aria-label="([0-9.]+) out of 5 stars with (\d[\d,]+) reviews?"',
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
    Judge.me stores (massagechairwarehouse, recovathlete, primemassagechairs).
    Reads data-average-rating and data-number-of-reviews from jdgm-prev-badge.
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
    "syncamassagechair.com":      fetch_yotpo,
    "massagechairstore.com":      fetch_jsonld,
    "amazon.com":                  fetch_amazon,
    "www.amazon.com":              fetch_amazon,
    "massagechairwarehouse.com":   fetch_jdgm,
    "www.massagechairwarehouse.com": fetch_jdgm,
    "recovathlete.com":            fetch_jdgm,
    "www.recovathlete.com":        fetch_jdgm,
    "primemassagechairs.com":      fetch_jdgm,
    "www.primemassagechairs.com":  fetch_jdgm,
}

# Domains known to use JS-rendered review apps with no accessible API.
# These require manual review via Chrome MCP.
MANUAL_CHECK_DOMAINS = {
    "massagechairheaven.com",
    "www.massagechairheaven.com",
    # osakimassagechair.com uses an older Yotpo embed with no extractable key
    "osakimassagechair.com",
    "www.osakimassagechair.com",
}

# Domains confirmed to have no real per-product review data (skip silently).
SKIP_DOMAINS = {
    # Store-level aggregate rating — not product-specific
    "wishrockrelaxation.com",
    "www.wishrockrelaxation.com",
    # syncamassagechair.com subdomain pattern covers fujiiryoki too
}


# ── Parse chairs.ts ───────────────────────────────────────────────────────────

def parse_chairs(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    chairs = []
    # Split into blocks between top-level { braces
    blocks = re.split(r"(?=\{\s*id:)", content)
    for block in blocks:
        id_m = re.search(r"id:\s*['\"](.+?)['\"]", block)
        if not id_m:
            continue
        if "mcfActive: true" not in block:
            continue
        chair_id = id_m.group(1)

        url_m = re.search(r"affiliateUrl:\s*['\"](.+?)['\"]", block)
        affiliate_url = url_m.group(1) if url_m else None

        rv_m = re.search(r"reviewRating:\s*([0-9.]+)", block)
        rc_m = re.search(r"reviewCount:\s*(\d+)", block)
        current_rv = float(rv_m.group(1)) if rv_m else None
        current_rc = int(rc_m.group(1)) if rc_m else None

        chairs.append({
            "id": chair_id,
            "affiliateUrl": affiliate_url,
            "currentRating": current_rv,
            "currentCount": current_rc,
        })
    return chairs, content


# ── Apply changes to chairs.ts ────────────────────────────────────────────────

def apply_update(content, chair_id, new_rv, new_rc):
    """
    Update or insert reviewRating / reviewCount for a chair in chairs.ts.
    """
    # Try to update existing fields first
    updated = False

    # Replace existing reviewRating value
    def replace_rv(m):
        nonlocal updated
        updated = True
        return f"reviewRating: {new_rv},"

    def replace_rc(m):
        return f"reviewCount: {new_rc},"

    # Find the chair block to scope replacements
    pattern = rf"(id:\s*['\"]{{0}}['\"]\s*,.*?mcfActive:\s*true\s*,)".format(
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
        # Update existing values
        new_block = re.sub(r"reviewRating:\s*[0-9.]+,", f"reviewRating: {new_rv},", block)
        new_block = re.sub(r"reviewCount:\s*\d+,", f"reviewCount: {new_rc},", new_block)
        content = content[:block_start] + new_block + content[block_end + 1 :]
    else:
        # Insert after mcfActive: true,
        insert_pos = m.end()
        insert_text = f"\n  reviewRating: {new_rv},\n  reviewCount: {new_rc},"
        content = content[:insert_pos] + insert_text + content[insert_pos:]

    return content, True


# ── Main ──────────────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("MCF Review Data Audit")
    print("=" * 60)
    if APPLY:
        print("Mode: APPLY (changes will be written to chairs.ts)")
    else:
        print("Mode: DRY RUN (pass --apply to write changes)")
    print()

    chairs, content = parse_chairs(CHAIRS_TS)
    print(f"Loaded {len(chairs)} mcfActive chairs from chairs.ts\n")

    updated = []   # (id, old_rv, old_rc, new_rv, new_rc)
    new_data = []  # (id, new_rv, new_rc) — chairs that had none before
    no_data = []   # (id, reason)
    manual = []    # (id, domain)

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

        if full_domain in MANUAL_CHECK_DOMAINS or domain in {
            d.replace("www.", "") for d in MANUAL_CHECK_DOMAINS
        }:
            manual.append((chair_id, domain))
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
        # else: unchanged — no action

    # ── Report ────────────────────────────────────────────────────────────────

    print()
    print("=" * 60)
    print("RESULTS")
    print("=" * 60)

    if updated:
        print(f"\nUPDATED ({len(updated)} chair(s)) — rating or count changed:")
        for cid, old_rv, old_rc, nrv, nrc in updated:
            print(f"  {cid}: {old_rv}/{old_rc} -> {nrv}/{nrc}")
    else:
        print("\nUPDATED: none (all existing ratings are current)")

    if new_data:
        print(f"\nNEW DATA ({len(new_data)} chair(s)) — now have reviews, previously none:")
        for cid, nrv, nrc in new_data:
            print(f"  {cid}: {nrv} / {nrc}")
    else:
        print("\nNEW DATA: none")

    if manual:
        print(f"\nMANUAL CHECK REQUIRED ({len(manual)} chair(s)) — JS-rendered reviews:")
        for cid, domain in manual:
            print(f"  {cid} ({domain}) — use Chrome MCP to load page and read star widget")

    print(f"\nNO DATA: {len(no_data)} chairs (0 reviews, fetch failed, or method skipped)")

    # ── Apply ─────────────────────────────────────────────────────────────────

    changes = updated + [(cid, None, None, rv, rc) for cid, rv, rc in new_data]

    if not changes:
        print("\nNothing to apply.")
        return

    if not APPLY:
        print(f"\nDry run complete. Run with --apply to write {len(changes)} change(s) to chairs.ts.")
        return

    print(f"\nApplying {len(changes)} change(s) to chairs.ts...")
    applied = 0
    for item in changes:
        cid = item[0]
        new_rv = item[3]
        new_rc = item[4]
        content, ok = apply_update(content, cid, new_rv, new_rc)
        if ok:
            applied += 1
            print(f"  Applied: {cid} -> {new_rv} / {new_rc}")
        else:
            print(f"  FAILED:  {cid} — could not locate block")

    with open(CHAIRS_TS, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"\nchairs.ts written. {applied}/{len(changes)} changes applied.")
    print("Next step: commit via git plumbing workflow, then verify Vercel build.")


if __name__ == "__main__":
    main()
