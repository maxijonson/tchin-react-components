import React from "react";
import styled from "styled-components";
import { motion, useCycle } from "framer-motion";
import _ from "lodash";
import { NavLink } from "react-router-dom";
import { ZINDEX, BREAKPOINTS, THEME_TRANSITION_TIME } from "../../config";
import { Hooks, CSS } from "../../modules";
import LangSwitch from "./LangSwitch";
import ThemeSwitch from "./ThemeSwitch";
import app from "../../App/app";

const { useConnect, useGetDimensions } = Hooks;
const { fonts } = CSS;

type IVariants = ComponentProps<typeof motion.div>["variants"];

// https://css-tricks.com/svg-path-syntax-illustrated-guide/
const overlay: IVariants = {
    open: ({ width, height }: ReturnType<typeof useGetDimensions>) => ({
        d: `M 0 0
            L ${width} 0
            C ${width * 2.2} 0 ${width} ${height} 0 ${height * 2.2}
            z`,
        opacity: 0.6,
        transition: {
            duration: 0.5,
        },
    }),
    closed: {
        d: `M 0 0
            L 0 0
            C 0 0 0 0 0 0
            z`,
        transition: {
            delay: 0.8,
            duration: 0.4,
        },
        opacity: 0,
    },
    navigating: {
        opacity: 1,
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
            display: { delay: 0 },
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
    navigating: {
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

const Menu = styled(motion.nav)`
    position: fixed;
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
`;

const Backdrop = styled(motion.div)`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100%;
    backdrop-filter: blur(4px);
`;

const Svg = styled.svg<{ open: boolean }>`
    width: ${({ open }) => !open && 0};
    height: ${({ open }) => !open && 0};
    transition: ${({ open }) => (open ? 0 : "0.75s 0.8s")};
`;

const ICON_HEIGHT = 25;
const NavContainer = styled(motion.div)`
    min-width: 80%;
    height: 80%;
    position: absolute;
    left: 0;
    top: calc(
        ${TOGGLE_BUTTON_TOP} + ${TOGGLE_BUTTON_HEIGHT}px +
            (${TOGGLE_BUTTON_PADDING} * 2)
    );
    @media (min-width: ${BREAKPOINTS.mdpx}) {
        min-width: 30%;
    }
    @media (min-width: ${BREAKPOINTS.lgpx}) {
        min-width: 20%;
    }

    & > div {
        max-height: 85%;
        padding-right: ${ICON_HEIGHT / 2}px;
    }
`;

const Navigation = styled.ul`
    margin: 0;
    padding: 0;
    padding-left: 10px;
`;

const Route = styled(motion.li)`
    margin: 0;
    padding: 0;
    list-style: none;
    margin: ${ICON_HEIGHT / 4}px 0;
    display: flex;
    align-items: center;
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
    font-family: ${fonts.openSans.family};
    font-size: ${ICON_HEIGHT}px;
`;

const Switches = styled(motion.div)`
    display: flex;
    width: 100%;
    font-family: ${fonts.openSans.family};
    flex-direction: row-reverse;
    & > * {
        margin-left: 7.5%;
    }
`;

export default () => {
    const [open, toggleOpen] = useCycle(false, true);
    const theme = useConnect(({ theme }) => theme);
    const dimensions = useGetDimensions({ throttle: 100 });

    const pathDefaultProps = React.useMemo<ComponentProps<typeof motion.path>>(
        () => ({
            fill: "transparent",
            strokeWidth: "3",
            stroke: theme.colors.defaultText,
            strokeLinecap: "round",
        }),
        [theme]
    );

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
            <NavContainer variants={stagger}>
                <Switches>
                    <motion.div variants={staggerChildren}>
                        <LangSwitch />
                    </motion.div>
                    <motion.div variants={staggerChildren}>
                        <ThemeSwitch />
                    </motion.div>
                </Switches>
                <motion.hr variants={staggerChildren} />
                <div>
                    <Navigation>
                        {_.map(
                            app.routes,
                            (route) =>
                                !route.hidden && (
                                    <NavLink
                                        to={route.path}
                                        key={route.key}
                                        exact={route.exact}
                                        style={{
                                            color: theme.colors.defaultText,
                                            textDecoration: "none",
                                        }}
                                    >
                                        <Route
                                            variants={staggerChildren}
                                            whileHover={{
                                                x: ICON_HEIGHT / 2,
                                            }}
                                            whileTap={{ scale: 0.97, x: 5 }}
                                        >
                                            <Icon>
                                                <route.Icon />
                                            </Icon>
                                            <Text>{route.name}</Text>
                                        </Route>
                                    </NavLink>
                                )
                        )}
                    </Navigation>
                </div>
                <motion.hr variants={staggerChildren} />
                <Switches
                    style={{
                        justifyContent: "center",
                        fontSize: "15px",
                        padding: 0,
                    }}
                >
                    {_.map(app.socials, ({ Icon: SocialIcon, name, url }) => (
                        <motion.a
                            style={{ margin: "0 15px" }}
                            href={url}
                            key={name}
                            title={name}
                            children={<SocialIcon />}
                            variants={staggerChildren}
                        />
                    ))}
                </Switches>
            </NavContainer>
            <ToggleButton onClick={() => toggleOpen()}>
                <svg
                    width="20"
                    height={TOGGLE_BUTTON_HEIGHT}
                    viewBox={`0 0 20 ${TOGGLE_BUTTON_HEIGHT}`}
                >
                    <motion.path
                        {...pathDefaultProps}
                        variants={{
                            closed: { d: "M 2 2 L 18 2" },
                            open: { d: "M 2 16 L 18 2" },
                        }}
                    />
                    <motion.path
                        {...pathDefaultProps}
                        d="M 2 9 L 18 9"
                        variants={{
                            closed: { opacity: 1 },
                            open: { opacity: 0 },
                        }}
                        transition={{ duration: 0.1 }}
                    />
                    <motion.path
                        {...pathDefaultProps}
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
