const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337'
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN || ''

async function fetchStrapi(path: string, options: RequestInit = {}) {
  const url = `${STRAPI_URL}/api${path}`
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    next: { revalidate: 3600 },
    ...options,
  })
  if (!res.ok) throw new Error(`Strapi error: ${res.status} ${url}`)
  return res.json()
}

export async function getChairs(params = '') {
  return fetchStrapi(`/chairs?populate=*&sort=name:asc${params ? '&' + params : ''}`)
}

export async function getChairBySlug(slug: string) {
  return fetchStrapi(`/chairs?filters[slug][$eq]=${slug}&populate=*`)
}

export async function getBrands() {
  return fetchStrapi('/brands?populate=*&sort=name:asc')
}

export async function getBrandBySlug(slug: string) {
  return fetchStrapi(`/brands?filters[slug][$eq]=${slug}&populate[chairs][populate]=*`)
}

export async function getArticles() {
  return fetchStrapi('/articles?populate=*&sort=publishedAt:desc')
}

export async function getArticleBySlug(slug: string) {
  return fetchStrapi(`/articles?filters[slug][$eq]=${slug}&populate=*`)
}

export async function getFeaturedChairs() {
  return fetchStrapi('/chairs?filters[launchPriority][$eq]=Launch&populate=*&pagination[limit]=6')
}
