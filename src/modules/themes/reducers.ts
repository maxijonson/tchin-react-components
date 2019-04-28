import { Reducer } from "redux";
import moment from "moment";
import { IThemeActions, IThemeActionTypes, IThemeState } from "./types";
import { defaultThemes } from "./themes";
import { SESSION_KEYS } from "../../config";

const format = "H";
const night = {
    start: 19,
    end: 5,
};
const now = Number(moment().format(format));
const isNight = now > night.start || now < night.end;

export const initialThemeState: IThemeState = isNight
    ? defaultThemes.dark
    : defaultThemes.light;

export const themeReducers: Reducer<IThemeState, IThemeActions> = (
    state = initialThemeState,
    action
) => {
    switch (action.type) {
        case IThemeActionTypes.SET_THEME:
            window.sessionStorage.setItem(
                SESSION_KEYS.theme,
                action.payload.name
            );
            return action.payload;
        default:
            return state;
    }
};
