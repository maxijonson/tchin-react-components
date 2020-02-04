import React from "react";
import styled from "styled-components";

interface ITextInputProps {
    value: string;
    onChange: (value: string) => void;
    type: "text";
}

const TextInput = styled.div``;

const Input = styled.input``;

export default React.memo((props: ITextInputProps) => {
    const { value, onChange } = props;

    const onChangeInput = React.useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value);
        },
        [onChange]
    );

    return (
        <TextInput>
            <Input value={value} onChange={onChangeInput} />
        </TextInput>
    );
});
