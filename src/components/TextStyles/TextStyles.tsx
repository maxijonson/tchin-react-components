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

export const TextRight = styled.p`
    text-align: right;
`;
