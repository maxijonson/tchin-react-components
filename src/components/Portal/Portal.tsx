import React from "react";
import ReactDOM from "react-dom";

interface IPortalProps {
    query?: string;
}

export default ({
    children,
    query,
}: { children: React.ReactNode } & IPortalProps) => {
    return ReactDOM.createPortal(
        children,
        document.querySelector(query || "#app") || document.body
    );
};
