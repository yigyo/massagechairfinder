# MassageChairFinder Weekly Catalog Audit — 2026-07-21

## Coverage

- Prepass (`scripts/catalog-audit-prepass.py`) emitted **109 audit targets** out of 135 catalog records (26 skipped as `discontinued`).
- **109 / 109 targets probed.** Coverage requirement met — no chairs were missed.

## Structural Health (Step 1)

`scripts/catalog-health-audit.py` exit code: **0 (OK, warnings only)**

**Warnings (2):**
1. `kyota-genki-m380` holds Amazon ASIN `B08T4BXGP3` with no `amazonUrl` set (listing dead or version mismatch when wired 2026-06-07). Needs manual verification — if live and correct, set `amazonUrl`; if gone, drop the ASIN.
2. `bodyfriend-falcon-xd`: brand search showed zero Bodyfriend listings on Amazon as of 2026-06-07; verify ASIN `B0D97TGBYS` is still live. (Note: this chair is in the `discontinued`/skip list for Step 2, so it was not re-probed this week.)

No structural errors.

## ⚠️ Environment limitation affecting this run

This week's audit ran in a sandboxed session whose outbound network egress is allow-listed per-domain by an external proxy, independent of the target sites themselves. **7 of the 17 affiliate domains in the catalog are not present on that allow-list** and returned a hard `403` on the TCP `CONNECT` step — before any request ever reached the retailer. This is confirmed by the proxy's own status log (`connect_rejected: gateway answered 403 to CONNECT`) and by control requests to unrelated domains (e.g. `example.com`) failing identically. It is **not** evidence of anything wrong with those sites.

Blocked domains (all URL forms tried — `www.`, bare, and redirects):
`massagechairheaven.com`, `massagechairs.com`, `massagechairplanet.com`, `humantouch.com`, `nouhaus.com`, `wishrockrelaxation.com`, `amazon.com`, `clearancechair.com`, `primemassagechairs.com`

One domain, `massagechairwarehouse.com`, was blocked only on its `www.` form; the bare `https://massagechairwarehouse.com/...` form worked, so those 21 targets were still fully verified via the working host. `relaxonchair.com` had the same quirk and was also recovered.

**Net effect: 55 of 109 targets (50%) could not be checked this week** — 47 blocked at the network layer, plus 8 more that reached the actual site but hit a Cloudflare bot-detection challenge page (a genuine site-side block, not a proxy issue). These are listed as `PROBE_BLOCKED` below with no stock/price guessed, per the audit's strict no-inference rule. **Recommend re-running this audit from an environment with broader egress access, or allow-listing these 9 domains, to restore full coverage.**

## Step 2 — Affiliate URL Probe Results

### Flags requiring action

| ID | Name | Retailer | Issue | Live price | Catalog priceMin | Notes |
|---|---|---|---|---|---|---|
| relaxe-shiatsu | Relaxe Shiatsu | relaxe.co | PRICE_MISMATCH | $2,799.00 | $2,999 | −6.7%, live price is lower than catalog |
| svago-newton | Svago Newton | massagechairwarehouse.com | PRICE_MISMATCH | $3,499.99 | $3,199 | +9.4%, live price is higher than catalog |
| relaxonchair-rio | Relax On Chair RIO | relaxonchair.com | OOS | $999.00 | $999 | JSON-LD `availability: OutOfStock`, single-variant product. Matches catalog's existing `inStockCurrent: false` — not a new regression. Replacement search: found `massagechairwarehouse.com/products/relaxonchair-rio-massage-chair` (~$1,499) but that listing is **also** OutOfStock — no live in-stock replacement found on the approved retailer list. |

No `BROKEN_LINK` and no confirmed `OOS` beyond the one above were found among the 54 targets that could be reached.

### LIVE — no issues (53 targets)

All returned HTTP 200, JSON-LD `availability` of `InStock` (or at least one in-stock variant), and price within 5% of catalog `priceMin`.

- **osakimassagechair.com** (7): osaki-os-champ, osaki-os-pro-maestro-le, osaki-os-pro-4d-duomax, ador-3d-allure, theramedic-flex, kanji-4d-shogun-duo, amamedics-hilux-4d
- **massagechairwarehouse.com**, bare-domain (21): luraco-i9-max-plus, luraco-theater-sofy, titan-pro-vigor-4d, jpmedics-kumo-4d, kyota-yugana-m780, ceragem-m10, ergotec-et-180-pluto, koyo-303ts, medical-breakthrough-5, medical-breakthrough-6, medical-breakthrough-6-plus, medical-breakthrough-7, medical-breakthrough-7-plus, medical-breakthrough-8, medical-breakthrough-8-plus, medical-breakthrough-9, medical-breakthrough-9-plus, medical-breakthrough-x, positive-posture-brio-plus, positive-posture-brio-sport, positive-posture-solara
- **massagechairwarehouse.com**, additional (4, recovered via bare-domain workaround after `www.` was blocked): sharper-image-relieve-3d, sharper-image-revival, svago-lite-2, svago-zgr
- **syncamassagechair.com** (15): synca-wellness-circ, synca-wellness-circ-plus (1 of 3 variants OOS, 2 InStock), synca-wellness-circ-3 (1 of 3 variants OOS, 2 InStock), synca-wellness-kurodo, inner-balance-jin, inner-balance-jin-2, synca-wellness-jp3000, fujiiryoki-cyber-relax-ai, fujiiryoki-cyber-relax-ai-executive, fujiiryoki-calm-plus, fujiiryoki-cyber-relax-elite, fujiiryoki-cyber-relax-pro (2 of 5 variants OOS, 3 InStock), dcore-d-core-2, dcore-cirrus-jp, dcore-stratus-jp
- **titanchair.com** (1): titan-3d-prestige
- **relaxonchair.com**, bare-domain workaround (3): relaxonchair-jasper, relaxonchair-mk-v-plus, relaxonchair-yukon-4d

### PROBE_BLOCKED — site-side bot detection (8 targets, genuine)

Real HTTP 403 from the retailer's own server with a Cloudflare "Attention Required" / "Just a moment" challenge page in the body (cf-ray header present) — confirmed not a proxy issue.

| ID | Name | Retailer |
|---|---|---|
| infinity-dynasty-4d | Infinity Dynasty 4D | massagechairstore.com |
| infinity-genesis-max | Infinity Genesis Max 4D | massagechairstore.com |
| infinity-imperial-syner-d | Infinity Imperial Syner-D | massagechairstore.com |
| infinity-circadian-4d-dualflex | Infinity Circadian 4D DualFlex | massagechairstore.com |
| kyota-genki-m380 | Kyota Genki M380 | massagechairstore.com |
| kyota-konbi-m728-dualpro-4d | Kyota Konbi M728 DualPro 4D | massagechairstore.com |
| ohco-m8-neo-le | OHCO M.8 NEO LE | johnsonfitness.com |
| ohco-m8-neo | OHCO M.8 NEO | johnsonfitness.com |

Recommend manually spot-checking these in a real browser — massagechairstore.com blocking every one of its 6 targets this run may indicate a stricter bot policy than before, worth a human check.

### PROBE_BLOCKED — network/environment limitation (47 targets, not a site finding)

Listed for completeness so the "N targets checked" count is auditable. **These need to be re-probed once egress access is available** — true stock/price/link status is unverified, not assumed OK.

| Retailer (blocked) | Count | IDs |
|---|---|---|
| massagechairheaven.com | 11 | daiwa-legacy-4, daiwa-black-panther-supreme-hybrid, daiwa-supreme-hybrid, daiwa-pegasus-hybrid, daiwa-hubble-plus-4d, daiwa-pegasus-2-smart, daiwa-hubble-3d, daiwa-relax-2-zero-3d, daiwa-majesty-2d, rockertech-bliss, rockertech-sensation-4d |
| wishrockrelaxation.com | 14 | kahuna-dios-6800, kahuna-dios-1288, kahuna-dios-flexa, kahuna-hm-kappa, kahuna-em-8500, kahuna-dios-7300, kahuna-sm-7300s, kahuna-hm-078, kahuna-hm-5000, ogawa-og6300, ogawa-og8901, ogawa-og6400, ogawa-og8801, ogawa-og8900 |
| amazon.com | 8 | relx-20-mode, culanta-sl-track, tlife-160-zg, healthrelife-4d-15-mode, ktentito-g6, mythia-a303c, healthrelife-4d-20-mode, casinta-4d |
| nouhaus.com | 5 | nouhaus-new-classic, nouhaus-aurora, nouhaus-noucampo, nouhaus-luna, nouhaus-orbit |
| massagechairs.com | 3 | osaki-os-pro-yamato, osaki-os-pro-admiral-ii, panasonic-mak1 |
| massagechairplanet.com | 2 | infinity-celebrity, jpmedics-kaze-duo |
| humantouch.com | 2 | human-touch-laevo-zg, human-touch-super-novo-3 |
| clearancechair.com | 1 | amamedics-renew-3d |
| primemassagechairs.com | 1 | panasonic-maf1 |

## Summary

- **Structural health:** OK, 2 pre-existing warnings (Amazon ASIN watchlist), no errors.
- **109 / 109 targets visited** (coverage requirement satisfied).
- **53 LIVE**, 2 of which are flagged `PRICE_MISMATCH` (relaxe-shiatsu −6.7%, svago-newton +9.4%).
- **1 confirmed OOS** (relaxonchair-rio) — consistent with catalog's existing `inStockCurrent: false`; no viable in-stock replacement found on the approved retailer list.
- **0 BROKEN_LINK.**
- **55 PROBE_BLOCKED**: 8 genuine site-side Cloudflare blocks (worth a manual spot-check, especially massagechairstore.com going 6-for-6 this run), 47 due to this session's network egress not allow-listing 9 of the 17 affiliate domains — needs a re-run with broader access to get real coverage on those chairs.
