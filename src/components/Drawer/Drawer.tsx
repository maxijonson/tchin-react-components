import React from "react";
import styled from "styled-components";
import { motion, useCycle } from "framer-motion";
import { ZINDEX } from "../../config/constants";

type IVariants = React.ComponentProps<typeof motion.div>["variants"];

interface IDrawerProps {
    position?: "left" | "right" | "bottom" | "top";
    size?: string | number;
    mode?: string; // TODO: specify
    initialState?: "open" | "closed";
    id: string;
}

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

const DrawerContainer = styled(motion.div)<
    Omit<IDrawerProps, "initialState" | "id">
>`
    position: fixed;
    box-shadow: 0 5px 5px black;
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
    float: ${({ position }) => position || "left"};
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
            case "bottom":
            case "left":
            case "top":
            default:
                return 0;
            case "right":
                return undefined;
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

const DRAWER_EVENT = "TRC-drawer";

const getEventName = (id: string) => `${DRAWER_EVENT}_${id}`;

export const drawerEventDispatch = (id: string) =>
    window.dispatchEvent(new Event(getEventName(id)));

export default (props: IDrawerProps & { children?: React.ReactNode }) => {
    const { id } = props;
    const [drawerOpen, toggleDrawer] = useCycle("closed", "open");

    const toggle = React.useCallback(() => toggleDrawer(), [toggleDrawer]);

    React.useLayoutEffect(() => {
        const event = getEventName(id);
        window.addEventListener(event, toggle);
        return () => {
            window.removeEventListener(event, toggle);
        };
    }, [id, toggle]);

    return (
        <DrawerContainer
            variants={vDrawer}
            animate={drawerOpen}
            initial={false}
            custom={{
                size: props.size,
                position: props.position,
            }}
            children={props.children}
        />
    );
};
