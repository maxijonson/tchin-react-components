import * as React from "react";
import { useTranslation } from "react-i18next";
import { THEME_TRANSITION_TIME } from "src/config";
import { Hooks } from "src/modules";
import { fonts, ITheme } from "src/modules/CSS";
import styled from "styled-components";

const { useConnect } = Hooks;

const PortfolioLanding = styled.div<{ theme: ITheme }>`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: table;
    width: 100%;
    text-shadow: ${({ theme }) => `0 0 .75em ${theme.colors.altDefaultShadow}`};
`;

export default () => {
    const { theme } = useConnect(({ theme }) => ({ theme }));
    const { t } = useTranslation();

    return (
        <PortfolioLanding theme={theme}>
            <div
                style={{
                    textAlign: "center",
                    display: "table-cell",
                    verticalAlign: "middle",
                    transition: `all ${THEME_TRANSITION_TIME}s`,
                    color: theme.colors.intro,
                }}
            >
                <div
                    style={{
                        fontSize: "6rem",
                        fontFamily: fonts.roboto.family,
                        textTransform: "uppercase",
                    }}
                >
                    {t("header.portfolio")}
                </div>
            </div>
        </PortfolioLanding>
    );
};
