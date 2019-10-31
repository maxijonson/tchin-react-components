import styled from "styled-components";
import { THEME_TRANSITION_TIME } from "../../config";

export const CodeSpan = styled.span`
    border: 1px solid ${({ theme }) => theme.colors.tableAltBorder};
    transition: background ${THEME_TRANSITION_TIME}s;
    background: ${({ theme }) => theme.colors.textBackground};
    border-radius: 0.25em;
    padding: 2px 4px;
`;
