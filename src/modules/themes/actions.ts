import { ISetThemeAction, ITheme, IThemeActionTypes } from "./types";
import { createPayloadAction } from "../../store/actions";

export const setThemeAction = (theme: ITheme): ISetThemeAction =>
    createPayloadAction(IThemeActionTypes.SET_THEME, theme);
