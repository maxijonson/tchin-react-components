import React from "react";
import Catcher, { ICatcherProps } from "../../components/Catcher/Catcher";

export default <T extends {}>(
    Component: React.ElementType,
    catcherProps?: ICatcherProps<T>
) => (props: ComponentProps<typeof Component>) => (
    <Catcher {...catcherProps}>
        <Component {...props} />
    </Catcher>
);
