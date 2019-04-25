import * as React from "react";
import { useTranslation } from "react-i18next";
import Switch from "react-switch";
import { app } from "src/app";
import { Hooks } from "src/modules";

const { useConnect } = Hooks;

export default () => {
    const { i18n, t } = useTranslation();

    const { theme } = useConnect(({ theme }) => ({ theme }));

    const handleLangChange = (checked: boolean) => {
        app.setLanguage(checked ? "en" : "fr");
    };

    return (
        <div style={{ display: "inline-block" }}>
            <Switch
                activeBoxShadow={theme.colors.defaultText}
                ariaLabelledby={t("header.changeLang")}
                checked={i18n.language == "en"}
                onChange={handleLangChange}
                handleDiameter={15}
                offColor={
                    theme.name == "light"
                        ? theme.colors.themeSwitchOn
                        : theme.colors.themeSwitchOff
                }
                onColor={
                    theme.name == "light"
                        ? theme.colors.themeSwitchOn
                        : theme.colors.themeSwitchOff
                }
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
                        children={"EN"}
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
                        children={"FR"}
                    />
                }
            />
        </div>
    );
};
