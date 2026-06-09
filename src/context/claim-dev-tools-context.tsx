import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

interface ClaimDevToolsContextValue {
  isVisible: boolean
  toggleVisible: () => void
}

const ClaimDevToolsContext = createContext<ClaimDevToolsContextValue | null>(null)

export function ClaimDevToolsProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisible = useCallback(() => {
    setIsVisible((visible) => !visible)
  }, [])

  const value = useMemo(
    () => ({
      isVisible,
      toggleVisible,
    }),
    [isVisible, toggleVisible],
  )

  return <ClaimDevToolsContext.Provider value={value}>{children}</ClaimDevToolsContext.Provider>
}

export function useClaimDevTools() {
  const context = useContext(ClaimDevToolsContext)
  if (!context) throw new Error('useClaimDevTools must be used within ClaimDevToolsProvider')

  return context
}
