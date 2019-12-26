import React from "react";
import styled from "styled-components";
import { Link as BaseLink } from "../TextStyles";

interface IScrollToProps {
    to: React.RefObject<HTMLElement> | string | number;
    children: React.ReactNode;
}

const Link = styled(BaseLink)`
    color: inherit;
`;

export default ({ to, children }: IScrollToProps) => {
    const onClick = React.useCallback(() => {
        let top;

        switch (typeof to) {
            case "object":
                top = to.current?.offsetTop;
                break;
            case "string":
                top = document.querySelector(to)?.scrollTop;
                break;
            case "number":
                top = to;
                break;
            default:
                top = 0;
        }

        window.scrollTo({ top: top ?? 0, behavior: "smooth" });
    }, [to]);

    return <Link onClick={onClick}>{children}</Link>;
};
