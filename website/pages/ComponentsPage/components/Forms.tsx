import React from "react";
import _ from "lodash";
import {
    TextStyles,
    useForm,
    Inputs,
    Button,
    Layouts,
    useToast,
} from "../../../..";

const { Subtitle, P, CodeSpan } = TextStyles;
const { TextInput, NumberInput } = Inputs;
const { Flex } = Layouts;

export default () => {
    const { addToast } = useToast();
    const [fields, getFormData] = useForm({
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
    const { firstName, lastName, age } = fields;

    const onClick = React.useCallback(() => {
        const data = getFormData();
        addToast({
            message: (
                <div>
                    {_.map(data, (v, k: keyof typeof fields) => (
                        <span style={{ display: "block" }} key={k}>
                            ({typeof v}) {fields[k].label ?? k}: {v}
                        </span>
                    ))}
                </div>
            ),
        });
    }, [getFormData, addToast, fields]);

    return (
        <>
            <Subtitle>Forms</Subtitle>
            <P>
                Inspired by Formik, the following are form components available
                in the kit. The components themselves are pretty simple: they
                accept a value and an onChange handler among other optional
                props. The hook (<CodeSpan>useForm</CodeSpan>) that is used to
                generate those props makes it easy to define your fields and
                manage the state of your form.
            </P>
            <Flex justifyContent="center" itemMinWidth="30%">
                <TextInput {...firstName} />
                <TextInput {...lastName} />
                <NumberInput {...age} />
            </Flex>
            <Button onClick={onClick} children="Get Data" state="primary" />
        </>
    );
};
