import React from "react";
import _ from "lodash";
import { useToast, Button } from "../../../components";

export default () => {
    const { addToast } = useToast();
    const onClick = React.useCallback(
        (contextState?: IContextState) => {
            addToast({
                message: contextState ?? "Default",
                contextState,
                duration: 15000,
            });
        },
        [addToast]
    );
    return (
        <>
            <Button onClick={() => onClick()}>Default</Button>
            {_.map(
                [
                    "danger",
                    "info",
                    "primary",
                    "secondary",
                    "success",
                    "warn",
                ] as IContextState[],
                (contextState) => (
                    <Button
                        onClick={() => onClick(contextState)}
                        state={contextState}
                    >
                        {contextState ?? "Default"}
                    </Button>
                )
            )}
        </>
    );
};
