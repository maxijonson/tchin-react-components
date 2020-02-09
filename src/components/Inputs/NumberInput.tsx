import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { INumberField, IInputProps } from "../Form/types";
import useInput from "./useInput";
import InputContainer from "./InputContainer";
import { Hooks } from "../../modules";

const { useForceUpdate, useUpdateEffect } = Hooks;

type INumberInputProps = INumberField & IInputProps<number>;

const Input = styled.input`
    border: none;
    background: transparent;
    outline: none;
    color: ${({ theme }) => theme.colors.defaultText};
    height: 100%;
`;

const getNewValue = (n: number, min?: number, max?: number) =>
    _.clamp(n, min ?? Number.MIN_SAFE_INTEGER, max ?? Number.MAX_SAFE_INTEGER);

export default React.memo((props: INumberInputProps) => {
    const input = useInput(props);
    const prevValue = React.useRef(
        getNewValue(props.value, props.min, props.max).toString()
    );
    const forceUpdate = useForceUpdate();

    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const actualValue = e.target.value;
            const num = Number(actualValue);

            // Handle deleting the whole input
            if (actualValue.length == 0) {
                prevValue.current = actualValue; // ""
                const newValue = getNewValue(0, props.min, props.max);
                if (props.value == newValue) return forceUpdate();
                props.onChange(newValue);
                return;
            }

            // e.g: entering letters
            if (isNaN(num)) {
                // Handle beginning negative values
                if (actualValue == "-" && (!props.min || props.min < 0)) {
                    prevValue.current = actualValue; // "-"
                    const newValue = getNewValue(0, props.min, props.max);
                    if (props.value == newValue) return forceUpdate();
                    props.onChange(newValue);
                }
                return;
            }

            const newValue = getNewValue(num, props.min, props.max);

            props.onChange(newValue);
            prevValue.current = newValue.toString();
            if (props.value == newValue) return forceUpdate();
        },
        [props, forceUpdate]
    );

    const onBlur = React.useCallback(() => {
        prevValue.current = props.value.toString();
        input.onBlur();
    }, [input, props.value]);

    useUpdateEffect(() => {
        // If the value changes from another source, we still want to show the new value.
        if (prevValue.current != props.value.toString() && !input.focused) {
            prevValue.current = props.value.toString();
            forceUpdate();
        }
    }, [props.value, prevValue.current, input.focused, forceUpdate]);

    return (
        <InputContainer
            {...input}
            {...props}
            labelActive={input.focused || _.isNumber(props.value)}
        >
            <Input
                {...input}
                {...props}
                onBlur={onBlur}
                value={prevValue.current}
                type="text" // We'll handle the fancy stuff "number" does
                id={props.name}
                onChange={onChange}
                placeholder={
                    input.focused || !props.label
                        ? props.placeholder
                        : undefined
                }
                required={!!props.required}
            />
        </InputContainer>
    );
});
