import React from "react";
import styled from "styled-components";
import { Link as BaseLink } from "../TextStyles";

interface IScrollToProps {
    to: React.RefObject<HTMLElement>;
    children: React.ReactNode;
}

const Link = styled(BaseLink)`
    color: inherit;
`;

export default ({ to, children }: IScrollToProps) => {
    const onClick = React.useCallback(() => {
        if (to.current) {
            window.scrollTo({ top: to.current.offsetTop, behavior: "smooth" });
        }
    }, [to]);

    return <Link onClick={onClick}>{children}</Link>;
};
