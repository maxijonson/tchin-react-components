import { ITheme } from "./models";
import { createAction } from "../Utils";

export enum types {
    SET_THEME = "SET_THEME",
}

export const creators = {
    setTheme: (theme: ITheme) => createAction(types.SET_THEME, theme),
};
