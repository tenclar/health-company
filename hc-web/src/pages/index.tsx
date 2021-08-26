import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { RiAddLine, RiRefreshLine } from "react-icons/ri";
import { Header } from "../components/Header";
import loadingGif from '../assets/ajax-loader.gif';
import { useToast } from "../hooks/Toast";
import api from "../services/api";
import Image from 'next/image';
import ptBR from 'date-fns/locale/pt-BR';

import { format  } from "date-fns";

interface Customer {
  id: string;
  nome: string;
  cpf: string;
  datanascimento:string;
}


export default function Home() {

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [args, setArgs] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();


  useEffect(() => {
    async function loadPracas(): Promise<void> {
      try {
        setLoading(true);

        const response = await api.get('customers', {
          params: { nome: args },
        });
        const c = response.data.map(co=>{
          return {
           ...co,
           datanascimento:format(
             new Date(co.datanascimento),
             "dd MMM yyyy",
             {
               locale: ptBR,
             }
           ),
          }
        });


        setCustomers(c);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro na Listagem',
          description: 'Ocorreu um erro ao Carregar os Dados',
        });
      } finally {
        setLoading(false);

      }
    }

    loadPracas();
  }, [args, addToast]);



  return (
    <Box>
      <Header />
      <Flex w="100" my="6" maxWidth={1080} mx="auto" px="6">
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Clientes
            </Heading>


            <Button
              as="a"
              href="/formulario"
              size="sm"
              fontSize="sm"
              colorScheme="blue"
              leftIcon={<Icon as={RiAddLine} />}
            >
              Novo Cliente
            </Button>
          </Flex>
          <Divider />

          <Table>
                <Thead>
                  <Tr>
                    <Th px="6" textAlign="center" color="yellow.300" width="8">
                      #
                    </Th>
                    <Th textAlign="center" color="yellow.300">
                      Cliente
                    </Th>
                    <Th textAlign="center" color="yellow.300">
                      CPF
                    </Th>
                    <Th textAlign="center" color="yellow.300">
                      Data nascimento
                    </Th>
                    <Th textAlign="center" color="yellow.300">
                      Ações
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                    {loading && (
                          <Tr>
                            <Td colSpan={5}>
                              Carregando <Image src={loadingGif} alt="loading" />
                            </Td>
                          </Tr>
                      )}
                      {customers.length === 0 && (
                        <Tr>
                        <Td colSpan={5}> Nenhum Cadastro efetuado </Td>
                      </Tr>
                    )}

                    {customers.map((customer) => (
                  <Tr key={customer.id}>
                    <Td textAlign="center">{customer.id}</Td>
                    <Td textAlign="center">{customer.nome}</Td>
                    <Td textAlign="center">{customer.cpf}</Td>
                    <Td textAlign="center">{customer.datanascimento}</Td>
                    <Td textAlign="center">
                      <Button
                        as="a"
                        href={`/formulario/${customer.id}`}
                        size="sm"
                        fontSize="sm"
                        colorScheme="green"
                        leftIcon={<Icon as={RiRefreshLine} />}
                      >
                        Editar
                      </Button>
                    </Td>
                  </Tr>
                  ))}
                </Tbody>
              </Table>
        </Box>
      </Flex>
    </Box>
  );
}
