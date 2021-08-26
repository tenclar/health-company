import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';
import AppProvider from '../hooks';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
    <ChakraProvider  theme={theme} >

      <Component {...pageProps} />

    </ChakraProvider>
    </AppProvider>
  )
}

export default MyApp
