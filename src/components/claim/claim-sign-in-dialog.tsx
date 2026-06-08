import { CircleNotch } from '@phosphor-icons/react'
import { Box, Flex, Image, Separator, Text, VStack, chakra } from '@chakra-ui/react'
import { Dialog } from '@base-ui/react/dialog'
import { useEffect, useState } from 'react'
import { mergeClassNames } from '../../lib/merge-class-names'
import { useModalClasses } from '../../lib/use-modal-classes'
import type { ClaimTicket } from '../../types/claim'

const ContinueButton = chakra('button')
const CancelButton = chakra('button')

const OIDC_SCOPES = [
  'View your profile',
  'Claim tickets on your behalf',
] as const

const LOGO_URL = '/assets/kyd-labs-logo.png'

interface ClaimSignInDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  claim: ClaimTicket
  onContinue: () => void | Promise<void>
}

export function ClaimSignInDialog({
  open,
  onOpenChange,
  claim,
  onContinue,
}: ClaimSignInDialogProps) {
  const [hasOpened, setHasOpened] = useState(false)
  const [isContinuing, setIsContinuing] = useState(false)
  const { className: modalClassName } = useModalClasses(open)

  useEffect(() => {
    if (open) setHasOpened(true)
  }, [open])

  const handleContinue = async () => {
    if (isContinuing) return

    setIsContinuing(true)
    try {
      await onContinue()
    } finally {
      setIsContinuing(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange} modal>
      {hasOpened ? (
        <Dialog.Portal>
          <Dialog.Backdrop
            render={(props) => (
              <div
                {...props}
                style={{
                  position: 'fixed',
                  inset: 0,
                  background: 'rgba(0, 0, 0, 0.72)',
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
                    background: '#0a1219',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '16px',
                    padding: '24px',
                    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.5)',
                    pointerEvents: 'auto',
                    ...props.style,
                  }}
                />
              )}
            >
              <VStack gap="16px" align="stretch" textAlign="center">
                <Flex justify="center">
                  <Image
                    src={LOGO_URL}
                    alt="KYD Labs"
                    w="53px"
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
                        StubHub wants to connect to your KYD Labs account to claim
                        tickets for {claim.eventTitle}.
                      </Text>
                    )}
                  />
                </VStack>

                <VStack
                  as="ul"
                  gap="8px"
                  align="stretch"
                  listStyleType="none"
                  m={0}
                  p={0}
                  textAlign="left"
                >
                  {OIDC_SCOPES.map((scope) => (
                    <Box as="li" key={scope}>
                      <Text
                        fontSize="13px"
                        lineHeight="1.4"
                        color="rgba(255, 255, 255, 0.5)"
                      >
                        {scope}
                      </Text>
                    </Box>
                  ))}
                </VStack>

                <Separator orientation="horizontal" borderColor="border.subtle" />

                <VStack gap="12px" align="stretch">
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
                    cursor={isContinuing ? 'not-allowed' : 'pointer'}
                    opacity={isContinuing ? 0.7 : 1}
                    disabled={isContinuing}
                    onClick={handleContinue}
                    aria-label="Continue sign in"
                    transition="transform 0.15s ease"
                    transitionProperty="transform"
                    _active={isContinuing ? undefined : { transform: 'scale(0.96)' }}
                  >
                    {isContinuing ? (
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
                    ) : null}
                    <Text
                      fontSize="18px"
                      fontWeight="700"
                      lineHeight="1.1"
                      color="cta.fg"
                    >
                      {isContinuing ? 'Continuing…' : 'Continue'}
                    </Text>
                  </ContinueButton>

                  <Dialog.Close
                    render={(props) => (
                      <CancelButton
                        {...props}
                        type="button"
                        w="full"
                        bg="transparent"
                        border="none"
                        p="4px"
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

                <Text fontSize="12px" lineHeight="1.4" color="rgba(255, 255, 255, 0.5)">
                  By continuing, you agree to KYD Labs Terms of Service and Privacy
                  Policy.
                </Text>
              </VStack>
            </Dialog.Popup>
          </Dialog.Viewport>
        </Dialog.Portal>
      ) : null}
    </Dialog.Root>
  )
}
