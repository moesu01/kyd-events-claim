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
  resetToken: number
  replayToken: number
  requestClaimFlowReset: () => void
  requestClaimAnimationReplay: () => void
}

const ClaimFlowContext = createContext<ClaimFlowContextValue | null>(null)

interface ClaimFlowProviderProps {
  children: ReactNode
}

export function ClaimFlowProvider({ children }: ClaimFlowProviderProps) {
  const [claimStatus, setClaimStatus] = useState<ClaimStatus>('pending')
  const [resetToken, setResetToken] = useState(0)
  const [replayToken, setReplayToken] = useState(0)

  const completeClaim = useCallback(() => {
    setClaimStatus('claimed')
  }, [])

  const resetClaim = useCallback(() => {
    setClaimStatus('pending')
  }, [])

  const requestClaimFlowReset = useCallback(() => {
    setClaimStatus('pending')
    setResetToken((token) => token + 1)
  }, [])

  const requestClaimAnimationReplay = useCallback(() => {
    setReplayToken((token) => token + 1)
  }, [])

  const value = useMemo(
    () => ({
      claimStatus,
      completeClaim,
      resetClaim,
      resetToken,
      replayToken,
      requestClaimFlowReset,
      requestClaimAnimationReplay,
    }),
    [
      claimStatus,
      completeClaim,
      resetClaim,
      resetToken,
      replayToken,
      requestClaimFlowReset,
      requestClaimAnimationReplay,
    ],
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
