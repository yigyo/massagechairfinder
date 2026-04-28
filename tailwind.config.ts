import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
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
        sans: ['Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'],
      },