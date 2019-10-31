import React from "react";
import { Prism as SyntaxHighlight } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Hooks } from "../../modules";
import { THEME_TRANSITION_TIME } from "../../config";

const { useConnect } = Hooks;

export default ({ children }: { children: React.ReactElement }) => {
    const theme = useConnect(({ theme }) => theme);
    return (
        <SyntaxHighlight
            language="tsx"
            style={theme.name == "dark" ? tomorrow : undefined}
            customStyle={{
                transition: `all ${THEME_TRANSITION_TIME}s`,
                borderRadius: "5px",
                maxWidth: "100%",
                overflow: "scroll",
            }}
        >
            {children}
        </SyntaxHighlight>
    );
};
