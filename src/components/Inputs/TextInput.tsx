import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Hooks } from "../../modules";
import { THEME_TRANSITION_TIME } from "../../config";
import { ITextField } from "../Form/types";

const { useConnect } = Hooks;

interface ITextInputProps extends ITextField {
    value: string;
    onChange: (value: string) => void;
    name?: string;
}

type IVariants = ComponentProps<typeof motion.div>["variants"];

const labelVariants: IVariants = {
    focused: {
        transform: "translate(0, 0px) scale(0.75)",
    },
    unfocused: {
        transform: "translate(0, 24px) scale(1)",
    },
};

const TextInput = styled(motion.div)<{ focused: boolean; hasError: boolean }>`
    transition: all ${THEME_TRANSITION_TIME}s;
    display: inline-flex;
    flex-direction: column;
    margin: 10px 5px;
    background: transparent;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme, focused, hasError }) => {
        if (hasError) return theme.colors.danger;
        if (focused) return theme.colors.primary;
        return theme.colors.inputBorder;
    }};
`;

const Input = styled.input`
    border: none;
    background: transparent;
    outline: none;
    color: ${({ theme }) => theme.colors.defaultText};
    height: 100%;
`;

const Label = styled(motion.label)`
    pointer-events: none;
    transform-origin: left;
    color: ${({ theme }) => theme.colors.altText};
`;

const Icon = ({ children }: { children: React.ReactNode }) => (
    <motion.i
        style={{ width: "20px", textAlign: "center", right: 0 }}
        children={children}
        initial={{ opacity: 0, y: "-75%", display: "none" }}
        animate={{ opacity: 1, y: "0%", display: "block" }}
        exit={{ opacity: 0, scale: 0, position: "absolute" }}
    />
);

const NO_ERROR = "";

export default React.memo((props: ITextInputProps) => {
    const {
        value,
        onChange,
        label,
        placeholder,
        hint,
        required,
        validate,
        name,
        type,
    } = props;

    const requiredMessage =
        typeof required === "string" ? required : "This field is required";

    const theme = useConnect(({ theme }) => theme);

    const [focused, setFocused] = React.useState(false);
    const [error, setError] = React.useState(NO_ERROR);

    const runValidation = React.useCallback(() => {
        if (required && !value) {
            setError(requiredMessage);
        } else if (validate) {
            const err = validate(value);
            if (err) setError(err);
            else setError(NO_ERROR);
        } else {
            setError(NO_ERROR);
        }
    }, [required, requiredMessage, validate, value]);

    const onChangeInput = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        },
        [onChange]
    );

    const onFocus = React.useCallback(() => {
        setFocused(true);
    }, []);
    const onBlur = React.useCallback(() => {
        setFocused(false);
        runValidation();
    }, [runValidation]);

    React.useEffect(() => {
        if (error) {
            runValidation();
        }
    });

    return (
        <TextInput focused={focused} hasError={!!error}>
            <Label
                variants={labelVariants}
                animate={focused || value ? "focused" : "unfocused"}
                initial={false}
                htmlFor={name}
            >
                {label}
            </Label>
            <div style={{ position: "relative", display: "flex" }}>
                <Input
                    name={name}
                    id={name}
                    type={type}
                    value={value}
                    onChange={onChangeInput}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={focused || !label ? placeholder : undefined}
                    required={!!required}
                />
                <AnimatePresence initial={false}>
                    {error && (
                        <Icon>
                            <FontAwesomeIcon
                                icon={faExclamationCircle}
                                style={{ color: theme.colors.danger }}
                                title={error}
                            />
                        </Icon>
                    )}
                </AnimatePresence>
                <AnimatePresence initial={false}>
                    {hint && !error && (
                        <Icon>
                            <FontAwesomeIcon
                                icon={faQuestionCircle}
                                style={{ marginLeft: "2px" }}
                                title={
                                    hint
                                } /* TODO: Use Tooltip instead of this */
                            />
                        </Icon>
                    )}
                </AnimatePresence>
            </div>
        </TextInput>
    );
});
