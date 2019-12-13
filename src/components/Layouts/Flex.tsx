import styled from "styled-components";

type ICommonCSS = "inherit" | "initial" | "unset";

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

interface IFlexProps {
    itemMaxWidth?: string;
    itemMinWidth?: string;
    direction?: IFlexDirection;
    wrap?: IFlexWrap;
    alignItems?: IFlexAlignItems;
    alignContent?: IFlexAlignContent;
    justifyContent?: IFlexJustifyContent;
}

export default styled.div<IFlexProps>`
    display: flex;
    flex-direction: ${({ direction }) => direction || "row"};
    flex-wrap: ${({ wrap }) => wrap || "wrap"};
    justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
    align-items: ${({ alignItems }) => alignItems || "stretch"};
    align-content: ${({ alignContent }) => alignContent || "flex-start"};

    & > * {
        min-width: ${({ itemMinWidth }) => itemMinWidth || "auto"};
        max-width: ${({ itemMaxWidth }) => itemMaxWidth || "auto"};
    }
`;
