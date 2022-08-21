import Link from "next/link";
import Image from "next/image";
import { Text, useColorModeValue } from "@chakra-ui/react";
import styled from "@emotion/styled";

const LogoBox = styled.span`
    font-weight: bold;
    font-size: 18px;
    display: inline-flex;
    align-items: center;
    height: 30px;
    line-height: 20px;
    padding: 10px;

    img {
        transition: 200ms ease;
    }
    @media (hover: hover) and (pointer: fine) {
        &:hover img {
            transform: rotate(-20deg) scale(1.2);
        }
    }
`

const Logo = () => {
    const logoImage = `/images/logo_${useColorModeValue('angry', 'happy')}.svg`;
    return (
        <Link href="/" scroll={false}>
            <a>
                <LogoBox>
                    <Image src={logoImage} width={24} height={24} alt="logo" />
                    <Text
                        color={useColorModeValue('gray.800', 'whiteAlpha.900')}
                        fontFamily='M PLUS Rounded 1c", sans-serif'
                        fontWeight="bold"
                        ml={3}
                    >
                        Liyan&apos;s Blog
                    </Text>
                </LogoBox>
            </a>
        </Link>
    )
}

export default Logo