import React from "react";
import styled from "styled-components";
import { motion, useCycle } from "framer-motion";
import { ZINDEX } from "../../config/constants";
import ColorOverlay from "../ColorOverlay/ColorOverlay";
import Portal from "../Portal/Portal";
import { Hooks } from "../../modules";
import { BREAKPOINTS } from "../../config";

const { useConnect, useCurrentBreakpoint } = Hooks;

type IVariants = ComponentProps<typeof motion.div>["variants"];

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
    isOpen: boolean;
    onRequestClose?: () => void;
    id?: never;
    initiallyOpen?: never;
}

interface IDrawerEventBased {
    id: string;
    initiallyOpen?: IDrawerStateBased["isOpen"];
    onRequestClose?: (toggle: () => void) => void;
    isOpen?: never;
}

type IDrawerProps = (IDrawerEventBased | IDrawerStateBased) &
    (ITemporaryDrawer | IPersistentDrawer);

type ICustomVariants = Pick<IDrawerProps, "position"> & { shadow: string };

const vTemporaryDrawer: IVariants = {
    open: ({ shadow }: ICustomVariants) => ({
        x: 0,
        y: 0,
        boxShadow: `0 0 5px ${shadow}`,
        opacity: 1,
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
                opacity: 0,
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
const TemporaryDrawer = styled(motion.div)<IDrawerSCProps>`
    pointer-events: all;
    position: absolute;
    overflow-y: scroll;
    min-width: 50px;
    min-height: 50px;
    padding: 0;
    margin: 0;
    background: ${({ theme }) => theme.colors.pageBackground};
    max-width: ${({ position }) => {
        switch (position) {
            case "bottom":
            case "top":
                return undefined;
            default:
                return "85vw";
        }
    }};
    max-height: ${({ position }) => {
        switch (position) {
            case "top":
            case "bottom":
                return "85vh";
            default:
                return undefined;
        }
    }};
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
    const { position, children, id, isOpen } = props;
    const theme = useConnect(({ theme }) => theme);
    const breakpoint = useCurrentBreakpoint();

    // If false, will render a temporary drawer instead of persistent
    const sizeAllowed =
        breakpoint >=
        BREAKPOINTS[(props.persistent ? props.allowSize : undefined) ?? "xl"];

    // Will only be used for EventBased Drawer
    const [drawerOpenState, toggleDrawer] = useCycle<
        IDrawerStateBased["isOpen"]
    >(!!props.initiallyOpen, !props.initiallyOpen);

    // Evaluates the state of the Drawer for both EventBased and StateBased Drawers
    const drawerOpen = isOpen != undefined ? isOpen : drawerOpenState;
    const animate = drawerOpen ? "open" : "closed";

    const toggle = React.useCallback(() => toggleDrawer(), [toggleDrawer]);

    // Called when an exit event is fired
    const onClose = React.useCallback(() => {
        // StateBased
        if (props.isOpen)
            return props.onRequestClose ? props.onRequestClose() : null;

        // EventBased
        if (props.id)
            return props.onRequestClose
                ? props.onRequestClose(toggle)
                : toggle();

        throw new Error("Drawer was not given either a 'open' or 'id' prop");
    }, [props, toggle]);

    // Triggers an exit event on ESC
    const escape = React.useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        },
        [onClose]
    );

    React.useLayoutEffect(() => {
        // Only add 'keyup' when a temporary drawer is opened
        if (drawerOpen && (!props.persistent || !sizeAllowed)) {
            window.addEventListener("keyup", escape);
        }

        // Don't register toggleEvent for StateBased Drawers
        if (!id) {
            return () => {
                // Unmount events
                window.removeEventListener("keyup", escape);
            };
        }

        // Register toggleEvent for EventBased Drawers
        const toggleEvent = getToggleEventName(id);
        window.addEventListener(toggleEvent, toggle);

        return () => {
            // Unmount events
            window.removeEventListener(toggleEvent, toggle);
            window.removeEventListener("keyup", escape);
        };
    }, [drawerOpen, escape, id, props.persistent, sizeAllowed, toggle]);

    // Temporary drawer
    if (!props.persistent)
        return (
            <>
                <DrawerContainer animate={animate} initial={false}>
                    <Overlay variants={vOverlay} onClick={onClose} />
                    <TemporaryDrawer
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
        // Temporary Drawer
        <>
            <DrawerContainer animate={animate} initial={false}>
                <Overlay variants={vOverlay} onClick={onClose} />
                <TemporaryDrawer
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
