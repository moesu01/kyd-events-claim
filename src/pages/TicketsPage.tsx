import { Box, Text, VStack } from '@chakra-ui/react'
import { AppHeader } from '../components/header/app-header'
import type { MyTicketsDestination } from '../components/header/my-tickets-menu'

interface TicketsPageProps {
  ticketCount?: number
  onNavigate?: (destination: MyTicketsDestination) => void
}

export function TicketsPage({ ticketCount = 0, onNavigate }: TicketsPageProps) {
  return (
    <Box
      color="text.primary"
      minH="100vh"
      maxW="mobile"
      mx="auto"
      w="full"
    >
      <AppHeader ticketCount={ticketCount} onNavigate={onNavigate} />

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
