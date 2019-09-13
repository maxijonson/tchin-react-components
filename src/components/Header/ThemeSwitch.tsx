import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Switch from "react-switch";
import { useTranslation } from "react-i18next";
import { Hooks } from "../../../src/modules";
import { creators as themeActions, ITheme } from "../../modules/themes";
import app from "../../app";

const { useConnect } = Hooks;

export default () => {
    const { t } = useTranslation();
    const { theme, setTheme } = useConnect(
        ({ theme }) => ({ theme }),
        (dispatch) => ({
            setTheme: (theme: ITheme) => dispatch(themeActions.setTheme(theme)),
        })
    );

    const handleThemeChange = (checked: boolean) => {
        const theme = checked ? app.themes.light : app.themes.dark;
        app.notify(
            `${t("notification.themeChange")}: ${t(
                `header.theme.${theme.name}`
            )}`
        );
        setTheme(theme);
    };
    return (
        <div style={{ display: "inline-block" }}>
            <Switch
                activeBoxShadow={theme.colors.defaultText}
                checked={theme.name == "light"}
                onChange={handleThemeChange}
                handleDiameter={15}
                onColor={theme.colors.themeSwitchOn}
                offColor={theme.colors.themeSwitchOff}
                onHandleColor={theme.colors.defaultText}
                offHandleColor={theme.colors.defaultText}
                checkedIcon={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 15,
                            color: theme.colors.defaultText,
                            paddingRight: 2,
                        }}
                        children={<FontAwesomeIcon icon={faSun} />}
                    />
                }
                uncheckedIcon={
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: "100%",
                            fontSize: 15,
                            color: theme.colors.defaultText,
                            paddingRight: 2,
                        }}
                        children={<FontAwesomeIcon icon={faMoon} />}
                    />
                }
            />
        </div>
    );
};
