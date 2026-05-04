'use client'

import React, { useState, useRef, useCallback } from 'react'
import { finderStart, finderEmailSubmit, finderComplete, emailOptIn } from '@/lib/gtag'

// ─── TYPES ─────────────────────────────────────────────────────────────────────
type Phase = 'intro' | 'asking' | 'thinking' | 'email_gate'

interface Chair {
  name: string
  price: string
  body: string
  url: string
  imageUrl: string
}

// ─── CHAIR URL LOOKUP ──────────────────────────────────────────────────────────
const CHAIR_URLS: Record<string, string> = {
  'osaki os-champ':            'https://osakimassagechair.com/products/osaki-os-champ',
  'osaki os-pro yamato':       'https://www.massagechairheaven.com/products/osaki-os-pro-yamato-massage-chair',
  'osaki os-pro admiral ii':   'https://osakimassagechair.com/products/osaki-os-pro-admiral-ii',
  'osaki os-pro maestro':      'https://osakimassagechair.com/products/osaki-os-pro-maestro-le',
  'osaki os-pro 4d duomax':    'https://osakimassagechair.com/products/os-pro-4d-duomax',
  'kahuna lm-6800s':           'https://kahunachair.com/lm-6800s-2/',
  'kahuna lm-6800':            'https://kahunachair.com/product/kahuna-massage-chair-basic-l-track-full-body-kahuna-massage-chair-lm-6800-black/',
  'infinity dynasty':          'https://massagechairstore.com/infinity-dynasty-4d/',
  'infinity celebrity':        'https://massagechairwarehouse.com/products/infinity-riage-x3-massage-chair',
  'infinity evolution':        'https://massagechairstore.com/infinity-evolution-max-4d/',
  'infinity genesis':          'https://massagechairstore.com/infinity-genesis-max/',
  'infinity imperial':         'https://massagechairstore.com/infinity-imperial-syner-d-massage-chair/',
  'human touch laevo':         'https://www.humantouch.com/products/laevo',
  'luraco i9':                 'https://massagechairwarehouse.com/products/luraco-i9-max-plus-massage-chair',
  'synca jp970':               'https://syncamassagechair.com/products/jp970',
  'synca jp1100':              'https://syncamassagechair.com/products/jp1100',
  'daiwa legacy':              'https://www.massagechairheaven.com/products/daiwa-legacy-4-massage-chair',
  'kyota genki':               'https://massagechairstore.com/kyota-genki-m380-massage-chair/',
  'bodyfriend phantom medical': 'https://recovathlete.com/products/bodyfriend-phantom-medical-care-massage-chair',
  'bodyfriend phantom':         'https://recovathlete.com/products/bodyfriend-phantom-ii-massage-chair',
  'bodyfriend palace':          'https://recovathlete.com/products/bodyfriend-palace-2-massage-chair',
  'bodyfriend falcon':          'https://www.amazon.com/Bodyfriend-Recliner-Patented-Technology-Acupressure/dp/B0D97TGBYS',
  'amamedics hilux':           'https://osakimassagechair.com/products/amamedic-hilux-4d',
  'amamedics renew':           'https://osakimassagechair.com/products/amamedic-renew',
  'ogawa master drive le':     'https://massagechairwarehouse.com/products/ogawa-master-drive-le-massage-chair',
  'ogawa master drive ai':     'https://massagechairwarehouse.com/products/ogawa-master-drive-ai-2-0-massage-chair',
  'ogawa active xl':           'https://massagechairwarehouse.com/products/ogawa-active-xl-3d-massage-chair',
  'jpmedics kumo':             'https://massagechairwarehouse.com/products/jpmedics-kumo-4d-massage-chair',
  'jpmedics kaze':             'https://massagechairwarehouse.com/collections/jpmedics',
  'panasonic mak1':            'https://www.massagechairs.com/products/panasonic-mak1-massage-chair',
  'titan 3d prestige':         'https://titanchair.com/products/titan-3d-prestige',
}

// Chair images — hosted on Goodwin Shopify CDN (public); will migrate to Strapi media later
const CHAIR_IMAGES: Record<string, string> = {
  'osaki os-champ':            'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-os-champ-massage-chair.webp?v=1776836198',
  'osaki os-pro yamato':       'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-pro-yamato-massage-chair.jpg?v=1776902373',
  'osaki os-pro admiral ii':   'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-os-pro-admiral-gray-massage-chair.webp?v=1776836197',
  'osaki os-pro maestro':      'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-os-pro-maestro-massage-chair.webp?v=1776836390',
  'osaki os-pro 4d duomax':    'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/osaki-os-pro-4d-duomax-massage-chair.webp?v=1776836197',
  'kahuna lm-6800s':           'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/kahuna-lm-6800S-massage-chair.jpg?v=1776902669',
  'kahuna lm-6800':            'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/kahuna-lm-6800-massage-chair.jpg?v=1776836198',
  'infinity dynasty':          'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/infinity-dynasty-4d-massage-chair.webp?v=1776836197',
  'infinity celebrity':        'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/infinity_celebrity_3d-massage-chair.webp?v=1776836198',
  'infinity evolution':        'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/infinity-evo-max-4d-massage-chair.webp?v=1776902757',
  'infinity genesis':          'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/infinity-genesis-max-4d-massage-chair.webp?v=1776836198',
  'infinity imperial':         'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/Infinity_Imperial_syner-d-massage-chair.jpg?v=1776836198',
  'human touch laevo':         'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/human-touch-laevo-zg-massage-chair.webp?v=1776836198',
  'luraco i9':                 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/luraco-i9_max-massage-chair.jpg?v=1776836198',
  'synca jp970':               'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/synca-jp970-massage-chair.webp?v=1776836197',
  'synca jp1100':              'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/synca-jp1100-massage-chair.webp?v=1776836198',
  'daiwa legacy':              'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/daiwa-legacy-4-massage-chair.webp?v=1776836198',
  'kyota genki':               'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/Kyota-Genki-M380-massage-chair.jpg?v=1776836198',
  'bodyfriend palace':         'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/bodyfriend-palace-ii-massage_chair.webp?v=1776904391',
  'bodyfriend falcon':         'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/bodyfriend-falcon-massage-chair.jpg?v=1776904610',
  'bodyfriend phantom medical': 'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/bodyfriend_phantom_medical-massage-chair.webp?v=1776904169',
  'bodyfriend phantom':        'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/bodyfriend-phantom-ii-massage-chair.jpg?v=1776903999',
  'amamedics hilux':           'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/amamedic-hilux-massage-chair.webp?v=1776836198',
  'amamedics renew':           'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/amamedic-renew-massage-chair.webp?v=1776904815',
  'ogawa master drive le':     'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/Ogawa_Master_Drive_LE_4d-massage-chair.webp?v=1776836198',
  'ogawa master drive ai':     'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/ogawa-master-drive-ai-2_0-4d-massage-chair.jpg?v=1776836198',
  'ogawa active xl':           'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/ogawa-active-xl-massage-chair.webp?v=1776836198',
  'jpmedics kumo':             'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/jpmedics-kumo-4d-massage-chair.webp?v=1776836197',
  'jpmedics kaze':             'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/jpmedics-kaze-duo-massage-chair.webp?v=1776836198',
  'panasonic mak1':            'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/panasonic-mak1-massage-chair.webp?v=1776958938',
  'titan 3d prestige':         'https://cdn.shopify.com/s/files/1/0661/9758/5995/files/titan-3d-prestige-massage-chair.webp?v=1776836198',
}

function getChairUrl(name: string): string {
  const lower = name.toLowerCase()
  // Longer/more-specific keys first to avoid partial-match swallowing
  const sorted = Object.entries(CHAIR_URLS).sort((a, b) => b[0].length - a[0].length)
  for (const [key, url] of sorted) {
    if (lower.includes(key) && url) return url
  }
  return '/chairs'
}

function getChairImage(name: string): string {
  const lower = name.toLowerCase()
  const sorted = Object.entries(CHAIR_IMAGES).sort((a, b) => b[0].length - a[0].length)
  for (const [key, url] of sorted) {
    if (lower.includes(key) && url) return url
  }
  return ''
}

// ─── HELPERS ───────────────────────────────────────────────────────────────────
function generateSessionId(): string {
  return 'finder_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

function parseOptions(text: string): { text: string; options: string[] } {
  const m = text.match(/\[options:\s*([^\]]+)\]/i)
  if (!m) return { text, options: [] }
  const options = m[1].split('|').map((s) => s.trim()).filter(Boolean)
  const cleanText = text.replace(/\[options:[^\]]+\]/gi, '').trim()
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
      const name = hMatch ? hMatch[1].trim() : headerLine.replace(/^\d+\.\s+/, '').trim()
      const price = hMatch ? hMatch[2].trim() : ''
      return {
        name,
        price,
        body: body
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

// ─── PROGRESS LABEL ────────────────────────────────────────────────────────────
function progressLabel(turnCount: number): string {
  if (turnCount === 0) return 'Getting started...'
  if (turnCount <= 3) return 'Just a few questions...'
  if (turnCount <= 6) return 'Halfway there...'
  if (turnCount <= 9) return 'Almost done...'
  return 'Finding your matches...'
}

// ─── PRICE FORMATTER ───────────────────────────────────────────────────────────
function formatStartingPrice(price: string): string {
  const match = price.match(/\$[\d,]+/)
  if (!match) return price
  return `Starting at ${match[0]}`
}

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
  const turnCountRef = useRef(0)
  const textInputRef = useRef<HTMLInputElement>(null)

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  // ─── STREAM TO API ──────────────────────────────────────────────────────────
  const streamMessage = useCallback(async (message: string): Promise<string> => {
    const resp = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId: sessionIdRef.current, message, mode: 'finder' }),
    })
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`)

    const reader = resp.body!.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    let accumulated = ''

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
          if (data.done) break
          if (data.text) accumulated += data.text
        } catch {
          // ignore parse errors
        }
      }
    }
    return accumulated
  }, [])

  // ─── HANDLE USER INPUT ──────────────────────────────────────────────────────
  const handleUserInput = useCallback(async (text: string) => {
    if (isStreaming || !text.trim()) return

    // Record quiz answer before sending
    const qType = detectQuestionType(questionText)
    if (qType) {
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
        setShowDeadEnd(false)
        setHeightInput('')

        if (opts.length === 0) {
          if (isOutOfRangeHeight(cleanText)) {
            setShowOutOfRange(true)
          } else if (isHeightQuestion(cleanText)) {
            setShowTextInput(true)
            setTimeout(() => textInputRef.current?.focus(), 50)
          }
          // else: bridge message — "Continue" pill shown
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
    emailOptIn('finder')
    try {
      await fetch('/api/send-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          chairs: chairs.map(c => ({ ...c, price: formatStartingPrice(c.price) })),
          quizAnswers,
          quizFeatures,
        }),
      })
      setEmailSent(true)
    } catch {
      // fail silently — show success anyway so UX isn't broken
      setEmailSent(true)
    } finally {
      setEmailSending(false)
    }
  }

  const progressPct = Math.min(Math.round((turnCount / 11) * 100), 95)

  // ─── RENDER ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 100px', minHeight: '60vh' }}>

      {/* ── INTRO ──────────────────────────────────────────────────────── */}
      {phase === 'intro' && (
        <div style={{ textAlign: 'center', paddingTop: 32, animation: 'mcfFadeUp 0.4s ease' }}>
          <style>{`
            @keyframes mcfFadeUp {
              from { opacity: 0; transform: translateY(14px); }
              to { opacity: 1; transform: translateY(0); }
            }
            @keyframes mcfBounce {
              0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
              30% { transform: translateY(-9px); opacity: 1; }
            }
          `}</style>
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
            Takes about 3 minutes &nbsp;&bull;&nbsp; Results delivered to your inbox
          </p>
          <hr style={{ border: 'none', borderTop: '1px solid #E8DFD3', margin: '44px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap' }}>
            {['Chairs from $1,200 to $15,000', 'No pressure to buy', 'Honest ratings across 15+ brands'].map((item) => (
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
              <div style={{ height: '100%', background: '#D1803E', borderRadius: 3, width: `${progressPct}%`, transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)' }} />
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

          {/* Dead-end: no chairs available for this user — show Home button only */}
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

          {/* Bridge "Continue" pill — when no options and not a height question and not a dead end */}
          {options.length === 0 && !showTextInput && !showOutOfRange && !showDeadEnd && (
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

          {/* Nav — hide Start over on first question, nothing to restart from yet */}
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

      {/* ── EMAIL GATE ─────────────────────────────────────────────────── */}
      {phase === 'email_gate' && (
        <div style={{ animation: 'mcfFadeUp 0.45s ease', maxWidth: 560 }}>
          {!emailSent ? (
            <>
              <h2 style={{ fontSize: 'clamp(24px,4vw,32px)', fontWeight: 700, color: '#1C2331', lineHeight: 1.2, fontFamily: 'Noto Serif, Georgia, serif', marginBottom: 28 }}>
                We found {chairs.length > 0 ? chairs.length : 'a few'} {chairs.length === 1 ? 'chair' : 'chairs'} matching your needs.
              </h2>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 10 }}>
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
                    padding: '14px 16px', fontSize: 16, fontFamily: 'inherit',
                    color: '#1C2331', background: '#fff', outline: 'none',
                  }}
                />
                <button
                  onClick={handleSendResults}
                  disabled={emailSending || !emailInput.trim()}
                  style={{
                    background: '#C04832', color: '#fff', border: 'none', borderRadius: 10,
                    padding: '14px 28px', fontSize: 16, fontWeight: 600, cursor: 'pointer',
                    fontFamily: 'inherit', whiteSpace: 'nowrap',
                    opacity: emailSending || !emailInput.trim() ? 0.6 : 1,
                  }}
                >
                  {emailSending ? 'Sending...' : 'Send My Results'}
                </button>
              </div>
              <p style={{ fontSize: 12, color: '#9B9B95', marginBottom: 8 }}>
                By submitting, you agree to receive email from Massage Chair Finder. Unsubscribe anytime.
              </p>
              <p style={{ fontSize: 12, color: '#9B9B95', marginBottom: 20 }}>
                Your top chairs will arrive in your inbox shortly.
              </p>

              {/* Your criteria -- moved below email capture */}
              <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D1803E', marginBottom: 16 }}>
                Your criteria
              </p>

              {/* Quiz summary table */}
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
                  ].filter(row => quizAnswers[row.key]).map((row, i, arr) => (
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

              <div style={{ marginTop: 8 }}>
                <button onClick={restart} style={{ background: 'none', border: 'none', color: '#B0ACA7', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline', textUnderlineOffset: 2, padding: 0 }}>
                  Start over with different answers
                </button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', paddingTop: 40 }}>
              <div style={{ fontSize: 40, marginBottom: 20 }}>✓</div>
              <h2 style={{ fontSize: 'clamp(24px,4vw,32px)', fontWeight: 700, color: '#1C2331', fontFamily: 'Noto Serif, Georgia, serif', marginBottom: 14 }}>
                Check your inbox.
              </h2>
              <p style={{ fontSize: 17, color: '#6B6B65', lineHeight: 1.65, maxWidth: 420, margin: '0 auto 36px' }}>
                Your chair matches are on the way. While you wait, the Buying Guide covers everything you need to compare chairs confidently.
              </p>
              <a href="/learn/buying-guide" style={{ color: '#D1803E', fontWeight: 600, fontSize: 16, textDecoration: 'none' }}>
                Read the Buying Guide &rarr;
              </a>
              <div style={{ marginTop: 36 }}>
                <button onClick={restart} style={{ background: 'none', border: 'none', color: '#B0ACA7', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'underline', textUnderlineOffset: 2, padding: 0 }}>
                  Start over with different answers
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
