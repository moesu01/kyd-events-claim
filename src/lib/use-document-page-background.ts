import { useEffect } from 'react'
import { applyDocumentPageBackground } from './apply-document-page-background'
import { getEventPageBackground } from './event-page-background'

export function useDocumentPageBackground(accentColor: string) {
  useEffect(() => {
    return applyDocumentPageBackground(getEventPageBackground(accentColor))
  }, [accentColor])
}
