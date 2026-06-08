import type { Transition, Variants } from 'motion/react'

export const motionSpring: Transition = {
  type: 'spring',
  duration: 0.3,
  bounce: 0,
}

export const motionVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: motionSpring,
  },
  exit: {
    opacity: 0,
    y: -12,
    filter: 'blur(4px)',
    transition: { duration: 0.15, ease: 'easeIn' },
  },
}

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
}

/** Fast collapsed ↔ expanded swap — no blur on the container (make-interfaces: don't animate one big block). */
export const lineupViewVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.12, ease: 'easeIn' },
  },
}

export const lineupReducedViewVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.12 } },
  exit: { opacity: 0, transition: { duration: 0.08 } },
}

/** Row stagger orchestration — ~80ms between rows per make-interfaces-feel-better. */
export const lineupListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

export const lineupReducedListVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.05 },
  },
}

export const lineupRowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { type: 'spring', duration: 0.25, bounce: 0 },
  },
}

export const lineupReducedRowVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.12 } },
}

export const claimButtonPopVariants: Variants = {
  initial: { scale: 0.94, opacity: 0.88 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', duration: 0.45, bounce: 0.12 },
  },
}

export const claimButtonPopReducedVariants: Variants = {
  initial: { opacity: 0.88 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
}
