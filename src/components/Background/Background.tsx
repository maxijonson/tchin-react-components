import React from "react";
import styled from "styled-components";
import { BREAKPOINTS, THEME_TRANSITION_TIME } from "../../../src/config";
import { Hooks } from "../../../src/modules";

const { useConnect } = Hooks;

interface IViewportContainerProps {
    background: string;
    kClassName?: string;
}

const Background = styled.div<{ background: string } & ISCThemeProp>`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-size: cover;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${({ background }) => `url(${background})`};
    transform: scale(1.2);
    transition: all ${THEME_TRANSITION_TIME}s;
    filter: ${({ theme }) =>
        theme.name == "light"
            ? "blur(5px) brightness(90%)"
            : "blur(5px) brightness(30%)"};

    @media (max-width: ${BREAKPOINTS.lgpx}) {
        background-attachment: scroll !important;
        background-size: cover !important;
    }
`;

export default ({ background, kClassName = "" }: IViewportContainerProps) => {
    const { theme } = useConnect(({ theme }) => ({ theme }));

    return (
        <Background
            background={background}
            theme={theme}
            className={`background ${kClassName}`}
        />
    );
};
