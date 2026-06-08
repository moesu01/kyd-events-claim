import { Flex, Image, Text, chakra } from '@chakra-ui/react'

const ClaimButtonRoot = chakra('button')

interface ClaimTicketButtonProps {
  label: string
  onClick?: () => void
}

export function ClaimTicketButton({ label, onClick }: ClaimTicketButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
      return
    }
    console.log('claim ticket')
  }

  return (
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
      cursor="pointer"
      boxShadow="0 1px 1.5px rgba(0,0,0,0.08)"
      onClick={handleClick}
      aria-label={label}
      transition="transform 0.15s ease"
      transitionProperty="transform"
      _active={{ transform: 'scale(0.96)' }}
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
}
