import { Box, Text, VStack } from '@chakra-ui/react'
import { AppHeader } from '../components/header/app-header'
import { useTicketCart } from '../context/ticket-cart-context'

export function TicketsPage() {
  const { totalTickets } = useTicketCart()

  return (
    <Box
      color="text.primary"
      minH="100vh"
      maxW="mobile"
      mx="auto"
      w="full"
    >
      <AppHeader ticketCount={totalTickets} />

      <VStack as="main" gap="8px" px="pageX" pt="24px" align="stretch">
        <Text fontSize="20px" fontWeight="700" lineHeight="1.2">
          Ticket Page
        </Text>
        <Text fontSize="14px" color="text.secondary" lineHeight="1.5">
          Your tickets will appear here.
        </Text>
      </VStack>
    </Box>
  )
}
