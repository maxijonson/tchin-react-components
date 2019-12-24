import React from "react";

interface IFallbackProps {
    retry: () => void;
}

interface ICatcherProps<T extends {}> {
    onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
    Fallback?: React.ComponentType<T & IFallbackProps>;
    fallbackProps?: T;
}

interface ICatcherState {
    hasError: boolean;
}

export default class Catcher<T extends {}> extends React.Component<
    ICatcherProps<T>,
    ICatcherState
> {
    constructor(props: ICatcherProps<T>) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch = (error: Error, errorInfo: React.ErrorInfo) => {
        const { onError } = this.props;
        if (onError) {
            onError(error, errorInfo);
        }
        this.setState({
            hasError: true,
        });
    };

    render = () => {
        const { hasError } = this.state;
        const { children, Fallback, fallbackProps } = this.props;

        const retry = () => {
            this.setState({ hasError: false });
        };

        if (hasError) {
            if (Fallback) {
                // HACK: doesn't pass typings without it
                return fallbackProps ? (
                    <Fallback {...fallbackProps} retry={retry} />
                ) : (
                    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
                    // @ts-ignore
                    <Fallback retry={retry} />
                );
            }

            return (
                <p>
                    Something went wrong rendering this part of the page... Have
                    you tried{" "}
                    <u
                        style={{ cursor: "pointer", fontWeight: "bolder" }}
                        onClick={retry}
                    >
                        turning it off and on again
                    </u>
                    ?
                </p>
            );
        }
        return children;
    };
}

export const withCatcher = <T extends {}>(
    Component: React.ElementType,
    catcherProps?: ICatcherProps<T>
) => (props: ComponentProps<typeof Component>) => (
    <Catcher {...catcherProps}>
        <Component {...props} />
    </Catcher>
);
