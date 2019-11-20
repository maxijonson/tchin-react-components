// This file is the entry point to start the website. It should not be imported by any other projects. It is only there to test that the project compiles.
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
    faGithub,
    faTwitch,
    faTwitter,
    faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faToolbox } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { app, APP_ROOT, NotFoundPage, TRCRouter, KitPage } from "..";

app.init({
    routes: [
        {
            key: "kit",
            path: "/kit",
            component: KitPage,
            hidden: false,
            exact: true,
            Icon: () => <FontAwesomeIcon icon={faToolbox} />,
            name: "Kit",
        },
        {
            key: "kit2",
            path: "/d",
            component: KitPage,
            hidden: false,
            exact: true,
            Icon: () => <FontAwesomeIcon icon={faToolbox} />,
            name: "KIT",
        },
        {
            key: "pf",
            path: "/kit",
            component: KitPage,
            hidden: false,
            exact: true,
            Icon: () => <FontAwesomeIcon icon={faToolbox} />,
            name: "Portfolio",
        },
        {
            key: "pf2",
            path: "/kit",
            component: KitPage,
            hidden: false,
            exact: true,
            Icon: () => <FontAwesomeIcon icon={faToolbox} />,
            name:
                "PORTFOLIO asdlkfjasldfjalksdjf lkasdjflasjdf lkasdjf laskjdf ",
        },
        {
            key: "pf3",
            path: "/kit",
            component: KitPage,
            hidden: false,
            exact: true,
            Icon: () => <FontAwesomeIcon icon={faToolbox} />,
            name:
                "PORTFOLIO asdlkfjasldfjalksdjf lkasdjflasjdf lkasdjf laskjdf ",
        },
        // {
        //     key: "asdf",
        //     path: "/not-found",
        //     component: KitPage,
        //     hidden: false,
        //     exact: true,
        //     Icon: () => <FontAwesomeIcon icon={faToolbox} />,
        //     name: "SOME LONG TITLE SHOULD BE ON ONE LINE",
        // },
        {
            key: "home",
            path: "/",
            component: KitPage,
            hidden: true,
            exact: true,
        },
        {
            key: "notFound",
            path: "",
            component: NotFoundPage,
            hidden: true,
        },
    ],
    socials: [
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
        {
            name: "LinkedIn",
            url: "https://www.linkedin.com/in/tristan-chin",
            Icon: () => (
                <FontAwesomeIcon
                    icon={faLinkedin}
                    color={app.state.theme.colors.defaultText}
                />
            ),
        },
    ],
});

ReactDOM.render(
    <Provider store={app.store}>
        <TRCRouter />
    </Provider>,
    document.getElementById(APP_ROOT)
);
