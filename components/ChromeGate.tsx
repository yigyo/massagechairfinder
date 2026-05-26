'use client'

// components/ChromeGate.tsx
// Hides the global site chrome (NavigationWrapper, Footer, ExitIntentPopup) on
// routes that should render edge-to-edge with no site navigation -- e.g. /links
// (the "link in bio" hub page). Wrap any component in the root layout that
// should disappear on those routes.

import { usePathname } from 'next/navigation'

const HIDDEN_ROUTES = ['/links']

export default function ChromeGate({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (
    pathname &&
    HIDDEN_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/'))
  ) {
    return null
  }
  return <>{children}</>
}
