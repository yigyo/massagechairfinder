'use client'
import { useState } from 'react'

// Lightweight click-to-load facade for a YouTube Short. The player iframe is
// only mounted after the user clicks, so the page pays no third-party JS or
// iframe cost on load (protects LCP/INP). Shown below the article body on the
// single /learn page that matches the video.
export default function YouTubeShort({ id, title }: { id: string; title: string }) {
  const [play, setPlay] = useState(false)
  return (
    <aside className="my-12 not-prose">
      <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: '#934713' }}>
        Watch: the 30-second version
      </p>
      <h3 className="font-serif text-xl mb-4" style={{ color: '#1C2331' }}>{title}</h3>
      <div
        className="relative mx-auto overflow-hidden rounded-xl bg-black"
        style={{ maxWidth: '320px', aspectRatio: '9 / 16' }}
      >
        {play ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`}
            title={title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlay(true)}
            aria-label={`Play video: ${title}`}
            className="group absolute inset-0 h-full w-full cursor-pointer border-0 p-0"
          >
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt={title}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span
                className="flex items-center justify-center rounded-full transition-transform group-hover:scale-110"
                style={{ width: '64px', height: '64px', background: 'rgba(28,35,49,0.85)' }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>
        )}
      </div>
    </aside>
  )
}
