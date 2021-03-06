import { ITheme } from "./models";
import { SESSION_KEYS } from "../../config";
import { creators, types } from "./actions";

export const makeThemeReducer = (initialState: ITheme) => (
    state: ITheme = initialState,
    action: ActionsUnion<typeof creators>
) => {
    switch (action.type) {
        case types.SET_THEME:
            window.sessionStorage.setItem(
                SESSION_KEYS.theme,
                action.payload.name
            );
            return action.payload;
        default:
            return state;
    }
};
