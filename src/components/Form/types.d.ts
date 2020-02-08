export interface IBaseField<T> {
    /** Initial value */
    initial?: T;
    /** Validation function. Takes in the value and returns an error string, if any. */
    validate?: ((value: T) => string) | ((value: T) => void);
    /** Input placeholder */
    placeholder?: string;
    /** Input label */
    label?: string;
    /** Hint on what the input is for */
    hint?: string;
    /** If the input is required. Set as string for a custom message. */
    required?: boolean | string;
}

type IText = string;
interface ITextField extends IBaseField<IText> {
    type: "text";
}

type INumber = number;
interface INumberField extends IBaseField<INumber> {
    type: "number";
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Allowed decimals. Defaults to 0 */
    decimals?: number;
}

type IField = ITextField | INumberField;

interface IUseFormProps {
    fields: { [name: string]: IField };
}

/**
 * Conditional type for the value of a field. Depending on what type the field is, the value of the field will be different.
 * @case ITextField - string
 * @case INumberField - number
 */
type IFormDataValue<T extends IUseFormProps, name extends keyof T["fields"]> =
    | If<T["fields"][name], ITextField, string, never>
    | If<T["fields"][name], INumberField, number, never>;
// type IFormDataValue<
//     T extends IUseFormProps,
//     name extends keyof T["fields"]
// > = T["fields"][name] extends ITextField
//     ? string
//     : never | T["fields"][name] extends INumberField
//     ? number
//     : never;

/**
 * Form data that is in useForm's state and will be given onSubmit. Each key is a "field" key and the value is infered from the type of the field. (see IFormDataValue)
 */
type IFormData<T extends IUseFormProps> = {
    [name in keyof T["fields"]]: IFormDataValue<T, name>;
};

/**
 * Used to know wether a nullable field has a value or not
 */
type Fallback<T, N> = If<T, NonNullable<N>, T, undefined>;

/**
 * Return type of useForm. It is an object where each property keys are equivalent to the "fields" keys.
 * The object definition will differ depending on the field type and defined properties when used.
 */
type IUseFormReturnType<T extends IUseFormProps> = {
    [name in keyof T["fields"]]: IUseFormReturnTypeBase<T, name> &
        (
            | If<
                  T["fields"][name],
                  ITextField,
                  IUseFormReturnTypeText<T, name>,
                  never
              >
            | If<
                  T["fields"][name],
                  INumberField,
                  IUseFormReturnTypeNumber<T, name>,
                  never
              >
        );
};
type IUseFormReturnTypeBase<
    T extends IUseFormProps,
    name extends keyof T["fields"]
> = {
    value: IFormDataValue<T, name>;
    onChange: (value: IFormDataValue<T, name>) => void;
    name: name;

    label: Fallback<
        T["fields"][name]["label"],
        IBaseField<IFormDataValue<T, name>>["label"]
    >;
    hint: Fallback<
        T["fields"][name]["hint"],
        IBaseField<IFormDataValue<T, name>>["hint"]
    >;
    required: Fallback<
        T["fields"][name]["required"],
        IBaseField<IFormDataValue<T, name>>["required"]
    >;
    placeholder: Fallback<
        T["fields"][name]["placeholder"],
        IBaseField<IFormDataValue<T, name>>["placeholder"]
    >;
    validate: Fallback<
        T["fields"][name]["validate"],
        IBaseField<IFormDataValue<T, name>>["validate"]
    >;
};

// "never" should never occur -> no pun intended
type IUseFormReturnTypeNumber<
    T extends IUseFormProps,
    name extends keyof T["fields"]
> = {
    type: T["fields"][name]["type"];
    min: T["fields"][name] extends INumberField
        ? Fallback<T["fields"][name]["min"], INumberField["min"]>
        : never;
    max: T["fields"][name] extends INumberField
        ? Fallback<T["fields"][name]["max"], INumberField["max"]>
        : never;
    decimals: T["fields"][name] extends INumberField
        ? Fallback<T["fields"][name]["decimals"], INumberField["decimals"]>
        : never;
};
type IUseFormReturnTypeText<
    T extends IUseFormProps,
    name extends keyof T["fields"]
> = {
    type: T["fields"][name]["type"];
};
