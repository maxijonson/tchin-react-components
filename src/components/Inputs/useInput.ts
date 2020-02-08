import React from "react";
import { IInputProps, IBaseField } from "../Form/types";

const NO_ERROR = "";

type IUseInputParams<T> = Pick<
    IBaseField<T> & IInputProps<T>,
    "value" | "required" | "validate"
>;

const useInput = <T>({ value, required, validate }: IUseInputParams<T>) => {
    const requiredMessage =
        typeof required === "string" ? required : "This field is required";

    const [focused, setFocused] = React.useState(false);
    const [error, setError] = React.useState(NO_ERROR);

    const runValidation = React.useCallback(() => {
        if (required && !value) {
            setError(requiredMessage);
        } else if (validate) {
            const err = validate(value);
            if (err) setError(err);
            else setError(NO_ERROR);
        } else {
            setError(NO_ERROR);
        }
    }, [required, requiredMessage, validate, value]);

    const onFocus = React.useCallback(() => {
        setFocused(true);
    }, []);

    const onBlur = React.useCallback(() => {
        setFocused(false);
        runValidation();
    }, [runValidation]);

    React.useEffect(() => {
        if (error) {
            runValidation();
        }
    });

    const returnVal = React.useMemo(
        () => ({
            onFocus,
            onBlur,
            focused,
            error,
        }),
        [onFocus, onBlur, focused, error]
    );

    return returnVal;
};

export default useInput;
