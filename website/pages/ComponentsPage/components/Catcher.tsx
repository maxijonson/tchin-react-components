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
    HOCs,
} from "../../../..";
import tableFields from "../tableFields";
import TreeContext from "../TreeContext";

import rawCatcherComponent from "../snippets/Catcher-component.txt";
import rawCatcherHOC from "../snippets/Catcher-hoc.txt";

const { TextLeft, CodeSpan, Subtitle, H3, H4 } = TextStyles;
const { Flex, CenterH } = Layouts;
const { withCatcher } = HOCs;

const catcherProps = [
    {
        prop: "Fallback",
        definition: (
            <>
                Fallback component to use. It gets passed the props passed in{" "}
                <CodeSpan>fallbackProps</CodeSpan> as well as{" "}
                <CodeSpan>retry</CodeSpan> function to attempt to rebuild the
                original component.
            </>
        ),
        type: "React.ComponentType<any>",
        default: "Simple error message with retry function.",
        required: false,
    },
    {
        prop: "fallbackProps",
        definition: (
            <>
                Passed to the <CodeSpan>Fallback</CodeSpan>.
            </>
        ),
        type: "object",
        default: "{}",
        required: false,
    },
    {
        prop: "onError",
        definition: "Called when an error is catched.",
        type: "(error: Error, errorInfo: React.ErrorInfo) => void",
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
        const group = "catcher";
        const removeFns = [
            addItem({
                id: group,
                data: { name: "Catcher", ref: subtitleRef },
            }),
            addItem({
                id: `${group}_usage`,
                data: { name: "Usage", ref: usageRef },
                group,
            }),
            addItem({
                id: `${group}_examples`,
                data: { name: "Examples", ref: examplesRef },
                group,
            }),
            addItem({
                id: `${group}_props`,
                data: { name: "Props", ref: propsRef },
                group,
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
