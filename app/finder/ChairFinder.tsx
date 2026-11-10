'use client'

import React, { useState, useRef, useCallback } from 'react'
import { finderStart, finderEmailSubmit, finderComplete, emailOptIn, affiliateClick } from '@/lib/gtag'
import { MCF_CHAIRS, priceBand, resolveAffiliateUrl } from '@/lib/chairs'
import TurnstileWidget, { TurnstileHandle } from '@/components/TurnstileWidget'

// ─── TYPES ─────────────────────────────────────────────────────────────────────
type Phase = 'intro' | 'asking' | 'thinking' | 'email_gate'

interface Chair {
  name: string
  price: string
  body: string
  url: string
  imageUrl: string
}

// ─── CHAIR URL + IMAGE LOOKUP (sourced from chairs.ts) ────────────────────────
// Derived from MCF_CHAIRS so it stays in sync automatically when the catalog changes.
// Match key: goodwinLookupKey when set; otherwise name with "Massage Chair" stripped, lowercased.
// Keys sorted by length desc so more-specific keys win over shorter partial matches.

function deriveMatchKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+massage\s+chair\b.*/i, '')
    .replace(/\s+chair\b.*/i, '')
    .trim()
}

type LookupEntry = [string, string]

function buildLookup(field: (c: typeof MCF_CHAIRS[0]) => string | undefined): LookupEntry[] {
  const entries: LookupEntry[] = []
  for (const chair of MCF_CHAIRS) {
    if (chair.inStock === false) continue // skip OOS chairs from URL/image lookup
    const value = field(chair)
    if (!value) continue
    const key = chair.goodwinLookupKey
      ? chair.goodwinLookupKey.toLowerCase()
      : deriveMatchKey(chair.name)
    entries.push([key, value])
  }
  return entries.sort((a, b) => b[0].length - a[0].length)
}

const CHAIR_URL_LOOKUP: LookupEntry[] = buildLookup(c => c.affiliateUrl ?? undefined)
const CHAIR_IMAGE_LOOKUP: LookupEntry[] = buildLookup(c => c.imageUrl ?? undefined)

function getChairUrl(name: string): string {
  // Hyphen-tolerant matching: 'Titan Pro-Vigor 4D' matches 'titan pro vigor' key.
  const norm = (s: string) => s.toLowerCase().replace(/-/g, ' ').replace(/\s+/g, ' ').trim()
  const lower = norm(name)
  for (const [key, url] of CHAIR_URL_LOOKUP) {
    if (lower.includes(norm(key))) return url
  }
  return ''
}

function getChairImage(name: string): string {
  const norm = (s: string) => s.toLowerCase().replace(/-/g, ' ').replace(/\s+/g, ' ').trim()
  const lower = norm(name)
  for (const [key, img] of CHAIR_IMAGE_LOOKUP) {
    if (lower.includes(norm(key))) return img
  }
  return ''
}

// ─── RESULTS: CATALOG MATCH (bands, internal page, earning link) ──────────────
function catalogMatch(name: string) {
  const norm = (s: string) => s.toLowerCase().replace(/-/g, ' ').replace(/\s+/g, ' ').trim()
  const n = norm(name)
  const keyed = MCF_CHAIRS
    .filter(c => c.inStock !== false)
    .map(c => ({ c, key: norm(c.goodwinLookupKey ?? deriveMatchKey(c.name)) }))
    .sort((a, b) => b.key.length - a.key.length)
  return keyed.find(x => x.key && n.includes(x.key))?.c
}

// Prices show as bands only. Drop any sentence in the AI reasoning that quotes an
// exact dollar figure rather than rewriting it.
function stripPriceSentences(body: string): string {
  return body
    .split('\n')
    .map(line => (line.match(/[^.!?]+[.!?]*\s*/g) || [line]).filter(s => !/\$\s?\d/.test(s)).join('').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

// ─── HELPERS ───────────────────────────────────────────────────────────────────
function generateSessionId(): string {
  return 'finder_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

// House rule: no em or en dashes in anything a reader sees, including AI text.
function noDashes(s: string): string {
  return s.replace(/\s*[\u2014\u2013]\s*/g, ', ')
}

function parseOptions(text: string): { text: string; options: string[] } {
  const m = text.match(/\[options:\s*([^\]]+)\]/i)
  if (!m) return { text: noDashes(text), options: [] }
  const options = m[1].split('|').map((s) => s.trim()).filter(Boolean)
  const cleanText = noDashes(text.replace(/\[options:[^\]]+\]/gi, '').trim())
  return { text: cleanText, options }
}

function parseChairs(fullText: string): Chair[] {
  const rawText = fullText.replace(/\[options:[^\]]+\]/gi, '').trim()
  const startIdx = rawText.search(/^\s*1\.\s+[A-Z]/m)
  if (startIdx === -1) return []

  const listText = rawText.slice(startIdx)
  const rawParts = listText.split(/\n(?=\d+\.\s+[A-Z])/)

  return rawParts
    .map((part) => {
      const trimmed = part.trim()
      if (!trimmed) return null
      const nlIdx = trimmed.indexOf('\n')
      const headerLine = nlIdx > -1 ? trimmed.slice(0, nlIdx).trim() : trimmed
      const body = nlIdx > -1 ? trimmed.slice(nlIdx).trim() : ''
      const hMatch = headerLine.match(/^\d+\.\s+(.+?)(?:\s+[—–]\s+|\s+-\s+)(.+)$/)
      // Drop any " | price" tail the model adds to the header; bands come from chairs.ts.
      const name = (hMatch ? hMatch[1].trim() : headerLine.replace(/^\d+\.\s+/, '').trim()).split(/\s+\|\s+/)[0].trim()
      const price = hMatch ? hMatch[2].trim() : ''
      return {
        name,
        price,
        body: noDashes(body)
          .replace(/There['']s no rush[^.]*\./gi, '')
          .replace(/massagechairfinder\.com[^\s]*/gi, '')
          .replace(/goodwinmassagechairs\.com[^\s]*/gi, '')
          .replace(/https?:\/\/[^\s]+buying-guide[^\s]*/gi, '')
          .replace(/\n{3,}/g, '\n\n')
          .trim(),
        url: getChairUrl(name),
        imageUrl: getChairImage(name),
      }
    })
    .filter((c): c is Chair => c !== null)
}

function isRecommendation(text: string, turnCount: number): boolean {
  if (turnCount < 5) return false
  const clean = text.replace(/\[options:[^\]]+\]/gi, '').trim()
  return /^\s*1\.\s+[A-Z]/m.test(clean) && clean.length > 300
}

function isHeightQuestion(text: string): boolean {
  const lower = text.toLowerCase()
  const asking =
    lower.includes('how tall are you') ||
    lower.includes("what's your height") ||
    lower.includes('what is your height') ||
    lower.includes('your height?') ||
    lower.includes('tell me your height') ||
    /\bhow tall\b/.test(lower)
  return asking && text.length < 300
}

function isOutOfRangeHeight(text: string): boolean {
  const lower = text.toLowerCase()
  const hasVerification = (
    lower.includes('double-check') || lower.includes('confirm') || lower.includes('accurate') ||
    lower.includes('verify') || lower.includes('did you mean') || lower.includes('have that right') ||
    lower.includes('want to make sure') || lower.includes('just to confirm') || lower.includes('is that right') ||
    lower.includes('or is your height') || lower.includes('make sure i have')
  )
  const hasHeightContext = (
    lower.includes('height') || lower.includes('tall') || lower.includes('feet') || lower.includes('foot') ||
    /\d'\d/.test(lower)
  )
  // Length cap: verification questions are short. Long responses (no-fit explanations) should not show these buttons.
  return hasVerification && hasHeightContext && text.length < 300
}

// Detect ambiguous-height clarification (e.g. user typed bare "6" and AI asks
// "did you mean 6'0\" exactly?"). Distinguished from true out-of-range by the
// absence of "outside/beyond/range/tallest" keywords. Those signal that the
// height is too extreme and would lead to a dead-end; clarification cases
// proceed normally with the AI's offered interpretation.
function isHeightClarification(text: string): boolean {
  const lower = text.toLowerCase()
  const isClarifying = (
    lower.includes('just to confirm') ||
    lower.includes('did you mean') ||
    lower.includes('do you mean') ||
    lower.includes('to clarify') ||
    lower.includes('want to make sure')
  )
  // Must offer a specific feet-inches interpretation (e.g. 6'0", 5'10")
  const hasHeightFormat = /\d['’]\d/.test(text) || (lower.includes('feet') && /\d/.test(text))
  // NOT a true out-of-range case
  const isOutOfRange = (
    lower.includes('outside') ||
    lower.includes('beyond') ||
    lower.includes('well outside') ||
    lower.includes('tallest') ||
    /catalog (range|maximum)/.test(lower)
  )
  return isClarifying && hasHeightFormat && !isOutOfRange && text.length < 400
}

// ─── PROGRESS LABEL ────────────────────────────────────────────────────────────
function progressLabel(turnCount: number): string {
  if (turnCount === 0) return 'Getting started...'
  if (turnCount <= 3) return 'Just a few questions...'
  if (turnCount <= 6) return 'Halfway there...'
  if (turnCount <= 9) return 'Almost done...'
  return 'Finding your matches...'
}

// ─── PRICE FORMATTER ───────────────────────────────────────────────────────────
// (starting-price formatter removed: finder no longer sends exact prices)

// ─── FEATURE TOOLTIPS ──────────────────────────────────────────────────────────
const FEATURE_TOOLTIPS: Record<string, string> = {
  'zero gravity': 'The chair reclines until your knees are above your heart, removing spinal compression during the massage.',
  'heat therapy': 'Heating elements in the backrest warm up during your session to help loosen tight muscles.',
  'stretching': 'The chair gently extends and pulls your body at the end of a session, similar to assisted stretching from a therapist.',
  'foot and calf massage': 'Dedicated rollers and airbags work the soles of your feet and calves throughout the massage.',
  'airbag compression': 'Air-filled chambers inflate and deflate around your arms, legs, and shoulders to apply rhythmic compression pressure.',
  'body scan': 'The chair maps the length and shape of your spine before the session so rollers follow your unique curve.',
}

// ─── TOOLTIP COMPONENT ─────────────────────────────────────────────────────────
function TooltipWord({ term, definition }: { term: string; definition: string }) {
  const [open, setOpen] = useState(false)
  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      <span
        style={{ borderBottom: '1.5px dashed #D1803E', cursor: 'help' }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onClick={() => setOpen(o => !o)}
      >
        {term}
      </span>
      {open && (
        <span style={{
          position: 'absolute',
          bottom: 'calc(100% + 6px)',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#1C2331',
          color: '#fff',
          padding: '8px 12px',
          borderRadius: 8,
          fontSize: 13,
          lineHeight: 1.5,
          width: 220,
          zIndex: 100,
          pointerEvents: 'none',
          whiteSpace: 'normal',
          boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        }}>
          {definition}
        </span>
      )}
    </span>
  )
}

function renderWithTooltips(text: string): React.ReactNode[] {
  const entries = Object.entries(FEATURE_TOOLTIPS).sort((a, b) => b[0].length - a[0].length)
  const escapedKeys = entries.map(([k]) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const regex = new RegExp(`(${escapedKeys.join('|')})`, 'gi')
  const result: React.ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  const re = new RegExp(regex.source, 'gi')
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) result.push(text.slice(lastIndex, match.index))
    const term = match[0]
    const def = FEATURE_TOOLTIPS[term.toLowerCase()]
    result.push(def ? <TooltipWord key={match.index} term={term} definition={def} /> : term)
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) result.push(text.slice(lastIndex))
  return result.length > 0 ? result : [text]
}

// ─── QUESTION TYPE DETECTION ───────────────────────────────────────────────────
function detectQuestionType(questionText: string): string | null {
  const lower = questionText.toLowerCase()
  if (lower.includes('pain') || lower.includes('tension') || lower.includes('where do you feel')) return 'pain'
  if (lower.includes('matters most') || lower.includes('having a massage chair at home')) return 'goal'
  if ((lower.includes('height') || lower.includes('how tall')) && !lower.includes('maximum') && !lower.includes('catalog')) return 'height'
  if (lower.includes('weigh') || (lower.includes('weight') && lower.includes('frame'))) return 'weight'
  if ((lower.includes('gentle') && lower.includes('firm')) || (lower.includes('picture') && lower.includes('massage'))) return 'pressure'
  if (lower.includes('budget')) return 'budget'
  if (lower.includes('tight space') || lower.includes('close to a wall') || (lower.includes('room') && lower.includes('recline'))) return 'room'
  if (lower.includes('where are you in') || lower.includes('decision to buy') || lower.includes('last one')) return 'timeline'
  if (lower.includes('heat therapy')) return 'feature_heat'
  if (lower.includes('zero gravity')) return 'feature_zero_gravity'
  if (lower.includes('stretching programs') || (lower.includes('stretching') && lower.includes('therapist'))) return 'feature_stretching'
  if (lower.includes('foot and calf')) return 'feature_foot_calf'
  return null
}

// ─── COMPONENT ─────────────────────────────────────────────────────────────────
export default function ChairFinder() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [isStreaming, setIsStreaming] = useState(false)
  const [turnCount, setTurnCount] = useState(0)
  const [questionText, setQuestionText] = useState('')
  const [options, setOptions] = useState<string[]>([])
  const [showTextInput, setShowTextInput] = useState(false)
  const [showOutOfRange, setShowOutOfRange] = useState(false)
  const [showHeightClarification, setShowHeightClarification] = useState(false)
  const [thinkingLabel, setThinkingLabel] = useState('Just a moment...')
  const [chairs, setChairs] = useState<Chair[]>([])
  const [rawFallback, setRawFallback] = useState('')
  const [heightInput, setHeightInput] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const [emailSending, setEmailSending] = useState(false)
  const [showDeadEnd, setShowDeadEnd] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({})
  const [quizFeatures, setQuizFeatures] = useState<string[]>([])
  const sessionIdRef = useRef<string>(generateSessionId())
  const turnstileTokenRef = useRef<string>("")
  const turnstileWidgetRef = useRef<TurnstileHandle>(null)
  const turnCountRef = useRef(0)
  const textInputRef = useRef<HTMLInputElement>(null)

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  // ─── STREAM TO API ──────────────────────────────────────────────────────────
  const streamMessage = useCallback(async (message: string): Promise<string> => {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: sessionIdRef.current, message, mode: 'finder', website: "" }),
    })
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)

    const reader = resp.body!.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let accumulated = ''
    let streamError = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        try {
          const data = JSON.parse(line.slice(6))
          if (data.error) {
            streamError = String(data.error)
            break
          }
          if (data.done) break
          if (data.text) accumulated += data.text
        } catch {
          // ignore parse errors
        }
      }
    }
    // Server reported a failure mid-stream (e.g. upstream API error). Surface it
    // instead of returning an empty string, which rendered a blank question
    // with only a Continue pill.
    if (streamError || !accumulated.trim()) {
      throw new Error(streamError || 'Empty response from /api/chat')
    }
    return accumulated
  }, [])

  // ─── HANDLE USER INPUT ──────────────────────────────────────────────────────
  const handleUserInput = useCallback(async (text: string) => {
    if (isStreaming || !text.trim()) return

    // Record quiz answer before sending
    const qType = detectQuestionType(questionText)
    // A bridge "Continue" or the opening token is not an answer; never let it
    // overwrite a recorded one (it replaced the pain area on 2026-11-09).
    const isAnswer = text !== 'Continue' && text !== '__begin__'
    if (qType && isAnswer) {
      if (qType.startsWith('feature_')) {
        if (text.toLowerCase() === 'yes') {
          const featureName = qType.replace('feature_', '').replace(/_/g, ' ')
          setQuizFeatures(prev => prev.includes(featureName) ? prev : [...prev, featureName])
        }
      } else {
        setQuizAnswers(prev => ({ ...prev, [qType]: text }))
      }
    }

    setIsStreaming(true)
    turnCountRef.current += 1
    setTurnCount(turnCountRef.current)
    setThinkingLabel('Just a moment...')
    setPhase('thinking')
    scrollTop()

    const start = Date.now()
    try {
      const raw = await streamMessage(text)

      // Minimum thinking time: 800ms
      const elapsed = Date.now() - start
      if (elapsed < 800) await new Promise((r) => setTimeout(r, 800 - elapsed))

      // Check for dead-end signal from AI
      const hasDeadEnd = /\[dead_end\]/i.test(raw)
      const cleanRaw = raw.replace(/\[dead_end\]/gi, '').trim()

      if (hasDeadEnd) {
        const { text: cleanText } = parseOptions(cleanRaw)
        setQuestionText(cleanText)
        setOptions([])
        setShowTextInput(false)
        setShowOutOfRange(false)
        setShowDeadEnd(true)
        setHeightInput('')
        setPhase('asking')
        scrollTop()
        return
      }

      if (isRecommendation(cleanRaw, turnCountRef.current)) {
        setThinkingLabel('Finding your best matches...')
        await new Promise((r) => setTimeout(r, 1000))
        const parsed = parseChairs(cleanRaw)
        if (parsed.length > 0) {
          setChairs(parsed)
          setRawFallback('')
          finderComplete(parsed.length)
        } else {
          setChairs([])
          setRawFallback(cleanRaw.replace(/\[options:[^\]]+\]/gi, '').trim())
          finderComplete(0)
        }
        setPhase('email_gate')
        scrollTop()
      } else {
        const { text: cleanText, options: opts } = parseOptions(cleanRaw)
        setQuestionText(cleanText)
        setOptions(opts)
        setShowTextInput(false)
        setShowOutOfRange(false)
        setShowHeightClarification(false)
        setShowDeadEnd(false)
        setHeightInput('')

        if (opts.length === 0) {
          // Order matters: clarification check first so it doesn't get swallowed
          // by the out-of-range check (which has broader "did you mean" matching).
          if (isHeightClarification(cleanText)) {
            setShowHeightClarification(true)
          } else if (isOutOfRangeHeight(cleanText)) {
            setShowOutOfRange(true)
          } else if (isHeightQuestion(cleanText)) {
            setShowTextInput(true)
            setTimeout(() => textInputRef.current?.focus(), 50)
          } else if (cleanText.length > 200) {
            // Long prose after the quiz signals drift (e.g. Lila/Emily wrapped
            // up in a paragraph instead of the numbered recommendation, or only
            // had one match and explained it conversationally). Show the
            // "Return to Home" button instead of the bridge "Continue" pill so
            // the user has a clean exit rather than spiraling into chat mode.
            setShowDeadEnd(true)
          }
          // else: short bridge message - "Continue" pill shown
        }
        setPhase('asking')
        scrollTop()
      }
    } catch (err) {
      console.error('Finder error:', err)
      setQuestionText('I ran into a connection issue. Please refresh the page and try again.')
      setOptions([])
      setShowTextInput(false)
      setShowDeadEnd(false)
      setPhase('asking')
    } finally {
      setIsStreaming(false)
    }
  }, [isStreaming, streamMessage, questionText])

  // ─── START ──────────────────────────────────────────────────────────────────
  const startFinder = useCallback(async () => {
    turnCountRef.current = 0
    setTurnCount(0)
    setQuizAnswers({})
    setQuizFeatures([])
    setShowDeadEnd(false)
    finderStart()
    await handleUserInput('__begin__')
  }, [handleUserInput])

  // ─── TEXT INPUT SUBMIT ──────────────────────────────────────────────────────
  const submitTextInput = () => {
    const val = heightInput.trim()
    if (!val) return
    setShowTextInput(false)
    handleUserInput(val)
  }

  // ─── RESTART ────────────────────────────────────────────────────────────────
  const restart = () => window.location.reload()

  // ─── SEND RESULTS ───────────────────────────────────────────────────────────
  const handleSendResults = async () => {
    const email = emailInput.trim()
    if (!email || emailSending) return
    setEmailSending(true)
    finderEmailSubmit(chairs.length)
    emailOptIn('finder', email)
    try {
      await fetch('/api/send-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          chairs: chairs.map(c => ({ ...c, price: "" })),
          quizAnswers,
          quizFeatures,
          turnstileToken: turnstileTokenRef.current,
          website: "",
        }),
      })
      setEmailSent(true)
    } catch {
      // fail silently, show success anyway so UX isn't broken
      setEmailSent(true)
    } finally {
      setEmailSending(false)
    }
  }

  const progressPct = Math.min(Math.round((turnCount / 11) * 100), 95)

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 100px', minHeight: '60vh' }}>

      <style>{`
        @keyframes mcfFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes mcfBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
          30% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>

      {/* ── INTRO ──────────────────────────────────────────────────────── */}

      {phase === 'intro' && (
        <div style={{ textAlign: 'center', paddingTop: 32, animation: 'mcfFadeUp 0.4s ease' }}>
          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D1803E', marginBottom: 20 }}>
            Massage Chair Finder
          </p>
          <h1 style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 700, color: '#1C2331', marginBottom: 18, lineHeight: 1.2, fontFamily: 'Noto Serif, Georgia, serif' }}>
            Find the chair that fits your body and your life.
          </h1>
          <p style={{ fontSize: 17, color: '#6B6B65', maxWidth: 500, margin: '0 auto 50px', lineHeight: 1.65 }}>
            Answer a few questions about your pain, your home, and your budget. We will match you with the chairs most likely to be a genuine fit.
          </p>
          <button
            onClick={startFinder}
            disabled={isStreaming}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#1C2331', color: '#fff', border: 'none', borderRadius: 10,
              padding: '17px 44px', fontSize: 16, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'inherit', opacity: isStreaming ? 0.6 : 1,
            }}
          >
            {isStreaming ? 'Loading...' : 'Find My Chair \u2192'}
          </button>
          <p style={{ marginTop: 24, fontSize: 13, color: '#9B9B95' }}>
            Takes about 3 minutes &nbsp;&bull;&nbsp; See your matches right away, no email needed
          </p>
          <hr style={{ border: 'none', borderTop: '1px solid #E8DFD3', margin: '44px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {['Best fit first', 'Matched to your pain, your body, and your room', 'Every result explains the reasoning'].map((item) => (
              <span key={item} style={{ fontSize: 15, color: '#6B6B65', display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D1803E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── ASKING ─────────────────────────────────────────────────────── */}
      {phase === 'asking' && (
        <div>
          {/* Progress bar */}
          <div style={{ marginBottom: 44 }}>
            <div style={{ height: 3, background: '#E8DFD3', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', background: '#D1803E', borderRadius: 3, width: '100%', transform: `scaleX(${progressPct / 100})`, transformOrigin: 'left', transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)' }} />
            </div>
            <p style={{ fontSize: 12, color: '#9B9B95', marginTop: 10, fontWeight: 500, letterSpacing: '0.02em' }}>
              {progressLabel(turnCount)}
            </p>
          </div>

          {/* Question */}
          <p style={{ fontSize: 'clamp(15px,2vw,18px)', fontWeight: 400, color: '#1C2331', lineHeight: 1.7, marginBottom: 36, fontFamily: 'Noto Serif, Georgia, serif' }}>
            {renderWithTooltips(questionText)}
          </p>

          {/* Pills */}
          {options.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
              {options.map((opt) => {
                const isSkip = opt.toLowerCase() === 'skip'
                return (
                  <button
                    key={opt}
                    disabled={isStreaming}
                    onClick={() => handleUserInput(opt)}
                    style={{
                      border: `1.5px solid ${isSkip ? '#C8C4BF' : '#1C2331'}`,
                      background: '#fff',
                      color: isSkip ? '#9B9B95' : '#1C2331',
                      borderRadius: 100,
                      padding: '14px 28px',
                      fontSize: 17,
                      fontWeight: 500,
                      cursor: isStreaming ? 'not-allowed' : 'pointer',
                      fontFamily: 'inherit',
                      opacity: isStreaming ? 0.5 : 1,
                      transition: 'background 0.15s, color 0.15s',
                    }}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          )}

          {/* Height text input */}
          {showTextInput && (
            <div style={{ display: 'flex', gap: 10, maxWidth: 340 }}>
              <input
                ref={textInputRef}
                type="text"
                value={heightInput}
                onChange={(e) => setHeightInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); submitTextInput() } }}
                placeholder="e.g. 5'9&quot;"
                style={{
                  flex: 1, border: '1.5px solid #D4CFC9', borderRadius: 10,
                  padding: '13px 16px', fontSize: 15, fontFamily: 'inherit',
                  color: '#1C2331', background: '#FAFAF8', outline: 'none',
                }}
              />
              <button
                onClick={submitTextInput}
                disabled={isStreaming}
                style={{
                  background: '#1C2331', color: '#fff', border: 'none', borderRadius: 10,
                  padding: '13px 22px', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                  fontFamily: 'inherit', whiteSpace: 'nowrap',
                }}
              >
                Continue
              </button>
            </div>
          )}

          {/* Out-of-range height confirmation */}
          {showOutOfRange && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
              <button
                disabled={isStreaming}
                onClick={() => handleUserInput('Yes, that is my height.')}
                style={{ border: '1.5px solid #1C2331', background: '#fff', color: '#1C2331', borderRadius: 100, padding: '14px 28px', fontSize: 17, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Yes, that&apos;s my height
              </button>
              <button
                disabled={isStreaming}
                onClick={() => { setShowOutOfRange(false); setShowTextInput(true); setHeightInput(''); setTimeout(() => textInputRef.current?.focus(), 50) }}
                style={{ border: '1.5px solid #1C2331', background: '#fff', color: '#1C2331', borderRadius: 100, padding: '14px 28px', fontSize: 17, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Update my height
              </button>
            </div>
          )}

          {/* Ambiguous-height clarification (e.g. user typed "6", AI asks "did you mean 6'0\" exactly?") */}
          {showHeightClarification && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
              <button
                disabled={isStreaming}
                onClick={() => handleUserInput('Yes, that is the correct height.')}
                style={{ border: '1.5px solid #1C2331', background: '#fff', color: '#1C2331', borderRadius: 100, padding: '14px 28px', fontSize: 17, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                That is the correct height
              </button>
              <button
                disabled={isStreaming}
                onClick={() => { setShowHeightClarification(false); setShowTextInput(true); setHeightInput(''); setTimeout(() => textInputRef.current?.focus(), 50) }}
                style={{ border: '1.5px solid #1C2331', background: '#fff', color: '#1C2331', borderRadius: 100, padding: '14px 28px', fontSize: 17, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Change height
              </button>
            </div>
          )}

          {/* Dead-end: no chairs available for this user, show Home button only */}
          {showDeadEnd && (
            <div style={{ marginTop: 8 }}>
              <a
                href="/"
                style={{
                  display: 'inline-block',
                  background: '#1C2331', color: '#fff', textDecoration: 'none',
                  borderRadius: 10, padding: '14px 32px', fontSize: 16, fontWeight: 600,
                  fontFamily: 'inherit',
                }}
              >
                Return to Home
              </a>
            </div>
          )}

          {/* Bridge "Continue" pill, when no options and not a height question and not a dead end */}
          {options.length === 0 && !showTextInput && !showOutOfRange && !showHeightClarification && !showDeadEnd && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 12 }}>
              <button
                disabled={isStreaming}
                onClick={() => handleUserInput('Continue')}
                style={{ border: '1.5px solid #1C2331', background: '#fff', color: '#1C2331', borderRadius: 100, padding: '14px 28px', fontSize: 17, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Continue
              </button>
            </div>
          )}

          {/* Nav: hide Start over on first question, nothing to restart from yet */}
          {turnCount > 1 && (
            <div style={{ display: 'flex', gap: 20, marginTop: 32 }}>
              <button onClick={restart} style={{ background: 'none', border: 'none', color: '#B0ACA7', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline', textUnderlineOffset: 3, padding: 0 }}>
                Start over
              </button>
            </div>
          )}
        </div>
      )}

      {/* ── THINKING ───────────────────────────────────────────────────── */}
      {phase === 'thinking' && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 18 }}>
              {[0, 0.18, 0.36].map((delay, i) => (
                <div
                  key={i}
                  style={{
                    width: 14, height: 14, borderRadius: '50%', background: '#D1803E',
                    animation: `mcfBounce 1.2s infinite ease-in-out`,
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}
            </div>
            <p style={{ fontSize: 17, color: '#6B6B65', fontWeight: 500 }}>{thinkingLabel}</p>
          </div>
        </div>
      )}

      {/* ── RESULTS (shown on screen; email is optional, 2026-11-09) ─── */}
      {phase === 'email_gate' && (
        <div style={{ animation: 'mcfFadeUp 0.45s ease', maxWidth: 640 }}>
          <h2 style={{ fontSize: 'clamp(24px,4vw,32px)', fontWeight: 700, color: '#1C2331', lineHeight: 1.2, fontFamily: 'Noto Serif, Georgia, serif', marginBottom: 24 }}>
            {chairs.length > 0
              ? `Your ${chairs.length === 1 ? 'best match' : `top ${chairs.length} matches`}`
              : 'Your matches'}
          </h2>

          {chairs.length > 0 ? (
            <div style={{ display: 'grid', gap: 16, marginBottom: 36 }}>
              {chairs.map((c, idx) => {
                const cat = catalogMatch(c.name)
                const shopUrl = cat ? resolveAffiliateUrl(cat) : (c.url || undefined)
                const body = stripPriceSentences(c.body)
                return (
                  <div key={c.name + idx} style={{ border: '1px solid #E8DFD3', borderRadius: 12, padding: 20, background: '#fff' }}>
                    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                      {c.imageUrl && (
                        <img src={c.imageUrl} alt={c.name} style={{ width: 110, height: 88, objectFit: 'contain', flex: '0 0 auto' }} />
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D1803E', margin: '0 0 4px' }}>
                          {idx === 0 ? 'Best fit' : `Match ${idx + 1}`}
                        </p>
                        <p style={{ fontSize: 19, fontWeight: 700, color: '#1C2331', margin: '0 0 4px', fontFamily: 'Noto Serif, Georgia, serif' }}>{c.name}</p>
                        {cat && <p style={{ fontSize: 13, color: '#6B6B65', margin: 0 }}>{priceBand(cat).label}: {priceBand(cat).range}</p>}
                      </div>
                    </div>
                    {body && (
                      <p style={{ fontSize: 15, color: '#3A3A36', lineHeight: 1.65, margin: '14px 0 0', whiteSpace: 'pre-line' }}>{body}</p>
                    )}
                    <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginTop: 16, alignItems: 'center' }}>
                      {cat && (
                        <a href={`/chairs/${cat.id}`} style={{ color: '#1C2331', fontWeight: 600, fontSize: 15, textDecoration: 'underline', textUnderlineOffset: 3 }}>
                          Read the full review
                        </a>
                      )}
                      {shopUrl && (
                        <a
                          href={shopUrl}
                          target="_blank"
                          rel="sponsored noopener"
                          onClick={() => { if (cat) affiliateClick({ chairSlug: cat.id, chairName: cat.name, brand: cat.brand, retailer: cat.affiliateRetailer ?? '', linkText: 'Check price' }) }}
                          style={{ background: '#C04832', color: '#fff', borderRadius: 10, padding: '11px 22px', fontSize: 15, fontWeight: 600, textDecoration: 'none' }}
                        >
                          Check price
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : rawFallback ? (
            <p style={{ fontSize: 16, color: '#3A3A36', lineHeight: 1.7, whiteSpace: 'pre-line', marginBottom: 36 }}>{stripPriceSentences(rawFallback)}</p>
          ) : null}

          {/* Optional: email the list */}
          <div style={{ background: '#F5F1EB', borderRadius: 12, padding: 20, marginBottom: 32 }}>
            {!emailSent ? (
              <>
                <p style={{ fontSize: 17, fontWeight: 700, color: '#1C2331', margin: '0 0 6px' }}>Want this list in your inbox?</p>
                <p style={{ fontSize: 14, color: '#6B6B65', margin: '0 0 14px' }}>We will send your matches with the reasoning so you can come back to them while you compare.</p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 8 }}>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') { e.preventDefault(); handleSendResults() }
                    }}
                    placeholder="Your email address"
                    style={{
                      flex: 1, minWidth: 220, border: '1.5px solid #D4CFC9', borderRadius: 10,
                      padding: '13px 16px', fontSize: 16, fontFamily: 'inherit',
                      color: '#1C2331', background: '#fff', outline: 'none',
                    }}
                  />
                  <button
                    onClick={handleSendResults}
                    disabled={emailSending || !emailInput.trim()}
                    style={{
                      background: '#1C2331', color: '#fff', border: 'none', borderRadius: 10,
                      padding: '13px 24px', fontSize: 15, fontWeight: 600, cursor: 'pointer',
                      fontFamily: 'inherit', whiteSpace: 'nowrap',
                      opacity: emailSending || !emailInput.trim() ? 0.6 : 1,
                    }}
                  >
                    {emailSending ? 'Sending...' : 'Email My Matches'}
                  </button>
                </div>
                <p style={{ fontSize: 12, color: '#9B9B95', margin: 0 }}>
                  By submitting, you agree to receive email from Massage Chair Finder. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <p style={{ fontSize: 16, color: '#1C2331', fontWeight: 600, margin: 0 }}>
                Sent. Check your inbox for your matches.
              </p>
            )}
          </div>

          <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D1803E', marginBottom: 16 }}>
            Your criteria
          </p>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 32 }}>
            <tbody>
              {[
                { key: 'pain',     label: 'Pain area' },
                { key: 'goal',     label: 'Goal' },
                { key: 'height',   label: 'Height' },
                { key: 'weight',   label: 'Weight' },
                { key: 'pressure', label: 'Pressure preference' },
                { key: 'budget',   label: 'Budget' },
                { key: 'room',     label: 'Room space' },
                { key: 'timeline', label: 'Timeline' },
              ].filter(row => quizAnswers[row.key]).map((row) => (
                <tr key={row.key}>
                  <td style={{ fontSize: 14, color: '#6B6B65', padding: '9px 0', borderBottom: '0.5px solid #E8DFD3', width: '44%' }}>{row.label}</td>
                  <td style={{ fontSize: 14, color: '#1C2331', fontWeight: 500, padding: '9px 0', borderBottom: '0.5px solid #E8DFD3' }}>{quizAnswers[row.key]}</td>
                </tr>
              ))}
              {quizFeatures.length > 0 && (
                <tr>
                  <td style={{ fontSize: 14, color: '#6B6B65', padding: '9px 0' }}>Features requested</td>
                  <td style={{ fontSize: 14, color: '#1C2331', fontWeight: 500, padding: '9px 0' }}>
                    {quizFeatures.map(f => f.split(' ').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')).join(', ')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <button onClick={restart} style={{ background: 'none', border: 'none', color: '#B0ACA7', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline', textUnderlineOffset: 2, padding: 0 }}>
            Start over with different answers
          </button>
        </div>
      )}
          <TurnstileWidget
        ref={turnstileWidgetRef}
        action="finder-send-results"
        onToken={(t) => { turnstileTokenRef.current = t }}
      />
      </div>
  )
}
