import { Stack } from '@chakra-ui/react';
import type { NextPage } from 'next'
import BlogpostsSection from '../components/blog-section';
import Hero from "../components/hero";
import Timeline from "../components/timeline";

const Home: NextPage = () => {
  return (
    <Stack>
      <Hero />;
      <Timeline />
      <BlogpostsSection posts={[]} />
    </Stack>);
}

export default Home
