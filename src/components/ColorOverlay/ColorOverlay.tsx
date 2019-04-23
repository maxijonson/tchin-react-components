import React from "react";
import { Hooks } from "src/modules";
import { ITheme } from "src/modules/CSS";
import styled from "styled-components";

const { useConnect } = Hooks;

interface IColorOverlayProps {
    color: string;
    opacity?: number;
    kClassName?: string;
}

const ColorOverlay = styled.div<{ theme: ITheme } & IColorOverlayProps>`
    width: 100%;
    height: 100%;
    opacity: ${({ opacity }) => opacity || 0.5};
    position: absolute;
    background: ${({ color }) => color};
    top: 0;
    left: 0;
    z-index: 0;
`;

export default ({ color, opacity, kClassName = "" }: IColorOverlayProps) => {
    const { theme } = useConnect(({ theme }) => ({ theme }));

    return (
        <ColorOverlay
            className={`color-overlay ${kClassName}`}
            theme={theme}
            color={color}
            opacity={opacity}
        />
    );
};
