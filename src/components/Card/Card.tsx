import styled from "styled-components";

export default styled.div`
    display: inline-block;
    border-radius: 5px;
    padding: 1.6rem;
    background: ${({ theme }) => theme.colors.pageBackground};
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    margin: 2%;
    box-shadow: 0 2px 2px -1px ${({ theme }) => theme.colors.cardShadow},
        0 1px 5px -2px ${({ theme }) => theme.colors.cardShadow};
`;
