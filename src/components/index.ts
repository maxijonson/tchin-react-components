import * as CardsBase from "./Card/AdvancedCard";
import * as CardsAnimated from "./Card/CardAnimated";

export { default as AdvancedCard } from "./Card/AdvancedCard";
export const AdvancedCards = { ...CardsBase, ...CardsAnimated };
export { default as Background } from "./Background/Background";
export { default as Button } from "./Button/Button";
export { default as Catcher } from "./Catcher/Catcher";
export { default as ColorOverlay } from "./ColorOverlay/ColorOverlay";
export { default as Footer } from "./Footer/Footer";
export { default as Menu } from "./Menu/Menu";
export { default as Modal } from "./Modal/Modal";
export { default as Scrollbar } from "./Scrollbar/Scrollbar";
export { default as Section } from "./Section/Section";
export { default as ToastStyle } from "./ToastStyle/ToastStyle";
export { default as Tooltip } from "./Tooltip/Tooltip";
export {
    default as ViewportContainer,
} from "./ViewportContainer/ViewportContainer";
export { default as Block } from "./Block/Block";
