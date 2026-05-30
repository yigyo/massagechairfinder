// components/SocialIcons.tsx
// Shared social icon row used by both the site-wide Footer and the /links page footer.
// Single source of truth for icon URLs, glyphs, and styling.
//
// Usage:
//   <SocialIcons />                                                  // default: FB + Pinterest only
//   <SocialIcons enabled={['instagram', 'facebook', 'pinterest', 'youtube', 'tiktok']} />  // /links
//
// To update which icons appear on a surface, change the `enabled` prop.
// To update a URL or icon, edit SOCIAL_LINKS below — change propagates everywhere.

import type { ReactNode } from 'react'

type Platform = 'instagram' | 'facebook' | 'pinterest' | 'youtube' | 'tiktok'

type SocialLink = {
  label: string
  href: string
  icon: ReactNode
}

const SOCIAL_LINKS: Record<Platform, SocialLink> = {
  instagram: {
    label: 'Instagram',
    href: 'https://www.instagram.com/massagechairfinder/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  facebook: {
    label: 'Facebook',
    href: 'https://www.facebook.com/massagechairfinder',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  pinterest: {
    label: 'Pinterest',
    href: 'https://www.pinterest.com/massagechairfinder/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M11 8c2.5 0 4 1.5 4 3.5S13.5 15 12 15c-1 0-1.5-.5-1.5-1.5" />
        <path d="M10 22l2-8" />
      </svg>
    ),
  },
  youtube: {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UC8uDtnqYXR7R0qrwa7H3v7Q',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <path d="M10 9l5 3-5 3z" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  tiktok: {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@massagechairfinder',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M9 16a4 4 0 1 0 4-4V4h2c.5 2.5 2 4 4.5 4" />
      </svg>
    ),
  },
}

type Props = {
  enabled?: Platform[]
}

export default function SocialIcons({ enabled = ['facebook', 'pinterest'] }: Props) {
  return (
    <div className="flex justify-center gap-5">
      {enabled.map((platform) => {
        const link = SOCIAL_LINKS[platform]
        return (
          <a
            key={platform}
            href={link.href}
            aria-label={link.label}
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-gray hover:text-gold transition-colors inline-flex items-center justify-center w-9 h-9"
          >
            {link.icon}
          </a>
        )
      })}
    </div>
  )
}
