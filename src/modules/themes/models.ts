export type IThemeName = "light" | "dark";

export interface ISection {
    [name: string]: string;
}

export interface ITheme {
    name: IThemeName;
    colors: ISection;
}

export type IThemes = { [name in IThemeName]: ITheme };
