import * as _ from "lodash";
import * as actions from "./actions";
import { CSS, Hooks, i18n, t, Utils } from "./modules/";
import { store } from "./store/config";

import { toast, ToastContent, ToastOptions, Bounce } from "react-toastify";
import { history } from "./routers/AppRouter";
import { SESSION_KEYS } from "./config";
import { themes } from "./modules/CSS";

class App {
    public get store() {
        return store;
    }

    public get state() {
        return this.store.getState();
    }

    public get dispatch() {
        return this.store.dispatch;
    }

    public get language() {
        return i18n.language;
    }

    public get history() {
        return history;
    }

    public get t() {
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
        this.notify(`${t("notification.langChange")}: ${lang}`);
    }

    public enforceSSL() {
        if (
            !_.some(["tristan", "maxijonson"], (name) =>
                _.includes(window.location.hostname, name)
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
