import styled from "styled-components";

export default styled.a`
    cursor: pointer;
    color: ${({ theme }) => theme.colors.link};
    text-decoration: none;
`;
