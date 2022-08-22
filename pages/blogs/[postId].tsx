import * as React from 'react';
import { Text, useColorMode } from "@chakra-ui/react";
import type { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import dynamic from "next/dynamic";
import { getEnv } from '../../lib/get-config-value';
import ScrollToTopButton from '../../components/scroll-to-top-button';
import { getDatabase } from '../../lib/notion';

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

const Post: NextPage<IPostPageProps> = ({ recordMap }: IPostPageProps) => {

    const { colorMode } = useColorMode();
    return (
        <>
            <NotionRenderer
                recordMap={recordMap}
                fullPage={true}
                components={{ Code, Collection }}
                disableHeader
                showTableOfContents
                linkTableTitleProperties
                minTableOfContentsItems={2}
                darkMode={colorMode === 'dark'} />
            <ScrollToTopButton />
        </>

    )
}

// TODO: notion api is still not stable, will use the api to render once the api is stable;
export const getStaticProps: GetStaticProps = async ({params}) => {
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
