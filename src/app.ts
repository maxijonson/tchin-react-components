import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import markdownJsx from "i18next-markdown-jsx-plugin";
import * as _ from "lodash";
import moment from "moment";
import { toast, ToastContent, ToastOptions, Bounce } from "react-toastify";
import { createBrowserHistory, BrowserHistoryBuildOptions } from "history";
import * as actions from "./actions";
import { store } from "./store/config";
import enLong from "./i18n/en/en-long.json";
import en from "./i18n/en/en.json";
import frLong from "./i18n/fr/fr-long.json";
import fr from "./i18n/fr/fr.json";
import { SESSION_KEYS } from "./config";
import {
    ISection,
    IThemeName,
    IThemes,
    defaultThemes,
} from "./modules/CSS/themes";

export interface IRoute {
    name: string;
    key: string;
    component: () => JSX.Element;
    hidden?: boolean;
    path: string;
    exact?: boolean;
    Icon: () => JSX.Element;
}

export interface ISocial {
    url: string;
    Icon: () => JSX.Element;
    name: string;
}

interface IAppInitOptions {
    routes?: IRoute[];
    socials?: ISocial[];
    historyOptions?: BrowserHistoryBuildOptions;
    enforceSSL?: boolean;
    themes?: { [name in IThemeName]: ISection };
}

const DEFAULT_LNG = "en";

i18n.languages = [DEFAULT_LNG, "fr"];
i18n.use(markdownJsx).use(initReactI18next);

toast.configure({
    toastClassName: "toast",
    bodyClassName: "toast__content",
    progressClassName: "toast__progress",
    position: "bottom-right",
    transition: Bounce,
});

class App {
    private static _instance = new App();

    private _hasInit = false;
    private _creation = moment().format("h:mm:ss a");
    private _routes: IRoute[] = [];
    private _socials: ISocial[] = [];
    private _history: ReturnType<
        typeof createBrowserHistory
    > = createBrowserHistory();
    private _themes: IThemes = {
        light: {
            name: defaultThemes.light.name,
            colors: defaultThemes.light.colors,
        },
        dark: {
            name: defaultThemes.dark.name,
            colors: defaultThemes.dark.colors,
        },
    };

    public constructor() {
        if (App._instance) throw new Error("Can't have more than 1 App");
        App._instance = this;
        (window as any).app = this;
    }

    public static get instance() {
        return this._instance;
    }

    public get themes() {
        return this._themes;
    }

    public get routes() {
        return this._routes;
    }

    public get socials() {
        return this._socials;
    }

    public get hasInit() {
        return this._hasInit;
    }

    public get creation() {
        return this._creation;
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
        return this._history;
    }

    public t(
        key: string | string[],
        options?: string | i18n.TOptions<i18n.StringMap> | undefined
    ) {
        return i18n.t(key, options);
    }

    public setTheme(theme: "light" | "dark") {
        switch (theme) {
            case "light":
                this.dispatch(actions.setTheme(this._themes.light));
                break;
            case "dark":
                this.dispatch(actions.setTheme(this._themes.dark));
                break;
            default:
                return console.warn(`${theme} is not a valid theme`);
        }
        this.notify(
            `${this.t("notification.themeChange")}: ${i18n.t(
                `header.theme.${this.state.theme.name}`
            )}`
        );
    }

    public setLanguage(lang: "en" | "fr") {
        if (lang !== "en" && lang !== "fr") {
            return console.warn(`${lang} is not a valid language`);
        }
        i18n.changeLanguage(lang);
        window.sessionStorage.setItem(SESSION_KEYS.i18n, lang);
        this.notify(`${this.t("notification.langChange")}: ${lang}`);
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

    public init(options: IAppInitOptions) {
        const {
            routes,
            socials,
            historyOptions,
            enforceSSL,
            themes = { light: {}, dark: {} },
        } = options;

        this._hasInit = true;
        if (enforceSSL) this.enforceSSL();

        this._routes = routes || [];
        this._socials = socials || [];
        this._history = createBrowserHistory(historyOptions);
        this._themes = {
            light: {
                name: this._themes.light.name,
                colors: {
                    ...this._themes.light.colors,
                    ...themes.light,
                },
            },
            dark: {
                name: this._themes.dark.name,
                colors: {
                    ...this._themes.dark.colors,
                    ...themes.dark,
                },
            },
        };

        // INIT I18N
        i18n.init({
            load: "languageOnly",
            resources: {
                en: {
                    translation: {
                        ...{ long: enLong },
                        ...en,
                    },
                },
                fr: {
                    translation: {
                        ...en,
                        ...{ long: enLong },
                        ...{ long: frLong },
                        ...fr,
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
}

export default App.instance;
