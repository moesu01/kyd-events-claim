import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/transitions-dev.css'
import { ChakraProvider } from '@chakra-ui/react'
import { TicketCartProvider } from './context/ticket-cart-context'
import { system } from './theme'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <TicketCartProvider>
        <App />
      </TicketCartProvider>
    </ChakraProvider>
  </StrictMode>,
)
