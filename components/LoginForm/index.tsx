import { AspectRatio, Box, Button, Container, Divider, Flex, Text, FormControl, FormLabel, HStack, IconButton, Input, InputGroup, InputLeftElement, Link, Stack, StackDivider, ModalOverlay, ModalCloseButton, Modal, ModalBody, ModalContent, ModalFooter, Center } from "@chakra-ui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { CgMail, CgPassword } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";
import { signIn} from "next-auth/react";
import {useRouter} from "next/router";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const LoginForm = ({
    isOpen,
    onClose,
}: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    return (
        <Modal
            size={"xs"}
            isOpen={isOpen}
            onClose={onClose}
            motionPreset="slideInRight"
        >
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton rounded="full" />
                <ModalBody>
                    <Container width={"full"} pt="4" px="2">
                        <Flex
                            width="full"
                            justifyContent="center"
                            paddingBottom={4}
                        >
                            <AspectRatio as="figure" flexShrink={0} w={28} h={28} ratio={1}>
                                <Box overflow="hidden" rounded="full">
                                    <Image layout="fill" alt="my profile" src="/images/avatar.png" />
                                </Box>
                            </AspectRatio>
                        </Flex>

                        <Stack spacing={2} pb={4}>
                            <FormControl>
                                <FormLabel fontSize="xs">Email </FormLabel>
                                <InputGroup variant="flushed" size="sm">
                                    <InputLeftElement>
                                        <CgMail />
                                    </InputLeftElement>
                                    <Input type="email"></Input>
                                </InputGroup>
                            </FormControl>
                            <FormControl pb="2">
                                <FormLabel fontSize="xs">Password</FormLabel>
                                <InputGroup variant="flushed" size="sm">
                                    <InputLeftElement>
                                        <CgPassword />
                                    </InputLeftElement>
                                    <Input type="password"></Input>
                                </InputGroup>
                                <Flex justifyContent="end">
                                    <Link fontSize="xx-small">Forget password?</Link>
                                </Flex>
                            </FormControl>
                            <Button
                                size="sm"
                                rounded="xl"
                                variant="outline"
                            >
                                Sign in
                            </Button>
                            <Button
                                size="sm"
                                rounded="xl"
                                onClick={() => {
                                    signIn("github", { callbackUrl: router.asPath });
                                }}
                                colorScheme={"cyan"}
                                variant="outline"
                                leftIcon={<FaGithub />}
                            >
                                Sign in With Github
                            </Button>
                        </Stack>

                        <Flex justifyContent={"flex-end"} py="2">
                            <Text fontSize="xs">
                                No account yet? <Link >Sign up</Link>
                            </Text>
                        </Flex>
                    </Container>
                </ModalBody>
            </ModalContent>
        </Modal>

    )
}

export default LoginForm
