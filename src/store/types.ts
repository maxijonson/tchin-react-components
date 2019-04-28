import { Action, ReducersMapObject } from "redux";

export interface IStoreState {
    theme: import("../modules/themes/types").IThemeState;
}

export type IReducers = ReducersMapObject<IStoreState>;

export type ILoadedState = Partial<IStoreState>;

export type ILoadedReducers = Partial<IReducers>;

export type MetaAction<Type, Meta> = Action<Type> & {
    meta?: Meta;
};

export type PayloadAction<Type, Payload, Meta = void> = MetaAction<
    Type,
    Meta
> & {
    readonly payload: Payload;
};
