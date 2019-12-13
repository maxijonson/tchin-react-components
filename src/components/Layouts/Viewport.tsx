import styled from "styled-components";

interface IViewportProps {
    width?: number;
    height?: number;
}

export default styled.div<IViewportProps>`
    width: ${({ width }) => (width == undefined ? 100 : width)}%;
    height: ${({ height }) => (height == undefined ? 100 : height)}vh;
`;
