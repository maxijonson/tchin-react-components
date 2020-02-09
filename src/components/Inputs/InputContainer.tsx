import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { THEME_TRANSITION_TIME } from "../../config";
import { IBaseField } from "../Form/types";
import { Hooks } from "../../modules";

const { useConnect } = Hooks;

type IVariants = ComponentProps<typeof motion.div>["variants"];

const labelVariants: IVariants = {
    focused: {
        transform: "translate(0, 0px) scale(0.75)",
    },
    unfocused: {
        transform: "translate(0, 24px) scale(1)",
    },
};

interface IInputContainerProps {
    focused: boolean;
    hasError: boolean;
}
const InputContainer = styled(motion.div)<IInputContainerProps>`
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

    & input {
        border: none;
        background: none;
        outline: none;
        color: ${({ theme }) => theme.colors.defaultText};
        height: 100%;
        width: 100%;

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
            /* 24 hours. Delay the background of autofill. */
            transition-delay: 86400s;
            /* Preventing overloading the CPU, give the job to the GPU */
            transform: translateZ(0);
            -webkit-text-fill-color: ${({ theme }) =>
                theme.colors.defaultText} !important;
        }
    }
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

export default (
    props: Pick<IBaseField<any>, "label" | "hint"> & {
        children: React.ReactNode;
        error: string;
        focused: boolean;
        name?: string;
        labelActive: boolean;
    }
) => {
    const { label, hint, name, children, error, focused, labelActive } = props;

    const theme = useConnect(({ theme }) => theme);

    return (
        <InputContainer focused={focused} hasError={!!error}>
            <Label
                variants={labelVariants}
                animate={labelActive ? "focused" : "unfocused"}
                initial={false}
                htmlFor={name}
            >
                {label}
            </Label>
            <div style={{ position: "relative", display: "flex" }}>
                {children}
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
        </InputContainer>
    );
};
