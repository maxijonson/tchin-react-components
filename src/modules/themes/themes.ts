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
            pageBackground: light.white,
            defaultText: ultraDark.black,
            altText: light.onyx,
            textBackground: ultraLight.onyx,
            themeSwitchOn: light.white,
            themeSwitchOff: normal.onyx,
            card: pitchLight.white,
            cardBorder: veryLight.onyx,
            defaultShadow: normal.black,
            cardShadow: dark.white,
            cardSubtitle: light.orange, // TODO: remove with AdvancedCard
            cardFooter: light.black, // TODO: remove with AdvancedCard
            defaultErrorBg: light.red, // TODO: remove with AdvancedCard
            defaultErrorText: veryDark.red, // TODO: remove with AdvancedCard
            altErrorText: dark.red, // TODO: remove with AdvancedCard
            buttonBg: dark.white,
            buttonText: veryLight.white,
            sectionBackground: pitchLight.white,
            tooltip: ultraDark.black,
            tooltipText: normal.white,
            toastBackground: normal.white,
            toastProgress: veryLight.onyx,
            tableBackground: veryLight.white,
            tableAltBorder: veryLight.onyx,
            primary: "#1f6fbf",
            secondary: "#656a6e",
            warn: "#e89b15",
            danger: "#c91e1e",
            info: "#1ec99e",
            success: "#1dbf59",
        },
    },
    dark: {
        name: "dark",
        colors: {
            pageBackground: veryDark.onyx,
            defaultText: pitchLight.white,
            altText: veryLight.onyx,
            textBackground: normal.onyx,
            themeSwitchOn: light.white,
            themeSwitchOff: normal.onyx,
            card: dark.onyx,
            cardBorder: veryDark.white,
            defaultShadow: normal.white,
            cardShadow: pitchDark.onyx,
            cardSubtitle: dark.orange,
            cardFooter: dark.white,
            defaultErrorBg: veryDark.red,
            defaultErrorText: veryLight.red,
            altErrorText: light.red,
            buttonBg: normal.onyx,
            buttonText: veryLight.white,
            sectionBackground: dark.onyx,
            tooltip: veryDark.onyx,
            tooltipText: normal.white,
            toastBackground: dark.onyx,
            toastProgress: veryDark.white,
            tableBackground: dark.onyx,
            tableAltBorder: normal.white,
            primary: "#1f6fbf",
            secondary: "#656a6e",
            warn: "#e89b15",
            danger: "#c91e1e",
            info: "#1ec99e",
            success: "#159645",
        },
    },
};
