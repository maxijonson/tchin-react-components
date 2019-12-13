import React from "react";
import { Hooks } from "../../modules";

const { useTree } = Hooks;

export default React.createContext<{
    addItem: ReturnType<typeof useTree>["addItem"];
}>({
    addItem: () => () => null,
});
