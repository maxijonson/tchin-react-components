import styled from "styled-components";
import tinycolor from "tinycolor2";

export default styled.div`
    display: inline-block;
    border-radius: 5px;
    padding: 1.6rem;
    background: ${({ theme }) =>
        tinycolor(theme.colors.pageBackground)
            .clone()
            .lighten(5)
            .toHex8String()};
    margin: 2%;
    border: 1px solid ${({ theme }) => theme.colors.cardBorder};
    box-shadow: 0 2px 2px -1px ${({ theme }) => theme.colors.cardShadow},
        0 1px 5px -2px ${({ theme }) => theme.colors.cardShadow};
`;
