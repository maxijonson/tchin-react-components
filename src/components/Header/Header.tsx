import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as _ from "lodash";
import React from "react";

import { app } from "src/app";
import { Card, Modal } from "src/components";
import { ZINDEX } from "src/config";
import { Hooks } from "src/modules";
import { routes, socials } from "src/routers/routes";
import styled from "styled-components";
import { SCROLLBAR_EVENT } from "../Scrollbar/Scrollbar";
import LangSwitch from "./LangSwitch";
import Nav from "./Nav";
import ThemeSwitch from "./ThemeSwitch";

const { useConnect } = Hooks;

const Header = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    font-size: 3.6rem;
    margin: 1.5rem 0 0 2rem;
    cursor: pointer;
    z-index: ${ZINDEX.header};
`;

export default () => {
    const { theme } = useConnect(({ theme }) => ({ theme }));
    const [menuVisible, setMenuVisible] = React.useState(false);
    const [isNavigating, setIsNavigating] = React.useState(false);

    let hideTimeout: number;
    let showTimeout: number;

    const onRequestClose = () => setMenuVisible(false);

    const onMenuClick = () => setMenuVisible(true);

    const handlePathChange = (e: React.MouseEvent, path: string) => {
        if (e.defaultPrevented) {
            return;
        }
        if (path == app.history.location.pathname) {
            setMenuVisible(false);
            return;
        }
        e.preventDefault();

        setIsNavigating(true);
        hideTimeout = window.setTimeout(() => {
            app.history.push(path);
            window.scrollTo(0, 0);
            window.dispatchEvent(new Event(SCROLLBAR_EVENT));
            showTimeout = window.setTimeout(() => {
                setIsNavigating(false);
                setMenuVisible(false);
            }, 500);
        }, 500);
    };

    React.useEffect(() => {
        if (showTimeout) {
            window.clearTimeout(showTimeout);
        }
        if (hideTimeout) {
            window.clearTimeout(hideTimeout);
        }
    });

    return (
        <Header className={`header ${menuVisible ? "active" : ""}`}>
            <div className={`header--button`} onClick={onMenuClick}>
                <FontAwesomeIcon icon="bars" color={theme.colors.defaultText} />
            </div>
            <Modal
                overlayOpacity={isNavigating ? 1 : undefined}
                onRequestClose={onRequestClose}
                visible={menuVisible}
                left
                overlayClassName="header--modal-overlay"
                containerClassName="header--modal-container"
                parent={document.getElementById("app")}
            >
                <Card
                    subtitle={
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                            }}
                        >
                            <div
                                style={{
                                    gridColumnStart: 1,
                                    textAlign: "center",
                                }}
                            >
                                <LangSwitch />
                            </div>
                            <div
                                style={{
                                    gridColumnStart: 2,
                                    textAlign: "center",
                                }}
                            >
                                <ThemeSwitch />
                            </div>
                        </div>
                    }
                    footer={
                        <div style={{ textAlign: "center" }}>
                            {_.map(socials, ({ Icon, name, url }) => (
                                <a
                                    style={{ margin: "0 4%" }}
                                    href={url}
                                    key={name}
                                    title={name}
                                    children={<Icon />}
                                />
                            ))}
                        </div>
                    }
                    kClassName="header--card"
                >
                    {_.map(
                        routes,
                        ({ hidden, component, ...route }) =>
                            !hidden && (
                                <Nav
                                    {...route}
                                    onPathChange={handlePathChange}
                                />
                            ),
                    )}
                </Card>
            </Modal>
        </Header>
    );
};
