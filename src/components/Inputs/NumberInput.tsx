import React from "react";
import _ from "lodash";
import { INumberField, IInputProps } from "../Form/types";
import useInput from "./useInput";
import InputContainer from "./InputContainer";
import { Hooks } from "../../modules";

const { useForceUpdate, useUpdateEffect } = Hooks;

type INumberInputProps = INumberField & IInputProps<number>;

const getNewValue = (n: number, min?: number, max?: number) =>
    _.clamp(n, min ?? Number.MIN_SAFE_INTEGER, max ?? Number.MAX_SAFE_INTEGER);

export default React.memo((props: INumberInputProps) => {
    const input = useInput(props);
    const strValue = React.useRef(
        getNewValue(props.value, props.min, props.max).toString()
    );
    const forceUpdate = useForceUpdate();

    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            let actualValue = e.target.value;
            let num = Number(actualValue);

            // Handle deleting the whole input
            if (actualValue.length == 0) {
                strValue.current = actualValue; // ""
                const newValue = getNewValue(0, props.min, props.max);
                if (props.value == newValue) return forceUpdate();
                props.onChange(newValue);
                return;
            }

            // e.g: entering letters
            if (isNaN(num)) {
                // Handle beginning negative values
                if (actualValue == "-" && (!props.min || props.min < 0)) {
                    strValue.current = actualValue; // "-"
                    const newValue = getNewValue(0, props.min, props.max);
                    if (props.value == newValue) return forceUpdate();
                    props.onChange(newValue);
                }

                // Handle beginning float values
                if (
                    actualValue == "." &&
                    (!props.decimals || props.decimals != 0)
                ) {
                    const newValue = getNewValue(0, props.min, props.max);
                    strValue.current = `${newValue}${actualValue}`; // "."
                    if (props.value == newValue) return forceUpdate();
                    props.onChange(newValue);
                }

                return;
            }

            // Limit decimals to props.decimals
            if (
                props.decimals &&
                actualValue.indexOf(".") != -1 &&
                actualValue.split(".")[1].length > props.decimals
            ) {
                actualValue = actualValue.substring(
                    0,
                    actualValue.indexOf(".") + 1 + props.decimals
                );
                num = Number(actualValue);
            }

            strValue.current = `${_.clamp(
                num,
                Number.MIN_SAFE_INTEGER,
                Number.MAX_SAFE_INTEGER
            ).toString()}${_.last(actualValue) == "." ? "." : ""}`;

            const newValue = getNewValue(num, props.min, props.max);
            if (props.value == newValue) return forceUpdate();
            props.onChange(newValue);
        },
        [props, forceUpdate]
    );

    const onKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key == "ArrowUp" || e.key == "ArrowDown") {
                const newValue = getNewValue(
                    e.key == "ArrowUp"
                        ? props.value + (props.steps ?? 1)
                        : props.value - (props.steps ?? 1),
                    props.min,
                    props.max
                );
                strValue.current = newValue.toString();
                if (props.value == newValue) return forceUpdate();
                props.onChange(newValue);
            }
        },
        [forceUpdate, props]
    );

    const onBlur = React.useCallback(() => {
        strValue.current = props.value.toString();
        input.onBlur();
    }, [input, props.value]);

    useUpdateEffect(() => {
        // If the value changes from another source, we still want to show the new value.
        if (strValue.current != props.value.toString() && !input.focused) {
            strValue.current = props.value.toString();
            forceUpdate();
        }
    }, [props.value, strValue.current, input.focused, forceUpdate]);

    return (
        <InputContainer
            {...input}
            {...props}
            labelActive={input.focused || _.isNumber(props.value)}
        >
            <input
                {...input}
                {...props}
                id={props.name}
                type="text" // We'll handle the fancy stuff "number" does
                value={strValue.current}
                required={!!props.required}
                placeholder={
                    input.focused || !props.label
                        ? props.placeholder
                        : undefined
                }
                onBlur={onBlur}
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </InputContainer>
    );
});
