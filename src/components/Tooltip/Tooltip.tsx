import * as React from "react";
import posed from "react-pose";
import { BREAKPOINTS, THEME_TRANSITION_TIME, ZINDEX } from "src/config";
import { Hooks } from "src/modules";
import styled from "styled-components";

const { useConnect, useCurrentBreakpoint } = Hooks;

type IPosition = "top" | "left" | "bottom" | "right";
type IVisibility = "visible" | "hidden";

interface ITooltipProps {
    children: React.ReactNode;
    tip?: React.ReactNode;
    position?: IPosition;
    minWidth?: string;
    maxWidth?: string;
    activeOnMobile?: boolean;
    mobileTimeout?: number;
    kClassName?: string;
}

const Tooltip = styled.span`
    position: relative;
    transition: all ${THEME_TRANSITION_TIME}s;
`;

const Tip = styled(
    posed.div({
        visible: {
            opacity: 1,
            zIndex: ZINDEX.modal,
            y: ({ position }: { position: IPosition }) => {
                switch (position) {
                    case "top":
                    case "bottom":
                        return "0%";
                    case "left":
                    case "right":
                        return "-50%";
                }
            },
            x: ({ position }: { position: IPosition }) => {
                switch (position) {
                    case "top":
                    case "bottom":
                        return "-50%";
                    case "left":
                    case "right":
                        return "0%";
                }
            },
            transition: {
                zIndex: { duration: 0 },
                default: { duration: 250 },
            },
        },
        hidden: {
            opacity: 0,
            zIndex: -1,
            y: ({ position }: { position: IPosition }) => {
                switch (position) {
                    case "top":
                        return "-25%";
                    case "bottom":
                        return "25%";
                    case "left":
                    case "right":
                        return "-50%";
                }
            },
            x: ({ position }: { position: IPosition }) => {
                switch (position) {
                    case "top":
                    case "bottom":
                        return "-50%";
                    case "left":
                        return "-25%";
                    case "right":
                        return "25%";
                }
            },
            transition: {
                default: { duration: 125 },
            },
        },
    }),
)<{
    minWidth?: string;
    maxWidth?: string;
}>`
    min-width: ${({ minWidth }) => minWidth || "20rem"};
    max-width: ${({ maxWidth }) => maxWidth || "30rem"};
    position: absolute;
    z-index: ${ZINDEX.tooltip};

    @media (min-width: ${BREAKPOINTS.mdpx}) {
        min-width: ${({ minWidth }) => minWidth || "10rem"};
        max-width: ${({ maxWidth }) => maxWidth || "15rem"};
    }

    &::after {
        content: "";
        position: absolute;
    }

    &.top {
        bottom: 100%;
        left: 50%;
        padding-bottom: 1rem;
        transform: translateX(-50%);

        &::after {
            border-left: 1rem solid transparent;
            border-right: 1rem solid transparent;
            border-top: 1rem solid ${({ theme }) => theme.colors.tooltip};
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    &.bottom {
        top: 100%;
        left: 50%;
        padding-top: 1rem;
        transform: translateX(-50%);

        &::after {
            border-left: 1rem solid transparent;
            border-right: 1rem solid transparent;
            border-bottom: 1rem solid ${({ theme }) => theme.colors.tooltip};
            top: 0;
            left: 50%;
            transform: translateX(-50%);
        }
    }
    &.left {
        top: 50%;
        right: 100%;
        padding-right: 1rem;
        transform: translateY(-50%);

        &::after {
            border-left: 1rem solid ${({ theme }) => theme.colors.tooltip};
            border-top: 1rem solid transparent;
            border-bottom: 1rem solid transparent;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
        }
    }
    &.right {
        top: 50%;
        left: 100%;
        padding-left: 1rem;
        transform: translateY(-50%);

        &::after {
            border-right: 1rem solid ${({ theme }) => theme.colors.tooltip};
            border-top: 1rem solid transparent;
            border-bottom: 1rem solid transparent;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
        }
    }
`;

const Trigger = styled.span`
    display: inline-block;
`;

const Message = styled.div`
    background: ${({ theme }) => theme.colors.tooltip};
    border-radius: 0.5rem;
    color: ${({ theme }) => theme.colors.tooltipText};
    font-size: 3rem;
    line-height: 1.4;
    padding: 0.75em;
    text-align: center;

    @media (min-width: ${BREAKPOINTS.mdpx}) {
        font-size: 1.5rem;
    }
`;
export default (props: ITooltipProps) => {
    const {
        children,
        tip,
        position = "top",
        minWidth,
        maxWidth,
        activeOnMobile = false,
        mobileTimeout = 1500,
        kClassName = "",
    } = props;
    const { theme } = useConnect(({ theme }) => ({ theme }));
    const [visibility, setVisibility] = React.useState<IVisibility>("hidden");
    const screen = useCurrentBreakpoint("screen");
    let timeout: number;
    React.useEffect(
        () => () => {
            if (timeout) {
                window.clearTimeout(timeout);
            }
        },
        [],
    );

    const show = () => {
        setVisibility("visible");
        if (screen < BREAKPOINTS.md && mobileTimeout != 0 && activeOnMobile) {
            timeout = window.setTimeout(() => {
                hide();
            }, mobileTimeout);
        }
    };

    const hide = () => {
        setVisibility("hidden");
    };

    return (
        <Tooltip
            className={`tooltip ${kClassName}`}
            onMouseLeave={
                (screen >= BREAKPOINTS.md && hide) ||
                (activeOnMobile && hide) ||
                undefined
            }
        >
            {tip && (
                <Tip
                    className={`tooltip__tip ${position}`}
                    minWidth={minWidth}
                    maxWidth={maxWidth}
                    theme={theme}
                    pose={visibility}
                    position={position}
                >
                    <Message children={tip} theme={theme} />
                </Tip>
            )}
            <Trigger
                className="tooltip__trigger"
                onMouseOver={
                    (screen >= BREAKPOINTS.md && show) ||
                    (activeOnMobile && show) ||
                    undefined
                }
            >
                {children}
            </Trigger>
        </Tooltip>
    );
};
