import { CaretDown } from '@phosphor-icons/react'
import { Box, Flex, Text, chakra } from '@chakra-ui/react'
import { Select } from '@base-ui/react/select'
import { useEffect, useState } from 'react'
import { mergeClassNames } from '../../lib/merge-class-names'
import { useDropdownClasses } from '../../lib/use-dropdown-classes'

interface QuantitySelectorProps {
  value: number
  max?: number
  onChange: (value: number) => void
  ariaLabel?: string
  isSelected?: boolean
}

const TriggerButton = chakra('button')

export function QuantitySelector({
  value,
  max = 10,
  onChange,
  ariaLabel = 'Ticket quantity',
  isSelected = false,
}: QuantitySelectorProps) {
  const options = Array.from({ length: max + 1 }, (_, index) => index)
  const [isOpen, setIsOpen] = useState(false)
  const [hasOpened, setHasOpened] = useState(false)
  const { className: dropdownClassName } = useDropdownClasses(isOpen)

  useEffect(() => {
    if (isOpen) setHasOpened(true)
  }, [isOpen])

  return (
    <Select.Root
      value={value}
      onValueChange={(nextValue) => onChange(Number(nextValue))}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <Flex
        align="center"
        gap="6px"
        bg={isSelected ? 'oklch(0.28 0 0)' : 'bg.surface'}
        borderRadius="8px"
        px="12px"
        py="10px"
        flexShrink={0}
      >
        <Select.Trigger
          render={(props) => (
            <TriggerButton
              {...props}
              type="button"
              display="flex"
              alignItems="center"
              gap="6px"
              bg="transparent"
              border="none"
              p={0}
              cursor="pointer"
              color="text.primary"
              aria-label={ariaLabel}
              transition="transform 0.15s ease"
              transitionProperty="transform"
              _active={{ transform: 'scale(0.96)' }}
            >
              <Text
                fontSize="20px"
                fontWeight="700"
                lineHeight="24px"
                fontVariantNumeric="tabular-nums"
              >
                {value}
              </Text>
              <Box pointerEvents="none" flexShrink={0} color="text.primary">
                <CaretDown size={10} weight="bold" aria-hidden />
              </Box>
            </TriggerButton>
          )}
        />
      </Flex>

      {hasOpened ? (
        <Select.Portal>
          <Select.Positioner side="bottom" align="center" sideOffset={4}>
            <Select.Popup
              data-origin="bottom-center"
              render={(props) => (
                <div
                  {...props}
                  className={mergeClassNames(dropdownClassName, props.className)}
                  style={{
                    background: '#0a1219',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    paddingBlock: '4px',
                    minWidth: '56px',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
                    zIndex: 50,
                    ...props.style,
                  }}
                />
              )}
            >
              <Select.List>
                {options.map((qty) => (
                  <Select.Item
                    key={qty}
                    value={qty}
                    render={(props, state) => (
                      <button
                        {...props}
                        type="button"
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '8px 12px',
                          background: state.selected
                            ? 'rgba(255,255,255,0.05)'
                            : 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#fff',
                          fontSize: '16px',
                          fontWeight: 700,
                          fontVariantNumeric: 'tabular-nums',
                          textAlign: 'center',
                        }}
                      >
                        <Select.ItemText>{qty}</Select.ItemText>
                      </button>
                    )}
                  />
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      ) : null}
    </Select.Root>
  )
}
