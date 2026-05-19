#!/usr/bin/env node
/**
 * PUSH CATALOG TO BACKEND
 *
 * Runs AFTER `npm run generate-goodwin`. Takes the output files from
 * scripts/goodwin-output/ and:
 *
 *   1. Fetches current server.js + goodwin-quiz-page.js from the backend
 *      repo (yigyo/emily-chat-backend) via the GitHub Contents API.
 *   2. Splices in the regenerated CHAIR_URLS / CHAIR_IMAGES blocks
 *      (goodwin-quiz-page.js) and the COMPLETE CHAIR CATALOG block
 *      (server.js).
 *   3. Pushes both files back to GitHub via the same API.
 *   4. Polls both Vercel projects (Emily backend + Lila backend) until
 *      they report READY.
 *
 * Usage:
 *   npm run generate-goodwin && node scripts/push-catalog-to-backend.mjs
 * Or with one command (after adding the npm script - see package.json):
 *   npm run sync-catalog
 *
 * Credentials: GITHUB_TOKEN and VERCEL_TOKEN are read from
 * eComm/.secrets/credentials.json (same file used by the chatbot deploy
 * scripts) or from env vars of the same name.
 */

import { readFileSync, existsSync } from 'node:fs'
import { resolve, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname  = dirname(__filename)
const SCRIPT_DIR = __dirname
const MCF_ROOT   = resolve(SCRIPT_DIR, '..')
const ECOMM_ROOT = resolve(MCF_ROOT, '..')

const REPO              = 'yigyo/emily-chat-backend'
const SERVER_FILE       = 'server.js'
const QUIZ_PAGE_FILE    = 'goodwin-quiz-page.js'
const MCF_VERCEL_PROJ   = 'prj_QaCg4OMFqy7cdyY0tAVaYwWJQklJ'
const GMC_VERCEL_PROJ   = 'prj_u1P7LIuYHG6lwZh3s8kixh0s9rMP'

// ─── Credentials ─────────────────────────────────────────────────────────────
function loadSecret(name) {
  if (process.env[name]) return process.env[name]
  const secretsPath = resolve(ECOMM_ROOT, '.secrets', 'credentials.json')
  if (existsSync(secretsPath)) {
    const cfg = JSON.parse(readFileSync(secretsPath, 'utf8'))
    if (cfg[name]) return cfg[name]
  }
  throw new Error(`${name} not set. Add to env or ${secretsPath}`)
}

const GITHUB_TOKEN = loadSecret('GITHUB_TOKEN')
const VERCEL_TOKEN = loadSecret('VERCEL_TOKEN')

// ─── Read generated outputs ──────────────────────────────────────────────────
const outDir = join(SCRIPT_DIR, 'goodwin-output')
const catalogPath = join(outDir, 'goodwin-catalog.txt')
const quizObjPath = join(outDir, 'goodwin-quiz-objects.js')

if (!existsSync(catalogPath) || !existsSync(quizObjPath)) {
  console.error(`Output files missing in ${outDir}.`)
  console.error('Run `npm run generate-goodwin` first.')
  process.exit(1)
}

const newCatalogBlock = readFileSync(catalogPath, 'utf8').trim()
const newQuizObjects  = readFileSync(quizObjPath, 'utf8')

// Parse CHAIR_URLS and CHAIR_IMAGES blocks out of goodwin-quiz-objects.js
function extractConstBlock(source, constName) {
  const startRe = new RegExp(`^const ${constName} = \\{`, 'm')
  const startMatch = source.match(startRe)
  if (!startMatch) throw new Error(`Could not find ${constName} declaration in generated output`)
  const startIdx = startMatch.index
  // Find the matching closing `};` at line start
  let depth = 0
  let inString = false
  let stringChar = ''
  for (let i = startIdx; i < source.length; i++) {
    const c = source[i]
    if (inString) {
      if (c === '\\') { i++; continue }
      if (c === stringChar) inString = false
    } else {
      if (c === "'" || c === '"' || c === '`') { inString = true; stringChar = c }
      else if (c === '{') depth++
      else if (c === '}') {
        depth--
        if (depth === 0) {
          // Include the `;` after the brace
          let end = i + 1
          if (source[end] === ';') end++
          return source.slice(startIdx, end)
        }
      }
    }
  }
  throw new Error(`Unterminated ${constName} declaration`)
}

const newChairUrls   = extractConstBlock(newQuizObjects, 'CHAIR_URLS')
const newChairImages = extractConstBlock(newQuizObjects, 'CHAIR_IMAGES')

console.log(`Loaded generated blocks: catalog=${newCatalogBlock.length}b, CHAIR_URLS=${newChairUrls.length}b, CHAIR_IMAGES=${newChairImages.length}b`)

// ─── GitHub Contents API helpers ─────────────────────────────────────────────
async function ghGetFile(filename) {
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${filename}`, {
    headers: { 'Authorization': `token ${GITHUB_TOKEN}` }
  })
  if (!res.ok) throw new Error(`GET ${filename} failed: ${res.status}`)
  const json = await res.json()
  const content = Buffer.from(json.content, 'base64').toString('utf8')
  return { content, sha: json.sha }
}

async function ghPutFile(filename, content, sha, message) {
  const body = JSON.stringify({
    message,
    content: Buffer.from(content, 'utf8').toString('base64'),
    sha,
    committer: { name: 'Yigyo', email: 'yigyo.marketing@gmail.com' }
  })
  const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${filename}`, {
    method: 'PUT',
    headers: {
      'Authorization': `token ${GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body
  })
  if (!res.ok) throw new Error(`PUT ${filename} failed: ${res.status} ${await res.text()}`)
  const json = await res.json()
  return json.commit.sha
}

// ─── Splice logic ────────────────────────────────────────────────────────────
function spliceServerCatalog(serverSrc, newBlock) {
  // The catalog inside QUIZ_PROMPT begins at the "## COMPLETE CHAIR CATALOG"
  // header line and runs through the closing backtick of QUIZ_PROMPT.
  const headerIdx = serverSrc.indexOf('## COMPLETE CHAIR CATALOG')
  if (headerIdx === -1) throw new Error('"## COMPLETE CHAIR CATALOG" header not found in server.js')
  // The QUIZ_PROMPT template literal ends at the first ``;`` after the header.
  // We find the closing backtick by looking for `\n`;` after headerIdx.
  const closeIdx = serverSrc.indexOf('`;', headerIdx)
  if (closeIdx === -1) throw new Error('Closing backtick for QUIZ_PROMPT not found after catalog header')
  // The header line start
  const lineStart = serverSrc.lastIndexOf('\n', headerIdx) + 1
  // Build replacement: new block content, then closing backtick (which we keep)
  const before = serverSrc.slice(0, lineStart)
  const after  = serverSrc.slice(closeIdx) // includes `;` and rest
  // Ensure the new block ends with a newline before the closing backtick
  let replacement = newBlock
  if (!replacement.endsWith('\n')) replacement += '\n'
  return before + replacement + after
}

function spliceQuizPageBlock(pageSrc, constName, newBlock) {
  // Find indented declaration: `  const CHAIR_URLS = {` (2-space indent inside IIFE)
  const startRe = new RegExp(`(^\\s*)const ${constName} = \\{`, 'm')
  const m = pageSrc.match(startRe)
  if (!m) throw new Error(`${constName} declaration not found in goodwin-quiz-page.js`)
  const indent = m[1]
  const startIdx = m.index
  // Walk braces to find the matching `};`
  let depth = 0
  let inString = false
  let stringChar = ''
  let endIdx = -1
  for (let i = startIdx; i < pageSrc.length; i++) {
    const c = pageSrc[i]
    if (inString) {
      if (c === '\\') { i++; continue }
      if (c === stringChar) inString = false
    } else {
      if (c === "'" || c === '"' || c === '`') { inString = true; stringChar = c }
      else if (c === '{') depth++
      else if (c === '}') {
        depth--
        if (depth === 0) {
          let e = i + 1
          if (pageSrc[e] === ';') e++
          endIdx = e
          break
        }
      }
    }
  }
  if (endIdx === -1) throw new Error(`Unterminated ${constName} block in goodwin-quiz-page.js`)
  // Re-indent the new block to match
  const indented = newBlock.split('\n').map(l => l.length ? indent + l : l).join('\n')
  return pageSrc.slice(0, startIdx) + indented + pageSrc.slice(endIdx)
}

// ─── Pull → splice → push ────────────────────────────────────────────────────
console.log('\nFetching current backend files from GitHub...')
const server   = await ghGetFile(SERVER_FILE)
const quizPage = await ghGetFile(QUIZ_PAGE_FILE)
console.log(`  ${SERVER_FILE}: sha=${server.sha.slice(0,10)} ${server.content.length}b`)
console.log(`  ${QUIZ_PAGE_FILE}: sha=${quizPage.sha.slice(0,10)} ${quizPage.content.length}b`)

console.log('\nSplicing in regenerated blocks...')
const newServerSrc   = spliceServerCatalog(server.content, newCatalogBlock)
const newQuizPageSrc = spliceQuizPageBlock(
  spliceQuizPageBlock(quizPage.content, 'CHAIR_URLS', newChairUrls),
  'CHAIR_IMAGES',
  newChairImages
)
console.log(`  ${SERVER_FILE} delta: ${newServerSrc.length - server.content.length}b`)
console.log(`  ${QUIZ_PAGE_FILE} delta: ${newQuizPageSrc.length - quizPage.content.length}b`)

if (process.argv.includes('--dry-run')) {
  console.log('\n--dry-run: not pushing. Inspect splice output above and re-run without the flag.')
  process.exit(0)
}

console.log('\nPushing updates...')
const msg = `Sync catalog from chairs.ts. Auto-generated by push-catalog-to-backend.mjs.`
const c1 = await ghPutFile(SERVER_FILE, newServerSrc, server.sha, msg)
console.log(`  ${SERVER_FILE}: ${c1.slice(0,10)}`)
// Small gap to reduce Vercel cancellation
await new Promise(r => setTimeout(r, 2000))
const c2 = await ghPutFile(QUIZ_PAGE_FILE, newQuizPageSrc, quizPage.sha, msg)
console.log(`  ${QUIZ_PAGE_FILE}: ${c2.slice(0,10)}`)

// ─── Poll Vercel ─────────────────────────────────────────────────────────────
async function vercelLatest(projectId) {
  const res = await fetch(
    `https://api.vercel.com/v6/deployments?projectId=${projectId}&limit=1`,
    { headers: { Authorization: `Bearer ${VERCEL_TOKEN}` } }
  )
  const json = await res.json()
  return json.deployments?.[0] ?? null
}

console.log('\nWaiting for Vercel deploys to reach READY...')
await new Promise(r => setTimeout(r, 12000))
for (let i = 0; i < 18; i++) {
  const [mcf, gmc] = await Promise.all([
    vercelLatest(MCF_VERCEL_PROJ),
    vercelLatest(GMC_VERCEL_PROJ),
  ])
  const ms = mcf?.state || '?', gs = gmc?.state || '?'
  console.log(`  MCF ${mcf?.uid?.slice(0,14)||''} ${ms} | GMC ${gmc?.uid?.slice(0,14)||''} ${gs}`)
  if (ms === 'READY' && gs === 'READY') {
    console.log('\nDone. Both backend deployments are live with the new catalog.')
    process.exit(0)
  }
  if (ms === 'ERROR' || gs === 'ERROR') {
    console.error('\nA Vercel build failed. Check the project dashboard.')
    process.exit(1)
  }
  await new Promise(r => setTimeout(r, 10000))
}
console.warn('\nTimed out waiting for READY. Check vercel.com if no further progress.')
