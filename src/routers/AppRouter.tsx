import _ from "lodash";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import styled from "styled-components";

import app from "../app";
import { Footer, Header, Scrollbar, ToastStyle } from "../components";
import { THEME_TRANSITION_TIME } from "../config";
import { Hooks } from "../modules";

const { useConnect } = Hooks;

// font-family: ${fonts.oswald.family};
const PageWrapperStyled = styled.div`
    background-color: ${({ theme }) => theme.colors.pageBackground};
    width: auto;
    min-height: 98.45250474vh;
    transition: all ${THEME_TRANSITION_TIME}s;
    font-family: ${app.fonts.oswald.family};
    flex: 1 0 auto;
    overflow: auto;
`;

export default ({ projectVersion }: { projectVersion?: string }) => {
    const { theme } = useConnect(({ theme }) => ({ theme }));
    return (
        <Router history={app.history}>
            <React.Fragment>
                <PageWrapperStyled theme={theme}>
                    <Scrollbar />
                    <ToastStyle theme={theme} />
                    <Header />
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
            </React.Fragment>
        </Router>
    );
};
