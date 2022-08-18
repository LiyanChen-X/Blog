export interface BlogPost {
    id: string,
    title: string,
    desc: string,
    thumbnail?: string,
    href: string,
    createdTime: string,
    pageTags: string[],
    pageStatus?: string,
}