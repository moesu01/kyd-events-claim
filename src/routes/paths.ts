export const routes = {
  event: '/',
  tickets: '/tickets',
  claim: '/claim',
} as const

export type AppRouteKey = keyof typeof routes

export const myTicketsRoutes = {
  tickets: routes.tickets,
  claim: routes.claim,
} as const

export type MyTicketsRouteKey = keyof typeof myTicketsRoutes
