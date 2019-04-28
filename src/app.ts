import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import markdownJsx from "i18next-markdown-jsx-plugin";
import * as _ from "lodash";
import moment from "moment";
import { toast, ToastContent, ToastOptions, Bounce } from "react-toastify";
import { createBrowserHistory, BrowserHistoryBuildOptions } from "history";
import { store } from "./store/config";
import enLong from "./i18n/en/en-long.json";
import en from "./i18n/en/en.json";
import frLong from "./i18n/fr/fr-long.json";
import fr from "./i18n/fr/fr.json";
import { SESSION_KEYS } from "./config";
import { IFonts, defaultFonts, IFont } from "./modules/CSS/fonts";

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
    translations?: { en: object; fr: object };
    fonts?: IFonts;
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

const FALLBACK_FONT: IFont = {
    family: "Arial",
    subsets: "latin",
    variants: "400",
};

class App {
    private static _instance = new App({});
    private static _hasInit = false;

    private static _creation = moment().format("h:mm:ss a");
    private static _routes: IRoute[] = [];
    private static _socials: ISocial[] = [];
    private static _history: ReturnType<
        typeof createBrowserHistory
    > = createBrowserHistory();
    private static _fonts: IFonts;

    private constructor(options: IAppInitOptions) {
        const {
            routes,
            socials,
            historyOptions,
            enforceSSL,
            translations,
            fonts,
        } = options;

        if (enforceSSL) this.enforceSSL();

        App._routes = routes || [];
        App._socials = socials || [];
        App._history = createBrowserHistory(historyOptions);
        App._fonts = new Proxy(
            {
                ...defaultFonts,
                ...(fonts || {}),
            },
            {
                get(allFonts, font: string) {
                    if (!allFonts[font]) {
                        console.error(`Font ${font} is not an existing font.`);
                        return FALLBACK_FONT;
                    }
                    return allFonts[font];
                },
            }
        );

        // INIT I18N
        i18n.init({
            load: "languageOnly",
            resources: {
                en: {
                    translation: {
                        ...{ long: enLong },
                        ...en,
                        ...(translations ? translations.en : {}),
                    },
                },
                fr: {
                    translation: {
                        ...en,
                        ...{ long: enLong },
                        ...(translations ? translations.en : {}),
                        ...{ long: frLong },
                        ...fr,
                        ...(translations ? translations.fr : {}),
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
        App._instance = this;
        (window as any).app = this;
    }

    public static get instance() {
        return this._instance;
    }

    public get fonts() {
        return App._fonts;
    }

    public get routes() {
        return App._routes;
    }

    public get socials() {
        return App._socials;
    }

    public get creation() {
        return App._creation;
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
        return App._history;
    }

    public t(
        key: string | string[],
        options?: string | i18n.TOptions<i18n.StringMap> | undefined
    ) {
        return i18n.t(key, options);
    }

    // public setTheme(theme: "light" | "dark") {
    //     switch (theme) {
    //         case "light":
    //             this.dispatch(actions.setTheme(this._themes.light));
    //             break;
    //         case "dark":
    //             this.dispatch(actions.setTheme(this._themes.dark));
    //             break;
    //         default:
    //             return console.warn(`${theme} is not a valid theme`);
    //     }
    //     this.notify(
    //         `${this.t("notification.themeChange")}: ${i18n.t(
    //             `header.theme.${this.state.theme.name}`
    //         )}`
    //     );
    // }

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
        if (App._hasInit) throw new Error("Can't have more than 1 App");
        App._hasInit = true;
        new App(options);
    }
}

export default App.instance;
