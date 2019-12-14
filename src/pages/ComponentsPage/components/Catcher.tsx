import React from "react";
import _ from "lodash";
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
import TreeContext from "../TreeContext";

import rawCatcherComponent from "../snippets/Catcher-component.txt";
import rawCatcherHOC from "../snippets/Catcher-hoc.txt";

const { TextLeft, CodeSpan, Subtitle, H3, H4 } = TextStyles;
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
                <H4>{title}</H4>
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
            <H4>With fallback (component)</H4>
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
    const { addItem } = React.useContext(TreeContext);

    const subtitleRef = React.useRef(null);
    const usageRef = React.useRef(null);
    const examplesRef = React.useRef(null);
    const propsRef = React.useRef(null);

    React.useLayoutEffect(() => {
        const groupId = "catcher";
        const removeFns = [
            addItem({
                id: groupId,
                name: "Catcher",
                ref: subtitleRef,
            }),
            addItem({
                id: `${groupId}_usage`,
                name: "Usage",
                ref: usageRef,
                childrenOf: groupId,
            }),
            addItem({
                id: `${groupId}_examples`,
                name: "Examples",
                ref: examplesRef,
                childrenOf: groupId,
            }),
            addItem({
                id: `${groupId}_props`,
                name: "Props",
                ref: propsRef,
                childrenOf: groupId,
            }),
        ];

        return () => {
            _.forEach(removeFns, (remove) => remove());
        };
    }, [addItem]);

    return (
        <>
            <Subtitle ref={subtitleRef}>Catcher</Subtitle>
            <TextLeft>
                Catcher is the only component in TRC which is a class component.
                This is because it needs to implement{" "}
                <CodeSpan>componentDidCatch</CodeSpan>. Surround any component
                with the Catcher to prevent the application from crashing if an
                error happens. You can also specify a fallback component.
            </TextLeft>
            <H3 ref={usageRef}>Usage</H3>
            <H4>Using the component</H4>
            <CodeSnippet>{rawCatcherComponent}</CodeSnippet>
            <H4>Using the HOC</H4>
            <TextLeft>
                Pass the required component as the first parameter and the props
                as an options object:
                <br />
                <CodeSpan>withCatcher(Component, options)</CodeSpan>
            </TextLeft>
            <CodeSnippet>{rawCatcherHOC}</CodeSnippet>
            <H3 ref={examplesRef}>Examples</H3>
            <Flex
                itemMaxWidth="35%"
                itemMinWidth="300px"
                justifyContent="center"
            >
                <Catcher>
                    <CatcherCard title="Default fallback (component)" />
                </Catcher>
                <Catcher Fallback={CardCatched}>
                    <CatcherCard title="Custom fallback (component)" />
                </Catcher>
                <CatcherHOCDefault title="Default fallback (HOC)" />
                <CatcherHOCCustom title="Custom fallback (HOC)" />
            </Flex>
            <H3 ref={propsRef}>Props</H3>
            <Table fields={tableFields} data={catcherProps} />
        </>
    );
};
