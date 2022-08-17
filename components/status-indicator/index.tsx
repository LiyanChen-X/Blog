import {
    HStack,
    StackProps,
    Text,
    TextProps,
    useBreakpointValue,
    useColorModeValue as mode,
} from '@chakra-ui/react';
import { motion, Variants, LayoutGroup } from 'framer-motion';


const MotionHStack = motion<StackProps>(HStack);
const MotionText = motion<TextProps>(Text);

const StatusIndicator = () => {
    const isMobile = useBreakpointValue({ base: true, lg: false });

    let stackStyles: StackProps;

    if (isMobile) {
        stackStyles = {
            shadow: 'lg',
            spacing: 3,
        };
    } else {
        stackStyles = {
            shadow: 'none',
            spacing: 0,
        };
    }

    const stackVariants: Variants = {
        hover: {
            width: 200,
            shadow: 'lg',
        },
        initial: {
            width: 40,
            minWidth: 40
        }
    }

    const textVariants: Variants = {
        initial: {
            opacity: 0,
            marginLeft: 0,
            display: "none"
        },
        hover: {
            opacity: 1,
            width: 'auto',
            marginLeft: 3,
            display: 'initial',
            transition: {
                duration: 0.5,
            }
        }
    }

    return (
        //@ts-expect-error
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
            initial="initial"
            rounded="3xl"
            spacing={0}
            layout
            {...stackStyles}
        >
            <MotionText>{"🍖"}</MotionText>
            <MotionText
                maxW="full"
                variants={textVariants}
                whiteSpace="nowrap"
                textOverflow="ellipsis"
                sx={{
                    '@media(hover: none)': {
                        opacity: 1,
                        width: 'max-content',
                        marginLeft: 3,
                    },
                }}
            >
                {"Love eating!"}
            </MotionText>
        </MotionHStack>

    );
};

export default StatusIndicator;
