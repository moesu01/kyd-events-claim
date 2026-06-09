import { useEffect } from 'react'
import { applyDocumentPageBackground } from './apply-document-page-background'
import { getClaimPageBackground } from './claim-page-background'

export function useClaimPageBackground() {
  useEffect(() => {
    return applyDocumentPageBackground(getClaimPageBackground())
  }, [])
}
