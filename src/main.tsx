import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/transitions-dev.css'
import './styles/holo-ticket.css'
import './styles/holo-ticket-presets.css'
import 'dialkit/styles.css'
import { ChakraProvider } from '@chakra-ui/react'
import { TicketCartProvider } from './context/ticket-cart-context'
import { ClaimFlowProvider } from './context/claim-flow-context'
import { HoloTicketDialRoot } from './components/dev/holo-ticket-dial-root'
import { system } from './theme'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <TicketCartProvider>
        <ClaimFlowProvider>
          <BrowserRouter>
            <App />
            <HoloTicketDialRoot />
          </BrowserRouter>
        </ClaimFlowProvider>
      </TicketCartProvider>
    </ChakraProvider>
  </StrictMode>,
)
