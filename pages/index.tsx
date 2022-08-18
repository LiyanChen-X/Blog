import { Stack } from '@chakra-ui/react';
import type { GetStaticProps, NextPage } from 'next'
import BlogpostsSection from '../components/blog-section';
import Hero from "../components/hero";
import Timeline from "../components/timeline";
import { getDatabase } from '../lib/notion';
import { transformNotionPage } from '../lib/transform-notion-page';
import { BlogPost } from '../types/blog-post';

type Props = {
  posts: BlogPost[]
}

const Home: NextPage<Props> = ({ posts }: Props) => {
  return (
    <Stack>
      <Hero />;
      <Timeline />
      <BlogpostsSection posts={posts} />
    </Stack>);
}

export default Home

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