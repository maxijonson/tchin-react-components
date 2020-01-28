import { version } from "../../package.json";

export const THEME_TRANSITION_TIME = 0.25 as const;

export const BREAKPOINTS = {
    xs: 0,
    sm: 600,
    md: 768,
    lg: 992,
    xl: 1200,
} as const;

export const ZINDEX = {
    tooltip: 10,
    scrollbar: 50,
    menu: 100,
    persistentDrawer: 150,
    temporaryDrawer: 155,
    modal: 200,
    toast: 250,
} as const;

export const APP_ROOT = "app" as const;

export const SESSION_KEYS = {
    theme: "THEME",
    i18n: "I18N",
} as const;

export const TRC_VERSION = version;

declare global {
    type IContextState =
        | "warn"
        | "danger"
        | "success"
        | "primary"
        | "secondary"
        | "success"
        | "info";

    type ComponentProps<
        T extends React.ElementType
    > = React.ComponentPropsWithRef<T>;

    type ComponentPropsWithoutRef<
        T extends React.ElementType
    > = React.ComponentPropsWithoutRef<T>;
}
