import React from "react";
import tinycolor from "tinycolor2";
import styled from "styled-components";
import {
    TextStyles,
    CodeSnippet,
    Catcher,
    Layouts,
    Table,
    Button,
    Card,
    withCatcher,
} from "../../../components";
import tableFields from "../tableFields";

import rawCatcherComponent from "../snippets/Catcher-component.txt";
import rawCatcherHOC from "../snippets/Catcher-hoc.txt";

const { TextLeft, CodeSpan } = TextStyles;
const { Flex, CenterH } = Layouts;

const catcherProps = [
    {
        prop: "wrappedProps",
        definition: (
            <>
                props passed to the <CodeSpan>Fallback</CodeSpan>.
            </>
        ),
        type: "object",
        default: "original component props",
        required: false,
    },
    {
        prop: "Fallback (fallback for HOC)",
        definition: (
            <>
                The fallback component to use. The Fallback gets passed{" "}
                <CodeSpan>errorReport</CodeSpan> object with the{" "}
                <CodeSpan>error</CodeSpan> and <CodeSpan>info</CodeSpan> from{" "}
                <CodeSpan>componentDidCatch</CodeSpan>. It also gets passed a{" "}
                <CodeSpan>retry</CodeSpan> function which, when called, removes
                the error &quot;state&quot; from the Catcher. This function
                should only be called when an attempt to fix the issue was made.
                Finally, the Fallback will receive the specified{" "}
                <CodeSpan>wrappedProps</CodeSpan>.
            </>
        ),
        type: "React.ComponentType<any>",
        default: "a <p /> with standard error message",
        required: false,
    },
    {
        prop: "onError",
        definition: (
            <>
                Function called on error. Gets passed the{" "}
                <CodeSpan>errorReport</CodeSpan> (see Fallback).
            </>
        ),
        type: "(IErrorReport) => void",
        default: "",
        required: false,
    },
];

const ErrorSimulator = ({
    children,
}: {
    children: (crash: () => void) => JSX.Element;
}) => {
    const [crashed, setCrashed] = React.useState(false);
    const crash = () => {
        setCrashed(true);
    };

    if (crashed) throw new Error("This is a simulated error");

    return children(crash);
};

const CatcherCard = ({ title }: { title: string }) => (
    <ErrorSimulator>
        {(crash) => (
            <Card>
                <h5>{title}</h5>
                This is an example of a component that could crash. Press the
                button below to simulate an error and see the Catcher in action
                <CenterH>
                    <Button variant="text" state="danger" onClick={crash}>
                        Crash the component
                    </Button>
                </CenterH>
            </Card>
        )}
    </ErrorSimulator>
);

const CardCatched = styled(
    ({ className, retry }: { className: string; retry: () => void }) => (
        <Card className={className}>
            <h5>With fallback (component)</h5>
            Ouch! We&apos;ve hit a wall! This time, we used a fallback component
            to render an appropriate replacement component. Click on the button
            below to fix this!
            <CenterH>
                <Button variant="text" state="primary" onClick={retry}>
                    Fix
                </Button>
            </CenterH>
        </Card>
    )
)`
    background: ${({ theme }) =>
        `#${tinycolor(theme.colors.danger)
            .lighten(25)
            .toHex()}`};
`;

export default () => {
    const CatcherHOCDefault = withCatcher(CatcherCard);
    const CatcherHOCCustom = withCatcher(CatcherCard, {
        Fallback: CardCatched,
    });
    return (
        <>
            <h1>Catcher</h1>
            <TextLeft>
                Catcher is the only component in TRC which is a class component.
                This is because it needs to implement{" "}
                <CodeSpan>componentDidCatch</CodeSpan>. Surround any component
                with the Catcher to prevent the application from crashing if an
                error happens. You can also specify a fallback component.
            </TextLeft>
            <h3>Usage</h3>
            <h5>Using the component</h5>
            <CodeSnippet>{rawCatcherComponent}</CodeSnippet>
            <h5>Using the HOC</h5>
            <TextLeft>
                Pass the required component as the first parameter and the props
                as an options object:
                <br />
                <CodeSpan>withCatcher(Component, options)</CodeSpan>
            </TextLeft>
            <CodeSnippet>{rawCatcherHOC}</CodeSnippet>
            <h3>Examples</h3>
            <Flex itemMaxWidth="35%" justifyContent="center">
                <Catcher>
                    <CatcherCard title="Default fallback (component)" />
                </Catcher>
                <Catcher Fallback={CardCatched}>
                    <CatcherCard title="Custom fallback (component)" />
                </Catcher>
                <CatcherHOCDefault title="Default fallback (HOC)" />
                <CatcherHOCCustom title="Custom fallback (HOC)" />
            </Flex>
            <h3>Props</h3>
            <Table fields={tableFields} data={catcherProps} />
        </>
    );
};
