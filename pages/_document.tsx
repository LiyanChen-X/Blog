import { ColorModeScript } from '@chakra-ui/react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import theme from '../lib/theme'

export default class Document extends NextDocument {
    render() {
        return (
            <Html lang="en" style={{
                height: "100%",
                padding: 0,
                margin: 0,
                boxSizing: "border-box"
            }}>
                <Head />
                <body style={{
                    height: "100%",
                    padding: 0,
                    margin: 0,
                    boxSizing: "border-box"
                }}>
                    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                    <Main />
                    <NextScript />
                </body>
            </Html >
        )
    }
}