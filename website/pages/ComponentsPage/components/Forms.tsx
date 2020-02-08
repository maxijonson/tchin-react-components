import React from "react";
import { TextStyles, useForm, Inputs } from "../../../..";

const { Subtitle } = TextStyles;
const { TextInput } = Inputs;

export default () => {
    const { firstName, lastName } = useForm({
        fields: {
            firstName: {
                type: "text",
                initial: "Tristan",
                label: "First name",
                placeholder: "John",
                hint: "Your first name",
                validate: (v) => {
                    if (v.length <= 3)
                        return "field must be greater than 3 characters";
                },
                required: true,
            },
            lastName: {
                type: "text",
                initial: "Chin",
                label: "Last name",
                placeholder: "John",
                required: true,
            },
            age: {
                type: "number",
            },
        },
    });

    return (
        <>
            <Subtitle>Forms</Subtitle>
            <TextInput {...firstName} />
            <TextInput {...lastName} />
        </>
    );
};
