import * as React from "react";

declare global {
    type IError = Error;
    interface IErrorReport {
        readonly error: IError;
        readonly stack: object;
    }
}
type IOnError = (errorReport: IErrorReport) => void;
type IWrappedProps = object;
type IFallback = React.ComponentType<any>;

interface ICatcherOwnProps {
    /**
     * Fallback component
     */
    Fallback?: IFallback;

    /**
     * Function called on error
     */
    onError?: IOnError;

    /**
     * Props given to the Fallback component
     */
    wrappedProps?: IWrappedProps;
}

interface ICatcherState {
    readonly errorReport: IErrorReport | null;
}

export default class Catcher extends React.Component<
    ICatcherOwnProps,
    ICatcherState
> {
    constructor(props: ICatcherOwnProps) {
        super(props);
        this.state = { errorReport: null };
    }

    public componentDidCatch(error: IError, info: object) {
        const { onError } = this.props;
        const errorReport: IErrorReport = {
            error,
            stack: info,
        };
        if (onError) {
            onError(errorReport);
        }
        this.setState({
            errorReport,
        });
    }

    public retry() {
        this.setState({ errorReport: null });
    }

    public render() {
        const { errorReport } = this.state;
        const { children, Fallback, wrappedProps } = this.props;

        if (errorReport) {
            return Fallback ? (
                <Fallback
                    errorReport={errorReport}
                    retry={this.retry}
                    {...wrappedProps}
                />
            ) : (
                <p {...wrappedProps}>
                    Something went wrong rendering this part of the page... Have
                    you tried turning it off and on again?
                </p>
            );
        }
        return children;
    }
}

/**
 * Catcher HOC
 * @param WrappedComponent - The component that is prone to error
 * @param [options] - Optional options for the Catcher
 * @param [options.Fallback] - Fallback component to use on error
 * @param [options.onError] - Function to execute on error
 * @param [options.wrappedProps] - Props that should be given to the Fallback component (defaults to the props given to the WrappedComponent)
 */
export const withCatcher = (
    WrappedComponent: React.ComponentType<any>,
    options?: {
        Fallback?: IFallback;
        onError?: IOnError;
        wrappedProps?: IWrappedProps;
    },
) => (props: any) => (
    <Catcher
        Fallback={options && options.Fallback}
        onError={options && options.onError}
        wrappedProps={(options && options.wrappedProps) || props}
    >
        <WrappedComponent {...props} />
    </Catcher>
);
