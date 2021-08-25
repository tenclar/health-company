import { Flex, Input, Text, Icon, Box } from '@chakra-ui/react';
import { GiHealthNormal } from 'react-icons/gi';
import { RiSearchLine } from 'react-icons/ri';
export function HeaderForm() {
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

          <Text as="span"  mr="4" color="blue.300">
            <GiHealthNormal   />
          </Text>
          Health Customer
          <Text as="span" ml="1" color="blue.300">.</Text>

      </Text>


    </Flex>
  )
}

