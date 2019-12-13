import styled from "styled-components";

interface IPaddingVProps {
    amount?: number;
}

export const PaddingV = styled.div<IPaddingVProps>`
    padding-top: ${({ amount }) => (amount == undefined ? 2.5 : amount)}%;
    padding-bottom: ${({ amount }) => (amount == undefined ? 2.5 : amount)}%;
    overflow-y: scroll;
`;
