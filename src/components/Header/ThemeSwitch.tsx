import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as React from "react";
import Switch from "react-switch";
import { setTheme as setThemeAction } from "src/actions";
import { Hooks } from "src/modules";
import { ITheme, themes } from "src/modules/CSS";

const { useConnect } = Hooks;

const { light, dark } = themes;

export default () => {
    const { theme, setTheme } = useConnect(
        ({ theme }) => ({ theme }),
        (dispatch) => ({
            setTheme: (theme: ITheme) => dispatch(setThemeAction(theme)),
        }),
    );

    const handleThemeChange = (checked: boolean) => {
        setTheme(checked ? light : dark);
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
                        children={<FontAwesomeIcon icon="sun" />}
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
                        children={<FontAwesomeIcon icon="moon" />}
                    />
                }
            />
        </div>
    );
};
