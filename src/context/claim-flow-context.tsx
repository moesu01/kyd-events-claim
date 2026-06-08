import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { ClaimStatus } from '../types/claim'

interface ClaimFlowContextValue {
  claimStatus: ClaimStatus
  completeClaim: () => void
  resetClaim: () => void
}

const ClaimFlowContext = createContext<ClaimFlowContextValue | null>(null)

interface ClaimFlowProviderProps {
  children: ReactNode
}

export function ClaimFlowProvider({ children }: ClaimFlowProviderProps) {
  const [claimStatus, setClaimStatus] = useState<ClaimStatus>('pending')

  const completeClaim = useCallback(() => {
    setClaimStatus('claimed')
  }, [])

  const resetClaim = useCallback(() => {
    setClaimStatus('pending')
  }, [])

  const value = useMemo(
    () => ({
      claimStatus,
      completeClaim,
      resetClaim,
    }),
    [claimStatus, completeClaim, resetClaim],
  )

  return <ClaimFlowContext.Provider value={value}>{children}</ClaimFlowContext.Provider>
}

export function useClaimFlow() {
  const context = useContext(ClaimFlowContext)
  if (!context) {
    throw new Error('useClaimFlow must be used within ClaimFlowProvider')
  }
  return context
}
