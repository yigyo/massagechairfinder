#!/usr/bin/env python3
"""Probe all affiliate URLs for the catalog audit."""

import json
import re
import sys
import time
import urllib.request
import urllib.error
import urllib.parse
from html.parser import HTMLParser

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/124.0.0.0 Safari/537.36"
)

TIMEOUT = 20

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text_parts = []
        self._skip = False
        self._script_data = []
        self._in_script = False
        self._in_style = False

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self._in_script = (tag == 'script')
            self._in_style = (tag == 'style')
        else:
            self._in_script = False
            self._in_style = False

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self._in_script = False
            self._in_style = False

    def handle_data(self, data):
        if not self._in_script and not self._in_style:
            stripped = data.strip()
            if stripped:
                self.text_parts.append(stripped)


def fetch_url(url, follow_redirects=True):
    """Return (status, final_url, body_text, response_headers)."""
    req = urllib.request.Request(url, headers={
        'User-Agent': UA,
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
    })
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            final_url = resp.geturl()
            status = resp.status
            body = resp.read(200000)  # read up to 200KB
            try:
                body_text = body.decode('utf-8', errors='replace')
            except Exception:
                body_text = ''
            return status, final_url, body_text, dict(resp.headers)
    except urllib.error.HTTPError as e:
        return e.code, url, '', {}
    except urllib.error.URLError as e:
        return 0, url, '', {}
    except Exception as e:
        return 0, url, str(e), {}


def extract_jsonld(body):
    """Extract all JSON-LD blocks from page body."""
    results = []
    for m in re.finditer(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>', body, re.DOTALL | re.IGNORECASE):
        try:
            data = json.loads(m.group(1).strip())
            results.append(data)
        except Exception:
            pass
    return results


def find_availability(jsonld_blocks, body_text):
    """Return availability string or None."""
    for block in jsonld_blocks:
        items = block if isinstance(block, list) else [block]
        for item in items:
            # check @graph
            if '@graph' in item:
                items = item['@graph']
            for obj in (items if isinstance(items, list) else [items]):
                if isinstance(obj, dict):
                    avail = obj.get('availability') or obj.get('offers', {}).get('availability', '') if isinstance(obj.get('offers'), dict) else ''
                    if avail:
                        return avail
                    # nested offers
                    offers = obj.get('offers')
                    if isinstance(offers, list):
                        for o in offers:
                            if isinstance(o, dict) and o.get('availability'):
                                return o['availability']
    return None


def find_price_jsonld(jsonld_blocks):
    """Return (price, compare_at_price) from JSON-LD or (None, None)."""
    for block in jsonld_blocks:
        items = block if isinstance(block, list) else [block]
        for item in items:
            if '@graph' in item:
                items = item['@graph']
            for obj in (items if isinstance(items, list) else [items]):
                if not isinstance(obj, dict):
                    continue
                offers = obj.get('offers')
                if isinstance(offers, dict):
                    p = offers.get('price') or offers.get('lowPrice')
                    if p is not None:
                        try:
                            return float(str(p).replace(',', '')), None
                        except Exception:
                            pass
                elif isinstance(offers, list):
                    prices = []
                    for o in offers:
                        if isinstance(o, dict):
                            p = o.get('price') or o.get('lowPrice')
                            if p is not None:
                                try:
                                    prices.append(float(str(p).replace(',', '')))
                                except Exception:
                                    pass
                    if prices:
                        return min(prices), max(prices) if len(prices) > 1 else None
    return None, None


def fetch_shopify_json(base_url):
    """Try to fetch Shopify product JSON."""
    # Strip trailing slash, then append .json
    parsed = urllib.parse.urlparse(base_url)
    path = parsed.path.rstrip('/')
    json_url = urllib.parse.urlunparse(parsed._replace(path=path + '.json'))
    req = urllib.request.Request(json_url, headers={'User-Agent': UA})
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as resp:
            body = resp.read(100000)
            data = json.loads(body.decode('utf-8', errors='replace'))
            product = data.get('product', {})
            variants = product.get('variants', [])
            prices = []
            compare_prices = []
            for v in variants:
                if v.get('price'):
                    try:
                        prices.append(float(v['price']))
                    except Exception:
                        pass
                if v.get('compare_at_price'):
                    try:
                        compare_prices.append(float(v['compare_at_price']))
                    except Exception:
                        pass
            price = min(prices) if prices else None
            compare = max(compare_prices) if compare_prices else None
            # availability
            avail = None
            if product.get('available') is not None:
                avail = 'InStock' if product['available'] else 'OutOfStock'
            return price, compare, avail
    except Exception:
        return None, None, None


OOS_PATTERNS = [
    r'\bsold[\s-]?out\b',
    r'\bout[\s-]?of[\s-]?stock\b',
    r'\bno[\s-]?longer[\s-]?available\b',
    r'\bcurrently[\s-]?unavailable\b',
    r'\bnot[\s-]?available\b',
    r'\bdiscontinued\b',
    r'\bavailability[^<]{0,30}OutOfStock\b',
]

def check_oos_text(body):
    text_lower = body.lower()
    for pat in OOS_PATTERNS:
        if re.search(pat, text_lower):
            return True
    return False


def is_oos(availability, body):
    if availability:
        avail_lower = availability.lower()
        if 'outofstock' in avail_lower or 'discontinued' in avail_lower or 'preorder' in avail_lower:
            return True
        if 'instock' in avail_lower or 'in_stock' in avail_lower:
            return False
    return check_oos_text(body)


def probe_chair(chair):
    cid = chair['id']
    name = chair['name']
    url = chair.get('affiliateUrl', '')
    price_min = chair.get('priceMin', 0)

    result = {
        'id': cid,
        'name': name,
        'url': url,
        'priceMin': price_min,
        'status': None,
        'finalUrl': None,
        'probePrice': None,
        'probeCompare': None,
        'availability': None,
        'oos': False,
        'flags': [],
        'notes': '',
    }

    if not url:
        result['flags'].append('NO_URL')
        return result

    status, final_url, body, headers = fetch_url(url)
    result['status'] = status
    result['finalUrl'] = final_url

    if status == 0:
        result['flags'].append('PROBE_ERROR')
        result['notes'] = 'Connection failed'
        return result

    if status == 403:
        result['flags'].append('PROBE_BLOCKED')
        return result

    if status == 404:
        result['flags'].append('BROKEN_LINK')
        return result

    if status not in (200, 301, 302, 303, 307, 308):
        result['flags'].append(f'HTTP_{status}')
        return result

    # Check if final URL is a different product page
    if final_url and final_url != url:
        orig_path = urllib.parse.urlparse(url).path.rstrip('/')
        final_path = urllib.parse.urlparse(final_url).path.rstrip('/')
        # If redirected to a completely different product path, flag it
        if orig_path != final_path and '/products/' in orig_path and '/products/' in final_path:
            # Different product slug
            orig_slug = orig_path.split('/products/')[-1].split('?')[0]
            final_slug = final_path.split('/products/')[-1].split('?')[0]
            if orig_slug != final_slug and '404' not in final_url.lower() and 'search' not in final_url.lower():
                result['flags'].append('REDIRECT_PRODUCT')
                result['notes'] = f'Redirected from {orig_slug} to {final_slug}'
        if '404' in final_url.lower() or 'not-found' in final_url.lower() or 'page-not-found' in final_url.lower():
            result['flags'].append('BROKEN_LINK')
            return result

    # Try Shopify .json first for price + stock (reliable)
    shopify_price, shopify_compare, shopify_avail = None, None, None
    parsed = urllib.parse.urlparse(final_url or url)
    if '/products/' in parsed.path:
        shopify_price, shopify_compare, shopify_avail = fetch_shopify_json(final_url or url)

    # JSON-LD
    jsonld = extract_jsonld(body)
    jsonld_avail = find_availability(jsonld, body)
    jsonld_price, jsonld_compare = find_price_jsonld(jsonld)

    # Prefer Shopify data, fall back to JSON-LD
    probe_price = shopify_price or jsonld_price
    probe_compare = shopify_compare or jsonld_compare
    availability = shopify_avail or jsonld_avail

    result['probePrice'] = probe_price
    result['probeCompare'] = probe_compare
    result['availability'] = availability

    # OOS check
    oos = is_oos(availability, body)
    result['oos'] = oos
    if oos:
        result['flags'].append('OOS')

    # Price mismatch check (only if we have a real price and priceMin > 0)
    if probe_price and price_min and price_min > 0:
        diff_pct = abs(probe_price - price_min) / price_min * 100
        if diff_pct > 5:
            result['flags'].append('PRICE_MISMATCH')
            result['notes'] = (result['notes'] + f' | probe={probe_price} catalog={price_min} diff={diff_pct:.1f}%').strip(' |')

    return result


def main():
    with open('scripts/audit-targets.json') as f:
        data = json.load(f)

    targets = data['targets']
    results = []
    total = len(targets)

    # Deduplicate URLs to avoid redundant fetches
    url_cache = {}

    for i, chair in enumerate(targets):
        url = chair.get('affiliateUrl', '')
        sys.stderr.write(f"\r[{i+1}/{total}] {chair['id'][:50]:<50}")
        sys.stderr.flush()

        if url and url in url_cache:
            # Reuse cached result but update id/name/priceMin
            cached = dict(url_cache[url])
            cached = cached.copy()
            cached['id'] = chair['id']
            cached['name'] = chair['name']
            cached['priceMin'] = chair.get('priceMin', 0)
            # Re-check price mismatch with this chair's priceMin
            cached['flags'] = [f for f in cached['flags'] if f != 'PRICE_MISMATCH']
            cached['notes'] = re.sub(r'\s*\| probe=.*', '', cached.get('notes', ''))
            probe_price = cached.get('probePrice')
            price_min = cached['priceMin']
            if probe_price and price_min and price_min > 0:
                diff_pct = abs(probe_price - price_min) / price_min * 100
                if diff_pct > 5:
                    cached['flags'].append('PRICE_MISMATCH')
                    n = cached.get('notes', '')
                    cached['notes'] = (n + f' | probe={probe_price} catalog={price_min} diff={diff_pct:.1f}%').strip(' |')
            results.append(cached)
            time.sleep(0.1)
            continue

        result = probe_chair(chair)
        results.append(result)
        if url:
            url_cache[url] = result
        time.sleep(0.3)  # polite delay

    sys.stderr.write('\n')
    print(json.dumps(results, indent=2))


if __name__ == '__main__':
    main()
