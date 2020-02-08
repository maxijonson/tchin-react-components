import React from "react";
import _ from "lodash";
import { produce } from "immer";
import {
    IUseFormProps,
    IFormData,
    IFormDataValue,
    IUseFormReturnType,
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
                    ...field,
                    value: formData[name],
                    name,
                    onChange: (value) => {
                        fieldProps.current[name].value = value;

                        setFormData(
                            produce((data) => {
                                data[name] = value;
                            })
                        );
                    },
                } as IUseFormReturnType<T>[typeof name]; // HACK: This can be dangerous if we add properties in types, but forget to actually add them here!
                return acc;
            },
            {} as IUseFormReturnType<T>
        )
    );

    return fieldProps.current;
};
