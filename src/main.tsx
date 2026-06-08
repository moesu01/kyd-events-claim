import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/transitions-dev.css'
import { ChakraProvider } from '@chakra-ui/react'
import { TicketCartProvider } from './context/ticket-cart-context'
import { system } from './theme'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <TicketCartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TicketCartProvider>
    </ChakraProvider>
  </StrictMode>,
)
