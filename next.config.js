/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.shopify.com' },
      { protocol: 'https', hostname: '**.strapi.io' },
      { protocol: 'https', hostname: '**.up.railway.app' },
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
