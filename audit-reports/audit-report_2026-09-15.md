# Catalog Audit Report — 2026-09-15

## ⚠️ Headline: this run has severely limited coverage due to a network policy restriction in this session's environment

`scripts/catalog-audit-prepass.py` produced **116 targets** (N=116). All 116 were
visited (a fetch was attempted and a status was recorded for every single one —
zero targets were skipped or silently dropped). However, **83 of the 116 (72%)**
could not actually reach the retailer's server: this session's outbound network
policy rejected the connection at the proxy level (`CONNECT tunnel failed,
response 403`) before any HTTP request reached the site. This is **not** a
signal about the chair, the retailer, or stock — it is this audit session's own
egress restriction. It affected entire retailer domains wholesale, including
**gameroomempire.com (26 chairs)**, **wishrockrelaxation.com (14)**,
**massagechairheaven.com (11)**, **amazon.com (8)**, **nouhaus.com (5)**,
**cozzia.com (5)**, **massagechairs.com (4)**, plus smaller counts on
massagechairplanet.com, humantouch.com, johnsonfitness.com, zarifausa.com,
primemassagechairs.com, and massagechairsbuy.com (see full breakdown in
Appendix A).

**Coverage: PREPASS=116, CHECKED=116, MISSING=0** (every target visited and
classified), but only **33 of 116 (28%)** returned a real, actionable
liveness/stock/price signal this week. Recommend re-running this audit from a
session whose egress policy allow-lists these retailer hosts (note several
force a `www.` redirect that appears specifically blocked even where the bare
apex domain is reachable — see Appendix A) to restore full coverage.

None of this reflects newly-broken code or a catalog problem — it's an
infrastructure constraint on this particular audit run.

---

## Step 1 — Structural Health

`scripts/catalog-health-audit.py` exited **0** (no ERRORs). All `/best/*`
picks and `/compare/*` pages reference active, in-stock, MCF-active chairs
with matching EDITORIAL entries.

**Warnings (4)** — Amazon listing watchlist, informational only:
- `osaki-os-pro-admiral-ii` — holds ASIN B09HW3F2BB with no `amazonUrl` set (listing dead or version-mismatched when wired 2026-06-07). Verify listing; if live and correct, set `amazonUrl`; if gone, drop the ASIN.
- `kyota-genki-m380` — holds ASIN B08T4BXGP3 with no `amazonUrl` set. Same as above.
- `bodyfriend-falcon-xd` — brand search showed zero Bodyfriend listings on Amazon (2026-06-07); verify ASIN B0D97TGBYS still live.
- `relaxonchair-jasper` — holds ASIN B0D325QC32 with no `amazonUrl` set. Same as above.

(This audit run could not independently verify these Amazon ASINs — `amazon.com` was one of the ENV_BLOCKED hosts above.)

---

## Step 2 — Affiliate URL Probe

Fetched with a real Chrome User-Agent; stock read exclusively from JSON-LD
`availability` in `<script type="application/ld+json">` blocks (including
Shopify's `ProductGroup.hasVariant[].offers` shape, seen on
syncamassagechair.com). No text/CSS/translation-key inference was used.

### Results summary (of 116 targets)

| Status | Count |
|---|---|
| OK (live, in stock, price matches ±5%) | 26 |
| ENV_BLOCKED (this session's network policy — not a live signal) | 83 |
| PROBE_BLOCKED (real site-side bot block, HTTP 403) | 5 |
| OOS | 1 |
| BROKEN_LINK | 1 |
| STOCK_UNKNOWN | 0 |
| PRICE_MISMATCH | 0 |

### OOS — 1 chair

**`osaki-os-champ`** (Osaki) — https://osakimassagechair.com/products/osaki-os-champ
All 24 variant offers report `OutOfStock` in JSON-LD. Live price ($1,299 base) matches `chairs.ts` `priceMin` exactly.

*Replacement search (approved retailers reachable this run: titanchair.com, kahunachair.com, recovathlete.com — see Appendix B for why the rest couldn't be checked):*
Checked titanchair.com's catalog (`products.json`) — it carries the identical
`osaki-os-champ` SKU set (same SKUs `osaki-os-champ-0` … `osaki-os-champ-23`,
same prices), and **every variant is also `"available": false`** there — it
appears to be the same underlying Osaki inventory feed, not an independent
alternative. kahunachair.com (10 SKUs, Kahuna-brand only) and recovathlete.com
(sauna/cold-plunge products, not massage chairs) carry no Osaki listing.
**No live replacement found among the retailers this session could reach.**
Suggest re-checking massagechairheaven.com, massagechairs.com, or
gameroomempire.com once network access is restored — no diff proposed this
run since no candidate was found.

### BROKEN_LINK — 1 chair

**`theramedic-flex`** (Theramedic) — https://osakimassagechair.com/products/theramedic-flex → **HTTP 404** (confirmed, reproduced twice)

*Replacement search:* No Theramedic-branded product exists in titanchair.com's,
kahunachair.com's, or recovathlete.com's catalogs (checked via `products.json`
vendor field — titanchair.com carries only Ador, AmaMedic, Kanji, Osaki,
Titan). **No live replacement found among the retailers this session could
reach.** Suggest re-checking osakimassagechair.com's own site search /
massagechairheaven.com once reachable, in case the product moved to a new
slug rather than being discontinued.

### PROBE_BLOCKED — 5 chairs (real site-side 403, not this session's network policy)

All five are on **massagechairstore.com**, which returned a genuine HTTP 403
(the TCP/TLS connection succeeded and the site itself served the block page —
this is a live retailer-side bot defense, distinct from the ENV_BLOCKED cases
above):
- `infinity-dynasty-4d` — https://massagechairstore.com/infinity-dynasty-4d/
- `infinity-genesis-max` — https://massagechairstore.com/infinity-genesis-max/
- `infinity-circadian-4d-dualflex` — https://massagechairstore.com/infinity-circadian-4d-dualflex-massage-chair/
- `kyota-genki-m380` — https://massagechairstore.com/kyota-genki-m380-massage-chair/
- `kyota-konbi-m728-dualpro-4d` — https://massagechairstore.com/kyota-konbi-m728-dualpro-4d-massage-chair/

No replacement search performed (per spec, replacement search is for OOS/BROKEN_LINK, not PROBE_BLOCKED) — recommend a manual spot check, or a re-run from a residential/rotating egress IP, since massagechairstore.com's bot defense appears to key off this session's outbound IP/UA fingerprint rather than the affiliate link itself being dead.

### OK — 26 chairs (live, in stock, price within tolerance)

All 26 confirmed `InStock` via JSON-LD with live price within 0.1% of
`chairs.ts priceMin` (Shopify prices carry a `.99`/`.XX` cents suffix not
reflected in the catalog's whole-dollar `priceMin`, which is expected and not
a mismatch):

osaki-os-pro-maestro-le, osaki-os-pro-4d-duomax, amamedics-hilux-4d,
synca-wellness-circ, synca-wellness-circ-plus, synca-wellness-circ-3,
synca-wellness-kurodo, inner-balance-jin, inner-balance-jin-2,
synca-wellness-jp3000, fujiiryoki-cyber-relax-ai,
fujiiryoki-cyber-relax-ai-executive, fujiiryoki-calm-plus,
fujiiryoki-cyber-relax-elite, fujiiryoki-cyber-relax-pro, dcore-d-core-2,
dcore-cirrus-jp, dcore-stratus-jp, ador-3d-allure, kanji-4d-shogun-duo,
relaxe-shiatsu (InStock; live price not extractable from this page's JSON-LD —
worth a manual price check), relaxonchair-jasper, relaxonchair-mk-v-plus,
relaxonchair-yukon-4d, titan-zena-vending, titan-v03-vending.

(`relaxonchair-jasper` and `relaxonchair-yukon-4d` needed a retry on the bare
`relaxonchair.com` domain — the `www.` subdomain the catalog links to is
ENV_BLOCKED, but the site doesn't force a `www.` redirect, so the bare domain
serves the identical page. No such fallback existed for the other
ENV_BLOCKED retailers, whose sites redirect apex→`www.` and hit the block
either way.)

---

## Appendix A — ENV_BLOCKED detail (83 chairs, not checked this run)

Proxy status endpoint confirms these are `connect_rejected` / gateway 403 on
the CONNECT tunnel itself — the request never reached the retailer:

| Retailer | Count | Chair IDs |
|---|---|---|
| gameroomempire.com | 26 | luraco-i9-max-plus, luraco-theater-sofy, kyota-yugana-m780, jpmedics-kumo-4d, titan-pro-vigor-4d, ceragem-m10, ergotec-et-180-pluto, koyo-303ts, medical-breakthrough-5, medical-breakthrough-6, medical-breakthrough-6-plus, medical-breakthrough-7, medical-breakthrough-7-plus, medical-breakthrough-8, medical-breakthrough-8-plus, medical-breakthrough-9, medical-breakthrough-9-plus, medical-breakthrough-x, positive-posture-brio-plus, positive-posture-brio-sport, positive-posture-solara, sharper-image-relieve-3d, sharper-image-revival, svago-lite-2, svago-zgr, svago-newton |
| wishrockrelaxation.com | 14 | kahuna-dios-6800, kahuna-dios-1288, kahuna-dios-flexa, kahuna-hm-kappa, kahuna-em-8500, kahuna-dios-7300, kahuna-sm-7300s, kahuna-hm-078, kahuna-hm-5000, ogawa-og6300, ogawa-og8901, ogawa-og6400, ogawa-og8801, ogawa-og8900 |
| massagechairheaven.com | 11 | daiwa-legacy-4, daiwa-black-panther-supreme-hybrid, daiwa-supreme-hybrid, daiwa-pegasus-hybrid, daiwa-hubble-plus-4d, daiwa-pegasus-2-smart, daiwa-hubble-3d, daiwa-relax-2-zero-3d, daiwa-majesty-2d, rockertech-bliss, rockertech-sensation-4d |
| amazon.com | 8 | relx-20-mode, culanta-sl-track, tlife-160-zg, healthrelife-4d-15-mode, ktentito-g6, mythia-a303c, healthrelife-4d-20-mode, casinta-4d |
| nouhaus.com | 5 | nouhaus-new-classic, nouhaus-aurora, nouhaus-noucampo, nouhaus-luna, nouhaus-orbit |
| cozzia.com | 5 | cozzia-quantum, cozzia-qi-xe-pro, cozzia-qi-se-duo, cozzia-qi-xe-pro-duo, cozzia-qi-se |
| massagechairs.com | 4 | osaki-os-pro-yamato, osaki-os-pro-admiral-ii, panasonic-mak1, titan-3d-prestige |
| massagechairplanet.com | 2 | infinity-celebrity, jpmedics-kaze-duo |
| humantouch.com | 2 | human-touch-laevo-zg, human-touch-super-novo-3 |
| johnsonfitness.com | 2 | ohco-m8-neo-le, ohco-m8-neo |
| zarifausa.com | 2 | zarifa-z-dream, zarifa-z-smart-plus |
| primemassagechairs.com | 1 | panasonic-maf1 |
| massagechairsbuy.com | 1 | irest-a306 |

Note: for `wishrockrelaxation.com`, `massagechairheaven.com`,
`massagechairplanet.com`, `humantouch.com`, `johnsonfitness.com`,
`zarifausa.com`, `primemassagechairs.com`, and `massagechairs.com`, the bare
apex domain (no `www.`) is reachable through this session's proxy, but each
site force-redirects to its blocked `www.` host, so there was no way to reach
the actual product page. `gameroomempire.com` and `cozzia.com` are blocked
outright, `www.` or not. `amazon.com` (bare) is reachable but `www.amazon.com`
(the canonical product URL host) is blocked.

## Appendix B — Approved-retailer reachability for replacement search

Of the 10 approved retailers named in the audit spec, only these were
reachable this run: **osakimassagechair.com** (source, OOS/404 confirmed),
**syncamassagechair.com**, **titanchair.com**, **kahunachair.com**,
**recovathlete.com**. Blocked: massagechairwarehouse.com (now redirects to
the blocked gameroomempire.com), massagechairstore.com (site-level 403),
osakimassagechair.com (n/a, it's the source), massagechairheaven.com
(ENV_BLOCKED), humantouch.com (ENV_BLOCKED), kahunachair.com (reachable,
Kahuna-only catalog), massagechairs.com (ENV_BLOCKED).

---

## No chairs.ts changes proposed this run

No replacement candidates were found for `osaki-os-champ` or
`theramedic-flex` among the retailers this session could reach, so no diff
is included (per spec, replacements are recorded only when a candidate URL +
price is actually found). Recommend re-running Step 2 for the 83
ENV_BLOCKED chairs plus these two OOS/BROKEN_LINK searches once this
session's egress policy allows the blocked retailer hosts.
