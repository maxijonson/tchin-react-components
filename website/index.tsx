// This file is the entry point to start the website. It should not be imported by any other projects. It is only there to test that the project compiles.
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
    faGithub,
    faTwitch,
    faTwitter,
    faLinkedin,
    faReact,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { app, APP_ROOT, TRCRouter, NotFoundPage } from "..";
import ComponentsPage from "./pages/ComponentsPage/ComponentsPage";

app.init({
    routes: [
        {
            key: "components",
            path: "/components",
            component: ComponentsPage,
            hidden: false,
            exact: true,
            Icon: () => <FontAwesomeIcon icon={faReact} />,
            name: "Components",
        },
        {
            key: "home",
            path: "/",
            component: ComponentsPage,
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

// TODO: Delete when docs on this is made.
// Only way to type custom themes
// declare global {
//     interface ICustomTheme {
//         colors: typeof themes.light.colors;
//     }
// }

ReactDOM.render(
    <Provider store={app.store}>
        <TRCRouter />
    </Provider>,
    document.getElementById(APP_ROOT)
);
