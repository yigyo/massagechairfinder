# MassageChairFinder Catalog Audit — 2026-07-07

## Summary

- **Coverage:** 110/110 audit targets checked (100%). No chairs missed.
- **Structural health:** OK — 0 errors, 3 warnings (see below).
- **Affiliate probe results:** 12 confirmed InStock via JSON-LD · 28 STOCK_UNKNOWN (page live, price verified, JSON-LD unreadable) · 70 PROBE_BLOCKED (could not reach the page this run) · 0 BROKEN_LINK · 0 OOS · 0 PRICE_MISMATCH (>5%).
- **No source files were modified.** No OOS or BROKEN_LINK chairs were found this run, so no replacement-candidate diffs are proposed.
- **Headline issue:** this session's outbound network proxy rejected connections to most affiliate-retailer domains (massagechairheaven.com, wishrockrelaxation.com, humantouch.com, nouhaus.com, amazon.com, johnsonfitness.com, and intermittently massagechairwarehouse.com/massagechairstore.com/massagechairs.com), blocking 70 of 110 probes outright. This is an environment/infra limitation, not evidence that those links are broken — see "Probe Environment Issue" below.

## Step 0 — Coverage Prepass

- `scripts/catalog-audit-prepass.py` parsed 135 total chair records from `chairs.ts`.
- **targetCount (N) = 110**; 25 discontinued chairs correctly excluded from this run.
- All 110 targets were visited in Step 2. Coverage requirement met — audit did not fail.

## Step 1 — Structural Health

`scripts/catalog-health-audit.py` exited 0 (no ERRORs). 3 WARNINGs:

| Warning | Detail |
|---|---|
| AMAZON WATCHLIST | `human-touch-super-novo-3` holds ASIN B003O9HBT2 with no `amazonUrl` set (listing dead or version mismatch as of 2026-06-07). Verify listing; set `amazonUrl` if live, drop the ASIN if gone. |
| AMAZON WATCHLIST | `kyota-genki-m380` holds ASIN B08T4BXGP3 with no `amazonUrl` set (same 2026-06-07 finding). Same action needed. |
| AMAZON WATCHLIST | `bodyfriend-falcon-xd`: brand search showed zero Bodyfriend listings on Amazon as of 2026-06-07; verify ASIN B0D97TGBYS still live. |

These are pre-existing/carried-over warnings, not new this run, but remain unresolved and should be actioned by a human editor.

## Step 2 — Affiliate URL Probe

### Probe Environment Issue (read first)

This run's sandboxed egress proxy rejected outbound `CONNECT` to a large share of the retailer domains in the catalog — confirmed by multiple probing agents via `$HTTPS_PROXY/__agentproxy/status`, and reproduced identically with both the `WebFetch` tool and raw `curl`. Where a page did load, some `www.`-prefixed URLs 403'd at the proxy while the identical path *without* `www.` succeeded and returned the correct, matching product page — a proxy quirk, not a retailer block. Separately, several retailers (massagechairstore.com, massagechairs.com, massagechairplanet.com, primemassagechairs.com) served genuine Cloudflare/bot-block 403 pages independent of the proxy. Both cases are reported as `PROBE_BLOCKED`, per the audit rules — **never** inferred as `BROKEN_LINK` or `OOS`. This means the 70 PROBE_BLOCKED rows below need a re-run from an environment with retailer-domain egress before their stock/price can be verified.

### Confirmed InStock via JSON-LD (12)

All prices matched `priceMin` within 0.1% (rounding to `.99` pricing) — no PRICE_MISMATCH.

| Chair | Retailer | Live Price | Recorded priceMin |
|---|---|---|---|
| DCORE CIRRUS-JP | syncamassagechair.com | $12,999.99 | $12,999 |
| DCORE D.Core 2 | syncamassagechair.com | $16,999.99 | $16,999 |
| DCORE STRATUS-JP | syncamassagechair.com | $11,499.99 | $11,499 |
| Fujiiryoki Calm Plus | syncamassagechair.com | $3,999.99 | $3,999 |
| Fujiiryoki Cyber Relax Ai | syncamassagechair.com | $10,999.99 | $10,999 |
| Fujiiryoki Cyber Relax Ai Executive | syncamassagechair.com | $12,999.99 | $12,999 |
| Fujiiryoki Cyber Relax Elite | syncamassagechair.com | $9,999.99 | $9,999 |
| Fujiiryoki Cyber Relax Pro | syncamassagechair.com | $14,999.99 | $14,999 |
| Inner Balance Jin 2.0 | syncamassagechair.com | $3,999.99 | $3,999 |
| Luraco Theater Sofy | massagechairwarehouse.com | $3,490 | $3,490 |
| Luraco i9 Max Plus | massagechairwarehouse.com | $11,990 | $11,990 |
| Synca JP-3000 | syncamassagechair.com | $10,999.99 | $10,999 |

### STOCK_UNKNOWN — page live, title/price confirmed, JSON-LD unreadable (28)

For all 28, the page returned 200 and showed the chair's own title, and price matched `priceMin` (within 5%). No JSON-LD `availability` field could be read — mostly because the fetch tool strips `<script>` blocks during HTML→markdown conversion, not because JSON-LD is absent from the page. **Per the audit rules these are explicitly NOT flagged OOS** — manual spot-check recommended, not urgent.

| Chair | Retailer | Live Price | Recorded priceMin | Note |
|---|---|---|---|---|
| Ador 3D Allure | osakimassagechair.com | $4,999 | $4,999 | Page loads (200), correct product/title shown, base price $4999 matches record exactly. JSON-LD unreadable via fetch tool; STOCK_UNKNOWN for manual review. |
| AmaMedics Hilux 4D | osakimassagechair.com | $4,999 | $4,999 | Page loads, title matches. No JSON-LD found; STOCK_UNKNOWN. Price confirmed via .json endpoint: base variant $4999, matches record exactly. |
| Ceragem M10 | www.massagechairwarehouse.com | $12,999 | $12,999 | Exact www URL 403'd at gateway/proxy. Non-www retry succeeded: live page, price $12,999.00 matches record exactly. No JSON-LD accessible -> STOCK_UNKNOWN. |
| Ergotec ET-180 Pluto | www.massagechairwarehouse.com | $1,999 | $1,999 | Exact www URL 403'd at gateway/proxy. Non-www retry succeeded: live page, price $1,999.00 matches record. No JSON-LD accessible -> STOCK_UNKNOWN. |
| Inner Balance Jin | syncamassagechair.com | $1,999.99 | $1,999 | Page loads, title matches. No JSON-LD availability readable; stock unconfirmed. Price within 0.1% of record. |
| JPMedics Kumo 4D | massagechairwarehouse.com | $10,999.99 | $10,999 | Page loads, title matches. No JSON-LD found; STOCK_UNKNOWN. Price via .json endpoint: $10999.99, essentially matches record (0.01% diff, no PRICE_MISMATCH). |
| Kanji 4D Shogun Duo | osakimassagechair.com | $14,999 | $14,999 | 200 OK, H1 matches, price $14,999 (listed as 6% off $15,999) matches record. No JSON-LD found; STOCK_UNKNOWN. |
| Koyo 303TS | www.massagechairwarehouse.com | $7,999 | $7,999 | Exact www URL 403'd at gateway/proxy. Non-www retry succeeded: live page, sale price $7,999.00 matches record. No JSON-LD accessible -> STOCK_UNKNOWN. |
| Kyota Yugana M780 4D | massagechairwarehouse.com | $7,999 | $7,999 | Page loads, title matches. No JSON-LD script blocks found; STOCK_UNKNOWN per rules. Price confirmed via Shopify .json endpoint: $7999 both variants, matches record exactly. |
| Medical Breakthrough 5 | www.massagechairwarehouse.com | $2,249 | $2,249 | Exact www URL 403'd at gateway/proxy. Non-www retry succeeded: live page, sale price $2,249.00 matches record. No JSON-LD accessible -> STOCK_UNKNOWN. |
| Medical Breakthrough 6 | www.massagechairwarehouse.com | $4,249 | $4,249 | Exact www URL 403'd at gateway/proxy. Non-www retry succeeded: live page, sale price $4,249.00 matches record. No JSON-LD accessible -> STOCK_UNKNOWN. |
| Medical Breakthrough 6 Plus | www.massagechairwarehouse.com | $5,499 | $5,499 | Exact www URL 403'd at gateway/proxy. Non-www retry succeeded: live page, sale price $5,499.00 matches record. No JSON-LD accessible -> STOCK_UNKNOWN. |
| Medical Breakthrough 7 | www.massagechairwarehouse.com | $6,249 | $6,249 | Exact www URL 403'd at gateway/proxy. Non-www retry succeeded: live page, sale price $6,249.00 matches record. No JSON-LD accessible -> STOCK_UNKNOWN. |
| Osaki OS-Champ | osakimassagechair.com | $1,299 | $1,299 | Page live, title matches. No JSON-LD found (markdown conversion strips script tags); Shopify /products/x.json confirms base variant price $1299, matches record exactly. No availability field readable -> stock unknown. |
| Osaki OS-Pro 4D DuoMax | osakimassagechair.com | $12,999 | $12,999 | Page live, title 'OS-Pro 4D DuoMax'. HTML-rendered price $12,999.00 matches record. No JSON-LD availability -> stock unknown. |
| Osaki OS-Pro Maestro LE 2.0 | osakimassagechair.com | $8,999 | $8,999 | Page live; on-page title reads 'Osaki OS-Pro Maestro LE' (record says 'LE 2.0') - same product, not BROKEN_LINK. Shopify .json confirms base price $8999 matches record. No JSON-LD availability -> stock unknown. |
| Relax On Chair Jasper | www.relaxonchair.com | $1,599 | $1,599 | Exact www URL 403'd at gateway/proxy (not a site bot-block page). Secondary fetch of same path without 'www.' succeeded: live page, price $1,599.00 matches record. JSON-LD unreadable -> stock unverifiable. |
| Relax On Chair MK-V Plus | relaxonchair.com | $2,499 | $2,499 | Fetched directly, live page, sale price $2,499.00 matches record. No JSON-LD block visible -> STOCK_UNKNOWN. Rendered text said 'In stock / Only 4 Left' but per rules this is not used for stock determination. |
| Relax On Chair RIO | relaxonchair.com | $999 | $999 | 200 OK. H1 matches record. Price $1999 crossed out -> sale $999 matches recordedPriceMin exactly. No JSON-LD found; conflicting text signals not used per rules -> STOCK_UNKNOWN. Record's inStockCurrent=false in DB but page loaded live and shows a live product; recommend manual check. |
| Relax On Chair YUKON-4D | www.relaxonchair.com | $6,499 | $6,499 | Exact www URL 403'd at gateway/proxy. Non-www retry succeeded: live page, price $6,499.00 matches record. JSON-LD unreadable -> STOCK_UNKNOWN. |
| Relaxe Shiatsu | relaxe.co | $2,999 | $2,999 | 200 OK. H1 is full descriptive title, same product (slug matches). Price: Hickory Brown/Black $2999 matches record. No JSON-LD found; page text shows '12 Left In Stock' but per rules not used to determine stock -> STOCK_UNKNOWN. |
| Synca Wellness CirC | syncamassagechair.com | $1,299.99 | $1,299 | Page loads, title matches. No JSON-LD availability readable; stock unconfirmed. Price within 0.1% of record. Note: compare_at_price ($999.99) lower than price - possibly stale pricing data, manual review recommended. |
| Synca Wellness CirC 3 | syncamassagechair.com | $1,999.99 | $1,999 | Page loads, title matches. No JSON-LD availability readable; stock unconfirmed. Price within 0.1% of record. |
| Synca Wellness CirC+ | syncamassagechair.com | $1,899.99 | $1,899 | Page loads, title matches. No JSON-LD availability readable; stock unconfirmed. Price within 0.1% of record. |
| Synca Wellness Kurodo | syncamassagechair.com | $9,999.99 | $9,999 | Page loads, title matches. No JSON-LD availability readable; stock unconfirmed. Price within 0.1% of record. Single variant only. |
| Theramedic Flex | osakimassagechair.com | $3,499 | $3,499 | 200 OK, H1 matches, price $3499 matches record. No JSON-LD found; STOCK_UNKNOWN per rules. |
| Titan 3D Prestige | titanchair.com | $4,999 | $4,999 | Page loads, title matches. No JSON-LD readable; Shopify products.json lacked 'available' field in tool summary, stock unconfirmed. Base variant price matches record exactly ($4,999). |
| Titan Pro-Vigor 4D | massagechairwarehouse.com | $5,999 | $5,999 | Page loads, title matches. No JSON-LD readable; stock unconfirmed. Price matches record exactly ($5,999); compare_at $9,999 suggests advertised discount. |

### PROBE_BLOCKED — could not reach page this run (70)

No stock or price data could be collected for these — not flagged as OOS or BROKEN_LINK. Re-probe required once network access is available.

| Chair | Retailer | Recorded priceMin |
|---|---|---|
| AmaMedics Renew 3D | clearancechair.com | $1,299 |
| CASINTA 4D | www.amazon.com | $1,199 |
| Culanta SL-Track Shiatsu | www.amazon.com | $1,099 |
| Daiwa Black Panther Supreme Hybrid Massage Chair | www.massagechairheaven.com | $15,500 |
| Daiwa Hubble 3D Massage Chair | www.massagechairheaven.com | $10,000 |
| Daiwa Hubble Plus 4D Massage Chair | www.massagechairheaven.com | $11,000 |
| Daiwa Legacy 4 | www.massagechairheaven.com | $9,500 |
| Daiwa Majesty 2D Massage Chair | www.massagechairheaven.com | $6,000 |
| Daiwa Pegasus 2 Smart Massage Chair (DWA-9400) | www.massagechairheaven.com | $11,000 |
| Daiwa Pegasus Hybrid Massage Chair | www.massagechairheaven.com | $12,000 |
| Daiwa Relax 2 Zero 3D Massage Chair | www.massagechairheaven.com | $9,000 |
| Daiwa Supreme Hybrid Massage Chair | www.massagechairheaven.com | $13,500 |
| HealthRelife 4D 15-Mode | www.amazon.com | $1,699 |
| HealthRelife 4D 20-Mode | www.amazon.com | $2,699 |
| Human Touch Laevo ZG | www.humantouch.com | $4,499 |
| Human Touch Super Novo 3.0 | www.humantouch.com | $11,999 |
| Infinity Celebrity 3D/4D | www.massagechairplanet.com | $5,999 |
| Infinity Circadian 4D DualFlex | massagechairstore.com | $16,999 |
| Infinity Dynasty 4D | massagechairstore.com | $4,999 |
| Infinity Evo Max 4D | massagechairstore.com | $10,999 |
| Infinity Genesis Max 4D | massagechairstore.com | $9,299 |
| Infinity Imperial Syner-D | massagechairstore.com | $7,999 |
| JPMedics KaZe Duo | www.massagechairplanet.com | $12,999 |
| KTENTITO G6 | www.amazon.com | $1,439 |
| Kahuna Dios Flexa Massage Chair | www.wishrockrelaxation.com | $8,499 |
| Kahuna Dios-1288 8D Massage Chair | www.wishrockrelaxation.com | $16,999 |
| Kahuna Dios-6800 6D Massage Chair | www.wishrockrelaxation.com | $3,799 |
| Kahuna Dios-7300 7D Massage Chair | www.wishrockrelaxation.com | $7,999 |
| Kahuna EM-8500 Massage Chair | www.wishrockrelaxation.com | $8,900 |
| Kahuna HM-078 Hubot 4D Massage Chair | www.wishrockrelaxation.com | $4,399 |
| Kahuna HM-5000 Massage Chair | www.wishrockrelaxation.com | $2,000 |
| Kahuna HM-KAPPA Massage Chair | www.wishrockrelaxation.com | $9,500 |
| Kahuna Massage Chair SM-7300S | www.wishrockrelaxation.com | $6,999 |
| Kyota Genki M380 | massagechairstore.com | $2,999 |
| Kyota Konbi M728 DualPro 4D | massagechairstore.com | $7,999 |
| MYTHIA A303C 4D | www.amazon.com | $1,799 |
| Medical Breakthrough 7 Plus | www.massagechairwarehouse.com | $8,399 |
| Medical Breakthrough 8 | www.massagechairwarehouse.com | $8,249 |
| Medical Breakthrough 8 Plus | www.massagechairwarehouse.com | $10,899 |
| Medical Breakthrough 9 | www.massagechairwarehouse.com | $10,399 |
| Medical Breakthrough 9 Plus | www.massagechairwarehouse.com | $14,649 |
| Medical Breakthrough X | www.massagechairwarehouse.com | $12,499 |
| Nouhaus Aurora | www.nouhaus.com | $2,299 |
| Nouhaus Luna | www.nouhaus.com | $2,999 |
| Nouhaus New Classic | www.nouhaus.com | $1,499 |
| Nouhaus Nou Campo | www.nouhaus.com | $2,299 |
| Nouhaus Orbit | www.nouhaus.com | $3,999 |
| OHCO M.8 NEO | www.johnsonfitness.com | $14,999 |
| OHCO M.8 NEO LE | www.johnsonfitness.com | $18,000 |
| Ogawa Active XL 3D Massage Chair (OG-6300) | www.wishrockrelaxation.com | $2,999 |
| Ogawa Active XL Duo 3D + 2D Massage Chair (OG-6400) | www.wishrockrelaxation.com | $4,799 |
| Ogawa Master Drive AI 2.0 4D Massage Chair (OG-8801) | www.wishrockrelaxation.com | $12,999 |
| Ogawa Master Drive DUO 4D+3D Massage Chair (OG-8900) | www.wishrockrelaxation.com | $15,999 |
| Ogawa Master Drive DUO LE 4D+3D Massage Chair (OG-8901) | www.wishrockrelaxation.com | $9,399 |
| Osaki OS-Pro Admiral II | www.massagechairs.com | $2,999 |
| Osaki OS-Pro Yamato | www.massagechairs.com | $3,999 |
| Panasonic MAF1 | www.primemassagechairs.com | $5,999 |
| Panasonic MAK1 | www.massagechairs.com | $14,499 |
| Positive Posture Brio Plus | www.massagechairwarehouse.com | $7,999 |
| Positive Posture Brio Sport | www.massagechairwarehouse.com | $8,999 |
| Positive Posture Solara | www.massagechairwarehouse.com | $2,499 |
| RELX Full Body 20-Mode | www.amazon.com | $1,999 |
| RockerTech Bliss | www.massagechairheaven.com | $5,499 |
| RockerTech Sensation 4D | www.massagechairheaven.com | $6,999 |
| Sharper Image Relieve 3D | www.massagechairwarehouse.com | $4,499 |
| Sharper Image Revival | www.massagechairwarehouse.com | $3,999 |
| Svago Lite 2 | www.massagechairwarehouse.com | $1,499 |
| Svago Newton | www.massagechairwarehouse.com | $3,199 |
| Svago ZGR | www.massagechairwarehouse.com | $2,199 |
| TLIFE 160 Zero Gravity | www.amazon.com | $1,349 |

### Flags summary

| Flag | Count |
|---|---|
| BROKEN_LINK | 0 |
| OOS | 0 |
| PRICE_MISMATCH (>5%) | 0 |
| PROBE_BLOCKED | 70 |

Because no chairs were flagged OOS or BROKEN_LINK this run, no replacement-retailer searches were triggered and no replacement diff is proposed.

## Manual Review Items (not audit flags, but worth a human look)

- **`relaxonchair-rio`** — catalog has `inStockCurrent: false`, but the live page (200 OK, title matches) shows a sale price of $999 matching `priceMin` exactly; stock itself is unconfirmable (STOCK_UNKNOWN, no JSON-LD). Worth a manual check to see if this chair is actually back in stock.
- **`kahuna-dios-1288`** — catalog name says "8D Massage Chair" but the retailer URL slug says `kahuna-dios-1288-4d-massage-chair`. Possible model/variant naming mismatch; could not verify because wishrockrelaxation.com was PROBE_BLOCKED this run.
- **`synca-wellness-circ`** — retailer's `compare_at_price` ($999.99) is lower than the live `price` ($1,299.99), an unusual/possibly stale markdown-pricing setup on the retailer's side. Not an MCF-side issue, but flagging for awareness.
- **AmaMedics Renew 3D / AmaMedics Hilux 4D** listing pages titled "AmaMedic" (singular) vs. catalog's "AmaMedics" (plural) — cosmetic naming difference only, not a mismatch flag.

## Recommendations

1. **Re-run Step 2 for the 70 PROBE_BLOCKED chairs** from an environment with egress to: massagechairheaven.com, wishrockrelaxation.com, humantouch.com, nouhaus.com, amazon.com, johnsonfitness.com, massagechairwarehouse.com, massagechairstore.com, massagechairs.com, massagechairplanet.com, primemassagechairs.com, clearancechair.com. Until re-probed, treat their stock/price as last-known-good, not verified this cycle.
2. **Investigate the JSON-LD-unreadable pattern** across `osakimassagechair.com`, `syncamassagechair.com`, `titanchair.com`, `massagechairwarehouse.com`, and `relaxonchair.com` — the current fetch tooling strips `<script type="application/ld+json">` blocks before analysis. A raw-HTML fetch path (not markdown-converted) would upgrade most of the 28 STOCK_UNKNOWN rows to a real InStock/OutOfStock determination.
3. Action the 3 structural-health AMAZON WATCHLIST warnings (`human-touch-super-novo-3`, `kyota-genki-m380`, `bodyfriend-falcon-xd`) — set or drop their ASINs.
4. Spot-check the three manual-review items above.
