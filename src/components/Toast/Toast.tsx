// Inspired by https://stackblitz.com/edit/react-zdjfv5?file=Toast%2Findex.js
import React from "react";
import styled from "styled-components";
import tinycolor from "tinycolor2";
import _ from "lodash";
import { motion, AnimatePresence } from "framer-motion";
import produce, { Draft } from "immer";
import { ZINDEX } from "../../config";
import Ul from "../Layouts/Ul";

type IPosition =
    | "topLeft"
    | "top"
    | "topRight"
    | "bottomLeft"
    | "bottom"
    | "bottomRight";

interface IToast {
    message: React.ReactNode;
    id: string;
    /** in ms */
    duration: number;
    showProgress: boolean;
    onClick: (close: () => void) => void;
    contextState?: IContextState;
    autoDismiss?: boolean;
}

type IToasts = { [id: string]: IToast };

interface IToastProps extends IToast {
    remove: () => void;
    options?: {
        position?: IPosition;
    };
}

const DEFAULT_DURATION = 5000;

const ToastListContainer = styled.div<{ position: IPosition }>`
    position: fixed;
    z-index: ${ZINDEX.toast};
    pointer-events: none;
    & > ul {
        margin: 10px;
        width: 320px;
        height: 100%;
        position: fixed;
        display: flex;
        list-style: none;
        justify-content: flex-end;
        right: ${({ position }) => {
            switch (position) {
                case "bottomRight":
                case "topRight":
                    return 0;
                default:
                    return undefined;
            }
        }};
        bottom: ${({ position }) => {
            switch (position) {
                case "bottomLeft":
                case "bottom":
                case "bottomRight":
                    return 0;
                default:
                    return undefined;
            }
        }};
        top: ${({ position }) => {
            switch (position) {
                case "topLeft":
                case "top":
                case "topRight":
                    return 0;
                default:
                    return undefined;
            }
        }};
        left: ${({ position }) => {
            switch (position) {
                case "bottomLeft":
                case "topLeft":
                    return 0;
                case "bottom":
                case "top":
                    return "50%";
                default:
                    return undefined;
            }
        }};
        transform: ${({ position }) => {
            switch (position) {
                case "bottom":
                case "top":
                    return "translateX(-50%)";
                default:
                    return undefined;
            }
        }};
        flex-direction: ${({ position }) => {
            switch (position) {
                case "top":
                case "topLeft":
                case "topRight":
                    return "column-reverse";
                case "bottom":
                case "bottomLeft":
                case "bottomRight":
                default:
                    return "column";
            }
        }};
    }
`;

const StyledToast = styled(motion.li)<{ contextState?: IContextState }>`
    pointer-events: all;
    position: relative;
    width: 100%;
    color: ${({ theme }) => theme.colors.defaultText};
    background: ${({ theme, contextState }) =>
        tinycolor
            .mix(
                theme.colors.toastBackground,
                theme.colors[contextState ?? "toastBackground"],
                30
            )
            .toHexString()};
    margin: 10px 0;
    padding: 20px 10px;
    cursor: pointer;
    opacity: 0;
    box-shadow: 0 0 15px -7px ${({ theme }) => theme.colors.toastShadow};
    user-select: none;
    font-size: 0.8em;
`;

const ToastProgress = styled(motion.div)<{ contextState?: IContextState }>`
    position: absolute;
    bottom: 0;
    left: 0;
    height: 5px;
    background-color: ${({ theme, contextState }) =>
        theme.colors[contextState ?? "toastProgress"]};
`;

const defaultToast: IToast = {
    message: "No message",
    duration: DEFAULT_DURATION,
    onClick: (close) => close(),
    showProgress: true,
    autoDismiss: true,
    contextState: undefined,
    id: "toast",
};

const Toast = ({
    message,
    remove,
    duration,
    options,
    onClick,
    showProgress,
    contextState,
    autoDismiss,
}: IToastProps) => {
    const removeRef = React.useRef(remove);
    const remainingTime = React.useRef(duration);
    const startTime = React.useRef(Date.now());
    const timeout = React.useRef(0);
    const [paused, setPaused] = React.useState(false);

    const position = options?.position ?? "bottomRight";

    const initialY = React.useMemo(() => {
        switch (position) {
            case "top":
            case "topLeft":
            case "topRight":
                return "-100%";
            case "bottom":
            case "bottomLeft":
            case "bottomRight":
            default:
                return "100%";
        }
    }, [position]);

    const pause = React.useCallback(() => {
        const now = Date.now();
        window.clearTimeout(timeout.current);
        remainingTime.current -= now - startTime.current;
        setPaused(true);
    }, []);

    const resume = React.useCallback(() => {
        startTime.current = Date.now();
        timeout.current = window.setTimeout(
            removeRef.current,
            remainingTime.current
        );
        setPaused(false);
    }, []);

    React.useEffect(() => {
        // Do nothing if !autoDismiss
        if (!autoDismiss) return () => null;

        // Start the timeout onMount
        resume();

        // Clear the timeout at unMount
        return () => window.clearTimeout(timeout.current);
    }, [autoDismiss, resume]);

    return (
        <StyledToast
            positionTransition
            initial={{ opacity: 0, y: initialY }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => onClick(removeRef.current)}
            contextState={contextState}
            onHoverStart={autoDismiss ? pause : undefined}
            onHoverEnd={autoDismiss ? resume : undefined}
        >
            {message}
            {showProgress &&
                autoDismiss &&
                (paused ? (
                    <ToastProgress
                        key="paused"
                        contextState={contextState}
                        style={{
                            width: `${(remainingTime.current / duration) *
                                100}%`,
                        }}
                    />
                ) : (
                    <ToastProgress
                        key="unpaused"
                        initial={{
                            width: `${(remainingTime.current / duration) *
                                100}%`,
                        }}
                        animate={{ width: "0%" }}
                        transition={{
                            duration: remainingTime.current / 1000,
                            ease: "linear",
                        }}
                        contextState={contextState}
                    />
                ))}
        </StyledToast>
    );
};

interface IToastContext {
    addToast: (toast: Partial<IToast>) => void;
    removeToast: (id: string) => void;
}

const ToastContext = React.createContext<IToastContext | null>(null);

export const withToastProvider = <P extends {}>(
    Component: React.ComponentType<P>,
    defaultProps: Partial<IToast> = defaultToast,
    options?: IToastProps["options"]
) => {
    const MemoComponent = React.memo<P>((p) => <Component {...p} />);

    const ToastProvided = (props: P) => {
        const [toasts, setToasts] = React.useState<IToasts>({});

        const addToast = React.useCallback<IToastContext["addToast"]>(
            (toast) =>
                setToasts(
                    produce((draft: Draft<IToasts>) => {
                        const id = toast?.id ?? Date.now().toString();
                        draft[id] = {
                            ...defaultToast,
                            ...defaultProps,
                            ...toast,
                            id,
                        };
                    })
                ),
            []
        );

        const removeToast = React.useCallback<IToastContext["removeToast"]>(
            (id) =>
                setToasts(
                    produce((draft: Draft<IToasts>) => {
                        delete draft[id];
                    })
                ),
            []
        );

        const providerValue = React.useMemo(
            () => ({
                addToast,
                removeToast,
            }),
            [addToast, removeToast]
        );

        return (
            <ToastContext.Provider value={providerValue}>
                <MemoComponent {...props} />

                <ToastListContainer
                    position={options?.position ?? "bottomRight"}
                >
                    <Ul>
                        <AnimatePresence initial={false}>
                            {_.map(toasts, (toast) => (
                                <Toast
                                    {...toast}
                                    key={toast.id}
                                    options={options}
                                    remove={() => removeToast(toast.id)}
                                />
                            ))}
                        </AnimatePresence>
                    </Ul>
                </ToastListContainer>
            </ToastContext.Provider>
        );
    };

    return ToastProvided;
};

export const useToast = (): IToastContext => {
    const context = React.useContext(ToastContext);

    if (!context) {
        console.error("You are using useToast, but no context has been found");
        return { addToast: () => null, removeToast: () => null };
    }

    return { ...context };
};
