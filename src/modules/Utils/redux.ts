// https://medium.com/@martin_hotell/improved-redux-type-safety-with-typescript-2-8-2c11a8062575

type FunctionType = (...args: any[]) => any;

interface IActionCreatorsMapObject {
    [actionCreator: string]: FunctionType;
}

declare global {
    type ActionsUnion<A extends IActionCreatorsMapObject> = ReturnType<
        A[keyof A]
    >;
}

export interface IAction<T extends string> {
    type: T;
}

export interface IActionWithPayload<T extends string, P> extends IAction<T> {
    payload: P;
}

function createAction<T extends string>(type: T): IAction<T>;
function createAction<T extends string, P>(
    type: T,
    payload: P
): IActionWithPayload<T, P>;
function createAction<T extends string, P>(type: T, payload?: P) {
    return payload === undefined ? { type } : { type, payload };
}

export { createAction };
