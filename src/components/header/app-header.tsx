import { Flex, Image } from '@chakra-ui/react'
import { MyTicketsMenu, type MyTicketsDestination } from './my-tickets-menu'

interface AppHeaderProps {
  ticketCount?: number
  logoUrl?: string
  onNavigate?: (destination: MyTicketsDestination) => void
}

export function AppHeader({
  ticketCount = 2,
  logoUrl = '/assets/venue-logo.png',
  onNavigate,
}: AppHeaderProps) {
  return (
    <Flex
      as="header"
      h="56px"
      px="pageX"
      align="center"
      justify="space-between"
      w="full"
    >
      <Image
        src={logoUrl}
        alt="Venue logo"
        w="80px"
        h="32px"
        objectFit="contain"
        flexShrink={0}
      />

      <MyTicketsMenu ticketCount={ticketCount} onNavigate={onNavigate} />
    </Flex>
  )
}
