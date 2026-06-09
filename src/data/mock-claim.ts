import type { ClaimTicket } from '../types/claim'

export const mockClaim: ClaimTicket = {
  partner: 'StubHub',
  partnerLogoUrl: '/assets/claim/stubhub-logo.png',
  headline: "You've Got Tickets!",
  claimedHeadline: 'Ticket claimed!',
  expiresLabel: 'Expires in 47hrs 32min',
  posterUrl: '/assets/claim/kels-in-the-round.png',
  title: 'KELS - In The Round',
  eventTitle: 'KELS - In The Round',
  ticketType: 'In The Round',
  quantity: 1,
  date: 'Monday • June 22 2026',
  time: '7:00PM',
  venue: 'Le Poisson Rouge',
  city: 'New York, NY',
  ctaClaim: 'Claim Ticket on KYD Labs',
  ctaViewTickets: 'View tickets on KYD Labs',
  viewTicketsUrl: 'https://kydlabs.com/tickets',
  disclaimer:
    'To claim this ticket, you will be redirected to\nSign in with KYD Labs.',
}
