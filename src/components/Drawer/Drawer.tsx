import React from "react";
import styled from "styled-components";
import { motion, useCycle } from "framer-motion";
import { ZINDEX } from "../../config/constants";

type IVariants = React.ComponentProps<typeof motion.div>["variants"];

interface IDrawerBase {
    position?: "left" | "right" | "bottom" | "top";
    size?: string | number;
}

interface IDrawerEventBased extends IDrawerBase {
    id: string;
    state?: never;
}

interface IDrawerStateBased extends IDrawerBase {
    state: "open" | "closed";
    id?: never;
}

type IDrawerProps = IDrawerEventBased | IDrawerStateBased;

const DEFAULT_SIZE_H = "30vw";
const DEFAULT_SIZE_V = "30vh";

const vDrawer: IVariants = {
    open: {
        x: 0,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
    closed: ({ position, size }: Pick<IDrawerProps, "position" | "size">) => {
        const coords: { x: string | number; y: string | number } = {
            x: 0,
            y: 0,
        };
        switch (position) {
            case "right":
                coords.x = size || DEFAULT_SIZE_H;
                break;
            case "top":
                coords.y = `-${size || DEFAULT_SIZE_V}`;
                break;
            case "bottom":
                coords.y = size || DEFAULT_SIZE_V;
                break;
            case "left":
            default:
                coords.x = `-${size || DEFAULT_SIZE_H}`;
                break;
        }
        return {
            ...coords,
            transition: {
                duration: 0.5,
            },
        };
    },
};

const Drawer = styled(motion.div)<Omit<IDrawerProps, "initialState" | "id">>`
    position: fixed;
    transition: box-shadow 0.5s;
    box-shadow: ${({ state, theme }) =>
        `0 0 ${state == "open" ? "5px" : "0px"} ${theme.colors.defaultShadow}`};
    z-index: ${ZINDEX.drawer};
    background: ${({ theme }) => theme.colors.pageBackground};
    width: ${({ position, size }) =>
        !position || position == "left" || position == "right"
            ? size || DEFAULT_SIZE_H
            : undefined};
    height: ${({ position, size }) =>
        position == "top" || position == "bottom"
            ? size || DEFAULT_SIZE_V
            : undefined};
    top: ${({ position }) => {
        switch (position) {
            case "bottom":
                return undefined;
            case "left":
            case "right":
            case "top":
            default:
                return 0;
        }
    }};
    left: ${({ position }) => {
        switch (position) {
            case "right":
                return undefined;
            case "bottom":
            case "left":
            case "top":
            default:
                return 0;
        }
    }};
    bottom: ${({ position }) => {
        switch (position) {
            case "bottom":
            case "left":
            case "right":
            default:
                return 0;
            case "top":
                return undefined;
        }
    }};
    right: ${({ position }) => {
        switch (position) {
            case "bottom":
            case "right":
            case "top":
                return 0;
            case "left":
            default:
                return undefined;
        }
    }};
`;

const getEventName = (id: string) => `TRC-drawer_${id}`;

export const drawerEventDispatch = (id: string) =>
    window.dispatchEvent(new Event(getEventName(id)));

export default (props: IDrawerProps & { children?: React.ReactNode }) => {
    const { size, position, children, id, state } = props;
    const [drawerOpen, toggleDrawer] = useCycle<"closed" | "open">(
        "closed",
        "open"
    );

    const toggle = React.useCallback(() => toggleDrawer(), [toggleDrawer]);

    React.useLayoutEffect(() => {
        if (!id) return;
        const event = getEventName(id);
        window.addEventListener(event, toggle);
        return () => {
            window.removeEventListener(event, toggle);
        };
    }, [id, toggle]);

    return (
        <Drawer
            position={position}
            size={size}
            state={state || drawerOpen}
            variants={vDrawer}
            animate={state || drawerOpen}
            initial={false}
            custom={{ size, position }}
            children={children}
        />
    );
};
