import { createContext, useContext, useMemo, type ReactNode } from 'react'
import {
  FALLBACK_ACCENT_OKLCH,
  getAccentMutedTextColor,
  getAccentMutedTextColorLight,
} from '../lib/oklch-color'

interface EventAccentContextValue {
  accentColor: string
  mutedTextColor: string
  mutedTextColorLight: string
}

const EventAccentContext = createContext<EventAccentContextValue>({
  accentColor: FALLBACK_ACCENT_OKLCH,
  mutedTextColor: getAccentMutedTextColor(FALLBACK_ACCENT_OKLCH),
  mutedTextColorLight: getAccentMutedTextColorLight(FALLBACK_ACCENT_OKLCH),
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
