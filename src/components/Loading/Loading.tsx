import React from "react";
import { ILoadingProps } from "./model";
import Spinner from "./Spinner";

export default (props: ILoadingProps) => {
    switch (props.type) {
        default:
        case "spinner":
            return <Spinner {...props} />;
        case "bar":
            return null;
    }
};
