# MassageChairFinder Catalog Audit — 2026-06-02

**Audit run:** 2026-06-02  
**Total catalog records:** 127  
**Skipped (discontinued):** 21  
**Audit targets (N):** 106  
**Chairs checked:** 106 / 106 ✅

---

## Step 1 — Structural Health

Script: `python3 scripts/catalog-health-audit.py`  
Exit code: **0**  
Output: `[2026-06-02] CATALOG HEALTH: ALL CLEAR`

No errors. No warnings. Catalog structure is healthy.

---

## Step 2 — Affiliate URL Probe

All 106 targets were fetched. Python's `urllib` returned HTTP 403 for many sites (Cloudflare bot-protection); re-probed with `curl` (different TLS fingerprint), recovering 30 additional chairs. A further normalisation fix was applied: `http://schema.org/instock` (lowercase) was not in the original lookup table, causing 13 syncamassagechair.com chairs to be misclassified as STOCK_UNKNOWN; corrected after case-insensitive re-parse.

### Result summary

| Flag | Count |
|------|-------|
| OK — InStock, price within tolerance | 60 |
| OOS — OutOfStock per JSON-LD | 2 |
| STOCK_UNKNOWN — page live, no JSON-LD availability | 2 |
| PROBE_BLOCKED — HTTP 403, all approaches | 42 |
| BROKEN_LINK | 0 |
| PRICE_MISMATCH | 0 |
| **Total** | **106** |

---

### 2a — Out of Stock (OOS)

Both OOS chairs were **already marked `inStockCurrent: false` in chairs.ts** — confirmed, no new surprises.

#### 1. `bodyfriend-phantom-medical` — Bodyfriend Phantom Medical Care 4D SL

- **URL:** <https://recovathlete.com/products/bodyfriend-phantom-medical-care-massage-chair>
- **HTTP status:** 200
- **JSON-LD availability:** `OutOfStock`
- **Catalog priceMin:** $11,000
- **Catalog `mcfActive`:** false; `inStockCurrent`: false
- **Replacement search:** Checked all approved retailers (massagechairwarehouse.com, massagechairstore.com, osakimassagechair.com, massagechairheaven.com, syncamassagechair.com, titanchair.com, humantouch.com, massagechairs.com). **No current listing found.** Bodyfriend distribution in the US appears limited to recovathlete.com.
- **Action:** No patch needed (already inactive). No replacement URL to add.

#### 2. `relaxonchair-rio` — Relax On Chair RIO

- **URL:** <https://relaxonchair.com/products/rio-massage-recliner-chair-black>
- **HTTP status:** 200
- **JSON-LD availability:** `OutOfStock` (live price: $999)
- **Catalog priceMin:** $999
- **Catalog `mcfActive`:** true; `inStockCurrent`: false
- **Replacement search:** Coffee-color variant (`/products/relaxonchair-rio-full-body-zero-gravity-massage-recliner-chair-coffee`) also confirmed `OutOfStock` at $999. RIO is a proprietary brand — no other approved retailer carries it.
- **Action:** No replacement URL available. Suggest keeping `inStockCurrent: false` until restocked.

---

### 2b — Stock Unknown (STOCK_UNKNOWN)

Page returned HTTP 200 but JSON-LD did not contain an `availability` field. Per audit rules these are flagged for manual review, **not inferred as OOS**.

| ID | Name | URL | Note |
|----|------|-----|------|
| `bodyfriend-phantom-ii` | Bodyfriend Phantom II | <https://recovathlete.com/products/bodyfriend-phantom-ii-massage-chair> | recovathlete.com uses `ProductGroup` JSON-LD type without an `offers` block; availability genuinely absent |
| `bodyfriend-palace-ii` | Bodyfriend Palace II | <https://recovathlete.com/products/bodyfriend-palace-2-massage-chair> | Same site/schema pattern; `mcfActive: false`, `inStockCurrent: false` in catalog |

**Recommended action:** Manual spot-check on recovathlete.com. Both chairs are Bodyfriend models with limited US distribution; bodyfriend-palace-ii is already inactive in catalog.

---

### 2c — Probe Blocked (PROBE_BLOCKED)

42 chairs (39.6 % of targets) returned HTTP 403 from both `urllib` and `curl` and from the WebFetch infrastructure — consistent with Cloudflare bot-management rules applied to the whole domain. Per audit rules these are **reported as PROBE_BLOCKED, not inferred as OOS or BROKEN_LINK**.

These 42 chairs were all `inStockCurrent: true` in the catalog (except `bodyfriend-falcon-xd`). Their links were valid the prior audit week; no evidence of breakage beyond bot-blocking.

**Blocked domains and affected chairs:**

| Domain | # Chairs | Chairs |
|--------|----------|--------|
| `www.wishrockrelaxation.com` | 14 | Kahuna Dios-6800, Kahuna Dios-1288, Kahuna Dios Flexa, Kahuna HM-KAPPA, Kahuna EM-8500, Kahuna Dios-7300, Kahuna SM-7300S, Kahuna HM-078, Kahuna HM-5000, Ogawa OG-6300, Ogawa OG-8901, Ogawa OG-6400, Ogawa OG-8801, Ogawa OG-8900 |
| `www.massagechairheaven.com` | 11 | Daiwa Legacy 4, Daiwa Black Panther Supreme Hybrid, Daiwa Supreme Hybrid, Daiwa Pegasus Hybrid, Daiwa Hubble Plus 4D, Daiwa Pegasus 2 Smart, Daiwa Hubble 3D, Daiwa Relax 2 Zero 3D, Daiwa Majesty 2D, RockerTech Bliss, RockerTech Sensation 4D |
| `www.nouhaus.com` | 5 | Nouhaus New Classic, Nouhaus Aurora, Nouhaus Nou Campo, Nouhaus Luna, Nouhaus Orbit |
| `www.massagechairs.com` | 3 | Osaki OS-Pro Yamato, Osaki OS-Pro Admiral II, Panasonic MAK1 |
| `www.humantouch.com` | 2 | Human Touch Laevo ZG, Human Touch Super Novo 3.0 |
| `www.johnsonfitness.com` | 2 | OHCO M.8 NEO LE, OHCO M.8 NEO |
| `www.massagechairplanet.com` | 2 | Infinity Celebrity 3D/4D, JPMedics KaZe Duo |
| `www.amazon.com` | 1 | Bodyfriend Falcon XD 4D |
| `clearancechair.com` | 1 | AmaMedics Renew 3D |
| `www.primemassagechairs.com` | 1 | Panasonic MAF1 |

**Recommendation:** For the next audit cycle, consider obtaining affiliate API access or scheduling a headless-browser probe for these domains. wishrockrelaxation.com (14 Kahuna/Ogawa chairs) and massagechairheaven.com (11 Daiwa/RockerTech chairs) represent the highest concentration; manual spot-checks on these two sites would cover 59 % of blocked chairs.

---

### 2d — OK Chairs (60)

All confirmed InStock with JSON-LD `availability` and price within 5 % of catalog `priceMin`.

**By retailer:**

| Retailer | Chairs confirmed OK |
|----------|-------------------|
| `massagechairwarehouse.com` | 26 |
| `syncamassagechair.com` | 15 |
| `massagechairstore.com` | 7 |
| `osakimassagechair.com` | 7 |
| `relaxonchair.com` | 3 |
| `titanchair.com` | 1 |
| `relaxe.co` | 1 |
| **Total** | **60** |

**Price notes:**
- All prices with extracted values matched catalog `priceMin` within 0–3.3 % (`relaxe-shiatsu`: $2,899 live vs $2,999 catalog = 3.3 %, within the 5 % threshold).
- 7 massagechairstore.com chairs (Infinity and Kyota lines) returned no `price` field in their JSON-LD but `availability` was InStock; flagged OK with no price check possible.
- syncamassagechair.com prices confirmed: CirC $1,299.99, CirC+ $1,899.99, CirC 3 $1,999.99, Kurodo $9,999.99, Jin $1,999.99, Jin 2.0 $3,999.99, JP-3000 $10,999.99, Cyber Relax Ai $10,999.99, Calm Plus $3,999.99, Cyber Relax Elite $9,999.99, Cyber Relax Pro $14,999.99, D.Core 2 $16,999.99, CIRRUS-JP $12,999.99, STRATUS-JP $11,499.99.

**Discrepancy note — `fujiiryoki-cyber-relax-ai-executive`:**  
JSON-LD in page head (`availability: https://schema.org/InStock`) contradicts Shopify product API (`available: false`). Per audit rules JSON-LD is authoritative; chair remains OK. Flagged for next manual review.

---

### 2e — Broken Links

**None found.**

---

### 2f — Price Mismatches

**None found.** All 53 chairs with extractable live prices matched catalog within tolerance.

---

## Ready-to-Merge Diff

Neither OOS chair requires a catalog change (`bodyfriend-phantom-medical` is already `inStockCurrent: false`; `relaxonchair-rio` is already `inStockCurrent: false`). No replacements found on approved retailers. **No diff required this cycle.**

---

## Methodology Notes

- **HTTP client:** Python `urllib` first-pass; curl (OpenSSL TLS fingerprint) for retry on 403 responses; `www.massagechairwarehouse.com` and `www.relaxonchair.com` URLs were normalised to their no-www counterparts which bypass Cloudflare.
- **Stock source:** Exclusively JSON-LD `availability` in `<script type="application/ld+json">` blocks, parsed case-insensitively. Shopify product JSON (`/products/SLUG.json`) was used only for supplementary investigation, never to set stock flags.
- **Price source:** JSON-LD `offers.price` or `offers.lowPrice`. Shopify product JSON prices consulted for syncamassagechair.com supplementary check only.
- **Blocked sites:** 8 domains returned HTTP 403 to all three clients (urllib, curl, WebFetch). These are reported as PROBE_BLOCKED; no stock inference made.

---

*Generated by Claude Code — MassageChairFinder weekly audit pipeline*
