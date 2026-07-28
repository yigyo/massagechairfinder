# MassageChairFinder Weekly Catalog Audit — 2026-07-28

## Coverage (Step 0)

- Catalog records parsed: 135
- Audit targets (prepass, `scripts/audit-targets.json`): **N = 109** (26 skipped — inactive or no affiliateUrl)
- Targets visited in Step 2: **109 / 109 (100%)**

Every target was visited and got a recorded outcome. However, **76 of the 109 (70%) could not receive a real response from the retailer** — the block happened at this session's own outbound network egress policy, before the request ever reached the retailer's server. See "Environment limitation" below — this is the single most important thing in this report.

## ⚠️ Environment limitation (read first)

This session's outbound proxy denies CONNECT to 13 of the retailer domains in the catalog, confirmed via `http://127.0.0.1:35407/__agentproxy/status` (`connect_rejected` / "gateway answered 403 to CONNECT (policy denial or upstream failure)"). Per the proxy's own operating instructions, this is an org egress policy denial, not something to retry or route around.

**This means the affiliate-URL probe only produced real data for ~30% of the catalog this week.** The 76 chairs below were *not* verified as live, broken, in-stock, or out-of-stock — they are simply unreachable from this sandbox. They are not evidence of a catalog problem.

| Blocked domain | # chairs affected |
|---|---|
| massagechairwarehouse.com (incl. www) | 26 |
| wishrockrelaxation.com | 13 |
| massagechairheaven.com | 11 |
| amazon.com | 8 |
| nouhaus.com | 5 |
| massagechairs.com | 3 |
| massagechairplanet.com | 2 |
| humantouch.com | 2 |
| johnsonfitness.com | 2 |
| relaxonchair.com | 2 |
| clearancechair.com | 1 |
| primemassagechairs.com | 1 |

**Recommendation:** add these 13 domains to this session/environment's outbound egress allowlist. Until that happens, this weekly audit structurally cannot check 70% of the active catalog, and that gap will repeat every week.

Affected chairs (unverified, not flagged): ceragem-m10, ergotec-et-180-pluto, koyo-303ts, medical-breakthrough-5/6/6-plus/7/7-plus/8/8-plus/9/9-plus/x, positive-posture-brio-plus/brio-sport/solara, sharper-image-relieve-3d/revival, svago-lite-2/zgr/newton, kahuna-dios-6800/1288/flexa/hm-kappa/em-8500/dios-7300/sm-7300s/hm-5000, ogawa-og6300/og8901/og6400/og8801/og8900, daiwa-legacy-4/black-panther-supreme-hybrid/supreme-hybrid/pegasus-hybrid/hubble-plus-4d/pegasus-2-smart/hubble-3d/relax-2-zero-3d/majesty-2d, rockertech-bliss/sensation-4d, relx-20-mode, culanta-sl-track, tlife-160-zg, healthrelife-4d-15-mode/20-mode, ktentito-g6, mythia-a303c, casinta-4d, luraco-i9-max-plus/theater-sofy, kyota-yugana-m780, jpmedics-kumo-4d/kaze-duo, titan-pro-vigor-4d, nouhaus-new-classic/aurora/noucampo/luna/orbit, osaki-os-pro-yamato/admiral-ii, panasonic-mak1/maf1, human-touch-laevo-zg/super-novo-3, ohco-m8-neo-le/m8-neo, relaxonchair-jasper/yukon-4d, amamedics-renew-3d.

## Structural Health (Step 1)

`python3 scripts/catalog-health-audit.py` → **exit 0, OK (warnings only)**, 0 errors.

Warnings (2):
1. **AMAZON WATCHLIST**: `kyota-genki-m380` holds ASIN B08T4BXGP3 with no `amazonUrl` (listing dead or version mismatch when wired 2026-06-07). Verify listing; if live and correct, set `amazonUrl`; if gone, drop the ASIN.
2. **AMAZON WATCHLIST**: `bodyfriend-falcon-xd` — brand search showed zero Bodyfriend listings on Amazon 2026-06-07; verify ASIN B0D97TGBYS still live.

## Affiliate URL Probe Results (Step 2)

Method: `requests` with a real Chrome User-Agent, following redirects, reading real HTTP status codes, and parsing `<script type="application/ld+json">` blocks for `offers.availability` and `offers.price` (falling back to the Shopify `.js` product JSON where JSON-LD was absent). No stock status was inferred from HTML text, CSS classes, or template strings.

### ✅ Confirmed live / in stock (25)

All prices below matched catalog `priceMin` within tolerance except the one flagged in Price Mismatch.

| Chair | Retailer | Catalog price | Live price | Δ |
|---|---|---|---|---|
| Ador 3D Allure | osakimassagechair.com | $4,999 | $4,999.00 | +0.0% |
| AmaMedics Hilux 4D | osakimassagechair.com | $4,999 | $4,999.00 | +0.0% |
| DCORE CIRRUS-JP | syncamassagechair.com | $12,999 | $12,999.99 | +0.0% |
| DCORE D.Core 2 | syncamassagechair.com | $16,999 | $16,999.99 | +0.0% |
| DCORE STRATUS-JP | syncamassagechair.com | $11,499 | $11,499.99 | +0.0% |
| Fujiiryoki Calm Plus | syncamassagechair.com | $3,999 | $3,999.99 | +0.0% |
| Fujiiryoki Cyber Relax Ai | syncamassagechair.com | $10,999 | $10,999.99 | +0.0% |
| Fujiiryoki Cyber Relax Ai Executive | syncamassagechair.com | $12,999 | $12,999.99 | +0.0% |
| Fujiiryoki Cyber Relax Elite | syncamassagechair.com | $9,999 | $9,999.99 | +0.0% |
| Fujiiryoki Cyber Relax Pro | syncamassagechair.com | $14,999 | $14,999.99 | +0.0% |
| Inner Balance Jin | syncamassagechair.com | $1,999 | $1,999.99 | +0.0% |
| Inner Balance Jin 2.0 | syncamassagechair.com | $3,999 | $3,999.99 | +0.0% |
| Kanji 4D Shogun Duo | osakimassagechair.com | $14,999 | $14,999.00 | +0.0% |
| Osaki OS-Champ | osakimassagechair.com | $1,299 | $1,299.00 | +0.0% |
| Osaki OS-Pro 4D DuoMax | osakimassagechair.com | $12,999 | $12,999.00 | +0.0% |
| Osaki OS-Pro Maestro LE 2.0 | osakimassagechair.com | $8,999 | $8,999.00 | +0.0% |
| Relax On Chair MK-V Plus | relaxonchair.com | $2,499 | $2,499.00 | +0.0% |
| Relaxe Shiatsu | relaxe.co | $2,999 | $2,799.00 | **-6.7%** (see below) |
| Synca JP-3000 | syncamassagechair.com | $10,999 | $10,999.99 | +0.0% |
| Synca Wellness CirC | syncamassagechair.com | $1,299 | $1,299.99 | +0.0% |
| Synca Wellness CirC 3 | syncamassagechair.com | $1,999 | $1,999.99 | +0.0% |
| Synca Wellness CirC+ | syncamassagechair.com | $1,899 | $1,899.99 | +0.0% |
| Synca Wellness Kurodo | syncamassagechair.com | $9,999 | $9,999.99 | +0.0% |
| Theramedic Flex | osakimassagechair.com | $3,499 | $3,499.00 | +0.0% |
| Titan 3D Prestige | titanchair.com | $4,999 | $4,999.00 | +0.0% |

Note: `syncamassagechair.com` (Synca Wellness / Inner Balance / Fujiiryoki / DCORE brands, 13 chairs) publishes JSON-LD `availability` as non-standard lowercase strings (`instock`/`outstock`) rather than the schema.org enum (`https://schema.org/InStock`). These were matched case-insensitively per-variant against the JSON-LD field only — no HTML/CSS/text inference was used. Flagged here for awareness in case future runs need to adjust the parser if Synca changes their markup.

### 🔴 Price mismatch (1)

- **Relaxe Shiatsu** (`relaxe.co`) — catalog `priceMin` $2,999 vs. live JSON-LD price $2,799 (**-6.7%**, exceeds the 5% threshold). This is a price *decrease* on the retailer side; recommend updating `priceMin` in `chairs.ts` to $2,799 to keep pricing accurate for readers, or re-check next week if this looks like a temporary sale.

### 🟠 Out of stock (1)

- **Relax On Chair RIO** (`relaxonchair.com/products/rio-massage-recliner-chair-black`) — JSON-LD `offers.availability` = `OutOfStock` (single variant, no in-stock variant). HTTP 200, page loads normally (not a broken link, genuinely sold out).
  - **Replacement candidate search** (approved retailer list): found `https://massagechairwarehouse.com/products/relaxonchair-rio-massage-chair` via web search — same brand/model on an approved retailer.
  - **Could not verify.** `massagechairwarehouse.com` is one of the 13 proxy-blocked domains (see Environment limitation), and when the underlying (non-`www`) redirect was traced it pointed to an unrelated third-party domain (`gameroomempire.com`), which may mean the search-indexed listing is stale or has been relisted elsewhere. **No ready-to-merge diff is being proposed** — needs manual verification before touching `chairs.ts`.

### 🟡 Site-blocked — bot detection (7)

These returned a real HTTP 403 **from the retailer's own server** (confirmed distinct from the proxy-level blocks above — the TCP/TLS connection succeeded, the site itself returned 403). Not flagged as broken or OOS; recommend a manual spot-check or browser-based recheck next week.

- `massagechairstore.com` (6): infinity-dynasty-4d, infinity-genesis-max, infinity-imperial-syner-d, infinity-circadian-4d-dualflex, kyota-genki-m380, kyota-konbi-m728-dualpro-4d
- `wishrockrelaxation.com` (1): kahuna-hm-078

### ⚪ Broken links (0)

None detected among the 33 targets that could actually be reached (proxy-blocked targets excluded — see limitation above; a broken-link verdict cannot be made on them).

### ⚫ Not verified — proxy-blocked by sandbox network policy (76)

See "Environment limitation" table and chair list above.

## Ready-to-merge diffs

None this run. The only OOS chair's replacement candidate could not be verified live (proxy-blocked + unexpected redirect target) — see "Out of stock" above.

## Recommendations, in priority order

1. **Expand this environment's outbound egress allowlist** to include the 13 blocked domains listed above. Until then, ~70% of the catalog cannot be audited weekly, which is a bigger risk to catalog accuracy than any single chair finding this run.
2. Manually verify `massagechairwarehouse.com/products/relaxonchair-rio-massage-chair` as a replacement for the OOS `relaxonchair-rio`, then patch `chairs.ts` if confirmed.
3. Spot-check the 7 bot-blocked `massagechairstore.com` / `wishrockrelaxation.com` URLs by hand (real browser) — 403 from bot detection, not confirmed dead.
4. Resolve the 2 Amazon watchlist warnings (`kyota-genki-m380`, `bodyfriend-falcon-xd`).
5. Consider updating `chairs.ts` `priceMin` for `relaxe-shiatsu` from $2,999 → $2,799 to match the live price.
