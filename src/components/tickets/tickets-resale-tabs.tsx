import { Ticket } from '@phosphor-icons/react'
import { Box, Text, chakra } from '@chakra-ui/react'
import { Tabs } from '@base-ui/react/tabs'
import { useTabsPill } from '../../lib/use-tabs-pill'

type TicketTab = 'tickets' | 'resale'

interface TabConfig {
  id: TicketTab
  label: string
  iconMirrored?: boolean
}

const TAB_CONFIG: TabConfig[] = [
  { id: 'tickets', label: 'Tickets' },
  { id: 'resale', label: 'Resale', iconMirrored: true },
]

const iconProps = {
  size: 18,
  color: 'currentColor',
  weight: 'regular' as const,
}

interface TicketsResaleTabsProps {
  activeTab: TicketTab
}

const TabButton = chakra('button')

export function TicketsResaleTabs({ activeTab }: TicketsResaleTabsProps) {
  const { listRef, pillRef, registerTab } = useTabsPill({ activeValue: activeTab })

  return (
    <Tabs.List ref={listRef} className="kyd-tabs-list" aria-label="Ticket type">
      <span ref={pillRef} className="kyd-tabs-pill" aria-hidden />
      {TAB_CONFIG.map((tab, index) => {
        return (
          <Tabs.Tab
            key={tab.id}
            value={tab.id}
            render={(tabProps, state) => (
              <TabButton
                {...tabProps}
                ref={(element: HTMLButtonElement | null) => registerTab(tab.id, element)}
                role="tab"
                className="kyd-tab"
                flex={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                gap="6px"
                py="12px"
                bg="transparent"
                opacity={state.active ? 1 : 0.5}
                border="none"
                borderLeftWidth={index > 0 ? '1px' : undefined}
                borderLeftColor={index > 0 ? 'border.subtle' : undefined}
                cursor="pointer"
                color="text.primary"
                transition="transform 0.15s ease"
                transitionProperty="transform"
                _active={{ transform: 'scale(0.96)' }}
                aria-selected={state.active}
              >
                <Box
                  display="flex"
                  flexShrink={0}
                  transform={tab.iconMirrored ? 'scaleX(-1)' : undefined}
                >
                  <Ticket {...iconProps} aria-hidden />
                </Box>
                <Text
                  fontSize="14px"
                  fontWeight="700"
                  lineHeight="1"
                  color="text.primary"
                >
                  {tab.label}
                </Text>
              </TabButton>
            )}
          />
        )
      })}
    </Tabs.List>
  )
}
