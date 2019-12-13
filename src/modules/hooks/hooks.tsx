import _ from "lodash";
import React from "react";
import styled from "styled-components";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import Background, {
    IBackgroundOptions,
} from "../../components/Background/Background";
import Tree from "../../components/Tree/Tree";
import { BREAKPOINTS } from "../../config";

export const useForceUpdate = () => {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
    return () => forceUpdate({});
};

// TODO: Benchmark immutability
export const useConnect = <S extends {}, D extends {}>(
    mapState?: (state: IStoreState) => S,
    mapDispatch?: (dispatch: Dispatch<any>) => D,
    mapStateDeep?: boolean
) => {
    const stateProps = useSelector(
        mapState || (() => ({})),
        mapStateDeep ? _.isEqual : undefined
    ) as S;
    const dispatch = useDispatch();
    const dispatchProps = (mapDispatch ? mapDispatch(dispatch) : {}) as D;
    return {
        ...stateProps,
        ...dispatchProps,
    };
};

export const usePortalOld = (parent: HTMLElement, className?: string) => {
    const elRef = React.useRef(document.createElement("div"));
    elRef.current.className = className || "";
    React.useEffect(() => {
        parent.appendChild(elRef.current);
        const el = elRef.current;
        return () => el.remove();
    }, [parent]);
    return elRef.current;
};

export const useSetInterval = (cb: () => void, time: number = 1000) => {
    let interval = React.useRef(0);
    React.useEffect(() => {
        interval.current = window.setInterval(cb, time);
        return () => {
            if (interval.current) {
                window.clearInterval(interval.current);
            }
        };
    });
    return () => {
        if (interval.current) {
            window.clearInterval(interval.current);
        }
    };
};

export const useSetTimeout = (cb: () => void, time: number = 1000) => {
    let timeout = React.useRef(0);
    React.useEffect(() => {
        timeout.current = window.setTimeout(cb, time);
        return () => {
            if (timeout.current) {
                window.clearTimeout(timeout.current);
            }
        };
    });
    return () => {
        if (timeout.current) {
            window.clearTimeout(timeout.current);
        }
    };
};

export const useGetDimensions = (options?: { throttle: number }) => {
    const getCurrentDimensions = React.useCallback(
        _.throttle(
            () => ({
                width: window.innerWidth,
                height: window.innerHeight,
            }),
            options ? options.throttle || 500 : 500 // TODO: null coalescing and optional chaining
        ),
        []
    );
    const [dimensions, setDimensions] = React.useState(getCurrentDimensions());

    React.useLayoutEffect(() => {
        let timeout: number;
        const onWindowResize = () => {
            if (timeout) window.clearTimeout(timeout);
            timeout = window.setTimeout(
                () => {
                    setDimensions(getCurrentDimensions());
                },
                options ? options.throttle || 500 : 500
            );
            setDimensions(getCurrentDimensions());
        };
        window.addEventListener("resize", onWindowResize);
        return () => {
            if (timeout) window.clearTimeout(timeout);
            window.removeEventListener("resize", onWindowResize);
        };
    }, [getCurrentDimensions, options]);

    return dimensions;
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

    React.useLayoutEffect(() => {
        const onWindowResize = () => {
            setBreakpoint(getCurrentBreakpoint());
        };
        window.addEventListener("resize", onWindowResize);
        return () => {
            window.removeEventListener("resize", onWindowResize);
        };
    }, [getCurrentBreakpoint]);

    return breakpoint;
};

export const useBackground = (
    Component: React.ElementType,
    url: string,
    options: IBackgroundOptions = { parallax: false, blurAmount: 3 }
) => {
    const StyledComponent = React.useMemo(
        () => styled(Component)`
            position: relative;
            overflow: hidden;
        `,
        [Component]
    );
    return ({ children }: { children: React.ReactNode }) => (
        <StyledComponent>
            <Background background={url} {...options} />
            {children}
        </StyledComponent>
    );
};

type ITreeItems = React.ComponentProps<typeof Tree>["items"];
export const useTree = () => {
    const [items, setItems] = React.useState<ITreeItems>({});

    const Component = React.useCallback(() => <Tree items={items} />, [items]);

    const removeItem = React.useCallback(
        (id: string) =>
            setItems((state) => {
                delete state[id];
                return state;
            }),
        []
    );

    const addItem = React.useCallback(
        (item: ITreeItems[0]) => {
            setItems((state) => ({
                ...state,
                [item.id]: item,
            }));
            return () => removeItem(item.id);
        },
        [removeItem]
    );

    return { Component, addItem };
};
