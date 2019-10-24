import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import tinycolor from "tinycolor2";
import { THEME_TRANSITION_TIME, BREAKPOINTS } from "../../../src/config";
import { Hooks } from "../../../src/modules";
import { IVisibleRoute } from "../../app";

const { useConnect } = Hooks;

interface INavProps extends IVisibleRoute {
    onPathChange?: (e: React.MouseEvent, path: string) => void;
}

const Nav = styled(NavLink)`
    transition: all ${THEME_TRANSITION_TIME}s;
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 4fr;
    font-weight: 100;
    color: ${({ theme }) => theme.colors.defaultText};
    font-size: 1.6em;
    padding: 3% 0 3% 2%;
    border-radius: none;
    text-align: left;
    &:hover:not(.nav--active) {
        padding-left: 5%;
        border-radius: 0 3rem 3rem 0;
        background-color: ${({ theme }) => {
            const color = tinycolor(theme.colors.card).setAlpha(0.4);
            theme.name == "light" ? color.darken(15) : color.lighten();
            return color.toRgbString();
        }};
    }
    &.nav--active {
        transition: background-color 1s, color ${THEME_TRANSITION_TIME}s;
        border-radius: 0 3rem 3rem 0;
        background-color: ${({ theme }) => {
            const color = tinycolor(theme.colors.card).setAlpha(0.25);
            theme.name == "light" ? color.darken(50) : color.lighten(50);
            return color.toRgbString();
        }};
    }
    @media (max-width: ${BREAKPOINTS.smpx}) {
        font-size: 0.7em;
    }
`;

export default ({ path, exact, name, Icon, onPathChange }: INavProps) => {
    const { theme } = useConnect(({ theme }) => ({ theme }));
    const { t } = useTranslation();
    const handleClick = (e: React.MouseEvent) => {
        if (onPathChange) {
            onPathChange(e, path);
        }
    };

    return (
        <Nav
            theme={theme}
            to={path}
            exact={exact}
            onClick={handleClick}
            activeClassName="nav--active"
        >
            <div style={{ textAlign: "center", margin: "auto 0" }}>
                <Icon />
            </div>
            <div style={{ paddingLeft: "5%" }}>{t(name).toUpperCase()}</div>
        </Nav>
    );
};
