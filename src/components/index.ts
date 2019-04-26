import Card, * as CardsBase from "./Card/Card";
import * as CardsAnimated from "./Card/CardAnimated";

export { default as Header } from "./Header/Header";

export { default as Footer } from "./Footer/Footer";

export {
    default as ViewportContainer,
} from "./ViewportContainer/ViewportContainer";

export { default as Background } from "./Background/Background";

export { default as ColorOverlay } from "./ColorOverlay/ColorOverlay";

const Cards = { ...CardsAnimated, Alt: CardsBase.Alt, Base: CardsBase.default };
export { Cards, Card };

export { default as Catcher } from "./Catcher/Catcher";

export { default as Button } from "./Button/Button";

export { default as Modal } from "./Modal/Modal";

export { default as ErrorModal } from "./Modal/ErrorModal";

export { default as Section } from "./Section/Section";

export { default as Tooltip } from "./Tooltip/Tooltip";

export { default as Scrollbar } from "./Scrollbar/Scrollbar";

export { default as ToastStyle } from "./ToastStyle/ToastStyle";
