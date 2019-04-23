import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";

import { ITheme } from "src/modules/CSS/themes";
import { themesReducer } from "src/reducers";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; // eslint-disable-line
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

declare global {
    interface IStoreState {
        theme: ITheme;
    }
}

type IStoreAction = IThemeAction;

const store = createStore(
    combineReducers<IStoreState, IStoreAction>({
        theme: themesReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
);

export { store as default };
