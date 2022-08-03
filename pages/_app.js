import { ContextProvider } from '../src/context/Provider/ContextProvider'
import '../styles/globals.css'
import { ApiPromise, WsProvider } from "@polkadot/api";
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react'
import { SideMenu } from '../src/components/SideMenu'

function MyApp({ Component, pageProps }) {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    const connectToApi = async () => {
      const wsProvider = new WsProvider('wss://rpc.polkadot.io');
      const api = await ApiPromise.create({ provider: wsProvider });
      setData(api)
    }
      connectToApi()
  }, [])

  return (
    <ChakraProvider>
    <ContextProvider.Provider value={{data}}>
    <SideMenu />
      {data && <Component {...pageProps} />}
    </ContextProvider.Provider>
    </ChakraProvider>
  )
}

export default MyApp
