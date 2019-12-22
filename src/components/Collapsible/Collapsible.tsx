import React from "react";
import { useCycle, motion } from "framer-motion";

type IVariants = React.ComponentProps<typeof motion.div>["variants"];

interface ICollapsibleBaseProps {
    children: React.ReactNode;
}

interface ICollapsibleStateBasedProps extends ICollapsibleBaseProps {
    collapsed: boolean;
    initialCollapse?: never;
    id?: never;
}

interface ICollapsibleEventBasedProps extends ICollapsibleBaseProps {
    id: string;
    initialCollapse?: boolean;
    collapsed?: never;
}

type ICollapsibleProps =
    | ICollapsibleStateBasedProps
    | ICollapsibleEventBasedProps;

const variants: IVariants = {
    open: {
        display: "block",
        height: "inherit",
    },
    closed: {
        height: 0,
        overflowY: "hidden",
        transitionEnd: {
            display: "none",
        },
    },
};

const getToggleEventName = (id: string) => `TRC-collapsible_toggle_${id}`;

export const toggleCollapsible = (id: string) =>
    window.dispatchEvent(new Event(getToggleEventName(id)));

export default (props: ICollapsibleProps) => {
    // Will only be used for EventBased Collapsible
    const [openState, toggleState] = useCycle<
        ICollapsibleStateBasedProps["collapsed"]
    >(!!props.initialCollapse, !props.initialCollapse);

    // Evaluates the state of the Drawer for both EventBased and StateBased Drawers
    const animate = React.useMemo(() => {
        if (!props.id) {
            return props.collapsed ? "open" : "closed";
        }
        return openState ? "open" : "closed";
    }, [openState, props.collapsed, props.id]);

    const toggle = React.useCallback(() => toggleState(), [toggleState]);

    React.useLayoutEffect(() => {
        if (!props.id) return () => null;
        const toggleEvent = getToggleEventName(props.id);
        window.addEventListener(toggleEvent, toggle);
        return () => {
            window.removeEventListener(toggleEvent, toggle);
        };
    }, [props.id, toggle]);

    return (
        <motion.div animate={animate} variants={variants} initial={false}>
            {props.children}
        </motion.div>
    );
};
