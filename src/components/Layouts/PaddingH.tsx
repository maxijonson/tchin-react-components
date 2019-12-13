import styled from "styled-components";

interface IPaddingHProps {
    amount?: number;
}

export default styled.div<IPaddingHProps>`
    padding-right: ${({ amount }) => (amount == undefined ? 7 : amount)}%;
    padding-left: ${({ amount }) => (amount == undefined ? 7 : amount)}%;
    max-height: 100%;
    overflow-y: scroll;
`;
