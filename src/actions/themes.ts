import { ITheme } from "../../src/modules/CSS/themes";

export interface ISetThemeAction {
    type: "themes/SET_THEME";
    theme: ITheme;
}

export interface IResetThemeAction {
    type: "themes/RESET_THEME";
}

declare global {
    type IThemeAction = ISetThemeAction | IResetThemeAction;
}

export const setTheme = (theme: ITheme): ISetThemeAction => {
    return {
        theme,
        type: "themes/SET_THEME",
    };
};

export const resetTheme = (): IResetThemeAction => ({
    type: "themes/RESET_THEME",
});
