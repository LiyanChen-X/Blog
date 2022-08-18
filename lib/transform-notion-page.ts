import dayjs from "dayjs";
import { BlogPost } from "../types/blog-post";
import { NotionPostPage } from "./notion";

export function transformNotionPage(page: NotionPostPage): BlogPost {
    const { properties } = page;
    const createdTime = dayjs(properties.CreatedTime.created_time).format('YYYY-MM-DD');
    // @ts-expect-error
    const title = properties.Title.title.map((t) => t.plain_text).join(" ");
    // @ts-expect-error
    const thumbnail = page.cover?.external?.url ?? "";
    // @ts-expect-error
    const desc = properties.Description.rich_text.map((t) => t.plain_text).join(" ");

    // TODO: need extract colors
    const pageTags = properties.Tag.multi_select.map(_ => _.name);

    const pageStatus = properties.Status.status?.name ?? "";

    return {
        id: page.id,
        title,
        desc,
        thumbnail,
        href: `/blogs/${page.id}`,
        createdTime,
        pageTags,
        pageStatus
    }
}