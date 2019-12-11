import _ from "lodash";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import app from "../app";
import { Scrollbar, ToastStyle } from "../components";
import { THEME_TRANSITION_TIME } from "../config";
import { Hooks } from "../modules";

const { useConnect } = Hooks;

const AppWrapper = styled.div`
    display: flex;
    font-size: 1.6em;
    min-height: 100vh;
    color: ${({ theme }) => theme.colors.defaultText};
    background-color: ${({ theme }) => theme.colors.pageBackground};
    transition: all ${THEME_TRANSITION_TIME}s;
`;

export default () => {
    const { theme } = useConnect(({ theme }) => ({ theme }));
    return (
        <ThemeProvider theme={theme}>
            <Router history={app.history}>
                <>
                    <AppWrapper>
                        <Scrollbar />
                        <ToastStyle theme={theme} />
                        <Switch>
                            {_.map(
                                app.routes,
                                ({ key, path, component, exact }) => (
                                    <Route
                                        key={key}
                                        path={path}
                                        component={component}
                                        exact={exact}
                                    />
                                )
                            )}
                        </Switch>
                    </AppWrapper>
                </>
            </Router>
        </ThemeProvider>
    );
};
