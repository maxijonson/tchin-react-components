import styled from "styled-components";

export default styled.div`
    display: inline-block;
    border-radius: 5px;
    filter: drop-shadow(
        1px 1px 1px ${({ theme }) => theme.colors.defaultShadow}
    );
    padding: 1.6em;
    background: ${({ theme }) => theme.colors.card};
    margin: 2%;
`;
