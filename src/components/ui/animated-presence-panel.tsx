import { AnimatePresence, motion } from 'motion/react'
import type { ReactNode } from 'react'
import { motionVariants, reducedMotionVariants } from '../../lib/motion-presets'
import { useReducedMotion } from '../../lib/use-reduced-motion'

interface AnimatedPresencePanelProps {
  panelKey: string
  children: ReactNode
  mode?: 'sync' | 'wait' | 'popLayout'
  onEnterComplete?: () => void
}

export function AnimatedPresencePanel({
  panelKey,
  children,
  mode = 'wait',
  onEnterComplete,
}: AnimatedPresencePanelProps) {
  const prefersReducedMotion = useReducedMotion()
  const variants = prefersReducedMotion ? reducedMotionVariants : motionVariants

  return (
    <AnimatePresence initial={false} mode={mode}>
      <motion.div
        key={panelKey}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={variants}
        onAnimationComplete={(definition) => {
          if (definition === 'visible') onEnterComplete?.()
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
