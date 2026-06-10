import { CaretDown } from '@phosphor-icons/react'
import { Box, Flex, Text, chakra } from '@chakra-ui/react'
import { Menu } from '@base-ui/react/menu'
import { useEffect, useState, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTicketPrototype } from '../../context/ticket-prototype-context'
import { mergeClassNames } from '../../lib/merge-class-names'
import { useDropdownClasses } from '../../lib/use-dropdown-classes'
import { myTicketsRoutes, type MyTicketsRouteKey } from '../../routes/paths'
import { PrototypeToggle } from '../ui/prototype-toggle'

interface MyTicketsMenuProps {
  ticketCount?: number
}

const TriggerButton = chakra('button')

const menuItems: Array<{ id: MyTicketsRouteKey; label: string }> = [
  { id: 'tickets', label: 'Ticket Page' },
  { id: 'claim', label: 'Claim Page' },
]

export function MyTicketsMenu({ ticketCount = 0 }: MyTicketsMenuProps) {
  const navigate = useNavigate()
  const { isResaleEnabled, setIsResaleEnabled } = useTicketPrototype()
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const { className: dropdownClassName } = useDropdownClasses(isOpen)

  const handleResaleToggleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  useEffect(() => {
    if (isOpen) setHasOpened(true)
  }, [isOpen])

  const handleNavigate = (destination: MyTicketsRouteKey) => {
    navigate(myTicketsRoutes[destination])
  }

  return (
    <Menu.Root open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <Menu.Trigger
        render={(props, state) => (
          <TriggerButton
            {...props}
            type="button"
            display="flex"
            alignItems="center"
            gap="6px"
            py="4px"
            px="10px"
            borderRadius="8px"
            border="1px solid"
            borderColor="border.subtle"
            bg="transparent"
            cursor="pointer"
            aria-label={`My Tickets, ${ticketCount} tickets`}
            aria-expanded={state.open}
            transition="transform 0.15s ease"
            transitionProperty="transform"
            _active={{ transform: 'scale(0.96)' }}
          >
            <Text fontSize="14px" fontWeight="500" lineHeight="1" color="text.primary">
              My Tickets
            </Text>
            <Flex
              align="center"
              justify="center"
              minW="20px"
              h="20px"
              px="5px"
              borderRadius="pill"
              bg="#666666"
              flexShrink={0}
            >
              <Text
                fontSize="12px"
                fontWeight="700"
                lineHeight="1"
                color="#F7FAFC"
                fontVariantNumeric="tabular-nums"
              >
                {ticketCount}
              </Text>
            </Flex>
            <Box
              pointerEvents="none"
              flexShrink={0}
              color="text.primary"
              css={{
                transform: state.open ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 150ms ease',
              }}
            >
              <CaretDown size={10} weight="bold" aria-hidden />
            </Box>
          </TriggerButton>
        )}
      />

      {hasOpened ? (
        <Menu.Portal>
          <Menu.Positioner side="bottom" align="end" sideOffset={6}>
            <Menu.Popup
              data-origin="top-right"
              render={(props) => (
                <div
                  {...props}
                  className={mergeClassNames(dropdownClassName, props.className)}
                  style={{
                    background: '#0a1219',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    paddingBlock: '4px',
                    minWidth: '168px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                    zIndex: 50,
                    ...props.style,
                  }}
                />
              )}
            >
              {menuItems.map((item) => (
                <Menu.Item
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  render={(props, state) => (
                    <button
                      {...props}
                      type="button"
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px 12px',
                        background: state.highlighted
                          ? 'rgba(255,255,255,0.05)'
                          : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#fff',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: 1,
                        textAlign: 'left',
                      }}
                    >
                      {item.label}
                    </button>
                  )}
                />
              ))}

              <Box
                borderTopWidth="1px"
                borderTopColor="border.subtle"
                px="12px"
                py="10px"
                onClick={handleResaleToggleClick}
                onMouseDown={handleResaleToggleClick}
              >
                <Flex align="center" justify="space-between" gap="10px">
                  <Text fontSize="14px" fontWeight="500" lineHeight="1" color="text.primary">
                    Resale
                  </Text>
                  <PrototypeToggle
                    checked={isResaleEnabled}
                    onCheckedChange={setIsResaleEnabled}
                    ariaLabel="Toggle resale tab"
                  />
                </Flex>
              </Box>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      ) : null}
    </Menu.Root>
  )
}
