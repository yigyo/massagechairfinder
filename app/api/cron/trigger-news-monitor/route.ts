"use server"
import { NextRequest, NextResponse } from "next/server"

export const dynamic = "force-dynamic"

const OWNER    = "yigyo"
const REPO     = "massagechairfinder"
const WORKFLOW = "weekly-news-monitor.yml"

export async function GET(req: NextRequest) {
  const expectedSecret = process.env.CRON_SECRET
  if (!expectedSecret) {
    console.error("[cron/trigger-news-monitor] CRON_SECRET not configured")
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 })
  }

  const authHeader = req.headers.get("authorization")
  if (authHeader !== "Bearer " + expectedSecret) {
    console.warn("[cron/trigger-news-monitor] Unauthorized request")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const pat = process.env.GITHUB_DISPATCH_PAT
  if (!pat) {
    console.error("[cron/trigger-news-monitor] GITHUB_DISPATCH_PAT not configured")
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 })
  }

  const url = "https://api.github.com/repos/" + OWNER + "/" + REPO + "/actions/workflows/" + WORKFLOW + "/dispatches"

  let githubRes: Response
  try {
    githubRes = await fetch(url, {
      method: "POST",
      headers: {
        "Authorization":        "Bearer " + pat,
        "Accept":               "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "Content-Type":         "application/json",
        "User-Agent":           "massagechairfinder-vercel-cron",
      },
      body: JSON.stringify({ ref: "main" }),
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error("[cron/trigger-news-monitor] fetch threw: " + message)
    return NextResponse.json({ error: "Network error", message }, { status: 502 })
  }

  if (githubRes.status !== 204) {
    const body = await githubRes.text()
    console.error("[cron/trigger-news-monitor] GitHub dispatch failed: " + githubRes.status + " " + body)
    return NextResponse.json(
      { error: "Dispatch failed", status: githubRes.status, body },
      { status: 502 },
    )
  }

  const dispatchedAt = new Date().toISOString()
  console.log("[cron/trigger-news-monitor] Weekly news monitor workflow dispatched at " + dispatchedAt)
  return NextResponse.json({ success: true, dispatchedAt })
}
