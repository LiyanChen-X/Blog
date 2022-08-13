import Head from 'next/head'
import dynamic from 'next/dynamic'
import NavBar from '../navbar'
import { Box, Container } from '@chakra-ui/react'
import Footer from '../footer'
import { Router } from 'next/router'
import { PostCardStyle } from '../post-card'


export interface ILayoutProps {
    children: React.ReactNode,
    router: Router
}

const Main = ({ children, router }: ILayoutProps) => {
    return (
        <Box as="main" pb={8}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="description" content="Liyan's blog" />
                <meta name="author" content="Liyan" />
                <link rel="apple-touch-icon" href="apple-touch-icon.png" />
                <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

                <title>Liyan&apos;s blog - Homepage</title>
            </Head>
            <NavBar path={router.asPath} />
            <Container maxW="container.md" pt={14} >
                <Box>
                    {children}
                </Box>
                <Footer />
            </Container>
            <PostCardStyle />
        </Box>
    )
}

export default Main