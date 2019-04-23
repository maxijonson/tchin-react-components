import moment from "moment";
import { SESSION_KEYS } from "src/config";
import { ITheme, themes } from "src/modules/CSS";

const format = "H";
const night = {
    start: 19,
    end: 5,
};
const now = Number(moment().format(format));
const isNight = now > night.start || now < night.end;

export const themesReducerDefaultState: ITheme = isNight
    ? themes.dark
    : themes.light;

const getInitialState = (): ITheme => {
    switch (window.sessionStorage.getItem(SESSION_KEYS.theme)) {
        case themes.light.name:
            return themes.light;
        case themes.dark.name:
            return themes.dark;
        default:
            return themesReducerDefaultState;
    }
};

export const themesReducer = (
    state: ITheme = getInitialState(),
    action: IThemeAction
): ITheme => {
    switch (action.type) {
        case "themes/SET_THEME":
            window.sessionStorage.setItem(
                SESSION_KEYS.theme,
                action.theme.name
            );
            return action.theme;
        case "themes/RESET_THEME":
            window.sessionStorage.setItem(
                SESSION_KEYS.theme,
                themesReducerDefaultState.name
            );
            return themesReducerDefaultState;
        default:
            return state;
    }
};
