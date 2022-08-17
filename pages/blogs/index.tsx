import type { GetStaticProps, NextPage } from 'next'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import dayjs from "dayjs"
import { FcApproval, FcDocument, FcEditImage, FcEngineering } from "react-icons/fc";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import { FaRegSadTear } from "react-icons/fa";
import PostCard, { IPostCardProps } from "../../components/post-card"
import { Box, BoxProps, Button, Flex, FlexProps, Heading, HStack, Icon, Input, InputGroup, InputLeftElement, List, ListIcon, ListItem, SimpleGrid, Stack, StackProps, Tag, TagLabel, TagLeftIcon, Text, VStack } from '@chakra-ui/react'
import { getDatabase, NotionPostPage, PostProperties } from '../../lib/notion'
import { ChangeEventHandler, MouseEventHandler, useCallback, useMemo, useState } from 'react';
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { transformNotionPage } from '../../lib/transform-notion-page';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';

type Props = {
    pages: NotionPostPage[]
}


const Posts: NextPage<Props> = ({ pages }: Props) => {

    //TODO: notion api do not support getting contributions yet;
    const activeCountsPerDay = new Map<string, number>();
    const createdTimes = pages.map((page) => {
        const properties: PostProperties = page.properties;
        return properties.CreatedTime.created_time;
    });
    for (const createdTime of createdTimes) {
        const date = new Date(createdTime!);
        // TODO: use dayjs instead;
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const count = activeCountsPerDay.get(dateString) ?? 0;
        activeCountsPerDay.set(dateString, count + 1);
    }
    const contributions = Array.from(activeCountsPerDay.entries()).map(([date, count]) => ({
        date,
        count
    }))
    // show contributions from the last year;
    const startDate = dayjs().subtract(1, "year").format("YYYY-MM-DD");
    const endDate = dayjs().format("YYYY-MM-DD");
    const posts = pages.map((page) => transformNotionPage(page));
    const tags = useMemo(() => {
        const enableStatus = new Set<string>();
        for (const post of posts) {
            for (const tag of post.pageTags) {
                enableStatus.add(tag);
            }
        }
        return enableStatus
    }, [posts]);

    const [selectedTag, setSelectedTag] = useState<string>();
    const [searchStr, setSearchStr] = useState("");
    const [displayPosts, setDisplayPosts] = useState(posts);

    const onSearch: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        const query = event.currentTarget.value;
        setSearchStr(query);
        const filteredPosts = posts.filter((post) => {
            return post.title.toLowerCase().includes(query.toLowerCase());
        });
        setDisplayPosts(filteredPosts);
    }, [posts]);

    const onTagClick = (tag?: string) => {
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

    const MotionFlex = motion<FlexProps>(Flex);
    const MotionBox = motion<BoxProps>(Box)

    // TODO: replace with algolia search;
    return (
        <Box marginBottom={4}>
            <Box mb={2}>
                <Text mb={2}>
                    Total {pages.length} pages:
                </Text>
                <List spacing={3}>
                    <ListItem>
                        <ListIcon as={FcEditImage} /> {posts.filter((_) => _.pageStatus === "Draft").length} in Draft State.
                    </ListItem>
                    <ListItem>
                        <ListIcon as={FcDocument} /> {posts.filter((_) => _.pageStatus === "In Review").length} in Review State
                    </ListItem>
                    <ListItem>
                        <ListIcon as={FcApproval} /> {posts.filter((_) => _.pageStatus === "Published").length} in Published State
                    </ListItem>
                </List>
            </Box>

            <Box >
                <CalendarHeatmap
                    startDate={new Date(startDate)}
                    endDate={new Date(endDate)}
                    values={contributions}
                />
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
                    onClick={() => onTagClick()}
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


export type ITagButtonProps = {
    selected: boolean,
    onClick: (label: string) => void,
    label: string,
}
const TagButton = (props: ITagButtonProps) => {
    const {
        selected,
        onClick,
        label,
    } = props;

    const onTagClick: MouseEventHandler<HTMLDivElement> = useCallback((event) => {
        onClick(label);
    }, [label, onClick]);

    return (
        <Tag cursor={"pointer"} size="md" borderRadius="md" variant="subtle" color={selected ? "gray.800" : "gray.400"} onClick={onTagClick}>
            <TagLeftIcon as={selected ? MdRadioButtonChecked : MdRadioButtonUnchecked}></TagLeftIcon>
            <TagLabel> {`${label}`} </TagLabel>
        </Tag>
    );
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
            pages: pages,
        }
    }
}