import { AspectRatio, Box, Button, Container, Divider, Flex, Text, FormControl, FormLabel, HStack, IconButton, Input, InputGroup, InputLeftElement, Link, Stack, StackDivider, ModalOverlay, ModalCloseButton, Modal, ModalBody, ModalContent, ModalFooter, Center } from "@chakra-ui/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { CgMail, CgPassword, CgVoicemail } from "react-icons/cg";
import { FaGithub } from "react-icons/fa";

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
                    <Container width={"full"} pt="4">
                        <Flex
                            width="full"
                            justifyContent="center"
                            paddingBottom={4}
                        >
                            <AspectRatio as="figure" flexShrink={0} w={28} h={28} ratio={1}>
                                <Box overflow="hidden" rounded="full">
                                    <Image layout="fill" alt="my profile" src="/images/profile.png" />
                                </Box>
                            </AspectRatio>
                        </Flex>

                        <Stack spacing={2} pb={2}>
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
                        </Stack>
                        <HStack py="6" justifyContent={"end"}>
                            <IconButton
                                size="sm"
                                rounded="full"
                                variant="outline"
                                colorScheme={"gray"}
                                aria-label={"Github"}
                                icon={<FaGithub />}
                            >
                            </IconButton>
                            <IconButton
                                size="sm"
                                rounded="full"
                                variant="outline"
                                aria-label={"Github"}
                                icon={<FcGoogle/>}
                            >
                                
                            </IconButton>
                        </HStack>
                        <Divider />
                        <Flex justifyContent={"flex-end"} py="4">
                            <Button fontSize="xs">Sign up</Button>
                        </Flex>
                    </Container>
                </ModalBody>
            </ModalContent>
        </Modal>

    )
}

export default LoginForm