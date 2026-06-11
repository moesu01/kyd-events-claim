import { createContext, useContext, useMemo, type ReactNode } from 'react'
import {
  FALLBACK_ACCENT_OKLCH,
  getAccentLinkTextColor,
  getAccentMutedTextColor,
  getAccentMutedTextColorLight,
  getClaimTicketColors,
  type ClaimTicketColors,
} from '../lib/oklch-color'

interface EventAccentContextValue {
  accentColor: string
  mutedTextColor: string
  mutedTextColorLight: string
  linkTextColor: string
  claimTicketColors: ClaimTicketColors
}

const EventAccentContext = createContext<EventAccentContextValue>({
  accentColor: FALLBACK_ACCENT_OKLCH,
  mutedTextColor: getAccentMutedTextColor(FALLBACK_ACCENT_OKLCH),
  mutedTextColorLight: getAccentMutedTextColorLight(FALLBACK_ACCENT_OKLCH),
  linkTextColor: getAccentLinkTextColor(FALLBACK_ACCENT_OKLCH),
  claimTicketColors: getClaimTicketColors(FALLBACK_ACCENT_OKLCH),
})

interface EventAccentProviderProps {
  accentColor: string
  children: ReactNode
}

export function EventAccentProvider({ accentColor, children }: EventAccentProviderProps) {
  const value = useMemo(
    () => ({
      accentColor,
      mutedTextColor: getAccentMutedTextColor(accentColor),
      mutedTextColorLight: getAccentMutedTextColorLight(accentColor),
      linkTextColor: getAccentLinkTextColor(accentColor),
      claimTicketColors: getClaimTicketColors(accentColor),
    }),
    [accentColor],
  )

  return (
    <EventAccentContext.Provider value={value}>{children}</EventAccentContext.Provider>
  )
}

export function useEventAccent(): EventAccentContextValue {
  return useContext(EventAccentContext)
}
