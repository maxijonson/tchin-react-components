import styled from "styled-components";
import { THEME_TRANSITION_TIME } from "../../config";
import app from "../../app";

export const CodeSpan = styled.span`
    border: 1px solid ${({ theme }) => theme.colors.tableAltBorder};
    transition: background ${THEME_TRANSITION_TIME}s;
    background: ${({ theme }) => theme.colors.textBackground};
    border-radius: 0.25em;
    padding: 0 3px;
    font-size: calc(1.6rem - 3px);
    font-family: ${app.fonts.firaCode.family};
`;

export const TextCenter = styled.p`
    text-align: center;
`;

export const TextJustify = styled.p`
    text-align: justify;
`;

export const TextLeft = styled.p`
    text-align: left;
`;
export const P = TextLeft;

export const TextRight = styled.p`
    text-align: right;
`;

export const Title = styled.h1`
    margin: 0;
    padding: 0;
    font-size: 3.5em;
    font-weight: 600;
`;
export const H1 = Title;

export const Subtitle = styled.h2`
    margin: 0;
    padding: 0;
    font-size: 2.75em;
`;
export const H2 = Subtitle;

export const H3 = styled.h3`
    margin: 0;
    padding: 0;
    font-size: 1.875em;
`;

export const H4 = styled.h4`
    margin: 0;
    padding: 0;
    font-size: 1.17em;
    color: ${({ theme }) => theme.colors.altText};
`;

export const H5 = styled.h5`
    margin: 0;
    padding: 0;
    font-size: 0.9em;
    color: ${({ theme }) => theme.colors.altText};
`;
