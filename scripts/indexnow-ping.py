#!/usr/bin/env python3
"""Ping IndexNow with the URLs that changed, so Bing, DuckDuckGo, Yahoo and
Yandex recrawl them immediately instead of waiting for a scheduled crawl.

Why this exists: MCF already performs better on Bing and DuckDuckGo than on
Google, and IndexNow is the free, instant submission path for exactly those
engines. Google does not participate in IndexNow.

Usage, after every content deploy, with the URLs that actually changed:

    python3 scripts/indexnow-ping.py \
        https://www.massagechairfinder.com/learn/some-slug \
        https://www.massagechairfinder.com/learn/another-slug

Submit only pages that genuinely changed. Submitting the whole site on every
deploy is what gets a host rate limited.

The key file lives at public/<KEY>.txt and contains exactly <KEY>. That file is
how IndexNow verifies we control the host, so it must stay deployed and must
not be renamed.
"""
import json, sys, os, glob, re, urllib.request, urllib.error

HOST = "www.massagechairfinder.com"
ENDPOINT = "https://api.indexnow.org/indexnow"
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_key():
    """The key is whichever public/<hex>.txt file holds its own name as content."""
    for path in sorted(glob.glob(os.path.join(ROOT, "public", "*.txt"))):
        name = os.path.splitext(os.path.basename(path))[0]
        if not re.fullmatch(r"[0-9a-f]{8,128}", name):
            continue
        with open(path, encoding="utf-8") as fh:
            if fh.read().strip() == name:
                return name
    raise SystemExit("no IndexNow key file found under public/")


def main(argv):
    key = load_key()
    urls, rejected = [], []
    for u in argv:
        (urls if u.startswith("https://" + HOST + "/") else rejected).append(u)
    for u in rejected:
        print("skipped (not an absolute URL on %s): %s" % (HOST, u))
    if not urls:
        raise SystemExit("no URLs to submit")

    payload = {
        "host": HOST,
        "key": key,
        "keyLocation": "https://%s/%s.txt" % (HOST, key),
        "urlList": urls,
    }
    req = urllib.request.Request(
        ENDPOINT,
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            code, body = resp.status, resp.read().decode("utf-8", "replace")[:400]
    except urllib.error.HTTPError as exc:
        code, body = exc.code, exc.read().decode("utf-8", "replace")[:400]
    print("submitted %d url(s), HTTP %s %s" % (len(urls), code, body))
    # 200 accepted, 202 accepted with key validation pending. Both are success.
    return 0 if code in (200, 202) else 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
