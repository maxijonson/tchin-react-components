/* eslint-disable import/first, import/newline-after-import */
/// ---- STYLES
import "normalize.css/normalize.css"; // Reset stylesheet for cross-browser compatibility
import "react-toastify/dist/ReactToastify.css";
import "./src/styles/styles.scss";

/// ----- MODULES
export * from "./src/modules";

/// ----- COMPONENTS
export * from "./src/components";

/// ----- CONFIG
export * from "./src/config";

/// ----- PAGES
export * from "./src/pages";

/// ----- APP
export { default as app } from "./src/app";

/// ----- TRC ROUTER
export { default as TRCRouter } from "./src/routers/AppRouter";
