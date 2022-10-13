import { Tooltip, IconButton } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { FiCommand } from "react-icons/fi";
import { CmdPaletteContext } from "../../providers/cmd-palette-provider";

const CommandButton = () => {
    const { open: openCommandPalette } = useContext(CmdPaletteContext);
    const [shortcut, setShortcut] = useState<string>();

    useEffect(() => {
        setShortcut(
            navigator.userAgent.indexOf('Mac OS X') != -1 ? 'Cmd + P' : 'Ctrl + P'
        );
    }, [setShortcut]);

    return (<>
    <Tooltip label={`Command Palette (${shortcut})`} modifiers={[
                        {
                            name: "preventOverflow",
                            options: {
                                padding: 8
                            }
                        }
                    ]}>
                        <IconButton
                            aria-label="Command"
                            icon={<FiCommand />}
                            onClick={openCommandPalette}
                            size="sm"
                            variant="ghost"
                        />
                    </Tooltip>
    </>)
}

export default CommandButton;
