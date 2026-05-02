/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      // Internal/CMS image sources
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: '**.strapi.io' },
      { protocol: 'https', hostname: '**.up.railway.app' },

      // Common third-party image CDNs used by wellness/furniture brands
      { protocol: 'https', hostname: '**.cloudfront.net' },
      { protocol: 'https', hostname: '**.imgix.net' },
      { protocol: 'https', hostname: '**.myshopify.com' },

      // Affiliate retailer domains -- add new entries here as affiliate relationships expand
      { protocol: 'https', hostname: 'wishrockrelaxation.com' },
      { protocol: 'https', hostname: '**.wishrockrelaxation.com' },
      { protocol: 'https', hostname: 'relaxe.co' },
      { protocol: 'https', hostname: '**.relaxe.co' },
      { protocol: 'https', hostname: 'kahunachair.com' },
      { protocol: 'https', hostname: '**.kahunachair.com' },
      { protocol: 'https', hostname: 'syncamassagechair.com' },
      { protocol: 'https', hostname: '**.syncamassagechair.com' },
      { protocol: 'https', hostname: 'osakimassagechair.com' },
      { protocol: 'https', hostname: '**.osakimassagechair.com' },
      { protocol: 'https', hostname: 'amamedics.com' },
      { protocol: 'https', hostname: '**.amamedics.com' },
      { protocol: 'https', hostname: 'jpmedics.com' },
      { protocol: 'https', hostname: '**.jpmedics.com' },
      { protocol: 'https', hostname: 'infinitymassagechairs.com' },
      { protocol: 'https', hostname: '**.infinitymassagechairs.com' },
      { protocol: 'https', hostname: 'luraco.com' },
      { protocol: 'https', hostname: '**.luraco.com' },
      { protocol: 'https', hostname: 'inbalancemassage.com' },
      { protocol: 'https', hostname: '**.inbalancemassage.com' },
      { protocol: 'https', hostname: 'massagechairstore.com' },
      { protocol: 'https', hostname: '**.massagechairstore.com' },
      { protocol: 'https', hostname: 'recovathlete.com' },
      { protocol: 'https', hostname: '**.recovathlete.com' },
      { protocol: 'https', hostname: 'www.johnsonfitness.com' },
      { protocol: 'https', hostname: 'johnsonfitness.com' },
      { protocol: 'https', hostname: 'www.massagechairheaven.com' },
      { protocol: 'https', hostname: 'massagechairheaven.com' },
    ],
  },
  webpack: (config) => {
    // Fix: SyntaxError (21:9) in globals.css.webpack[javascript/auto]
    // Sucrase fails parsing the source map object embedded by css-loader.
    // Disabling sourceMap on css-loader removes the object from the generated
    // JS module entirely, eliminating the parse failure.
    config.module.rules.forEach((rule) => {
      const oneOf = rule.oneOf
      if (!oneOf) return
      oneOf.forEach((inner) => {
        const uses = Array.isArray(inner.use) ? inner.use : []
        uses.forEach((use) => {
          if (!use || typeof use !== 'object' || !use.loader) return
          const loader = typeof use.loader === 'string' ? use.loader : ''
          if (loader.includes('css-loader') || loader.includes('postcss-loader')) {
            use.options = { ...(use.options || {}), sourceMap: false }
          }
        })
      })
    })
    return config
  },
}

module.exports = nextConfig
