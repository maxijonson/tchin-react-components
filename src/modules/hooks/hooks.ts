import * as _ from "lodash";
import * as React from "react";
import { Dispatch } from "redux";
import { app } from "src/app";
import { BREAKPOINTS } from "src/config";
import { Utils } from "src/modules";

export * from "./useStyled";

export const useForceUpdate = () => {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
    return () => forceUpdate({});
};

// NOTE: Hard to test performance since we only have 1 state (theme)
const useMapState = <S extends {}>(mapState: (state: IStoreState) => S) => {
    const error = React.useRef(null);
    const derivedState = React.useRef<S>(mapState(app.state));
    const forceUpdate = useForceUpdate();

    React.useLayoutEffect(() => {
        let hasUnsubbed = false;

        const unsubscribe = app.store.subscribe(() => {
            if (hasUnsubbed) {
                return;
            }
            try {
                const newState = mapState(app.state);
                if (!Utils.shallowEqual(newState, derivedState.current)) {
                    derivedState.current = newState;
                    forceUpdate();
                }
            } catch (e) {
                error.current = e;
                forceUpdate();
            }
        });

        return () => {
            hasUnsubbed = true;
            unsubscribe();
        };
    }, []);

    if (error.current) {
        throw error.current;
    }

    return derivedState.current;
};

const useMapDispatch = <D>(mapDispatch: (dispatch: Dispatch<any>) => D) => {
    const initialDispatch = React.useRef(mapDispatch(app.dispatch));
    const dispatchProps = React.useRef(initialDispatch.current);

    return dispatchProps.current;
};

export const useConnect = <S extends {}, D extends {}>(
    mapState?: (state: IStoreState) => S,
    mapDispatch?: (dispatch: Dispatch<any>) => D
) => {
    const stateProps = mapState ? useMapState(mapState) : {};
    const dispatchProps = mapDispatch ? useMapDispatch(mapDispatch) : {};
    return {
        ...stateProps,
        ...dispatchProps,
    } as S & D;
};

export const usePortal = (parent: HTMLElement, className?: string) => {
    const el = React.useRef(document.createElement("div"));
    el.current.className = className || "";
    React.useEffect(() => {
        parent.appendChild(el.current);

        return () => el.current.remove();
    }, []);
    return el.current;
};

export const useSetInterval = (cb: () => void, time: number = 1000) => {
    let interval: number;
    React.useEffect(() => {
        interval = window.setInterval(cb, time);
        return () => {
            if (interval) {
                window.clearInterval(interval);
            }
        };
    });
    return () => {
        if (interval) {
            window.clearInterval(interval);
        }
    };
};

export const useSetTimeout = (cb: () => void, time: number = 1000) => {
    let timeout: number;
    React.useEffect(() => {
        timeout = window.setTimeout(cb, time);
        return () => {
            if (timeout) {
                window.clearTimeout(timeout);
            }
        };
    });
    return () => {
        if (timeout) {
            window.clearTimeout(timeout);
        }
    };
};

enum IBreakpoint {
    "xs" = BREAKPOINTS.xs,
    "sm" = BREAKPOINTS.sm,
    "md" = BREAKPOINTS.md,
    "lg" = BREAKPOINTS.lg,
    "xl" = BREAKPOINTS.xl,
}
type IBreakpointMode = "screen" | "window";

export const useCurrentBreakpoint = (mode: IBreakpointMode = "window") => {
    const getBreakpoint = (width: number): IBreakpoint => {
        if (width >= BREAKPOINTS.xl) {
            return IBreakpoint.xl;
        }
        if (width >= BREAKPOINTS.lg) {
            return IBreakpoint.lg;
        }
        if (width >= BREAKPOINTS.md) {
            return IBreakpoint.md;
        }
        if (width >= BREAKPOINTS.sm) {
            return IBreakpoint.sm;
        }

        return IBreakpoint.xs;
    };

    const getCurrentBreakpoint = React.useCallback(
        _.throttle(
            () =>
                getBreakpoint(
                    mode === "window" ? window.innerWidth : screen.width
                ),
            500
        ),
        []
    );

    const [breakpoint, setBreakpoint] = React.useState<IBreakpoint>(
        getCurrentBreakpoint()
    );

    const onWindowResize = () => {
        setBreakpoint(getCurrentBreakpoint());
    };

    React.useLayoutEffect(() => {
        window.addEventListener("resize", onWindowResize);
        return () => {
            window.removeEventListener("resize", onWindowResize);
        };
    }, []);

    return breakpoint;
};
