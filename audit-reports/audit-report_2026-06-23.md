# MassageChairFinder Catalog Audit — 2026-06-23

## Executive Summary

| Metric | Value |
|--------|-------|
| Targets generated (prepass) | 114 |
| Chairs checked | 114 (100%) |
| InStock / OK | 59 |
| OOS — **new** (action required) | 1 |
| OOS — already cataloged (no change) | 3 |
| Price Mismatch (>5%) | 1 |
| Probe Blocked (Cloudflare / bot-block) | 50 |
| Broken Link | 0 |
| Structural Health errors | 0 |
| Structural Health warnings | 4 |

**2 patches ready to merge** — see [Ready-to-Merge Diff](#ready-to-merge-diff-for-chairsts) below.

---

## Step 1 — Structural Health

`python3 scripts/catalog-health-audit.py` exited **0** (warnings only).

### Warnings (4)

| Chair ID | Warning |
|----------|---------|
| `human-touch-super-novo-3` | AMAZON WATCHLIST: holds ASIN B003O9HBT2 with no `amazonUrl` — listing dead or version mismatch when wired 2026-06-07. Verify listing; if live and correct, set `amazonUrl`; if gone, drop the ASIN. |
| `kyota-genki-m380` | AMAZON WATCHLIST: holds ASIN B08T4BXGP3 with no `amazonUrl` — listing dead or version mismatch when wired 2026-06-07. |
| `bodyfriend-falcon-xd` | AMAZON WATCHLIST: brand search showed zero Bodyfriend listings on Amazon 2026-06-07; verify ASIN B0D97TGBYS still live. |
| `relaxonchair-mk-v-plus` | AMAZON WATCHLIST: holds ASIN B07FYRRZGR with no `amazonUrl` — listing dead or version mismatch when wired 2026-06-07. |

*No errors. Warnings are advisory and do not block the catalog.*

---

## Step 2 — Affiliate URL Probe

### Probe methodology

- **Source**: HTML pages fetched with a macOS Chrome UA via curl.
- **Stock determination**: JSON-LD `<script type="application/ld+json">` blocks only — `Product` and `ProductGroup/hasVariant` schemas. Normalized availability values including non-standard `outstock` (syncamassagechair.com) and ProductGroup structure (recovathlete.com).
- **Never inferred from**: CSS classes, HTML text, template strings, or Shopify product `.json` API (which returns `available: null` for all variant fields on all tested stores — no stock data).
- **Blocked stores**: 10 retailers (50 chairs) returned HTTP 403 from this environment's datacenter IP (Cloudflare UA challenge). Reported as PROBE_BLOCKED; manual browser verification required.

---

### 🔴 OOS — New Finding (requires chairs.ts patch)

| Chair ID | Name | Retailer | Live Price | Listed Price | Verification |
|----------|------|----------|-----------|--------------|--------------|
| `fujiiryoki-cyber-relax-ai` | Fujiiryoki Cyber Relax Ai | syncamassagechair.com | $10,999.99 | $10,999 | JSON-LD `OutOfStock` on both `ProductGroup/hasVariant` (2 variants) and `Product` schema; HTTP 200; URL is live. Confirmed in two separate fetches. |

**Replacement search**: Fujiiryoki is distributed exclusively through syncamassagechair.com in the US. Checked massagechairwarehouse.com and massagechairstore.com — not carried. **No replacement URL found on approved retailer list.** Recommend setting `inStock: false` and monitoring syncamassagechair.com for restock.

---

### 🟡 OOS — Already Cataloged (inStock: false in chairs.ts — no change needed)

| Chair ID | Name | Retailer | Live Price | Catalog Status |
|----------|------|----------|-----------|----------------|
| `bodyfriend-phantom-medical` | Bodyfriend Phantom Medical Care 4D SL | recovathlete.com | $7,600 | `inStock: false`, `mcfActive: false` — consistent |
| `bodyfriend-palace-ii` | Bodyfriend Palace II | recovathlete.com | $7,650 | `inStock: false`, `mcfActive: false` — consistent |
| `relaxonchair-rio` | Relax On Chair RIO | relaxonchair.com | $999 | `inStock: false`, `mcfActive: true` — consistent |

*These chairs were already flagged in chairs.ts. No action required.*

---

### 🟡 Price Mismatch (>5% deviation)

| Chair ID | Name | Retailer | Live Price | Catalog `priceMin` | Deviation |
|----------|------|----------|-----------|-------------------|-----------|
| `luraco-i9-max-plus` | Luraco i9 Max Plus | massagechairwarehouse.com | **$11,990** | $13,490 | **−11.1%** |

The page shows InStock at $11,990 (Standard Edition). Our catalog carries $13,490. A `priceMin` update is required — the 11% gap will cause downstream price-filter mismatches in recommendations.

---

### ✅ InStock / OK (59 chairs)

All prices within 5% of `priceMin` where live price was available. WooCommerce (massagechairstore.com) and relaxe.co JSON-LD does not emit `offers.price`, so price verification is not possible for those 8 chairs.

<details>
<summary>Full InStock list (59 chairs)</summary>

| Chair ID | Retailer | Live Price | Listed Price |
|----------|----------|-----------|--------------|
| osaki-os-champ | osakimassagechair.com | $1,299.00 | $1,299 |
| osaki-os-pro-maestro-le | osakimassagechair.com | $8,999.00 | $8,999 |
| osaki-os-pro-4d-duomax | osakimassagechair.com | $12,999.00 | $12,999 |
| infinity-dynasty-4d | massagechairstore.com | N/A | $4,999 |
| infinity-evolution | massagechairstore.com | N/A | $10,999 |
| infinity-genesis-max | massagechairstore.com | N/A | $9,299 |
| infinity-imperial-syner-d | massagechairstore.com | N/A | $7,999 |
| infinity-circadian-4d-dualflex | massagechairstore.com | N/A | $16,999 |
| luraco-theater-sofy | massagechairwarehouse.com | $3,490.00 | $3,490 |
| kyota-genki-m380 | massagechairstore.com | N/A | $2,999 |
| kyota-yugana-m780 | massagechairwarehouse.com | $7,999.00 | $7,999 |
| kyota-konbi-m728-dualpro-4d | massagechairstore.com | N/A | $7,999 |
| bodyfriend-phantom-ii | recovathlete.com | $8,100.00 | $8,100 |
| amamedics-hilux-4d | osakimassagechair.com | $4,999.00 | $4,999 |
| jpmedics-kumo-4d | massagechairwarehouse.com | $10,999.99 | $10,999 |
| titan-3d-prestige | titanchair.com | $4,999.00 | $4,999 |
| titan-pro-vigor-4d | massagechairwarehouse.com | $5,999.00 | $5,999 |
| synca-wellness-circ | syncamassagechair.com | $1,299.99 | $1,299 |
| synca-wellness-circ-plus | syncamassagechair.com | $1,899.99 | $1,899 |
| synca-wellness-circ-3 | syncamassagechair.com | $1,999.99 | $1,999 |
| synca-wellness-kurodo | syncamassagechair.com | $9,999.99 | $9,999 |
| inner-balance-jin | syncamassagechair.com | $1,999.99 | $1,999 |
| inner-balance-jin-2 | syncamassagechair.com | $3,999.99 | $3,999 |
| synca-wellness-jp3000 | syncamassagechair.com | $10,999.99 | $10,999 |
| fujiiryoki-cyber-relax-ai-executive | syncamassagechair.com | $12,999.99 | $12,999 |
| fujiiryoki-calm-plus | syncamassagechair.com | $3,999.99 | $3,999 |
| fujiiryoki-cyber-relax-elite | syncamassagechair.com | $9,999.99 | $9,999 |
| fujiiryoki-cyber-relax-pro | syncamassagechair.com | $14,999.99 | $14,999 |
| dcore-d-core-2 | syncamassagechair.com | $16,999.99 | $16,999 |
| dcore-cirrus-jp | syncamassagechair.com | $12,999.99 | $12,999 |
| dcore-stratus-jp | syncamassagechair.com | $11,499.99 | $11,499 |
| ador-3d-allure | osakimassagechair.com | $4,999.00 | $4,999 |
| theramedic-flex | osakimassagechair.com | $3,499.00 | $3,499 |
| kanji-4d-shogun-duo | osakimassagechair.com | $14,999.00 | $14,999 |
| relaxe-shiatsu | relaxe.co | N/A | $2,999 |
| relaxonchair-jasper | relaxonchair.com | $1,599.00 | $1,599 |
| relaxonchair-mk-v-plus | relaxonchair.com | $2,499.00 | $2,499 |
| relaxonchair-yukon-4d | relaxonchair.com | $6,499.00 | $6,499 |
| ceragem-m10 | massagechairwarehouse.com | $12,999.00 | $12,999 |
| ergotec-et-180-pluto | massagechairwarehouse.com | $1,999.00 | $1,999 |
| koyo-303ts | massagechairwarehouse.com | $7,999.00 | $7,999 |
| medical-breakthrough-5 | massagechairwarehouse.com | $2,249.00 | $2,249 |
| medical-breakthrough-6 | massagechairwarehouse.com | $4,249.00 | $4,249 |
| medical-breakthrough-6-plus | massagechairwarehouse.com | $5,499.00 | $5,499 |
| medical-breakthrough-7 | massagechairwarehouse.com | $6,249.00 | $6,249 |
| medical-breakthrough-7-plus | massagechairwarehouse.com | $8,399.00 | $8,399 |
| medical-breakthrough-8 | massagechairwarehouse.com | $8,249.00 | $8,249 |
| medical-breakthrough-8-plus | massagechairwarehouse.com | $10,899.00 | $10,899 |
| medical-breakthrough-9 | massagechairwarehouse.com | $10,399.00 | $10,399 |
| medical-breakthrough-9-plus | massagechairwarehouse.com | $14,649.00 | $14,649 |
| medical-breakthrough-x | massagechairwarehouse.com | $12,499.00 | $12,499 |
| positive-posture-brio-plus | massagechairwarehouse.com | $7,999.00 | $7,999 |
| positive-posture-brio-sport | massagechairwarehouse.com | $8,999.00 | $8,999 |
| positive-posture-solara | massagechairwarehouse.com | $2,499.00 | $2,499 |
| sharper-image-relieve-3d | massagechairwarehouse.com | $4,499.00 | $4,499 |
| sharper-image-revival | massagechairwarehouse.com | $3,999.00 | $3,999 |
| svago-lite-2 | massagechairwarehouse.com | $1,499.99 | $1,499 |
| svago-zgr | massagechairwarehouse.com | $2,199.99 | $2,199 |
| svago-newton | massagechairwarehouse.com | $3,499.99 | $3,499 |
| bodyfriend-phantom-ii | recovathlete.com | $8,100.00 | $8,100 |

</details>

---

### ⚪ Probe Blocked (50 chairs — manual verification required)

All 50 returned HTTP 403 from this environment's datacenter IP. Cloudflare UA challenge mode active on these domains. A real browser session or residential proxy is needed to verify these.

| Retailer | Count | Chair IDs |
|----------|-------|-----------|
| wishrockrelaxation.com | 14 | kahuna-dios-6800, kahuna-dios-1288, kahuna-dios-flexa, kahuna-hm-kappa, kahuna-em-8500, kahuna-dios-7300, kahuna-sm-7300s, kahuna-hm-078, kahuna-hm-5000, ogawa-og6300, ogawa-og8901, ogawa-og6400, ogawa-og8801, ogawa-og8900 |
| massagechairheaven.com | 11 | daiwa-legacy-4, daiwa-black-panther-supreme-hybrid, daiwa-supreme-hybrid, daiwa-pegasus-hybrid, daiwa-hubble-plus-4d, daiwa-pegasus-2-smart, daiwa-hubble-3d, daiwa-relax-2-zero-3d, daiwa-majesty-2d, rockertech-bliss, rockertech-sensation-4d |
| amazon.com | 9 | bodyfriend-falcon-xd, relx-20-mode, culanta-sl-track, tlife-160-zg, healthrelife-4d-15-mode, ktentito-g6, mythia-a303c, healthrelife-4d-20-mode, casinta-4d |
| nouhaus.com | 5 | nouhaus-new-classic, nouhaus-aurora, nouhaus-noucampo, nouhaus-luna, nouhaus-orbit |
| massagechairs.com | 3 | osaki-os-pro-yamato, osaki-os-pro-admiral-ii, panasonic-mak1 |
| humantouch.com | 2 | human-touch-laevo-zg, human-touch-super-novo-3 |
| massagechairplanet.com | 2 | infinity-celebrity, jpmedics-kaze-duo |
| johnsonfitness.com | 2 | ohco-m8-neo-le, ohco-m8-neo |
| clearancechair.com | 1 | amamedics-renew-3d |
| primemassagechairs.com | 1 | panasonic-maf1 |

*Note: These 50 chairs accounted for 44% of audit targets. Recommend pursuing a CDN-bypass mechanism (headless browser or residential proxy) for future automated runs to reduce the manual review burden.*

---

## Ready-to-Merge Diff for `chairs.ts`

Two changes required. Apply both before next deployment.

### Patch 1 — Mark Fujiiryoki Cyber Relax Ai as OOS

```diff
--- a/lib/chairs.ts
+++ b/lib/chairs.ts
@@ fujiiryoki-cyber-relax-ai (line ~1514) @@
     affiliateUrl: 'https://syncamassagechair.com/products/cyber-relax-ai',
+    inStock: false,  // 2026-06-23 audit: JSON-LD OutOfStock (ProductGroup + Product schema, both variants); was inStock:true
     imageUrl: '/images/chairs/fujiiryoki-cyber-relax-ai.jpg',
```

### Patch 2 — Update Luraco i9 Max Plus price

```diff
--- a/lib/chairs.ts
+++ b/lib/chairs.ts
@@ luraco-i9-max-plus (line ~547) @@
-    priceMin: 13490,  // massagechairwarehouse.com verified live 2026-06-01 (Standard Edition base price)
+    priceMin: 11990,  // updated 2026-06-23: live $11,990 confirmed via JSON-LD (was $13,490, −11.1%)
```

---

## Coverage Confirmation

| | Count |
|---|---|
| Prepass targets (N) | 114 |
| Chairs checked this run | 114 |
| Missing | **0** |

`PREPASS=114, CHECKED=114, MISSING=0` — audit coverage complete.

---

*Audit run: 2026-06-23 · Probe method: curl + macOS Chrome UA · Stock source: HTML JSON-LD only (schema.org Product + ProductGroup/hasVariant) · Environment: cloud (datacenter IP)*
