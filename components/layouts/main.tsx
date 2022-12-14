import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, chakra, ColorMode, Container, useColorMode } from '@chakra-ui/react'
import Footer from '../footer'
import { Router } from 'next/router'
import { motion, useAnimationControls, Variants } from "framer-motion";

export interface ILayoutProps {
    children: React.ReactNode,
    router: Router
}

const variants: Variants = {
    hidden: {
        opacity: 0,
        x: -200,
        y: 0,
    },
    enter: {
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
            duration: 0.5
        }
    },
    exit: {
        opacity: 0,
        x: 200,
        y: 0,
        transition: {
            duration: 0.5
        }
    },
}

const Main = ({ children, router }: ILayoutProps) => {
    const ChakraFooter = chakra(Footer);
    //@expect-ts-error
    return (
        <Box as={motion.main}
            pb={2}
            variants={variants}
            initial="hidden"
            animate="enter"
            exit="exit"
            display="flex"
            flexDirection="column"
            minHeight="100vh"
            boxSizing='border-box'
        >
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Liyan's blog" />
                <meta name="author" content="Liyan" />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

                <title>Liyan&apos;s blog - Homepage</title>
            </Head>
            <NavBar path={router.asPath} />
            <Container maxW="container.md" pt={14} flexGrow={1} pb={8}>
                <Box>
                    {children}
                </Box>
            </Container>
            <ChakraFooter flexGrow={0} flexShrink={0} />
        </Box>
    )
}

export default Main
