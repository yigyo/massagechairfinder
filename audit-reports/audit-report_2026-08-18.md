# Catalog Audit Report — 2026-08-18

## Summary

- **Coverage: 109 / 109 targets checked (100%).** Every chair in `scripts/audit-targets.json` was probed; none were skipped. (26 chairs were excluded upstream by the prepass as already-known `discontinued`.)
- **Structural health: OK (warnings only).** No catalog-integrity errors; 5 informational warnings (Amazon watchlist + 1 stale compare page). See below.
- **Stock/price verification was severely limited by this environment's network egress policy**, not by retailer-side issues. 73 of 109 targets (67%) could not be fetched at all — the proxy rejected the CONNECT before any HTTP request reached the destination. Combined with 28 more chairs that loaded but exposed no parseable JSON-LD, only **5 of 109 chairs (4.6%)** got a fully confirmed live stock status this run. **This is an infrastructure limitation of the current session, not a finding about the retailers.** See "Environment limitation" below — this needs to be fixed (or the audit re-run from a session with broader egress) before the OOS/BROKEN_LINK counts below can be trusted as complete.
- **2 confirmed OOS**, **0 confirmed broken links** (see reclassification note), **0 confirmed price mismatches** among the chairs that could be verified.
- **1 catalog-wide structural event worth flagging**: `massagechairwarehouse.com` (26 chairs in the catalog) now 301-redirects every product URL to a different domain, `gameroomempire.com`, with the product slug preserved. WebSearch corroborates this is a same-catalog rebrand ("Massage Chair Warehouse is now Game Room Empire"), not link rot — but the destination domain itself is blocked in this environment, so none of the 26 could have their current price/stock verified this run.

---

## Environment limitation (read this first)

This run used 8 parallel sub-agents (WebFetch) to probe all 109 affiliate URLs. The session's network egress proxy rejected outbound connections to most retailer domains with a policy-level 403 on the CONNECT itself — confirmed via the proxy status endpoint (`recentRelayFailures` showing `connect_rejected` / "gateway answered 403 to CONNECT (policy denial or upstream failure)") for hosts including `gameroomempire.com`, `www.wishrockrelaxation.com`, and `www.johnsonfitness.com`. This is distinct from retailer-side bot detection (which did also occur on `massagechairstore.com`, 6 chairs, HTTP 403).

Blocked-domain tally (chairs affected):

| Domain | Chairs blocked |
|---|---|
| massagechairwarehouse.com | 25 (+1 confirmed-redirect, see below) |
| massagechairheaven.com | 11 |
| amazon.com | 8 |
| wishrockrelaxation.com (www subdomain only — non-www worked) | 7 |
| massagechairstore.com (site-side 403, not proxy) | 6 |
| nouhaus.com | 5 |
| massagechairs.com | 3 |
| massagechairplanet.com | 2 |
| humantouch.com | 2 |
| johnsonfitness.com | 2 |
| clearancechair.com | 1 |
| primemassagechairs.com | 1 |

Additionally, on domains that *were* reachable (osakimassagechair.com, syncamassagechair.com HTML view, wishrockrelaxation.com non-www, relaxe.co), WebFetch's markdown conversion strips `<script>` tags before the agent ever sees them, so JSON-LD `availability` blocks were invisible in most fetches — 28 chairs loaded fine (200, matching title, matching price) but stock status still came back `STOCK_UNKNOWN` because no JSON-LD survived the fetch. Where an agent instead pulled the Shopify `.json` product-endpoint directly (bypassing markdown conversion), it reliably found `available: true/false` — this is how the 2 confirmed OOS and 3 of the 5 confirmed-LIVE results below were obtained. **Recommendation: point future runs at each retailer's `/products/<slug>.json` endpoint directly instead of the HTML page**, and run from a session whose egress policy allows the domains listed above.

**Net effect: 96 of 109 chairs (88%) have no verified stock status this week — not because they're broken, but because this session couldn't reach them or couldn't parse what it fetched.** Treat the OOS/BROKEN_LINK list below as a partial, not exhaustive, result.

---

## Structural Health (Step 1)

`catalog-health-audit.py` exited 0 (OK, warnings only):

- `WARN /compare/titan-3d-prestige-vs-ogawa-og6400`: references OOS chair `titan-3d-prestige` (`inStock=false` in catalog) — consider updating or removing this comparison page. *(This run's probe of titan-3d-prestige also found a "Sold out" label on the retailer page, consistent with the catalog's existing flag — see below.)*
- **Amazon ASIN watchlist** (holds an ASIN with no `amazonUrl` wired — verify listing is live/correct, or drop the ASIN):
  - `osaki-os-pro-admiral-ii` — ASIN B09HW3F2BB
  - `kyota-genki-m380` — ASIN B08T4BXGP3
  - `bodyfriend-falcon-xd` — ASIN B0D97TGBYS (brand showed zero Bodyfriend listings on Amazon as of 2026-06-07)
  - `relaxonchair-jasper` — ASIN B0D325QC32
  - `svago-lite-2` — ASIN B0CN1S3XV1

---

## Affiliate URL Probe (Step 2)

### Confirmed OOS (2)

| Chair | Retailer | Evidence | Live price |
|---|---|---|---|
| Kahuna HM-KAPPA Massage Chair | wishrockrelaxation.com | Shopify product JSON: `available:false`, `inventory_quantity:0` on all 4 color variants | $9,500.00 (matches priceMin) |
| Kahuna Massage Chair SM-7300S | wishrockrelaxation.com | Shopify product JSON: `available:false`, `inventory_quantity:0` on all 3 color variants | $6,999.00 (matches priceMin) |

No replacement candidates were found for either — both best-effort guesses at `massagechairwarehouse.com` equivalents 301-redirected to the blocked `gameroomempire.com` domain and couldn't be verified. **Recommend a manual check** of `https://wishrockrelaxation.com/products/kahuna-hm-kappa-massage-chair` and `.../kahuna-massage-chair-sm-7300s` plus a search for a live Kahuna HM-KAPPA / SM-7300S listing on the approved retailer list before pulling these from the catalog.

### Confirmed LIVE (5, verified via JSON-LD or Shopify `available:true`)

| Chair | Retailer | Live price | vs. priceMin |
|---|---|---|---|
| DCORE D.Core 2 | syncamassagechair.com | $16,999.99 | matches |
| DCORE CIRRUS-JP | syncamassagechair.com | $12,999.99 | matches |
| DCORE STRATUS-JP | syncamassagechair.com | $11,499.99 | matches |
| Relax On Chair MK-V Plus | relaxonchair.com | $2,499.00 | matches |
| Relax On Chair YUKON-4D | relaxonchair.com (stored URL uses blocked `www.` subdomain; non-www canonical verified instead) | $6,499.00 | matches |

### massagechairwarehouse.com → gameroomempire.com (26 chairs, structural note)

Every massagechairwarehouse.com product URL in the catalog now 301-redirects to the identical product slug on `gameroomempire.com` (header `x-redirect-reason: primary_domain_redirection`). WebSearch corroborates this is a real rebrand that retained the massage-chair catalog (matching page titles found for Ceragem M10, Ergotec ET-180 Pluto, Koyo 303TS). **This is not treated as BROKEN_LINK** — the redirect target is confirmed to be the same product line — but `gameroomempire.com` itself is blocked in this environment, so none of the 26 could have current price/stock verified this run:

Luraco i9 Max Plus · Luraco Theater Sofy · Kyota Yugana M780 4D · JPMedics Kumo 4D · Titan Pro-Vigor 4D · Ceragem M10 · Ergotec ET-180 Pluto · Koyo 303TS · Medical Breakthrough 5/6/6 Plus/7/7 Plus/8/8 Plus/9/9 Plus/X · Positive Posture Brio Plus/Brio Sport/Solara · Sharper Image Relieve 3D/Revival · Svago Lite 2/ZGR/Newton

**Recommendation:** either update all 26 `affiliateUrl` values in `chairs.ts` to point at `gameroomempire.com/products/<slug>` directly (pending confirmation the affiliate program/commission still applies under the new domain), or confirm with the retailer that `massagechairwarehouse.com` links continue to be honored long-term. This is worth a manual look regardless of the audit's network limitations, since it affects the largest single retailer group in the catalog (26 of 109 active targets).

### Reachable, price-confirmed, stock unconfirmed (28)

These loaded 200 with a matching product title and a price matching `priceMin` (no PRICE_MISMATCH), but no JSON-LD or `available` field survived the fetch, so stock status is honestly `STOCK_UNKNOWN` rather than guessed:

Osaki OS-Champ, Osaki OS-Pro Maestro LE 2.0, Osaki OS-Pro 4D DuoMax, AmaMedics Hilux 4D, Ador 3D Allure, Theramedic Flex, Kanji 4D Shogun Duo, Relaxe Shiatsu, Relax On Chair RIO, Relax On Chair Jasper, Titan 3D Prestige *(see note)*, Synca Wellness CirC/CirC+/CirC 3/Kurodo/JP-3000, Inner Balance Jin/Jin 2.0, Fujiiryoki Cyber Relax Ai/Ai Executive/Calm Plus/Elite/Pro, Kahuna Dios-6800/Dios-1288/Dios Flexa/EM-8500/Dios-7300 (all wishrockrelaxation.com non-www)

**Note on Titan 3D Prestige**: page loaded with a "Sold out" label near Add-to-Cart, consistent with the catalog's existing `inStockCurrent: false` flag and the Step 1 structural warning about its comparison page — but per the audit's own rule this is HTML text, not JSON-LD, so it's recorded here as unconfirmed rather than re-asserted as OOS. Worth a manual glance to confirm it's still correctly marked OOS in the catalog (it already is).

**Note on Relax On Chair RIO/Jasper**: both pages showed "Hurry! Only N Left in Stock!" urgency badges (0 and 16 respectively) — explicitly not used to set stock status per the audit's anti-false-positive rule, but the "0 Left" wording on RIO is worth a human glance.

### PROBE_BLOCKED — no data obtainable this run (73, minus the 26 already covered above = 47 more)

All remaining targets on massagechairheaven.com (11), amazon.com (8), wishrockrelaxation.com www-subdomain (7, all had working non-www equivalents already captured above — 2 of the 7, kahuna-hm-078 and kahuna-hm-5000, plus 5 Ogawa chairs, were never reached even via non-www), massagechairstore.com (6, site-side 403), nouhaus.com (5), massagechairs.com (3), massagechairplanet.com (2), humantouch.com (2), johnsonfitness.com (2), clearancechair.com (1), primemassagechairs.com (1). Full per-chair detail is in the raw results; no stock/price data was fabricated for any of these.

### Price mismatches

**None found.** Every chair with a confirmed live price this run matched its catalog `priceMin` exactly (or within rounding of `.99` pricing).

---

## Recommended follow-ups (priority order)

1. **Manually verify the 2 confirmed OOS Kahuna chairs** (HM-KAPPA, SM-7300S) and either restock-check or find a replacement listing before next week's run.
2. **Decide on the massagechairwarehouse.com → gameroomempire.com rebrand** (26 chairs) — update affiliate URLs or confirm the old domain keeps redirecting/paying out.
3. **Fix this session's network egress policy** (or re-run from one with broader access) before trusting next week's OOS/BROKEN_LINK counts — this run could only fully verify 5 of 109 chairs.
4. Clear the 5-item Amazon ASIN watchlist from Step 1 (either wire `amazonUrl` or drop the stale ASIN).
5. Consider updating `catalog-audit-prepass.py`/the probe methodology to fetch retailers' `/products/<slug>.json` endpoints directly rather than HTML pages — this is what worked for syncamassagechair.com, wishrockrelaxation.com, and relaxonchair.com and is what surfaced both real OOS results.
