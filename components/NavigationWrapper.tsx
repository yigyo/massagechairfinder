// NavigationWrapper — server component
// Reads app/best/ and app/compare/ at build time and passes the results to
// the client Navigation component. No manual updates needed: create a new
// page directory and it appears in the nav automatically on next deploy.
import { getBestNavPages, getCompareNavPages } from '@/lib/nav-scanner'
import Navigation from './Navigation'

export default function NavigationWrapper() {
  const bestPages    = getBestNavPages()
  const comparePages = getCompareNavPages()
  return <Navigation bestPages={bestPages} comparePages={comparePages} />
}
