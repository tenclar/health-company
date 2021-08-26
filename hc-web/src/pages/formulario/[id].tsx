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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from "@chakra-ui/react";
import { RiAddLine, RiCloseLine } from "react-icons/ri";
import { InputText } from "../../components/Form/Input";
import { HeaderForm } from "../../components/HeaderForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { parse, isDate } from "date-fns";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useRef, useEffect } from "react";
import { useRouter } from 'next/router';
import getValidationErrors from "../../utils/getValidationErrors";
import { useToast } from "../../hooks/Toast";
import api from "../../services/api";


type AddresFormData = {
  id: number;
  logradouro: string;
  numero: number;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;

};
type CreateFormData = {
  nome: string;
  cpf: string;
  datanascimento: Date;
  address?:AddresFormData[];
};

export default function formulario() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = useRef()
  const finalRef = useRef()

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
      if(!originalValue){
      const parsedDate = isDate(originalValue)
        ? originalValue
        : parse(originalValue, "yyyy-MM-dd", new Date());

      return parsedDate;
    }
  }



  const { register, handleSubmit, formState, setValue } = useForm({
    resolver: yupResolver(formShema)
  });
    const { errors } = formState;

  /*   useEffect(() => {
      customer(id as string).then(customer => {
        const fields = ['name'];

        fields.forEach(field => setValue(field, customer[field]));
        setCustomer(customer);
      })
    }, []); */

  useEffect(() => {
    async function showCustomer(id: string | string[]): Promise<void> {
      const response = await api.get(`/customers/${id}`);
      setCustomer(response.data);

       const address = response.data.address.map((a: any) => ({
        customer_id: a.customer_id,
      }));

      /*  formRef.current?.setData({
        nome: response.data.nome,
        cpf: response.data.cpf,
        datanascimento:response.data.datanascimento,
        address: address,
      }); */
    }
    if (query.id) {
      showCustomer(query.id);
    }
  }, [query.id, setValue]);



  const handleSave: SubmitHandler<CreateFormData> = async (data) => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    try{
        if (query.id) {
          await api.put(`/customers/${query.id}`, {
            nome: data.nome,
            cpf: data.cpf,
            datanascimento:data.datanascimento,
            address:data.address
          });

          push('/');
        }
      } catch (err) {

        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Erro no Cadastro',
          description: `Ocorreu um erro ao fazer Cadastro. ${err}`,
        });
      }
    };



  return (
    <>
    <Box>
      <HeaderForm />
      <Flex w="100" my="6" maxWidth={1080} mx="auto" px="6">
        <Box
          as="form"
          ref={formRef}

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
                defaultValue={customer?.nome}
                name="nome"
                label="Nome Completo"
                error={errors.nome}
                {...register('nome')}
              />

              <InputText
                defaultValue={customer?.cpf}
                name="cpf"
                label="CPF"
                error={errors.cpf}
                {...register("cpf")}
              />
              <InputText
                defaultValue={String(customer?.datanascimento)}
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
                        onClick={onOpen}
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
                      CEP
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



                    { customer?.address.map((addr) => (
                  <Tr key={addr.id} >
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
                    <Td textAlign="center">{`${addr.logradouro},${addr.numero}`}</Td>
                    <Td textAlign="center">{addr.complemento}</Td>
                    <Td textAlign="center">{addr.cep}</Td>
                    <Td textAlign="center">{addr.bairro}</Td>
                    <Td textAlign="center">{addr.cidade}</Td>
                    <Td textAlign="center">{addr.estado}</Td>

                  </Tr>
                    ))}
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


<Modal
initialFocusRef={initialRef}
finalFocusRef={finalRef}
isOpen={isOpen}
onClose={onClose}
>
<ModalOverlay />
<ModalContent bgColor="gray.800" >
  <ModalHeader>Cadastro de Endereço</ModalHeader>
  <ModalCloseButton />
  <ModalBody pb={8}>
    <FormControl>
      <FormLabel>Logradouro</FormLabel>
      <Input ref={initialRef} placeholder="Logradouro"  />
    </FormControl>


    <FormControl mt={4}>
      <FormLabel>Numero</FormLabel>
      <Input placeholder="Numero" />
    </FormControl>
    <FormControl mt={4}>
      <FormLabel>Complemento</FormLabel>
      <Input placeholder="Complemento" />
    </FormControl>
    <FormControl mt={4}>
      <FormLabel>CEP</FormLabel>
      <Input placeholder="CEP" />
    </FormControl>
    <FormControl mt={4}>
      <FormLabel>Bairro</FormLabel>
      <Input placeholder="Bairro" />
    </FormControl>
    <FormControl mt={4}>
      <FormLabel>Cidade</FormLabel>
      <Input placeholder="Cidade" />
    </FormControl>
    <FormControl mt={4}>
      <FormLabel>Estado</FormLabel>
      <Input placeholder="Estado" />
    </FormControl>
  </ModalBody>

  <ModalFooter>
    <Button colorScheme="blue" mr={3}>
      Save
    </Button>
    <Button onClick={onClose}>Cancel</Button>
  </ModalFooter>
</ModalContent>
</Modal>
</>
  );
}
