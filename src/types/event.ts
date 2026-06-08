export type TicketTierStatus = 'available' | 'sold_out' | 'waitlist'

export interface TicketTier {
  id: string
  name: string
  price: number
  description: string
  status: TicketTierStatus
  maxQuantity?: number
}

export interface ArtistSocials {
  instagram?: string
  spotify?: string
  tiktok?: string
}

export interface Artist {
  id: string
  name: string
  imageUrl: string
  setTime?: string
  socials?: ArtistSocials
}

export interface Event {
  id: string
  title: string
  subtitle: string
  presenter: string
  posterUrl: string
  posterUrls?: string[]
  accentColor?: string
  date: string
  timeRange: string
  venue: string
  city: string
  description: string
  ticketTiers: TicketTier[]
  artists: Artist[]
}
