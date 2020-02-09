import React from "react";
import { TextStyles, useForm, Inputs, Button, Layouts } from "../../../..";

const { Subtitle } = TextStyles;
const { TextInput, NumberInput } = Inputs;
const { Flex } = Layouts;

export default () => {
    const [{ firstName, lastName, age }, getFormData] = useForm({
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
                initial: 16,
                max: 18,
                decimals: 2,
                placeholder: "Age",
                hint: "Your age",
                label: "Age",
            },
        },
    });

    const onClick = React.useCallback(() => {
        const data = getFormData();
        console.info(data);
    }, [getFormData]);

    return (
        <>
            <Subtitle>Forms</Subtitle>
            <Flex justifyContent="center" itemMinWidth="30%">
                <TextInput {...firstName} />
                <TextInput {...lastName} />
                <NumberInput {...age} />
            </Flex>
            <Button onClick={onClick} children="Get Data" state="primary" />
        </>
    );
};
