import { FormControl, FormLabel, Input, InputProps as ChakraInputProps } from "@chakra-ui/react";

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
}
export function InputText({name, label, ...rest}: InputProps) {
  return(
    <FormControl>
      {!!label && <FormLabel htmlFor={name}> {label}</FormLabel>}
      <Input
        name={name}
        id={name}
        type="text"
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filed"
        _hover={{ bgColor: 'gray.900' }}
        soze='lg'
        {...rest}
      />
    </FormControl>
  )
}