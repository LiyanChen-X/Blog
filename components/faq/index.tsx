import {
    Stack,
    VStack,
    Heading,
    Text,
    Button,
    Icon,
    Link,
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
} from '@chakra-ui/react';

import { SiMinutemailer } from "react-icons/si" 


export const FAQ = () => {
    return (
        <VStack w="full" spacing={4}>
            <Heading size="md" w="full" variant={"section-title"}>Frequently asked questions</Heading>
            <Accordion allowToggle w="full" allowMultiple>
                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                <Heading size="sm"> 🚀 What is my Tech Stack? </Heading>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        React.js, TypeScript, Next.js, Chakra-UI, know about Vue.js.
                    </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                    <h2>
                        <AccordionButton>
                            <Box flex='1' textAlign='left'>
                                 <Heading size="sm">📧 How to contact me?</Heading>
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                        You can contact me via <Link href="mailto:liyanchen128@outlook.com" isExternal>Email</Link>
                    </AccordionPanel>
                </AccordionItem>

            </Accordion>
        </VStack>);
}   
