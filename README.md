# MassageChairFinder.com

Next.js 14 frontend for massagechairfinder.com. Connects to a Strapi CMS backend.

## Setup

1. Copy `.env.local.example` to `.env.local` and fill in your Strapi URL and API token
2. `npm install`
3. `npm run dev`

## Deploy

- Frontend: Vercel (connect GitHub repo, set env vars in Vercel dashboard)
- Backend: Strapi on Railway

## Environment Variables

| Variable | Description |
|---|---|
| `STRAPI_URL` | Your Railway Strapi deployment URL |
| `STRAPI_API_TOKEN` | Strapi API token (Settings > API Tokens in Strapi admin) |

## URL Structure

| Route | Description |
|---|---|
| `/` | Homepage |
| `/chairs` | All chairs |
| `/chairs/[slug]` | Individual chair page |
| `/brands` | Brand index |
| `/brands/[slug]` | Brand detail |
| `/learn` | Buying guide index |
| `/learn/[slug]` | Article/guide page |
| `/best` | Use case categories |
| `/best/[category]` | Best chairs for a category |
| `/compare` | Chair comparison tool |
| `/finder` | Chair finder quiz |
| `/go/[chair]/[retailer]` | Affiliate redirect handler |
