# Catalog Audit Report — 2026-09-01

## Coverage

`scripts/catalog-audit-prepass.py` parsed **135** total chair records and selected **N = 109** audit targets (active === true, at least one of mcfActive/goodwinActive === true, has affiliateUrl). 26 records were skipped as discontinued/inactive/no-URL — see `scripts/audit-targets.json`.

**PREPASS=109, CHECKED=109, MISSING=0.** Coverage requirement met — every target was visited in Step 2.

## Structural Health (Step 1)

`scripts/catalog-health-audit.py` exit code: **0** (warnings only, no ERRORs — does not block).

```
[2026-09-01] WARNINGS (6):
  WARN  /compare/titan-3d-prestige-vs-ogawa-og6400: references OOS chair "titan-3d-prestige" (inStock=false) -- consider updating
  AMAZON WATCHLIST: osaki-os-pro-admiral-ii holds ASIN B09HW3F2BB with no amazonUrl (listing dead or version mismatch when wired 2026-06-07). Verify listing; if live and correct, set amazonUrl; if gone, drop the ASIN.
  AMAZON WATCHLIST: kyota-genki-m380 holds ASIN B08T4BXGP3 with no amazonUrl (listing dead or version mismatch when wired 2026-06-07). Verify listing; if live and correct, set amazonUrl; if gone, drop the ASIN.
  AMAZON WATCHLIST: bodyfriend-falcon-xd: brand search showed zero Bodyfriend listings on Amazon 2026-06-07; verify ASIN B0D97TGBYS still live
  AMAZON WATCHLIST: relaxonchair-jasper holds ASIN B0D325QC32 with no amazonUrl (listing dead or version mismatch when wired 2026-06-07). Verify listing; if live and correct, set amazonUrl; if gone, drop the ASIN.
  AMAZON WATCHLIST: svago-lite-2 holds ASIN B0CN1S3XV1 with no amazonUrl (listing dead or version mismatch when wired 2026-06-07). Verify listing; if live and correct, set amazonUrl; if gone, drop the ASIN.

CATALOG HEALTH: OK (warnings only)
```

## Headline finding: massagechairwarehouse.com is dead — 26 chairs affected

`massagechairwarehouse.com` now issues a **blanket domain-wide HTTP 301** to `gameroomempire.com` (a game-room/arcade-equipment retailer, unrelated business) for **every path on the domain**, confirmed with the retailer's own product slugs and a deliberately nonexistent slug — all redirected identically:

```
massagechairwarehouse.com/products/luraco-i9-max-plus-massage-chair -> 301 -> gameroomempire.com/products/luraco-i9-max-plus-massage-chair
massagechairwarehouse.com/products/nonexistent-random-xyz-123       -> 301 -> gameroomempire.com/products/nonexistent-random-xyz-123
```

This is not a per-product issue — the retailer relationship itself is gone. Every one of the **26** catalog chairs whose `affiliateRetailer` is `massagechairwarehouse.com` is flagged **BROKEN_LINK** below, regardless of whether chairs.ts stores the URL with or without a `www.` prefix (both forms redirect identically).

## Step 2 results by category

| Category | Count | Meaning |
|---|---:|---|
| Live, verified, no issues | 24 | JSON-LD confirms InStock (or a variant is), price within 5% of catalog |
| OOS — confirmed, already correctly marked | 2 | titan-3d-prestige, relaxonchair-rio — chairs.ts already has `inStock: false`; probe agrees |
| BROKEN_LINK | 26 | massagechairwarehouse.com domain-wide redirect (see above) |
| PROBE_BLOCKED — bot block (real 403 from the retailer) | 8 | Confirmed 403 response from the retailer's own server |
| PROBE_BLOCKED — network policy (could not attempt fetch) | 49 | This session's egress proxy denies the destination host outright (see note below) |
| **Total** | **109** | |
| PRICE_MISMATCH | 0 | No live-verified chair differed >5% from chairs.ts priceMin |

### ⚠️ Note on the 49 "network policy" PROBE_BLOCKED entries

This run's sandbox egress proxy rejected the CONNECT tunnel (403, "organization policy") to several retailer hosts *before any page content could be requested* — confirmed via the proxy's own status endpoint (`connect_rejected`, reason "policy denial"). This is a property of this execution environment, not evidence of anything wrong with those retailers. It affected: `www.wishrockrelaxation.com` (14), `www.massagechairheaven.com` (11), `www.amazon.com` (7), `www.nouhaus.com` (4), `www.massagechairs.com` (3), `www.massagechairplanet.com` (2), `www.humantouch.com` (2), `www.johnsonfitness.com` (2), `www.relaxonchair.com` (2), `www.primemassagechairs.com` (1), `clearancechair.com` (1). Notably the *bare* (non-`www.`) form of most of these domains loaded fine and simply 301-redirects to `www.` as normal canonicalization — i.e. this is not evidence of a broken or hijacked domain, just an unreachable one from this run. **These 49 chairs still need a stock/price check by a run with unrestricted egress** (or a manual spot-check) before the numbers below can be trusted. Full list:

<details>
<summary>49 chairs not reachable this run (network policy) — expand for full list</summary>

**www.wishrockrelaxation.com** — Kahuna Dios-6800 ($3799), Kahuna Dios-1288 ($17999), Kahuna Dios Flexa ($8499), Kahuna HM-KAPPA ($9500), Kahuna EM-8500 ($8900), Kahuna Dios-7300 ($8999), Kahuna SM-7300S ($6999), Kahuna HM-078 Hubot 4D ($4399), Kahuna HM-5000 ($2000), Ogawa Active XL 3D OG-6300 ($2999), Ogawa Master Drive DUO LE OG-8901 ($9399), Ogawa Active XL Duo OG-6400 ($4799), Ogawa Master Drive AI 2.0 OG-8801 ($12999), Ogawa Master Drive DUO OG-8900 ($15999)

**www.massagechairheaven.com** — Daiwa Legacy 4 ($9500), Daiwa Black Panther Supreme Hybrid ($15500), Daiwa Supreme Hybrid ($13500), Daiwa Pegasus Hybrid ($12000), Daiwa Hubble Plus 4D ($11000), Daiwa Pegasus 2 Smart DWA-9400 ($11000), Daiwa Hubble 3D ($10000), Daiwa Relax 2 Zero 3D ($9000), Daiwa Majesty 2D ($6000), RockerTech Bliss ($5499), RockerTech Sensation 4D ($6999)

**www.amazon.com** — RELX Full Body 20-Mode ($1899), Culanta SL-Track Shiatsu ($999), TLIFE 160 Zero Gravity ($1199), HealthRelife 4D 15-Mode ($1699), KTENTITO G6 ($1439), HealthRelife 4D 20-Mode ($2399), CASINTA 4D ($1199)

**www.nouhaus.com** — Nouhaus New Classic ($1499), Nouhaus Aurora ($2299), Nouhaus Nou Campo ($2299), Nouhaus Orbit ($3999)

**www.massagechairs.com** — Osaki OS-Pro Yamato ($3999), Osaki OS-Pro Admiral II ($2999), Panasonic MAK1 ($14499)

**www.massagechairplanet.com** — Infinity Celebrity 3D/4D ($5999), JPMedics KaZe Duo ($12999)

**www.humantouch.com** — Human Touch Laevo ZG ($4499), Human Touch Super Novo 3.0 ($11999)

**www.johnsonfitness.com** — OHCO M.8 NEO LE ($18000), OHCO M.8 NEO ($14999)

**www.relaxonchair.com** — Relax On Chair Jasper ($1599), Relax On Chair YUKON-4D ($6499)

**www.primemassagechairs.com** — Panasonic MAF1 ($5999)

**clearancechair.com** — AmaMedics Renew 3D ($1299)

</details>

### PROBE_BLOCKED — confirmed bot block (8)

These returned an actual `403 Forbidden` from the retailer's own server (not a proxy/network issue) — same-domain final URL, no redirect:

| Chair | Retailer | Price |
|---|---|---:|
| Infinity Dynasty 4D | massagechairstore.com | $3999 |
| Infinity Genesis Max 4D | massagechairstore.com | $9299 |
| Infinity Imperial Syner-D | massagechairstore.com | $7999 |
| Infinity Circadian 4D DualFlex | massagechairstore.com | $16999 |
| Kyota Genki M380 | massagechairstore.com | $7999 |
| Kyota Konbi M728 DualPro 4D | massagechairstore.com | $7999 |
| Nouhaus Luna | nouhaus.com | $2999 |
| MYTHIA A303C 4D | amazon.com | $1399 |

### Live, verified, no issues (24)

All returned HTTP 200 with the chair's own title, JSON-LD `availability` shows InStock on at least one offer/variant, and the lowest live price is within 5% of chairs.ts `priceMin`. Includes: Osaki OS-Champ, Osaki OS-Pro Maestro LE 2.0, Osaki OS-Pro 4D DuoMax, AmaMedics Hilux 4D, Synca Wellness CirC/CirC+/CirC 3/Kurodo/JP-3000, Inner Balance Jin/Jin 2.0, Fujiiryoki Cyber Relax Ai/Ai Executive/Calm Plus/Elite/Pro, DCORE D.Core 2/CIRRUS-JP/STRATUS-JP, Ador 3D Allure, Theramedic Flex, Kanji 4D Shogun Duo, Relaxe Shiatsu, Relax On Chair MK-V Plus. No action needed.

*Data-quality footnote:* syncamassagechair.com's JSON-LD emits a non-standard `http://schema.org/instock`/`outstock` value (lowercase, missing "Of") alongside the standard `InStock`/`OutOfStock` enum on the same page. Harmless here since a standard `InStock` value was always present too, but flagging in case a stricter future scraper starts trusting only the malformed values.

## Chairs already correctly marked OOS (2) — confirmed, no action needed

| Chair | Retailer | JSON-LD result |
|---|---|---|
| Titan 3D Prestige | titanchair.com | Single offer, `OutOfStock` — matches chairs.ts `inStock: false` |
| Relax On Chair RIO | relaxonchair.com | Single offer, `OutOfStock` — matches chairs.ts `inStock: false` |

## BROKEN_LINK — massagechairwarehouse.com (26)

| Chair | priceMin | Original URL |
|---|---:|---|
| Ceragem M10 | $12999 | massagechairwarehouse.com/products/ceragem-m10-massage-chair |
| Ergotec ET-180 Pluto | $1999 | massagechairwarehouse.com/products/ergotec-et-180-pluto-massage-chair |
| JPMedics Kumo 4D | $10999 | massagechairwarehouse.com/products/jpmedics-kumo-4d-massage-chair |
| Koyo 303TS | $7999 | massagechairwarehouse.com/products/koyo-303ts-massage-chair |
| Kyota Yugana M780 4D | $7999 | massagechairwarehouse.com/products/kyota-yugana-m780-4d-massage-chair |
| Luraco i9 Max Plus | $11990 | massagechairwarehouse.com/products/luraco-i9-max-plus-massage-chair |
| Luraco Theater Sofy | $3490 | massagechairwarehouse.com/products/luraco-theater-sofy-massage-chair |
| Medical Breakthrough 5 | $2249 | massagechairwarehouse.com/products/medical-breakthrough-5-massage-chair |
| Medical Breakthrough 6 | $4249 | massagechairwarehouse.com/products/medical-breakthrough-6 |
| Medical Breakthrough 6 Plus | $5499 | massagechairwarehouse.com/products/medical-breakthrough-6-plus-massage-chair |
| Medical Breakthrough 7 | $6249 | massagechairwarehouse.com/products/medical-breakthrough-7-massage-chair |
| Medical Breakthrough 7 Plus | $8399 | massagechairwarehouse.com/products/medical-breakthrough-7-plus |
| Medical Breakthrough 8 | $8249 | massagechairwarehouse.com/products/medical-breakthrough-8-massage-chair |
| Medical Breakthrough 8 Plus | $10899 | massagechairwarehouse.com/products/medical-breakthrough-8-plus-open-feet-massage-chair |
| Medical Breakthrough 9 | $10399 | massagechairwarehouse.com/products/medical-breakthrough-9-massage-chair |
| Medical Breakthrough 9 Plus | $14649 | massagechairwarehouse.com/products/medical-breakthrough-9-plus-massage-chair |
| Medical Breakthrough X | $12499 | massagechairwarehouse.com/products/medical-breakthrough-x-massage-chair |
| Positive Posture Brio Plus | $7999 | massagechairwarehouse.com/products/positive-posture-brio-plus-massage-chair |
| Positive Posture Brio Sport | $8999 | massagechairwarehouse.com/products/positive-posture-brio-sport-massage-chair |
| Positive Posture Solara | $2499 | massagechairwarehouse.com/products/positive-posture-solara-massage-chair |
| Sharper Image Relieve 3D | $4499 | massagechairwarehouse.com/products/sharper-image-relieve-3d-massage-chair |
| Sharper Image Revival | $3999 | massagechairwarehouse.com/products/sharper-image-revival-zero-gravity-massage-chair |
| Svago Lite 2 | $1499 | massagechairwarehouse.com/products/svago-lite-2-zero-gravity-recliner |
| Svago Newton | $3199 | massagechairwarehouse.com/products/svago-newton-zero-gravity-recliner |
| Svago ZGR | $2199 | massagechairwarehouse.com/products/svago-zgr-zero-gravity-recliner |
| Titan Pro-Vigor 4D | $5999 | massagechairwarehouse.com/products/titan-pro-vigor-4d-massage-chair |

## Replacement candidates + ready-to-merge diff (28 chairs: 26 BROKEN_LINK + 2 confirmed OOS)

Searched the approved retailer list (massagechairstore.com, osakimassagechair.com, massagechairheaven.com, recovathlete.com, syncamassagechair.com, titanchair.com, humantouch.com, kahunachair.com, massagechairs.com) for the same brand+model. Two confidence tiers:

- **VERIFIED** — fetched directly, JSON-LD availability + price confirmed live in this run.
- **UNVERIFIED** — found via search only; the candidate domain was one of the 11 network-policy-blocked hosts above, so price/stock could not be independently confirmed this run. Re-check before merging.

```diff
# lib/chairs.ts — proposed affiliateUrl/affiliateRetailer/priceMin updates
# ── VERIFIED (fetched + JSON-LD confirmed live) ──────────────────────────────

  luraco-theater-sofy:
-   affiliateUrl: 'https://massagechairwarehouse.com/products/luraco-theater-sofy-massage-chair'
-   affiliateRetailer: 'massagechairwarehouse.com'
+   affiliateUrl: 'https://recovathlete.com/products/luraco-theater-sofy-massage-chair'
+   affiliateRetailer: 'recovathlete.com'
    # price unchanged: $3490 exact match

  luraco-i9-max-plus:
-   affiliateUrl: 'https://massagechairwarehouse.com/products/luraco-i9-max-plus-massage-chair'
-   affiliateRetailer: 'massagechairwarehouse.com'
+   affiliateUrl: 'https://recovathlete.com/products/luraco-i9-custom-medical-massage-chair'
+   affiliateRetailer: 'recovathlete.com'
-   priceMin: 11990
+   priceMin: 13490   # live price +12.5% vs old catalog value — confirm this is still the "Plus" (non-Special-Edition) trim before merging price
    # note: recovathlete also carries "i9 MAX Plus Special Edition" at $14,990 — a different SKU, don't confuse the two

  medical-breakthrough-5:
-   affiliateUrl: 'https://massagechairwarehouse.com/products/medical-breakthrough-5-massage-chair'
-   affiliateRetailer: 'massagechairwarehouse.com'
+   affiliateUrl: 'https://recovathlete.com/products/medical-breakthrough-5-massage-chair'
+   affiliateRetailer: 'recovathlete.com'
    # price unchanged: $2249 exact match, InStock

  medical-breakthrough-6:
-   affiliateUrl: 'https://massagechairwarehouse.com/products/medical-breakthrough-6'
-   affiliateRetailer: 'massagechairwarehouse.com'
+   affiliateUrl: 'https://recovathlete.com/products/medical-breakthrough-6'
+   affiliateRetailer: 'recovathlete.com'
    # price unchanged: $4249 exact match, InStock

  medical-breakthrough-6-plus:
-   affiliateUrl: 'https://massagechairwarehouse.com/products/medical-breakthrough-6-plus-massage-chair'
-   affiliateRetailer: 'massagechairwarehouse.com'
+   affiliateUrl: 'https://recovathlete.com/products/medical-breakthrough-6-plus-massage-chair'
+   affiliateRetailer: 'recovathlete.com'
-   priceMin: 5499
+   priceMin: 6249   # live price +13.6% vs old catalog value, InStock

  medical-breakthrough-7:
-   affiliateUrl: 'https://massagechairwarehouse.com/products/medical-breakthrough-7-massage-chair'
-   affiliateRetailer: 'massagechairwarehouse.com'
+   affiliateUrl: 'https://recovathlete.com/products/medical-breakthrough-7-massage-chair'
+   affiliateRetailer: 'recovathlete.com'
    # price unchanged: $6249 exact match, InStock

  medical-breakthrough-8:
-   affiliateUrl: 'https://massagechairwarehouse.com/products/medical-breakthrough-8-massage-chair'
-   affiliateRetailer: 'massagechairwarehouse.com'
+   affiliateUrl: 'https://recovathlete.com/products/medical-breakthrough-8-massage-chair'
+   affiliateRetailer: 'recovathlete.com'
    # price unchanged: $8249 exact match, InStock

  medical-breakthrough-9:
-   affiliateUrl: 'https://massagechairwarehouse.com/products/medical-breakthrough-9-massage-chair'
-   affiliateRetailer: 'massagechairwarehouse.com'
+   affiliateUrl: 'https://recovathlete.com/products/medical-breakthrough-9-massage-chair'
+   affiliateRetailer: 'recovathlete.com'
-   priceMin: 10399
+   priceMin: 10499   # live price +1.0%, InStock — within tolerance, optional

  medical-breakthrough-x:
-   affiliateUrl: 'https://massagechairwarehouse.com/products/medical-breakthrough-x-massage-chair'
-   affiliateRetailer: 'massagechairwarehouse.com'
+   affiliateUrl: 'https://recovathlete.com/products/medical-breakthrough-x-massage-chair'
+   affiliateRetailer: 'recovathlete.com'
-   priceMin: 12499
+   priceMin: 10249   # live price -18% vs old catalog value — verify this isn't a mis-scan before merging, unusually large drop

# ── UNVERIFIED (search-found candidate on a network-policy-blocked host; confirm manually) ──

  kyota-yugana-m780:
+   candidate: 'https://massagechairstore.com/kyota-yugana-m780-4d-massage-chair/'  (sale price seen: $7999, matches priceMin)
    # also seen at massagechairs.com and massagechairheaven.com — pick one after manual confirmation

  jpmedics-kumo-4d:
+   candidate: 'https://massagechairs.com/products/jpmedics-kumo-massage-chair'  (price seen: $10,999.99, ~matches priceMin $10999)

  ceragem-m10:
+   candidate: 'https://www.massagechairheaven.com/products/ceragem-m10'  (no live price captured this run)

  koyo-303ts:
+   candidate: 'https://www.massagechairs.com/products/koyo-303ts-massage-chair'  (price seen: $8999, priceMin is $7999 — check before merging)

  positive-posture-brio-plus:
+   candidate: 'https://www.massagechairs.com/products/positive-posture-brio-massage-chair'  (price seen: $7999, exact match)

  positive-posture-brio-sport:
+   candidate: 'https://www.massagechairs.com/products/positive-posture-brio-sport-massage-chair'  (price range seen: $7999-9999, priceMin $8999 within range)

  positive-posture-solara:
+   candidate: 'https://www.massagechairheaven.com/products/solara'  (sale price seen: $2499, exact match)

  sharper-image-relieve-3d:
+   candidate: 'https://www.massagechairheaven.com/products/sharper-image-relieve-3d-massage-chair'  (no live price captured this run)
    # tried recovathlete.com/products/sharper-image-relieve-3d-massage-chair — 200s but silently redirects to /collections/massage-chairs (slug doesn't exist there)

  sharper-image-revival:
+   candidate: 'https://www.massagechairheaven.com/products/sharper-image-revival'  (price seen elsewhere: $3999, exact match)
    # also at massagechairs.com/products/infinity-revival
    # tried recovathlete.com equivalent slug — same silent-redirect issue as above

# ── NO CANDIDATE FOUND on the approved retailer list ──

  ergotec-et-180-pluto      # not carried by any approved retailer found in search
  svago-lite-2              # not carried by any approved retailer found in search (also flagged separately by catalog-health-audit.py's Amazon watchlist: dead ASIN B0CN1S3XV1)
  svago-zgr                 # not carried by any approved retailer found in search
  svago-newton              # only blog/editorial mentions found, no direct product URL on an approved retailer
  titan-pro-vigor-4d        # candidate exists on titanchair.com/products/titan-vigor-4d but is ITSELF OutOfStock ($2999-3274) — no live replacement available anywhere on the approved list

# ── OOS chairs (not BROKEN_LINK, already correctly marked) — replacement search result ──

  titan-3d-prestige         # checked osakimassagechair.com (current retailer, OOS) + titanchair.com (OOS) + massagechairheaven.com ("Sold out", $3999) — OOS everywhere on the approved list, no live replacement
  relaxonchair-rio          # no candidate found on the approved retailer list at all — appears to be a RelaxOnChair-exclusive model
```

## Summary for action

1. **Urgent, catalog-wide:** `massagechairwarehouse.com` is dead as an affiliate retailer (301s everything to an unrelated gameroom-equipment site). All 26 chairs pointing at it are showing a broken/wrong-brand link to buyers *today*. Nine of the 26 have a **VERIFIED** in-stock replacement on recovathlete.com ready to merge from the diff above; the rest have unverified candidates that need a quick manual price/stock check before merging.
2. Re-run this audit (or a manual spot-check) against the 49 chairs blocked by this run's network policy — genuinely unchecked this week, not confirmed healthy.
3. 8 chairs are bot-blocked by their own retailers (massagechairstore.com ×6, nouhaus.com, amazon.com) — likely fine, just couldn't be scraped; no action unless this persists next week.
4. No price mismatches found among the 24 fully-verified live chairs.
5. titan-3d-prestige and relaxonchair-rio remain correctly marked OOS; no in-stock replacement exists anywhere on the approved retailer list for either.
