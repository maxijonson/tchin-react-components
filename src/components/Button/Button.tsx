import React from "react";
import tinycolor from "tinycolor2";
import styled from "styled-components";
import { THEME_TRANSITION_TIME } from "../../../src/config";
import app from "../../app";

interface IButtonOwnProps {
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;

    /**
     * Overrides the Button container
     */
    ButtonRenderer?: (props: { children?: React.ReactNode }) => JSX.Element;

    /**
     * Children of the button
     * @Note Overrides title and subtitle
     */
    children?: React.ReactNode;

    /**
     * Background color
     */
    background?: string;

    /**
     * Text color
     */
    textColor?: string;

    title?: React.ReactNode;
    subtitle?: React.ReactNode;

    kClassName?: string;
}

const DButton = styled.button<IButtonOwnProps>`
    background: ${({ theme, background }) =>
        background || theme.colors.buttonBg};
    color: ${({ theme, textColor }) => textColor || theme.colors.buttonText};
    border: ${(props) => {
        console.warn("props", props);
        return "none";
    }};
    border-radius: 0.5rem;
    padding: 0.75rem;
    transition: all ${THEME_TRANSITION_TIME}s;

    &:hover {
        background: ${({ theme, background }) =>
            tinycolor(background || theme.colors.buttonBg)
                .darken()
                .toHexString()};
    }
    &:active {
        transform: scale(0.97);
    }
    &:active,
    &:focus {
        outline: 0;
    }
`;

const Title = styled.div`
    font-family: ${app.fonts.roboto.family};
`;

const Subtitle = styled.div`
    font-size: 1rem;
    font-family: ${app.fonts.openSans.family};
    margin: 0 1rem;
`;

export default (props: IButtonOwnProps) => {
    const {
        onClick,
        children,
        title,
        subtitle,
        ButtonRenderer,
        kClassName = "",
        background,
        textColor,
    } = props;

    const Button = ButtonRenderer || DButton;

    return (
        (!children && !title && !subtitle && null) || (
            <Button
                onClick={onClick}
                className={`button ${kClassName}`}
                background={background}
                textColor={textColor}
            >
                {children || (
                    <>
                        {title && <Title children={title} />}
                        {subtitle && <Subtitle children={subtitle} />}
                    </>
                )}
            </Button>
        )
    );
};
