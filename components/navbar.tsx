import Logo from "./logo";
import NextLink from "next/link";
import { useContext, useEffect, useState } from 'react';
import {
    Container,
    Box,
    Heading,
    Flex,
    IconButton,
    useColorModeValue,
    Tooltip,
    Modal,
    useDisclosure,
    ModalOverlay,
    ModalCloseButton,
    ModalContent,
    ModalBody,
    ModalFooter
} from "@chakra-ui/react";
import ThemeToggleButton from "./ThemeToggleButton";
import { CmdPaletteContext } from "../providers/cmd-palette-provider";
import { FiCommand, FiLogIn } from 'react-icons/fi';
import LoginForm from "./LoginForm";

export interface ILinkItemProps {
    href: string,
    path: string,
    target?: string,
    children: React.ReactNode,
    [x: string]: any;
}


const NavBar = (props: {
    path: string,
    [x: string]: any
}) => {
    const { path } = props;
    const { open: openCommandPalette } = useContext(CmdPaletteContext);
    const [shortcut, setShortcut] = useState<string>();
    const {isOpen, onOpen, onClose} = useDisclosure();
    useEffect(() => {
        setShortcut(
            navigator.userAgent.indexOf('Mac OS X') != -1 ? 'Cmd + P' : 'Ctrl + P'
        );
    }, [setShortcut]);


    return (
        <Box
            position="fixed"
            as="nav"
            w="100%"
            bg={useColorModeValue('#ffffff40', '#20202380')}
            css={{ backdropFilter: 'blur(10px)' }}
            zIndex="sticky"
            {...props}
            insetX={0}
            transitionDuration="normal"
            transitionProperty="background"
        >
            <Container
                display="flex"
                p={2}
                maxW="container.md"
                flexWrap="wrap"
                alignItems="center"
                justifyContent="space-between"
            >
                <Flex align="center" mr={5}>
                    <Heading as="h1" size="lg" letterSpacing={'tighter'}>
                        <Logo />
                    </Heading>
                </Flex>

                <Flex flex={1} justifyContent="right">
                    <ThemeToggleButton />
                    <Tooltip label={`Command Palette (${shortcut})`} modifiers={[
                        {
                            name: "preventOverflow",
                            options: {
                                padding: 8
                            }
                        }
                    ]}>
                        <IconButton
                            aria-label="Command"
                            icon={<FiCommand />}
                            onClick={openCommandPalette}
                            size="sm"
                            variant="ghost"
                        />
                    </Tooltip>

                    <Tooltip label={`Login`} modifiers={[
                        {
                            name: "preventOverflow",
                            options: {
                                padding: 8
                            }
                        }
                    ]}>
                        <IconButton
                            aria-label="Login"
                            icon={<FiLogIn />
                            }
                            size="sm"
                            onClick={onOpen}
                            variant="ghost">

                        </IconButton>
                    </Tooltip>
                    <LoginForm isOpen={isOpen} onClose={onClose} />
                    
                </Flex>

                {/* <Stack
                    direction={{ base: 'column', md: 'row' }}
                    display={{ base: 'none', md: 'flex' }}
                    width={{ base: 'full', md: 'auto' }}
                    alignItems="center"
                    flexGrow={1}
                    mt={{ base: 4, md: 0 }}
                >
                    <LinkItem href="/works" path={path}>
                        Works
                    </LinkItem>
                    <LinkItem href="/blogs" path={path}>
                        Blog
                    </LinkItem>
                    <LinkItem href="/resume" path={path}>
                        Resume
                    </LinkItem>
                </Stack> */}

                {/* <Box ml={2} display={{ base: 'inline-block', md: 'none' }}>
                        <Menu isLazy id="navbar-menu">
                            <MenuButton
                                as={IconButton}
                                icon={<HamburgerIcon />}
                                variant="outline"
                                aria-label="Options"
                            />
                            <MenuList>
                                <NextLink href="/" passHref>
                                    <MenuItem as={Link}>About</MenuItem>
                                </NextLink>
                                <NextLink href="/works" passHref>
                                    <MenuItem as={Link}>Works</MenuItem>
                                </NextLink>
                                <NextLink href="/posts" passHref>
                                    <MenuItem as={Link}>Posts</MenuItem>
                                </NextLink>
                                <NextLink href="/resume" passHref>
                                    <MenuItem as={Link}>Resume</MenuItem>
                                </NextLink>
                            </MenuList>
                        </Menu>
                    </Box> */}
            </Container>
        </Box >
    )
}

export default NavBar;