# Audit FAILED - 2026-09-29

No audit report was written. Step 2 (affiliate URL probe) could not run.

**Cause:** the sandbox egress proxy rejects CONNECT to retailer hosts (HTTP 403, "organization policy"). curl and WebFetch both failed (EGRESS_BLOCKED on www.massagechairs.com; www.osakiusa.com and www.gameroomempire.com also 403).

**Coverage:** 0 of 129 targets checked. Every target was missed. The list is in scripts/audit-targets.json.

Targets by retailer:
- gameroomempire.com: 28
- syncamassagechair.com: 15
- wishrockrelaxation.com: 14
- osakiusa.com: 12
- massagechairheaven.com: 11
- amazon.com: 9
- osakimassagechair.com: 7
- massagechairstore.com: 5
- nouhaus.com: 5
- cozzia.com: 5
- massagechairs.com: 4
- relaxonchair.com: 3
- massagechairplanet.com: 2
- humantouch.com: 2
- johnsonfitness.com: 2
- zarifausa.com: 2
- primemassagechairs.com: 1
- relaxe.co: 1
- massagechairsbuy.com: 1

## Step 1 - Structural health (completed)
Exit 0, catalog OK with 3 warnings:
- /compare/osaki-os-pro-maestro-le-vs-ogawa-og8901 references OOS chair ogawa-og8901 (inStock=false)
- Amazon watchlist: bodyfriend-falcon-xd, verify ASIN B0D97TGBYS is still live
- Amazon watchlist: relaxonchair-jasper holds ASIN B0D325QC32 with no amazonUrl

## Fix
Allow outbound HTTPS to the retailer domains in this environment's network policy, then re-run.
