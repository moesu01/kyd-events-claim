import { useState } from 'react'
import { useTicketCart } from './context/ticket-cart-context'
import { ClaimPage } from './pages/ClaimPage'
import { EventPage } from './pages/EventPage'
import { TicketsPage } from './pages/TicketsPage'
import type { MyTicketsDestination } from './components/header/my-tickets-menu'

type AppView = 'event' | MyTicketsDestination

function App() {
  const { totalTickets } = useTicketCart()
  const [view, setView] = useState<AppView>('event')

  const handleNavigate = (destination: MyTicketsDestination) => {
    setView(destination)
  }

  if (view === 'tickets') {
    return <TicketsPage ticketCount={totalTickets} onNavigate={handleNavigate} />
  }

  if (view === 'claim') {
    return <ClaimPage />
  }

  return <EventPage onNavigate={handleNavigate} />
}

export default App
