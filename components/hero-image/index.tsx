import { Box, AspectRatio, Flex } from "@chakra-ui/react";
import Image from "next/image";

import StatusIndicator from "../status-indicator";

const HeroImage = () => {
    return (
        <Flex position="relative" justify="center" pb={4}>
            <AspectRatio as="figure" flexShrink={0} w={56} h={56} ratio={1}>
                <Box overflow="hidden" rounded="full">
                    <Image
                        src="/images/profile.png"
                        layout="fill"
                        alt="my profile"
                    />
                </Box>
            </AspectRatio>
            <StatusIndicator />
        </Flex>
    );
};

export default HeroImage;
