import styled from "styled-components";
import { THEME_TRANSITION_TIME } from "../../config";

export const CodeSpan = styled.span`
    border: 1px solid ${({ theme }) => theme.colors.tableAltBorder};
    transition: background ${THEME_TRANSITION_TIME}s;
    background: ${({ theme }) => theme.colors.textBackground};
    border-radius: 0.25em;
    padding: 0 4px;
`;

export const TextCenter = styled.div`
    text-align: center;
`;

export const TextJustify = styled.div`
    text-align: justify;
`;

export const TextLeft = styled.div`
    text-align: left;
`;

export const TextRight = styled.div`
    text-align: right;
`;
