#!/usr/bin/env python3
"""
Probe each affiliate URL from audit-targets.json.
Extracts JSON-LD availability and price. Never infers stock from HTML text or CSS.
Outputs scripts/probe-results.json.
"""

import json, re, time, sys
import urllib.request, urllib.error
from urllib.parse import urlparse

TARGETS_FILE = "/home/user/massagechairfinder/scripts/audit-targets.json"
OUTPUT_FILE  = "/home/user/massagechairfinder/scripts/probe-results.json"

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) "
        "Chrome/124.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}

SCHEMA_AVAILABILITY = {
    "http://schema.org/InStock":           "InStock",
    "https://schema.org/InStock":          "InStock",
    "InStock":                             "InStock",
    "http://schema.org/OutOfStock":        "OutOfStock",
    "https://schema.org/OutOfStock":       "OutOfStock",
    "OutOfStock":                          "OutOfStock",
    "http://schema.org/PreOrder":          "PreOrder",
    "https://schema.org/PreOrder":         "PreOrder",
    "PreOrder":                            "PreOrder",
    "http://schema.org/BackOrder":         "BackOrder",
    "https://schema.org/BackOrder":        "BackOrder",
    "BackOrder":                           "BackOrder",
    "http://schema.org/Discontinued":      "Discontinued",
    "https://schema.org/Discontinued":     "Discontinued",
    "Discontinued":                        "Discontinued",
    "http://schema.org/LimitedAvailability": "InStock",
    "https://schema.org/LimitedAvailability": "InStock",
    "LimitedAvailability":                 "InStock",
    "http://schema.org/OnlineOnly":        "InStock",
    "https://schema.org/OnlineOnly":       "InStock",
    "OnlineOnly":                          "InStock",
}

def fetch_url(url, timeout=20):
    """Fetch URL, follow redirects, return (status, final_url, body_text)."""
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            final_url = resp.geturl()
            body = resp.read().decode("utf-8", errors="replace")
            return resp.status, final_url, body
    except urllib.error.HTTPError as e:
        return e.code, url, ""
    except urllib.error.URLError as e:
        return None, url, str(e)
    except Exception as e:
        return None, url, str(e)

def extract_jsonld_blocks(html):
    """Return list of parsed JSON-LD dicts from <script type="application/ld+json"> blocks."""
    pattern = re.compile(
        r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',
        re.DOTALL | re.IGNORECASE
    )
    results = []
    for m in pattern.finditer(html):
        raw = m.group(1).strip()
        try:
            obj = json.loads(raw)
            results.append(obj)
        except json.JSONDecodeError:
            # Try to strip JS comments/trailing commas
            try:
                cleaned = re.sub(r'//[^\n]*', '', raw)
                cleaned = re.sub(r',\s*([}\]])', r'\1', cleaned)
                obj = json.loads(cleaned)
                results.append(obj)
            except Exception:
                results.append({"_parse_error": raw[:200]})
    return results

def extract_shopify_product_json(html):
    """Try to extract window.ShopifyAnalytics or product JSON embedded in page."""
    # Look for /products/xxx.js style product JSON embedded inline
    patterns = [
        r'var\s+meta\s*=\s*({.*?"product".*?});',
        r'window\.ShopifyAnalytics\s*=\s*\{.*?"product"\s*:\s*({.*?})\s*[,}]',
    ]
    for pat in patterns:
        m = re.search(pat, html, re.DOTALL)
        if m:
            try:
                return json.loads(m.group(1))
            except Exception:
                pass
    return None

def get_availability_from_offers(offers):
    """
    Given an offers value (dict or list), return:
      - "InStock" if any offer is InStock (or equivalent)
      - "OutOfStock" if ALL offers are OutOfStock
      - None if no availability found
    """
    if isinstance(offers, dict):
        offers = [offers]
    if not isinstance(offers, list):
        return None

    statuses = []
    for offer in offers:
        if not isinstance(offer, dict):
            continue
        avail_raw = offer.get("availability") or offer.get("itemCondition")
        if avail_raw:
            normalized = SCHEMA_AVAILABILITY.get(avail_raw)
            if normalized:
                statuses.append(normalized)

    if not statuses:
        return None
    if any(s == "InStock" for s in statuses):
        return "InStock"
    if any(s == "PreOrder" for s in statuses):
        return "PreOrder"
    if all(s == "OutOfStock" for s in statuses):
        return "OutOfStock"
    if all(s == "Discontinued" for s in statuses):
        return "Discontinued"
    # Mixed result - treat as InStock if any non-OutOfStock
    return statuses[0]

def get_price_from_offers(offers):
    """Extract price from offers dict or list."""
    if isinstance(offers, dict):
        offers = [offers]
    if not isinstance(offers, list):
        return None
    for offer in offers:
        if not isinstance(offer, dict):
            continue
        price = offer.get("price")
        if price is not None:
            try:
                return float(price)
            except (ValueError, TypeError):
                pass
        low = offer.get("lowPrice") or offer.get("priceRange")
        if low:
            try:
                return float(str(low).replace("$", "").replace(",", "").strip())
            except Exception:
                pass
    return None

def analyse_jsonld(blocks):
    """
    Return (availability_str_or_None, price_float_or_None, parse_error_bool).
    availability_str is one of: "InStock", "OutOfStock", "PreOrder", "Discontinued", or None.
    """
    parse_error = False
    availability = None
    price = None

    for block in blocks:
        if "_parse_error" in block:
            parse_error = True
            continue

        # Handle @graph
        items = []
        if isinstance(block, list):
            items = block
        elif block.get("@graph"):
            items = block["@graph"]
        else:
            items = [block]

        for item in items:
            if not isinstance(item, dict):
                continue

            rtype = item.get("@type", "")
            if isinstance(rtype, list):
                rtype = " ".join(rtype)

            # Product
            if "Product" in rtype or "ItemPage" in rtype:
                offers = item.get("offers") or item.get("Offers")
                if offers:
                    a = get_availability_from_offers(offers)
                    if a and availability is None:
                        availability = a
                    p = get_price_from_offers(offers)
                    if p and price is None:
                        price = p

            # Offer directly
            if "Offer" in rtype:
                a = get_availability_from_offers(item)
                if a and availability is None:
                    availability = a
                p = get_price_from_offers(item)
                if p and price is None:
                    price = p

    return availability, price, parse_error

def is_different_product_url(original_url, final_url):
    """Return True if the final URL points to a clearly different product."""
    orig_path = urlparse(original_url).path.rstrip("/").lower()
    final_path = urlparse(final_url).path.rstrip("/").lower()
    orig_host = urlparse(original_url).netloc.lower()
    final_host = urlparse(final_url).netloc.lower()

    # Different host = different product
    if orig_host != final_host:
        return True

    # Same path = same product
    if orig_path == final_path:
        return False

    # If final lands on /collections/ or homepage = different
    if re.search(r'^/collections/?$|^/$|^/pages/', final_path):
        return True

    # If both have /products/ slug, compare slugs
    orig_m = re.search(r'/products/([^/?#]+)', orig_path)
    final_m = re.search(r'/products/([^/?#]+)', final_path)
    if orig_m and final_m:
        return orig_m.group(1) != final_m.group(1)

    return orig_path != final_path

def probe_target(target):
    url = target["affiliateUrl"]
    chair_id = target["id"]
    price_min = target.get("priceMin")

    status, final_url, body = fetch_url(url)

    result = {
        "id": chair_id,
        "name": target["name"],
        "url": url,
        "finalUrl": final_url,
        "httpStatus": status,
        "availability": None,
        "price": None,
        "priceMin": price_min,
        "flag": None,
        "notes": [],
    }

    # Handle non-200 statuses
    if status is None:
        result["flag"] = "FETCH_ERROR"
        result["notes"].append(f"Network error: {body[:100]}")
        return result

    if status == 403:
        result["flag"] = "PROBE_BLOCKED"
        result["notes"].append("HTTP 403 - bot block")
        return result

    if status == 404:
        result["flag"] = "BROKEN_LINK"
        result["notes"].append("HTTP 404")
        return result

    if status >= 400:
        result["flag"] = "BROKEN_LINK"
        result["notes"].append(f"HTTP {status}")
        return result

    # Check redirect to different product
    if is_different_product_url(url, final_url):
        result["flag"] = "BROKEN_LINK"
        result["notes"].append(f"Redirected to different product: {final_url}")
        return result

    # Extract JSON-LD
    blocks = extract_jsonld_blocks(body)
    availability, price, parse_error = analyse_jsonld(blocks)

    result["availability"] = availability
    result["price"] = price

    if parse_error and not blocks:
        result["notes"].append("JSON-LD parse error in some blocks")

    # Determine stock flag
    if availability is None:
        if parse_error:
            result["flag"] = "STOCK_UNKNOWN"
            result["notes"].append("JSON-LD present but parse error; availability unreadable")
        else:
            result["flag"] = "STOCK_UNKNOWN"
            result["notes"].append("No JSON-LD availability found on page")
    elif availability == "OutOfStock":
        result["flag"] = "OOS"
    elif availability == "Discontinued":
        result["flag"] = "OOS"
        result["notes"].append("JSON-LD availability: Discontinued")
    else:
        # InStock / PreOrder / BackOrder -> live
        # Check price mismatch
        if price is not None and price_min is not None:
            diff_pct = abs(price - price_min) / price_min * 100
            if diff_pct > 5:
                result["flag"] = "PRICE_MISMATCH"
                result["notes"].append(
                    f"Live price ${price:.0f} vs catalog ${price_min} ({diff_pct:.1f}% diff)"
                )
            else:
                result["flag"] = "OK"
        else:
            result["flag"] = "OK"

    return result

def main():
    with open(TARGETS_FILE) as f:
        data = json.load(f)

    targets = data["targets"]
    total = len(targets)
    results = []

    print(f"Probing {total} affiliate URLs...", flush=True)
    for i, target in enumerate(targets, 1):
        print(f"  [{i:3d}/{total}] {target['id']} ... ", end="", flush=True)
        t0 = time.time()
        result = probe_target(target)
        elapsed = time.time() - t0
        flag = result.get("flag", "?")
        print(f"{flag}  ({elapsed:.1f}s)", flush=True)
        results.append(result)
        # Small polite delay between requests to same host
        time.sleep(0.3)

    output = {
        "auditDate": "2026-06-02",
        "totalProbed": total,
        "results": results,
    }

    with open(OUTPUT_FILE, "w") as f:
        json.dump(output, f, indent=2)

    print(f"\nResults written to {OUTPUT_FILE}")

    # Summary
    from collections import Counter
    flags = Counter(r["flag"] for r in results)
    print("\nSummary:")
    for flag, count in sorted(flags.items()):
        print(f"  {flag}: {count}")

if __name__ == "__main__":
    main()
