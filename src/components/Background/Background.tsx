import React from "react";
import styled from "styled-components";
import ColorOverlay, { IColorOverlayProps } from "../ColorOverlay/ColorOverlay";
import { BREAKPOINTS, THEME_TRANSITION_TIME } from "../../../src/config";

export interface IBackgroundOptions {
    parallax?: boolean;
    blurAmount?: number;
}

interface IBackgroundProps extends IBackgroundOptions, IColorOverlayProps {
    background: string;
}

const Background = styled.div<IBackgroundProps>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-attachment: ${({ parallax }) => parallax && "fixed"};
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${({ background }) => `url(${background})`};
    transform: scale(1.1);
    transition: all ${THEME_TRANSITION_TIME}s;
    filter: ${({ theme, blurAmount }) =>
        theme.name == "light"
            ? `blur(${blurAmount ?? 3}px)`
            : `blur(${blurAmount ?? 3}px)`};
    @media (max-width: ${BREAKPOINTS.lg}px) {
        background-attachment: scroll !important;
        background-size: cover !important;
    }
`;

export default ({
    background,
    parallax,
    blurAmount,
    ...colorOverlayProps
}: IBackgroundProps) => (
    <>
        <Background
            background={background}
            parallax={parallax}
            blurAmount={blurAmount}
        />
        <ColorOverlay {...colorOverlayProps} />
    </>
);
