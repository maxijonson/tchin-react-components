import React from "react";
import styled from "styled-components";
import tinycolor from "tinycolor2";
import { motion } from "framer-motion";
import { THEME_TRANSITION_TIME } from "../../config";

interface IButtonProps {
    state?: IContextState;
    variant?: "outlined" | "text";
}

type IMotionProps = React.ComponentProps<typeof motion.button>;

const defaultMotionProps: IMotionProps = {
    transition: { type: "spring", mass: 0.5, stiffness: 200, damping: 9 },
};

const Button = ({
    state,
    variant,
    ...motionProps
}: IMotionProps & IButtonProps) => {
    const { disabled } = motionProps;
    const whileHover = React.useMemo<IMotionProps["whileHover"]>(
        () =>
            !disabled
                ? {
                      scale: 1.035,
                  }
                : undefined,
        [disabled]
    );
    const whileTap = React.useMemo<IMotionProps["whileTap"]>(
        () =>
            !disabled
                ? {
                      scale: 0.97,
                  }
                : undefined,
        [disabled]
    );

    return (
        <motion.button
            {...defaultMotionProps}
            whileHover={whileHover}
            whileTap={whileTap}
            transformTemplate={({ scale }) => `scale(${scale})`} // Prevents translateZ(0px) from being added. This disables GPU acceleration == CPU rendered. https://github.com/framer/motion/issues/355
            {...motionProps}
        />
    );
};

export default styled(Button)`
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 0.5em 0.75em;
    margin: 0.3em 0.5em;
    transition: color ${THEME_TRANSITION_TIME}s,
        background ${THEME_TRANSITION_TIME}s,
        border-color ${THEME_TRANSITION_TIME}s;
    cursor: ${({ disabled }) => (!disabled ? "pointer" : "not-allowed")};
    color: ${({ theme, variant, state }) => {
        switch (variant) {
            case "outlined":
            case "text":
                return theme.colors[state || "defaultText"];
            default:
                return theme.colors.buttonText;
        }
    }};
    background: ${({ theme, state, variant }) => {
        switch (variant) {
            case "text":
            case "outlined":
                return "none";
            default:
                return theme.colors[state || "buttonBg"];
        }
    }};
    border: ${({ theme, state, variant }) => {
        switch (variant) {
            case "text":
                return "2px solid transparent";
            default:
                return `2px solid ${theme.colors[state || "buttonBg"]}`;
        }
    }};

    opacity: ${({ disabled }) => (disabled ? 0.35 : 1)};

    &:hover {
        background: ${({ theme, state, variant, disabled }) => {
            if (disabled) return undefined;
            const color =
                theme.name == "light"
                    ? tinycolor(theme.colors[state || "buttonBg"]).lighten()
                    : tinycolor(theme.colors[state || "buttonBg"]).darken();
            switch (variant) {
                case "outlined":
                case "text":
                    return `#${color.setAlpha(0.1).toHex8()}`;
                default:
                    return `#${color.toHex()}`;
            }
        }};
        border-color: #${({ theme, state, variant, disabled }) => {
                if (disabled) return undefined;
                switch (variant) {
                    case "text":
                        return "transparent";
                    default:
                        return (theme.name == "light"
                            ? tinycolor(
                                  theme.colors[state || "buttonBg"]
                              ).lighten()
                            : tinycolor(
                                  theme.colors[state || "buttonBg"]
                              ).darken()
                        ).toHex();
                }
            }};
    }

    &:active {
        background: #${({ theme, state }) => (theme.name == "light" ? tinycolor(theme.colors[state || "buttonBg"]).lighten(20) : tinycolor(theme.colors[state || "buttonBg"]).darken(20)).toHex()};
        border-color: #${({ theme, state, variant }) => {
                switch (variant) {
                    case "text":
                        return "transparent";
                    default:
                        return (theme.name == "light"
                            ? tinycolor(
                                  theme.colors[state || "buttonBg"]
                              ).lighten(20)
                            : tinycolor(
                                  theme.colors[state || "buttonBg"]
                              ).darken(20)
                        ).toHex();
                }
            }};
    }
`;
