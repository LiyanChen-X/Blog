import { Box } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box as={"footer"} textAlign="center" opacity={0.4} fontSize="sm">
            &copy; {new Date().getFullYear()} Liyan&apos;s Blog.
        </Box>
    )
}

export default Footer;