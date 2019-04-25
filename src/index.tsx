import { library } from "@fortawesome/fontawesome-svg-core";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import {
    faBars,
    faBookOpen,
    faHome,
    faMoon,
    faSun,
} from "@fortawesome/free-solid-svg-icons";
import "normalize.css/normalize.css"; // Reset stylesheet for cross-browser compatibility
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "src/modules/i18n/i18n";
import "./styles/styles.scss";

import { app } from "src/app";
import { APP_ROOT } from "./config";
import AppRouter from "./routers/AppRouter";

app.enforceSSL();

library.add(faMoon, faSun, faCopyright, faBars, faHome, faBookOpen);

ReactDOM.render(
    <Provider store={app.store}>
        <AppRouter />
    </Provider>,
    document.getElementById(APP_ROOT),
);
