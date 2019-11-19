import React from "react";
import styled from "styled-components";
import { motion, useCycle } from "framer-motion";
import _ from "lodash";
import { ZINDEX, BREAKPOINTS, THEME_TRANSITION_TIME } from "../../config";
import { Hooks } from "../../modules";
import LangSwitch from "./LangSwitch";
import ThemeSwitch from "./ThemeSwitch";
import app from "../../app";

const { useConnect, useGetDimensions } = Hooks;

type IVariants = React.ComponentProps<typeof motion.div>["variants"];

// https://css-tricks.com/svg-path-syntax-illustrated-guide/
const overlay: IVariants = {
    open: ({ width, height }: ReturnType<typeof useGetDimensions>) => ({
        d: `M 0 0
            L ${width} 0
            C ${width * 2.2} 0 ${width} ${height} 0 ${height * 2.2}
            z`,
    }),
    closed: {
        d: `M 0 0
            L 0 0
            C 0 0 0 0 0 0
            z`,
        transition: {
            delay: 0.8,
        },
    },
};
const backdrop: IVariants = {
    open: {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        transition: {
            type: "tween",
        },
    },
    closed: {
        clipPath: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
        transition: {
            type: "tween",
            delay: 0.8,
        },
    },
};
const stagger: IVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};
const staggerChildren: IVariants = {
    open: {
        display: "flex",
        x: 0,
        opacity: 1,
        transition: {
            x: { stiffness: 1000, velocity: -100 },
        },
    },
    closed: {
        x: -50,
        opacity: 0,
        display: "none",
        transition: {
            display: { delay: 1 },
            x: { stiffness: 1000 },
        },
        transitionEnd: {
            x: 50,
        },
    },
};
const hrs: IVariants = {
    open: {
        width: "100%",
        x: 0,
        opacity: 1,
        transition: {
            delay: 0.5,
            width: { delay: 0, duration: 0 },
        },
    },
    closed: {
        x: -100,
        opacity: 0,
        transitionEnd: {
            width: "0%",
            x: 100,
        },
    },
};

const Menu = styled(motion.nav)`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: ${ZINDEX.menu};
    transition: color ${THEME_TRANSITION_TIME}s;
    color: ${({ theme }) => theme.colors.defaultText};
`;

const TOGGLE_BUTTON_TOP = "2vw";
const TOGGLE_BUTTON_HEIGHT = "18";
const TOGGLE_BUTTON_PADDING = "5px";
const ToggleButton = styled(motion.button)`
    outline: none;
    border: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    cursor: pointer;
    position: absolute;
    top: ${TOGGLE_BUTTON_TOP};
    left: 2vw;
    padding: ${TOGGLE_BUTTON_PADDING};
    border-radius: 50%;
    background: transparent;
`;

const Overlay = styled(motion.path)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    background: ${({ theme }) => theme.colors.pageBackground};
    opacity: 0.6;
`;

const Backdrop = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100vw;
    backdrop-filter: blur(4px);
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

const Svg = styled.svg<ReturnType<typeof useGetDimensions> & { open: boolean }>`
    width: ${({ width, open }) => (open ? width : 0)};
    height: ${({ height, open }) => (open ? height : 0)};
    transition: ${({ open }) => (open ? 0 : "0.75s 0.8s")};
`;

const NavContainer = styled.div`
    width: 80%;
    height: 80%;
    position: absolute;
    left: 0;
    top: calc(
        ${TOGGLE_BUTTON_TOP} + ${TOGGLE_BUTTON_HEIGHT}px +
            (${TOGGLE_BUTTON_PADDING} * 2)
    );
    @media (min-width: ${BREAKPOINTS.mdpx}) {
        width: 30%;
    }

    & > div {
        max-height: 90%;
        overflow-y: scroll;
    }
`;

const Navigation = styled(motion.ul)`
    margin: 0;
    padding: 0;
    padding-left: 10px;
`;

const ICON_HEIGHT = 25;
const Route = styled(motion.li)`
    margin: 0;
    padding: 0;
    list-style: none;
    margin-bottom: ${ICON_HEIGHT / 2}px;
    display: flex;
    align-items: center;
    word-break: break-word;
    cursor: pointer;
`;

const Icon = styled.div`
    width: ${ICON_HEIGHT}px !important;
    height: ${ICON_HEIGHT}px;
    margin-right: 2em;
    & > svg.svg-inline--fa.fa-w-16 {
        width: ${ICON_HEIGHT}px;
        height: ${ICON_HEIGHT}px;
    }
`;

const Text = styled.div`
    font-family: ${app.fonts.openSans.family};
    font-size: ${ICON_HEIGHT}px;
`;

const Switches = styled(motion.div)`
    display: flex;
    width: 100%;
    font-family: ${app.fonts.openSans.family};
    flex-direction: row-reverse;
    & > * {
        margin-left: 7.5%;
    }
`;

export default () => {
    const [open, toggleOpen] = useCycle(false, true);
    const theme = useConnect(({ theme }) => theme);
    const dimensions = useGetDimensions({ throttle: 100 });

    return (
        <Menu initial={false} animate={open ? "open" : "closed"}>
            <Backdrop variants={backdrop} />
            <Svg
                {...dimensions}
                open={open}
                viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            >
                <Overlay
                    variants={overlay}
                    fill={theme.colors.pageBackground}
                    custom={dimensions}
                />
            </Svg>
            <NavContainer>
                <Switches variants={stagger}>
                    <motion.div variants={staggerChildren}>
                        <LangSwitch />
                    </motion.div>
                    <motion.div variants={staggerChildren}>
                        <ThemeSwitch />
                    </motion.div>
                </Switches>
                <motion.hr variants={hrs} />
                <div>
                    <Navigation variants={stagger}>
                        {_.map(
                            app.routes,
                            (route) =>
                                !route.hidden && (
                                    <Route
                                        variants={staggerChildren}
                                        whileHover={{ x: ICON_HEIGHT / 2 }}
                                        whileTap={{ scale: 0.97, x: 5 }}
                                        key={route.key}
                                    >
                                        <Icon>
                                            <route.Icon />
                                        </Icon>
                                        <Text>{route.name}</Text>
                                    </Route>
                                )
                        )}
                    </Navigation>
                </div>
                <motion.hr variants={hrs} />
                {/* {_.map(app.socials, ({ Icon: SocialIcon, name, url }) => (
                    <a
                        style={{ margin: "0 4%" }}
                        href={url}
                        key={name}
                        title={name}
                        children={<SocialIcon />}
                    />
                ))} */}
            </NavContainer>
            <ToggleButton onClick={() => toggleOpen()}>
                <svg
                    width="20"
                    height={TOGGLE_BUTTON_HEIGHT}
                    viewBox={`0 0 20 ${TOGGLE_BUTTON_HEIGHT}`}
                >
                    <Path
                        variants={{
                            closed: { d: "M 2 2 L 18 2" },
                            open: { d: "M 2 16 L 18 2" },
                        }}
                    />
                    <Path
                        d="M 2 9 L 18 9"
                        variants={{
                            closed: { opacity: 1 },
                            open: { opacity: 0 },
                        }}
                        transition={{ duration: 0.1 }}
                    />
                    <Path
                        variants={{
                            closed: { d: "M 2 16 L 18 16" },
                            open: { d: "M 2 2 L 18 16" },
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
