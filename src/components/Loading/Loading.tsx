import React from "react";
import { ILoadingProps } from "./model";
import Spinner from "./Spinner";
import Bar from "./Bar";

export default (props: ILoadingProps) => {
    switch (props.type) {
        default:
        case "spinner":
            return <Spinner {...props} />;
        case "bar":
            return <Bar {...props} />;
    }
};
