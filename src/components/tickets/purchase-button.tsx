import { ShoppingCart } from '@phosphor-icons/react'
import { Box, Text, chakra } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { motionSpring } from '../../lib/motion-presets'
import { useReducedMotion } from '../../lib/use-reduced-motion'

const PurchaseButtonRoot = chakra('button')

export function getPurchaseLabel(ticketCount: number): string {
  if (ticketCount === 0) return 'Get Tickets'
  if (ticketCount === 1) return 'Get 1 Ticket'
  return `Get ${ticketCount} Tickets`
}

interface PurchaseButtonProps {
  ticketCount: number
  onPurchase?: () => void
  isDisabled?: boolean
}

const iconVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.25,
    filter: 'blur(4px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: motionSpring,
  },
  exit: {
    opacity: 0,
    scale: 0.25,
    filter: 'blur(4px)',
    transition: { duration: 0.15, ease: 'easeIn' },
  },
}

const iconReducedVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.08 } },
}

const numberVariants: Variants = {
  initial: {
    opacity: 0,
    y: 4,
    filter: 'blur(2px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.15, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    y: -4,
    filter: 'blur(2px)',
    transition: { duration: 0.15, ease: 'easeIn' },
  },
}

const numberReducedVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.08 } },
}

export function PurchaseButton({
  ticketCount,
  onPurchase,
  isDisabled,
}: PurchaseButtonProps) {
  const disabled = isDisabled ?? false
  const isFilled = ticketCount > 0
  const label = getPurchaseLabel(ticketCount)
  const prefersReducedMotion = useReducedMotion()
  const activeIconVariants = prefersReducedMotion ? iconReducedVariants : iconVariants
  const activeNumberVariants = prefersReducedMotion ? numberReducedVariants : numberVariants

  const handleClick = () => {
    if (disabled) return
    if (onPurchase) {
      onPurchase()
      return
    }
    console.log('checkout')
  }

  return (
    <PurchaseButtonRoot
      type="button"
      className="t-purchase-btn"
      data-filled={isFilled ? 'true' : undefined}
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="full"
      h="50px"
      px="16px"
      borderRadius="12px"
      cursor={disabled ? 'not-allowed' : 'pointer'}
      opacity={disabled ? 0.5 : 1}
      disabled={disabled}
      onClick={handleClick}
      aria-label={label}
      _active={disabled ? undefined : { transform: 'scale(0.96)' }}
    >
      <Box className="t-purchase-btn__fill" bg="cta.bg" aria-hidden />
      <Box className="t-purchase-btn__border" aria-hidden />
      <Box className="t-purchase-btn__content">
        <PurchaseButtonLabel
          ticketCount={ticketCount}
          numberVariants={activeNumberVariants}
        />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexShrink={0}
          w="16px"
          h="16px"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={isFilled ? 'filled' : 'ghost'}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={activeIconVariants}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <ShoppingCart size={16} weight="bold" color="currentColor" aria-hidden />
            </motion.span>
          </AnimatePresence>
        </Box>
      </Box>
    </PurchaseButtonRoot>
  )
}

interface PurchaseButtonLabelProps {
  ticketCount: number
  numberVariants: Variants
}

function PurchaseButtonLabel({ ticketCount, numberVariants }: PurchaseButtonLabelProps) {
  const labelStyles = {
    fontSize: '18px',
    fontWeight: '700',
    lineHeight: '1.1',
    color: 'inherit',
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap',
  } as const

  if (ticketCount === 0) {
    return <Text {...labelStyles}>Get Tickets</Text>
  }

  const ticketWord = ticketCount === 1 ? 'Ticket' : 'Tickets'

  return (
    <Text {...labelStyles}>
      Get{' '}
      <Box
        as="span"
        display="inline-block"
        position="relative"
        verticalAlign="baseline"
        fontVariantNumeric="tabular-nums"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={ticketCount}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={numberVariants}
            style={{ display: 'inline-block' }}
          >
            {ticketCount}
          </motion.span>
        </AnimatePresence>
      </Box>{' '}
      {ticketWord}
    </Text>
  )
}
