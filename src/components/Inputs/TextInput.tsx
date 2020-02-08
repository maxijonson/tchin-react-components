import React from "react";
import styled from "styled-components";
import { ITextField, IInputProps } from "../Form/types";
import useInput from "./useInput";
import InputContainer from "./InputContainer";

interface ITextInputProps extends ITextField, IInputProps<string> {}

const Input = styled.input`
    border: none;
    background: transparent;
    outline: none;
    color: ${({ theme }) => theme.colors.defaultText};
    height: 100%;
`;

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
            name={props.name}
            labelActive={input.focused || !!props.value}
        >
            <Input
                {...input}
                {...props}
                id={name}
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
