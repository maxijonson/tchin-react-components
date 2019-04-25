import {
    faGithub,
    faTwitch,
    faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import { ConnectedComponentClass } from "react-redux";
import { app } from "src/app";
import { HomePage, NotFoundPage, PortfolioPage } from "../pages";

export interface IRoute {
    name: string;
    key: string;
    component: ConnectedComponentClass<any, any> | (() => JSX.Element | null);
    hidden?: boolean;
    path: string;
    exact?: boolean;
    Icon: () => JSX.Element;
}

interface ISocial {
    url: string;
    Icon: () => JSX.Element;
    name: string;
}

export const routes: IRoute[] = [
    {
        name: "header.home",
        key: "home",
        path: "/",
        exact: true,
        component: HomePage,
        Icon: () => (
            <FontAwesomeIcon
                icon="home"
                color={app.state.theme.colors.defaultText}
            />
        ),
    },
    {
        name: "header.portfolio",
        path: "/portfolio",
        key: "portfolio",
        exact: true,
        component: PortfolioPage,
        Icon: () => (
            <FontAwesomeIcon
                icon="book-open"
                color={app.state.theme.colors.defaultText}
            />
        ),
    },
    {
        name: "Not Found",
        key: "notFound",
        path: "",
        component: NotFoundPage,
        hidden: true,
        Icon: () => <span>NF</span>, // Should not be rendered anyways...
    },
];

export const socials: ISocial[] = [
    {
        name: "Twitter",
        url: "https://twitter.com/MaxiJonson",
        Icon: () => (
            <FontAwesomeIcon
                icon={faTwitter}
                color={app.state.theme.colors.defaultText}
            />
        ),
    },
    {
        name: "Twitch",
        url: "https://www.twitch.tv/maxijonson",
        Icon: () => (
            <FontAwesomeIcon
                icon={faTwitch}
                color={app.state.theme.colors.defaultText}
            />
        ),
    },
    {
        name: "Github",
        url: "https://github.com/maxijonson",
        Icon: () => (
            <FontAwesomeIcon
                icon={faGithub}
                color={app.state.theme.colors.defaultText}
            />
        ),
    },
];
