import { useEffect } from 'react'
import { applyDocumentPageBackground } from './apply-document-page-background'
import {
  applyEventPageAccentVar,
  clearEventPageAccentVar,
  getEventPageBackground,
} from './event-page-background'

export function useDocumentPageBackground(accentColor: string) {
  useEffect(() => {
    applyEventPageAccentVar(accentColor)
    const cleanupBackground = applyDocumentPageBackground(getEventPageBackground(accentColor))

    return () => {
      clearEventPageAccentVar()
      cleanupBackground()
    }
  }, [accentColor])
}
