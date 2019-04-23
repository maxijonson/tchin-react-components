import "normalize.css/normalize.css"; // Reset stylesheet for cross-browser compatibility
import "react-toastify/dist/ReactToastify.css";
import "src/modules/i18n/i18n";
import "./styles/styles.scss";

import { ITheme } from "src/modules/CSS";

export * from "./actions";
export * from "./components";
export * from "./config";
export * from "./modules";
export * from "./reducers";
export { default as TRCRouter, history } from "./routers/AppRouter";
export * from "./routers/routes";
export { default as store } from "./store/config";
export * from "./app";
export { ITheme };
