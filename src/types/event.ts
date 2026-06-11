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

export interface EventInfoLink {
  label: string
  href: string
}

export interface EventInfoSubsection {
  title: string
  body: string
}

export interface EventInfoSection {
  title: string
  intro?: string
  bullets?: string[]
  subsections?: EventInfoSubsection[]
}

export interface EventInfo {
  headline: string
  venueAndDate: string
  schedule: string
  links: EventInfoLink[]
  sections: EventInfoSection[]
  policy: string
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
  showTime: string
  timeRange: string
  venue: string
  city: string
  ageRestriction: string
  eventInfo: EventInfo
  ticketTiers: TicketTier[]
  artists: Artist[]
}
