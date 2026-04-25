/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: '**.strapi.io' },
      { protocol: 'https', hostname: '**.up.railway.app' },
    ],
  },
}

module.exports = nextConfig
