# MassageChairFinder Weekly Catalog Audit — 2026-07-14

## Coverage

- **PREPASS=109, CHECKED=109, MISSING=0** — every chair emitted by `catalog-audit-prepass.py` (active, `mcfActive` or `goodwinActive`, with an `affiliateUrl`) was visited in Step 2. 26 chairs were correctly excluded as `active: false` (discontinued). Coverage requirement met; this report was not blocked.

## Structural Health (Step 1)

`python3 scripts/catalog-health-audit.py` exited **0** — no errors.

**Warnings (2):**
- `kyota-genki-m380` holds Amazon ASIN `B08T4BXGP3` with no `amazonUrl` set (listing was dead or version-mismatched when wired 2026-06-07). Verify the listing; if live and correct, set `amazonUrl`; if gone, drop the ASIN.
- `bodyfriend-falcon-xd`: brand search showed zero Bodyfriend listings on Amazon as of 2026-06-07; verify ASIN `B0D97TGBYS` is still live.

No `/best/*` pick or `/compare/*` page references an inactive, OOS, or `NOT_IN_MCF` chair, and no compare-index slug is missing its directory.

## Affiliate URL Probe (Step 2)

**This week's automated probe was almost entirely blocked at the infrastructure layer, not the catalog layer.** Of 109 targets, only **1** returned readable page content; the other **108** could not be fetched at all.

### Root cause (confirmed, not inferred)

Batch 9's agent checked `$HTTPS_PROXY/__agentproxy/status` directly and found the session's outbound proxy is **rejecting the CONNECT tunnel** to most affiliate domains outright ("gateway answered 403 to CONNECT — policy denial or upstream failure"), before any request ever reaches the retailer:
- Blocked at the proxy/CONNECT layer: `massagechairheaven.com`, `primemassagechairs.com`, `wishrockrelaxation.com`, `massagechairwarehouse.com`, `nouhaus.com`, `amazon.com` (and by pattern, the same domains across all other batches).
- Reachable at the network layer but blocked by the origin's own bot defense: `massagechairstore.com` and `massagechairplanet.com` returned genuine Cloudflare "Attention Required!" challenge pages (confirmed via direct `curl` with a standard browser UA — same 403 result, ruling out a WebFetch-specific problem).
- Only `syncamassagechair.com` was fully reachable this run (1 successful probe out of ~15 attempts on that domain — the rest hit rate-limit 429s).

Per the audit's own anti-false-positive rule, **no chair was flagged OOS or BROKEN_LINK based on an unreadable page** — every blocked fetch is reported as `PROBE_BLOCKED` / `STOCK_UNKNOWN` rather than guessed from a 403/429 response, a redirect target, or HTML text.

### Results summary

| Outcome | Count |
|---|---|
| LIVE, in stock, price confirmed | 1 |
| PROBE_BLOCKED (network/proxy or origin bot-wall — status unknown) | 108 |
| BROKEN_LINK | 0 |
| OOS (confirmed via JSON-LD) | 0 |
| PRICE_MISMATCH | 0 |

### The one successful probe

`fujiiryoki-cyber-relax-ai-executive` (syncamassagechair.com) — HTTP 200, JSON-LD confirmed:
```json
"offers": [{
  "@type": "Offer", "price": "12999.99", "priceCurrency": "USD",
  "availability": "https://schema.org/InStock",
  "sku": "FMR0099-08NA", "name": "Onyx"
}]
```
`priceMin` on file: $12,999 vs. live $12,999.99 — 0.008% delta, well under the 5% threshold. No flag.

### PROBE_BLOCKED — full list (108 chairs, STOCK_UNKNOWN, no price data, no flags other than PROBE_BLOCKED)

None of the chairs below should have their `inStock`, `active`, `mcfActive`, or `goodwinActive` fields changed based on this run — the probe could not confirm or refute their status.

| id | retailer | HTTP |
|---|---|---|
| osaki-os-champ | osakimassagechair.com | 429 |
| osaki-os-pro-yamato | massagechairs.com | 403 |
| osaki-os-pro-admiral-ii | massagechairs.com | 403 |
| osaki-os-pro-maestro-le | osakimassagechair.com | 429 |
| osaki-os-pro-4d-duomax | osakimassagechair.com | 429 |
| infinity-dynasty-4d | massagechairstore.com | 403 |
| infinity-celebrity | massagechairplanet.com | 403 |
| infinity-genesis-max | massagechairstore.com | 403 |
| infinity-imperial-syner-d | massagechairstore.com | 403 |
| infinity-circadian-4d-dualflex | massagechairstore.com | 403 |
| human-touch-laevo-zg | humantouch.com | 403 |
| human-touch-super-novo-3 | humantouch.com | 403 |
| luraco-i9-max-plus | massagechairwarehouse.com | 429 |
| luraco-theater-sofy | massagechairwarehouse.com | 429 |
| daiwa-legacy-4 | massagechairheaven.com | 403 |
| daiwa-black-panther-supreme-hybrid | massagechairheaven.com | 403 |
| daiwa-supreme-hybrid | massagechairheaven.com | 403 |
| daiwa-pegasus-hybrid | massagechairheaven.com | 403 |
| daiwa-hubble-plus-4d | massagechairheaven.com | 403 |
| daiwa-pegasus-2-smart | massagechairheaven.com | 403 |
| daiwa-hubble-3d | massagechairheaven.com | 403(gateway) |
| daiwa-relax-2-zero-3d | massagechairheaven.com | 403 |
| daiwa-majesty-2d | massagechairheaven.com | 403 |
| kyota-genki-m380 | massagechairstore.com | 403 |
| kyota-yugana-m780 | massagechairwarehouse.com | 429 |
| kyota-konbi-m728-dualpro-4d | massagechairstore.com | 403 |
| amamedics-hilux-4d | osakimassagechair.com | 429 |
| amamedics-renew-3d | clearancechair.com | 403 |
| jpmedics-kumo-4d | massagechairwarehouse.com | 429 |
| jpmedics-kaze-duo | massagechairplanet.com | 403 |
| panasonic-mak1 | massagechairs.com | 403 |
| panasonic-maf1 | primemassagechairs.com | 403(gateway) |
| titan-3d-prestige | titanchair.com | 429 |
| titan-pro-vigor-4d | massagechairwarehouse.com | 429 |
| synca-wellness-circ | syncamassagechair.com | 429 |
| synca-wellness-circ-plus | syncamassagechair.com | 429 |
| synca-wellness-circ-3 | syncamassagechair.com | 429 |
| synca-wellness-kurodo | syncamassagechair.com | 429 |
| synca-wellness-jp3000 | syncamassagechair.com | 429 |
| fujiiryoki-cyber-relax-ai | syncamassagechair.com | 429 |
| fujiiryoki-calm-plus | syncamassagechair.com | 429 |
| fujiiryoki-cyber-relax-elite | syncamassagechair.com | 429 |
| fujiiryoki-cyber-relax-pro | syncamassagechair.com | 429 |
| inner-balance-jin | syncamassagechair.com | 429 |
| inner-balance-jin-2 | syncamassagechair.com | 429 |
| dcore-d-core-2 | syncamassagechair.com | 429 |
| dcore-cirrus-jp | syncamassagechair.com | 429 |
| dcore-stratus-jp | syncamassagechair.com | 429 |
| kahuna-dios-6800 | wishrockrelaxation.com | 403 |
| kahuna-dios-1288 | wishrockrelaxation.com | 403 |
| kahuna-dios-flexa | wishrockrelaxation.com | 403 |
| kahuna-hm-kappa | wishrockrelaxation.com | 403 |
| kahuna-em-8500 | wishrockrelaxation.com | 403(gateway) |
| kahuna-dios-7300 | wishrockrelaxation.com | 403 |
| kahuna-sm-7300s | wishrockrelaxation.com | 403 |
| kahuna-hm-078 | wishrockrelaxation.com | 403 |
| kahuna-hm-5000 | wishrockrelaxation.com | 403 |
| ador-3d-allure | osakimassagechair.com | 429/403 |
| theramedic-flex | osakimassagechair.com | 429 |
| kanji-4d-shogun-duo | osakimassagechair.com | 429 |
| ogawa-og6300 | wishrockrelaxation.com | 403 |
| ogawa-og8901 | wishrockrelaxation.com | 403 |
| ogawa-og6400 | wishrockrelaxation.com | 403 |
| ogawa-og8801 | wishrockrelaxation.com | 403(gateway) |
| ogawa-og8900 | wishrockrelaxation.com | 403 |
| relaxe-shiatsu | relaxe.co | 429 |
| ohco-m8-neo-le | johnsonfitness.com | 403 |
| ohco-m8-neo | johnsonfitness.com | 403 |
| relaxonchair-rio | relaxonchair.com | 429 |
| relaxonchair-jasper | relaxonchair.com | 403 |
| relaxonchair-mk-v-plus | relaxonchair.com | 403/429 |
| relaxonchair-yukon-4d | relaxonchair.com | 403 |
| ceragem-m10 | massagechairwarehouse.com | 403 |
| ergotec-et-180-pluto | massagechairwarehouse.com | 403 |
| koyo-303ts | massagechairwarehouse.com | 403 |
| medical-breakthrough-5 | massagechairwarehouse.com | 403(gateway) |
| medical-breakthrough-6 | massagechairwarehouse.com | 403 |
| medical-breakthrough-6-plus | massagechairwarehouse.com | 403 |
| medical-breakthrough-7 | massagechairwarehouse.com | 403 |
| medical-breakthrough-7-plus | massagechairwarehouse.com | 403 |
| medical-breakthrough-8 | massagechairwarehouse.com | 403 |
| medical-breakthrough-8-plus | massagechairwarehouse.com | 403 |
| medical-breakthrough-9 | massagechairwarehouse.com | 403 |
| medical-breakthrough-9-plus | massagechairwarehouse.com | 403 |
| medical-breakthrough-x | massagechairwarehouse.com | 403 |
| positive-posture-brio-plus | massagechairwarehouse.com | 403 |
| positive-posture-brio-sport | massagechairwarehouse.com | 403(gateway) |
| positive-posture-solara | massagechairwarehouse.com | 403 |
| sharper-image-relieve-3d | massagechairwarehouse.com | 403 |
| sharper-image-revival | massagechairwarehouse.com | 403 |
| svago-lite-2 | massagechairwarehouse.com | 403 |
| svago-zgr | massagechairwarehouse.com | 403 |
| svago-newton | massagechairwarehouse.com | 403 |
| rockertech-bliss | massagechairheaven.com | 403 |
| rockertech-sensation-4d | massagechairheaven.com | 403 |
| nouhaus-new-classic | nouhaus.com | 403 |
| nouhaus-aurora | nouhaus.com | 403(gateway) |
| nouhaus-noucampo | nouhaus.com | 403 |
| nouhaus-luna | nouhaus.com | 403 |
| nouhaus-orbit | nouhaus.com | 403 |
| relx-20-mode | amazon.com | 403 |
| culanta-sl-track | amazon.com | 403 |
| tlife-160-zg | amazon.com | 403 |
| healthrelife-4d-15-mode | amazon.com | 403 |
| ktentito-g6 | amazon.com | 403 |
| mythia-a303c | amazon.com | 403 |
| healthrelife-4d-20-mode | amazon.com | 403 |
| casinta-4d | amazon.com | 403(gateway) |

## Replacement candidate search (Step 2 retailer fallback)

**Not applicable this run.** The retailer-replacement search only triggers on confirmed `OOS` or `BROKEN_LINK` chairs, and zero were confirmed — every non-live result was `PROBE_BLOCKED`, meaning the true state of the link is unknown, not broken. Searching for and proposing replacement retailers for a link that may well still be fine would risk generating false-positive diffs.

## Recommendations

1. **Do not treat this week's `PROBE_BLOCKED` list as a stock or link-health signal.** No `chairs.ts` fields should change based on this run.
2. **Fix the probe path before next week's run.** The session's outbound proxy is actively rejecting CONNECT to the majority of affiliate domains (`massagechairheaven.com`, `massagechairwarehouse.com`, `wishrockrelaxation.com`, `nouhaus.com`, `amazon.com`, `primemassagechairs.com`, and others show `policy denial` at the gateway), and the two domains that do reach origin (`massagechairstore.com`, `massagechairplanet.com`) are stopped by Cloudflare's bot challenge. A headless-browser fetch path or an allowlisted egress IP/proxy exception for these specific retailer domains is needed to get real signal.
3. Separately from the probe: resolve the two Structural Health Amazon-watchlist warnings above (`kyota-genki-m380`, `bodyfriend-falcon-xd`) via manual spot-check, since they don't depend on the blocked probe path.
