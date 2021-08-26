/* eslint-disable react-hooks/rules-of-hooks */
import * as Yup from "yup";
import {
  Box,
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
  VStack,
  Button,
  SimpleGrid,
  HStack,
} from "@chakra-ui/react";
import { RiAddLine, RiCloseLine } from "react-icons/ri";
import { InputText } from "../../components/Form/Input";
import { HeaderForm } from "../../components/HeaderForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { parse, isDate } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useRouter } from 'next/router';
import getValidationErrors from "../../utils/getValidationErrors";
import api from "../../services/api";
import { useToast } from "../../hooks/Toast";

interface CreateFormData {
  nome: string;
  cpf: string;
  datanascimento: Date;
  address?:[];
};

export default function formulario() {
  const formRef = useRef(null);
  const { addToast } = useToast();
  const [customer, setCustomer] = useState<CreateFormData>();
  const {push, query } = useRouter();

  const formShema = Yup.object().shape({
    nome: Yup.string().required(),
    cpf: Yup.string().max(11).required(),
    datanascimento: Yup.date().transform(parseDateString).required(),
  });

  function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
      ? originalValue
      : parse(originalValue, "yyyy-MM-dd", new Date());

    return parsedDate;

  }


  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(formShema),
  });

  const { errors } = formState;

  const handleSave: SubmitHandler<CreateFormData> = async (data) => {

    try{

      await api.post('/customers', {
        nome: data.nome,
        cpf: data.cpf,
        datanascimento:data.datanascimento,
        address:data.address
      });


    push('/');
  } catch (err) {

      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        type: 'error',
        title: 'Erro no Cadastro',
        description: 'Ocorreu um erro ao fazer Cadastro.',
      });
    }

  };



  return (
    <Box>
      <HeaderForm />
      <Flex w="100" my="6" maxWidth={1080} mx="auto" px="6">
        <Box
         ref={formRef}
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p="8"
          onSubmit={handleSubmit(handleSave)}
        >
          <Heading size="lg" fontWeight="normal">
            Formulário de Cadastro
          </Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <InputText

                name="nome"
                label="Nome Completo"
                error={errors.nome}
                {...register("nome")}
              />

              <InputText

                name="cpf"
                label="CPF"
                error={errors.cpf}
                {...register("cpf")}
              />
              <InputText

                type="date"
                name="datanscimento"
                label="Data de Nascimento"
                error={errors.datanascimento}
                {...register("datanascimento")}
              />
            </SimpleGrid>
            <SimpleGrid minChildWidth="240px" spacing="8" w="100%">
              <Table>
                <Thead>
                  <Tr>
                    <Th textAlign="center" color="yellow.300">
                      <Button
                        as="a"
                        size="sm"
                        fontSize="x-small"
                        colorScheme="blue"
                        leftIcon={<Icon as={RiAddLine} />}
                      >
                        Novo
                      </Button>
                    </Th>
                    <Th textAlign="center" color="yellow.300">
                      Logradouro
                    </Th>
                    <Th textAlign="center" color="yellow.300">
                      Complemento
                    </Th>
                    <Th textAlign="center" color="yellow.300">
                      Bairro
                    </Th>
                    <Th textAlign="center" color="yellow.300">
                      Cidade
                    </Th>
                    <Th textAlign="center" color="yellow.300">
                      Estado
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td textAlign="center">
                      <Button
                        as="a"
                        size="sm"
                        fontSize="x-small"
                        colorScheme="red"
                        leftIcon={<Icon as={RiCloseLine} />}
                      >
                        Excluir
                      </Button>
                    </Td>
                    <Td textAlign="center">Rua das couves, 124</Td>
                    <Td textAlign="center">perto da casa azul</Td>
                    <Td textAlign="center">Casa Preta</Td>
                    <Td textAlign="center">Rio Branco</Td>
                    <Td textAlign="center">AC</Td>
                  </Tr>
                </Tbody>
              </Table>
            </SimpleGrid>
          </VStack>
          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Button as="a" href="/" colorScheme="whiteAlpha">Cancelar</Button>
              <Button type="submit" colorScheme="green">
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
