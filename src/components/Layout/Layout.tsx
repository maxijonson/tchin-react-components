import styled from "styled-components";

type ICommonCSS = "inherit" | "initial" | "unset";

const BaseLayout = styled.div<{ noHeight?: boolean }>``;

export const Viewport = styled.div<{ width?: number; height?: number }>`
    width: ${({ width }) => (width == undefined ? 100 : width)}%;
    height: ${({ height }) => (height == undefined ? 100 : height)}vh;
`;

export const MarginH = styled(BaseLayout)<{ amount?: number }>`
    margin-right: ${({ amount }) => (amount == undefined ? 7 : amount)}%;
    margin-left: ${({ amount }) => (amount == undefined ? 7 : amount)}%;
    max-height: 100%;
    overflow-y: scroll;
`;

export const MarginV = styled(BaseLayout)<{ amount?: number }>`
    margin-top: ${({ amount }) => (amount == undefined ? 2.5 : amount)}%;
    margin-bottom: ${({ amount }) => (amount == undefined ? 2.5 : amount)}%;
    max-height: 90%;
    overflow-y: scroll;
`;

export const Margin = styled(BaseLayout)<{
    amountH?: number;
    amountV?: number;
}>`
    margin-top: ${({ amountV }) => (amountV == undefined ? 2.5 : amountV)}%;
    margin-bottom: ${({ amountV }) => (amountV == undefined ? 2.5 : amountV)}%;
    margin-left: ${({ amountH }) => (amountH == undefined ? 5 : amountH)}%;
    margin-right: ${({ amountH }) => (amountH == undefined ? 5 : amountH)}%;
    max-height: 90%;
    overflow-y: scroll;
`;

export const PaddingH = styled(BaseLayout)<{ amount?: number }>`
    padding-right: ${({ amount }) => (amount == undefined ? 7 : amount)}%;
    padding-left: ${({ amount }) => (amount == undefined ? 7 : amount)}%;
    max-height: 100%;
    overflow-y: scroll;
`;

export const PaddingV = styled(BaseLayout)<{ amount?: number }>`
    padding-top: ${({ amount }) => (amount == undefined ? 2.5 : amount)}%;
    padding-bottom: ${({ amount }) => (amount == undefined ? 2.5 : amount)}%;
    overflow-y: scroll;
`;

export const Padding = styled(BaseLayout)<{
    amountH?: number;
    amountV?: number;
}>`
    padding-top: ${({ amountV }) => (amountV == undefined ? 2.5 : amountV)}%;
    padding-bottom: ${({ amountV }) => (amountV == undefined ? 2.5 : amountV)}%;
    padding-left: ${({ amountH }) => (amountH == undefined ? 5 : amountH)}%;
    padding-right: ${({ amountH }) => (amountH == undefined ? 5 : amountH)}%;
    max-height: 95%;
    overflow-y: scroll;
`;

type IFlexDirection =
    | ICommonCSS
    | "colum"
    | "column-revers"
    | "row"
    | "row-reverse";
type IFlexWrap = "nowrap" | "unset" | "wrap" | "wrap-reverse";
type IFlexAlignItems =
    | ICommonCSS
    | "center"
    | "flex-end"
    | "flex-start"
    | "stretch";
type IFlexAlignContent = IFlexAlignItems | "space-around" | "space-between";
type IFlexJustifyContent =
    | IFlexAlignContent
    | "baseline"
    | "end"
    | "first baseline"
    | "last baseline"
    | "left"
    | "right"
    | "safe"
    | "space-evenly"
    | "start"
    | "unsafe";
export const Flex = styled.div<{
    itemMaxWidth?: string;
    direction?: IFlexDirection;
    wrap?: IFlexWrap;
    alignItems?: IFlexAlignItems;
    alignContent?: IFlexAlignContent;
    justifyContent?: IFlexJustifyContent;
}>`
    display: flex;
    flex-direction: ${({ direction }) => direction || "row"};
    flex-wrap: ${({ wrap }) => wrap || "wrap"};
    justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
    align-items: ${({ alignItems }) => alignItems || "stretch"};
    align-content: ${({ alignContent }) => alignContent || "flex-start"};

    & > * {
        max-width: ${({ itemMaxWidth }) => itemMaxWidth || "auto"};
    }
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
    transform: perspective(1px) translateY(-50%);
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

export const Page = styled.main`
    width: 100%;
    position: relative;
    order: 0;
    flex-grow: 1;
`;
