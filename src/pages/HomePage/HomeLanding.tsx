import * as _ from "lodash";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { THEME_TRANSITION_TIME } from "src/config";
import { Hooks } from "src/modules";
import { fonts, ITheme } from "src/modules/CSS";
import styled from "styled-components";

const { useConnect } = Hooks;

const HomeLanding = styled.div<{ theme: ITheme }>`
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
    const { t } = useTranslation();
    const { theme } = useConnect(({ theme }) => ({ theme }));
    return (
        <HomeLanding theme={theme}>
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
                        fontSize: "4rem",
                        fontFamily: fonts.Kaushan.family,
                    }}
                >
                    {t("home.intro.welcome")}
                </div>
                <div
                    style={{
                        fontSize: "6rem",
                        fontFamily: fonts.exo.family,
                    }}
                >
                    {t(
                        `home.intro.${
                            _.includes(window.location.hostname, "maxijonson")
                                ? "maxijonson"
                                : "tristan"
                        }`,
                    )}
                </div>
                <hr
                    style={{
                        margin: "1% 35%",
                        transition: `all ${THEME_TRANSITION_TIME}s`,
                        borderColor: theme.colors.defaultText,
                    }}
                />
                <div
                    style={{
                        fontSize: "2rem",
                        fontFamily: fonts.openSans.family,
                    }}
                >
                    {_.includes(window.location.hostname, "maxijonson")
                        ? "Tristan Chin"
                        : "MaxiJonson"}
                    {t("home.intro.tagline")}
                </div>
            </div>
        </HomeLanding>
    );
};
