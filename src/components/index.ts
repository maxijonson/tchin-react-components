import * as CardsBase from "./Card/Card";
import * as CardsAnimated from "./Card/CardAnimated";

export { default as Card } from "./Card/Card";
export const Cards = { ...CardsBase, ...CardsAnimated };
export { default as Background } from "./Background/Background";
export { default as Button } from "./Button/Button";
export { default as Catcher } from "./Catcher/Catcher";
export { default as ColorOverlay } from "./ColorOverlay/ColorOverlay";
export { default as Footer } from "./Footer/Footer";
export { default as Header } from "./Header/Header";
export { default as Modal } from "./Modal/Modal";
export { default as Scrollbar } from "./Scrollbar/Scrollbar";
export { default as Section } from "./Section/Section";
export { default as ToastStyle } from "./ToastStyle/ToastStyle";
export { default as Tooltip } from "./Tooltip/Tooltip";
export {
    default as ViewportContainer,
} from "./ViewportContainer/ViewportContainer";
