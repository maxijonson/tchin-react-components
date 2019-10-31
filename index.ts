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
import * as CardsAnimated from "./src/components/AdvancedCard/CardAnimated";
import AdvancedCard, * as AdvancedCardBase from "./src/components/AdvancedCard/AdvancedCard";
export { default as Background } from "./src/components/Background/Background";
export { default as Button } from "./src/components/Buttons/Buttons";
const Cards = {
    ...CardsAnimated,
    Alt: AdvancedCardBase.Alt,
    Base: AdvancedCardBase.default,
};
export { Cards, AdvancedCard };
export { default as Catcher } from "./src/components/Catcher/Catcher";
export {
    default as ColorOverlay,
} from "./src/components/ColorOverlay/ColorOverlay";
export { default as Footer } from "./src/components/Footer/Footer";
export { default as Menu } from "./src/components/Menu/Menu";
export { default as LangSwitch } from "./src/components/Menu/LangSwitch";
export { default as ThemeSwitch } from "./src/components/Menu/ThemeSwitch";
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
export { NotFoundPage, KitPage } from "./src/pages";

///----- APP
export { default as app } from "./src/app";

///----- TRC ROUTER
export { default as TRCRouter } from "./src/routers/AppRouter";
