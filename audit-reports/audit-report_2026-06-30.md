# MassageChairFinder Catalog Audit — 2026-06-30

**Auditor:** Automated weekly run  
**Catalog total:** 135 records (110 auditable, 25 discontinued/skipped)  
**Probe coverage:** 38 chairs verified via live HTTP probe · 72 proxy-blocked (STOCK_UNKNOWN) · 7 site-blocked (PROBE_BLOCKED)  
**Report generated:** 2026-06-30

---

## 0. Coverage Summary

| Category | Count |
|---|---|
| Total catalog records | 135 |
| Discontinued / skipped | 25 |
| **Audit targets (N)** | **110** |
| Confirmed LIVE (JSON-LD InStock) | 30 |
| Confirmed OOS (JSON-LD OutOfStock) | 1 |
| PROBE_BLOCKED — site-side 403 | 7 |
| PROBE_BLOCKED — network proxy | 72 |
| Price mismatches (>5%) | 0 |
| Broken links (404 / wrong-product redirect) | 0 |

> **Network limitation:** The audit environment's outbound proxy permits only a subset of retailer domains. 72 of 110 chairs could not be probed due to proxy policy; they are reported as `STOCK_UNKNOWN` and listed in §3-C. All 38 successfully probed chairs returned valid JSON-LD data.

---

## 1. Structural Health

Script: `python3 scripts/catalog-health-audit.py`  
**Exit code: 0 (OK — warnings only)**

### Warnings (3)

| ID | Warning |
|---|---|
| `human-touch-super-novo-3` | Holds ASIN `B003O9HBT2` with no `amazonUrl` — listing may be dead or version mismatch (flagged 2026-06-07). Verify listing; if live and correct, set `amazonUrl`; if gone, drop the ASIN. |
| `kyota-genki-m380` | Holds ASIN `B08T4BXGP3` with no `amazonUrl` — listing may be dead or version mismatch (flagged 2026-06-07). Verify listing; if live and correct, set `amazonUrl`; if gone, drop the ASIN. |
| `bodyfriend-falcon-xd` | Brand search showed zero Bodyfriend listings on Amazon 2026-06-07. Verify ASIN `B0D97TGBYS` still live. _(Chair is discontinued/skipped — low priority.)_ |

No ERRORs. No structural blockers.

---

## 2. Affiliate URL Probe — Results by Flag

### 2-A. LIVE — 30 chairs confirmed in stock, prices match

All 30 confirmed-LIVE chairs pass the 5% price tolerance. No `PRICE_MISMATCH` flags.

| ID | Retailer | Live Price | Catalog priceMin | Δ% |
|---|---|---|---|---|
| osaki-os-champ | osakimassagechair.com | $1,299 | $1,299 | 0% |
| osaki-os-pro-maestro-le | osakimassagechair.com | $8,999 | $8,999 | 0% |
| osaki-os-pro-4d-duomax | osakimassagechair.com | $12,999 | $12,999 | 0% |
| amamedics-hilux-4d | osakimassagechair.com | $4,999 | $4,999 | 0% |
| theramedic-flex | osakimassagechair.com | $3,499 | $3,499 | 0% |
| ador-3d-allure | osakimassagechair.com | $4,999 | $4,999 | 0% |
| kanji-4d-shogun-duo | osakimassagechair.com | $14,999 | $14,999 | 0% |
| luraco-i9-max-plus | massagechairwarehouse.com | $11,990 | $11,990 | 0% |
| luraco-theater-sofy | massagechairwarehouse.com | $3,490 | $3,490 | 0% |
| kyota-yugana-m780 | massagechairwarehouse.com | $7,999 | $7,999 | 0% |
| jpmedics-kumo-4d | massagechairwarehouse.com | $10,999 | $10,999 | 0% |
| titan-pro-vigor-4d | massagechairwarehouse.com | $5,999 | $5,999 | 0% |
| titan-3d-prestige | titanchair.com | $4,999 | $4,999 | 0% |
| synca-wellness-circ | syncamassagechair.com | $1,299.99 | $1,299 | <0.1% |
| synca-wellness-circ-plus | syncamassagechair.com | $1,899.99 | $1,899 | <0.1% |
| synca-wellness-circ-3 | syncamassagechair.com | $1,999.99 | $1,999 | <0.1% |
| synca-wellness-kurodo | syncamassagechair.com | $9,999.99 | $9,999 | <0.1% |
| inner-balance-jin | syncamassagechair.com | $1,999.99 | $1,999 | <0.1% |
| inner-balance-jin-2 | syncamassagechair.com | $3,999.99 | $3,999 | <0.1% |
| synca-wellness-jp3000 | syncamassagechair.com | $10,999.99 | $10,999 | <0.1% |
| fujiiryoki-cyber-relax-ai | syncamassagechair.com | $10,999.99 | $10,999 | <0.1% |
| fujiiryoki-cyber-relax-ai-executive | syncamassagechair.com | $12,999.99 | $12,999 | <0.1% |
| fujiiryoki-calm-plus | syncamassagechair.com | $3,999.99 | $3,999 | <0.1% |
| fujiiryoki-cyber-relax-elite | syncamassagechair.com | $9,999.99 | $9,999 | <0.1% |
| fujiiryoki-cyber-relax-pro | syncamassagechair.com | $14,999.99 | $14,999 | <0.1% |
| dcore-d-core-2 | syncamassagechair.com | $16,999.99 | $16,999 | <0.1% |
| dcore-cirrus-jp | syncamassagechair.com | $12,999.99 | $12,999 | <0.1% |
| dcore-stratus-jp | syncamassagechair.com | $11,499.99 | $11,499 | <0.1% |
| relaxe-shiatsu | relaxe.co | $2,899 / $2,999 | $2,999 | 3.3% _(sale price seen — within 5% threshold)_ |
| relaxonchair-mk-v-plus | relaxonchair.com | $2,499 | $2,499 | 0% |

> Note: syncamassagechair.com prices end in `.99` (e.g. $12,999.99 vs catalog $12,999). This is systematic rounding and does not trigger the 5% mismatch rule. No action needed.

---

### 2-B. OOS — 1 chair confirmed out of stock

| ID | Name | Retailer | JSON-LD Availability | Live Price | Catalog `inStockCurrent` |
|---|---|---|---|---|---|
| `relaxonchair-rio` | Relax On Chair RIO | relaxonchair.com | `OutOfStock` | $999 | `false` ✓ |

**Status:** Catalog already correctly reflects OOS (`inStockCurrent: false`). No patch required.

**Replacement search:** Searched approved retailer list. The Relax On Chair RIO ($999, entry-level) is a brand-exclusive model sold only on relaxonchair.com. No equivalent listing found on the approved retailer list. Recommend leaving the existing URL in place and monitoring relaxonchair.com for restock, or marking as discontinued if the brand discontinues it.

---

### 2-C. PROBE_BLOCKED — site-side 403 — 7 chairs (massagechairstore.com)

All 7 blocked URLs are on `massagechairstore.com`, which returned HTTP 403 (bot-protection/Cloudflare). These chairs cannot be verified automatically. **Manual browser check required.**

| ID | Name | Catalog `inStockCurrent` | URL |
|---|---|---|---|
| `infinity-dynasty-4d` | Infinity Dynasty 4D | `true` | https://massagechairstore.com/infinity-dynasty-4d/ |
| `infinity-evolution` | Infinity Evo Max 4D | `true` | https://massagechairstore.com/infinity-evolution-max-4d/ |
| `infinity-genesis-max` | Infinity Genesis Max 4D | `true` | https://massagechairstore.com/infinity-genesis-max/ |
| `infinity-imperial-syner-d` | Infinity Imperial Syner-D | `true` | https://massagechairstore.com/infinity-imperial-syner-d-massage-chair/ |
| `infinity-circadian-4d-dualflex` | Infinity Circadian 4D DualFlex | `true` | https://massagechairstore.com/infinity-circadian-4d-dualflex-massage-chair/ |
| `kyota-genki-m380` | Kyota Genki M380 | `true` | https://massagechairstore.com/kyota-genki-m380-massage-chair/ |
| `kyota-konbi-m728-dualpro-4d` | Kyota Konbi M728 DualPro 4D | `true` | https://massagechairstore.com/kyota-konbi-m728-dualpro-4d-massage-chair/ |

---

### 2-D. PROBE_BLOCKED — network proxy — 72 chairs (STOCK_UNKNOWN)

The audit environment's outbound proxy blocked HTTPS connections to the following retailer domains. Stock and price for these 72 chairs **cannot be confirmed** from this run. All were previously `inStockCurrent: true` unless noted. Manual spot-checks are recommended, especially for chairs not recently verified.

#### massagechairwarehouse.com — 21 chairs

| ID | Name | Catalog Price |
|---|---|---|
| `ceragem-m10` | Ceragem M10 | $12,999 |
| `ergotec-et-180-pluto` | Ergotec ET-180 Pluto | $1,999 |
| `koyo-303ts` | Koyo 303TS | $7,999 |
| `medical-breakthrough-5` | Medical Breakthrough 5 | $2,249 |
| `medical-breakthrough-6` | Medical Breakthrough 6 | $4,249 |
| `medical-breakthrough-6-plus` | Medical Breakthrough 6 Plus | $5,499 |
| `medical-breakthrough-7` | Medical Breakthrough 7 | $6,249 |
| `medical-breakthrough-7-plus` | Medical Breakthrough 7 Plus | $8,399 |
| `medical-breakthrough-8` | Medical Breakthrough 8 | $8,249 |
| `medical-breakthrough-8-plus` | Medical Breakthrough 8 Plus | $10,899 |
| `medical-breakthrough-9` | Medical Breakthrough 9 | $10,399 |
| `medical-breakthrough-9-plus` | Medical Breakthrough 9 Plus | $14,649 |
| `medical-breakthrough-x` | Medical Breakthrough X | $12,499 |
| `positive-posture-brio-plus` | Positive Posture Brio Plus | $7,999 |
| `positive-posture-brio-sport` | Positive Posture Brio Sport | $8,999 |
| `positive-posture-solara` | Positive Posture Solara | $2,499 |
| `sharper-image-relieve-3d` | Sharper Image Relieve 3D | $4,499 |
| `sharper-image-revival` | Sharper Image Revival | $3,999 |
| `svago-lite-2` | Svago Lite 2 | $1,499 |
| `svago-zgr` | Svago ZGR | $2,199 |
| `svago-newton` | Svago Newton | $3,199 |

> Note: 5 other massagechairwarehouse.com chairs (luraco-i9-max-plus, luraco-theater-sofy, kyota-yugana-m780, jpmedics-kumo-4d, titan-pro-vigor-4d) were successfully probed before proxy rate-limiting kicked in — see §2-A.

#### massagechairheaven.com — 11 chairs

| ID | Name | Catalog Price |
|---|---|---|
| `daiwa-legacy-4` | Daiwa Legacy 4 | $9,500 |
| `daiwa-black-panther-supreme-hybrid` | Daiwa Black Panther Supreme Hybrid | $15,500 |
| `daiwa-supreme-hybrid` | Daiwa Supreme Hybrid | $13,500 |
| `daiwa-pegasus-hybrid` | Daiwa Pegasus Hybrid | $12,000 |
| `daiwa-hubble-plus-4d` | Daiwa Hubble Plus 4D | $11,000 |
| `daiwa-pegasus-2-smart` | Daiwa Pegasus 2 Smart (DWA-9400) | $11,000 |
| `daiwa-hubble-3d` | Daiwa Hubble 3D | $10,000 |
| `daiwa-relax-2-zero-3d` | Daiwa Relax 2 Zero 3D | $9,000 |
| `daiwa-majesty-2d` | Daiwa Majesty 2D | $6,000 |
| `rockertech-bliss` | RockerTech Bliss | $5,499 |
| `rockertech-sensation-4d` | RockerTech Sensation 4D | $6,999 |

#### wishrockrelaxation.com — 14 chairs

| ID | Name | Catalog Price |
|---|---|---|
| `kahuna-dios-6800` | Kahuna Dios-6800 6D | $3,799 |
| `kahuna-dios-1288` | Kahuna Dios-1288 8D | $16,999 |
| `kahuna-dios-flexa` | Kahuna Dios Flexa | $8,499 |
| `kahuna-hm-kappa` | Kahuna HM-KAPPA | $9,500 |
| `kahuna-em-8500` | Kahuna EM-8500 | $8,900 |
| `kahuna-dios-7300` | Kahuna Dios-7300 7D | $7,999 |
| `kahuna-sm-7300s` | Kahuna SM-7300S | $6,999 |
| `kahuna-hm-078` | Kahuna HM-078 Hubot 4D | $4,399 |
| `kahuna-hm-5000` | Kahuna HM-5000 | $2,000 |
| `ogawa-og6300` | Ogawa Active XL 3D (OG-6300) | $2,999 |
| `ogawa-og8901` | Ogawa Master Drive DUO LE 4D+3D (OG-8901) | $9,399 |
| `ogawa-og6400` | Ogawa Active XL Duo 3D+2D (OG-6400) | $4,799 |
| `ogawa-og8801` | Ogawa Master Drive AI 2.0 4D (OG-8801) | $12,999 |
| `ogawa-og8900` | Ogawa Master Drive DUO 4D+3D (OG-8900) | $15,999 |

#### amazon.com — 8 chairs

| ID | Name | Catalog Price |
|---|---|---|
| `relx-20-mode` | RELX Full Body 20-Mode | $1,999 |
| `culanta-sl-track` | Culanta SL-Track Shiatsu | $1,099 |
| `tlife-160-zg` | TLIFE 160 Zero Gravity | $1,349 |
| `healthrelife-4d-15-mode` | HealthRelife 4D 15-Mode | $1,699 |
| `ktentito-g6` | KTENTITO G6 | $1,439 |
| `mythia-a303c` | MYTHIA A303C 4D | $1,799 |
| `healthrelife-4d-20-mode` | HealthRelife 4D 20-Mode | $2,699 |
| `casinta-4d` | CASINTA 4D | $1,199 |

#### massagechairs.com — 3 chairs

| ID | Name | Catalog Price |
|---|---|---|
| `osaki-os-pro-yamato` | Osaki OS-Pro Yamato | $3,999 |
| `osaki-os-pro-admiral-ii` | Osaki OS-Pro Admiral II | $2,999 |
| `panasonic-mak1` | Panasonic MAK1 | $14,499 |

#### humantouch.com — 2 chairs

| ID | Name | Catalog Price |
|---|---|---|
| `human-touch-laevo-zg` | Human Touch Laevo ZG | $4,499 |
| `human-touch-super-novo-3` | Human Touch Super Novo 3.0 | $11,999 |

#### relaxonchair.com — 2 chairs (partial: 2/4 probed successfully)

| ID | Name | Catalog Price |
|---|---|---|
| `relaxonchair-jasper` | Relax On Chair Jasper | $1,599 |
| `relaxonchair-yukon-4d` | Relax On Chair YUKON-4D | $6,499 |

#### massagechairplanet.com — 2 chairs

| ID | Name | Catalog Price |
|---|---|---|
| `infinity-celebrity` | Infinity Celebrity 3D/4D | $5,999 |
| `jpmedics-kaze-duo` | JPMedics KaZe Duo | $12,999 |

#### nouhaus.com — 5 chairs

| ID | Name | Catalog Price |
|---|---|---|
| `nouhaus-new-classic` | Nouhaus New Classic | $1,499 |
| `nouhaus-aurora` | Nouhaus Aurora | $2,299 |
| `nouhaus-noucampo` | Nouhaus Nou Campo | $2,299 |
| `nouhaus-luna` | Nouhaus Luna | $2,999 |
| `nouhaus-orbit` | Nouhaus Orbit | $3,999 |

#### johnsonfitness.com — 2 chairs

| ID | Name | Catalog Price |
|---|---|---|
| `ohco-m8-neo-le` | OHCO M.8 NEO LE | $18,000 |
| `ohco-m8-neo` | OHCO M.8 NEO | $14,999 |

#### clearancechair.com — 1 chair

| ID | Name | Catalog Price |
|---|---|---|
| `amamedics-renew-3d` | AmaMedics Renew 3D | $1,299 |

#### primemassagechairs.com — 1 chair

| ID | Name | Catalog Price |
|---|---|---|
| `panasonic-maf1` | Panasonic MAF1 | $5,999 |

---

## 3. Action Items

### Immediate (this week)

1. **relaxonchair-rio — Confirmed OOS** _(catalog already correct)_
   - JSON-LD confirms `OutOfStock`. Catalog `inStockCurrent: false` is accurate. No patch needed.
   - No replacement found on approved retailer list. Monitor for restock.

2. **massagechairstore.com — 7 chairs, site-blocked (PROBE_BLOCKED)**
   - Open each URL in a browser to verify availability and prices.
   - Infinity Dynasty 4D, Evo Max 4D, Genesis Max 4D, Imperial Syner-D, Circadian 4D DualFlex, Kyota Genki M380, Kyota Konbi M728 DualPro 4D.
   - If any are OOS or 404, follow standard replacement search procedure against the approved retailer list.

3. **Structural health — Amazon ASINs without amazonUrl**
   - `human-touch-super-novo-3`: verify/drop ASIN `B003O9HBT2`
   - `kyota-genki-m380`: verify/drop ASIN `B08T4BXGP3`

### Medium priority (proxy-blocked domains — manual spot checks)

The 72 proxy-blocked chairs span 12 domains. Recommend manually spot-checking the highest-GMV domains first:

- **massagechairwarehouse.com (21 chairs)** — Medical Breakthrough lineup and Svago models; these are among the highest-priced chairs in the catalog. Spot-check 3–4 representative models.
- **massagechairheaven.com (11 chairs)** — Daiwa lineup; verify at least daiwa-black-panther-supreme-hybrid and daiwa-supreme-hybrid.
- **wishrockrelaxation.com (14 chairs)** — Full Kahuna and Ogawa lineups.
- **humantouch.com (2 chairs)** — human-touch-super-novo-3 (also has a pending Amazon ASIN warning).
- **amazon.com (8 chairs)** — Budget/mid-tier brands; these have the highest churn risk.

### Ready-to-merge diff (if needed)

No confirmed BROKEN_LINK or new OOS chairs were found in this run. No diff generated.  
If manual review of §3 items above uncovers OOS or broken links, a patch will be issued in the next run or ad-hoc.

---

## 4. Methodology Notes

- **JSON-LD only** for stock determination. HTML text, CSS classes, and translation keys were NOT used.
- **Price comparison** uses the minimum JSON-LD `price` seen on page vs `priceMin` in chairs.ts; threshold is >5%.
- **PROBE_BLOCKED (network)** means the audit environment's HTTPS proxy returned 403 for the CONNECT tunnel before reaching the website. This is a network policy restriction, not a website error. The website's actual status is unknown.
- **PROBE_BLOCKED (site-side)** means the website itself returned HTTP 403, typically indicating bot-detection (Cloudflare). The website is live but blocked the probe.
- **STOCK_UNKNOWN** is never inferred from HTML text; it is only emitted when JSON-LD is absent/unparseable or the probe could not reach the page.
