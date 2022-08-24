import { Heading, VStack, List, ListItem, Icon, Box, Link, useColorModeValue } from "@chakra-ui/react";
import dayjs from "dayjs";
import { CgArrowRight } from "react-icons/cg";
import CalendarHeatmap from 'react-calendar-heatmap'
import 'react-calendar-heatmap/dist/styles.css'

import { BlogPost } from "../../types/blog-post";
import BlogPostCard from "../blog-post-card";

type Props = {
    posts: Array<BlogPost>;
};

const BlogpostsSection = ({ posts }: Props) => {
    const recentPosts = posts.slice(0, 3);
    //TODO: notion api do not support getting contributions yet;
    const activeCountsPerDay = new Map<string, number>();
    const createdTimes = posts.map((post) => post.createdTime);

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
    return (
        <VStack as="section" alignItems="flex-start" w="full" spacing={4}
            sx={{
                ".react-calendar-heatmap .color-empty": {
                    fill: useColorModeValue("#eee", "#2D3748")
                },
                ".react-calendar-heatmap .color-scale-1": {
                    fill: useColorModeValue("#d6e685", "#acd5f2")
                },
                ".react-calendar-heatmap .color-scale-2": {
                    fill: useColorModeValue("#8cc665", "#7fa8d1")
                },
                ".react-calendar-heatmap .color-scale-3": {
                    fill: useColorModeValue("#44a340", "#49729b")
                },
                ".react-calendar-heatmap .color-scale-4": {
                    fill: useColorModeValue("#1e6823", "#527ba0")
                }
            }}>
            <Heading size="md" variant={"section-title"}>Recent blog posts</Heading>
            <CalendarHeatmap
                startDate={new Date(startDate)}
                endDate={new Date(endDate)}
                values={contributions}
                showMonthLabels
                showWeekdayLabels
                classForValue={(value) => {
                    if (!value) {
                        return 'color-empty';
                    }
                    return `color-scale-${Math.min(4, value.count)}`;
                }}
            />
            <List w="full" spacing={{ base: 8, md: 2 }}>
                {recentPosts.map((post) => (
                    <ListItem key={post.id}>
                        <BlogPostCard {...post} />
                    </ListItem>
                ))}
            </List>
            <Box>
                <Link
                    display="flex"
                    alignItems="center"
                    href="/blogs"
                    ml={{ base: 0, md: 4 }}
                    role="group"
                >
                    Read all articles
                    <Icon
                        as={CgArrowRight}
                        ml={1}
                        color={useColorModeValue("#3d7aed", "#ff63c3")}
                        _groupHover={{ ml: 3 }}
                        transitionDuration="slow"
                        transitionProperty="margin-left"
                        transitionTimingFunction="ease-out"
                    />
                </Link>
            </Box>
        </VStack >
    );
};

export default BlogpostsSection;
