import type { GetStaticProps, NextPage } from 'next'
import { FcApproval, FcDocument, FcEditImage, FcEngineering } from "react-icons/fc";
import { HiOutlineSearch } from "react-icons/hi";
import { FaRegSadTear } from "react-icons/fa";
import PostCard from "../../components/blog-post-card"
import { Box, BoxProps, Button, Flex, FlexProps, Heading, HStack, Icon, Input, InputGroup, InputLeftElement, List, ListIcon, ListItem, SimpleGrid, Stack, StackProps, Tag, TagLabel, TagLeftIcon, Text, VStack } from '@chakra-ui/react'
import { getDatabase, NotionPostPage, PostProperties } from '../../lib/notion'
import { ChangeEventHandler, MouseEventHandler, useCallback, useMemo, useState } from 'react';
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { transformNotionPage } from '../../lib/transform-notion-page';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { BlogPost } from '../../types/blog-post';

type Props = {
    posts: BlogPost[]
}

const MotionFlex = motion<FlexProps>(Flex);
const MotionBox = motion<BoxProps>(Box)


const Posts: NextPage<Props> = ({ posts }: Props) => {


    const tags = useMemo(() => {
        const enableStatus = new Set<string>();
        for (const post of posts) {
            for (const tag of post.pageTags) {
                enableStatus.add(tag);
            }
        }
        return enableStatus
    }, [posts]);

    const [selectedTag, setSelectedTag] = useState<string>("");
    const [searchStr, setSearchStr] = useState("");
    const [displayPosts, setDisplayPosts] = useState(posts);

    const onSearch: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        const query = event.currentTarget.value;
        const filteredPosts = posts.filter((post) => {
            return post.title.toLowerCase().includes(query.toLowerCase()) && (!selectedTag || post.pageTags.includes(selectedTag));
        });
        setDisplayPosts(filteredPosts);
        setSearchStr(query);
    }, [posts, selectedTag]);

    const onTagClick = (tag: string) => {
        if (tag) {
            setDisplayPosts(posts.filter(post => post.pageTags.includes(tag)));
        } else {
            setDisplayPosts(posts);
        }
        setSelectedTag(tag);
    }

    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);

    const renderedItems = useMemo(() => {
        const start = (currentPage - 1) * pageSize;
        const end = start + pageSize;
        return displayPosts.slice(start, end);
    }, [currentPage, displayPosts]);


    // TODO: replace with algolia search;
    return (
        <Box marginBottom={4}>
            <Box mb={2}>
                <Text mb={2}>
                    Total {posts.length} pages:
                </Text>
            </Box>

            <Box>
                <InputGroup my={2}>
                    <InputLeftElement pointerEvents="none">
                        <Icon as={HiOutlineSearch} color="gray.400"></Icon>
                    </InputLeftElement>
                    <Input placeholder="Search blog Posts" variant="filled" value={searchStr} onChange={onSearch} />
                </InputGroup>
            </Box>


            <HStack my={2}>
                <Button
                    textTransform="uppercase"
                    colorScheme="purple"
                    onClick={() => onTagClick("")}
                    size="xs"
                    variant={!selectedTag ? "solid" : "ghost"}
                >
                    All
                </Button>
                {
                    Array.from(tags).map((tag) => (
                        <Button
                            key={tag}
                            textTransform="uppercase"
                            colorScheme="purple"
                            onClick={() => onTagClick(tag)}
                            size="xs"
                            variant={selectedTag === tag ? "solid" : "ghost"}
                        >
                            {tag}
                        </Button>
                    ))
                }
            </HStack>

            <VStack width="100%" alignItems="flex-start">
                <AnimatePresence>
                    {!displayPosts.length &&
                        <MotionFlex key="No-Posts-Icon" align={"center"} mt="6" width="100%" direction="column"
                            initial={{ opacity: 0, x: 0, y: 50 }}
                            animate={{ opacity: 1, x: 0, y: 0 }}
                            exit={{ opacity: 0 }}>
                            <Icon as={FaRegSadTear} w="100px" h="100px" color="gray.400"></Icon>
                            <Text> No post yet.</Text>
                        </MotionFlex>
                    }
                    {
                        <Box width="100%">
                            <LayoutGroup>
                                {
                                    renderedItems.map((post) => {
                                        return (
                                            <MotionBox
                                                my={3}
                                                key={post.id}
                                                layout
                                                initial={{ opacity: 0, x: -10, y: 0 }}
                                                animate={{ opacity: 1, x: 0, y: 0 }}
                                                exit={{ opacity: 0 }}
                                            >
                                                <PostCard
                                                    {...post}
                                                />
                                            </MotionBox>

                                        )

                                    })
                                }
                                <MotionFlex layout justifyContent="center" my={3}>
                                    <Pagination total={displayPosts.length} current={currentPage} onChange={(pageNumber) => setCurrentPage(pageNumber)} />
                                </MotionFlex>
                            </LayoutGroup>
                        </Box >
                    }
                </AnimatePresence>

            </VStack >
        </Box >

    )
}


export default Posts;

// TODO: utlize redis cache for this kind of data; 
// TODO: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
export const getStaticProps: GetStaticProps = async () => {

    // TODO: only select data of last year
    // const { results: pages } = await notion.databases.query({
    //     database_id: getEnv("NOTION_DATABASE_ID")
    // });

    const pages = await getDatabase();

    return {
        props: {
            posts: pages.map((page: any) => transformNotionPage(page)),
        }
    }
}