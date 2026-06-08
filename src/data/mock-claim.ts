import type { ClaimTicket } from '../types/claim'

export const mockClaim: ClaimTicket = {
  partner: 'StubHub',
  partnerLogoUrl: '/assets/claim/stubhub-logo.png',
  headline: "You've Got Tickets!",
  claimedHeadline: "You've claimed your ticket",
  expiresLabel: 'Expires in 47hrs 32min',
  posterUrl: '/assets/claim/pursuit-poster.jpg',
  title: 'Pursuit of happiness w/ vosters & dj chazz rockwell',
  eventTitle: 'Pursuit of happiness w/ vosters & dj chazz rockwell',
  ticketType: 'GA Advance Release',
  quantity: 1,
  date: 'Thursday • November 06 2026',
  time: '6:00PM',
  venue: 'The Brooklyn Monarch',
  city: 'Brooklyn, NY',
  ctaClaim: 'Claim Ticket on KYD Labs',
  ctaViewTickets: 'View your tickets on KYD Labs',
  disclaimer:
    'To claim this ticket, you will be redirected to\nSign in with KYD Labs.',
}
