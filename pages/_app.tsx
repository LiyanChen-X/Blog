import Layout from "../components/layouts/main";
import Fonts from "../components/fonts";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from 'next/app'
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import { ChakraProvider } from "@chakra-ui/react";
import theme from "../lib/theme";

if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}


function Website({ Component, pageProps, router }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Layout router={router}>
        <AnimatePresence exitBeforeEnter initial={true} onExitComplete={() => {
          if (typeof window !== "undefined") {
            window.scrollTo({ top: 0 })
          }
        }}>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      </Layout>
    </ChakraProvider>
  )
}

export default Website
