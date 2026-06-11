import { assetUrl } from '../lib/asset-url'
import type { Event } from '../types/event'

export const mockEvent: Event = {
  id: 'season-of-what-2025',
  title: 'Season of What',
  subtitle: 'An Evening of Acoustic Dead',
  presenter: 'Presented by High Times',
  posterUrl: assetUrl('/assets/poster.jpg'),
  posterUrls: [
    assetUrl('/assets/poster.jpg'),
    assetUrl('/assets/poster-jams.png'),
    assetUrl('/assets/poster-labiahead.png'),
  ],
  date: 'Tuesday, June 7',
  showTime: '7:00PM',
  timeRange: '6:30PM - 9:30PM',
  venue: 'The Cathedral of St. John the Divine',
  city: 'New York, NY',
  ageRestriction: '18+',
  eventInfo: {
    headline: 'Honey Revenge — The Loving and Losing Tour w/ Daisy Grenade, + Vana',
    venueAndDate: 'Live at LPR on Tuesday, June 17th, 2025',
    schedule: '6:00 PM doors · 7:00 PM show · 16+',
    links: [
      { label: 'More shows at LPR.com', href: 'https://lpr.com' },
      { label: 'Sign up for our newsletter', href: 'https://bit.ly/LPR-newsletter' },
    ],
    sections: [
      {
        title: 'Waitlist',
        intro:
          'When an event sells out, fans who missed out on tickets can join the waitlist for a chance to purchase tickets from someone who can no longer attend.',
        bullets: [
          'Joining the waitlist does not guarantee entry. Do not arrive at the venue unless you are contacted about tickets becoming available.',
        ],
        subsections: [
          {
            title: 'Joining the waitlist',
            body: 'If you are looking for a ticket to a sold out show, add your info to the corresponding waitlist. If a ticket becomes available, you will be notified and your credit card will be charged.',
          },
          {
            title: 'Listing your ticket',
            body: 'If you already have a ticket, you can list it on the waitlist through the My Tickets page. Once we find a buyer, you will be notified.',
          },
        ],
      },
    ],
    policy:
      'All ticket sales are final. No refunds or exchanges. Physical photo ID required for all shows with age restrictions — no exceptions.',
  },
  ticketTiers: [
    {
      id: 'second-release',
      name: 'Second Release',
      price: 20.24,
      description:
        'Standing room ticket. All ticket sales are final. No refunds or credits.',
      status: 'available',
      maxQuantity: 10,
    },
    {
      id: 'table-seating-advance',
      name: 'Table Seating- Advance',
      price: 32.96,
      description:
        'Table seating for all seated shows is reserved exclusively for ticket holders ... Read more',
      status: 'available',
      maxQuantity: 10,
    },
    {
      id: 'vip-package',
      name: 'VIP Package',
      price: 75.25,
      description:
        'Table seating for all seated shows is reserved exclusively for ticket holders ... Read more',
      status: 'waitlist',
    },
    {
      id: 'first-release',
      name: 'First Release',
      price: 0,
      description: '',
      status: 'sold_out',
    },
    {
      id: 'early-bird',
      name: 'Early bird',
      price: 0,
      description: '',
      status: 'sold_out',
    },
  ],
  artists: [
    {
      id: 'honey-revenge',
      name: 'Honey Revenge',
      imageUrl: assetUrl('/assets/artists/honey-revenge.png'),
      setTime: '10:00PM',
      socials: {
        instagram: 'https://instagram.com',
        spotify: 'https://spotify.com',
        tiktok: 'https://tiktok.com',
      },
    },
    {
      id: 'daisy-grenade',
      name: 'Daisy Grenade',
      imageUrl: assetUrl('/assets/artists/daisy-grenade.png'),
      setTime: '9:00PM',
      socials: {
        instagram: 'https://instagram.com',
        spotify: 'https://spotify.com',
        tiktok: 'https://tiktok.com',
      },
    },
    {
      id: 'vana',
      name: 'Vana',
      imageUrl: assetUrl('/assets/artists/vana.png'),
      setTime: '8:00PM',
      socials: {
        instagram: 'https://instagram.com',
        spotify: 'https://spotify.com',
        tiktok: 'https://tiktok.com',
      },
    },
    {
      id: 'nightlife',
      name: 'nightlife',
      imageUrl: assetUrl('/assets/artists/nightlife.png'),
      setTime: '7:00PM',
      socials: {
        instagram: 'https://instagram.com',
        spotify: 'https://spotify.com',
        tiktok: 'https://tiktok.com',
      },
    },
  ],
}

export const defaultTicketQuantities: Record<string, number> = {
  'second-release': 0,
  'table-seating-advance': 0,
}
