import * as React from "react";
import { THEME_TRANSITION_TIME } from "src/config";
import { Hooks } from "src/modules";
import { fonts, ITheme } from "src/modules/CSS";
import styled, { ThemeProvider } from "styled-components";
import tinycolor from "tinycolor2";

const { useConnect } = Hooks;

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

interface IThemeProvider {
    theme: IButtonOwnProps & {
        theme: ITheme;
    };
}

const DButton = styled.button`
    background: ${({ theme: { background, theme } }: IThemeProvider) =>
        background || theme.colors.buttonBg};
    color: ${({ theme: { textColor, theme } }: IThemeProvider) =>
        textColor || theme.colors.buttonText};
    border: none;
    border-radius: 0.5rem;
    padding: 0.75rem;
    transition: all ${THEME_TRANSITION_TIME}s;

    &:hover {
        background: ${({ theme: { background, theme } }: IThemeProvider) =>
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
    font-family: ${fonts.roboto.family};
`;

const Subtitle = styled.div`
    font-size: 1rem;
    font-family: ${fonts.openSans.family};
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
    } = props;

    const { theme } = useConnect(({ theme }) => ({ theme }));

    const Button = ButtonRenderer || DButton;

    return (
        (!children && !title && !subtitle && null) || (
            <ThemeProvider theme={{ theme, ...props }}>
                <Button onClick={onClick} className={`button ${kClassName}`}>
                    {children || (
                        <>
                            {title && <Title children={title} />}
                            {subtitle && <Subtitle children={subtitle} />}
                        </>
                    )}
                </Button>
            </ThemeProvider>
        )
    );
};
