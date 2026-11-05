#!/usr/bin/env python3
"""Post queued Pinterest pins from pinterest-queue/queue.json via the Pinterest
v5 API. Runs in GitHub Actions (.github/workflows/pinterest-post.yml), because
the Claude Cowork sandbox blocks pin_post.py's direct API calls.

Credentials come from GitHub Actions repo secrets:
  PINTEREST_APP_ID, PINTEREST_APP_SECRET, PINTEREST_REFRESH_TOKEN

A fresh access token is minted from the refresh token on every run, so the
30-day access-token expiry never bites. The refresh token itself lasts about a
year (minted 2026-10-26); redo the OAuth flow in social-automation/PIN-SETUP.md
before then and update the PINTEREST_REFRESH_TOKEN secret.

queue.json is a JSON array. mcf-operator appends entries like:
  {
    "id": "S-DELIVERYDAY-2026-11-02",
    "status": "pending",
    "board": "buyer-mistakes",
    "image": "pinterest-queue/assets/S-DELIVERYDAY-2026-11-02.png",
    "title": "...",
    "description": "...",
    "link": "https://www.massagechairfinder.com/learn/...",
    "campaign": "delivery-day",
    "alt_text": ""
  }
This script only touches "pending" entries, flipping each to "posted" (with
pin_id/pin_url) or "failed" (with the error). The workflow commits the result.
"""
import base64, json, os, sys, time, urllib.request, urllib.error, urllib.parse

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
QUEUE_PATH = os.path.join(ROOT, "pinterest-queue", "queue.json")
API = "https://api.pinterest.com/v5"

# Keep in sync with the "boards" map in eComm/.credentials/pinterest.json.
BOARD_IDS = {
    "features-explained": "1090645303450866058",
    "buyer-mistakes": "1090645303450866060",
    "best-by-use-case": "1090645303450866061",
    "brand-profiles": "1090645303450866056",
    "conditions-wellness": "1090645303450881727",
    "find-your-chair": "1090645303450866062",
    "recovery": "1090645303450866055",
}


def env(name):
    v = os.environ.get(name)
    if not v:
        sys.exit("Missing env var %s (set it as a GitHub Actions repo secret)" % name)
    return v


def refresh_access_token():
    body = urllib.parse.urlencode({
        "grant_type": "refresh_token",
        "refresh_token": env("PINTEREST_REFRESH_TOKEN"),
    }).encode()
    req = urllib.request.Request(API + "/oauth/token", data=body, method="POST")
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    basic = base64.b64encode(("%s:%s" % (env("PINTEREST_APP_ID"), env("PINTEREST_APP_SECRET"))).encode()).decode()
    req.add_header("Authorization", "Basic " + basic)
    try:
        with urllib.request.urlopen(req) as r:
            data = json.loads(r.read())
    except urllib.error.HTTPError as e:
        sys.exit("Pinterest token refresh failed: %s %s\n%s" % (e.code, e.reason, e.read().decode(errors="replace")))
    if not data.get("access_token"):
        sys.exit("Token refresh returned no access_token")
    return data["access_token"]


def create_pin(token, pin):
    req = urllib.request.Request(API + "/pins", data=json.dumps(pin).encode(), method="POST")
    req.add_header("Authorization", "Bearer " + token)
    req.add_header("Content-Type", "application/json")
    try:
        with urllib.request.urlopen(req) as r:
            return json.loads(r.read())
    except urllib.error.HTTPError as e:
        raise RuntimeError("POST /pins %s %s: %s" % (e.code, e.reason, e.read().decode(errors="replace")[:500]))


def content_type(path):
    ext = os.path.splitext(path)[1].lower()
    return {".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg",
            ".gif": "image/gif", ".webp": "image/webp"}.get(ext, "image/png")


def utm(link, campaign):
    if not link or "utm_source=" in link:
        return link
    sep = "&" if "?" in link else "?"
    return "%s%sutm_source=pinterest&utm_medium=social&utm_campaign=%s" % (
        link, sep, urllib.parse.quote(campaign or "pinterest-queue"))


def post_one(token, e):
    img = os.path.join(ROOT, e["image"])
    if not os.path.exists(img):
        raise RuntimeError("image not found: %s" % e["image"])
    board = BOARD_IDS.get(e["board"], e["board"])
    if not str(board).isdigit():
        raise RuntimeError("unknown board '%s'" % e["board"])
    with open(img, "rb") as f:
        data = base64.b64encode(f.read()).decode()
    pin = {"board_id": board,
           "media_source": {"source_type": "image_base64", "content_type": content_type(img), "data": data}}
    if e.get("title"):
        pin["title"] = e["title"][:100]
    if e.get("description"):
        pin["description"] = e["description"][:800]
    if e.get("link"):
        pin["link"] = utm(e["link"], e.get("campaign", ""))
    if e.get("alt_text"):
        pin["alt_text"] = e["alt_text"][:500]
    return create_pin(token, pin)["id"]


def now():
    return time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())


def main():
    if not os.path.exists(QUEUE_PATH):
        print("No queue file; nothing to do.")
        return
    with open(QUEUE_PATH) as f:
        queue = json.load(f)
    pending = [e for e in queue if e.get("status") == "pending"]
    if not pending:
        print("No pending entries in queue.json.")
        return

    token = refresh_access_token()
    failures = 0
    for e in pending:
        try:
            pid = post_one(token, e)
            e.update(status="posted", pin_id=pid,
                     pin_url="https://www.pinterest.com/pin/%s/" % pid, posted_at=now())
            print("Posted %s -> %s" % (e.get("id"), e["pin_url"]))
        except Exception as ex:  # one bad entry must not block the rest
            failures += 1
            e.update(status="failed", error=str(ex), failed_at=now())
            print("FAILED %s: %s" % (e.get("id"), ex))

    with open(QUEUE_PATH, "w") as f:
        json.dump(queue, f, indent=2)
        f.write("\n")
    if failures:
        sys.exit("%d pin(s) failed; see queue.json" % failures)


if __name__ == "__main__":
    main()
