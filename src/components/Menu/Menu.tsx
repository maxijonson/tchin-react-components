import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import _ from "lodash";
import React from "react";
import styled from "styled-components";
import app, { IVisibleRoute } from "../../app";
import Modal from "../Modal/Modal";
import AdvancedCard from "../AdvancedCard/AdvancedCard";
import { ZINDEX } from "../../config";
import { Hooks } from "../../modules";
import { SCROLLBAR_EVENT } from "../Scrollbar/Scrollbar";
import LangSwitch from "./LangSwitch";
import Nav from "./Nav";
import ThemeSwitch from "./ThemeSwitch";

const { useConnect } = Hooks;

const Menu = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    font-size: 2em;
    margin: 1.5rem 0 0 2rem;
    cursor: pointer;
    z-index: ${ZINDEX.menu};
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
        <Menu className={`menu ${menuVisible ? "active" : ""}`}>
            <div className="menu--button" onClick={onMenuClick}>
                <FontAwesomeIcon
                    icon={faBars}
                    color={theme.colors.defaultText}
                />
            </div>
            <Modal
                overlayOpacity={isNavigating ? 1 : undefined}
                onRequestClose={onRequestClose}
                visible={menuVisible}
                left
                overlayClassName="menu--modal-overlay"
                containerClassName="menu--modal-container"
                parent={document.getElementById("app")}
            >
                <AdvancedCard
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
                            {_.map(app.socials, ({ Icon, name, url }) => (
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
                    kClassName="menu--card"
                >
                    {_.map(
                        app.routes,
                        (route) =>
                            !route.hidden && (
                                <Nav
                                    {...route as IVisibleRoute}
                                    onPathChange={handlePathChange}
                                />
                            )
                    )}
                </AdvancedCard>
            </Modal>
        </Menu>
    );
};