import { Box, Text } from '@chakra-ui/react'
import { Tabs } from '@base-ui/react/tabs'
import { useEffect, useState } from 'react'
import { mockEvent } from '../../data/mock-event'
import { useTicketPrototype } from '../../context/ticket-prototype-context'
import { AnimatedPresencePanel } from '../ui/animated-presence-panel'
import { TicketList } from './ticket-list'
import { TicketsResaleTabs } from './tickets-resale-tabs'
import { TicketsSimpleHeader } from './tickets-simple-header'

type TicketTab = 'tickets' | 'resale'

const ticketSectionSurfaceProps = {
  position: 'relative' as const,
  w: 'full',
  borderRadius: 'ticketSection',
  overflow: 'hidden',
  className: 't-ticket-section',
}

export function TicketsSection() {
  const { isResaleEnabled } = useTicketPrototype()
  const [activeTab, setActiveTab] = useState<TicketTab>('tickets')

  useEffect(() => {
    if (!isResaleEnabled && activeTab === 'resale') setActiveTab('tickets')
  }, [isResaleEnabled, activeTab])

  if (!isResaleEnabled) {
    return (
      <Box {...ticketSectionSurfaceProps}>
        <TicketsSimpleHeader />
        <TicketList tiers={mockEvent.ticketTiers} showPromoLink={false} />
      </Box>
    )
  }

  return (
    <Tabs.Root value={activeTab} onValueChange={(value) => setActiveTab(value as TicketTab)}>
      <Box {...ticketSectionSurfaceProps}>
        <TicketsResaleTabs activeTab={activeTab} />

        <AnimatedPresencePanel panelKey={activeTab}>
          {activeTab === 'tickets' ? (
            <TicketList tiers={mockEvent.ticketTiers} />
          ) : (
            <Text
              px="pageX"
              py="24px"
              w="full"
              textAlign="center"
              fontSize="14px"
              fontWeight="400"
              lineHeight="1.3"
              color="text.secondary"
            >
              No resale listings available
            </Text>
          )}
        </AnimatedPresencePanel>
      </Box>
    </Tabs.Root>
  )
}
