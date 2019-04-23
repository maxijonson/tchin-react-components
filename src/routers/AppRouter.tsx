import { createBrowserHistory } from "history";
import _ from "lodash";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import styled from "styled-components";

import { Header, Scrollbar } from "src/components";
import { THEME_TRANSITION_TIME } from "src/config";
import { Hooks } from "src/modules";
import { fonts } from "src/modules/CSS";
import { app } from "src/app";

const { useConnect } = Hooks;

export const history = createBrowserHistory();

const PageWrapperStyled = styled.div`
    background-color: ${({ theme }) => theme.colors.pageBackground};
    width: auto;
    font-family: ${fonts.oswald.family};
    min-height: 98.45250474vh;
    transition: all ${THEME_TRANSITION_TIME}s;
    flex: 1 0 auto;
    overflow: auto;
`;

export default () => {
    const { theme } = useConnect(({ theme }) => ({ theme }));

    return (
        <Router history={history}>
            <React.Fragment>
                <PageWrapperStyled theme={theme}>
                    <Scrollbar />
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
            </React.Fragment>
        </Router>
    );
};
