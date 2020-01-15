import styled from "styled-components";

export interface IColorOverlayProps {
    overlayOpacity?: number;
    overlayColor?: string;
}

export default styled.div<IColorOverlayProps>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: ${({ overlayColor, theme }) =>
        overlayColor || theme.colors.pageBackground};
    opacity: ${({ overlayOpacity }) => overlayOpacity ?? 0.3};
`;
