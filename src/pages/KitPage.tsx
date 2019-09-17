import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Block } from "../components";
import { Hooks } from "../modules";

const { useConnect } = Hooks;

const AltBlock = styled(Block)`
    background: ${({ theme }: ISCThemeProp) => theme.colors.altPageBackground};
    color: ${({ theme }: ISCThemeProp) => theme.colors.defaultText};
`;

export default () => {
    const theme = useConnect(({ theme }) => theme);
    return (
        <ThemeProvider theme={theme}>
            <AltBlock>Kit Page</AltBlock>
        </ThemeProvider>
    );
};
