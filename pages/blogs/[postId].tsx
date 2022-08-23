import * as React from 'react';
import { Box, BoxProps, Stack, Text, useColorMode, useColorModeValue, VStack, Skeleton, SkeletonText, SkeletonCircle } from "@chakra-ui/react";
import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";
import { getEnv } from '../../lib/get-config-value';
import ScrollToTopButton from '../../components/scroll-to-top-button';
import { getDatabase } from '../../lib/notion';
import { useRef } from 'react';
import useUtterancesParams from '../../hooks/useUtterance';
import { motion } from 'framer-motion';

type IPostPageProps = {
    recordMap: ExtendedRecordMap
}

// TODO: figure out our practice here; 
const Code = dynamic<any>(
    () => import('react-notion-x/build/third-party/code').then((m) => m.Code)
);

const Collection = dynamic<any>(() =>
    import('react-notion-x/build/third-party/collection').then(
        (m) => m.Collection
    )
)

const MotionBox = motion<BoxProps>(Box);


const Post: NextPage<IPostPageProps> = ({ recordMap }: IPostPageProps) => {

    const { colorMode } = useColorMode();
    const comments = useRef<HTMLDivElement>(null);
    const theme = useColorModeValue("boxy-light", "dark-blue");
    const status = useUtterancesParams({
        theme: theme,
        issueTerm: "pathname",
        repo: "LiyanChen-X/Blog",
        ref: comments
    });
    const commentsLoaded = status === "ready";
    return (
        <Box>
            <NotionRenderer
                recordMap={recordMap}
                components={{ Code, Collection }}
                disableHeader
                linkTableTitleProperties
                fullPage
                darkMode={colorMode === 'dark'} />

                <MotionBox w="full"
                    ref={comments}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: commentsLoaded ? 1 : 0 }}
                    // @ts-expect-error
                    transition={{ duration: 0.5 }}
                />


            <ScrollToTopButton />
        </Box>
    )
}

// TODO: notion api is still not stable, will use the api to render once the api is stable;
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const postId = params!.postId as string;
    const notion = new NotionAPI(
        {
            activeUser: getEnv("NOTION_USER_ID"),
            authToken: getEnv("NOTION_TOKEN_V2")
        }
    )
    const recordMap = await notion.getPage(postId);

    return {
        props: {
            recordMap,
        },
        revalidate: 10,
    }
}

export const getStaticPaths: GetStaticPaths = async () => {
    const pages = await getDatabase();
    return {
        paths: pages.map((page) => ({
            params: {
                postId: page.id
            }
        })),
        fallback: "blocking"
    }
}

export default Post;
