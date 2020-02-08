import React from "react";
import _ from "lodash";
import { produce } from "immer";
import {
    IUseFormProps,
    IFormData,
    IFormDataValue,
    IUseFormReturnType,
    INumberField,
    ITextField,
    IBaseField,
    IText,
    INumber,
} from "./types";

export const useForm = <T extends IUseFormProps>(options: T) => {
    const [formData, setFormData] = React.useState(
        _.reduce(
            options.fields,
            (data, field, name: keyof T["fields"]) => {
                data[name] = (() => {
                    switch (field.type) {
                        case "text":
                            return field.initial ?? "";
                        case "number":
                            return field.initial ?? 0;
                        default:
                            return undefined;
                    }
                })() as IFormDataValue<T, typeof name>;

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
                    name,
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
                    validate: field.validate,
                    ...(() => {
                        switch (field.type) {
                            case "text":
                                return { type: "text" } as Omit<
                                    Required<ITextField>,
                                    keyof IBaseField<IText>
                                >;
                            case "number":
                                return {
                                    type: "number",
                                    decimals: field.decimals ?? 0,
                                    min: field.min ?? -Infinity,
                                    max: field.max ?? Infinity,
                                } as Omit<
                                    Required<INumberField>,
                                    keyof IBaseField<INumber>
                                >;
                            default:
                                return {};
                        }
                    })(),
                } as IUseFormReturnType<T>[typeof name];
                return acc;
            },
            {} as IUseFormReturnType<T>
        )
    );

    return fieldProps.current;
};
