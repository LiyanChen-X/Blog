import { 
    Tooltip, IconButton, useDisclosure, 
    AspectRatio, Box, MenuButton, forwardRef, 
Menu, MenuList, MenuItem, MenuDivider } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FiLogIn } from "react-icons/fi";
import LoginForm from "../LoginForm";
import Image from "next/image";
import { signOut } from "next-auth/react";


const LoginButton = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data: session, status } = useSession();
    const user = session?.user;
    if (user) {
        return (
            <Menu>
                <MenuButton
                    as={UserMenuButton}
                    image={user.image}
                />
                <MenuList fontSize="sm">
                    <MenuItem>Signed in as {user.name}</MenuItem>
                    <MenuDivider/>
                    <MenuItem onClick={() => signOut()}>
                        Sign out
                    </MenuItem>
                </MenuList>
            </Menu>
        )
    }
    return (
        <>
            <Tooltip label={`Login`} modifiers={[
                {
                    name: "preventOverflow",
                    options: {
                        padding: 8
                    }
                }
            ]}>
                <IconButton
                    aria-label="Login"
                    icon={<FiLogIn />
                    }
                    size="sm"
                    onClick={onOpen}
                    variant="ghost">
                </IconButton>
            </Tooltip>
            <LoginForm isOpen={isOpen} onClose={onClose} />
        </>

    )
}

const UserMenuButton = forwardRef<{ image: string }, "button">((props, ref) => {
    return (
        <IconButton
            ref={ref}
            {...props}
            aria-label="Login"
            size="sm"
            variant="ghost">
            <AspectRatio 
                as="figure" 
                flexShrink={0} 
                w={'6'} 
                h={'6'} 
                ratio={1}
            >
                <Box 
                    overflow="hidden" 
                    rounded="full"
                >
                    <Image
                        src={props.image!}
                        layout="fill"
                        alt="my profile"
                    />
                </Box>
            </AspectRatio>
        </IconButton>);
})




export default LoginButton;
