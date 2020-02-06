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
    const { firstName } = useForm({
        fields: {
            firstName: {
                type: "text",
                initial: "Tristan",
                placeholder: "John",
                hint: "Your first name",
            },
            lastName: {
                type: "text",
                initial: "Chin",
                label: "Last name",
                placeholder: "John",
                hint: "Your first name",
            },
        },
    });

    return (
        <>
            <Subtitle>Forms</Subtitle>
            <TextInput {...firstName} />
        </>
    );
};
