import styled from "styled-components";
import { THEME_TRANSITION_TIME } from "../../config";
import app from "../../app";

export default styled.span`
    border: 1px solid ${({ theme }) => theme.colors.tableAltBorder};
    transition: background ${THEME_TRANSITION_TIME}s;
    background: ${({ theme }) => theme.colors.textBackground};
    border-radius: 0.25em;
    padding: 0 3px;
    font-size: calc(1.6rem - 3px);
    font-family: ${app.fonts.firaCode.family};
`;
