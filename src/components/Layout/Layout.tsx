import styled from "styled-components";

const BaseLayout = styled.div<{ noHeight?: boolean }>`
    height: ${({ noHeight }) => !noHeight && "100%"};
`;

export const Viewport = styled.div<{ width?: number; height?: number }>`
    width: ${({ width }) => width || 100}vw;
    height: ${({ height }) => height || 100}vh;
`;

export const MarginH = styled(BaseLayout)`
    margin-right: 5%;
    margin-left: 5%;
    max-height: 100%;
    overflow-y: scroll;
`;

export const MarginV = styled(BaseLayout)`
    margin-top: 2.5%;
    margin-bottom: 2.5%;
    max-height: 90%;
    overflow-y: scroll;
`;

export const Margin = styled(BaseLayout)`
    margin: 2.5% 5%;
    max-height: 90%;
    overflow-y: scroll;
`;

export const PaddingH = styled(BaseLayout)`
    padding-right: 5%;
    padding-left: 5%;
    max-height: 100%;
    overflow-y: scroll;
`;

export const PaddingV = styled(BaseLayout)`
    padding-top: 2.5%;
    padding-bottom: 2.5%;
    overflow-y: scroll;
`;

export const Padding = styled(BaseLayout)`
    padding: 2.5% 5%;
    max-height: 95%;
    overflow-y: scroll;
`;

export const TextCenter = styled.div`
    text-align: center;
`;

export const TextJustify = styled.div`
    text-align: justify;
`;

export const TextLeft = styled.div`
    text-align: left;
`;

export const TextRight = styled.div`
    text-align: right;
`;

export const Flex = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: stretch;
    align-content: flex-start;
`;

export const CenterV = styled.div`
    position: relative;
    top: 50%;
    transform: perspective(1px) translateY(-50%);
`;

export const CenterH = styled.div`
    text-align: center;
    & > * {
        display: inline-block;
        text-align: initial;
    }
`;

export const Center = styled.div`
    position: relative;
    top: 50%;
    text-align: center;
    & > * {
        display: inline-block;
        text-align: initial;
    }
`;

export const Right = styled.div`
    text-align: right;
    & > * {
        display: inline-block;
        text-align: initial;
    }
`;
