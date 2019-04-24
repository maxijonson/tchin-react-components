import * as _ from "lodash";
import i18n from "i18next";
import markdownJsx from "i18next-markdown-jsx-plugin";
import { initReactI18next } from "react-i18next";
import enLong from "src/i18n/en/en-long.json";
import en from "src/i18n/en/en.json";
import frLong from "src/i18n/fr/fr-long.json";
import fr from "src/i18n/fr/fr.json";
import * as actions from "src/actions";
import store from "src/store/config";
import { toast, ToastContent, ToastOptions, Bounce } from "react-toastify";
import { history } from "./routers/AppRouter";
import { SESSION_KEYS } from "./config";
import { themes } from "./modules/CSS";
import { IRoute, ISocial } from "./routers/routes";

interface ILanguages {
    en: { [key: string]: object };
    fr: { [key: string]: object };
}

interface IAppInitOptions {
    routes?: IRoute[];
    socials?: ISocial[];
    translations?: ILanguages;
}

class App {
    public routes: IRoute[] = [];
    public socials: ISocial[] = [];
    public translations: ILanguages = { en: {}, fr: {} };

    private initI18n() {
        const DEFAULT_LNG = "en";

        i18n.languages = [DEFAULT_LNG, "fr"];
        i18n.use(markdownJsx)
            .use(initReactI18next)
            .init({
                load: "languageOnly",
                resources: {
                    en: {
                        translation: {
                            ...{ long: enLong },
                            ...en,
                            ...this.translations.en,
                        },
                    },
                    fr: {
                        translation: {
                            ...en,
                            ...{ long: enLong },
                            ...this.translations.en,
                            ...{ long: frLong },
                            ...fr,
                            ...this.translations.fr,
                        },
                    },
                },
                lng: (() => {
                    const savedLng = window.sessionStorage.getItem(
                        SESSION_KEYS.i18n
                    );
                    if (
                        savedLng &&
                        _.includes(
                            i18n.languages,
                            window.sessionStorage.getItem(SESSION_KEYS.i18n)
                        )
                    ) {
                        return savedLng;
                    }
                    for (const lng of i18n.languages) {
                        if (_.includes(navigator.language, lng)) {
                            return lng;
                        }
                    }
                    return DEFAULT_LNG;
                })(),
                fallbackLng: DEFAULT_LNG,
            });
    }

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
        return i18n.t;
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
        this.notify(`${i18n.t("notification.langChange")}: ${lang}`);
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

    public init({ routes, socials, translations }: IAppInitOptions) {
        this.routes = routes || [];
        this.socials = socials || [];
        this.translations = translations || { en: {}, fr: {} };

        this.initI18n();
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

export { app };
