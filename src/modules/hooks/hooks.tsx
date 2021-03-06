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

export const useSetInterval = (
    cb: () => void,
    time: number,
    deps?: Parameters<typeof React.useEffect>[1],
    toggle = false
) => {
    const interval = React.useRef(0);
    const cancelled = React.useRef(false);
    const warningIssued = React.useRef(false);

    React.useEffect(() => {
        if (cancelled.current) return () => null;

        interval.current = window.setInterval(cb, time);
        return () => {
            if (interval.current) {
                window.clearInterval(interval.current);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cb, time, ...(deps ?? [])]);

    // Returns a function to toggle the interval
    return () => {
        if (cancelled.current) {
            if (!toggle && !warningIssued.current) {
                console.warn(
                    "You tried to cancel the interval when it is already cancelled. If you meant to toggle the interval, specify true to useSetInterval's toggle parameter."
                );
                warningIssued.current = true;
                return;
            }
            cancelled.current = false;
        }
        if (interval.current) {
            window.clearInterval(interval.current);
            cancelled.current = true;
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
            options?.throttle ?? 500
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

/**
 * Runs effect only on updates (i.e not the first render)
 * https://kentcdodds.com/blog/compound-components-with-react-hooks
 */
export const useUpdateEffect = (
    cb: React.EffectCallback,
    deps?: React.DependencyList
) => {
    const justMounted = React.useRef(true);
    // eslint-disable-next-line consistent-return
    React.useEffect(() => {
        if (!justMounted.current) return cb();
        justMounted.current = false;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);
};

/**
 * Shows changed props. Can be used to find out why a component updates.
 * https://stackoverflow.com/questions/41004631/trace-why-a-react-component-is-re-rendering
 */
export const useTraceUpdate = <T extends { [name: string]: any }>(
    props: T,
    name?: string
) => {
    const prev = React.useRef(props);
    React.useEffect(() => {
        const changedProps = Object.entries(props).reduce((ps: any, [k, v]) => {
            if (prev.current[k] !== v) {
                ps[k] = [prev.current[k], v];
            }
            return ps;
        }, {});
        if (Object.keys(changedProps).length > 0) {
            console.info(
                `${name ? `(${name}) ` : ""}Changed props:`,
                changedProps
            );
        }
        prev.current = props;
    });
};
