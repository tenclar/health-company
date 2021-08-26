import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
} from "@chakra-ui/react";
import { forwardRef, ForwardRefRenderFunction } from "react";

import { FieldError } from 'react-hook-form'
interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputComp: ForwardRefRenderFunction<HTMLInputElement, InputProps>  = (
  { name, label, error = null, ...rest }, ref ) => {

  return (
    <FormControl isInvalid={!!error} >
      {!!label && <FormLabel key={name} htmlFor={name}> {label}</FormLabel>}
      <ChakraInput

        name={name}
        id={name}
        focusBorderColor="blue.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{ bgColor: "gray.900" }}
        soze="lg"
        ref={ref}
        {...rest}
      />
      {
        !!error && (
          <FormErrorMessage>
            {error.message}
          </FormErrorMessage>
        )
      }
    </FormControl>
  );
};

export const InputText = forwardRef(InputComp);