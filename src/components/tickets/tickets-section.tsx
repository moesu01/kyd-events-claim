import { Box, Text } from '@chakra-ui/react'
import { Tabs } from '@base-ui/react/tabs'
import { useState } from 'react'
import { mockEvent } from '../../data/mock-event'
import { AnimatedPresencePanel } from '../ui/animated-presence-panel'
import { TicketList } from './ticket-list'
import { TicketsResaleTabs } from './tickets-resale-tabs'

type TicketTab = 'tickets' | 'resale'

export function TicketsSection() {
  const [activeTab, setActiveTab] = useState<TicketTab>('tickets')

  return (
    <Tabs.Root value={activeTab} onValueChange={(value) => setActiveTab(value as TicketTab)}>
      <Box
        position="relative"
        w="full"
        borderRadius="8px"
        overflow="hidden"
        boxShadow="inset 0 0 0 1px rgba(204,237,255,0.2)"
      >
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
