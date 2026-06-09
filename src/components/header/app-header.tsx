import { Flex, Image, chakra } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { assetUrl } from '../../lib/asset-url'
import { routes } from '../../routes/paths'
import { MyTicketsMenu } from './my-tickets-menu'

interface AppHeaderProps {
  ticketCount?: number
  logoUrl?: string
}

const LogoLink = chakra(Link)

export function AppHeader({
  ticketCount = 2,
  logoUrl = assetUrl('/assets/venue-logo.png'),
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
      <LogoLink
        to={routes.event}
        display="flex"
        alignItems="center"
        flexShrink={0}
        aria-label="Back to event page"
        transition="transform 0.15s ease"
        transitionProperty="transform"
        _active={{ transform: 'scale(0.96)' }}
      >
        <Image
          src={logoUrl}
          alt="Venue logo"
          w="80px"
          h="32px"
          objectFit="contain"
        />
      </LogoLink>

      <MyTicketsMenu ticketCount={ticketCount} />
    </Flex>
  )
}
