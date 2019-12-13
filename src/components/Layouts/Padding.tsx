import styled from "styled-components";

interface IPaddingProps {
    amountH?: number;
    amountV?: number;
}

export default styled.div<IPaddingProps>`
    padding-top: ${({ amountV }) => (amountV == undefined ? 2.5 : amountV)}%;
    padding-bottom: ${({ amountV }) => (amountV == undefined ? 2.5 : amountV)}%;
    padding-left: ${({ amountH }) => (amountH == undefined ? 5 : amountH)}%;
    padding-right: ${({ amountH }) => (amountH == undefined ? 5 : amountH)}%;
    max-height: 95%;
    overflow-y: scroll;
`;
