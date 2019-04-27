import { colors } from "./colors";

export type IThemeName = "light" | "dark";

export interface ISection {
    [name: string]: string;
}

export interface ITheme {
    name: IThemeName;
    colors: ISection;
}

export type IThemes = { [name in IThemeName]: ITheme };

export const defaultThemes: IThemes = {
    light: {
        name: "light",
        colors: {
            pageBackground: colors.light.white,
            defaultText: colors.ultraDark.black,
            themeSwitchOn: colors.normal.white,
            themeSwitchOff: colors.normal.onyx,
            defaultColorOverlay: colors.light.white,
            card: colors.pitchLight.white,
            altCard: colors.veryDark.black,
            defaultShadow: colors.normal.black,
            altDefaultShadow: colors.light.white,
            cardShadow: colors.veryDark.white,
            cardSubtitle: colors.light.orange,
            cardFooter: colors.light.black,
            defaultErrorBg: colors.light.red,
            defaultErrorText: colors.veryDark.red,
            altErrorText: colors.dark.red,
            buttonBg: colors.dark.black,
            buttonText: colors.normal.white,
            modalBg: colors.veryLight.white,
            modalText: colors.normal.black,
            modalShadow: colors.normal.black,
            sectionBackground: colors.pitchLight.white,
            tooltip: colors.ultraDark.black,
            tooltipText: colors.normal.white,
            toastBackground: colors.normal.white,
            toastProgress: colors.veryLight.onyx,
        },
    },
    dark: {
        name: "dark",
        colors: {
            pageBackground: colors.veryDark.onyx,
            defaultText: colors.pitchLight.white,
            themeSwitchOn: colors.normal.white,
            themeSwitchOff: colors.normal.onyx,
            defaultColorOverlay: colors.ultraDark.black,
            card: colors.dark.onyx,
            altCard: colors.veryLight.white,
            defaultShadow: colors.normal.white,
            altDefaultShadow: colors.light.black,
            cardShadow: colors.ultraDark.onyx,
            cardSubtitle: colors.dark.orange,
            cardFooter: colors.dark.white,
            defaultErrorBg: colors.veryDark.red,
            defaultErrorText: colors.veryLight.red,
            altErrorText: colors.light.red,
            buttonBg: colors.light.white,
            buttonText: colors.normal.black,
            modalBg: colors.veryDark.black,
            modalText: colors.normal.white,
            modalShadow: colors.veryDark.black,
            sectionBackground: colors.dark.onyx,
            tooltip: colors.veryDark.onyx,
            tooltipText: colors.normal.white,
            toastBackground: colors.dark.onyx,
            toastProgress: colors.veryDark.white,
        },
    },
};
