import { colors } from "../CSS/colors";

const {
    dark,
    light,
    normal,
    // pitchDark,
    pitchLight,
    ultraDark,
    ultraLight,
    veryDark,
    veryLight,
} = colors;

export const defaultThemes = {
    light: {
        name: "light",
        colors: {
            altErrorText: dark.red, // TODO: remove with AdvancedCard
            altPageBackground: ultraLight.onyx,
            altText: light.onyx,
            buttonBg: veryDark.white,
            buttonText: pitchLight.white,
            card: pitchLight.white,
            cardBorder: ultraLight.onyx,
            cardFooter: light.black, // TODO: remove with AdvancedCard
            cardShadow: normal.black,
            cardSubtitle: light.orange, // TODO: remove with AdvancedCard
            codeSnippetBackground: pitchLight.navy,
            danger: "#c91e1e",
            defaultErrorBg: light.red, // TODO: remove with AdvancedCard
            defaultErrorText: veryDark.red, // TODO: remove with AdvancedCard
            defaultShadow: normal.black,
            defaultText: ultraDark.black,
            drawerBorder: veryLight.onyx,
            drawerShadow: normal.black,
            hr: veryLight.onyx,
            info: "#1ec99e",
            link: normal.orange,
            inputBorder: veryDark.white,
            loading: light.onyx,
            loadingText: pitchLight.white,
            pageBackground: pitchLight.white,
            primary: "#1f6fbf",
            renderCount: normal.white,
            secondary: "#656a6e",
            sectionBackground: pitchLight.white,
            success: "#1dbf59",
            tableAltBorder: veryLight.onyx,
            tableStrippedBackground: light.white,
            textBackground: ultraLight.onyx,
            themeSwitchOff: normal.onyx,
            themeSwitchOn: light.white,
            toastBackground: normal.white,
            toastProgress: veryLight.onyx,
            toastShadow: normal.onyx,
            tooltip: ultraDark.black,
            tooltipText: normal.white,
            warn: "#e89b15",
        },
    },
    dark: {
        name: "dark",
        colors: {
            altErrorText: light.red,
            altPageBackground: normal.onyx,
            altText: veryLight.onyx,
            buttonBg: normal.onyx,
            buttonText: veryLight.white,
            card: veryDark.onyx,
            cardBorder: veryDark.white,
            cardFooter: dark.white,
            cardShadow: light.onyx,
            cardSubtitle: dark.orange,
            codeSnippetBackground: dark.onyx,
            danger: "#9E1818",
            defaultErrorBg: veryDark.red,
            defaultErrorText: veryLight.red,
            defaultShadow: normal.white,
            defaultText: pitchLight.white,
            drawerBorder: veryDark.white,
            drawerShadow: light.onyx,
            hr: normal.onyx,
            info: "#189E7D",
            inputBorder: dark.white,
            link: normal.orange,
            loading: normal.white,
            loadingText: normal.onyx,
            pageBackground: veryDark.onyx,
            primary: "#185694",
            renderCount: normal.onyx,
            secondary: "#696969",
            sectionBackground: dark.onyx,
            success: "#268549",
            tableAltBorder: normal.white,
            tableStrippedBackground: dark.onyx,
            textBackground: normal.onyx,
            themeSwitchOff: normal.onyx,
            themeSwitchOn: light.white,
            toastBackground: dark.onyx,
            toastProgress: veryDark.white,
            toastShadow: ultraDark.onyx,
            tooltip: veryDark.onyx,
            tooltipText: normal.white,
            warn: "#BD7F11",
        },
    },
};

declare global {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface ICustomTheme {}
    interface IStoreState {
        theme: typeof defaultThemes.light & ICustomTheme;
    }
}
