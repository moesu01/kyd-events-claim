import { DialRoot } from 'dialkit'

export function HoloTicketDialRoot() {
  if (!import.meta.env.DEV) return null

  return <DialRoot position="bottom-right" defaultOpen={false} />
}
