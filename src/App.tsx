import { Navigate, Route, Routes } from 'react-router-dom'
import { ClaimPage } from './pages/ClaimPage'
import { EventPage } from './pages/EventPage'
import { TicketsPage } from './pages/TicketsPage'
import { routes } from './routes/paths'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={routes.claim} replace />} />
      <Route path={routes.event} element={<EventPage />} />
      <Route path={routes.tickets} element={<TicketsPage />} />
      <Route path={routes.claim} element={<ClaimPage />} />
    </Routes>
  )
}

export default App
