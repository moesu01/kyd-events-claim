import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/transitions-dev.css'
import './styles/holo-ticket.css'
import './styles/holo-ticket-presets.css'
import './styles/claim-ticket.css'
import 'dialkit/styles.css'
import { ChakraProvider } from '@chakra-ui/react'
import { TicketCartProvider } from './context/ticket-cart-context'
import { TicketPrototypeProvider } from './context/ticket-prototype-context'
import { ClaimDevToolsProvider } from './context/claim-dev-tools-context'
import { ClaimFlowProvider } from './context/claim-flow-context'
import { HoloTicketDialRoot } from './components/dev/holo-ticket-dial-root'
import { system } from './theme'
import App from './App.tsx'
import { getRouterBasename } from './lib/router-basename'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <TicketCartProvider>
        <TicketPrototypeProvider>
          <ClaimFlowProvider>
            <ClaimDevToolsProvider>
              <BrowserRouter basename={getRouterBasename()}>
                <App />
                <HoloTicketDialRoot />
              </BrowserRouter>
            </ClaimDevToolsProvider>
          </ClaimFlowProvider>
        </TicketPrototypeProvider>
      </TicketCartProvider>
    </ChakraProvider>
  </StrictMode>,
)
