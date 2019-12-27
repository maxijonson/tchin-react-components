import React from "react";
import { Prism as SyntaxHighlight } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import styled from "styled-components";
import { Hooks, CSS } from "../../modules";
import { THEME_TRANSITION_TIME } from "../../config";

const { useConnect } = Hooks;
const { fonts } = CSS;

const CodeSnippet = styled.div`
    & > pre > code {
        font-family: ${fonts.firaCode.family} !important;
        font-size: 0.9em;
    }
    & > pre,
    & > pre > code span {
        background: ${({ theme }) =>
            theme.colors.codeSnippetBackground} !important;
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
                    padding: "10px 0 10px 5px",
                }}
            >
                {children}
            </SyntaxHighlight>
        </CodeSnippet>
    );
};
