import React from "react";
import _ from "lodash";
import { BREAKPOINTS } from "../../config";
import { Hooks } from "../../modules";

const { useCurrentBreakpoint } = Hooks;

interface IBreakpointBaseProps {
    children: React.ReactNode;
}

interface IMultipleBreakpoints extends IBreakpointBaseProps {
    breakpoints: (keyof typeof BREAKPOINTS)[];
    xs?: never;
    sm?: never;
    md?: never;
    lg?: never;
    xl?: never;
}
interface IXS extends IBreakpointBaseProps {
    breakpoints?: never;
    xs: true;
    sm?: never;
    md?: never;
    lg?: never;
    xl?: never;
}
interface ISM extends IBreakpointBaseProps {
    breakpoints?: never;
    xs?: never;
    sm: true;
    md?: never;
    lg?: never;
    xl?: never;
}
interface IMD extends IBreakpointBaseProps {
    breakpoints?: never;
    xs?: never;
    sm?: never;
    md: true;
    lg?: never;
    xl?: never;
}
interface ILG extends IBreakpointBaseProps {
    breakpoints?: never;
    xs?: never;
    sm?: never;
    md?: never;
    lg: true;
    xl?: never;
}
interface IXL extends IBreakpointBaseProps {
    breakpoints?: never;
    xs?: never;
    sm?: never;
    md?: never;
    lg?: never;
    xl: true;
}
type IBreakpointProps = IXS | ISM | IMD | ILG | IXL | IMultipleBreakpoints;

export default ({
    children,
    breakpoints,
    xs,
    sm,
    md,
    lg,
    xl,
}: IBreakpointProps) => {
    const breakpoint = useCurrentBreakpoint();
    const inBreakpoint = React.useMemo(() => {
        if (breakpoints) {
            return _.some(breakpoints, (b) => breakpoint == BREAKPOINTS[b]);
        }

        if (xl) return breakpoint >= BREAKPOINTS.xl;
        if (lg) return breakpoint >= BREAKPOINTS.lg;
        if (md) return breakpoint >= BREAKPOINTS.md;
        if (sm) return breakpoint >= BREAKPOINTS.sm;
        if (xs) return breakpoint >= BREAKPOINTS.xs;
        return true;
    }, [breakpoint, breakpoints, xl, lg, md, sm, xs]);

    return <>{inBreakpoint && children}</>;
};
