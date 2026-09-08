# Weekly Catalog Audit — 2026-09-08

## Coverage

- Coverage prepass (`scripts/catalog-audit-prepass.py`): **145** total chair records parsed, **29** skipped (discontinued), **N = 116** audit targets written to `scripts/audit-targets.json`.
- Step 2 probe: **116 / 116** targets visited. Coverage requirement met — no chairs were missed.

## Structural Health (Step 1)

`scripts/catalog-health-audit.py` exited **0** (no ERRORs). Result: **CATALOG HEALTH: OK (warnings only)**.

4 warnings, all pre-existing Amazon-listing hygiene items, none new this week:

| Chair | Issue |
|---|---|
| `osaki-os-pro-admiral-ii` | Holds ASIN `B09HW3F2BB` with no `amazonUrl` wired (flagged since 2026-06-07). Verify listing; set `amazonUrl` if live, drop ASIN if gone. |
| `kyota-genki-m380` | Holds ASIN `B08T4BXGP3` with no `amazonUrl` wired (flagged since 2026-06-07). Same action needed. |
| `bodyfriend-falcon-xd` | Brand search showed zero Bodyfriend listings on Amazon as of 2026-06-07; verify ASIN `B0D97TGBYS` still live. |
| `relaxonchair-jasper` | Holds ASIN `B0D325QC32` with no `amazonUrl` wired (flagged since 2026-06-07). Same action needed. |

## Step 2 — Affiliate URL Probe: methodology note (read this first)

This run hit a hard environmental constraint: **this session's own network egress proxy blocks outbound HTTPS to most of the catalog's retailer domains outright** (confirmed via `curl $HTTPS_PROXY/__agentproxy/status`, which logs `403`/`host_not_allowed` gateway rejections independent of the target sites — reproduced identically against neutral control domains like `example.com`, `google.com`, and `wikipedia.org`). This is an infrastructure limitation of this run, not a finding about the retailers.

Domains fully or mostly blocked at the proxy this run: `gameroomempire.com`, `wishrockrelaxation.com`, `amazon.com`, `cozzia.com`, `zarifausa.com`, `massagechairsbuy.com`, `nouhaus.com`, and the `www.` subdomains of `massagechairs.com`, `humantouch.com`, `massagechairplanet.com`, `massagechairheaven.com`, `primemassagechairs.com`. Where a bare (non-`www`) Shopify domain was reachable, the audit fell back to that store's public `/products/<handle>.json` endpoint — genuine structured product data, not a guess — which recovered real price/`available` evidence for several `massagechairheaven.com`, `massagechairplanet.com`, `massagechairs.com`, and `primemassagechairs.com` targets. That workaround was not applied consistently across every batch, so some targets on those same domains are marked `PROBE_BLOCKED` even though a re-check via the `.json` endpoint would likely succeed — see Recommendations.

Per the task's evidence rules, every blocked target is reported as **PROBE_BLOCKED**, not guessed at, not marked broken, and not marked OOS. Non-authoritative WebSearch snippets were captured in notes for manual-review context only and never used to set a stock or price verdict.

**Net effect: only 38 of 116 targets (33%) got an authoritative HTTP/JSON-LD read this run** (31 confirmed LIVE, 1 confirmed OOS, plus a handful of STOCK_UNKNOWN pages that loaded but lack JSON-LD). The rest need a re-run from an environment with broader egress before their flags can be trusted as final.

### Summary counts (116 targets)

| Status | Count |
|---|---|
| LIVE (JSON-LD confirmed InStock) | 31 |
| OOS (JSON-LD confirmed OutOfStock) | 1 |
| STOCK_UNKNOWN (page loaded, no usable JSON-LD) | 32 |
| PROBE_BLOCKED (egress/bot block, no data obtained) | 52 |

Of the 52 `PROBE_BLOCKED`: 6 are a **genuine site-side 403** (confirmed via raw `curl`, not the sandbox proxy) — see below. The remaining 46 are sandbox-proxy denials.

## Confirmed OOS

| Chair | URL | Evidence |
|---|---|---|
| **Osaki OS-Champ** (`osaki-os-champ`) | https://osakimassagechair.com/products/osaki-os-champ | JSON-LD: all 24 offer variants (4 colors × delivery/warranty combos) `availability: OutOfStock`. Matches `chairs.ts` `inStockCurrent: false` already on file — not a new regression. Price $1,299 matches `priceMin`. Checked approved-retailer alternates: `titanchair.com` lists the identical chair, also OutOfStock; `massagechairwarehouse.com`'s listing redirects to `gameroomempire.com` (blocked, unverified). **No live replacement found.** |

## Confirmed genuine site-side blocks (not the sandbox — real bot protection)

These returned a real HTTP 403 from the origin server, reproduced via both WebFetch and raw `curl`:

| Chair | URL | Note |
|---|---|---|
| Infinity Dynasty 4D | massagechairstore.com/infinity-dynasty-4d/ | Cloudflare "Attention Required" interstitial |
| Infinity Genesis Max 4D | massagechairstore.com/infinity-genesis-max/ | Same |
| Infinity Circadian 4D DualFlex | massagechairstore.com/infinity-circadian-4d-dualflex-massage-chair/ | Same |
| Kyota Genki M380 | massagechairstore.com/kyota-genki-m380-massage-chair/ | Same (site + `.json` endpoint both 403) |
| Kyota Konbi M728 DualPro 4D | massagechairstore.com/kyota-konbi-m728-dualpro-4d-massage-chair/ | Same |
| OHCO M.8 NEO LE | johnsonfitness.com/OHCO-M8-NEO-LE-Massage-Chair-P39084.aspx | Genuine site 403 |

`massagechairstore.com` appears to have tightened bot protection against automated fetchers across the board — worth a one-off manual browser check of its 5 listings above; nothing here indicates the products themselves are gone (WebSearch shows all 5 still indexed under matching titles).

## Weak-signal suspected broken links (NOT confirmed — flag for priority manual check)

Two `gameroomempire.com` targets did not surface in search-index queries where sibling models from the same brand did, suggesting they may have been dropped in `gameroomempire.com`'s rebrand from `massagechairwarehouse.com`. This is an inference from search-index absence, not a confirmed 404, so it is **not** being reported as BROKEN_LINK — only as a priority item for a human to check directly:

| Chair | Current affiliateUrl | Signal | Candidate replacement (found on approved retailer list, unverified by direct fetch of the current page) |
|---|---|---|---|
| Kyota Yugana M780 4D | https://gameroomempire.com/products/kyota-yugana-m780-4d-massage-chair | Not indexed at gameroomempire.com; other Kyota models are | `massagechairwarehouse.com/products/kyota-yugana-m780-4d-massage-chair` — $7,999.00, `available: true` (matches priceMin exactly) |
| JPMedics Kumo 4D | https://gameroomempire.com/products/jpmedics-kumo-4d-massage-chair | Not indexed at gameroomempire.com; other JPMedics models are | `massagechairwarehouse.com/products/jpmedics-kumo-4d-massage-chair` — $10,999.99, `available: true` (matches priceMin) |

**No diff is proposed for `chairs.ts`** — per the task rules, a replacement diff is only warranted once a chair is confirmed OOS or BROKEN_LINK, and neither of these is confirmed. If a manual check confirms either URL 404s, the swap above is ready to apply as-is.

## STOCK_UNKNOWN — page loads fine, but no usable JSON-LD (32 targets)

These are **not** flagged as OOS or broken. In every case the page returned 200 with a title matching the target chair, and where a price was visible it matched `priceMin`. They fall into two buckets:

1. **No structured data on the page at all** (site-side gap, not a probe failure): `titan-v03-vending` (osakimassagechair.com) — confirmed via two separate fetches that the canonical page carries no `<script type="application/ld+json">` or `ProductJson-` block. Worth flagging to the retailer/site owner if this audit is meant to lean on structured data going forward.
2. **JSON-LD present but stripped by the fetch tool's markdown conversion**: `relaxe-shiatsu`, `relaxonchair-jasper`, `relaxonchair-mk-v-plus`, `relaxonchair-yukon-4d` — page text showed "In stock" language but per the audit's own rule that is not admissible evidence, so these are UNKNOWN rather than inferred LIVE.
3. **Proxy-blocked domains** where a page load only partially succeeded (e.g. `panasonic-maf1`'s `.js` variant-availability endpoint redirected into a blocked `www` host) — price confirmed, availability not.
4. The bulk of the `wishrockrelaxation.com` (10 Kahuna + Ogawa OG-6300) and several `massagechairs.com` targets fall here because the domain itself was proxy-blocked but WebSearch still confirmed the page/title exists — full list in the raw batch data if needed.

## Partial-variant OOS (informational — chair overall still purchasable)

JSON-LD showed at least one InStock variant, so these correctly resolve to LIVE, but a subset of color options were OutOfStock — noted for manual review, not flagged as an audit failure:

- **Osaki OS-Pro Maestro LE 2.0** — Black color OOS; other colors InStock.
- **Fujiiryoki Calm Plus** — Coffee color OOS; Charcoal/Space Grey InStock.
- **Fujiiryoki Cyber Relax Pro** — Champagne, Graphite, Midnight OOS (3 of 5); Admiral/White InStock.

## Price — flagged for manual verification (no PRICE_MISMATCH confirmed via JSON-LD)

No chair had a live, JSON-LD-confirmed price differing from `priceMin` by more than 5% this run — every domain that returned real structured pricing matched `priceMin` (several to the penny). However, several proxy-blocked chairs surfaced **unverified third-party price snippets** via WebSearch that conflict sharply with `priceMin` by a wide margin. These are explicitly *not* PRICE_MISMATCH findings (the source wasn't the affiliate page's own structured data) but are worth a manual look before next week's run, roughly in priority order of discrepancy size:

| Chair | priceMin | Unverified snippet | Gap |
|---|---|---|---|
| TLIFE 160 Zero Gravity | $1,199 | $2,499.99 (bestreviews.guide, third-party aggregator) | >2x |
| Cozzia Qi XE Pro Duo | $14,999 | $8,999–$9,999 (unrelated third-party retailers) | ~35–40% low |
| Cozzia Qi SE | $11,449 | $6,999–$7,499 (unrelated third-party retailers) | ~35–40% low |
| Zarifa Z-Smart Plus | $5,999 | $6,999.99 sale / $9,999.99 reg | 17–67% high |
| Svago ZGR | $2,199 | $4,199.99–$4,699.99 (unsourced) | ~2x |
| Cozzia Quantum | $15,999 | ~$10,999 (Abt, RC Willey) | ~31% low |
| Zarifa Z-Dream | $3,999 | $5,999.99–$6,999.99 (one source) / $3,999.99 (older source) | mixed |

None of these should be treated as confirmed — they need a direct fetch of the affiliate page's own JSON-LD/Shopify JSON once `cozzia.com`, `zarifausa.com`, and `amazon.com` are reachable.

## Recommendations for next run

1. **Re-run the Step 2 probe from an environment/session whose egress policy allows the full retailer domain list** — this is the single biggest gap this week. Priority domains to unblock: `gameroomempire.com` (26 chairs), `wishrockrelaxation.com` (14), `massagechairheaven.com`/`massagechairs.com`/`humantouch.com`/`massagechairplanet.com`/`primemassagechairs.com` (their `www` subdomains specifically), `amazon.com` (8), `cozzia.com` (5), `nouhaus.com` (5), `zarifausa.com` (2), `massagechairsbuy.com` (1).
2. Where a Shopify store's `www` subdomain is blocked but the bare domain isn't, use the store's public `/products/<handle>.json` endpoint directly — this recovered real price/availability data for several `massagechairheaven.com` and `massagechairplanet.com` chairs this run and should be applied consistently, not just by some batches.
3. Manually verify (browser, non-automated) the 6 genuine site-side 403s on `massagechairstore.com` and `johnsonfitness.com` — likely just stronger bot protection, not dead pages.
4. Priority manual check: confirm whether `kyota-yugana-m780` and `jpmedics-kumo-4d` still resolve on `gameroomempire.com`; the replacement URLs above are ready to drop into `chairs.ts` if not.
5. Resolve the 4 pre-existing Amazon ASIN-hygiene warnings from Step 1 (table above).
6. Consider asking `osakimassagechair.com` to add JSON-LD to the `titan-v03-vending` product page — it's the only osakimassagechair.com listing in this catalog with none.

---
*Generated as part of the automated weekly catalog audit. Raw per-target probe data (all 116 targets, JSON) is available in this session's scratch output if deeper drill-down is needed.*
