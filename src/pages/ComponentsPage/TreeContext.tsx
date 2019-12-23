import React from "react";
import { Hooks } from "../../modules";
import { Tree } from "../../components";

const { useTree } = Hooks;

export interface IData {
    name: string;
    ref: React.RefObject<HTMLElement>;
}

// HACK: allows us to infer the ReturnType of a generic function (useTree<T>)
// eslint-disable-next-line react-hooks/rules-of-hooks
const useTreeData = () => useTree<IData>();

export default React.createContext<ReturnType<typeof useTreeData>>({
    addItem: () => () => null,
    removeItem: () => () => null,
    Component: () => <Tree items={{}} />,
});
