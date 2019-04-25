import * as _ from "lodash";
import * as actions from "src/actions";
import { CSS, Hooks, i18n, t, Utils } from "src/modules/";
import { store } from "src/store/config";
import { history } from "./routers/AppRouter";

import { toast, ToastContent, ToastOptions } from "react-toastify";
import { Bounce } from "react-toastify";
import { SESSION_KEYS } from "./config";
import { themes } from "./modules/CSS";

class App {
    get store() {
        return store;
    }

    get state() {
        return this.store.getState();
    }

    get dispatch() {
        return this.store.dispatch;
    }

    get language() {
        return i18n.language;
    }

    get history() {
        return history;
    }

    get t() {
        return t;
    }

    public setTheme(theme: "light" | "dark") {
        switch (theme) {
            case "light":
                return this.dispatch(actions.setTheme(themes.light));
            case "dark":
                return this.dispatch(actions.setTheme(themes.dark));
            default:
                return console.warn(`${theme} is not a valid theme`);
        }
    }

    public setLanguage(lang: "en" | "fr") {
        if (lang !== "en" && lang !== "fr") {
            return console.warn(`${lang} is not a valid language`);
        }
        i18n.changeLanguage(lang);
        window.sessionStorage.setItem(SESSION_KEYS.i18n, lang);
        this.notify(`${app.t("notification.langChange")}: ${lang}`);
    }

    public enforceSSL() {
        if (
            !_.some(["tristan", "maxijonson"], (name) =>
                _.includes(window.location.hostname, name),
            )
        ) {
            return;
        }
        if (window.location.protocol !== "https:") {
            window.location.href =
                "https:" +
                window.location.href.substring(window.location.protocol.length);
        }
    }

    public notify(content: ToastContent, options?: ToastOptions | undefined) {
        return toast(content, options);
    }
}

const app = new App();

toast.configure({
    toastClassName: "toast",
    bodyClassName: "toast__content",
    progressClassName: "toast__progress",
    position: "bottom-right",
    transition: Bounce,
});

(window as any).app = app;

export { i18n, t, CSS, Hooks, Utils, app };
