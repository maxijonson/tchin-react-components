/** Base attributes most input should be able to have */
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
    autoComplete?: string;
    autoFocus?: boolean;
}

type INumber = number;
interface INumberField extends IBaseField<INumber> {
    type: "number";
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Amount of allowed decimals */
    decimals?: number;
    /** Steps when using the arrows */
    steps?: number;
}

type ISelect = string;
interface ISelectField extends IBaseField<ISelect> {
    type: "select";
    /** Select options */
    options: { label: string; value: ISelect; disabled?: boolean }[];
}

type IField = ITextField | INumberField | ISelectField;

/**
 * useForm hook options parameter
 */
interface IUseFormProps {
    fields: { [name: string]: IField };
}

/**
 * If the field described by "name" is of the type of "Field", then the data value type is of "DataType"
 */
type DataFor<T extends IUseFormProps, name, Field, DataType> = If<
    T["fields"][name],
    Field,
    DataType,
    never
>;

/**
 * Conditional type for the value of a field. Depending on what type the field is, the value of the field will be different.
 */
type IFormDataValue<T extends IUseFormProps, name extends keyof T["fields"]> =
    | DataFor<T, name, ITextField, IText>
    | DataFor<T, name, INumberField, INumber>
    | DataFor<T, name, ISelectField, ISelect>;

/**
 * Form data that is in useForm's state and will be given onSubmit. Each key is a field in T["fields"] and the value is infered from type of the field described by "name"
 */
type IFormData<T extends IUseFormProps> = {
    [name in keyof T["fields"]]: IFormDataValue<T, name>;
};

/**
 * Base input props that should be used by most inputs
 */
interface IInputProps<T, name = string> {
    value: T;
    onChange: (value: T) => void;
    name?: name;
}

/**
 * Gets the field properties for a given field. Pretty complex, here's the breakdown:
 * - If the field described by "name" extends "Field"
 *      - Return the following:
 *          - Required<InputProps...> : All props from IInputProps (see above). Also make them Required, since it will be given a value for sure in useForm
 *          - For each "key" in the field described by "name", get the actual existential value of the key (in other words, check if a possible undefined value is actually undefined or defined)
 *              - Check if the field property described by "key" extends the NonNullable equivalent its field definition (ITextField, INumberField, etc.) key
 *                  - If it is, then it means the value was defined. Note that a defined value that could still be undefined, will keep the undefined type as well as the true type!
 *                  - If it is not, then it means the value was not defined, hence, it is necessarily undefined.
 * - otherwise use never (which means "the field described by 'name' is not assignable to 'Field'")
 */
type FieldPropertiesFor<T extends IUseFormProps, Field, name> = If<
    T["fields"][name],
    Field,
    Required<IInputProps<IFormDataValue<T, name>, name>> &
        {
            [key in keyof Required<Field>]: If<
                T["fields"][name][key],
                NonNullable<Field[key]>,
                T["fields"][name][key],
                undefined
            >;
        },
    never
>;

/**
 * Return type of useForm. Object where each property keys are equivalent to the "fields" keys and
 * each property value will differ depending on the field type.
 */
type IFieldProperties<T extends IUseFormProps> = {
    [name in keyof T["fields"]]:
        | FieldPropertiesFor<T, ITextField, name>
        | FieldPropertiesFor<T, INumberField, name>
        | FieldPropertiesFor<T, ISelectField, name>;
};
