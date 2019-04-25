import * as _ from "lodash";
import * as React from "react";
import { Hooks } from "src/app";
import { BREAKPOINTS, ZINDEX } from "src/config";
import styled from "styled-components";
import tinycolor from "tinycolor2";

const { useCurrentBreakpoint } = Hooks;

const Container = styled.div`
    position: fixed;
    padding: 2px 0;
    right: 2px;
    height: 100vh;
    z-index: ${ZINDEX.scrollbar};
    width: 6px;
`;

const Scrollbar = styled.div.attrs(
    ({ pos, height }: { pos: number; height: number }) => ({
        style: {
            top: `${pos}%`,
            height: `${height}%`,
        },
    }),
)<{ height: number; pos: number }>`
    transition: height 0.5s, background 0.25s;
    position: absolute;
    width: 6px;
    background: ${tinycolor("#696A68")
        .setAlpha(0.7)
        .toRgbString()};
    border-radius: 20px;

    &:hover {
        background: ${tinycolor("#696A68")
            .setAlpha(0.85)
            .toRgbString()};
    }

    &:active {
        background: #696a68;
    }
`;

export const SCROLLBAR_EVENT = "scrollbarShouldUpdate";

// TODO: drag events
export default () => {
    const [docHeight, setDocHeight] = React.useState(
        document.body.scrollHeight,
    );
    const [position, setPosition] = React.useState(
        document.documentElement.scrollTop,
    );
    const breakpoint = useCurrentBreakpoint("screen");

    const sbHeight = _.clamp((window.innerHeight / docHeight) * 100, 0, 100);
    const sbPos = (position / docHeight) * 100;

    const updateDocHeight = () => {
        setDocHeight(document.body.scrollHeight);
        console.log("updateDocHeight");
    };

    const updatePosition = () => {
        setPosition(document.documentElement.scrollTop);
    };

    React.useLayoutEffect(() => {
        window.addEventListener("resize", updateDocHeight);
        window.addEventListener("scroll", updatePosition);
        window.addEventListener(SCROLLBAR_EVENT, updateDocHeight);
        window.addEventListener(SCROLLBAR_EVENT, updatePosition);
        updateDocHeight();
        return () => {
            window.removeEventListener("resize", updateDocHeight);
            window.removeEventListener("scroll", updatePosition);
            window.removeEventListener(SCROLLBAR_EVENT, updateDocHeight);
            window.removeEventListener(SCROLLBAR_EVENT, updatePosition);
        };
    }, [document.body.scrollHeight]);

    return breakpoint <= BREAKPOINTS.md || sbHeight == 100 ? null : (
        <Container children={<Scrollbar pos={sbPos} height={sbHeight} />} />
    );
};
