import styled from "styled-components";

export default styled.div`
    display: inline-block;
    border-radius: 5px;
    padding: 1.6rem;
    background: ${({ theme }) => theme.colors.card};
    margin: 2%;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    box-shadow: 0px 2px 2px -1px ${({ theme }) => theme.colors.cardShadow};
`;
