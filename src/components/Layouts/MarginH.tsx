import styled from "styled-components";

interface MarginHProps {
    amount?: number;
}

export default styled.div<MarginHProps>`
    margin-right: ${({ amount }) => (amount == undefined ? 7 : amount)}%;
    margin-left: ${({ amount }) => (amount == undefined ? 7 : amount)}%;
    max-height: 100%;
    overflow-y: scroll;
`;
