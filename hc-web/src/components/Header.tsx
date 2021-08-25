import { Flex, Input, Text, Icon } from '@chakra-ui/react';
import { GiHealthNormal } from 'react-icons/gi';
import { RiSearchLine } from 'react-icons/ri';
export function Header() {
  return (
    <Flex
      as="header"
      w="100"
      maxWidth={1400}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Text
      as="a"
      href="/"
      display="flex"
      alignItems="center"
      fontSize="30"
      fontWeight="bold"
      letterSpacing="tight"
      w="200"
      paddingLeft="50"
      >
        <Text as="span" mr="4" color="blue.300">
        <GiHealthNormal   />
        </Text>
        Health Customer
        <Text as="span" ml="1" color="blue.300">.</Text>
        </Text>

        <Flex
          as="label"
          flex="1"
          py="4"
          px="8"
          ml="6"
          alignItems="center"
          maxWidth={400}
          alignSelf="conter"
          color="gray.200"
          position="relative"
          bg="gray.800"
          borderRadius="full"
        >
          <Input
            color="gray.50"
            px='4'
            mr='4'
            variant="unstyled"
            placeholder="Buscar na plataforma"
            _placeholder={{ color: 'gray.400'}} />

          <Icon as={RiSearchLine} alignItems="center" />
        </Flex>
    </Flex>
  )
}

