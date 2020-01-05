import _ from "lodash";
import React from "react";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import Tree, { ITreeProps } from "../../components/Tree/Tree";
import { BREAKPOINTS } from "../../config";

export const useForceUpdate = () => {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
    return () => forceUpdate();
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

export const useSetInterval = (cb: () => void, time = 1000) => {
    const interval = React.useRef(0);
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

export const useSetTimeout = (cb: () => void, time = 1000) => {
    const timeout = React.useRef(0);
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

export const useCurrentBreakpoint = () => {
    const getBreakpoint = React.useCallback((width: number) => {
        if (width >= BREAKPOINTS.xl) {
            return BREAKPOINTS.xl;
        }
        if (width >= BREAKPOINTS.lg) {
            return BREAKPOINTS.lg;
        }
        if (width >= BREAKPOINTS.md) {
            return BREAKPOINTS.md;
        }
        if (width >= BREAKPOINTS.sm) {
            return BREAKPOINTS.sm;
        }

        return BREAKPOINTS.xs;
    }, []);

    const [breakpoint, setBreakpoint] = React.useState<
        typeof BREAKPOINTS[keyof typeof BREAKPOINTS]
    >(getBreakpoint(window.innerWidth));

    React.useLayoutEffect(() => {
        const onWindowResize = () => {
            setBreakpoint(getBreakpoint(window.innerWidth));
        };
        window.addEventListener("resize", onWindowResize);
        return () => {
            window.removeEventListener("resize", onWindowResize);
        };
    }, [getBreakpoint]);

    return breakpoint;
};

export const useTree = <T extends {}>(
    initialItems?: ITreeProps<T>["items"]
) => {
    const [items, setItems] = React.useState<ITreeProps<T>["items"]>(
        initialItems ?? {}
    );

    const Component = React.useCallback(
        (props: Omit<ITreeProps<T>, "items">) => (
            <Tree items={items} {...(props as ITreeProps<T>)} />
        ),
        [items]
    );

    const removeItem = React.useCallback(
        (id: string) =>
            setItems((state) => {
                const newState = { ...state };
                delete newState[id];
                return newState;
            }),
        []
    );

    const addItem = React.useCallback(
        (item: ITreeProps<T>["items"][0]) => {
            setItems((state) => ({
                ...state,
                [item.id]: item,
            }));
            return () => removeItem(item.id);
        },
        [removeItem]
    );

    return { Component, addItem, removeItem };
};
