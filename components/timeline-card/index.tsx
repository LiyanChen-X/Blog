import { Box, Button, chakra, Flex, Image, Text, FlexProps } from "@chakra-ui/react";

export type ITimelineCardProps = FlexProps & {
    title: string;
    imgUrl: string;
    description: string;
}

export default function TimelineCard(props: ITimelineCardProps) {
    const { title, imgUrl, description, ...rest } = props;
    return (
        <Flex
            w="full"
            alignItems="center"
            justifyContent="center"
            {...rest}
        >
            <Flex
                maxW="md"
                mx="auto"
                shadow="sm"
                rounded="lg"
                borderWidth="1px"
                borderColor="gray.200"
                overflow="hidden"
            >

                <Box
                    w="full"
                    p={{
                        base: 4,
                        md: 4,
                    }}
                >
                    <chakra.h2
                        fontWeight="bold"
                    >
                        {title}
                    </chakra.h2>

                    <Text
                        mt={2}
                        fontSize="sm"
                        color="gray.600"
                        _dark={{
                            color: "gray.400",
                        }}
                    >
                        {description}
                    </Text>
                </Box>
            </Flex>
        </Flex>
    );
}
