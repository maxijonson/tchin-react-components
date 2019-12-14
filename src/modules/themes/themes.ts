import { IThemes } from "./models";
import { colors } from "../CSS/colors";

const {
    dark,
    light,
    normal,
    pitchDark,
    pitchLight,
    ultraDark,
    ultraLight,
    veryDark,
    veryLight,
} = colors;

export const defaultThemes: IThemes = {
    light: {
        name: "light",
        colors: {
            altErrorText: dark.red, // TODO: remove with AdvancedCard
            altPageBackground: ultraLight.onyx,
            altText: light.onyx,
            buttonBg: dark.white,
            buttonText: veryLight.white,
            card: pitchLight.white,
            cardBorder: veryLight.onyx,
            cardFooter: light.black, // TODO: remove with AdvancedCard
            cardShadow: dark.white,
            cardSubtitle: light.orange, // TODO: remove with AdvancedCard
            danger: "#c91e1e",
            defaultErrorBg: light.red, // TODO: remove with AdvancedCard
            defaultErrorText: veryDark.red, // TODO: remove with AdvancedCard
            defaultShadow: normal.black,
            defaultText: ultraDark.black,
            drawerBorder: veryLight.onyx,
            info: "#1ec99e",
            link: light.orange,
            pageBackground: light.white,
            primary: "#1f6fbf",
            secondary: "#656a6e",
            sectionBackground: pitchLight.white,
            success: "#1dbf59",
            tableAltBorder: veryLight.onyx,
            tableBackground: veryLight.white,
            textBackground: ultraLight.onyx,
            themeSwitchOff: normal.onyx,
            themeSwitchOn: light.white,
            toastBackground: normal.white,
            toastProgress: veryLight.onyx,
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
            card: dark.onyx,
            cardBorder: veryDark.white,
            cardFooter: dark.white,
            cardShadow: pitchDark.onyx,
            cardSubtitle: dark.orange,
            danger: "#c91e1e",
            defaultErrorBg: veryDark.red,
            defaultErrorText: veryLight.red,
            defaultShadow: normal.white,
            defaultText: pitchLight.white,
            drawerBorder: veryDark.white,
            info: "#1ec99e",
            link: dark.orange,
            pageBackground: veryDark.onyx,
            primary: "#1f6fbf",
            secondary: "#656a6e",
            sectionBackground: dark.onyx,
            success: "#159645",
            tableAltBorder: normal.white,
            tableBackground: dark.onyx,
            textBackground: normal.onyx,
            themeSwitchOff: normal.onyx,
            themeSwitchOn: light.white,
            toastBackground: dark.onyx,
            toastProgress: veryDark.white,
            tooltip: veryDark.onyx,
            tooltipText: normal.white,
            warn: "#e89b15",
        },
    },
};
