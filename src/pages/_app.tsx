import Header from '@/components/Header'
import { theme } from '@/styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <ToastContainer />

        <Header />

        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}
