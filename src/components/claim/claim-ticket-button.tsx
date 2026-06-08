import { motion } from 'motion/react'
import { Flex, Image, Text, chakra } from '@chakra-ui/react'
import {
  claimButtonPopReducedVariants,
  claimButtonPopVariants,
} from '../../lib/motion-presets'
import { useReducedMotion } from '../../lib/use-reduced-motion'

const ClaimButtonRoot = chakra('button')
const MotionBox = motion.create(Flex)

interface ClaimTicketButtonProps {
  label: string
  onClick?: () => void
  isInactive?: boolean
  isProminent?: boolean
}

export function ClaimTicketButton({
  label,
  onClick,
  isInactive = false,
  isProminent = false,
}: ClaimTicketButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const popVariants = prefersReducedMotion
    ? claimButtonPopReducedVariants
    : claimButtonPopVariants

  const handleClick = () => {
    if (isInactive) return
    if (onClick) {
      onClick()
      return
    }
    console.log('claim ticket')
  }

  const boxShadow = isProminent
    ? '0 4px 14px rgba(0,0,0,0.35), 0 10px 28px rgba(0,0,0,0.28)'
    : '0 1px 1.5px rgba(0,0,0,0.08)'

  const button = (
    <ClaimButtonRoot
      type="button"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      w="full"
      py="10px"
      pl="16px"
      pr="14px"
      borderRadius="8px"
      bg="#000000"
      color="#ffffff"
      border="none"
      cursor={isInactive ? 'default' : 'pointer'}
      boxShadow={boxShadow}
      onClick={handleClick}
      aria-label={label}
      aria-disabled={isInactive}
      transition="transform 0.15s ease"
      transitionProperty="transform"
      _active={isInactive ? undefined : { transform: 'scale(0.96)' }}
    >
      <Text
        fontSize="14px"
        fontWeight="600"
        lineHeight="19.2px"
        color="#ffffff"
        letterSpacing="-0.14px"
        whiteSpace="nowrap"
      >
        {label}
      </Text>
      <Flex align="center" justify="center" flexShrink={0} w="25px" h="14px">
        <Image
          src="/assets/claim/claim-transfer-icon.svg"
          alt=""
          w="full"
          h="full"
          objectFit="contain"
          pointerEvents="none"
          draggable={false}
          aria-hidden
        />
      </Flex>
    </ClaimButtonRoot>
  )

  if (!isProminent) return button

  return (
    <MotionBox
      w="full"
      initial="initial"
      animate="animate"
      variants={popVariants}
    >
      {button}
    </MotionBox>
  )
}
