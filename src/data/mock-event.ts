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
  timeRange: '6:30PM - 9:30PM',
  venue: 'The Cathedral of St. John the Divine',
  city: 'New York, NY',
  description:
    'Honey Revenge - The Loving and Losing Tour w/ Daisy Grenade, + Vana - Live at LPR on Tuesday, June 17th, 2025. 6:00 PM doors | 7:00 PM show (16+) More shows at http://LPR.com Sign up for our newsletter at http://bit.ly/LPR-newsletter When an event sells out, fans who missed out on tickets can join the Waitlist for a chance to purchase tickets from someone who can no longer attend. Joining the Waitlist does NOT guarantee entry to the event, please do NOT arrive at the venue unless you are contacted about tickets becoming available. Joining the Waitlist: If you\'re looking for a ticket to a sold out show, add your info the the corresponding Waitlist. If a ticket becomes available, you\'ll be notified and your credit card will be charged. Listing Your Ticket on the Waitlist: If you already have a ticket, you can list it on the waitlist through the "My Tickets" page. Once we find a buyer for your ticket, you will be notified. All ticket sales are final. No refunds or exchanges. Physical photo ID required for all shows with age restrictions – no exceptions.',
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
      imageUrl: assetUrl('/assets/artists/honey-revenge.jpg'),
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
      imageUrl: assetUrl('/assets/artists/daisy-grenade.jpg'),
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
      imageUrl: assetUrl('/assets/artists/vana.jpg'),
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
      imageUrl: assetUrl('/assets/artists/nightlife.jpg'),
      setTime: '7:00PM',
      socials: {
        instagram: 'https://instagram.com',
        spotify: 'https://spotify.com',
        tiktok: 'https://tiktok.com',
      },
    },
    {
      id: 'laser-girl-420',
      name: 'Laser girl 420',
      imageUrl: assetUrl('/assets/artists/laser-girl-420.jpg'),
      setTime: '11:00PM',
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
