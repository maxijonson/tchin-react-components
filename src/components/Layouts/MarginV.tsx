import styled from "styled-components";

interface MarginVProps {
    amount?: number;
}

export default styled.div<MarginVProps>`
    margin-top: ${({ amount }) => (amount == undefined ? 2.5 : amount)}%;
    margin-bottom: ${({ amount }) => (amount == undefined ? 2.5 : amount)}%;
    max-height: 90%;
    overflow-y: scroll;
`;
