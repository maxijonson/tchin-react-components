import _ from "lodash";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import app from "../app";
import { Footer, Menu, Scrollbar, ToastStyle } from "../components";
import { THEME_TRANSITION_TIME } from "../config";
import { Hooks } from "../modules";

const { useConnect } = Hooks;

const PageWrapperStyled = styled.div`
    background-color: ${({ theme }) => theme.colors.pageBackground};
    width: auto;
    min-height: 98.45250474vh;
    transition: all ${THEME_TRANSITION_TIME}s;
    font-size: 1.6em;
    flex: 1 0 auto;
    overflow: auto;
    color: ${({ theme }) => theme.colors.defaultText};
`;

export default ({ projectVersion }: { projectVersion?: string }) => {
    const { theme } = useConnect(({ theme }) => ({ theme }));
    return (
        <ThemeProvider theme={theme}>
            <Router history={app.history}>
                <>
                    <PageWrapperStyled theme={theme}>
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
                    </PageWrapperStyled>
                    <Footer projectVersion={projectVersion} />
                    <Menu />
                </>
            </Router>
        </ThemeProvider>
    );
};
