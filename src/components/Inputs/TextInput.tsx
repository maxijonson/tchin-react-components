import React from "react";
import _ from "lodash";
import { ITextField, IInputProps } from "../Form/types";
import useInput from "./useInput";
import InputContainer from "./InputContainer";

interface ITextInputProps extends ITextField, IInputProps<string> {}

export default React.memo((props: ITextInputProps) => {
    const input = useInput(props);

    const onChange = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            props.onChange(e.target.value);
        },
        [props]
    );

    return (
        <InputContainer
            {...input}
            {...props}
            labelActive={input.focused || !_.isEmpty(props.value)}
        >
            <input
                {...input}
                {...props}
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
