#!/usr/bin/env python3
"""
Affiliate URL probe script for catalog audit.
Fetches each URL, checks HTTP status, extracts JSON-LD availability and price.
"""

import json
import sys
import time
import re
import urllib.request
import urllib.error
import urllib.parse
from html.parser import HTMLParser

TARGETS_FILE = "scripts/audit-targets.json"
OUTPUT_FILE = "scripts/probe-results.json"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
}

PRICE_TOLERANCE = 0.05  # 5%


class JSONLDExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_ld = False
        self.ld_blocks = []
        self._buf = []

    def handle_starttag(self, tag, attrs):
        if tag == "script":
            attrs_dict = dict(attrs)
            if attrs_dict.get("type") == "application/ld+json":
                self.in_ld = True
                self._buf = []

    def handle_endtag(self, tag):
        if tag == "script" and self.in_ld:
            self.ld_blocks.append("".join(self._buf))
            self.in_ld = False
            self._buf = []

    def handle_data(self, data):
        if self.in_ld:
            self._buf.append(data)


def fetch_url(url, max_redirects=10):
    """Fetch URL following redirects, return (status, final_url, body_bytes)."""
    current_url = url
    redirects = 0
    last_status = None

    while redirects <= max_redirects:
        try:
            req = urllib.request.Request(current_url, headers=HEADERS)
            # Don't auto-follow redirects so we can track them
            opener = urllib.request.build_opener(
                urllib.request.HTTPRedirectHandler()
            )
            with opener.open(req, timeout=20) as resp:
                final_url = resp.geturl()
                status = resp.status
                body = resp.read(500_000)  # cap at 500KB
                return status, final_url, body.decode("utf-8", errors="replace")
        except urllib.error.HTTPError as e:
            return e.code, current_url, ""
        except urllib.error.URLError as e:
            return None, current_url, f"URLError: {e.reason}"
        except Exception as e:
            return None, current_url, f"Error: {e}"

    return last_status, current_url, ""


def parse_jsonld_availability(body):
    """
    Extract availability from JSON-LD blocks.
    Returns:
      'InStock', 'OutOfStock', 'STOCK_UNKNOWN', or 'NONE'
    NONE = no JSON-LD block at all
    STOCK_UNKNOWN = JSON-LD present but unreadable/no availability
    """
    extractor = JSONLDExtractor()
    try:
        extractor.feed(body)
    except Exception:
        return "STOCK_UNKNOWN", None

    if not extractor.ld_blocks:
        return "NONE", None

    product_ld = None
    for block in extractor.ld_blocks:
        try:
            data = json.loads(block)
        except Exception:
            continue
        # Handle @graph
        if isinstance(data, dict) and data.get("@graph"):
            for item in data["@graph"]:
                if isinstance(item, dict) and item.get("@type") in ("Product",):
                    data = item
                    break
        if isinstance(data, dict) and data.get("@type") in ("Product", "ItemPage"):
            product_ld = data
            break

    if product_ld is None:
        # Check if any block has availability
        for block in extractor.ld_blocks:
            try:
                data = json.loads(block)
                if isinstance(data, dict) and "availability" in str(data):
                    product_ld = data
                    break
            except Exception:
                continue

    if product_ld is None:
        return "STOCK_UNKNOWN", None

    # Extract availability
    offers = product_ld.get("offers") or product_ld.get("Offers")
    if not offers:
        return "STOCK_UNKNOWN", None

    if isinstance(offers, dict):
        offers_list = [offers]
    elif isinstance(offers, list):
        offers_list = offers
    else:
        return "STOCK_UNKNOWN", None

    availabilities = []
    prices = []
    compare_at_prices = []

    for offer in offers_list:
        if not isinstance(offer, dict):
            continue
        avail = offer.get("availability", "")
        if avail:
            # Normalize schema.org URLs
            avail_norm = avail.replace("https://schema.org/", "").replace("http://schema.org/", "")
            availabilities.append(avail_norm)
        price = offer.get("price") or offer.get("lowPrice")
        if price is not None:
            try:
                prices.append(float(str(price).replace(",", "")))
            except Exception:
                pass
        compare = offer.get("highPrice")
        if compare is not None:
            try:
                compare_at_prices.append(float(str(compare).replace(",", "")))
            except Exception:
                pass

    if not availabilities:
        return "STOCK_UNKNOWN", prices[0] if prices else None

    # If ANY variant is InStock -> InStock
    if any("InStock" in a for a in availabilities):
        stock = "InStock"
    elif all("OutOfStock" in a for a in availabilities):
        stock = "OutOfStock"
    else:
        stock = "STOCK_UNKNOWN"

    return stock, prices[0] if prices else None


def parse_shopify_price(body, url):
    """Try to extract price from Shopify product JSON embedded in page."""
    # Try /products/<slug>.js pattern in-page
    match = re.search(r'"price"\s*:\s*(\d+)', body)
    if match:
        try:
            # Shopify prices in cents
            cents = int(match.group(1))
            if cents > 100:  # Likely in cents
                return cents / 100.0
            return float(cents)
        except Exception:
            pass
    return None


def check_is_different_product_page(original_url, final_url):
    """Check if redirect landed on a different product."""
    orig_path = urllib.parse.urlparse(original_url).path.rstrip("/")
    final_path = urllib.parse.urlparse(final_url).path.rstrip("/")
    if orig_path != final_path:
        orig_domain = urllib.parse.urlparse(original_url).netloc
        final_domain = urllib.parse.urlparse(final_url).netloc
        # Different domain or path -> potentially different product
        if orig_domain != final_domain:
            return True
        # Same domain different path
        if orig_path != final_path:
            # Allow trailing slash differences
            if orig_path.rstrip("/") != final_path.rstrip("/"):
                return True
    return False


def probe_target(target):
    result = {
        "id": target["id"],
        "name": target["name"],
        "affiliateUrl": target["affiliateUrl"],
        "priceMin": target["priceMin"],
        "inStockCurrent": target.get("inStockCurrent", None),
    }

    url = target["affiliateUrl"]
    status, final_url, body = fetch_url(url)

    result["httpStatus"] = status
    result["finalUrl"] = final_url

    if status is None:
        result["flag"] = "PROBE_ERROR"
        result["note"] = body
        return result

    if status == 403:
        result["flag"] = "PROBE_BLOCKED"
        return result

    if status == 404:
        result["flag"] = "BROKEN_LINK"
        result["note"] = "HTTP 404"
        return result

    if status in (301, 302, 303, 307, 308):
        # urllib followed redirects, check final
        if check_is_different_product_page(url, final_url):
            # Check if it's a 404 redirect (homepage/search)
            if any(kw in final_url for kw in ["/404", "/not-found", "collections/all", "/search"]):
                result["flag"] = "BROKEN_LINK"
                result["note"] = f"Redirected to {final_url}"
                return result
            result["flag"] = "BROKEN_LINK"
            result["note"] = f"Redirected to different product: {final_url}"
            return result

    # Parse JSON-LD
    stock, ld_price = parse_jsonld_availability(body)

    result["jsonLdStock"] = stock
    result["jsonLdPrice"] = ld_price

    if stock == "NONE":
        # Try Shopify product JSON
        shopify_price = parse_shopify_price(body, final_url)
        result["shopifyPrice"] = shopify_price
        result["flag"] = "STOCK_UNKNOWN"
        result["note"] = "No JSON-LD block found"
    elif stock == "STOCK_UNKNOWN":
        result["flag"] = "STOCK_UNKNOWN"
        result["note"] = "JSON-LD present but availability unreadable"
    elif stock == "OutOfStock":
        result["flag"] = "OOS"
    elif stock == "InStock":
        result["flag"] = "OK"
    else:
        result["flag"] = "STOCK_UNKNOWN"

    # Price check (only when live)
    price_to_check = ld_price
    if price_to_check is None:
        price_to_check = result.get("shopifyPrice")

    if price_to_check and result["flag"] in ("OK", "STOCK_UNKNOWN"):
        price_min = target["priceMin"]
        if price_min and price_min > 0:
            diff = abs(price_to_check - price_min) / price_min
            if diff > PRICE_TOLERANCE:
                result["priceMismatch"] = True
                result["livePrice"] = price_to_check
                result["expectedPriceMin"] = price_min
                if result["flag"] == "OK":
                    result["flag"] = "PRICE_MISMATCH"

    return result


def main():
    with open(TARGETS_FILE) as f:
        data = json.load(f)

    targets = data["targets"]
    total = len(targets)
    results = []

    print(f"Probing {total} URLs...", file=sys.stderr)

    for i, target in enumerate(targets):
        print(f"  [{i+1}/{total}] {target['id']} -> {target['affiliateUrl'][:80]}", file=sys.stderr)
        result = probe_target(target)
        print(f"    => {result['flag']} (HTTP {result.get('httpStatus')})", file=sys.stderr)
        results.append(result)
        # Small delay to be polite
        time.sleep(0.3)

    with open(OUTPUT_FILE, "w") as f:
        json.dump(results, f, indent=2)

    print(f"\nResults written to {OUTPUT_FILE}", file=sys.stderr)

    # Summary
    flags = {}
    for r in results:
        f = r.get("flag", "UNKNOWN")
        flags[f] = flags.get(f, 0) + 1
    print("\nSummary:", file=sys.stderr)
    for k, v in sorted(flags.items()):
        print(f"  {k}: {v}", file=sys.stderr)


if __name__ == "__main__":
    main()
