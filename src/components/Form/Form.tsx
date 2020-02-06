import React from "react";
import _ from "lodash";
import { produce } from "immer";

interface IBaseField<T> {
    placeholder?: string;
    label?: string;
    hint?: string;
    required?: boolean;
    initial?: T;
    validation?: ((value: T) => string) | ((value: T) => void);
}

interface ITextField extends IBaseField<string> {
    type: "text";
}

type IField = ITextField;

interface IUseFormProps {
    fields: { [name: string]: IField };
}

/**
 * Conditional type for the value of a field. Depending on what type the field is, the value of the field will be different.
 * @case ITextfield - string
 */
type IFormDataValue<
    T extends IUseFormProps
> = T["fields"][keyof T["fields"]] extends ITextField ? string : never;

/**
 * Form data that is in useForm's state and will be given onSubmit. Each key is a "field" key and the value is infered from the type of the field. (see IFormDataValue)
 */
type IFormData<T extends IUseFormProps> = {
    [name in keyof T["fields"]]: IFormDataValue<T>;
};

/**
 * Return type of useForm. It is an object where each property keys are equivalent to the "fields" keys.
 * The object definition will differ depending on the field type and defined properties when used.
 */
type IUseFormReturnType<T extends IUseFormProps> = {
    [key in keyof T["fields"]]: {
        value: IFormDataValue<T>;
        type: T["fields"][key]["type"];
        onChange: (value: IFormDataValue<T>) => void;
        label: ExistsOr<T["fields"][key]["label"], undefined, string>;
        hint: ExistsOr<T["fields"][key]["hint"], undefined, string>;
        required: ExistsOr<T["fields"][key]["required"], undefined, boolean>;
        placeholder: ExistsOr<
            T["fields"][key]["placeholder"],
            undefined,
            string
        >;
    };
};

export const useForm = <T extends IUseFormProps>(options: T) => {
    const [formData, setFormData] = React.useState(
        _.reduce(
            options.fields,
            (data, field, name: keyof T["fields"]) => {
                switch (field.type) {
                    case "text":
                        data[name] = (field.initial ?? "") as IFormDataValue<T>;
                        break;
                    default:
                        break;
                }
                return data;
            },
            {} as IFormData<T>
        )
    );

    const fieldProps = React.useRef<IUseFormReturnType<T>>(
        _.reduce(
            options.fields,
            (acc, field, name: keyof T["fields"]) => {
                acc[name] = {
                    value: formData[name],
                    type: field.type,
                    onChange: (value) => {
                        fieldProps.current[name].value = value;

                        // FIXME: produce is not typed
                        setFormData(
                            produce((data) => {
                                data[name] = value;
                            })
                        );
                    },
                    label: field.label,
                    placeholder: field.placeholder,
                    hint: field.hint,
                    required: field.required,
                } as IUseFormReturnType<T>[0];
                return acc;
            },
            {} as IUseFormReturnType<T>
        )
    );

    return fieldProps.current;
};
