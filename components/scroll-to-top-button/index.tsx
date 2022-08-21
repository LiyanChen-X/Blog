import { useState, useEffect } from "react";
import { IconButton } from "@chakra-ui/react";
import { BiArrowToTop } from "react-icons/bi"


const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);
    const updateScrollButtonVisible = () => {
        if (window.scrollY > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", updateScrollButtonVisible);

        return () => {
            window.removeEventListener('scroll', updateScrollButtonVisible)
        }
    }, []);

    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <> {
            visible && (
                <IconButton
                    position={'fixed'}
                    zIndex="tooltip"
                    right={{ base: 5, md: 20 }}
                    bottom={{ base: 5, md: 20 }}
                    bg="gray.50"
                    _dark={{ bg: 'gray.700' }}
                    aria-label="Back to the top"
                    icon={<BiArrowToTop />}
                    onClick={scrollTop}
                    rounded="full"
                    size="lg"
                />
            )
        }
        </>
    )
}

export default ScrollToTopButton;