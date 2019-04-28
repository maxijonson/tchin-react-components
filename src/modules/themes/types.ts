import { PayloadAction } from "../../store/types";

export type IThemeName = "light" | "dark";

export interface ISection {
    [name: string]: string;
}

export interface ITheme {
    name: IThemeName;
    colors: ISection;
}

export type IThemes = { [name in IThemeName]: ITheme };

export type IThemeState = ITheme;

export enum IThemeActionTypes {
    SET_THEME = "SET_THEME",
}

export type ISetThemeAction = PayloadAction<
    IThemeActionTypes.SET_THEME,
    ITheme
>;

export type IThemeActions = ISetThemeAction;
