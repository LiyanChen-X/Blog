import { extendTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";

const styles = {
    global: (props: StyleFunctionProps | Dict<any>) => ({
        body: {
            bg: mode('#fff', '#1d1d1d')(props)
        }
    })
}

const components = {
    Heading: {
        variants: {
            'section-title': {
                textDecoration: 'underline',
                fontSize: 20,
                textUnderlineOffset: 6,
                textDecorationColor: '#525252',
                textDecorationThickness: 4,
                marginTop: 3,
                marginBottom: 4
            }
        }
    },
    Link: {
        baseStyle: (props: StyleFunctionProps | Dict<any>) => ({
            color: mode("#3d7aed", "#ff63c3")(props),
            textUnderlineOffset: 3,
        })
    }
}

const fonts = {
    heading: "'M PLUS Rounded 1c'"
}

const colors = {
    grassTeal: '#88ccca',
    activeBlue: "#3d7aed",
    activePink: "#ff63c3"
}

const config = {
    initialColorMode: 'dark',
    useSystemColorMode: true,
}

const theme = extendTheme({
    config, styles, components, fonts, colors
})

export default theme