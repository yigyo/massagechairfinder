# Weekly Catalog Audit -- FAILED (2026-09-22)

**Status: AUDIT FAILED -- Step 2 (Affiliate URL Probe) could not run.**

Per the audit spec's coverage prepass rule: Step 2 must visit every chair in
`scripts/audit-targets.json`. It visited **0 of 130**. Since checked (0) <
target count (130), this run fails and no full audit report is written --
only this error file.

## What happened

Step 2 requires fetching each chair's `affiliateUrl` with a real browser
User-Agent to read HTTP status, redirects, and JSON-LD stock/price data.
Every outbound fetch attempt in this session was rejected before reaching
any retailer:

- `WebFetch` on `https://www.massagechairs.com/products/osaki-os-pro-yamato`
  (first target, id `osaki-os-pro-yamato`) returned:
  `EGRESS_BLOCKED -- Access to www.massagechairs.com is blocked by the
  network egress proxy.`
- `WebFetch` on `https://www.amazon.com` (unrelated control domain, to check
  whether the block was specific to one retailer) returned the same:
  `EGRESS_BLOCKED -- Access to www.amazon.com is blocked by the network
  egress proxy.`
- A raw outbound HTTPS request via `requests`/curl-equivalent Python code to
  an unrelated test endpoint (`api.ipify.org`) was also rejected at the
  egress proxy with `403 Forbidden` ("organization policy").

Two independent domains on two different fetch paths were both blocked, so
this is a blanket network-egress policy for this session/environment, not a
retailer-specific or transient failure. No amount of retrying will change
the outcome without a change to the environment's network policy (allowing
outbound HTTPS to the retailer domains this audit needs to reach).

**This session's network egress policy needs to allow outbound access to the
approved retailer domains** (massagechairs.com, massagechairwarehouse.com,
massagechairstore.com, osakimassagechair.com, massagechairheaven.com,
recovathlete.com, syncamassagechair.com, titanchair.com, humantouch.com,
kahunachair.com, amazon.com, and the other retailer domains referenced by
`affiliateUrl` in the catalog) before this audit can complete Step 2.

## Steps that did complete

### Step 0 -- Coverage prepass
Ran cleanly. `scripts/audit-targets.json` was generated:
- `totalRecords` (chairs.ts): 160
- `targetCount` (N, must be checked in Step 2): **130**
- `skippedCount`: 30 (discontinued, or inactive in both MCF/Goodwin, or
  missing an affiliateUrl)

### Step 1 -- Structural health audit
Ran cleanly, exit code 0 (no ERRORs). 2 WARNINGs:

```
[2026-09-22] WARNINGS (2):
  AMAZON WATCHLIST: bodyfriend-falcon-xd: brand search showed zero Bodyfriend
    listings on Amazon 2026-06-07; verify ASIN B0D97TGBYS still live
  AMAZON WATCHLIST: relaxonchair-jasper holds ASIN B0D325QC32 with no
    amazonUrl (listing dead or version mismatch when wired 2026-06-07).
    Verify listing; if live and correct, set amazonUrl; if gone, drop the
    ASIN.
```

No new structural errors were introduced since the last clean run.

### Step 2 -- Affiliate URL probe
**Not performed. 0 of 130 targets checked. Missing: all 130.**

Full list of missed target IDs is `scripts/audit-targets.json` -> `targets[].id`
(all 130 entries; not duplicated here to avoid drift from the source of
truth -- see that file, generated fresh by this same run).

### Step 3 -- Report
Skipped per the prepass rule (coverage < N). This file stands in its place.

## Next steps

1. Re-run this audit once outbound HTTPS to the approved retailer domains is
   allowed from the execution environment.
2. No chairs.ts edits, price/stock flags, or replacement-link diffs were
   made or should be inferred from this run -- no live data was observed.
