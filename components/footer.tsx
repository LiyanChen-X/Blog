import { Box } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box as={"footer"} textAlign="center" opacity={0.4} fontSize="sm">
            &copy; {new Date().getFullYear()} Liych&apos;s Blog.
        </Box>
    )
}

export default Footer;