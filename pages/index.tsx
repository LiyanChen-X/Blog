import { Stack } from '@chakra-ui/react';
import type { NextPage } from 'next'
import Hero from "../components/hero";
import Timeline from "../components/timeline";

const Home: NextPage = () => {
  return (
    <Stack>
      <Hero />;
      <Timeline />
    </Stack>);
}

export default Home
