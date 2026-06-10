import { Box, chakra } from '@chakra-ui/react'

const ToggleRoot = chakra('button')

interface PrototypeToggleProps {
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  ariaLabel: string
}

export function PrototypeToggle({
  checked,
  onCheckedChange,
  ariaLabel,
}: PrototypeToggleProps) {
  const handleClick = () => {
    onCheckedChange(!checked)
  }

  return (
    <ToggleRoot
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={handleClick}
      position="relative"
      w="36px"
      h="20px"
      borderRadius="pill"
      border="1px solid"
      borderColor="border.subtle"
      bg={checked ? 'cta.bg' : 'bg.surface'}
      cursor="pointer"
      flexShrink={0}
      transition="background-color 150ms ease, border-color 150ms ease"
      transitionProperty="background-color, border-color"
      _active={{ transform: 'scale(0.96)' }}
    >
      <Box
        position="absolute"
        top="2px"
        left={checked ? '18px' : '2px'}
        w="14px"
        h="14px"
        borderRadius="pill"
        bg={checked ? 'cta.fg' : 'text.primary'}
        transition="left 150ms ease, background-color 150ms ease"
        transitionProperty="left, background-color"
      />
    </ToggleRoot>
  )
}
