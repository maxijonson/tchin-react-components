import React from "react";
import { Prism as SyntaxHighlight } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import tinycolor from "tinycolor2";
import { Hooks } from "../../modules";
import { THEME_TRANSITION_TIME } from "../../config";
import app from "../../app";

const { useConnect } = Hooks;

const CodeSnippet = styled.div`
    & > pre > code {
        font-family: ${app.fonts.firaCode.family} !important;
        font-size: 0.9em;
    }
    & > pre,
    & > pre > code span {
        background: ${({ theme }) => {
            return theme.name == "light"
                ? tinycolor(theme.colors.pageBackground)
                      .clone()
                      .lighten(5)
                      .toHexString()
                : tinycolor(theme.colors.pageBackground)
                      .clone()
                      .darken(2)
                      .toHexString();
        }} !important;
    }
`;

export default ({ children }: { children: React.ReactElement }) => {
    const theme = useConnect(({ theme }) => theme);
    return (
        <CodeSnippet>
            <SyntaxHighlight
                language="tsx"
                style={theme.name == "dark" ? tomorrow : undefined}
                customStyle={{
                    transition: `all ${THEME_TRANSITION_TIME}s`,
                    borderRadius: "5px",
                    maxWidth: "100%",
                    overflow: "scroll",
                    lineHeight: 1,
                }}
            >
                {children}
            </SyntaxHighlight>
        </CodeSnippet>
    );
};
