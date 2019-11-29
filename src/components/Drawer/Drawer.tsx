import React from "react";
import styled from "styled-components";
import { motion, useCycle } from "framer-motion";
import { ZINDEX } from "../../config/constants";
import ColorOverlay from "../ColorOverlay/ColorOverlay";
import { Hooks } from "../../modules";

const { useConnect } = Hooks;

type IVariants = React.ComponentProps<typeof motion.div>["variants"];

interface IDrawerBase {
    position?: "left" | "right" | "bottom" | "top";
}

interface IDrawerEventBased extends IDrawerBase {
    id: string;
    onRequestClose?: (toggle: () => void) => void;
    state?: never;
}

interface IDrawerStateBased extends IDrawerBase {
    state: "open" | "closed";
    onRequestClose?: () => void;
    id?: never;
}

type IDrawerProps = IDrawerEventBased | IDrawerStateBased;
type ICustomVariants = Pick<IDrawerProps, "position"> & { shadow: string };

const vDrawer: IVariants = {
    open: ({ shadow }: ICustomVariants) => ({
        x: 0,
        y: 0,
        boxShadow: `0 0 5px ${shadow}`,
        transition: {
            duration: 0.5,
        },
    }),
    closed: ({ position, shadow }: ICustomVariants) => {
        const coords: { x: string | number; y: string | number } = {
            x: 0,
            y: 0,
        };
        switch (position) {
            case "right":
                coords.x = "100%";
                break;
            case "top":
                coords.y = "-100%";
                break;
            case "bottom":
                coords.y = "100%";
                break;
            case "left":
            default:
                coords.x = "-100%";
                break;
        }
        return {
            ...coords,
            transition: {
                duration: 0.5,
            },
            transitionEnd: {
                boxShadow: `0 0 0px ${shadow}`,
            },
        };
    },
};

const vOverlay: IVariants = {
    open: {
        pointerEvents: "all",
        opacity: 0.8,
    },
    closed: {
        opacity: 0,
        transitionEnd: {
            pointerEvents: "none",
        },
    },
};

const DrawerContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: ${ZINDEX.drawer};
    pointer-events: none;
`;

const Overlay = styled(motion.custom(ColorOverlay))``;

type IDrawerSCProps = Omit<IDrawerProps, "id">;
const Drawer = styled(motion.div)<IDrawerSCProps>`
    pointer-events: all;
    position: absolute;
    min-width: 50px;
    min-height: 50px;
    padding: 0;
    margin: 0;
    background: ${({ theme }) => theme.colors.pageBackground};
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

const getToggleEventName = (id: string) => `TRC-drawer_toggle_${id}`;

export const drawerEventDispatch = (id: string) =>
    window.dispatchEvent(new Event(getToggleEventName(id)));

export default (props: IDrawerProps & { children?: React.ReactNode }) => {
    const { position, children, id, state } = props;
    const theme = useConnect(({ theme }) => theme);
    const [drawerOpen, toggleDrawer] = useCycle<"closed" | "open">(
        "closed",
        "open"
    ); // This state will only be used for EventBased Drawer

    const toggle = React.useCallback(() => toggleDrawer(), [toggleDrawer]);

    const close = React.useCallback(() => {
        // StateBased
        if (props.state)
            return props.onRequestClose ? props.onRequestClose() : null;

        // EventBased
        if (props.id)
            return props.onRequestClose
                ? props.onRequestClose(toggle)
                : toggle();
    }, [props, toggle]);

    React.useLayoutEffect(() => {
        if (!id) return;
        const toggleEvent = getToggleEventName(id);
        window.addEventListener(toggleEvent, toggle);
        return () => {
            window.removeEventListener(toggleEvent, toggle);
        };
    }, [id, toggle]);

    return (
        <DrawerContainer animate={state || drawerOpen} initial={false}>
            <Overlay variants={vOverlay} onClick={close} />
            <Drawer
                position={position}
                state={state || drawerOpen}
                variants={vDrawer}
                custom={{ position, shadow: theme.colors.defaultShadow }}
                children={children}
            />
        </DrawerContainer>
    );
};
