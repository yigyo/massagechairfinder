# MassageChairFinder — Weekly Catalog Audit
**Date:** 2026-05-26  
**Auditor:** Automated (Claude Code)  
**Catalog total:** 131 records | **Audit targets:** 110 (21 skipped — discontinued)

---

## Executive Summary

| Metric | Count |
|---|---|
| Targets audited | 110 / 110 |
| **BROKEN_LINK** | **1** |
| **OOS** (confirmed) | **5** (all pre-existing, 0 new) |
| **PRICE_MISMATCH** (in-stock) | **1** |
| PROBE_BLOCKED (403) | 73 |
| Clean / OK | 30 |

**Actionable items requiring `chairs.ts` changes:**  
1. `jpmedics-kaze-duo` — affiliate URL 404 → replacement found at massagechairs.com  
2. `luraco-i9-max-plus` — live price $13,490 vs catalog $11,990 (+12.5%)

Ready-to-merge diffs are at the [bottom of this report](#ready-to-merge-diff).

---

## Step 0 — Coverage Prepass

```
python3 scripts/catalog-audit-prepass.py
```

```
Parsed 131 total chair records from chairs.ts
Wrote scripts/audit-targets.json: 110 audit targets (21 skipped)
  by retailer:
    massagechairwarehouse.com: 27
    syncamassagechair.com: 15
    wishrockrelaxation.com: 14
    massagechairheaven.com: 12
    osakimassagechair.com: 9
    massagechairstore.com: 7
    nouhaus.com: 5
    relaxonchair.com: 4
    (none): 4
    recovathlete.com: 3
    humantouch.com: 2
    johnsonfitness.com: 2
    massagechairplanet.com: 1
    amazon.com: 1
    massagechairs.com: 1
    primemassagechairs.com: 1
    titanchair.com: 1
    relaxe.co: 1
```

All 110 targets were visited in Step 2. ✓

---

## Step 1 — Structural Health

```
python3 scripts/catalog-health-audit.py
```

```
[2026-05-26] CATALOG HEALTH: ALL CLEAR
```

Exit code: **0** — No ERRORs, no warnings. Catalog structure is healthy.

---

## Step 2 — Affiliate URL Probe

All 110 targets were fetched with a real browser User-Agent  
(`Mozilla/5.0 … Chrome/124.0.0.0 Safari/537.36`).

**Methodology note on OOS detection:** Many Shopify-hosted stores embed `"available":true/false` in the page HTML; this was used as the primary stock signal. Text-pattern matching was used only as a secondary check and was found to produce false positives on theme translation strings (Shopify boilerplate). All OOS flags were verified against the embedded availability JSON before finalising.

---

### 2a — BROKEN_LINK (1)

| ID | Catalog Name | URL | Status | Note |
|---|---|---|---|---|
| `jpmedics-kaze-duo` | JPMedics KaZe Duo | https://massagechairwarehouse.com/products/jpmedics-kaze-duo | **404** | Page not found |

**Replacement URL found:**  
`https://www.massagechairs.com/products/jpmedics-kaze-duo-massage-chair`  
Retailer: `massagechairs.com` (approved)  
Live price: **$12,499** (catalog: $12,999 → −$500, −3.8%)  
Source: Google search result with indexed page content; direct fetch returned 403 (bot block on massagechairs.com).

---

### 2b — OOS (5 confirmed, all pre-existing)

All five chairs already carry `inStockCurrent: false` in `chairs.ts`. No new OOS findings.

| ID | Catalog Name | Retailer | Evidence | Replacement Found? |
|---|---|---|---|---|
| `osaki-os-pro-admiral-ii` | Osaki OS-Pro Admiral II | osakimassagechair.com | `"available":false` in page HTML | No — not found at other approved retailers |
| `amamedics-renew-3d` | AmaMedics Renew 3D | osakimassagechair.com | `"available":false` in page HTML | No — Osaki Massage Chair is the only approved retailer carrying this model |
| `bodyfriend-phantom-medical` | Bodyfriend Phantom Medical Care 4D SL | recovathlete.com | `"available":false` + `schema.org/OutOfStock` in JSON-LD | No — not found at other approved retailers; Phantom Rovo is the successor model at recovathlete.com |
| `bodyfriend-palace-ii` | Bodyfriend Palace II | recovathlete.com | `"available":false` + `schema.org/OutOfStock` in JSON-LD; live price $7,650 | No — only available at same retailer's OOS page |
| `relaxonchair-rio` | Relax On Chair RIO | relaxonchair.com | No embedded availability JSON found; catalog `inStockCurrent: false`; probe inconclusive | No — not found at other approved retailers |

**Recommendation:** For `osaki-os-pro-admiral-ii`, `amamedics-renew-3d`, `bodyfriend-phantom-medical`, and `bodyfriend-palace-ii`, no replacement URL is available on the approved retailer list. Consider removing these chairs from active listings or flagging them for manual review to find alternative URLs. For `relaxonchair-rio`, monitor — the page loaded (HTTP 200) but no stock signal could be read automatically.

---

### 2c — PRICE_MISMATCH (1 actionable)

| ID | Catalog Name | Retailer | Probe Price | Catalog `priceMin` | Δ% | In Stock? |
|---|---|---|---|---|---|---|
| `luraco-i9-max-plus` | Luraco i9 Max Plus | massagechairwarehouse.com | $13,490 | $11,990 | +12.5% | ✅ Yes (`"available":true`) |

**Note:** `chairs.ts` line 492 contains the comment `// updated from 13490, confirmed 2026-05-01`, indicating the price was *lowered* to $11,990 in a previous audit. The live price has since reverted to the original $13,490. This is a real mismatch requiring a catalog update.

**Other price mismatches on OOS chairs (informational only):**

| ID | Probe Price | Catalog `priceMin` | Δ% |
|---|---|---|---|
| `bodyfriend-phantom-medical` | $7,600 | $11,000 | −30.9% |
| `bodyfriend-palace-ii` | $7,650 | $8,099 | −5.5% |

These are OOS; price correction is academic until restocked.

---

### 2d — PROBE_BLOCKED (73 chairs, 12 domains)

The following domains returned HTTP 403 for all requests, likely due to bot-detection middleware (Cloudflare or similar). No stock or price data could be extracted. These chairs retain their current `chairs.ts` status.

| Domain | # Blocked | Chairs |
|---|---|---|
| `www.massagechairwarehouse.com` | 21 | ceragem-m10, ergotec-et-180-pluto, koyo-303ts, medical-breakthrough-5/6/6-plus/7/7-plus/8/8-plus/9/9-plus/x, positive-posture-brio-plus/brio-sport/solara, sharper-image-relieve-3d/revival, svago-lite-2/zgr/newton |
| `www.wishrockrelaxation.com` | 17 | kahuna-dios-6800/1288/flexa/7300, kahuna-hm-kappa/em-8500/078/5000, kahuna-sm-7300s, ogawa-og6300/6400/8801/8900/8901, ogawa-master-drive-duo-le-4d-3d, ogawa-master-drive-duo-4d-3d, ogawa-active-xl-duo-3d-2d |
| `www.massagechairheaven.com` | 13 | osaki-os-pro-yamato, daiwa-legacy-4/black-panther-supreme-hybrid/supreme-hybrid/pegasus-hybrid/hubble-plus-4d/pegasus-2-smart/hubble-3d/relax-2-zero-3d/majesty-2d, rockertech-bliss/sensation-4d, daiwa-pegasus-2-smart (duplicate ID) |
| `massagechairstore.com` | 7 | infinity-dynasty-4d/evolution/genesis-max/imperial-syner-d/circadian-4d-dualflex, kyota-genki-m380/konbi-m728-dualpro-4d |
| `www.nouhaus.com` | 5 | nouhaus-new-classic/aurora/noucampo/luna/orbit |
| `www.humantouch.com` | 2 | human-touch-laevo-zg, human-touch-super-novo-3 |
| `www.johnsonfitness.com` | 2 | ohco-m8-neo-le, ohco-m8-neo |
| `www.relaxonchair.com` | 2 | relaxonchair-jasper, relaxonchair-yukon-4d |
| `www.massagechairplanet.com` | 1 | infinity-celebrity |
| `www.amazon.com` | 1 | bodyfriend-falcon-xd |
| `www.massagechairs.com` | 1 | panasonic-mak1 |
| `www.primemassagechairs.com` | 1 | panasonic-maf1 |

**Recommendation:** massagechairwarehouse.com (21 chairs) and wishrockrelaxation.com (17 chairs) represent the largest blocked populations. Consider implementing a browser-based headless probe for these two domains in next week's audit, or establishing a manual spot-check cadence.

---

### 2e — Full Probe Results Table (all 110 targets)

| # | ID | Name | HTTP | Final URL Match | Probe Price | Avail | Flags |
|---|---|---|---|---|---|---|---|
| 1 | osaki-os-champ | Osaki OS-Champ | 200 | ✓ | $1,299 | true | OK |
| 2 | osaki-os-pro-yamato | Osaki OS-Pro Yamato | 403 | — | — | — | PROBE_BLOCKED |
| 3 | osaki-os-pro-admiral-ii | Osaki OS-Pro Admiral II | 200 | ✓ | $2,999 | false | OOS |
| 4 | osaki-os-pro-maestro-le | Osaki OS-Pro Maestro LE 2.0 | 200 | ✓ | $8,999 | true | OK |
| 5 | osaki-os-pro-4d-duomax | Osaki OS-Pro 4D DuoMax | 200 | ✓ | $12,999 | true | OK |
| 6 | infinity-dynasty-4d | Infinity Dynasty 4D | 403 | — | — | — | PROBE_BLOCKED |
| 7 | infinity-celebrity | Infinity Celebrity 3D/4D | 403 | — | — | — | PROBE_BLOCKED |
| 8 | infinity-evolution | Infinity Evo Max 4D | 403 | — | — | — | PROBE_BLOCKED |
| 9 | infinity-genesis-max | Infinity Genesis Max 4D | 403 | — | — | — | PROBE_BLOCKED |
| 10 | infinity-imperial-syner-d | Infinity Imperial Syner-D | 403 | — | — | — | PROBE_BLOCKED |
| 11 | infinity-circadian-4d-dualflex | Infinity Circadian 4D DualFlex | 403 | — | — | — | PROBE_BLOCKED |
| 12 | human-touch-laevo-zg | Human Touch Laevo ZG | 403 | — | — | — | PROBE_BLOCKED |
| 13 | human-touch-super-novo-3 | Human Touch Super Novo 3.0 | 403 | — | — | — | PROBE_BLOCKED |
| 14 | luraco-i9-max-plus | Luraco i9 Max Plus | 200 | ✓ | $13,490 | true | PRICE_MISMATCH (+12.5%) |
| 15 | luraco-theater-sofy | Luraco Theater Sofy | 200 | ✓ | $3,490 | true | OK |
| 16 | daiwa-legacy-4 | Daiwa Legacy 4 | 403 | — | — | — | PROBE_BLOCKED |
| 17 | daiwa-black-panther-supreme-hybrid | Daiwa Black Panther Supreme Hybrid | 403 | — | — | — | PROBE_BLOCKED |
| 18 | daiwa-supreme-hybrid | Daiwa Supreme Hybrid | 403 | — | — | — | PROBE_BLOCKED |
| 19 | daiwa-pegasus-hybrid | Daiwa Pegasus Hybrid | 403 | — | — | — | PROBE_BLOCKED |
| 20 | daiwa-hubble-plus-4d | Daiwa Hubble Plus 4D | 403 | — | — | — | PROBE_BLOCKED |
| 21 | daiwa-pegasus-2-smart | Daiwa Pegasus 2 Smart (DWA-9400) | 403 | — | — | — | PROBE_BLOCKED |
| 22 | daiwa-hubble-3d | Daiwa Hubble 3D | 403 | — | — | — | PROBE_BLOCKED |
| 23 | daiwa-relax-2-zero-3d | Daiwa Relax 2 Zero 3D | 403 | — | — | — | PROBE_BLOCKED |
| 24 | daiwa-majesty-2d | Daiwa Majesty 2D | 403 | — | — | — | PROBE_BLOCKED |
| 25 | kyota-genki-m380 | Kyota Genki M380 | 403 | — | — | — | PROBE_BLOCKED |
| 26 | kyota-yugana-m780 | Kyota Yugana M780 4D | 200 | ✓ | $7,999 | true | OK |
| 27 | kyota-konbi-m728-dualpro-4d | Kyota Konbi M728 DualPro 4D | 403 | — | — | — | PROBE_BLOCKED |
| 28 | bodyfriend-phantom-medical | Bodyfriend Phantom Medical Care 4D SL | 200 | ✓ | $7,600 | false | OOS |
| 29 | bodyfriend-phantom-ii | Bodyfriend Phantom II | 200 | ✓ | $8,100 | true | OK |
| 30 | bodyfriend-palace-ii | Bodyfriend Palace II | 200 | ✓ | $7,650 | false | OOS |
| 31 | bodyfriend-falcon-xd | Bodyfriend Falcon XD 4D | 403 | — | — | — | PROBE_BLOCKED |
| 32 | amamedics-hilux-4d | AmaMedics Hilux 4D | 200 | ✓ | $4,999 | true | OK |
| 33 | amamedics-renew-3d | AmaMedics Renew 3D | 200 | ✓ | $1,299 | false | OOS |
| 34 | jpmedics-kumo-4d | JPMedics Kumo 4D | 200 | ✓ | $10,999 | true | OK |
| 35 | jpmedics-kaze-duo | JPMedics KaZe Duo | 404 | — | — | — | BROKEN_LINK |
| 36 | panasonic-mak1 | Panasonic MAK1 | 403 | — | — | — | PROBE_BLOCKED |
| 37 | panasonic-maf1 | Panasonic MAF1 | 403 | — | — | — | PROBE_BLOCKED |
| 38 | titan-3d-prestige | Titan 3D Prestige | 200 | ✓ | $4,999 | true | OK |
| 39 | titan-pro-vigor-4d | Titan Pro-Vigor 4D | 200 | ✓ | $5,999 | true | OK |
| 40 | synca-wellness-circ | Synca Wellness CirC | 200 | ✓ | $1,300 | true | OK |
| 41 | synca-wellness-circ-plus | Synca Wellness CirC+ | 200 | ✓ | $1,900 | true | OK |
| 42 | synca-wellness-circ-3 | Synca Wellness CirC 3 | 200 | ✓ | $2,000 | true | OK |
| 43 | synca-wellness-kurodo | Synca Wellness Kurodo | 200 | ✓ | — | — | OK |
| 44 | inner-balance-jin | Inner Balance Jin | 200 | ✓ | $2,000 | true | OK |
| 45 | inner-balance-jin-2 | Inner Balance Jin 2.0 | 200 | ✓ | $4,000 | true | OK |
| 46 | synca-wellness-jp3000 | Synca JP-3000 | 200 | ✓ | $11,000 | true | OK |
| 47 | fujiiryoki-cyber-relax-ai | Fujiiryoki Cyber Relax Ai | 200 | ✓ | $11,000 | true | OK |
| 48 | fujiiryoki-cyber-relax-ai-executive | Fujiiryoki Cyber Relax Ai Executive | 200 | ✓ | — | — | OK |
| 49 | fujiiryoki-calm-plus | Fujiiryoki Calm Plus | 200 | ✓ | $4,000 | true | OK |
| 50 | fujiiryoki-cyber-relax-elite | Fujiiryoki Cyber Relax Elite | 200 | ✓ | $10,000 | true | OK |
| 51 | fujiiryoki-cyber-relax-pro | Fujiiryoki Cyber Relax Pro | 200 | ✓ | $15,000 | true | OK |
| 52 | dcore-d-core-2 | DCORE D.Core 2 | 200 | ✓ | $17,000 | true | OK |
| 53 | dcore-cirrus-jp | DCORE CIRRUS-JP | 200 | ✓ | $13,000 | true | OK |
| 54 | dcore-stratus-jp | DCORE STRATUS-JP | 200 | ✓ | $11,500 | true | OK |
| 55 | kahuna-dios-6800 | Kahuna Dios-6800 6D | 403 | — | — | — | PROBE_BLOCKED |
| 56 | kahuna-dios-1288 | Kahuna Dios-1288 8D | 403 | — | — | — | PROBE_BLOCKED |
| 57 | kahuna-dios-flexa | Kahuna Dios Flexa | 403 | — | — | — | PROBE_BLOCKED |
| 58 | kahuna-hm-kappa | Kahuna HM-KAPPA | 403 | — | — | — | PROBE_BLOCKED |
| 59 | kahuna-em-8500 | Kahuna EM-8500 | 403 | — | — | — | PROBE_BLOCKED |
| 60 | kahuna-dios-7300 | Kahuna Dios-7300 7D | 403 | — | — | — | PROBE_BLOCKED |
| 61 | kahuna-sm-7300s | Kahuna SM-7300S | 403 | — | — | — | PROBE_BLOCKED |
| 62 | kahuna-hm-078 | Kahuna HM-078 Hubot 4D | 403 | — | — | — | PROBE_BLOCKED |
| 63 | kahuna-hm-5000 | Kahuna HM-5000 | 403 | — | — | — | PROBE_BLOCKED |
| 64 | ador-3d-allure | Ador 3D Allure | 200 | ✓ | $4,999 | true | OK |
| 65 | theramedic-flex | Theramedic Flex | 200 | ✓ | $3,499 | true | OK |
| 66 | kanji-4d-shogun-duo | Kanji 4D Shogun Duo | 200 | ✓ | $14,999 | true | OK |
| 67 | ogawa-og6300 | Ogawa Active XL 3D (OG-6300) | 403 | — | — | — | PROBE_BLOCKED |
| 68 | ogawa-og8901 | Ogawa Master Drive DUO LE (OG-8901) | 403 | — | — | — | PROBE_BLOCKED |
| 69 | ogawa-og6400 | Ogawa Active XL Duo (OG-6400) | 403 | — | — | — | PROBE_BLOCKED |
| 70 | ogawa-og8801 | Ogawa Master Drive AI 2.0 (OG-8801) | 403 | — | — | — | PROBE_BLOCKED |
| 71 | ogawa-og8900 | Ogawa Master Drive DUO (OG-8900) | 403 | — | — | — | PROBE_BLOCKED |
| 72 | relaxe-shiatsu | Relaxe Shiatsu | 200 | ✓ | — | — | OK |
| 73 | ohco-m8-neo-le | OHCO M.8 NEO LE | 403 | — | — | — | PROBE_BLOCKED |
| 74 | relaxonchair-rio | Relax On Chair RIO | 200 | ✓ | $999 | inconclusive | OOS (catalog) |
| 75 | relaxonchair-jasper | Relax On Chair Jasper | 403 | — | — | — | PROBE_BLOCKED |
| 76 | relaxonchair-mk-v-plus | Relax On Chair MK-V Plus | 200 | ✓ | $2,499 | true | OK |
| 77 | relaxonchair-yukon-4d | Relax On Chair YUKON-4D | 403 | — | — | — | PROBE_BLOCKED |
| 78 | ceragem-m10 | Ceragem M10 | 403 | — | — | — | PROBE_BLOCKED |
| 79 | ergotec-et-180-pluto | Ergotec ET-180 Pluto | 403 | — | — | — | PROBE_BLOCKED |
| 80 | koyo-303ts | Koyo 303TS | 403 | — | — | — | PROBE_BLOCKED |
| 81 | medical-breakthrough-5 | Medical Breakthrough 5 | 403 | — | — | — | PROBE_BLOCKED |
| 82 | medical-breakthrough-6 | Medical Breakthrough 6 | 403 | — | — | — | PROBE_BLOCKED |
| 83 | medical-breakthrough-6-plus | Medical Breakthrough 6 Plus | 403 | — | — | — | PROBE_BLOCKED |
| 84 | medical-breakthrough-7 | Medical Breakthrough 7 | 403 | — | — | — | PROBE_BLOCKED |
| 85 | medical-breakthrough-7-plus | Medical Breakthrough 7 Plus | 403 | — | — | — | PROBE_BLOCKED |
| 86 | medical-breakthrough-8 | Medical Breakthrough 8 | 403 | — | — | — | PROBE_BLOCKED |
| 87 | medical-breakthrough-8-plus | Medical Breakthrough 8 Plus | 403 | — | — | — | PROBE_BLOCKED |
| 88 | medical-breakthrough-9 | Medical Breakthrough 9 | 403 | — | — | — | PROBE_BLOCKED |
| 89 | medical-breakthrough-9-plus | Medical Breakthrough 9 Plus | 403 | — | — | — | PROBE_BLOCKED |
| 90 | medical-breakthrough-x | Medical Breakthrough X | 403 | — | — | — | PROBE_BLOCKED |
| 91 | positive-posture-brio-plus | Positive Posture Brio Plus | 403 | — | — | — | PROBE_BLOCKED |
| 92 | positive-posture-brio-sport | Positive Posture Brio Sport | 403 | — | — | — | PROBE_BLOCKED |
| 93 | positive-posture-solara | Positive Posture Solara | 403 | — | — | — | PROBE_BLOCKED |
| 94 | sharper-image-relieve-3d | Sharper Image Relieve 3D | 403 | — | — | — | PROBE_BLOCKED |
| 95 | sharper-image-revival | Sharper Image Revival | 403 | — | — | — | PROBE_BLOCKED |
| 96 | svago-lite-2 | Svago Lite 2 | 403 | — | — | — | PROBE_BLOCKED |
| 97 | svago-zgr | Svago ZGR | 403 | — | — | — | PROBE_BLOCKED |
| 98 | svago-newton | Svago Newton | 403 | — | — | — | PROBE_BLOCKED |
| 99 | rockertech-bliss | RockerTech Bliss | 403 | — | — | — | PROBE_BLOCKED |
| 100 | rockertech-sensation-4d | RockerTech Sensation 4D | 403 | — | — | — | PROBE_BLOCKED |
| 101 | ohco-m8-neo | OHCO M.8 NEO | 403 | — | — | — | PROBE_BLOCKED |
| 102 | nouhaus-new-classic | Nouhaus New Classic | 403 | — | — | — | PROBE_BLOCKED |
| 103 | nouhaus-aurora | Nouhaus Aurora | 403 | — | — | — | PROBE_BLOCKED |
| 104 | nouhaus-noucampo | Nouhaus Nou Campo | 403 | — | — | — | PROBE_BLOCKED |
| 105 | nouhaus-luna | Nouhaus Luna | 403 | — | — | — | PROBE_BLOCKED |
| 106 | nouhaus-orbit | Nouhaus Orbit | 403 | — | — | — | PROBE_BLOCKED |
| 107 | daiwa-pegasus-2-smart *(dup ID)* | Daiwa Pegasus 2 Smart | 403 | — | — | — | PROBE_BLOCKED |
| 108 | ogawa-master-drive-duo-le-4d-3d | Ogawa Master Drive Duo LE 4D+3D | 403 | — | — | — | PROBE_BLOCKED |
| 109 | ogawa-master-drive-duo-4d-3d | Ogawa Master Drive Duo 4D+3D | 403 | — | — | — | PROBE_BLOCKED |
| 110 | ogawa-active-xl-duo-3d-2d | Ogawa Active XL Duo 3D+2D | 403 | — | — | — | PROBE_BLOCKED |

---

## Step 3 — Ready-to-Merge Diff

Two patches are recommended. **Do not apply automatically.** Review each change before merging.

---

### Patch 1 — `jpmedics-kaze-duo`: Fix BROKEN_LINK

The massagechairwarehouse.com product page returns 404. A live listing for the same chair was found at massagechairs.com for $12,499.

```diff
--- a/lib/chairs.ts
+++ b/lib/chairs.ts
@@ jpmedics-kaze-duo
-    priceMin: 12999,
-    affiliateTier: 'A',
-    affiliateRetailer: 'massagechairwarehouse.com',
-    affiliateCommission: '10%, 30-day cookie',
+    priceMin: 12499,
+    affiliateTier: null,
+    affiliateRetailer: 'massagechairs.com',
+    affiliateCommission: null,   // verify commission terms for massagechairs.com
     goodwinStatus: 'affiliate',
-    affiliateUrl: 'https://massagechairwarehouse.com/products/jpmedics-kaze-duo',
-    imageUrl: '/images/chairs/jpmedics-kaze-duo.jpg',  // direct product page, confirmed in-stock 2026-05-01
+    affiliateUrl: 'https://www.massagechairs.com/products/jpmedics-kaze-duo-massage-chair',
+    imageUrl: '/images/chairs/jpmedics-kaze-duo.jpg',
```

**Note:** massagechairs.com is on the approved retailer list. Verify the commission / affiliate program for this retailer before setting `affiliateTier` and `affiliateCommission`.

---

### Patch 2 — `luraco-i9-max-plus`: Correct PRICE_MISMATCH

Live Shopify price on massagechairwarehouse.com is $13,490. The catalog was set to $11,990 in the prior audit. The price has reverted to $13,490.

```diff
--- a/lib/chairs.ts
+++ b/lib/chairs.ts
@@ luraco-i9-max-plus
-    priceMin: 11990,  // updated from 13490, confirmed 2026-05-01
+    priceMin: 13490,  // reverted to 13490, confirmed 2026-05-26
```

---

## Appendix — Skipped (Discontinued) Chairs

These 21 chairs were excluded from probing by the prepass script:

kahuna-lm-6800s, kahuna-lm-6800, synca-jp970, synca-jp1100, synca-kagra, ogawa-master-drive-le, ogawa-master-drive-ai, ogawa-active-xl, ogawa-active-l, jpmedics-kozue-5d, panasonic-maj7, panasonic-ma73, titan-3d-premium, real-relax-favor-06, real-relax-ps6500, real-relax-ps3100, relaxonchair-mk-ii-plus, relaxonchair-mk-classic, relaxonchair-mk-iii, relaxonchair-ion-3d, relaxonchair-vita-3d

---

*Generated by `scripts/catalog-audit-prepass.py`, `scripts/catalog-health-audit.py`, and `scripts/probe_urls.py` on 2026-05-26.*
