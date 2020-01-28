import i18n, { Module } from "i18next";
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
import { toast, Bounce } from "react-toastify";
import { createBrowserHistory } from "history";
import en from "../i18n/en/en.json";
import fr from "../i18n/fr/fr.json";
import { SESSION_KEYS } from "../config";
import { makeThemeReducer, defaultThemes, ITheme } from "../modules/themes";

interface IRouteBase {
    key: string;
    path: string;
    component: React.ComponentType<any>;
    exact?: boolean;
}
interface IHiddenRoute extends IRouteBase {
    hidden: true;
    name?: never;
    Icon?: never;
}
interface IVisibleRoute extends IRouteBase {
    hidden?: false;
    name: string;
    Icon: () => JSX.Element;
}
type IRoute = IVisibleRoute | IHiddenRoute;

interface ISocial {
    url: string;
    Icon: () => JSX.Element;
    name: string;
}

interface IAppInitOptions {
    version?: string;
    historyOptions?: Parameters<typeof createBrowserHistory>[0];
    enforceHttps?: string[];
    locales?: { [lang: string]: { [key: string]: string } };
    reducers?: Parameters<typeof combineReducers>[0];
    defaultState?: Parameters<typeof createStore>[1];
    themes?: { [theme: string]: ITheme };
    routes?: IRoute[];
    socials?: ISocial[];
}

toast.configure({
    toastClassName: "toast",
    bodyClassName: "toast__content",
    progressClassName: "toast__progress",
    position: "bottom-right",
    transition: Bounce,
});

class App {
    private static _instance = new App();
    private static _hasInit = false;
    private static _httpsEnforced: IAppInitOptions["enforceHttps"];
    private static _version?: IAppInitOptions["version"];
    private static _history: ReturnType<typeof createBrowserHistory>;
    private static _routes: NonNullable<IAppInitOptions["routes"]>;
    private static _socials: NonNullable<IAppInitOptions["socials"]>;
    private static _store: Store<IStoreState>;
    private static _themes: NonNullable<IAppInitOptions["themes"]>;

    public static get instance() {
        return this._instance;
    }

    public get hasInit() {
        return App._hasInit;
    }

    public get httpsEnforced() {
        return App._httpsEnforced;
    }

    public get version() {
        return App._version;
    }

    public get history() {
        return App._history;
    }

    public get routes() {
        return App._routes;
    }

    public get socials() {
        return App._socials;
    }

    public get store() {
        return App._store;
    }

    public get state() {
        return App._store.getState();
    }

    public get dispatch() {
        return App._store.dispatch;
    }

    public get themes() {
        return App._themes;
    }

    public init({
        version,
        historyOptions,
        enforceHttps,
        locales,
        reducers,
        defaultState,
        themes,
        routes,
        socials,
    }: IAppInitOptions) {
        // Ensure there is only 1 app
        if (App._hasInit) {
            throw new Error("App has already been initialized");
        }
        App._hasInit = true;

        // Enforce SSL
        App._httpsEnforced = enforceHttps;
        if (App._httpsEnforced) this.enforceHttps();

        // App version
        App._version = version;

        // App history
        App._history = createBrowserHistory(historyOptions);

        // Routes
        App._routes = routes ?? [];

        // Socials
        App._socials = socials ?? [];

        // Themes
        App._themes = {
            ...themes,
            light: {
                name: defaultThemes.light.name,
                colors: {
                    ...defaultThemes.light.colors,
                    ...themes?.light?.colors,
                },
            },
            dark: {
                name: defaultThemes.dark.name,
                colors: {
                    ...defaultThemes.dark.colors,
                    ...themes?.dark?.colors,
                },
            },
        };
        const night = {
            start: 19,
            end: 5,
        };
        const now = Number(moment().format("H"));
        const sessionTheme = window.sessionStorage.getItem(SESSION_KEYS.theme);
        const themeReducer = (() => {
            const isValidTheme = _.includes(_.keys(App._themes), sessionTheme);

            if (isValidTheme && sessionTheme) {
                return makeThemeReducer(App._themes[sessionTheme]);
            }

            return makeThemeReducer(
                now > night.start || now < night.end
                    ? App._themes.dark
                    : App._themes.light
            );
        })();

        // Store
        const composeEnhancers =
            process.env.NODE_ENV === "production" &&
            typeof window === "object" &&
            (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
                ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
                : compose;
        App._store = createStore(
            combineReducers<any>({
                theme: themeReducer,
                ...reducers,
            }),
            defaultState,
            composeEnhancers(applyMiddleware(thunk))
        );

        // i18n
        const resources = (() => {
            const enTranslations = {
                ...en,
                ...locales?.en,
            };
            const frTranslations = {
                ...fr,
                ...locales?.fr,
            };

            const others = _.reduce(
                locales,
                (acc, translation, lang) => {
                    if (_.includes(["en", "fr"], lang)) return acc;
                    acc[lang] = { translation };
                    return acc;
                },
                {} as {
                    [lang: string]: { translation: { [key: string]: string } };
                }
            );

            return {
                en: { translation: enTranslations },
                fr: { translation: frTranslations },
                ...others,
            };
        })();
        const DEFAULT_LNG = "en";
        i18n.use(markdownJsx as Module)
            .use(initReactI18next)
            .init({
                load: "languageOnly",
                resources,
                lng: (() => {
                    const savedLng = window.sessionStorage.getItem(
                        SESSION_KEYS.i18n
                    );
                    if (savedLng && _.includes(i18n.languages, savedLng)) {
                        return savedLng;
                    }
                    return (
                        _.find(i18n.languages, (lng) =>
                            _.includes(navigator.language, lng)
                        ) || DEFAULT_LNG
                    );
                })(),
                fallbackLng: _.keys(resources),
            });

        App._instance = this;
        (window as any).app = this;
        (window as any).i18n = i18n;
    }

    public t(
        key: Parameters<typeof i18n.t>[0],
        options?: Parameters<typeof i18n.t>[1]
    ) {
        return i18n.t(key, options);
    }

    public notify(
        content: Parameters<typeof toast>[0],
        options?: Parameters<typeof toast>[1]
    ) {
        return toast(content, options);
    }

    public async setLanguage(lang: string) {
        try {
            if (!_.includes(i18n.languages, lang)) {
                throw new Error(
                    `${lang} is not a valid language. Languages available are: ${_.join(
                        i18n.languages,
                        ", "
                    )}`
                );
            }
            await i18n.changeLanguage(lang);
            window.sessionStorage.setItem(SESSION_KEYS.i18n, lang);
            this.notify(`${this.t("notification.langChange")}: ${lang}`);
        } catch (e) {
            console.error(e);
        }
    }

    private enforceHttps() {
        if (window.location.protocol === "https:") return;

        const { hostname, pathname } = window.location;
        _.forEach(App._httpsEnforced, (h) => {
            if (_.includes(hostname, h)) {
                window.location.href = `https://${hostname}${pathname}`;
            }
        });
    }
}

declare module "styled-components" {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface DefaultTheme {
        name: ReturnType<typeof App["_store"]["getState"]>["theme"]["name"];
        colors: ReturnType<typeof App["_store"]["getState"]>["theme"]["colors"];
    }
}

export default App.instance;
