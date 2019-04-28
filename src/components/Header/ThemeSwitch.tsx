import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import * as React from "react";
import Switch from "react-switch";
import { Hooks } from "../../../src/modules";
import { setTheme as setThemeAction } from "../../../src/actions";
import { defaultThemes, ITheme } from "../../../src/modules/CSS/themes";

const { useConnect } = Hooks;

export default () => {
    const { theme, setTheme } = useConnect(
        ({ theme }) => ({ theme }),
        (dispatch) => ({
            setTheme: (theme: ITheme) => dispatch(setThemeAction(theme)),
        })
    );

    const handleThemeChange = (checked: boolean) => {
        setTheme(checked ? defaultThemes.light : defaultThemes.dark);
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
