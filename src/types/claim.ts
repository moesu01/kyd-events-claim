export type ClaimStatus = 'pending' | 'claimed'

export interface ClaimTicket {
  partner: string
  partnerLogoUrl: string
  headline: string
  claimedHeadline: string
  expiresLabel: string
  posterUrl: string
  title: string
  eventTitle: string
  ticketType: string
  quantity: number
  date: string
  time: string
  venue: string
  city: string
  ctaClaim: string
  ctaViewTickets: string
  viewTicketsUrl: string
  disclaimer: string
}
