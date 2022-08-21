import HeroImage from "../hero-image";
import {
    Stack,
    VStack,
    Heading,
    Text,
    Button,
    Icon,
    Link,
} from '@chakra-ui/react';
import { FiArrowUpRight } from 'react-icons/fi';
import { MicrosoftIcon } from "../icons/microsoft";
// @ts-ignore
import TypeIt from "typeit-react";

const Hero = () => {
    return <Stack
        as="section"
        alignItems="center"
        direction={{ base: 'column-reverse', md: 'row' }}
        w="full"
        spacing={12}
    >
        <VStack alignItems="flex-start" w="full" spacing={3}>
            <Stack
                alignItems="center"
                justifyContent={{ base: 'center', md: 'flex-start' }}
                direction={{ base: 'column', md: 'row' }}
                w="full"
                spacing={3}
            >
                <Heading as="h1" size="lg">
                    Hi, I&apos;m Liyan Chen.
                </Heading>
            </Stack>
            <Text as="h2" lineHeight="175%">
                <TypeIt>
                    Full-stack engineer working at <Icon as={MicrosoftIcon} boxSize={5} />.
                </TypeIt>
            </Text>

        </VStack>
        <HeroImage />
    </Stack>
}

export default Hero;