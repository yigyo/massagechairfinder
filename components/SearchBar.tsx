'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface SearchBarProps {
  variant?: 'header' | 'footer'
  placeholder?: string
}

export default function SearchBar({ variant = 'header', placeholder = 'Search chairs, brands, guides...' }: SearchBarProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  // Focus input when header search opens
  useEffect(() => {
    if (open && variant === 'header') {
      inputRef.current?.focus()
    }
  }, [open, variant])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    setOpen(false)
    setQuery('')
    router.push('/search?q=' + encodeURIComponent(trimmed))
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      setOpen(false)
      setQuery('')
    }
  }

  // ── Footer variant ─────────────────────────────────────────────────────────
  if (variant === 'footer') {
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
          className="p-2 rounded bg-navy text-white hover:bg-gold transition-colors"
        >
          <SearchIcon />
        </button>
      </form>
    )
  }

  // ── Header variant: icon that expands inline ───────────────────────────────
  return (
    <div ref={wrapperRef} className="relative flex items-center">
      {open ? (
        <form onSubmit={handleSubmit} className="flex items-center gap-1 animate-fade-in">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKey}
            placeholder={placeholder}
            aria-label="Search the site"
            className="w-48 sm:w-56 text-sm px-3 py-1.5 rounded border border-sand bg-white text-charcoal placeholder-warm-gray focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold transition-all"
          />
          <button
            type="submit"
            aria-label="Submit search"
            className="p-1.5 text-gold hover:text-navy transition-colors"
          >
            <SearchIcon />
          </button>
          <button
            type="button"
            onClick={() => { setOpen(false); setQuery('') }}
            aria-label="Close search"
            className="p-1.5 text-warm-gray hover:text-charcoal transition-colors"
          >
            <CloseIcon />
          </button>
        </form>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open search"
          className="p-2 text-charcoal hover:text-gold transition-colors"
        >
          <SearchIcon />
        </button>
      )}
    </div>
  )
}

function SearchIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
        d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
