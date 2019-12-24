import { version } from "../../package.json";

export const THEME_TRANSITION_TIME = 0.25;

export const BREAKPOINTS = {
    xs: 0,
    xspx: "0px",
    sm: 600,
    smpx: "600px",
    md: 768,
    mdpx: "768px",
    lg: 992,
    lgpx: "992px",
    xl: 1200,
    xlpx: "1200px",
};

export const ZINDEX = {
    tooltip: 10,
    scrollbar: 50,
    menu: 100,
    persistentDrawer: 150,
    temporaryDrawer: 155,
    modal: 200,
};

export const APP_ROOT = "app";

export const SESSION_KEYS = {
    theme: "THEME",
    i18n: "I18N",
};

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
