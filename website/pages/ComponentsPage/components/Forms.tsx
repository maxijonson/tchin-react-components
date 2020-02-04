import React from "react";
import { TextStyles, useForm, Inputs } from "../../../..";

const { Subtitle } = TextStyles;
const { TextInput } = Inputs;

// const fields = {
//     firstName: {
//         type: "text", // text, email
//         default: "John",
//         placeholder: "First Name",
//         label: "First Name",
//         validation: (value: any, errors: any[]) => {
//             if (value.length == 0)
//                 errors.push({
//                     message: "First name should be longer than 0 characters",
//                 });
//         },
//         hint: "Your first name",
//         required: true,
//     },
//     email: {
//         type: "email",
//         default: "John@example.com",
//         placeholder: "Email",
//         label: "Email",
//         // default email validation
//         required: true,
//     },
//     username: {
//         type: "text",
//         label: "Username",
//         validation: { minLength: 4, maxLength: 10 },
//         hint: "A cute username",
//         required: true,
//     },
//     age: {
//         type: "number",
//         label: "Age",
//         validation: { min: 18 },
//         unit: "years old",
//         hint: "How old are you?",
//         required: true,
//     },
//     // gender: {
//     //     type: "select",
//     //     options: [
//     //         { label: "Male", value: "m" },
//     //         { label: "Female", value: "f" },
//     //         { label: "Other", value: "o" },
//     //     ],
//     //     required: false,
//     // },
// };

export default () => {
    const { firstName, lastName } = useForm({
        fields: {
            firstName: {
                type: "text",
                hint: "Your first name",
                initial: "John",
                label: "First Name",
                placeholder: "First Name",
                required: true,
                validation: (val) => {
                    if (val.length == 0)
                        return "First name must be at least 1 character";
                    return undefined;
                },
            },
            lastName: {
                type: "text",
                hint: "Your last name",
                initial: "Smith",
                label: "Last Name",
                placeholder: "Last Name",
                required: true,
                validation: (val) => {
                    if (val.length == 0)
                        return "Last name must be at least 1 character";
                    return undefined;
                },
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
