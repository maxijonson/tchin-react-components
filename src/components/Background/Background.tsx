import styled from "styled-components";
import { BREAKPOINTS, THEME_TRANSITION_TIME } from "../../../src/config";

export interface IBackgroundOptions {
    parallax?: boolean;
    blurAmount?: number;
}

export default styled.div<
    { background: string } & ISCThemeProp & IBackgroundOptions
>`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-size: cover;
    background-attachment: ${({ parallax }) => parallax && "fixed"};
    background-position: center;
    background-repeat: no-repeat;
    background-image: ${({ background }) => `url(${background})`};
    transform: scale(1.1);
    transition: all ${THEME_TRANSITION_TIME}s;
    filter: ${({ theme, blurAmount }) =>
        theme.name == "light"
            ? `blur(${
                  blurAmount == undefined ? 3 : blurAmount
              }px) brightness(90%)`
            : `blur(${
                  blurAmount == undefined ? 3 : blurAmount
              }px) brightness(30%)`};
    @media (max-width: ${BREAKPOINTS.lgpx}) {
        background-attachment: scroll !important;
        background-size: cover !important;
    }
`;
