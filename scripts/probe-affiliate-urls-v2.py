#!/usr/bin/env python3
"""
Probe affiliate URLs using curl (better TLS fingerprint than urllib).
Converts www.massagechairwarehouse.com -> massagechairwarehouse.com (no-www version accessible).
Outputs scripts/probe-results.json.
"""

import json, re, time, subprocess, sys, os
from urllib.parse import urlparse

TARGETS_FILE = "/home/user/massagechairfinder/scripts/audit-targets.json"
OUTPUT_FILE  = "/home/user/massagechairfinder/scripts/probe-results.json"

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/124.0.0.0 Safari/537.36"
)

# Domains where stripping www gives a working URL
STRIP_WWW_DOMAINS = {
    "www.massagechairwarehouse.com": "massagechairwarehouse.com",
    "www.relaxonchair.com": "relaxonchair.com",
}

SCHEMA_AVAILABILITY = {
    "http://schema.org/InStock":            "InStock",
    "https://schema.org/InStock":           "InStock",
    "InStock":                              "InStock",
    "http://schema.org/OutOfStock":         "OutOfStock",
    "https://schema.org/OutOfStock":        "OutOfStock",
    "OutOfStock":                           "OutOfStock",
    "http://schema.org/PreOrder":           "PreOrder",
    "https://schema.org/PreOrder":          "PreOrder",
    "PreOrder":                             "PreOrder",
    "http://schema.org/BackOrder":          "BackOrder",
    "https://schema.org/BackOrder":         "BackOrder",
    "BackOrder":                            "BackOrder",
    "http://schema.org/Discontinued":       "Discontinued",
    "https://schema.org/Discontinued":      "Discontinued",
    "Discontinued":                         "Discontinued",
    "http://schema.org/LimitedAvailability":"InStock",
    "https://schema.org/LimitedAvailability":"InStock",
    "LimitedAvailability":                  "InStock",
    "http://schema.org/OnlineOnly":         "InStock",
    "https://schema.org/OnlineOnly":        "InStock",
    "OnlineOnly":                           "InStock",
    "http://schema.org/SoldOut":            "OutOfStock",
    "https://schema.org/SoldOut":           "OutOfStock",
    "SoldOut":                              "OutOfStock",
}

def normalise_url(url):
    """Apply domain normalisation rules (e.g. strip www where we know it works)."""
    parsed = urlparse(url)
    host = parsed.netloc
    if host in STRIP_WWW_DOMAINS:
        new_host = STRIP_WWW_DOMAINS[host]
        url = url.replace(f"://{host}/", f"://{new_host}/", 1)
    return url

def fetch_with_curl(url, timeout=25):
    """
    Fetch URL via curl. Returns (http_status_int, final_url_str, body_str).
    """
    cmd = [
        "curl", "-s", "-L",
        "--max-time", str(timeout),
        "-w", "CURL_STATUS:%{http_code}\\nCURL_URL:%{url_effective}\\n",
        "-H", f"User-Agent: {UA}",
        "-H", "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "-H", "Accept-Language: en-US,en;q=0.5",
        "-H", "Accept-Encoding: gzip, deflate",
        "--compressed",
        url,
    ]
    try:
        result = subprocess.run(cmd, capture_output=True, timeout=timeout + 5)
        raw = result.stdout.decode("utf-8", errors="replace")
        # Split off the trailing status lines
        status_line = re.search(r'CURL_STATUS:(\d+)', raw)
        url_line = re.search(r'CURL_URL:([^\n]+)', raw)
        # Strip the appended status lines from body
        body_end = raw.find("CURL_STATUS:")
        body = raw[:body_end] if body_end >= 0 else raw
        http_status = int(status_line.group(1)) if status_line else None
        final_url = url_line.group(1).strip() if url_line else url
        return http_status, final_url, body
    except subprocess.TimeoutExpired:
        return None, url, "Timeout"
    except Exception as e:
        return None, url, str(e)

def extract_jsonld_blocks(html):
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
            try:
                cleaned = re.sub(r'//[^\n]*', '', raw)
                cleaned = re.sub(r',\s*([}\]])', r'\1', cleaned)
                obj = json.loads(cleaned)
                results.append(obj)
            except Exception:
                results.append({"_parse_error": raw[:200]})
    return results

def get_availability_from_offers(offers):
    if isinstance(offers, dict):
        offers = [offers]
    if not isinstance(offers, list):
        return None
    statuses = []
    for offer in offers:
        if not isinstance(offer, dict):
            continue
        avail_raw = offer.get("availability")
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
    if any(s == "BackOrder" for s in statuses):
        return "BackOrder"
    if all(s in ("OutOfStock", "Discontinued", "SoldOut") for s in statuses):
        return "OutOfStock"
    return statuses[0]

def get_price_from_offers(offers):
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
                return float(str(price).replace(",", "").replace("$", "").strip())
            except (ValueError, TypeError):
                pass
        low = offer.get("lowPrice")
        if low is not None:
            try:
                return float(str(low).replace(",", "").replace("$", "").strip())
            except Exception:
                pass
    return None

def analyse_jsonld(blocks):
    parse_error = False
    availability = None
    price = None
    for block in blocks:
        if "_parse_error" in block:
            parse_error = True
            continue
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
            if "Product" in rtype or "ItemPage" in rtype:
                offers = item.get("offers") or item.get("Offers")
                if offers:
                    a = get_availability_from_offers(offers)
                    if a and availability is None:
                        availability = a
                    p = get_price_from_offers(offers)
                    if p and price is None:
                        price = p
            if "Offer" in rtype:
                a = get_availability_from_offers(item)
                if a and availability is None:
                    availability = a
                p = get_price_from_offers(item)
                if p and price is None:
                    price = p
    return availability, price, parse_error

def is_different_product_url(original_url, final_url):
    orig_path = urlparse(original_url).path.rstrip("/").lower()
    final_path = urlparse(final_url).path.rstrip("/").lower()
    orig_host = urlparse(original_url).netloc.lower().lstrip("www.")
    final_host = urlparse(final_url).netloc.lower().lstrip("www.")
    if orig_host != final_host:
        # Allow www.X <-> X redirects (same domain, just www prefix change)
        return False
    if orig_path == final_path:
        return False
    if re.search(r'^/collections/?$|^/$|^/pages/|^/search', final_path):
        return True
    orig_m = re.search(r'/products/([^/?#]+)', orig_path)
    final_m = re.search(r'/products/([^/?#]+)', final_path)
    if orig_m and final_m:
        return orig_m.group(1) != final_m.group(1)
    return orig_path != final_path

def probe_target(target):
    original_url = target["affiliateUrl"]
    url = normalise_url(original_url)
    chair_id = target["id"]
    price_min = target.get("priceMin")

    status, final_url, body = fetch_with_curl(url)

    result = {
        "id": chair_id,
        "name": target["name"],
        "url": original_url,
        "probedUrl": url,
        "finalUrl": final_url,
        "httpStatus": status,
        "availability": None,
        "price": None,
        "priceMin": price_min,
        "flag": None,
        "notes": [],
    }

    if status is None:
        result["flag"] = "FETCH_ERROR"
        result["notes"].append(f"Error: {body[:120]}")
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

    if is_different_product_url(url, final_url):
        result["flag"] = "BROKEN_LINK"
        result["notes"].append(f"Redirected to different product: {final_url}")
        return result

    blocks = extract_jsonld_blocks(body)
    availability, price, parse_error = analyse_jsonld(blocks)

    result["availability"] = availability
    result["price"] = price

    if parse_error:
        result["notes"].append("JSON-LD parse error in some blocks")

    if availability is None:
        result["flag"] = "STOCK_UNKNOWN"
        if parse_error:
            result["notes"].append("JSON-LD present but unreadable; availability unknown")
        else:
            result["notes"].append("No JSON-LD availability field on this page")
    elif availability == "OutOfStock":
        result["flag"] = "OOS"
    elif availability == "Discontinued":
        result["flag"] = "OOS"
        result["notes"].append("JSON-LD availability: Discontinued")
    else:
        if price is not None and price_min is not None and price_min > 0:
            diff_pct = abs(price - price_min) / price_min * 100
            if diff_pct > 5:
                result["flag"] = "PRICE_MISMATCH"
                result["notes"].append(
                    f"Live price ${price:.0f} vs catalog priceMin ${price_min} ({diff_pct:.1f}% diff)"
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

    print(f"Probing {total} affiliate URLs with curl...", flush=True)
    for i, target in enumerate(targets, 1):
        print(f"  [{i:3d}/{total}] {target['id']} ... ", end="", flush=True)
        t0 = time.time()
        result = probe_target(target)
        elapsed = time.time() - t0
        flag = result.get("flag", "?")
        status = result.get("httpStatus", "?")
        print(f"{flag} (HTTP {status}, {elapsed:.1f}s)", flush=True)
        results.append(result)
        time.sleep(0.25)

    output = {
        "auditDate": "2026-06-02",
        "totalProbed": total,
        "results": results,
    }

    with open(OUTPUT_FILE, "w") as f:
        json.dump(output, f, indent=2)

    print(f"\nResults written to {OUTPUT_FILE}")

    from collections import Counter
    flags = Counter(r["flag"] for r in results)
    print("\nSummary:")
    for flag, count in sorted(flags.items()):
        print(f"  {flag}: {count}")

if __name__ == "__main__":
    main()
