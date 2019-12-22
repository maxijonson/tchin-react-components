import React from "react";
import Button from "../Button/Button";

interface IScrollToProps {
    to: React.RefObject<HTMLElement>;
    children: React.ReactNode;
}

export default ({ to, children }: IScrollToProps) => {
    const onClick = React.useCallback(() => {
        if (to.current) {
            window.scrollTo({ top: to.current.offsetTop, behavior: "smooth" });
        }
    }, [to]);

    return (
        <Button
            variant="text"
            onClick={onClick}
            style={{ padding: "5px", margin: 0 }}
            noScale
        >
            {children}
        </Button>
    );
};
