import styled from "styled-components";

interface IMarginProps {
    amountH?: number;
    amountV?: number;
}

export default styled.div<IMarginProps>`
    margin-top: ${({ amountV }) => (amountV == undefined ? 2.5 : amountV)}%;
    margin-bottom: ${({ amountV }) => (amountV == undefined ? 2.5 : amountV)}%;
    margin-left: ${({ amountH }) => (amountH == undefined ? 5 : amountH)}%;
    margin-right: ${({ amountH }) => (amountH == undefined ? 5 : amountH)}%;
    max-height: 90%;
    overflow-y: scroll;
`;
