import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // --- New brand tokens (DESIGN.md v1) ---
        background: '#F2F6FB',
        surface: '#FFFFFF',
        primary: '#0B1829',
        accent: '#0EA5E9',
        'accent-interactive': '#0369A1',
        muted: '#5F7185',
        border: '#D4DDE9',
        'border-strong': '#B8C8DC',
        'on-dark-secondary': '#8897A8',
        // --- Legacy tokens (retained for compare pages and component use) ---
        navy: '#1C2331',
        charcoal: '#3D3D3A',
        'warm-gray': '#6B6B65',
        linen: '#F5F1EB',
        gold: '#D1803E',
        teal: '#2E7D6F',
        sand: '#E8DFD3',
        terra: '#C04832',
        bronze: '#934713',
      },
      fontFamily: {
        serif: ['var(--font-noto-serif)', 'Georgia', 'serif'],
        sans: ['var(--font-ibm-plex-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['2.75rem', { letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      borderRadius: {
        sm: '4px',
        md: '8px',
        lg: '10px',
        xl: '14px',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '40px',
        '2xl': '64px',
      },
    },
  },
  plugins: [],
}

export default config
