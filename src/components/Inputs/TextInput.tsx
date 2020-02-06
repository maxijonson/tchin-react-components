import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-regular-svg-icons";
import Tooltip from "../Tooltip/Tooltip";

interface ITextInputProps {
    value: string;
    type?: "text";
    onChange: (value: string) => void;
    label?: string;
    placeholder?: string;
    hint?: string;
    required?: boolean;
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

const TextInput = styled(motion.div)<{ focused: boolean }>`
    transition: border-bottom 0.25s;
    display: inline-flex;
    flex-direction: column;
    margin: 10px 5px;
    padding-bottom: 5px;
    background: transparent;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: ${({ theme, focused }) => {
        if (focused) {
            return theme.colors.primary;
        }
        return theme.colors.inputBorder;
    }};
`;

const Input = styled.input`
    border: none;
    background: transparent;
    outline: none;
    color: ${({ theme }) => theme.colors.defaultText};
`;

const Label = styled(motion.label)`
    pointer-events: none;
    transform-origin: left;
    color: ${({ theme }) => theme.colors.altText};
`;

export default React.memo((props: ITextInputProps) => {
    const { value, onChange, label, placeholder, hint, required } = props;

    const [focused, setFocused] = React.useState(false);

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
    }, []);

    return (
        <TextInput focused={focused}>
            <Label
                variants={labelVariants}
                animate={focused || value ? "focused" : "unfocused"}
                initial={false}
            >
                {label}
            </Label>
            <div>
                <Input
                    value={value}
                    onChange={onChangeInput}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    placeholder={focused ? placeholder : undefined}
                    required={required}
                />
                {hint && (
                    <Tooltip tip={hint}>
                        <FontAwesomeIcon
                            icon={faQuestionCircle}
                            style={{ marginLeft: "2px", cursor: "pointer" }}
                        />
                    </Tooltip>
                )}
            </div>
        </TextInput>
    );
});
