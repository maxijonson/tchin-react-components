import _ from "lodash";
import React from "react";
import styled from "styled-components";
import tinycolor from "tinycolor2";
import { Tooltip, Layouts } from "../../components";
import { Hooks } from "../../modules";

const { useConnect, useBackground } = Hooks;
const { Viewport } = Layouts;

interface IKeywords {
    [keyword: string]: { color: string };
}
const keywords: IKeywords = {
    import: {
        color: "#F92660",
    },
    from: {
        color: "#F92660",
    },
    as: {
        color: "#F92660",
    },
    export: {
        color: "#F92660",
    },
    return: {
        color: "#F92660",
    },
    default: {
        color: "#F92660",
    },
    "=": {
        color: "#F92660",
    },
    "*": {
        color: "#272870",
    },
    "{": {
        color: "#CFCC03",
    },
    "}": {
        color: "#CFCC03",
    },
    const: {
        color: "#3FC0EF",
    },
    "=>": {
        color: "#3FC0EF",
    },
    IExistingLink: {
        color: "#98CC30",
    },
};

const special = `SPECIAL`;

const lines = [
    `import React from "react";`,
    `import { Page } from "src/components";`,
    `import app from "src/app";`,
    `import { IExistingLink } from "src/models"`,
    `\n`,
    `export default () => {`,
    special,
    `   return <Page link={link} />;`,
    `};`,
];

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: table;
    width: 100%;
`;

const Code = styled.pre<ISCThemeProp>`
    width: 75%;
    margin: 0 auto;
    box-shadow: 0 0 1rem ${({ theme }) => theme.colors.cardShadow};
    padding: 2.5%;
    font-size: 1.6rem;
    border-radius: 0.5rem;
    background: ${({ theme }) => theme.colors.card};
    color: ${({ theme }) => theme.colors.defaultText};
`;

const Line = styled.div`
    padding: 0.25% 2%;
    background: ${({ theme }) =>
        tinycolor(theme.colors.card)
            .darken(3)
            .toRgbString()};
`;

const Keyword = styled.span<{ color: string }>`
    color: ${({ color }) => color};
`;

const Special = styled.span`
    border-bottom: 0.25rem solid #ea4646;
    cursor: pointer;
`;

const redirect = (url: string) => (window.location.href = url);

const CodeLine = ({
    line,
    redirectUrl,
}: {
    line: string;
    redirectUrl?: string;
}) => {
    const { theme } = useConnect(({ theme }) => ({ theme }));
    const isImport = line.startsWith("import");
    const url = window.location.href.substring(
        window.location.protocol.length + 2
    );
    const onSpecialClick = React.useCallback(
        () => redirect(redirectUrl || "/"),
        [redirectUrl]
    );
    let inBrackets = false;
    if (line == special) {
        line = `   const link: IExistingLink = ${url} ;`;
    }

    return (
        <Line theme={theme}>
            {_.map(_.split(line, " "), (word, key) => {
                if (isImport && (word == "{" || word == "}")) {
                    inBrackets = true;
                }
                if (inBrackets && word == "IExistingLink") {
                    return `${word} `;
                }
                if (word == url) {
                    return (
                        <Tooltip
                            key={key}
                            maxWidth="auto"
                            activeOnMobile
                            tip={`'${word}' is not assignable to type 'IExistingLink'. ts(404)`}
                        >
                            <Special children={word} onClick={onSpecialClick} />
                        </Tooltip>
                    );
                }
                if (keywords[word]) {
                    return (
                        <Keyword
                            key={key}
                            color={keywords[word].color}
                            children={`${word} `}
                        />
                    );
                }
                return `${word} `;
            })}
        </Line>
    );
};

export default ({
    background,
    redirectUrl,
}: {
    background?: string;
    redirectUrl?: string;
}) => {
    const { theme } = useConnect(({ theme }) => ({ theme }));
    const BGViewport = useBackground(
        Viewport,
        background || "/assets/images/notFound-bg.jpg"
    );
    return (
        <BGViewport>
            <Container theme={theme}>
                <Code theme={theme}>
                    <h1 style={{ textAlign: "center" }}>404 - Not Found</h1>
                    {_.map(lines, (line, i) => (
                        <CodeLine
                            line={line}
                            key={i}
                            redirectUrl={redirectUrl}
                        />
                    ))}
                </Code>
            </Container>
        </BGViewport>
    );
};
