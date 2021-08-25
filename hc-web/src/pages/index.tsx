import { Box, Button, Divider, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { RiAddLine, RiRefreshLine } from "react-icons/ri";
import { Header } from "../components/Header";


export default function Home() {
  return (
    <Box>
    <Header />
     <Flex w="100" my="6" maxWidth={1080} mx="auto" px="6" >
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal"> Clientes</Heading>


            <Button 
            as="a" 
            size="sm" 
            fontSize="sm" 
            colorScheme="blue"
            leftIcon={<Icon as={RiAddLine} />}
             >
              Novo Cliente
            </Button>
          </Flex>
          <Divider />
      <Table >
       <Thead  >
         <Tr>
           <Th px="6" textAlign="center"  color="yellow.300" width="8" >
             #
           </Th>
           <Th textAlign="center" color="yellow.300" >
             Cliente
           </Th>
           <Th  textAlign="center" color="yellow.300" > 
             CPF
           </Th>
           <Th  textAlign="center" color="yellow.300">
             Data nascimento
           </Th>
           <Th textAlign="center" color="yellow.300">
             Ações
           </Th>
         </Tr>
       </Thead>
       <Tbody>
         <Tr>
           <Td textAlign="center" >
                1
           </Td> 
           <Td textAlign="center">
                Tenclar
           </Td>
           <Td textAlign="center">
                123.456.789-00
           </Td>
           <Td textAlign="center">
                01-18-2020
           </Td>
           <Td textAlign="center">
           <Button 
            as="a" 
            size="sm" 
            fontSize="sm" 
            colorScheme="green"
            
            leftIcon={<Icon as={RiRefreshLine} />}
             >
             Editar 
            </Button>
           </Td>
         </Tr>
       </Tbody>
     </Table>
        </Box>
      
     </Flex>
     
   </Box>
  )
}
