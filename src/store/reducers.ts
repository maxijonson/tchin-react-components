import { combineReducers, Reducer, Store } from "redux";

import { ILoadedReducers, ILoadedState } from "./types";
import { themeReducers } from "../modules/themes/reducers";

let asyncReducers: ILoadedReducers = {};

export const createRootReducers = (): Reducer<ILoadedState> => {
    const initialReducers: ILoadedReducers = {
        //@ts-ignore
        theme: themeReducers,
        ...asyncReducers,
    };
    //@ts-ignore
    return combineReducers(initialReducers);
};

export const injectReducer = (
    store: Store<ILoadedState>,
    reducers: ILoadedReducers
) => {
    asyncReducers = { ...asyncReducers, ...reducers };
    store.replaceReducer(createRootReducers());
};

// Store config inspired by https://rangle.io/blog/redux-typescripted/
