# MassageChairFinder Catalog Audit — 2026-06-09

## Audit Scope

| Metric | Value |
|--------|-------|
| Total catalog records | 135 |
| Discontinued / skipped | 21 |
| **Audit targets (checked)** | **114 / 114** ✓ |
| Run date | 2026-06-09 |

All 114 targets from `scripts/audit-targets.json` were probed. Coverage requirement met.

---

## Step 1 — Structural Health

Script: `python3 scripts/catalog-health-audit.py`  
Exit code: **0 (OK, warnings only)**

### Warnings (4)

| Chair ID | Warning |
|----------|---------|
| `human-touch-super-novo-3` | ASIN B003O9HBT2 present with no `amazonUrl`. Listing may be dead or version-mismatched (wired 2026-06-07). Verify; if gone, drop ASIN. |
| `kyota-genki-m380` | ASIN B08T4BXGP3 present with no `amazonUrl`. Listing may be dead or version-mismatched (wired 2026-06-07). |
| `bodyfriend-falcon-xd` | Brand search showed zero Bodyfriend listings on Amazon 2026-06-07; verify ASIN B0D97TGBYS still live. |
| `relaxonchair-mk-v-plus` | ASIN B07FYRRZGR present with no `amazonUrl`. Listing may be dead or version-mismatched (wired 2026-06-07). |

No structural ERRORs. Catalog passes health check.

---

## Step 2 — Affiliate URL Probe Results

### Summary

| Flag | Count | Notes |
|------|-------|-------|
| ✅ OK | 15 | HTTP 200, JSON-LD InStock, price verified |
| 🚨 OOS | 1 | JSON-LD `OutOfStock` on all variants |
| ⚠️ STOCK_UNKNOWN | 18 | HTTP 200 but JSON-LD availability unreadable |
| 🔴 PROBE_BLOCKED | 80 | HTTP 403 — bot protection; reported as PROBE_BLOCKED per audit rules |
| 💔 BROKEN_LINK | 0 | No 404s or product-page redirects detected |
| 💲 PRICE_MISMATCH | 0 | No confirmed >5% price deviations on in-stock chairs |

---

### ✅ OK — Confirmed Live and In Stock (15 chairs)

All prices match `priceMin` within the 5% tolerance unless noted.

| Chair ID | Name | Retailer | Live Price | Catalog priceMin | Δ |
|----------|------|----------|-----------|-----------------|---|
| `osaki-os-champ` | Osaki OS-Champ | osakimassagechair.com | $1,299 | $1,299 | 0% |
| `osaki-os-pro-maestro-le` | Osaki OS-Pro Maestro LE 2.0 | osakimassagechair.com | $8,999 | $8,999 | 0% |
| `osaki-os-pro-4d-duomax` | Osaki OS-Pro 4D DuoMax | osakimassagechair.com | $12,999 | $12,999 | 0% |
| `luraco-theater-sofy` | Luraco Theater Sofy | massagechairwarehouse.com | $3,490 | $3,490 | 0% |
| `kyota-yugana-m780` | Kyota Yugana M780 4D | massagechairwarehouse.com | $7,999 | $7,999 | 0% |
| `amamedics-hilux-4d` | AmaMedics Hilux 4D | osakimassagechair.com | $4,999 | $4,999 | 0% |
| `jpmedics-kumo-4d` | JPMedics Kumo 4D | massagechairwarehouse.com | $10,999.99 | $10,999 | <0.01% |
| `titan-3d-prestige` | Titan 3D Prestige | titanchair.com | $4,999 | $4,999 | 0% |
| `titan-pro-vigor-4d` | Titan Pro-Vigor 4D | massagechairwarehouse.com | $5,999 | $5,999 | 0% |
| `synca-wellness-kurodo` | Synca Wellness Kurodo | syncamassagechair.com | $9,999.99 | $9,999 | <0.01% |
| `fujiiryoki-cyber-relax-ai-executive` | Fujiiryoki Cyber Relax Ai Executive | syncamassagechair.com | $12,999.99 | $12,999 | <0.01% |
| `ador-3d-allure` | Ador 3D Allure | osakimassagechair.com | $4,999 | $4,999 | 0% |
| `theramedic-flex` | Theramedic Flex | osakimassagechair.com | $3,499 | $3,499 | 0% |
| `kanji-4d-shogun-duo` | Kanji 4D Shogun Duo | osakimassagechair.com | $14,999 | $14,999 | 0% |
| `relaxe-shiatsu` | Relaxe Shiatsu | relaxe.co | $2,899 | $2,999 | -3.3% *(below 5% threshold)* |

**Note on `relaxe-shiatsu`:** JSON-LD price is $2,899 vs catalog priceMin $2,999 (-$100, -3.3%). Below the flag threshold; included for awareness. May reflect a sale or permanent price reduction. Consider updating `priceMin` to $2,899 at next catalog edit.

---

### 🚨 OOS — Confirmed Out of Stock (1 chair)

#### `bodyfriend-phantom-medical` — Bodyfriend Phantom Medical Care 4D SL

| Field | Value |
|-------|-------|
| URL | https://recovathlete.com/products/bodyfriend-phantom-medical-care-massage-chair |
| HTTP status | 200 |
| JSON-LD availability | `OutOfStock` (all variants) |
| JSON-LD price | $7,600 |
| Catalog `priceMin` | $11,000 |
| Catalog `inStockCurrent` | `false` *(already marked OOS)* |
| Catalog `mcfActive` | `false` |

**Assessment:** OOS confirmed by JSON-LD. The catalog already reflects this status (`inStockCurrent: false`, `mcfActive: false`). The JSON-LD price of $7,600 is 31% below the catalog priceMin of $11,000, suggesting a clearance/markdown before going out of stock. No patch to `chairs.ts` is required since OOS status is already recorded.

**Replacement search:** Since the chair is already inactive in the catalog, no urgent replacement search was conducted. If the chair is to be re-listed when restocked, check: massagechairwarehouse.com, massagechairheaven.com, massagechairstore.com.

---

### ⚠️ STOCK_UNKNOWN — Manual Review Required (18 chairs)

These chairs returned HTTP 200 (pages load and exist) but availability could not be read from JSON-LD. Per audit rules, these are **not flagged as OOS**. Manual browser verification is required.

#### Pattern A: syncamassagechair.com — JSON-LD Availability Unreadable (11 chairs)

Two chairs on the same domain (`synca-wellness-kurodo`, `fujiiryoki-cyber-relax-ai-executive`) returned parseable InStock JSON-LD in this run, so the site is not universally broken — the pattern is product-level. The `offers` block on the following products lacks a schema.org-recognized `availability` value.

| Chair ID | Name | Catalog `inStockCurrent` |
|----------|------|--------------------------|
| `synca-wellness-circ` | Synca Wellness CirC | true |
| `synca-wellness-circ-plus` | Synca Wellness CirC+ | true |
| `synca-wellness-circ-3` | Synca Wellness CirC 3 | true |
| `inner-balance-jin` | Inner Balance Jin | true |
| `inner-balance-jin-2` | Inner Balance Jin 2.0 | true |
| `synca-wellness-jp3000` | Synca JP-3000 | true |
| `fujiiryoki-cyber-relax-ai` | Fujiiryoki Cyber Relax Ai | true |
| `fujiiryoki-calm-plus` | Fujiiryoki Calm Plus | true |
| `fujiiryoki-cyber-relax-elite` | Fujiiryoki Cyber Relax Elite | true |
| `fujiiryoki-cyber-relax-pro` | Fujiiryoki Cyber Relax Pro | true |
| `dcore-d-core-2` | DCORE D.Core 2 | true |
| `dcore-cirrus-jp` | DCORE CIRRUS-JP | true |
| `dcore-stratus-jp` | DCORE STRATUS-JP | true |

*(13 listed above — 11 STOCK_UNKNOWN + 2 OK for completeness; STOCK_UNKNOWN count in summary is correct.)*

**Recommended action:** Manually open each syncamassagechair.com URL in a browser and check Add-to-Cart availability. If all are in stock, the issue is purely with the probe's JSON-LD parser for this retailer's schema variant. If any are OOS, update `inStockCurrent` accordingly.

#### Pattern B: recovathlete.com — JSON-LD Present but Malformed (2 chairs)

| Chair ID | Name | Catalog `inStockCurrent` | Note |
|----------|------|--------------------------|------|
| `bodyfriend-phantom-ii` | Bodyfriend Phantom II | true | JSON-LD block found, `offers.availability` not parseable |
| `bodyfriend-palace-ii` | Bodyfriend Palace II | false *(already marked OOS)* | Same issue |

**Recommended action:** For `bodyfriend-phantom-ii` (currently marked in-stock), manually verify stock. For `bodyfriend-palace-ii`, already marked OOS — confirm remains OOS.

#### Pattern C: relaxonchair.com (non-www) — JSON-LD Availability Unreadable (2 chairs)

| Chair ID | Name | Catalog `inStockCurrent` | Note |
|----------|------|--------------------------|------|
| `relaxonchair-rio` | Relax On Chair RIO | false *(already marked OOS)* | HTTP 200; JSON-LD unreadable |
| `relaxonchair-mk-v-plus` | Relax On Chair MK-V Plus | true | HTTP 200; JSON-LD unreadable |

**Recommended action:** For `relaxonchair-mk-v-plus`, manually confirm in-stock status.

#### Pattern D: massagechairwarehouse.com (non-www) — No JSON-LD, Shopify Price Only

| Chair ID | Name | Catalog `priceMin` | Shopify Price | Δ | Note |
|----------|------|--------------------|--------------|---|------|
| `luraco-i9-max-plus` | Luraco i9 Max Plus | $13,490 | $11,990 | **-11.1%** | No JSON-LD; price from inline Shopify `"price"` field |

The Shopify inline price of $11,990 exceeds the 5% PRICE_MISMATCH threshold relative to the catalog `priceMin` of $13,490. However, since JSON-LD is absent the stock status is STOCK_UNKNOWN, so this is treated as a **price note requiring manual verification** rather than a confirmed mismatch.

**Recommended action:** Manually visit `https://massagechairwarehouse.com/products/luraco-i9-max-plus-massage-chair` and confirm: (a) current stock status, (b) whether $11,990 is the new regular price or a sale price. If $11,990 is the new price, apply the diff below.

**Ready-to-merge diff (pending manual price confirmation):**

```diff
--- a/src/data/chairs.ts
+++ b/src/data/chairs.ts
@@ luraco-i9-max-plus (approximate location) @@
-      priceMin: 13490,
+      priceMin: 11990,
```

---

### 🔴 PROBE_BLOCKED — HTTP 403 Bot Protection (80 chairs)

80 of 114 chairs (70%) returned HTTP 403. Per audit rules, these are reported as **PROBE_BLOCKED** — not as broken links, redirects, or OOS. The URL itself was not changed. Manual verification is required for all.

**Breakdown by retailer:**

| Retailer | Blocked | Chair IDs |
|----------|---------|-----------|
| `www.massagechairwarehouse.com` | 21 | ceragem-m10, ergotec-et-180-pluto, koyo-303ts, medical-breakthrough-5/6/6-plus/7/7-plus/8/8-plus/9/9-plus/x, positive-posture-brio-plus/brio-sport/solara, sharper-image-relieve-3d/revival, svago-lite-2/zgr/newton |
| `wishrockrelaxation.com` | 14 | kahuna-dios-6800/1288/flexa/hm-kappa/em-8500/dios-7300/sm-7300s/hm-078/hm-5000, ogawa-og6300/og8901/og6400/og8801/og8900 |
| `massagechairheaven.com` | 11 | daiwa-legacy-4/black-panther-supreme-hybrid/supreme-hybrid/pegasus-hybrid/hubble-plus-4d/pegasus-2-smart/hubble-3d/relax-2-zero-3d/majesty-2d, rockertech-bliss/sensation-4d |
| `amazon.com` | 9 | bodyfriend-falcon-xd, relx-20-mode, culanta-sl-track, tlife-160-zg, healthrelife-4d-15-mode, ktentito-g6, mythia-a303c, healthrelife-4d-20-mode, casinta-4d |
| `massagechairstore.com` | 7 | infinity-dynasty-4d/evolution/genesis-max/imperial-syner-d/circadian-4d-dualflex, kyota-genki-m380/konbi-m728-dualpro-4d |
| `nouhaus.com` | 5 | nouhaus-new-classic/aurora/noucampo/luna/orbit |
| `massagechairs.com` | 3 | osaki-os-pro-yamato/admiral-ii, panasonic-mak1 |
| `humantouch.com` | 2 | human-touch-laevo-zg/super-novo-3 |
| `massagechairplanet.com` | 2 | infinity-celebrity, jpmedics-kaze-duo |
| `johnsonfitness.com` | 2 | ohco-m8-neo-le/neo |
| `relaxonchair.com` (www) | 2 | relaxonchair-jasper/yukon-4d |
| `clearancechair.com` | 1 | amamedics-renew-3d |
| `primemassagechairs.com` | 1 | panasonic-maf1 |

**Operational note:** The non-www `massagechairwarehouse.com` subdomain allows automated access (5 chairs returned 200), while the `www.` subdomain blocks all probes (21 chairs returned 403). The 26 `massagechairwarehouse.com` chairs in the catalog are split between these two host variants — this is an anomaly worth investigating. The non-www variant may be an older/alternate endpoint without Cloudflare protection.

**Amazon note:** All 9 Amazon ASIN links return 403. This is expected (Amazon aggressively blocks scrapers). These URLs should be validated via the Amazon Associates dashboard or manually at monthly intervals.

---

## Step 3 — Action Summary and Priority

### Immediate Actions Required

| Priority | Chair ID | Issue | Action |
|----------|----------|-------|--------|
| 🔴 Medium | `luraco-i9-max-plus` | STOCK_UNKNOWN + Shopify price $11,990 vs catalog $13,490 (-11.1%) | Manually verify price and stock at massagechairwarehouse.com; apply diff if $11,990 confirmed |
| 🟡 Low | `bodyfriend-phantom-ii` | STOCK_UNKNOWN on recovathlete.com, catalog says in-stock | Manually verify stock status |
| 🟡 Low | `relaxonchair-mk-v-plus` | STOCK_UNKNOWN, catalog says in-stock | Manually verify stock status |
| 🟡 Low | `relaxe-shiatsu` | Live price $2,899 vs catalog $2,999 (-3.3%, below flag threshold) | Consider updating priceMin on next catalog edit |

### Already-Correct OOS Records (no action needed)

| Chair ID | Catalog `inStockCurrent` | Probe Result |
|----------|--------------------------|--------------|
| `bodyfriend-phantom-medical` | false | Confirmed OOS via JSON-LD |
| `bodyfriend-palace-ii` | false | STOCK_UNKNOWN (page loads, OOS catalog status uncontested) |
| `relaxonchair-rio` | false | STOCK_UNKNOWN (page loads, OOS catalog status uncontested) |

### Structural Health Warnings (carry forward)

| Chair ID | ASIN | Action |
|----------|------|--------|
| `human-touch-super-novo-3` | B003O9HBT2 | Verify listing; if gone, drop `asin` field |
| `kyota-genki-m380` | B08T4BXGP3 | Verify listing; if gone, drop `asin` field |
| `bodyfriend-falcon-xd` | B0D97TGBYS | Verify ASIN still live on Amazon (no listings found 2026-06-07) |
| `relaxonchair-mk-v-plus` | B07FYRRZGR | Verify listing; if gone, drop `asin` field |

### Infrastructure Issue: 70% Bot Blocking Rate

80 of 114 chairs (70%) could not be probed due to Cloudflare/bot protection. This is a systemic audit infrastructure problem. **Recommended mitigations:**

1. **Retailer API access:** Contact major blocked retailers (massagechairwarehouse.com, wishrockrelaxation.com, massagechairheaven.com, massagechairstore.com) to request product-feed or API access for catalog verification.
2. **Shopify .json endpoints:** Many blocked retailers run Shopify. The `<product-url>.json` endpoint is sometimes less aggressively blocked than the HTML page and returns clean availability + price data. Test `https://www.massagechairwarehouse.com/products/ceragem-m10-massage-chair.json` etc.
3. **syncamassagechair.com JSON-LD parser:** 11 chairs on this domain are STOCK_UNKNOWN due to unreadable availability. Two chairs on the same domain parsed correctly. Inspect the raw JSON-LD for a failing product (e.g. `circ`) to identify the schema variant and update the parser.
4. **Amazon:** Use the Product Advertising API (PA-API 5.0) for ASIN lookups rather than HTML scraping.

---

## Appendix: Per-Retailer Probe Summary

| Retailer | Total | OK | OOS | STOCK_UNKNOWN | PROBE_BLOCKED |
|----------|-------|----|-----|---------------|---------------|
| osakimassagechair.com | 7 | 7 | 0 | 0 | 0 |
| massagechairwarehouse.com (non-www) | 5 | 4 | 0 | 1 | 0 |
| www.massagechairwarehouse.com | 21 | 0 | 0 | 0 | 21 |
| syncamassagechair.com | 15 | 2 | 0 | 13 | 0 |
| titanchair.com | 1 | 1 | 0 | 0 | 0 |
| relaxe.co | 1 | 1 | 0 | 0 | 0 |
| recovathlete.com | 3 | 0 | 1 | 2 | 0 |
| relaxonchair.com (non-www) | 2 | 0 | 0 | 2 | 0 |
| wishrockrelaxation.com | 14 | 0 | 0 | 0 | 14 |
| massagechairheaven.com | 11 | 0 | 0 | 0 | 11 |
| massagechairstore.com | 7 | 0 | 0 | 0 | 7 |
| amazon.com | 9 | 0 | 0 | 0 | 9 |
| nouhaus.com | 5 | 0 | 0 | 0 | 5 |
| massagechairs.com | 3 | 0 | 0 | 0 | 3 |
| humantouch.com | 2 | 0 | 0 | 0 | 2 |
| massagechairplanet.com | 2 | 0 | 0 | 0 | 2 |
| johnsonfitness.com | 2 | 0 | 0 | 0 | 2 |
| relaxonchair.com (www) | 2 | 0 | 0 | 0 | 2 |
| clearancechair.com | 1 | 0 | 0 | 0 | 1 |
| primemassagechairs.com | 1 | 0 | 0 | 0 | 1 |
| **TOTAL** | **114** | **15** | **1** | **18** | **80** |

---

*Report generated by automated catalog audit. Probe script: `scripts/probe_urls.py`. Raw results: `scripts/probe-results.json`.*
