import React from "react";
import styled from "styled-components";
import { motion, useCycle } from "framer-motion";
import { ZINDEX } from "../../config/constants";
import ColorOverlay from "../ColorOverlay/ColorOverlay";
import Portal from "../Portal/Portal";
import { Hooks } from "../../modules";
import { BREAKPOINTS } from "../../config";

const { useConnect, useCurrentBreakpoint } = Hooks;

type IVariants = React.ComponentProps<typeof motion.div>["variants"];

interface ITemporaryDrawer {
    persistent?: false;
    position?: "left" | "right" | "top" | "bottom";
}

interface IPersistentDrawer {
    persistent: true;
    position?: "left" | "right";
    width?: string;
    allowSize?: "xs" | "sm" | "md" | "lg";
    portalQuery?: string;
}

interface IDrawerStateBased {
    open: boolean;
    onRequestClose?: () => void;
    id?: never;
    initialOpen: never;
}

interface IDrawerEventBased {
    id: string;
    initialOpen?: IDrawerStateBased["open"];
    onRequestClose?: (toggle: () => void) => void;
    open?: never;
}

type IDrawerProps = (IDrawerEventBased | IDrawerStateBased) &
    (ITemporaryDrawer | IPersistentDrawer);

type ICustomVariants = Pick<IDrawerProps, "position"> & { shadow: string };

const vTemporaryDrawer: IVariants = {
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

const vContentPusher: IVariants = {
    open: ({ width }) => ({
        width,
        display: "inherit",
        transition: {
            duration: 0.5,
        },
    }),
    closed: {
        width: "0",
        transition: {
            duration: 0.5,
        },
        transitionEnd: {
            display: "none",
        },
    },
};

const vPersistentDrawer: IVariants = {
    open: {
        x: 0,
        transition: {
            duration: 0.5,
        },
    },
    closed: ({ position }) => ({
        x: (() => {
            switch (position) {
                case "right":
                    return "100%";
                case "left":
                default:
                    return "-100%";
            }
        })(),
        transition: {
            duration: 0.5,
        },
    }),
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
    z-index: ${ZINDEX.temporaryDrawer};
    pointer-events: none;
`;

const Overlay = styled(motion.custom(ColorOverlay))``;

type IDrawerSCProps = Partial<IDrawerProps>;
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

type IPersistentDrawerProps = Partial<IPersistentDrawer>;
const ContentPusher = styled(motion.div)<IPersistentDrawerProps>`
    order: ${({ position }) => {
        switch (position) {
            case "right":
                return 1;
            case "left":
            default:
                return -1;
        }
    }};
    flex-shrink: 0;
    flex: 0 0 auto;
    width: ${({ width }) => width};
`;

const PersistentDrawer = styled(motion.div)<IPersistentDrawerProps>`
    width: ${({ width }) => width};
    z-index: ${ZINDEX.persistentDrawer};

    top: 0;
    left: ${({ position }) => {
        switch (position) {
            case "right":
                return undefined;
            case "left":
            default:
                return 0;
        }
    }};
    right: ${({ position }) => {
        switch (position) {
            case "right":
                return 0;
            case "left":
            default:
                return undefined;
        }
    }};

    flex: 1 0 auto;
    height: 100vh;
    display: flex;
    position: fixed;
    overflow-y: auto;
    flex-direction: column;

    background-color: ${({ theme }) => theme.colors.pageBackground};
    border-right: ${({ position, theme }) =>
        position == "left" && `1px solid ${theme.colors.drawerBorder}`};
    border-left: ${({ position, theme }) =>
        position == "right" && `1px solid ${theme.colors.drawerBorder}`};
`;

const defaultWidth = "240px";

const getToggleEventName = (id: string) => `TRC-drawer_toggle_${id}`;

export const drawerEventDispatch = (id: string) =>
    window.dispatchEvent(new Event(getToggleEventName(id)));

export default (props: IDrawerProps & { children?: React.ReactNode }) => {
    const { position, children, id, open } = props;
    const theme = useConnect(({ theme }) => theme);
    const breakpoint = useCurrentBreakpoint();

    // Will only be used for EventBased Drawer
    const [drawerOpenState, toggleDrawer] = useCycle<IDrawerStateBased["open"]>(
        !!props.initialOpen,
        !props.initialOpen
    );

    // Evaluates the state of the Drawer for both EventBased and StateBased Drawers
    const drawerOpen = open != undefined ? open : drawerOpenState;
    const animate = drawerOpen ? "open" : "closed";

    const toggle = React.useCallback(() => toggleDrawer(), [toggleDrawer]);

    // Called when an exit event is fired
    const onClose = React.useCallback(() => {
        // StateBased
        if (props.open)
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

    // Temporary drawer
    if (!props.persistent)
        return (
            <>
                <DrawerContainer animate={animate} initial={false}>
                    <Overlay variants={vOverlay} onClick={onClose} />
                    <Drawer
                        position={position}
                        variants={vTemporaryDrawer}
                        custom={{
                            position,
                            shadow: theme.colors.defaultShadow,
                        }}
                        children={children}
                    />
                </DrawerContainer>
            </>
        );

    // Persistent Drawer
    // If false, renders a temporary drawer instead
    const sizeAllowed = breakpoint >= BREAKPOINTS[props.allowSize || "xl"];

    return sizeAllowed ? (
        <Portal query={props.portalQuery || "#app > div"}>
            <ContentPusher
                animate={animate}
                variants={vContentPusher}
                initial={false}
                position={props.position || "left"}
                width={props.width || defaultWidth}
                custom={{
                    width: props.width || defaultWidth,
                }}
            >
                <PersistentDrawer
                    position={props.position || "left"}
                    width={props.width || defaultWidth}
                    variants={vPersistentDrawer}
                    custom={{ position }}
                >
                    <div>{children}</div>
                </PersistentDrawer>
            </ContentPusher>
        </Portal>
    ) : (
        <>
            <DrawerContainer animate={animate} initial={false}>
                <Overlay variants={vOverlay} onClick={onClose} />
                <Drawer
                    position={position}
                    variants={vTemporaryDrawer}
                    custom={{
                        position,
                        shadow: theme.colors.defaultShadow,
                    }}
                    children={children}
                    style={{ width: props.width || defaultWidth }}
                />
            </DrawerContainer>
        </>
    );
};
