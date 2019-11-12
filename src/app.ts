import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import markdownJsx from "i18next-markdown-jsx-plugin";
import _ from "lodash";
import moment from "moment";
import {
    createStore,
    Store,
    combineReducers,
    compose,
    applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import { toast, ToastContent, ToastOptions, Bounce } from "react-toastify";
import { createBrowserHistory, BrowserHistoryBuildOptions } from "history";
import { RouteComponentProps } from "react-router-dom";
import enLong from "./i18n/en/en-long.json";
import en from "./i18n/en/en.json";
import frLong from "./i18n/fr/fr-long.json";
import fr from "./i18n/fr/fr.json";
import { SESSION_KEYS } from "./config";
import { IFonts, defaultFonts, IFont } from "./modules/CSS/fonts";
import {
    makeThemeReducer,
    defaultThemes,
    IThemes,
    IThemeName,
    ISection,
} from "./modules/themes";

interface IRouteBase {
    key: string;
    path: string;
    component:
        | React.ComponentType<RouteComponentProps<any>>
        | React.ComponentType<any>;
    hidden?: boolean;
    exact?: boolean;
}
export interface IHiddenRoute extends IRouteBase {
    hidden: true;
}
export interface IVisibleRoute extends IRouteBase {
    hidden: false | undefined;
    name: string;
    Icon: () => JSX.Element;
}
export type IRoute = IVisibleRoute | IHiddenRoute;

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
    themes?: { [name in IThemeName]: ISection };
    reducers?: {
        [name: string]: (state: any, action: any) => any;
    };
    defaultState?: IStoreState;
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
    private static _instance = new App({
        themes: {
            light: defaultThemes.light.colors,
            dark: defaultThemes.dark.colors,
        },
    });
    private static _hasInit = false;

    private static _creation = moment().format("h:mm:ss a");
    private static _routes: IRoute[] = [];
    private static _socials: ISocial[] = [];
    private static _history = createBrowserHistory();
    private static _fonts: IFonts;
    private static _store: Store<IStoreState>;
    private static _themes: IThemes;

    private constructor(options: IAppInitOptions) {
        const {
            routes,
            socials,
            historyOptions,
            enforceSSL,
            translations = { fr: {}, en: {} },
            fonts,
            themes = { light: {}, dark: {} },
            reducers = {},
            defaultState = {},
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

        // INIT THEMES
        App._themes = {
            light: {
                name: defaultThemes.light.name,
                colors: {
                    ...defaultThemes.light.colors,
                    ...themes.light,
                },
            },
            dark: {
                name: defaultThemes.dark.name,
                colors: {
                    ...defaultThemes.dark.colors,
                    ...themes.dark,
                },
            },
        };
        const format = "H";
        const night = {
            start: 19,
            end: 5,
        };
        const now = Number(moment().format(format));
        const isNight = now > night.start || now < night.end;
        const sessionTheme = window.sessionStorage.getItem(SESSION_KEYS.theme);
        const themeReducer = makeThemeReducer(
            sessionTheme &&
                _.includes(
                    [defaultThemes.dark.name, defaultThemes.light.name],
                    sessionTheme
                )
                ? sessionTheme == defaultThemes.light.name
                    ? App._themes.light
                    : App._themes.dark
                : isNight
                ? App._themes.dark
                : App._themes.light
        );

        // INIT STORE
        const composeEnhancers =
            process.env.NODE_ENV === "production" &&
            typeof window === "object" &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
                ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
                : compose;
        App._store = createStore(
            combineReducers({
                theme: themeReducer,
                ...reducers,
            }),
            defaultState,
            composeEnhancers(applyMiddleware(thunk))
        );

        // INIT I18N
        i18n.init({
            load: "languageOnly",
            resources: {
                en: {
                    translation: {
                        ...{ long: enLong },
                        ...en,
                        ...translations.en,
                    },
                },
                fr: {
                    translation: {
                        ...en,
                        ...{ long: enLong },
                        ...translations.en,
                        ...{ long: frLong },
                        ...fr,
                        ...translations.fr,
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

    public get themes() {
        return App._themes;
    }

    public get store() {
        return App._store;
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

    public setLanguage(lang: "en" | "fr") {
        if (lang !== "en" && lang !== "fr") {
            return console.warn(`${lang} is not a valid language`);
        }
        i18n.changeLanguage(lang);
        window.sessionStorage.setItem(SESSION_KEYS.i18n, lang);
        this.notify(`${this.t("notification.langChange")}: ${lang}`);
    }

    public enforceSSL() {
        // NOTE: Only works if domain is chintristan or maxijonson.
        // TODO: Make this work for any domain, except localhost
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
