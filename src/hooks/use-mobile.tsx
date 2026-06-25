
import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * A hook that returns whether the current viewport is mobile.
 * Uses a two-pass rendering strategy to prevent hydration mismatches.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [isHydrated, setIsHydrated] = React.useState(false)

  React.useEffect(() => {
    // Only run on client after mount
    setIsHydrated(true)
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Initial check
    checkMobile()
    
    // Setup listeners for resize and orientation change
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    mql.addEventListener("change", onChange)
    window.addEventListener("resize", onChange)
    
    return () => {
      mql.removeEventListener("change", onChange)
      window.removeEventListener("resize", onChange)
    }
  }, [])

  // Always return a consistent initial state (false) for both SSR and first client pass
  // Only return actual mobile status after hydration is confirmed
  return isHydrated ? isMobile : false
}
