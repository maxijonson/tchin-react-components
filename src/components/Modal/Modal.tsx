import * as React from "react";
import * as ReactDOM from "react-dom";
import posed from "react-pose";
import { THEME_TRANSITION_TIME, ZINDEX } from "src/config";
import { CSS, Hooks } from "src/modules";
import styled from "styled-components";
import tinycolor from "tinycolor2";

const { useConnect, usePortal } = Hooks;
const { fonts } = CSS;

interface IPoseOptions {
    top?: boolean;
    right?: boolean;
    bottom?: boolean;
    left?: boolean;
}

interface IModalOwnProps extends IPoseOptions {
    visible?: boolean;
    children?: React.ReactNode;
    onRequestClose: (e: React.MouseEvent<HTMLDivElement>) => void;
    parent?: HTMLElement | null;
    overlayClassName?: string;
    containerClassName?: string;
    overlayOpacity?: number;
}

const Overlay = styled(
    posed.div({
        visible: {
            opacity: 1,
            zIndex: ZINDEX.modal,
            transition: {
                zIndex: { duration: 0 },
                default: { duration: 250 },
            },
        },
        hidden: {
            opacity: 0,
            zIndex: -1,
            transition: {
                default: { duration: 100 },
            },
        },
    })
)`
    display: grid;
    height: 100vh;
    left: 0;
    padding: 15%;
    position: fixed;
    width: 100vw;
    top: 0;
    transition: all ${THEME_TRANSITION_TIME}s;
    background: ${({ theme, overlayOpacity }) =>
        tinycolor(theme.colors.pageBackground)
            .setAlpha(overlayOpacity || 0.4)
            .toRgbString()};
    cursor: ${({ theme }) =>
            theme.name == "light"
                ? "url(/assets/images/back-cursor-black.png)"
                : "url(/assets/images/back-cursor-white.png)"},
        auto;
    > * {
        cursor: default;
    }
    &:active {
        cursor: default;
    }
`;

const Container = styled(
    posed.div({
        visible: {
            y: "0%",
            x: "0%",
        },
        hidden: {
            y: ({ top, bottom }: IPoseOptions) =>
                top || bottom ? (top ? "-100%" : "100%") : "0%",
            x: ({ left, right }: IPoseOptions) =>
                left || right ? (left ? "-100%" : "100%") : "0%",
        },
    })
)`
    z-index: ${ZINDEX.modal + 2};
    margin: auto 0;
    max-height: 100%;
    overflow-y: auto;
    font-size: 2rem;
    font-family: "${fonts.roboto.family}";
`;

export default (props: IModalOwnProps) => {
    const {
        visible,
        children,
        onRequestClose,
        parent,
        top,
        bottom,
        left,
        right,
        overlayClassName = "",
        containerClassName = "",
        overlayOpacity,
    } = props;

    const { theme } = useConnect(({ theme }) => ({ theme }));
    const target = usePortal(parent || document.body, "modal");

    const preventPropagation = React.useMemo(
        () => (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            e.stopPropagation();
        },
        []
    );

    const pose = visible ? "visible" : "hidden";

    return (
        ReactDOM.createPortal(
            <Overlay
                theme={theme}
                onClick={onRequestClose}
                pose={pose}
                className={`modal__overlay ${overlayClassName}`}
                overlayOpacity={overlayOpacity}
            >
                <Container
                    onClick={preventPropagation}
                    top={top}
                    right={right}
                    bottom={bottom}
                    left={left}
                    className={`modal__container ${containerClassName}`}
                >
                    {children}
                </Container>
            </Overlay>,
            target
        ) || null
    );
};
