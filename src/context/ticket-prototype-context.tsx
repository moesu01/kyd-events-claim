import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

interface TicketPrototypeContextValue {
  isResaleEnabled: boolean
  setIsResaleEnabled: (enabled: boolean) => void
}

const TicketPrototypeContext = createContext<TicketPrototypeContextValue | null>(null)

export function TicketPrototypeProvider({ children }: { children: ReactNode }) {
  const [isResaleEnabled, setIsResaleEnabled] = useState(true)

  const handleSetIsResaleEnabled = useCallback((enabled: boolean) => {
    setIsResaleEnabled(enabled)
  }, [])

  const value = useMemo(
    () => ({
      isResaleEnabled,
      setIsResaleEnabled: handleSetIsResaleEnabled,
    }),
    [isResaleEnabled, handleSetIsResaleEnabled],
  )

  return (
    <TicketPrototypeContext.Provider value={value}>{children}</TicketPrototypeContext.Provider>
  )
}

export function useTicketPrototype() {
  const context = useContext(TicketPrototypeContext)
  if (!context) {
    throw new Error('useTicketPrototype must be used within TicketPrototypeProvider')
  }

  return context
}
