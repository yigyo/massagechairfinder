# Weekly Catalog Audit — 2026-08-25

## Coverage

- **PREPASS = 109** (`scripts/audit-targets.json`, generated 2026-08-25 from `lib/chairs.ts`: 135 total records, 26 skipped as discontinued/inactive/no-affiliateUrl)
- **CHECKED = 109** (every target in the prepass list was attempted — 0 missed)
- **MISSING = 0**

Of the 109 attempted probes, only **32 (29%) returned usable evidence**. The remaining **77 (71%) could not reach the destination at all** — see "Network limitation" below. This is an environment/infrastructure constraint on this run, not a statement about the retailers themselves.

| Outcome | Count |
|---|---|
| Fetched successfully, JSON-LD parsed | 26 |
| Blocked by the **retailer's own** bot protection (real HTTP 403 from origin) | 6 |
| Blocked by **this session's network egress policy** before reaching the retailer at all | 77 |

## ⚠️ Network limitation (read this first — 3rd consecutive week)

This is the **same infrastructure problem reported on 2026-08-11 (77/109 blocked) and 2026-08-18 (73/109 blocked)**, still unresolved. Coverage was full (109/109) as recently as 2026-08-04, so this is a regression in this session's environment, not a long-standing constraint — worth escalating rather than continuing to route around weekly.

This session's outbound network is routed through a policy-enforcing egress proxy. The proxy rejected the CONNECT tunnel (`403`, "policy denial") for the following affiliate domains, for every target hosted on them — confirmed via `curl` (`CONNECT tunnel failed, response 403`) and cross-checked with `WebFetch` (`EGRESS_BLOCKED`) and the proxy's own status endpoint. Per the environment's own instructions, blocked hosts are **not** to be retried or routed around — they're reported here instead:

- `massagechairwarehouse.com` — 26 targets unreachable
- `wishrockrelaxation.com` — 14 targets unreachable
- `massagechairheaven.com` — 11 targets unreachable
- `amazon.com` — 8 targets unreachable
- `nouhaus.com` — 5 targets unreachable
- `massagechairs.com` — 3 targets unreachable
- `massagechairplanet.com` — 2 targets unreachable
- `humantouch.com` — 2 targets unreachable
- `johnsonfitness.com` — 2 targets unreachable
- `relaxonchair.com` — 2 of 4 targets unreachable (2 others succeeded — this host was intermittently allowed)
- `clearancechair.com` — 1 target unreachable
- `primemassagechairs.com` — 1 target unreachable

**None of these 77 chairs could be evaluated for stock, price, or link health this run.** They are not flagged as OOS, BROKEN_LINK, or PROBE_BLOCKED — that would be fabricated evidence. They are simply unchecked, through no fault of the catalog. Recommend re-running this audit from a session/environment whose egress policy allows these retailer domains, or asking an administrator to widen the allowlist (see `/root/.ccr/README.md`, "403/407 from the proxy" section, for how this session's policy is configured).

Domains that *were* reachable this run: `osakimassagechair.com` (7/7 targets), `syncamassagechair.com` (15/15), `titanchair.com` (1/1), `relaxe.co` (1/1), `massagechairstore.com` (6/6 — reached the origin, but blocked by the retailer's own bot protection), `relaxonchair.com` (2/4).

## Structural Health (Step 1)

`scripts/catalog-health-audit.py` exited **0** — no ERRORS. All `/best/*` picks and `/compare/*` references point to active, in-catalog chairs with editorial entries.

**Warnings (do not block, informational):**
- `WARN /compare/titan-3d-prestige-vs-ogawa-og6400`: references OOS chair `titan-3d-prestige` (`inStock: false`) — **this run's live probe confirms it is still Sold Out** (see below), so the warning is accurate and current.
- `AMAZON WATCHLIST` (5 items, unchanged from prior runs — `amazon.com` was network-policy-blocked this run so none could be re-verified):
  - `osaki-os-pro-admiral-ii` — holds ASIN B09HW3F2BB, no `amazonUrl`
  - `kyota-genki-m380` — holds ASIN B08T4BXGP3, no `amazonUrl`
  - `bodyfriend-falcon-xd` — ASIN B0D97TGBYS, flagged 2026-06-07 as possibly delisted
  - `relaxonchair-jasper` — holds ASIN B0D325QC32, no `amazonUrl`
  - `svago-lite-2` — holds ASIN B0CN1S3XV1, no `amazonUrl`

## Affiliate URL Probe results (Step 2) — the 32 chairs with real evidence

Method: `curl` with a browser User-Agent, following redirects; stock read **only** from `availability` inside `<script type="application/ld+json">` Product/Offer blocks (never from CSS classes, sale badges, or template text). Where a page listed multiple per-variant JSON-LD `Product` blocks (common on this platform's theme), the rule applied was: **any variant `InStock` → live**; **every readable variant `OutOfStock` → OOS**.

### Live and in stock (24) — no action needed, price matches catalog within rounding

| Chair | Retailer | Catalog price | Live JSON-LD price | Diff |
|---|---|---|---|---|
| osaki-os-champ | osakimassagechair.com | $1,299 | $1,299.00 | 0% |
| osaki-os-pro-maestro-le | osakimassagechair.com | $8,999 | $8,999.00 | 0% |
| osaki-os-pro-4d-duomax | osakimassagechair.com | $12,999 | $12,999.00 | 0% |
| amamedics-hilux-4d | osakimassagechair.com | $4,999 | $4,999.00 | 0% |
| ador-3d-allure | osakimassagechair.com | $4,999 | $4,999.00 | 0% |
| theramedic-flex | osakimassagechair.com | $3,499 | $3,499.00 | 0% |
| kanji-4d-shogun-duo | osakimassagechair.com | $14,999 | $14,999.00 | 0% |
| synca-wellness-circ | syncamassagechair.com | $1,299 | $1,299.99 | 0.1% |
| synca-wellness-circ-plus | syncamassagechair.com | $1,899 | $1,899.99 | 0.1% |
| synca-wellness-circ-3 | syncamassagechair.com | $1,999 | $1,999.99 | 0% |
| synca-wellness-kurodo | syncamassagechair.com | $9,999 | $9,999.99 | 0% |
| inner-balance-jin | syncamassagechair.com | $1,999 | $1,999.99 | 0% |
| inner-balance-jin-2 | syncamassagechair.com | $3,999 | $3,999.99 | 0% |
| synca-wellness-jp3000 | syncamassagechair.com | $10,999 | $10,999.99 | 0% |
| fujiiryoki-cyber-relax-ai | syncamassagechair.com | $10,999 | $10,999.99 | 0% |
| fujiiryoki-cyber-relax-ai-executive | syncamassagechair.com | $12,999 | $12,999.99 | 0% |
| fujiiryoki-calm-plus | syncamassagechair.com | $3,999 | $3,999.99 | 0% |
| fujiiryoki-cyber-relax-elite | syncamassagechair.com | $9,999 | $9,999.99 | 0% |
| fujiiryoki-cyber-relax-pro | syncamassagechair.com | $14,999 | $14,999.99 | 0% |
| dcore-d-core-2 | syncamassagechair.com | $16,999 | $16,999.99 | 0% |
| dcore-cirrus-jp | syncamassagechair.com | $12,999 | $12,999.99 | 0% |
| dcore-stratus-jp | syncamassagechair.com | $11,499 | $11,499.99 | 0% |
| relaxe-shiatsu | relaxe.co | $2,799 | $2,799.00 | 0% |
| relaxonchair-mk-v-plus | relaxonchair.com | $2,499 | $2,499.00 | 0% |

No PRICE_MISMATCH (5% threshold) — every reachable chair's live JSON-LD price matched `chairs.ts priceMin` to within $1 (theme rounds to `.99`).

### OOS — flagged (2)

Both were **already** marked `inStock: false` in `chairs.ts` prior to this run — this audit **confirms the existing flag is still correct**, no drift, no catalog edit needed for the flag itself.

- **`titan-3d-prestige`** (Titan 3D Prestige, titanchair.com) — canonical JSON-LD `Product` block: `availability: OutOfStock`, price $4,999.00 (matches catalog, no PRICE_MISMATCH). Page is live (HTTP 200, correct title), just sold out across all 12 variant/warranty combos. **Replacement candidate found:** `osakimassagechair.com/products/titan-pro-3d-prestige-le` — "Titan Pro-3D Prestige LE", `InStock`, $4,999.00 base price. Likely the same chair under Titan's refreshed "LE" naming (same seller org, same price point) but the name isn't identical, so **not auto-patched** — confirm the model match manually before merging. Ready-to-merge diff if confirmed:
  ```diff
  -    affiliateRetailer: 'titanchair.com',
  -    affiliateUrl: 'https://titanchair.com/products/titan-3d-prestige',
  -    inStock: false,  // titanchair.com verified 2026-08-16: page live at $4,999 but Sold Out across all 3 colors
  +    affiliateRetailer: 'osakimassagechair.com',
  +    affiliateUrl: 'https://osakimassagechair.com/products/titan-pro-3d-prestige-le',
  +    inStock: true,  // osakimassagechair.com verified 2026-08-25: InStock at $4,999 as "Titan Pro-3D Prestige LE" — CONFIRM this is the same model as Titan 3D Prestige before merging
  ```
- **`relaxonchair-rio`** (Relax On Chair RIO, relaxonchair.com) — JSON-LD: `availability: OutOfStock`, price $999.00 (matches catalog). Page live, correct title. No replacement found — RIO is a house brand of relaxonchair.com and does not appear to be carried by any other domain on the approved retailer list; the reachable subset of that list (osakimassagechair.com, syncamassagechair.com, titanchair.com) was checked and does not carry it. The unreachable domains (massagechairwarehouse.com, massagechairheaven.com, massagechairs.com, humantouch.com) could not be checked this run — see network limitation above.

### BROKEN_LINK: 0 — all 32 reachable targets returned HTTP 200 with the expected product title, no off-target redirects.

### STOCK_UNKNOWN: 0 — every reachable target had parseable JSON-LD availability.

### PROBE_BLOCKED — retailer bot protection, not this session's network policy (6)

All 6 are `massagechairstore.com` (Infinity/Kyota brands). The proxy allowed the connection; the retailer's own server returned HTTP 403 directly (distinct signature from the 77 network-policy blocks above — confirmed via the proxy's failure log, which does not list massagechairstore.com among policy denials). No stock/price evidence available. No replacement search performed automatically since these aren't confirmed OOS/broken, just unreadable — recommend a manual check or a differently-configured fetch (headless browser) next run.

| Chair | URL |
|---|---|
| infinity-dynasty-4d | massagechairstore.com/infinity-dynasty-4d/ |
| infinity-genesis-max | massagechairstore.com/infinity-genesis-max/ |
| infinity-imperial-syner-d | massagechairstore.com/infinity-imperial-syner-d-massage-chair/ |
| infinity-circadian-4d-dualflex | massagechairstore.com/infinity-circadian-4d-dualflex-massage-chair/ |
| kyota-genki-m380 | massagechairstore.com/kyota-genki-m380-massage-chair/ |
| kyota-konbi-m728-dualpro-4d | massagechairstore.com/kyota-konbi-m728-dualpro-4d-massage-chair/ |

## Summary

- No catalog edits applied this run — everything checkable matched the current catalog state.
- One optional, manually-reviewable diff proposed above (titan-3d-prestige → possible LE successor at osakimassagechair.com).
- **The material issue this run is coverage, not the catalog**: 71% of targets sit behind domains this session's network policy blocks outright. Until that's widened (or the audit runs from a differently-configured environment), this weekly check can only meaningfully cover osakimassagechair.com, syncamassagechair.com, titanchair.com, relaxe.co, relaxonchair.com, and massagechairstore.com (bot-blocked) — roughly a third of the affiliate footprint.
