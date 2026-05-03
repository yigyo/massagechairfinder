'use client'
import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  placeholder?: string
}

// Footer-only search bar (header search is handled inline in Navigation.tsx)
export default function SearchBar({ placeholder = 'Search ...' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    setQuery('')
    router.push('/search?q=' + encodeURIComponent(trimmed))
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') setQuery('')
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-2">
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={handleKey}
        placeholder={placeholder}
        aria-label="Search the site"
        className="flex-1 text-sm px-3 py-2 rounded border border-sand bg-linen text-charcoal placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-colors"
      />
      <button
        type="submit"
        aria-label="Search"
        className="p-2 rounded border border-navy text-navy bg-transparent hover:bg-navy hover:text-white transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
            d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
        </svg>
      </button>
    </form>
  )
}
