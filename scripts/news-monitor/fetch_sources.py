#!/usr/bin/env python3
"""
fetch_sources.py
MCF Weekly News Monitor -- Step 1: Fetch and deduplicate stories.

Reads sources.json, pulls all feeds and brand sites, filters against
the blocklist and last-run.json, and writes raw_stories_YYYY-MM-DD.json.

Usage:
    python fetch_sources.py [--date YYYY-MM-DD] [--no-dedup]

Options:
    --date      Override today's date (for testing with a specific date)
    --no-dedup  Skip last-run filtering (fetch everything, useful for first run)
"""

import argparse
import hashlib
import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlencode, urlparse

import feedparser
import requests
from bs4 import BeautifulSoup

# ---------------------------------------------------------------------------
# Paths (relative to this script's location in scripts/news-monitor/)
# ---------------------------------------------------------------------------
SCRIPT_DIR   = Path(__file__).parent
REPO_ROOT    = SCRIPT_DIR.parent.parent
SOURCES_FILE = SCRIPT_DIR / "sources.json"
LAST_RUN     = SCRIPT_DIR / "last-run.json"
OUTPUT_DIR   = REPO_ROOT / "drafts" / "news"

HEADERS = {
    "User-Agent": (
        "MCFNewsMonitor/1.0 (MassageChairFinder.com content bot; "
        "contact: yigyo.marketing@gmail.com)"
    )
}
REQUEST_TIMEOUT = 15  # seconds


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def story_id(url: str, title: str) -> str:
    """Stable fingerprint from URL + normalized title."""
    key = url.strip().lower() + "|" + title.strip().lower()
    return hashlib.sha256(key.encode()).hexdigest()[:16]


def is_blocklisted(url: str, blocklist: list[str]) -> bool:
    domain = urlparse(url).netloc.lower().lstrip("www.")
    return any(domain == b or domain.endswith("." + b) for b in blocklist)


def passes_relevance(text: str, terms: list[str]) -> bool:
    """Check that at least one relevance term appears in the text."""
    lower = text.lower()
    return any(t.lower() in lower for t in terms)


def load_json(path: Path) -> dict | list:
    if path.exists():
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def fetch_rss(url: str, label: str, delay: float = 0.5) -> list[dict]:
    """Fetch and parse an RSS/Atom feed. Returns a list of raw entry dicts."""
    time.sleep(delay)
    try:
        feed = feedparser.parse(url, request_headers=HEADERS)
        if feed.bozo and not feed.entries:
            print(f"  [WARN] {label}: feed parse error -- {feed.bozo_exception}")
            return []
        print(f"  [OK] {label}: {len(feed.entries)} entries")
        return feed.entries
    except Exception as exc:
        print(f"  [ERR] {label}: {exc}")
        return []


def entry_to_story(entry, source_label: str, source_type: str,
                   brand: str | None = None) -> dict | None:
    """Normalize a feedparser entry into a story dict."""
    url   = entry.get("link", "").strip()
    title = entry.get("title", "").strip()
    if not url or not title:
        return None

    # Published date -- try multiple feedparser fields
    published = None
    for field in ("published_parsed", "updated_parsed", "created_parsed"):
        val = entry.get(field)
        if val:
            try:
                published = datetime(*val[:6], tzinfo=timezone.utc).isoformat()
                break
            except Exception:
                pass
    if not published:
        published = datetime.now(timezone.utc).isoformat()

    # Summary text for relevance filtering
    summary = entry.get("summary", "") or entry.get("description", "") or ""
    # Strip HTML from summary
    try:
        summary = BeautifulSoup(summary, "lxml").get_text(" ", strip=True)[:500]
    except Exception:
        summary = summary[:500]

    return {
        "id":           story_id(url, title),
        "title":        title,
        "url":          url,
        "source":       source_label,
        "source_type":  source_type,
        "brand":        brand,
        "published_at": published,
        "fetched_at":   datetime.now(timezone.utc).isoformat(),
        "summary":      summary,
        # These fields are filled in by classify_stories.py
        "category":       None,
        "relevance_score": None,
        "content_action":  None,
    }


def scrape_brand_html(brand_cfg: dict) -> list[dict]:
    """
    Scrape a brand blog page for article links when no RSS is available.
    Looks for <a> tags containing blog post hrefs, deduplicates by URL.
    """
    label    = brand_cfg["brand"]
    html_url = brand_cfg["html_url"]
    stories  = []
    try:
        time.sleep(brand_cfg.get("delay", 2))
        resp = requests.get(html_url, headers=HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, "lxml")
        base_domain = urlparse(html_url).scheme + "://" + urlparse(html_url).netloc

        seen_urls = set()
        for a in soup.find_all("a", href=True):
            href = a["href"].strip()
            # Normalize relative URLs
            if href.startswith("/"):
                href = base_domain + href
            # Only follow links that look like blog posts on the same domain
            if urlparse(html_url).netloc not in href:
                continue
            path = urlparse(href).path
            if not any(seg in path for seg in ["/blogs/", "/news/", "/articles/", "/post"]):
                continue
            if href in seen_urls:
                continue
            seen_urls.add(href)

            title_text = a.get_text(" ", strip=True)[:200]
            if not title_text or len(title_text) < 10:
                # Try parent element for a more meaningful title
                parent_text = a.parent.get_text(" ", strip=True)[:200] if a.parent else ""
                title_text  = parent_text or href

            stories.append({
                "id":           story_id(href, title_text),
                "title":        title_text,
                "url":          href,
                "source":       label,
                "source_type":  "brand_official_scraped",
                "brand":        label,
                "published_at": datetime.now(timezone.utc).isoformat(),
                "fetched_at":   datetime.now(timezone.utc).isoformat(),
                "summary":      "",
                "category":     None,
                "relevance_score": None,
                "content_action":  None,
            })
        print(f"  [SCRAPE] {label}: {len(stories)} links")
    except Exception as exc:
        print(f"  [ERR scrape] {label}: {exc}")
    return stories


# ---------------------------------------------------------------------------
# Fetch sections
# ---------------------------------------------------------------------------

def fetch_google_news(cfg: dict, delay: float = 2.5) -> list[dict]:
    print("\n[Google News] General queries...")
    stories = []
    base    = cfg["base_url"]
    params  = cfg["params"].copy()

    for item in cfg["general_queries"]:
        params["q"] = item["q"]
        url         = f"{base}?{urlencode(params)}"
        entries     = fetch_rss(url, f"GNews:{item['label']}", delay=delay)
        for e in entries:
            s = entry_to_story(e, f"google_news:{item['label']}", "google_news")
            if s:
                stories.append(s)

    print("\n[Google News] Brand queries...")
    for item in cfg["brand_queries"]:
        params["q"] = item["q"]
        url         = f"{base}?{urlencode(params)}"
        entries     = fetch_rss(url, f"GNews:{item['brand']}", delay=delay)
        for e in entries:
            s = entry_to_story(e, f"google_news:{item['brand']}", "google_news_brand",
                               brand=item["brand"])
            if s:
                stories.append(s)
    return stories


def fetch_bing_news(cfg: dict, delay: float = 2.5) -> list[dict]:
    print("\n[Bing News] Brand queries...")
    stories = []
    base    = cfg["base_url"]
    params  = cfg["params"].copy()

    for item in cfg["brand_queries"]:
        params["q"] = item["q"]
        url         = f"{base}?{urlencode(params)}"
        entries     = fetch_rss(url, f"Bing:{item['brand']}", delay=delay)
        for e in entries:
            s = entry_to_story(e, f"bing:{item['brand']}", "bing_news_brand",
                               brand=item["brand"])
            if s:
                stories.append(s)
    return stories


def fetch_brand_sites(cfg: dict) -> list[dict]:
    print("\n[Brand Sites]")
    stories   = []
    base_delay = cfg.get("request_delay_seconds", 2)

    for brand_cfg in cfg["brands"]:
        label   = brand_cfg["brand"]
        rss_url = brand_cfg.get("rss_url")

        if rss_url:
            entries = fetch_rss(rss_url, f"Brand:{label}", delay=base_delay)
            if entries:
                for e in entries:
                    s = entry_to_story(e, label, "brand_official", brand=label)
                    if s:
                        stories.append(s)
                continue
            # RSS failed -- fall through to scraping

        # Scrape HTML as fallback
        brand_cfg["delay"] = base_delay
        stories.extend(scrape_brand_html(brand_cfg))

    return stories


def fetch_rss_group(group: list[dict], group_label: str,
                    relevance_terms: list[str], delay: float = 1.0) -> list[dict]:
    print(f"\n[{group_label}]")
    stories = []
    for item in group:
        entries = fetch_rss(item["url"], item["label"], delay=delay)
        for e in entries:
            s = entry_to_story(e, item["label"], group_label.lower().replace(" ", "_"))
            if not s:
                continue
            # Relevance filter: title + summary must mention the category
            if not passes_relevance(s["title"] + " " + s["summary"], relevance_terms):
                continue
            stories.append(s)
    return stories


def fetch_youtube(cfg: dict, delay: float = 1.5) -> list[dict]:
    print("\n[YouTube]")
    stories  = []
    base_url = cfg["base_url"]
    for ch in cfg["channels"]:
        if ch["channel_id"] == "TODO_verify":
            print(f"  [SKIP] {ch['label']}: channel_id not yet configured")
            continue
        url     = f"{base_url}?channel_id={ch['channel_id']}"
        entries = fetch_rss(url, f"YT:{ch['label']}", delay=delay)
        for e in entries:
            s = entry_to_story(e, f"youtube:{ch['label']}", "youtube",
                               brand=ch["label"])
            if s:
                stories.append(s)
    return stories


# ---------------------------------------------------------------------------
# Deduplication
# ---------------------------------------------------------------------------

def deduplicate(stories: list[dict]) -> list[dict]:
    """Remove stories with identical fingerprint IDs."""
    seen = set()
    out  = []
    for s in stories:
        if s["id"] not in seen:
            seen.add(s["id"])
            out.append(s)
    print(f"\n[Dedup] {len(stories)} raw -> {len(out)} unique by fingerprint")
    return out


def filter_seen(stories: list[dict], last_run: dict) -> list[dict]:
    """Remove stories already published in a previous run."""
    seen_ids = set(last_run.get("story_ids", []))
    out      = [s for s in stories if s["id"] not in seen_ids]
    print(f"[Last-run filter] {len(stories)} -> {len(out)} new since last run")
    return out


def filter_blocklist(stories: list[dict], blocklist: list[str]) -> list[dict]:
    out = [s for s in stories if not is_blocklisted(s["url"], blocklist)]
    removed = len(stories) - len(out)
    if removed:
        print(f"[Blocklist] Removed {removed} stories from blocked domains")
    return out


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="MCF News Monitor -- fetch step")
    parser.add_argument("--date",     default=datetime.now().strftime("%Y-%m-%d"))
    parser.add_argument("--no-dedup", action="store_true",
                        help="Skip last-run filtering (useful for first run)")
    args = parser.parse_args()

    print(f"=== MCF News Fetch: {args.date} ===\n")

    # Load config
    sources  = load_json(SOURCES_FILE)
    last_run = load_json(LAST_RUN) if not args.no_dedup else {}
    blocklist = sources.get("blocklist_domains", [])
    rel_terms = sources["relevance_filter"]["required_terms"]

    all_stories: list[dict] = []

    # 1. Google News
    all_stories.extend(fetch_google_news(sources["google_news"]))

    # 2. Bing News
    all_stories.extend(fetch_bing_news(sources["bing_news"]))

    # 3. Brand official sites
    all_stories.extend(fetch_brand_sites(sources["brand_sites"]))

    # 4. Trade publications (relevance-filtered)
    rss = sources["rss_feeds"]
    all_stories.extend(
        fetch_rss_group(rss["trade_publications"], "Trade Publications", rel_terms)
    )

    # 5. Consumer tech (relevance-filtered)
    all_stories.extend(
        fetch_rss_group(rss["consumer_tech"], "Consumer Tech", rel_terms)
    )

    # 6. PR wire (relevance-filtered)
    all_stories.extend(
        fetch_rss_group(rss["pr_wire"], "PR Wire", rel_terms)
    )

    # 7. Reddit (relevance-filtered -- note: Reddit content is consumer signal, not editorial)
    all_stories.extend(
        fetch_rss_group(rss["reddit"], "Reddit", rel_terms)
    )

    # 8. Competitors (always relevant -- no filter needed)
    all_stories.extend(
        fetch_rss_group(rss["competitors"], "Competitors", rel_terms)
    )

    # 9. YouTube
    all_stories.extend(fetch_youtube(rss["youtube"]))

    # Post-processing
    all_stories = filter_blocklist(all_stories, blocklist)
    all_stories = deduplicate(all_stories)
    if not args.no_dedup:
        all_stories = filter_seen(all_stories, last_run)

    # Save output
    output_path = OUTPUT_DIR / f"raw_stories_{args.date}.json"
    save_json(output_path, {
        "date":         args.date,
        "fetched_at":   datetime.now(timezone.utc).isoformat(),
        "story_count":  len(all_stories),
        "stories":      all_stories,
    })
    print(f"\n[Done] {len(all_stories)} stories -> {output_path.relative_to(REPO_ROOT)}")

    # Update last-run with all IDs from this run (including previously seen)
    existing_ids = set(last_run.get("story_ids", []))
    new_ids      = {s["id"] for s in all_stories}
    save_json(LAST_RUN, {
        "last_run_date": args.date,
        "story_ids":     sorted(existing_ids | new_ids),
    })
    print(f"[last-run.json] Updated with {len(new_ids)} new IDs "
          f"({len(existing_ids | new_ids)} total tracked)")

    return 0 if all_stories else 1


if __name__ == "__main__":
    sys.exit(main())
