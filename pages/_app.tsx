import Layout from "../components/layouts/main";
import Fonts from "../components/fonts";
import { AnimatePresence } from "framer-motion";
import type { AppProps } from 'next/app'
import 'react-notion-x/src/styles.css'
import 'prismjs/themes/prism-tomorrow.css'
import { ChakraProvider, useColorMode, useTheme } from "@chakra-ui/react";
import theme from "../lib/theme";
import CmdPaletteProvider from "../providers/cmd-palette-provider";
import CmdPalette from "../components/cmd-palette-provider";
import { SessionProvider } from "next-auth/react";

if (typeof window !== "undefined") {
  window.history.scrollRestoration = "manual";
}


function Website({ Component, pageProps, router }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <ChakraProvider theme={theme}>
        <Fonts />
        <CmdPaletteProvider>
          <AnimatePresence initial={true} onExitComplete={() => {
            if (typeof window !== "undefined") {
              window.scrollTo({ top: 0 })
            }
          }}>
            <Layout router={router} key={router.route}>
              <Component {...pageProps} />
            </Layout>
            <CmdPalette />
          </AnimatePresence>
        </CmdPaletteProvider>
      </ChakraProvider >
    </SessionProvider>
  )
}

export default Website
