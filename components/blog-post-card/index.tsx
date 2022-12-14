import { Badge, Heading, HStack, LinkBox, LinkOverlay, StackDivider, Text, VStack, Icon, useBreakpointValue, Box, Flex, Button, Stack, useColorModeValue } from "@chakra-ui/react";
import NextLink from 'next/link';
import { Global } from "@emotion/react";
import dayjs from "dayjs"
import { FiArrowRight } from "react-icons/fi";
import { BlogPost } from "../../types/blog-post";


// TODO: how to handle thumnail empty case;
export default function PostCard(props: BlogPost) {
    const { desc, href, createdTime, pageTags } = props;
    const hidePointer = useBreakpointValue({ base: true, md: false });
    const tagColorSchema = useColorModeValue("blue", "purple");
    return (
        <LinkBox as="article" role="group" position="relative">
            <HStack
                p={{ base: 1, md: 3 }}
                _hover={{
                    bg: 'gray.100',
                    transform: 'scale(1.02, 1.02)',
                }}
                _dark={{
                    _hover: {
                        bg: 'gray.700'
                    }
                }}
                rounded="md"
                transitionDuration="slow"
                transitionTimingFunction="ease-out"
                transitionProperty="all">
                <VStack
                    alignItems="streach"
                    w="full"
                >
                    <VStack alignItems={"flex-start"}>
                        <NextLink href={href} passHref scroll={false}>
                            <LinkOverlay>
                                <Heading size='sm'> {props.title} </Heading>
                            </LinkOverlay>
                        </NextLink>
                        <HStack
                            divider={<StackDivider mx={2} color="gray.500" />}
                            align="center"
                        >
                            <Text fontSize="sm" color="gray.500">
                                {dayjs(createdTime).format("YYYY-MM-DD")}
                            </Text>
                            <HStack>
                                {
                                    pageTags.map((name) => (
                                        <Text fontSize="sm" color="gray.500" key={name}>
                                            <Badge colorScheme={tagColorSchema}>
                                                {name}
                                            </Badge>
                                        </Text>

                                    ))
                                }
                            </HStack>

                        </HStack>
                    </VStack>
                    <Text color="gray.500" fontSize="sm" >
                        {desc}
                    </Text>
                </VStack>
                {/* For published page */}
                {
                    <HStack
                        justifyContent="flex-start"
                        w={12}
                        hidden={hidePointer}
                    >
                        <Icon
                            as={FiArrowRight}
                            boxSize={6}
                            color="gray.500"
                            opacity={0}
                            _groupHover={{ ml: 6, opacity: 1 }}
                            transitionDuration="slow"
                            transitionProperty="all"
                            transitionTimingFunction="ease-out"
                        />
                    </HStack>
                }
                {/* For locked page */}
                {
                    false &&
                    <Flex position="absolute"
                        zIndex="docked"
                        rounded="md"
                        alignItems="streach"
                        inset={0}
                        align="center"
                        justify="center"
                        bg="transparent"
                        id="overlay"
                        style={{
                            margin: 0
                        }}
                        _groupHover={{
                            bg: 'blackAlpha.500',
                        }}
                        transitionDuration="slow"
                        transitionTimingFunction="ease-out"
                    >
                        <Flex direction={"row"} alignItems={"center"}>
                            <Button size="sm" opacity={1}
                                _groupHover={{ opacity: 1 }}
                                transitionDuration="slow"
                                transitionProperty="opacity"
                                disabled
                                transitionTimingFunction="ease-out">Still in draft status</Button>
                        </Flex>

                    </Flex>

                }

            </HStack>

        </LinkBox>
    )
}