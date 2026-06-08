import { CircleNotch } from '@phosphor-icons/react'
import { Box, Flex, Image, Text, VStack, chakra } from '@chakra-ui/react'
import { Dialog } from '@base-ui/react/dialog'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatedPresencePanel } from '../ui/animated-presence-panel'
import { mergeClassNames } from '../../lib/merge-class-names'
import { useModalClasses, getModalCloseMs } from '../../lib/use-modal-classes'
import type { ClaimTicket } from '../../types/claim'
import { ClaimAuthField } from './claim-auth-field'
import { ClaimOtpInput } from './claim-otp-input'

const ContinueButton = chakra('button')
const CancelButton = chakra('button')

const LOGO_URL = '/assets/kyd-logo-white.png'
const MOCK_AUTH_DELAY_MS = 600

type AuthStep = 'phone' | 'code'

interface ClaimAuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onDismissed?: () => void
  claim: ClaimTicket
  onComplete: () => void
}

function getPhoneDigits(phone: string) {
  return phone.replace(/\D/g, '')
}

function isValidPhone(phone: string) {
  return getPhoneDigits(phone).length >= 10
}

function isValidCode(code: string) {
  return /^\d{4}$/.test(code)
}

export function ClaimAuthDialog({
  open,
  onOpenChange,
  onDismissed,
  claim,
  onComplete,
}: ClaimAuthDialogProps) {
  const [hasOpened, setHasOpened] = useState(false)
  const wasOpenRef = useRef(false)
  const [step, setStep] = useState<AuthStep>('phone')
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isSubmittingRef = useRef(false)
  const { className: modalClassName } = useModalClasses(open)

  useEffect(() => {
    if (open) {
      wasOpenRef.current = true
      setHasOpened(true)
      return
    }

    if (!wasOpenRef.current) return

    wasOpenRef.current = false
    const timer = setTimeout(() => onDismissed?.(), getModalCloseMs())
    return () => clearTimeout(timer)
  }, [open, onDismissed])

  useEffect(() => {
    if (open) return

    setStep('phone')
    setPhone('')
    setCode('')
    setIsSubmitting(false)
    isSubmittingRef.current = false
  }, [open])

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen)
  }

  const finishAuth = useCallback(async () => {
    if (isSubmittingRef.current) return

    isSubmittingRef.current = true
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, MOCK_AUTH_DELAY_MS))
      onComplete()
      onOpenChange(false)
    } finally {
      isSubmittingRef.current = false
      setIsSubmitting(false)
    }
  }, [onComplete, onOpenChange])

  const handleContinuePhone = () => {
    if (isSubmitting || !isValidPhone(phone)) return
    setStep('code')
  }

  const handleCodeComplete = useCallback(
    (completedCode: string) => {
      if (!isValidCode(completedCode)) return
      setCode(completedCode)
      finishAuth()
    },
    [finishAuth],
  )

  const isContinueDisabled = isSubmitting || !isValidPhone(phone)

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange} modal>
      {hasOpened ? (
        <Dialog.Portal>
          <Dialog.Backdrop
            render={(props) => (
              <div
                {...props}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.55)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  zIndex: 50,
                  ...props.style,
                }}
              />
            )}
          />

          <Dialog.Viewport
            render={(props) => (
              <div
                {...props}
                style={{
                  position: 'fixed',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  zIndex: 51,
                  pointerEvents: 'none',
                  ...props.style,
                }}
              />
            )}
          >
            <Dialog.Popup
              render={(props) => (
                <div
                  {...props}
                  className={mergeClassNames(modalClassName, props.className)}
                  style={{
                    width: '100%',
                    maxWidth: '327px',
                    background: '#111111',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.55)',
                    pointerEvents: 'auto',
                    ...props.style,
                  }}
                />
              )}
            >
              <VStack gap="20px" align="stretch" textAlign="center">
                <Flex justify="center">
                  <Image
                    src={LOGO_URL}
                    alt="KYD Labs"
                    w="72px"
                    h="auto"
                    objectFit="contain"
                  />
                </Flex>

                <VStack gap="8px" align="stretch">
                  <Dialog.Title
                    render={(props) => (
                      <Text
                        {...props}
                        as="h2"
                        fontSize="20px"
                        fontWeight="700"
                        lineHeight="1.2"
                        color="text.primary"
                      >
                        Sign in with KYD Labs
                      </Text>
                    )}
                  />

                  <Dialog.Description
                    render={(props) => (
                      <Text
                        {...props}
                        fontSize="14px"
                        lineHeight="1.5"
                        color="text.secondary"
                      >
                        Continue to{' '}
                        <Text as="span" fontWeight="600" color="text.primary">
                          {claim.partner}
                        </Text>
                      </Text>
                    )}
                  />
                </VStack>

                <AnimatedPresencePanel panelKey={step} mode="wait">
                  {step === 'phone' ? (
                    <ClaimAuthField
                      id="claim-auth-phone"
                      label="Phone Number"
                      value={phone}
                      onChange={setPhone}
                      placeholder="+15555555555"
                      inputMode="tel"
                      autoComplete="tel"
                    />
                  ) : (
                    <ClaimOtpInput
                      id="claim-auth-code"
                      label="Verification code"
                      value={code}
                      onChange={setCode}
                      onComplete={handleCodeComplete}
                    />
                  )}
                </AnimatedPresencePanel>

                {isSubmitting ? (
                  <Flex justify="center" py="8px" gap="8px" align="center">
                    <Box
                      as="span"
                      display="inline-flex"
                      animation="spin"
                      animationDuration="0.8s"
                      animationTimingFunction="linear"
                      animationIterationCount="infinite"
                    >
                      <CircleNotch size={18} weight="bold" aria-hidden />
                    </Box>
                    <Text fontSize="14px" color="text.secondary">
                      Verifying…
                    </Text>
                  </Flex>
                ) : null}

                <VStack gap="12px" align="stretch">
                  {step === 'phone' ? (
                    <ContinueButton
                      type="button"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      gap="8px"
                      w="full"
                      h="50px"
                      px="16px"
                      borderRadius="12px"
                      bg="cta.bg"
                      color="cta.fg"
                      border="none"
                      cursor={isContinueDisabled ? 'not-allowed' : 'pointer'}
                      opacity={isContinueDisabled ? 0.5 : 1}
                      disabled={isContinueDisabled}
                      onClick={handleContinuePhone}
                      aria-label="Continue sign in"
                      transition="transform 0.15s ease"
                      transitionProperty="transform"
                      _active={isContinueDisabled ? undefined : { transform: 'scale(0.96)' }}
                    >
                      <Text
                        fontSize="18px"
                        fontWeight="700"
                        lineHeight="1.1"
                        color="cta.fg"
                      >
                        Continue
                      </Text>
                    </ContinueButton>
                  ) : null}

                  <Dialog.Close
                    render={(props) => (
                      <CancelButton
                        {...props}
                        type="button"
                        w="full"
                        bg="transparent"
                        border="none"
                        py="8px"
                        cursor="pointer"
                        color="text.secondary"
                        fontSize="14px"
                        fontWeight="500"
                        lineHeight="1.4"
                        _hover={{ color: 'text.primary' }}
                      >
                        Cancel
                      </CancelButton>
                    )}
                  />
                </VStack>
              </VStack>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      ) : null}
    </Dialog.Root>
  )
}
