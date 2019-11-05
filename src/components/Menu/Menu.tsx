import React from "react";
import styled from "styled-components";
import { motion, useCycle } from "framer-motion";
import { ZINDEX } from "../../config";
import { Hooks } from "../../modules";

const { useConnect } = Hooks;

const overlay = {
    open: {
        clipPath: `circle(250vh at 0px 0px)`,
        transition: {
            type: "spring",
            stiffness: 50,
            restDelta: 2,
        },
    },
    closed: {
        clipPath: "circle(0vh at 0px 0px)",
        transition: {
            delay: 0.5,
            type: "spring",
            stiffness: 400,
            damping: 40,
        },
    },
};
const backdrop = {
    open: {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    },
    closed: {
        clipPath: "polygon(0 0, 0 0, 0 0, 0 0)",
    },
};

const Menu = styled(motion.nav)`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: ${ZINDEX.menu};
`;

const ToggleButton = styled(motion.button)`
    outline: none;
    border: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    cursor: pointer;
    position: absolute;
    top: 1vw;
    left: 1vw;
    width: 1vw;
    height: 1vw;
    border-radius: 50%;
    background: transparent;
`;

const Overlay = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    background: ${({ theme }) => theme.colors.pageBackground};
    opacity: 0.8;
`;

const Backdrop = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    backdrop-filter: blur(2px);
`;

const Path = (props: React.ComponentProps<typeof motion.path>) => {
    const theme = useConnect(({ theme }) => theme);
    return (
        <motion.path
            fill="transparent"
            strokeWidth="3"
            stroke={theme.colors.defaultText}
            strokeLinecap="round"
            {...props}
        />
    );
};

export default () => {
    const [open, toggleOpen] = useCycle(false, true);
    return (
        <Menu initial={false} animate={open ? "open" : "closed"}>
            <Backdrop variants={backdrop} />
            <Overlay variants={overlay} />
            <ToggleButton onClick={() => toggleOpen()}>
                <svg width="23" height="23" viewBox="0 0 23 23">
                    <Path
                        variants={{
                            closed: { d: "M 2 2.5 L 20 2.5" },
                            open: { d: "M 3 16.5 L 17 2.5" },
                        }}
                    />
                    <Path
                        d="M 2 9.423 L 20 9.423"
                        variants={{
                            closed: { opacity: 1 },
                            open: { opacity: 0 },
                        }}
                        transition={{ duration: 0.1 }}
                    />
                    <Path
                        variants={{
                            closed: { d: "M 2 16.346 L 20 16.346" },
                            open: { d: "M 3 2.5 L 17 16.346" },
                        }}
                    />
                </svg>
            </ToggleButton>
        </Menu>
    );
};

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faBars } from "@fortawesome/free-solid-svg-icons";
// import _ from "lodash";
// import React from "react";
// import styled from "styled-components";
// import app, { IVisibleRoute } from "../../app";
// import Modal from "../Modal/Modal";
// import AdvancedCard from "../AdvancedCard/AdvancedCard";
// import { ZINDEX } from "../../config";
// import { Hooks } from "../../modules";
// import { SCROLLBAR_EVENT } from "../Scrollbar/Scrollbar";
// import LangSwitch from "./LangSwitch";
// import Nav from "./Nav";
// import ThemeSwitch from "./ThemeSwitch";

// const { useConnect } = Hooks;

// const Menu = styled.div`
//     position: fixed;
//     top: 0;
//     left: 0;
//     font-size: 2em;
//     margin: 1.5rem 0 0 2rem;
//     cursor: pointer;
//     z-index: ${ZINDEX.menu};
// `;

// export default () => {
//     const { theme } = useConnect(({ theme }) => ({ theme }));
//     const [menuVisible, setMenuVisible] = React.useState(false);
//     const [isNavigating, setIsNavigating] = React.useState(false);

//     let hideTimeout: number;
//     let showTimeout: number;

//     const onRequestClose = () => setMenuVisible(false);

//     const onMenuClick = () => setMenuVisible(true);

//     const handlePathChange = (e: React.MouseEvent, path: string) => {
//         if (e.defaultPrevented) {
//             return;
//         }
//         if (path == app.history.location.pathname) {
//             setMenuVisible(false);
//             return;
//         }
//         e.preventDefault();

//         setIsNavigating(true);
//         hideTimeout = window.setTimeout(() => {
//             app.history.push(path);
//             window.scrollTo(0, 0);
//             window.dispatchEvent(new Event(SCROLLBAR_EVENT));
//             showTimeout = window.setTimeout(() => {
//                 setIsNavigating(false);
//                 setMenuVisible(false);
//             }, 500);
//         }, 500);
//     };

//     React.useEffect(() => {
//         if (showTimeout) {
//             window.clearTimeout(showTimeout);
//         }
//         if (hideTimeout) {
//             window.clearTimeout(hideTimeout);
//         }
//     });

//     return (
//         <Menu className={`menu ${menuVisible ? "active" : ""}`}>
//             <div className="menu--button" onClick={onMenuClick}>
//                 <FontAwesomeIcon
//                     icon={faBars}
//                     color={theme.colors.defaultText}
//                 />
//             </div>
//             <Modal
//                 overlayOpacity={isNavigating ? 1 : undefined}
//                 onRequestClose={onRequestClose}
//                 visible={menuVisible}
//                 left
//                 overlayClassName="menu--modal-overlay"
//                 containerClassName="menu--modal-container"
//                 parent={document.getElementById("app")}
//             >
//                 <AdvancedCard
//                     subtitle={
//                         <div
//                             style={{
//                                 display: "grid",
//                                 gridTemplateColumns: "1fr 1fr",
//                             }}
//                         >
//                             <div
//                                 style={{
//                                     gridColumnStart: 1,
//                                     textAlign: "center",
//                                 }}
//                             >
//                                 <LangSwitch />
//                             </div>
//                             <div
//                                 style={{
//                                     gridColumnStart: 2,
//                                     textAlign: "center",
//                                 }}
//                             >
//                                 <ThemeSwitch />
//                             </div>
//                         </div>
//                     }
//                     footer={
//                         <div style={{ textAlign: "center" }}>
//                             {_.map(app.socials, ({ Icon, name, url }) => (
//                                 <a
//                                     style={{ margin: "0 4%" }}
//                                     href={url}
//                                     key={name}
//                                     title={name}
//                                     children={<Icon />}
//                                 />
//                             ))}
//                         </div>
//                     }
//                     kClassName="menu--card"
//                 >
//                     {_.map(
//                         app.routes,
//                         (route) =>
//                             !route.hidden && (
//                                 <Nav
//                                     {...(route as IVisibleRoute)}
//                                     onPathChange={handlePathChange}
//                                 />
//                             )
//                     )}
//                 </AdvancedCard>
//             </Modal>
//         </Menu>
//     );
// };
