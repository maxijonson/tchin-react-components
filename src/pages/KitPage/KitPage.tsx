import React from "react";
import styled from "styled-components";
import tinycolor from "tinycolor2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {
    Layouts,
    TextStyles,
    CodeSnippet,
    Table,
    ITableField,
    Button,
    Card,
    Catcher,
    withCatcher,
} from "../../components";
import { Hooks } from "../../modules";

// SNIPPETS
import rawBackgroundComponent from "./snippets/Background-component.txt";
import rawBackgroundHook from "./snippets/Background-hook.txt";
import rawCatcherComponent from "./snippets/Catcher-component.txt";
import rawCatcherHOC from "./snippets/Catcher-hoc.txt";

const { CodeSpan } = TextStyles;
const { Viewport, Center, PaddingH, CenterH, Flex } = Layouts;
const { useBackground } = Hooks;

// PROPS
const backgroundProps = [
    {
        prop: "background",
        definition: "url path to the image resource",
        type: "string",
        default: "",
        required: true,
    },
    {
        prop: "parallax",
        definition: "parallax effect on image",
        type: "boolean",
        default: "true",
        required: false,
    },
    {
        prop: "blurAmount",
        definition: "blur amount to add on image (px)",
        type: "number",
        default: "3",
        required: false,
    },
];
const buttonProps = [
    {
        prop: "state",
        definition: "The state of the button to change the color",
        type: "IContextState",
        default: "",
        required: false,
    },
    {
        prop: "variant",
        definition: "Change the button style variant",
        type: "text | outlined",
        default: "",
        required: false,
    },
    {
        prop: "disabled",
        definition: "Disables the button",
        type: "boolean",
        default: "false",
        required: false,
    },
];
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

const propsTableFields: ITableField<{
    prop: React.ReactNode;
    definition: React.ReactNode;
    type: React.ReactNode;
    default: React.ReactNode;
    required: boolean;
}>[] = [
    {
        name: "Prop",
        render: "prop",
    },
    {
        name: "Defintion",
        render: "definition",
    },
    {
        name: "Type",
        render: "type",
    },
    {
        name: "Default",
        render: "default",
    },
    {
        name: "Required",
        render: ({ required }) =>
            required && (
                <CenterH>
                    <FontAwesomeIcon icon={faCheck} />
                </CenterH>
            ),
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
    const BGViewport = useBackground(Viewport, "assets/images/notfound-bg.jpg");
    const CatcherHOCDefault = withCatcher(CatcherCard);
    const CatcherHOCCustom = withCatcher(CatcherCard, {
        Fallback: CardCatched,
    });
    return (
        <>
            <BGViewport>
                <Center>Kit</Center>
            </BGViewport>
            <PaddingH>
                <p>
                    These are the components available in TRC. Some have been
                    omitted as they do not follow much of the &quot;Thinking in
                    React&quot; philosophy, such as{" "}
                    <CodeSpan>&lt;AdvancedCard /&gt;</CodeSpan>. This kit has
                    been inspired by other libraries such as Bootstrap and
                    Material UI, but the goal was mainly to have my own set of
                    components that I created so I knew exactly how they worked.
                    The following is a somewhat detailed documentation on how to
                    use them. Note that they were strictly designed to fit my
                    (Tristan Chin) needs in web development. You are welcome to
                    use them in your own projects, but be aware{" "}
                    <b>they may drastically change without any warning</b>.
                </p>
                <hr />
                <h1 id="bg">Background</h1>
                <p>Add background to a div.</p>
                <h3>Usage</h3>
                <p>
                    There are two ways of using this component: using a React{" "}
                    <b>component</b> or a <b>hook</b>.
                </p>
                <h5>Using the component</h5>
                <p>
                    Add the <CodeSpan>&lt;Background /&gt;</CodeSpan> as the
                    first child of the component you want to add the background
                    to.
                </p>
                <CodeSnippet>{rawBackgroundComponent}</CodeSnippet>
                <h5>Using the hook</h5>
                <p>
                    Use the <CodeSpan>useBackground</CodeSpan> hook. Pass
                    optional props as an object. Behind the scenes, the hook
                    just does the component method shown above and returns the
                    resulting component.
                </p>
                <CodeSnippet>{rawBackgroundHook}</CodeSnippet>
                <h3>Props</h3>
                <Table data={backgroundProps} fields={propsTableFields} />
                <br />
                <hr />

                <h1>Button</h1>
                <p>
                    A polymorphic button component. Its color is based on{" "}
                    <CodeSpan>IContextState</CodeSpan> and include 2 alternative
                    variants.
                </p>
                <h3>Examples</h3>
                <h5>Default</h5>
                <div>
                    <Button>Default</Button>
                    <Button state="primary">Primary</Button>
                    <Button state="secondary">Secondary</Button>
                    <Button state="warn">Warn</Button>
                    <Button state="danger">Danger</Button>
                    <Button state="info">Info</Button>
                </div>
                <h5>Outlined</h5>
                <div>
                    <Button variant="outlined">Default</Button>
                    <Button variant="outlined" state="primary">
                        Primary
                    </Button>
                    <Button variant="outlined" state="secondary">
                        Secondary
                    </Button>
                    <Button variant="outlined" state="warn">
                        Warn
                    </Button>
                    <Button variant="outlined" state="danger">
                        Danger
                    </Button>
                    <Button variant="outlined" state="info">
                        Info
                    </Button>
                </div>
                <h5>Text</h5>
                <div>
                    <Button variant="text">Default</Button>
                    <Button variant="text" state="primary">
                        Primary
                    </Button>
                    <Button variant="text" state="secondary">
                        Secondary
                    </Button>
                    <Button variant="text" state="warn">
                        Warn
                    </Button>
                    <Button variant="text" state="danger">
                        Danger
                    </Button>
                    <Button variant="text" state="info">
                        Info
                    </Button>
                </div>
                <h5>Disabled</h5>
                <div>
                    <Button disabled>Default</Button>
                    <Button disabled state="primary">
                        Primary
                    </Button>
                    <Button disabled state="secondary">
                        Secondary
                    </Button>
                    <Button disabled state="warn">
                        Warn
                    </Button>
                    <Button disabled state="danger">
                        Danger
                    </Button>
                    <Button disabled state="info">
                        Info
                    </Button>
                </div>
                <div>
                    <Button disabled variant="outlined">
                        Default
                    </Button>
                    <Button disabled variant="outlined" state="primary">
                        Primary
                    </Button>
                    <Button disabled variant="outlined" state="secondary">
                        Secondary
                    </Button>
                    <Button disabled variant="outlined" state="warn">
                        Warn
                    </Button>
                    <Button disabled variant="outlined" state="danger">
                        Danger
                    </Button>
                    <Button disabled variant="outlined" state="info">
                        Info
                    </Button>
                </div>
                <div>
                    <Button disabled variant="text">
                        Default
                    </Button>
                    <Button disabled variant="text" state="primary">
                        Primary
                    </Button>
                    <Button disabled variant="text" state="secondary">
                        Secondary
                    </Button>
                    <Button disabled variant="text" state="warn">
                        Warn
                    </Button>
                    <Button disabled variant="text" state="danger">
                        Danger
                    </Button>
                    <Button disabled variant="text" state="info">
                        Info
                    </Button>
                </div>
                <h3>Props</h3>
                <Table fields={propsTableFields} data={buttonProps} />
                <br />
                <hr />
                <h1>Catcher</h1>
                <p>
                    Catcher is the only component in TRC which is a class
                    component. This is because it needs to implement{" "}
                    <CodeSpan>componentDidCatch</CodeSpan>. Surround any
                    component with the Catcher to prevent the application from
                    crashing if an error happens. You can also specify a
                    fallback component.
                </p>
                <h3>Usage</h3>
                <h5>Using the component</h5>
                <CodeSnippet>{rawCatcherComponent}</CodeSnippet>
                <h5>Using the HOC</h5>
                <p>
                    Pass the required component as the first parameter and the
                    props as an options object:
                    <br />
                    <CodeSpan>withCatcher(Component, options)</CodeSpan>
                </p>
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
                <Table fields={propsTableFields} data={catcherProps} />
                <br />
                <hr />
            </PaddingH>
        </>
    );
};
