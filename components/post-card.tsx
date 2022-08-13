import { Badge, Heading, HStack, LinkBox, LinkOverlay, StackDivider, Text, VStack } from "@chakra-ui/react";
import NextLink from 'next/link';
import Image from 'next/image';
import { Global } from "@emotion/react";
import dayjs from "dayjs"


export interface IPostCardProps {
    id: string,
    title: string,
    desc: string,
    thumbnail?: string,
    href: string,
    createdTime: string,
    pageTags: string[],
    pageStatus?: string,
}

// TODO: how to handle thumnail empty case;
export default function PostCard(props: IPostCardProps) {
    const { title, desc, thumbnail, href, createdTime, pageTags, pageStatus } = props;
    const loadingImage = `/images/image_loading.svg`;
    return (
        <LinkBox as="article" >
            <HStack
                p={{ base: 0, md: 2 }}
                _hover={{
                    bg: 'gray.100',
                    transform: 'scale(1.05, 1.05)',
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
                <Image
                    src={thumbnail ?? loadingImage}
                    alt={title}
                    className="post-item-thumbnail"
                    placeholder='blur'
                    blurDataURL={loadingImage}
                    width='100%'
                    height='100%'
                    loading="lazy" />
                <VStack alignItems="streach"
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
                            <Text fontSize="sm" color="gray.500">
                                {
                                    pageTags.map((name) => (
                                        <Badge key={name} colorScheme="teal">
                                            {name}
                                        </Badge>
                                    ))
                                }
                            </Text>
                        </HStack>
                    </VStack>
                    <Text color="gray.500" fontSize="sm" >
                        {desc}
                    </Text>
                </VStack>
            </HStack>
        </LinkBox>
    )
}

export const PostCardStyle = () => (
    <Global styles={
        `.post-item-thumbnail {
            border-radius: 6px;
        }`
    } />

)