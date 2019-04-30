/* eslint-disable import/first, import/newline-after-import */
///---- STYLES
import "normalize.css/normalize.css"; // Reset stylesheet for cross-browser compatibility
import "react-toastify/dist/ReactToastify.css";
import "./src/styles/styles.scss";

///----- MODULES
export { IColor, IColors, IPalette } from "./src/modules/CSS/colors";
export { IShade } from "./src/modules/CSS/shades";
export { ITheme, IThemes } from "./src/modules/themes";
export {
    IFontSubsets,
    IFontVariants,
    IFonts,
    IFont,
} from "./src/modules/CSS/fonts";
import * as Hooks from "./src/modules/hooks/hooks";
export { Hooks };
import * as Utils from "./src/modules/Utils/utils";
export { Utils };

///----- COMPONENTS
import * as CardsAnimated from "./src/components/Card/CardAnimated";
import Card, * as CardsBase from "./src/components/Card/Card";
export { default as Background } from "./src/components/Background/Background";
export { default as Button } from "./src/components/Button/Button";
const Cards = { ...CardsAnimated, Alt: CardsBase.Alt, Base: CardsBase.default };
export { Cards, Card };
export { default as Catcher } from "./src/components/Catcher/Catcher";
export {
    default as ColorOverlay,
} from "./src/components/ColorOverlay/ColorOverlay";
export { default as Footer } from "./src/components/Footer/Footer";
export { default as Header } from "./src/components/Header/Header";
export { default as LangSwitch } from "./src/components/Header/LangSwitch";
export { default as ThemeSwitch } from "./src/components/Header/ThemeSwitch";
export { default as Modal } from "./src/components/Modal/Modal";
export { default as Scrollbar } from "./src/components/Scrollbar/Scrollbar";
export { default as Section } from "./src/components/Section/Section";
export { default as ToastStyle } from "./src/components/ToastStyle/ToastStyle";
export { default as Tooltip } from "./src/components/Tooltip/Tooltip";
export {
    default as ViewportContainer,
} from "./src/components/ViewportContainer/ViewportContainer";

///----- CONFIG
export * from "./src/config/constants";

///----- PAGES
export { NotFoundPage } from "./src/pages";

///----- APP
export { default as app } from "./src/app";

///----- TRC ROUTER
export { default as TRCRouter } from "./src/routers/AppRouter";
