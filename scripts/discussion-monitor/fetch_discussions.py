#!/usr/bin/env python3
"""
fetch_discussions.py
MCF Discussion Monitor -- Step 1: Fetch buyer discussions from Reddit and YouTube.

Pulls Reddit threads from targeted subreddits + search, and YouTube comments
from recent massage chair review videos found via the YouTube Data API v3.
Filters for relevance, deduplicates, and writes raw_discussions_YYYY-MM-DD.json.

Usage:
    python fetch_discussions.py [--date YYYY-MM-DD] [--no-dedup] [--reddit-only] [--youtube-only]
"""

import argparse
import hashlib
import json
import os
import sys
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path

import requests

SCRIPT_DIR  = Path(__file__).parent
REPO_ROOT   = SCRIPT_DIR.parent.parent
SOURCES_FILE = SCRIPT_DIR / "sources.json"
LAST_RUN    = SCRIPT_DIR / "last-run.json"
OUTPUT_DIR  = REPO_ROOT / "drafts" / "voc"

REDDIT_HEADERS = {
    "User-Agent": "MCFDiscussionMonitor/1.0 (MassageChairFinder.com; contact: yigyo.marketing@gmail.com)"
}
REQUEST_TIMEOUT = 15


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def discussion_id(source: str, native_id: str) -> str:
    key = f"{source}:{native_id}".lower()
    return hashlib.sha256(key.encode()).hexdigest()[:16]


def load_json(path: Path):
    if path.exists():
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    return {}


def save_json(path: Path, data) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def passes_relevance(text: str, terms: list) -> bool:
    lower = text.lower()
    return any(t.lower() in lower for t in terms)


# ---------------------------------------------------------------------------
# Reddit
# ---------------------------------------------------------------------------

def fetch_subreddit(sub_cfg: dict, rel_terms: list, delay: float) -> list:
    name  = sub_cfg["name"]
    label = sub_cfg["label"]
    limit = sub_cfg.get("limit", 100)
    posts = []

    for sort in sub_cfg.get("sort", ["new"]):
        url = f"https://www.reddit.com/r/{name}/{sort}.json?limit={limit}"
        try:
            time.sleep(delay)
            resp = requests.get(url, headers=REDDIT_HEADERS, timeout=REQUEST_TIMEOUT)
            resp.raise_for_status()
            data = resp.json()
            children = data.get("data", {}).get("children", [])
            print(f"  [OK] {label}/{sort}: {len(children)} posts")
            for child in children:
                p = child.get("data", {})
                post = _reddit_post_to_discussion(p, label, "subreddit", rel_terms)
                if post:
                    posts.append(post)
        except Exception as exc:
            print(f"  [ERR] {label}/{sort}: {exc}")

    return posts


def fetch_reddit_search(query_cfg: dict, rel_terms: list, delay: float) -> list:
    label = query_cfg["label"]
    params = {
        "q": query_cfg["q"],
        "sort": query_cfg.get("sort", "new"),
        "t": query_cfg.get("time", "month"),
        "limit": 100,
        "type": "link",
    }
    url = "https://www.reddit.com/search.json"
    posts = []
    try:
        time.sleep(delay)
        resp = requests.get(url, params=params, headers=REDDIT_HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        data = resp.json()
        children = data.get("data", {}).get("children", [])
        print(f"  [OK] {label}: {len(children)} results")
        for child in children:
            p = child.get("data", {})
            post = _reddit_post_to_discussion(p, label, "reddit_search", rel_terms)
            if post:
                posts.append(post)
    except Exception as exc:
        print(f"  [ERR] Reddit search [{query_cfg['q']}]: {exc}")
    return posts


def fetch_reddit_comments(permalink: str, post_id: str, delay: float) -> list:
    """Fetch top-level comments for a Reddit post."""
    url = f"https://www.reddit.com{permalink}.json?limit=50&depth=1"
    comments = []
    try:
        time.sleep(delay)
        resp = requests.get(url, headers=REDDIT_HEADERS, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        data = resp.json()
        if len(data) < 2:
            return []
        for child in data[1].get("data", {}).get("children", []):
            c = child.get("data", {})
            body = c.get("body", "").strip()
            if not body or body == "[deleted]" or body == "[removed]":
                continue
            if len(body) < 20:
                continue
            comments.append({
                "id":          discussion_id("reddit_comment", c.get("id", body[:20])),
                "type":        "comment",
                "source":      "reddit_comment",
                "platform":    "reddit",
                "native_id":   c.get("id", ""),
                "parent_id":   post_id,
                "url":         f"https://reddit.com{permalink}",
                "title":       "",
                "body":        body[:1000],
                "author":      c.get("author", ""),
                "score":       c.get("score", 0),
                "created_utc": datetime.fromtimestamp(c.get("created_utc", 0), tz=timezone.utc).isoformat(),
                "fetched_at":  datetime.now(timezone.utc).isoformat(),
                "category":        None,
                "pain_point":      None,
                "buyer_stage":     None,
                "sentiment":       None,
                "is_objection":    None,
                "is_question":     None,
                "quote_worthy":    None,
                "relevance_score": None,
            })
    except Exception as exc:
        print(f"  [ERR] Comments for {permalink}: {exc}")
    return comments


def _reddit_post_to_discussion(p: dict, label: str, source_type: str, rel_terms: list):
    title    = p.get("title", "").strip()
    selftext = p.get("selftext", "").strip()
    url      = p.get("url", "")
    permalink = p.get("permalink", "")
    native_id = p.get("id", "")
    num_comments = p.get("num_comments", 0)

    if not title or not native_id:
        return None
    if p.get("is_video") or not permalink:
        return None

    full_text = title + " " + selftext
    if not passes_relevance(full_text, rel_terms):
        return None

    created = p.get("created_utc", 0)
    created_dt = datetime.fromtimestamp(created, tz=timezone.utc).isoformat() if created else datetime.now(timezone.utc).isoformat()

    return {
        "id":          discussion_id("reddit", native_id),
        "type":        "post",
        "source":      label,
        "platform":    "reddit",
        "native_id":   native_id,
        "parent_id":   None,
        "url":         f"https://reddit.com{permalink}",
        "permalink":   permalink,
        "title":       title,
        "body":        selftext[:1000],
        "author":      p.get("author", ""),
        "score":       p.get("score", 0),
        "num_comments": num_comments,
        "subreddit":   p.get("subreddit", ""),
        "created_utc": created_dt,
        "fetched_at":  datetime.now(timezone.utc).isoformat(),
        "category":        None,
        "pain_point":      None,
        "buyer_stage":     None,
        "sentiment":       None,
        "is_objection":    None,
        "is_question":     None,
        "quote_worthy":    None,
        "relevance_score": None,
    }


# ---------------------------------------------------------------------------
# YouTube
# ---------------------------------------------------------------------------

def youtube_search_videos(query_cfg: dict, api_key: str, published_after: str, delay: float) -> list:
    """Search YouTube for videos matching a query published after a date."""
    url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "q": query_cfg["q"],
        "type": "video",
        "order": "viewCount",
        "publishedAfter": published_after,
        "maxResults": query_cfg.get("max_results", 10),
        "relevanceLanguage": "en",
        "regionCode": "US",
        "key": api_key,
    }
    videos = []
    try:
        time.sleep(delay)
        resp = requests.get(url, params=params, timeout=REQUEST_TIMEOUT)
        resp.raise_for_status()
        data = resp.json()
        items = data.get("items", [])
        print(f"  [OK] {query_cfg['label']}: {len(items)} videos")
        for item in items:
            vid_id = item.get("id", {}).get("videoId", "")
            snippet = item.get("snippet", {})
            if not vid_id:
                continue
            videos.append({
                "video_id":    vid_id,
                "title":       snippet.get("title", ""),
                "channel":     snippet.get("channelTitle", ""),
                "published_at": snippet.get("publishedAt", ""),
                "description": snippet.get("description", "")[:300],
                "search_label": query_cfg["label"],
            })
    except Exception as exc:
        print(f"  [ERR] YouTube search [{query_cfg['q']}]: {exc}")
    return videos


def fetch_youtube_comments(video: dict, api_key: str, max_results: int, delay: float) -> list:
    """Fetch top-level comments for a YouTube video."""
    url = "https://www.googleapis.com/youtube/v3/commentThreads"
    params = {
        "part": "snippet",
        "videoId": video["video_id"],
        "order": "relevance",
        "maxResults": min(max_results, 100),
        "textFormat": "plainText",
        "key": api_key,
    }
    comments = []
    try:
        time.sleep(delay)
        resp = requests.get(url, params=params, timeout=REQUEST_TIMEOUT)
        if resp.status_code == 403:
            print(f"  [SKIP] Comments disabled on video: {video['video_id']}")
            return []
        resp.raise_for_status()
        data = resp.json()
        items = data.get("items", [])
        for item in items:
            top = item.get("snippet", {}).get("topLevelComment", {}).get("snippet", {})
            text = top.get("textDisplay", "").strip()
            if not text or len(text) < 20:
                continue
            comment_id = item.get("id", "")
            comments.append({
                "id":          discussion_id("yt_comment", comment_id),
                "type":        "comment",
                "source":      video["search_label"],
                "platform":    "youtube",
                "native_id":   comment_id,
                "parent_id":   video["video_id"],
                "url":         f"https://youtube.com/watch?v={video['video_id']}",
                "title":       f"Comment on: {video['title'][:80]}",
                "body":        text[:1000],
                "author":      top.get("authorDisplayName", ""),
                "score":       top.get("likeCount", 0),
                "video_title": video["title"],
                "channel":     video["channel"],
                "created_utc": top.get("publishedAt", datetime.now(timezone.utc).isoformat()),
                "fetched_at":  datetime.now(timezone.utc).isoformat(),
                "category":        None,
                "pain_point":      None,
                "buyer_stage":     None,
                "sentiment":       None,
                "is_objection":    None,
                "is_question":     None,
                "quote_worthy":    None,
                "relevance_score": None,
            })
        print(f"  [OK] Comments on '{video['title'][:50]}': {len(comments)}")
    except Exception as exc:
        print(f"  [ERR] Comments for video {video['video_id']}: {exc}")
    return comments


# ---------------------------------------------------------------------------
# Deduplication
# ---------------------------------------------------------------------------

def deduplicate(items: list) -> list:
    seen = set()
    out  = []
    for item in items:
        if item["id"] not in seen:
            seen.add(item["id"])
            out.append(item)
    print(f"\n[Dedup] {len(items)} raw -> {len(out)} unique")
    return out


def filter_seen(items: list, last_run: dict) -> list:
    seen_ids = set(last_run.get("discussion_ids", []))
    out = [d for d in items if d["id"] not in seen_ids]
    print(f"[Last-run filter] {len(items)} -> {len(out)} new since last run")
    return out


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(description="MCF Discussion Monitor -- fetch step")
    parser.add_argument("--date",         default=datetime.now().strftime("%Y-%m-%d"))
    parser.add_argument("--no-dedup",     action="store_true", help="Skip last-run filtering")
    parser.add_argument("--reddit-only",  action="store_true")
    parser.add_argument("--youtube-only", action="store_true")
    args = parser.parse_args()

    print(f"=== MCF Discussion Fetch: {args.date} ===\n")

    sources   = load_json(SOURCES_FILE)
    last_run  = load_json(LAST_RUN) if not args.no_dedup else {}
    rel_terms = sources["relevance_filter"]["required_terms"]
    delay_r   = sources["reddit"].get("request_delay_seconds", 2)
    delay_yt  = sources["youtube"].get("request_delay_seconds", 1)

    all_discussions = []

    # -- Reddit --
    if not args.youtube_only:
        print("\n[Reddit] Subreddits...")
        for sub_cfg in sources["reddit"]["subreddits"]:
            posts = fetch_subreddit(sub_cfg, rel_terms, delay_r)
            # For posts with comments, fetch top comments too
            for post in posts:
                if post.get("num_comments", 0) > 0 and post.get("permalink"):
                    comments = fetch_reddit_comments(post["permalink"], post["id"], delay_r)
                    all_discussions.extend(comments)
            all_discussions.extend(posts)

        print("\n[Reddit] Search queries...")
        for q_cfg in sources["reddit"]["search_queries"]:
            posts = fetch_reddit_search(q_cfg, rel_terms, delay_r)
            for post in posts:
                if post.get("num_comments", 0) > 0 and post.get("permalink"):
                    comments = fetch_reddit_comments(post["permalink"], post["id"], delay_r)
                    all_discussions.extend(comments)
            all_discussions.extend(posts)

    # -- YouTube --
    if not args.reddit_only:
        api_key = os.environ.get("YOUTUBE_API_KEY", "")
        if not api_key:
            print("\n[WARN] YOUTUBE_API_KEY not set -- skipping YouTube fetch")
        else:
            print("\n[YouTube] Searching for recent videos...")
            published_after = (
                datetime.now(timezone.utc) - timedelta(days=sources["youtube"]["published_within_days"])
            ).strftime("%Y-%m-%dT%H:%M:%SZ")

            seen_video_ids = set()
            all_videos = []
            for q_cfg in sources["youtube"]["search_queries"]:
                videos = youtube_search_videos(q_cfg, api_key, published_after, delay_yt)
                for v in videos:
                    if v["video_id"] not in seen_video_ids:
                        seen_video_ids.add(v["video_id"])
                        all_videos.append(v)

            print(f"\n[YouTube] Fetching comments for {len(all_videos)} unique videos...")
            max_c = sources["youtube"].get("comments_per_video", 100)
            for video in all_videos:
                comments = fetch_youtube_comments(video, api_key, max_c, delay_yt)
                all_discussions.extend(comments)

    # Post-processing
    all_discussions = deduplicate(all_discussions)
    if not args.no_dedup:
        all_discussions = filter_seen(all_discussions, last_run)

    # Save output
    output_path = OUTPUT_DIR / f"raw_discussions_{args.date}.json"
    save_json(output_path, {
        "date":             args.date,
        "fetched_at":       datetime.now(timezone.utc).isoformat(),
        "discussion_count": len(all_discussions),
        "discussions":      all_discussions,
    })
    print(f"\n[Done] {len(all_discussions)} discussions -> {output_path.relative_to(REPO_ROOT)}")

    # Update last-run
    existing_ids = set(last_run.get("discussion_ids", []))
    new_ids      = {d["id"] for d in all_discussions}
    save_json(LAST_RUN, {
        "last_run_date":  args.date,
        "discussion_ids": sorted(existing_ids | new_ids),
    })

    return 0 if all_discussions else 1


if __name__ == "__main__":
    sys.exit(main())
