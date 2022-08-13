import type { GetStaticProps, NextPage } from 'next'
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'
import dayjs from "dayjs"
import { FcApproval, FcDocument, FcEditImage, FcEngineering } from "react-icons/fc";
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from "react-icons/md";
import { HiOutlineSearch } from "react-icons/hi";
import Section from '../../components/section'
import { FaRegSadTear } from "react-icons/fa";
import PostCard, { IPostCardProps } from "../../components/post-card"
import { Box, Heading, HStack, Icon, Input, InputGroup, InputLeftElement, List, ListIcon, ListItem, SimpleGrid, Stack, Tag, TagLabel, TagLeftIcon, Text, VStack } from '@chakra-ui/react'
import { getDatabase, NotionPostPage, PostProperties } from '../../lib/notion'
import { ChangeEventHandler, MouseEventHandler, useCallback, useMemo, useState } from 'react';
import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";
import { transformNotionPage } from '../../lib/transform-notion-page';

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
    const tagEnableStatus = useMemo(() => {
        const enableStatus = new Map<string, boolean>();
        for (const post of posts) {
            for (const tag of post.pageTags) {
                enableStatus.set(tag, true);
            }
        }
        // enableStatus.set("all", true);
        return enableStatus
    }, [posts]);

    const [enabledTags, setEnabledTags] = useState(tagEnableStatus);
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

    const onTagClick = (tag: string) => {
        const newEnabledTags = new Map(enabledTags);
        newEnabledTags.set(tag, !enabledTags.get(tag));
        setEnabledTags(newEnabledTags);
        const newDisplayPosts = posts.filter((post) => {
            return post.pageTags.some((pageTag) => {
                return newEnabledTags.get(pageTag) ?? false;
            }
            );
        }
        );
        setDisplayPosts(newDisplayPosts);
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
        <Stack marginBottom={4}>
            <section>
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
            </section>

            <Section >
                <CalendarHeatmap
                    startDate={new Date(startDate)}
                    endDate={new Date(endDate)}
                    values={contributions}
                />
            </Section>
            <Section>
                <InputGroup my={2}>
                    <InputLeftElement pointerEvents="none">
                        <Icon as={HiOutlineSearch} color="gray.400"></Icon>
                    </InputLeftElement>
                    <Input placeholder="Search blog Posts" variant="filled" value={searchStr} onChange={onSearch} />
                </InputGroup>
            </Section>
            <Section>
                <HStack>
                    {
                        Array.from(enabledTags.keys()).map((tag) =>
                            <TagButton
                                key={tag}
                                selected={enabledTags.get(tag) ?? false}
                                label={tag}
                                onClick={onTagClick} />
                        )
                    }
                </HStack>
            </Section>
            <Section delay={0.6} >
                {!displayPosts.length &&
                    <VStack align={"center"} mt="6">
                        <Icon as={FaRegSadTear} w="100px" h="100px" color="gray.400"></Icon>
                        <Text> No post yet.</Text>
                    </VStack>

                }
                {
                    // TODO: enable animation for status change
                    <VStack spacing={4} >
                        <SimpleGrid
                            columns={2}
                            spacing={10}>

                            {
                                renderedItems.map((post) => {
                                    return (
                                        <Box
                                            key={post.id}
                                        >
                                            <PostCard
                                                {...post}
                                            />
                                        </Box>

                                    )

                                })
                            }
                        </SimpleGrid>
                        {/* TODO: add night mode style */}
                        <Pagination total={displayPosts.length} onChange={(pageNumber) => setCurrentPage(pageNumber)} />
                    </VStack>
                }
            </Section>
        </Stack>

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