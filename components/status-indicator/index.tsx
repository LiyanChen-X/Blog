import {
    HStack,
    StackProps,
    Text,
    TextProps,
    useBreakpointValue,
    useColorModeValue as mode,
} from '@chakra-ui/react';
import { motion, Variants } from 'framer-motion';


const MotionHStack = motion<StackProps>(HStack);
const MotionText = motion<TextProps>(Text);

const StatusIndicator = () => {
    const isMobile = useBreakpointValue({ base: true, lg: false });

    let stackStyles: StackProps;

    if (isMobile) {
        stackStyles = {
            width: 10,
            shadow: 'lg',
            spacing: 3,
        };
    } else {
        stackStyles = {
            width: 10,
            shadow: 'none',
            spacing: 0,
        };
    }

    const stackVariants: Variants = {
        hover: {
            width: 'max-content',
            maxWidth: 'unset',
            shadow: 'lg',
        }
    }

    const textVariants: Variants = {
        hover: {
            opacity: 1,
            width: 'max-content',
            marginLeft: 3,
            display: 'initial',
        }
    }

    return (
        <MotionHStack
            position="absolute"
            bottom={0}
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
            h={10}
            ml="auto"
            px={2}
            bg={mode('white', 'gray.800')}
            borderWidth={1}
            borderStyle="solid"
            borderColor={mode('gray.300', 'gray.600')}
            variants={stackVariants}
            whileHover="hover"
            role="group"
            rounded="3xl"
            spacing={0}
            layout
            {...stackStyles}
        >
            <MotionText>{"some emoji here"}</MotionText>
            <MotionText
                sx={{
                    '@media(hover: none)': {
                        opacity: 1,
                        width: 'max-content',
                        marginLeft: 3,
                    },
                }}
                display="none"
                overflow="hidden"
                w={0}
                maxW="full"
                opacity={0}
                variants={textVariants}
                whiteSpace="nowrap"
                textOverflow="ellipsis"
            >
                {"some message here"}
            </MotionText>
        </MotionHStack>
    );
};

export default StatusIndicator;
