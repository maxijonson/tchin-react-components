import React from "react";
import { Hooks } from "../../modules";
import { Tree } from "../../components";

const { useTree } = Hooks;

export default React.createContext<ReturnType<typeof useTree>>({
    addItem: () => () => null,
    removeItem: () => () => null,
    Component: () => <Tree items={{}} />,
});
