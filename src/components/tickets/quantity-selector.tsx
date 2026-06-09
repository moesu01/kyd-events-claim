import { Minus, Plus } from '@phosphor-icons/react'
import { Flex, Text, chakra } from '@chakra-ui/react'

interface QuantitySelectorProps {
  value: number
  max?: number
  onChange: (value: number) => void
  ariaLabel?: string
  isSelected?: boolean
}

const StepperButton = chakra('button')

export function QuantitySelector({
  value,
  max = 10,
  onChange,
  ariaLabel = 'Ticket quantity',
  isSelected = false,
}: QuantitySelectorProps) {
  const isAtMin = value <= 0
  const isAtMax = value >= max

  const handleDecrement = () => {
    if (isAtMin) return
    onChange(value - 1)
  }

  const handleIncrement = () => {
    if (isAtMax) return
    onChange(value + 1)
  }

  return (
    <Flex
      align="center"
      gap="2px"
      bg={isSelected ? 'oklch(0.28 0 0)' : 'bg.surface'}
      borderRadius="8px"
      px="4px"
      py="4px"
      flexShrink={0}
      role="group"
      aria-label={ariaLabel}
    >
      <StepperButton
        type="button"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="36px"
        h="36px"
        borderRadius="6px"
        bg="transparent"
        border="none"
        color="text.primary"
        cursor={isAtMin ? 'not-allowed' : 'pointer'}
        opacity={isAtMin ? 0.4 : 1}
        disabled={isAtMin}
        onClick={handleDecrement}
        aria-label="Decrease quantity"
        transition="transform 0.15s ease"
        transitionProperty="transform"
        _active={isAtMin ? undefined : { transform: 'scale(0.96)' }}
      >
        <Minus size={14} weight="bold" aria-hidden />
      </StepperButton>

      <Text
        fontSize="20px"
        fontWeight="700"
        lineHeight="24px"
        fontVariantNumeric="tabular-nums"
        color="text.primary"
        minW="24px"
        textAlign="center"
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </Text>

      <StepperButton
        type="button"
        display="flex"
        alignItems="center"
        justifyContent="center"
        w="36px"
        h="36px"
        borderRadius="6px"
        bg="transparent"
        border="none"
        color="text.primary"
        cursor={isAtMax ? 'not-allowed' : 'pointer'}
        opacity={isAtMax ? 0.4 : 1}
        disabled={isAtMax}
        onClick={handleIncrement}
        aria-label="Increase quantity"
        transition="transform 0.15s ease"
        transitionProperty="transform"
        _active={isAtMax ? undefined : { transform: 'scale(0.96)' }}
      >
        <Plus size={14} weight="bold" aria-hidden />
      </StepperButton>
    </Flex>
  )
}
