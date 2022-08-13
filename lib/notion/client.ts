import { Client } from "@notionhq/client";
import { getEnv } from "../get-config-value";

const notion = new Client({
    auth: getEnv("NOTION_AUTH_TOKEN"),
    notionVersion: "2021-08-16",
});


export const getDatabase = async (filter?: any, databaseId = getEnv("NOTION_DATABASE_ID")) => {
    // TODO: handle hasmore
    const response = await notion.databases.query({
        database_id: databaseId,
        sorts: [{ property: "CreatedTime", direction: "descending" }],
        filter,
    });

    return response.results;
}

export const getPage = async (pageId: string) => {
    const response = await notion.pages.retrieve({
        page_id: pageId,
    });
    return response
}

export const getBlocks = async (blockId: string) => {
    const blocks = [];
    while (true) {
        let cursor;
        //@ts-expect-error
        const { results, has_more, next_cursor } = await notion.blocks.children.list({
            start_cursor: cursor,
            block_id: blockId,
        });
        blocks.push(...results);
        if (!has_more) {
            break;
        }
        cursor = next_cursor;
    }
    return blocks;
}