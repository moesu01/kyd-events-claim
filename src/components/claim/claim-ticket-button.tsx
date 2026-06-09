import { motion } from 'motion/react'
import { Flex, Image, Text, chakra } from '@chakra-ui/react'
import {
  claimButtonPopReducedVariants,
  claimButtonPopVariants,
} from '../../lib/motion-presets'
import { useReducedMotion } from '../../lib/use-reduced-motion'

const ClaimButtonRoot = chakra('button')
const ClaimCtaFace = chakra('div')
const MotionBox = motion.create(Flex)

interface ClaimTicketButtonProps {
  label: string
  onClick?: () => void
  isInactive?: boolean
  isProminent?: boolean
  displayOnly?: boolean
}

const faceStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  w: 'full',
  py: '10px',
  pl: '16px',
  pr: '14px',
  borderRadius: '8px',
  bg: '#000000',
  color: '#ffffff',
  border: 'none',
  textDecoration: 'none',
  transition: 'transform 0.15s ease',
  transitionProperty: 'transform',
} as const

export function ClaimTicketButton({
  label,
  onClick,
  isInactive = false,
  isProminent = false,
  displayOnly = false,
}: ClaimTicketButtonProps) {
  const prefersReducedMotion = useReducedMotion()
  const popVariants = prefersReducedMotion
    ? claimButtonPopReducedVariants
    : claimButtonPopVariants

  const handleButtonClick = () => {
    if (isInactive || displayOnly) return
    if (onClick) onClick()
  }

  const boxShadow = isProminent
    ? '0 4px 14px rgba(0,0,0,0.35), 0 10px 28px rgba(0,0,0,0.28)'
    : '0 1px 1.5px rgba(0,0,0,0.08)'

  const labelContent = (
    <>
      <Text
        fontSize="14px"
        fontWeight="600"
        lineHeight="19.2px"
        color="#ffffff"
        letterSpacing="-0.14px"
        whiteSpace="nowrap"
        pointerEvents="none"
      >
        {label}
      </Text>
      <Flex align="center" justify="center" flexShrink={0} w="25px" h="14px" pointerEvents="none">
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
    </>
  )

  const control = displayOnly ? (
    <ClaimCtaFace aria-hidden boxShadow={boxShadow} {...faceStyles}>
      {labelContent}
    </ClaimCtaFace>
  ) : (
    <ClaimButtonRoot
      type="button"
      aria-label={label}
      aria-disabled={isInactive}
      boxShadow={boxShadow}
      cursor={isInactive ? 'default' : 'pointer'}
      onClick={handleButtonClick}
      _active={isInactive ? undefined : { transform: 'scale(0.96)' }}
      {...faceStyles}
    >
      {labelContent}
    </ClaimButtonRoot>
  )

  if (!isProminent) return control

  return (
    <MotionBox
      w="full"
      initial="initial"
      animate="animate"
      variants={popVariants}
    >
      {control}
    </MotionBox>
  )
}
