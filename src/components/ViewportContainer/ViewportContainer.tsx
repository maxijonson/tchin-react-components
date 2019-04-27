import React from "react";
import styled from "styled-components";
import Background from "../Background/Background";
import { THEME_TRANSITION_TIME } from "../../../src/config";
import { Hooks } from "../../../src/modules";
import ColorOverlay from "../ColorOverlay/ColorOverlay";

const { useConnect } = Hooks;

interface IViewportContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    background?: string;
    contentStyle?: React.CSSProperties;
    backgroundOverlay?: boolean;
    kClassName?: string;
}

const ViewportContainer = styled.div`
    position: relative;
    width: 100vw;
    min-height: 100vh;
    overflow: hidden;
    transition: all ${THEME_TRANSITION_TIME}s;
`;

export default ({
    children,
    background,
    backgroundOverlay,
    kClassName = "",
}: IViewportContainerProps) => {
    const { theme } = useConnect(({ theme }) => ({ theme }));

    return (
        <ViewportContainer className={`viewport-container ${kClassName}`}>
            {background && <Background background={background} />}
            {backgroundOverlay && (
                <ColorOverlay color={theme.colors.defaultColorOverlay} />
            )}
            {children}
        </ViewportContainer>
    );
};
