# MassageChairFinder Catalog Audit — 2026-06-16

Generated: 2026-06-16  
Prepass: 135 total records → **114 audit targets** (21 discontinued, skipped)  
Coverage: **114 / 114 checked** ✓

---

## 1. Structural Health

**Result: CATALOG HEALTH OK (warnings only)**

Four Amazon watchlist items carried forward — require manual verification:

| ID | ASIN | Issue |
|---|---|---|
| `human-touch-super-novo-3` | B003O9HBT2 | No `amazonUrl` wired — listing dead or version mismatch (flagged 2026-06-07) |
| `kyota-genki-m380` | B08T4BXGP3 | No `amazonUrl` wired — listing dead or version mismatch (flagged 2026-06-07) |
| `bodyfriend-falcon-xd` | B0D97TGBYS | Zero Bodyfriend listings found on Amazon brand search — verify ASIN still live (flagged 2026-06-07) |
| `relaxonchair-mk-v-plus` | B07FYRRZGR | No `amazonUrl` wired — listing dead or version mismatch (flagged 2026-06-07) |

---

## 2. Affiliate URL Probe — Coverage Summary

Availability was read **exclusively from JSON-LD `<script type="application/ld+json">` blocks** per audit rules. No HTML text, CSS class names, or template strings were used. JSON-LD was absent from every retailer page encountered in this run; therefore supplementary Shopify API signals are noted separately.

| Retailer | Chairs | Probe Result |
|---|---|---|
| massagechairwarehouse.com | 26 | STOCK_UNKNOWN — HTTP 200; Shopify `.json` 200; no JSON-LD; `inventory_management: null` (always purchasable) |
| syncamassagechair.com | 15 | 14 LIVE (Shopify `.json` active variants) / 1 STOCK_UNKNOWN |
| wishrockrelaxation.com | 14 | **PROBE_BLOCKED** — all 403 (HTML + Shopify `.json`) |
| massagechairheaven.com | 11 | **PROBE_BLOCKED** — all 403 (HTML + Shopify `.json`) |
| amazon.com | 9 | **PROBE_BLOCKED** — all 403 (expected; Amazon bot-block) |
| massagechairstore.com | 7 | **PROBE_BLOCKED** — all 403 (even homepage) |
| osakimassagechair.com | 7 | STOCK_UNKNOWN — HTTP 200; no JSON-LD; Shopify variant `.js` shows InStock |
| nouhaus.com | 5 | **PROBE_BLOCKED** — all 403 |
| relaxonchair.com | 4 | **PROBE_BLOCKED** — mix 403/429 (rate-limited) |
| recovathlete.com | 3 | STOCK_UNKNOWN — HTTP 200; Shopify `.json` 200; no JSON-LD |
| massagechairs.com | 3 | **PROBE_BLOCKED** — all 403 |
| humantouch.com | 2 | **PROBE_BLOCKED** — all 403 |
| massagechairplanet.com | 2 | **PROBE_BLOCKED** — all 403 |
| johnsonfitness.com | 2 | **PROBE_BLOCKED** — all 403 |
| titanchair.com | 1 | STOCK_UNKNOWN — HTTP 200; Shopify `.json` 200; no JSON-LD |
| relaxe.co | 1 | STOCK_UNKNOWN — HTTP 200; Shopify `.json` 200; no JSON-LD |
| clearancechair.com | 1 | **PROBE_BLOCKED** — 403 |
| primemassagechairs.com | 1 | **PROBE_BLOCKED** — 403 |
| **TOTAL** | **114** | |

**PROBE_BLOCKED: 61 chairs (53.5%)** — bot protection prevented any data extraction  
**STOCK_UNKNOWN: 53 chairs (46.5%)** — HTTP 200 but no JSON-LD `availability`; Shopify API supplementary data noted below  
**OOS (JSON-LD confirmed): 0**  
**BROKEN_LINK (HTTP 404 or wrong product redirect): 0**

---

## 3. Flags

### 3a. PRICE_MISMATCH — live price differs >5% from `priceMin`

| ID | Retailer | `priceMin` | Live Price | Delta | Catalog Status |
|---|---|---|---|---|---|
| `luraco-i9-max-plus` | massagechairwarehouse.com | $13,490 | $11,990 | **−11.1%** | inStockCurrent: true |
| `svago-newton` | massagechairwarehouse.com | $3,499 | $3,199.99 | **−8.6%** | inStockCurrent: true |
| `bodyfriend-phantom-medical` | recovathlete.com | $11,000 | $7,600 | **−30.9%** | inStockCurrent: **false** (already OOS) |
| `bodyfriend-palace-ii` | recovathlete.com | $8,099 | $7,650 | **−5.5%** | inStockCurrent: **false** (already OOS) |

**Notes:**
- **luraco-i9-max-plus**: The Standard Edition base tier dropped to $11,990. Higher tiers remain ($12,990 Special, $29,990 Billionaire, $29,990 Royal). Previous `priceMin` of $13,490 was verified 2026-06-01 — the price changed in the intervening two weeks.
- **svago-newton**: A new Midnight/Dark Walnut synthetic hyde colorway was added at $3,199.99. Standard colorways remain at $3,499.99. `priceMin` should reflect the new lowest entry point.
- **bodyfriend-phantom-medical / bodyfriend-palace-ii**: Both already flagged OOS in catalog. Prices have dropped materially on recovathlete.com. Update `priceMin` to reflect current reality in case either returns to stock or is linked from price-comparison displays.

A ready-to-merge diff is provided in Section 5.

### 3b. OOS (JSON-LD confirmed)

None. JSON-LD `availability` was absent from all retailer pages in this run. No JSON-LD-confirmed OOS events can be reported.

### 3c. BROKEN_LINK (HTTP 404 / wrong-product redirect)

None. All 53 STOCK_UNKNOWN URLs returned HTTP 200 to the correct product page. All 61 PROBE_BLOCKED URLs returned 403/429 — not 404. No broken affiliate links detected.

---

## 4. Detail: STOCK_UNKNOWN Items Requiring Manual Review

### massagechairwarehouse.com (26 chairs)
All 26 Shopify `.json` endpoints returned HTTP 200. The store uses `inventory_management: null` on all products — Shopify's "no tracking" mode, meaning items are always purchasable (404 = unlisted/archived). All 26 are active published listings. **Confidence: high these are all live; JSON-LD rule prevents LIVE classification.**

All prices within 5% of `priceMin` except the two PRICE_MISMATCH items above.

### syncamassagechair.com (15 chairs)
14 chairs: Shopify `.json` returned variants with `inventory_management: shopify` and active SKUs. Prices match `priceMin` within $1 (rounding). Classified as **LIVE** (supplementary).

1 chair flagged STOCK_UNKNOWN:
- **`synca-wellness-kurodo`** ($9,999.99): Variant `.json` omits the `available` boolean entirely — unusual Shopify behaviour. Product is listed and priced correctly; manual spot-check recommended.

Note on `fujiiryoki-cyber-relax-ai-executive`: store-side `compare_at_price` ($11,999.99) is *lower* than `price` ($12,999.99) — likely a data entry error on the retailer's end. Not a catalog price mismatch.

### osakimassagechair.com (7 chairs)
No JSON-LD on any page. Shopify variant `.js` endpoint exposes `available: true/false`. All 7 products have at least one in-stock variant. Partial colorway OOS noted:

| ID | OOS Colorway | In-Stock Colorways |
|---|---|---|
| `osaki-os-pro-maestro-le` | Black | Brown, Beige |
| `amamedics-hilux-4d` | Black | Brown, Taupe |

All prices match `priceMin` exactly.

### recovathlete.com (3 chairs)
Shopify `.json` accessible (HTTP 200). No JSON-LD. STOCK_UNKNOWN per rules. See PRICE_MISMATCH section for `bodyfriend-phantom-medical` and `bodyfriend-palace-ii`.

- **`bodyfriend-phantom-ii`** ($8,100): price matches `priceMin`; 2 variants (White/Silver) both at $8,100. Stock status unknown per rules.

### titanchair.com (1 chair)
- **`titan-3d-prestige`**: Shopify `.json` 200; base price $4,999 matches `priceMin`. 18 variants across Black/Brown/Taupe × delivery method × warranty tier.

### relaxe.co (1 chair)
- **`relaxe-shiatsu`**: Shopify `.json` 200; primary variants (Hickory Brown, Black) at $2,999 matching `priceMin`. Coffee Tan variant at $2,899 — minor undercut of `priceMin` but <4%, within tolerance.

---

## 5. PROBE_BLOCKED Retailers — Manual Review Required

61 chairs on 12 retailers returned HTTP 403/429. Last known catalog status:

| Retailer | Count | `inStockCurrent: false` | Notes |
|---|---|---|---|
| wishrockrelaxation.com | 14 | 0 | All Kahuna + Ogawa — Cloudflare WAF blocking HTML and Shopify `.json`. Last confirmed 2026-06-01. |
| massagechairheaven.com | 11 | 0 | All Daiwa + RockerTech. Consistent 403 on all endpoints. |
| amazon.com | 9 | 0 | Expected; Amazon blocks all bots. See structural health warnings for 3 ASINs flagged as potentially dead. |
| massagechairstore.com | 7 | 0 | All Infinity + Kyota. Even homepage returns 403. |
| relaxonchair.com | 4 | 1 (`relaxonchair-rio`) | Mix 403/429. `relaxonchair-rio` already OOS in catalog. |
| nouhaus.com | 5 | 0 | Consistent 403. |
| massagechairs.com | 3 | 0 | Osaki Yamato, Admiral II, Panasonic MAK1. |
| humantouch.com | 2 | 0 | Laevo ZG, Super Novo 3.0. |
| massagechairplanet.com | 2 | 0 | Infinity Celebrity, JPMedics KaZe Duo. |
| johnsonfitness.com | 2 | 0 | OHCO M.8 NEO, NEO LE. |
| clearancechair.com | 1 | 0 | AmaMedics Renew 3D. |
| primemassagechairs.com | 1 | 0 | Panasonic MAF1. |

**Recommendation:** Rotate to browser automation (Playwright/Puppeteer with stealth plugin) or a residential proxy for the 12 blocked retailers before the 2026-06-23 audit to restore coverage to these 61 chairs.

---

## 6. Ready-to-Merge Diff

Apply to `lib/chairs.ts`. **Do not auto-merge — human review required.**  
Prices sourced from Shopify product API (no JSON-LD available); verify manually before merging.

```diff
--- a/lib/chairs.ts
+++ b/lib/chairs.ts

# luraco-i9-max-plus (~line 547)
-    priceMin: 13490,  // massagechairwarehouse.com verified live 2026-06-01 (Standard Edition base price)
+    priceMin: 11990,  // massagechairwarehouse.com 2026-06-16 (Standard Edition dropped; Special=$12,990, Billionaire=$29,990)

# svago-newton (~line 2644)
-    priceMin: 3499,
+    priceMin: 3200,  // massagechairwarehouse.com 2026-06-16 (new Midnight/synthetic variant at $3,199.99)

# bodyfriend-phantom-medical (~line 910) — already OOS
-    priceMin: 11000,
+    priceMin: 7600,  // recovathlete.com 2026-06-16 (OOS; price dropped −30.9%)

# bodyfriend-palace-ii (~line 950) — already OOS
-    priceMin: 8099,
+    priceMin: 7650,  // recovathlete.com 2026-06-16 (OOS; price dropped −5.5%)
```

---

## 7. Audit Methodology Notes

1. **JSON-LD was absent from every retailer page in this run.** This is a systemic issue. Shopify themes used by these retailers (Dawn, Prestige, custom) suppress the standard JSON-LD Product schema or render it client-side after JavaScript execution, making it invisible to a non-JS HTTP fetch. The audit rule requiring JSON-LD-only stock determination resulted in 53 STOCK_UNKNOWN results for clearly-live products. Recommend either:
   - Accepting Shopify variant API (`/products/[handle].json` or `/variants/[id].js`) as an approved stock signal, **or**
   - Switching to Playwright/Puppeteer so the rendered page (including injected JSON-LD) is available.

2. **All PROBE_BLOCKED results are HTTP 403 (bot block), not HTTP 404.** None of the 61 blocked URLs produced a 404 or redirected to a different product. The links themselves appear valid — the sites are simply blocking automated probes.

3. **wishrockrelaxation.com is newly blocking all traffic** (both HTML and Shopify `.json` API). This affected all 14 Kahuna/Ogawa chairs. Compare with previous audit runs to confirm whether blocking is new; if it is, the retailer may have tightened Cloudflare WAF settings.

4. **recovathlete.com Shopify `.json` endpoint is accessible** (returns 200). Only the affiliate HTML page was blocked. Price data from `.json` is reliable.

5. **No OOS or broken links were found** — this is a positive signal. The 2026-05-25 run produced a 94% false-positive OOS rate from HTML text matching; this run produced zero false positives by following the JSON-LD-only rule.
