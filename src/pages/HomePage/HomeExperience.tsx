import { faLightbulb } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from "lodash";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { THEME_TRANSITION_TIME } from "src/config";
import { Hooks } from "src/modules";
import styled, { ThemeProvider } from "styled-components";
import tinycolor from "tinycolor2";
import { categories, ICategory, ILevel, levels, subjects } from "./subjects";

const { useConnect } = Hooks;

const HomeExperience = styled.div``;

const Intro = styled.p`
    text-align: justify;
`;

const Grid = styled.div`
    transition: all ${THEME_TRANSITION_TIME}s;
    display: grid;
    background: ${({ theme }) =>
        tinycolor(theme.colors.sectionBackground)
            .darken(3)
            .toRgbString()};
    padding: 1.5%;
    border-radius: 1rem;
    grid-template: auto ${_.times(levels.length, () => "1fr").join(
        " ",
    )} / 1fr ${_.times(categories.length, () => "1fr").join(" ")};
    grid-template-areas:
    "level ${_.join(categories, " ")}"
    ${_.reduce(
        levels,
        (gta, level) => {
            gta += `"${level} ${_(categories)
                .map((c) => `${level}-${c}`)
                .join(" ")}"
        `;
            return gta;
        },
        "",
    )};
`;

const Subject = styled.div`
    text-align: center;
`;

const Subjects = styled.div<{ level: ILevel; category: ICategory }>`
    grid-area: ${({ category, level }) => `${level}-${category}`};
    border: 0.15rem solid
        ${({ theme }) =>
            tinycolor(theme.colors.defaultText)
                .setAlpha(0.05)
                .toRgbString()};
    border-right: none;
    border-top: none;
    display: grid;
    place-content: center;
    padding: 2%;
    &.first-cat {
        border-left: none;
    }
    &.last-lvl {
        border-bottom: none;
    }
`;

const Level = styled.div<{ level: ILevel | "level" }>`
    grid-area: ${({ level }) => level};
    border: 0.2rem solid
        ${({ theme }) =>
            tinycolor(theme.colors.defaultText)
                .setAlpha(0.1)
                .toRgbString()};
    border-left: none;
    border-top: none;
    display: flex;
    justify-content: center;
    font-weight: bold;
    align-items: center;
    &.last {
        border-bottom: none;
    }
`;

const Category = styled.div<{ category: ICategory }>`
    grid-area: ${({ category }) => category};
    border: 0.2rem solid
        ${({ theme }) =>
            tinycolor(theme.colors.defaultText)
                .setAlpha(0.1)
                .toRgbString()};
    border-top: none;
    border-right: none;
    text-align: center;
    font-weight: bold;
    padding: 2%;
    &.first {
        border-left: none;
    }
`;

export default () => {
    const { t } = useTranslation();
    const { theme } = useConnect(({ theme }) => ({ theme }));

    return (
        <ThemeProvider theme={{ ...theme }}>
            <HomeExperience className="home-experience">
                <Intro className="home-experience__intro">
                    {t("long.home.sections.experience.intro", {
                        postProcess: "markdown-jsx",
                    })}
                </Intro>
                <FontAwesomeIcon
                    icon={faLightbulb}
                    color={theme.colors.defaultText}
                    className="home-experience__legend-icon"
                />
                : {t("home.sections.experience.legend")}
                <Grid className="home-experience__grid">
                    <Level
                        level="level"
                        className="home-experience__grid__level first"
                    />
                    {_.map(levels, (level, i) => (
                        <Level
                            key={level}
                            level={level}
                            className={`home-experience__grid__level
                            ${(i == levels.length - 1 && "last") || ""}`}
                            children={t(
                                `home.sections.experience.levels.${level}`,
                            )}
                        />
                    ))}
                    {_.map(categories, (category, i) => (
                        <Category
                            className={`home-experience__grid__category
                                ${(i == categories.length - 1 && "last") || ""}
                                ${(i == 0 && "first") || ""}`}
                            key={category}
                            category={category}
                            children={t(
                                `home.sections.experience.categories.${category}`,
                            )}
                        />
                    ))}
                    {_.map(levels, (level, lvl) =>
                        _.map(categories, (category, cat) => (
                            <Subjects
                                className={`home-experience__grid__subjects
                                    ${(lvl == 0 && "first-lvl") || ""}
                                    ${(cat == 0 && "first-cat") || ""}
                                    ${(lvl == levels.length - 1 &&
                                        "last-lvl") ||
                                        ""}
                                    ${(cat == categories.length - 1 &&
                                        "last-cat") ||
                                        ""}`}
                                key={category}
                                level={level}
                                category={category}
                            >
                                {_(subjects)
                                    .filter(
                                        (s) =>
                                            s.category == category &&
                                            s.level == level,
                                    )
                                    .map(({ name, selfTaught }) => (
                                        <Subject
                                            key={name}
                                            className="home-experience__grid__subject"
                                        >
                                            {name}
                                            {selfTaught && (
                                                <FontAwesomeIcon
                                                    className="home-experience__grid__subject__icon"
                                                    icon={faLightbulb}
                                                    color={
                                                        theme.colors.defaultText
                                                    }
                                                    style={{
                                                        marginLeft: "1rem",
                                                    }}
                                                />
                                            )}
                                        </Subject>
                                    ))
                                    .value()}
                            </Subjects>
                        )),
                    )}
                </Grid>
            </HomeExperience>
        </ThemeProvider>
    );
};
