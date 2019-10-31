import styled from "styled-components";
import tinycolor from "tinycolor2";
import { THEME_TRANSITION_TIME } from "../../config";

interface IButtonProps {
    state?: IContextState;
    variant?: "outlined" | "text";
}

const disabledAlpha = 0.5;

export default styled.button<IButtonProps>`
    border: none;
    outline: none;
    border-radius: 5px;
    padding: 0.5em 0.75em;
    margin: 0.3em 0.5em;
    transition: all ${THEME_TRANSITION_TIME}s;
    cursor: ${({ disabled }) => (!disabled ? "pointer" : "not-allowed")};
    color: #${({ theme, variant, state, disabled }) => {
            let color;
            switch (variant) {
                case "outlined":
                case "text":
                    color = tinycolor(theme.colors[state || "defaultText"]);
                    return disabled
                        ? color.setAlpha(disabledAlpha).toHex8()
                        : color.toHex();
                default:
                    color = tinycolor(theme.colors.buttonText);
                    return disabled
                        ? color.setAlpha(disabledAlpha).toHex8()
                        : color.toHex();
            }
        }};
    background: ${({ theme, state, variant, disabled }) => {
        let color;
        switch (variant) {
            case "text":
            case "outlined":
                return "none";
            default:
                color = tinycolor(theme.colors[state || "buttonBg"]);
                return `#${
                    disabled
                        ? color.setAlpha(disabledAlpha).toHex8()
                        : color.toHex()
                }`;
        }
    }};
    border: ${({ theme, state, variant, disabled }) => {
        let color;
        switch (variant) {
            case "text":
                return "2px solid transparent";
            default:
                color = tinycolor(theme.colors[state || "buttonBg"]);
                return `2px solid #${
                    disabled
                        ? color.setAlpha(disabledAlpha - 0.4).toHex8()
                        : color.toHex()
                }`;
        }
    }};

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
