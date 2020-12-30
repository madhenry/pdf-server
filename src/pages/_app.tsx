import { ChakraProvider } from '@chakra-ui/react'
import { SWRConfig } from 'swr'

import theme from '../theme'
import { AppProps } from 'next/app'
import { createStandaloneToast } from "@chakra-ui/react"
import axios from 'axios'

const toast = createStandaloneToast()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <SWRConfig 
        value={{
          fetcher: url => axios.get(url).then(res => res.data),
          onError: (error) => {
            if (error.status !== 403 && error.status !== 404) {
              toast({
                title: "An error occurred.",
                description: error?.response?.data?.error,
                status: "error",
                duration: 9000,
                isClosable: true,
              })
            }
          }
        }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  )
}

export default MyApp
