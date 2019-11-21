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
    Background,
} from "../../components";
import { Hooks } from "../../modules";

// SNIPPETS
import rawBackgroundComponent from "./snippets/Background-component.txt";
import rawBackgroundHook from "./snippets/Background-hook.txt";
import rawCatcherComponent from "./snippets/Catcher-component.txt";
import rawCatcherHOC from "./snippets/Catcher-hoc.txt";

const { CodeSpan, TextJustify } = TextStyles;
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
        default: "false",
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

// EXAMPLE COMPONENTS
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
const Buttons = ({
    variant,
    disabled,
}: {
    variant?: React.ComponentProps<typeof Button>["variant"];
    disabled?: React.ComponentProps<typeof Button>["disabled"];
}) => (
    <>
        <Button disabled={disabled} variant={variant}>
            Default
        </Button>
        <Button disabled={disabled} state="primary" variant={variant}>
            Primary
        </Button>
        <Button disabled={disabled} state="secondary" variant={variant}>
            Secondary
        </Button>
        <Button disabled={disabled} state="warn" variant={variant}>
            Warn
        </Button>
        <Button disabled={disabled} state="danger" variant={variant}>
            Danger
        </Button>
        <Button disabled={disabled} state="info" variant={variant}>
            Info
        </Button>
    </>
);
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
    const BGViewport = useBackground(
        Viewport,
        "assets/images/notfound-bg.jpg",
        { parallax: true }
    );
    const BGCard = useBackground(Card, "assets/images/example-background.jpg");
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
                <TextJustify>
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
                </TextJustify>
                <hr />
                <h1 id="bg">Background</h1>
                <TextJustify>
                    Add background to a div. The background also has a{" "}
                    <CodeSpan>ColorOverlay</CodeSpan>.
                </TextJustify>
                <h3>Usage</h3>
                <TextJustify>
                    There are two ways of using this component: using a React{" "}
                    <b>component</b> or a <b>hook</b>.
                </TextJustify>
                <h5>Using the component</h5>
                <TextJustify>
                    Although it is not recommended you use the component
                    directly, you can add the{" "}
                    <CodeSpan>&lt;Background /&gt;</CodeSpan> as the first child
                    of the component you want to add the background to. Note
                    that the parent needs to have{" "}
                    <CodeSpan>overflow: hidden</CodeSpan> and both the parent
                    and children need <CodeSpan>position: relative</CodeSpan>{" "}
                    for this to work.
                </TextJustify>
                <CodeSnippet>{rawBackgroundComponent}</CodeSnippet>
                <h5>Using the hook</h5>
                <TextJustify>
                    Use the <CodeSpan>useBackground</CodeSpan> hook. Pass
                    optional props as an object. Behind the scenes, the hook
                    just does the component method shown above and returns the
                    resulting component. The children must have{" "}
                    <CodeSpan>position: relative</CodeSpan> set for this to
                    work.
                </TextJustify>
                <CodeSnippet>{rawBackgroundHook}</CodeSnippet>
                <h3>Examples</h3>
                {/* TODO: Editable test component with form elements */}
                <Flex itemMaxWidth="35%" justifyContent="center">
                    <Card style={{ position: "relative", overflow: "hidden" }}>
                        <Background background="assets/images/example-background.jpg" />
                        <div style={{ position: "relative" }}>
                            <h5>Default props (component)</h5>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Non fuga, enim, iste aut laborum magnam
                            voluptate voluptatibus iure itaque nulla ducimus
                            reiciendis rerum? Ex est officia sint, at voluptate
                            molestias?
                        </div>
                    </Card>
                    <BGCard>
                        <div style={{ position: "relative" }}>
                            <h5>Default props (hook)</h5>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Non fuga, enim, iste aut laborum magnam
                            voluptate voluptatibus iure itaque nulla ducimus
                            reiciendis rerum? Ex est officia sint, at voluptate
                            molestias?
                        </div>
                    </BGCard>
                </Flex>

                <h3>Props</h3>
                <Table data={backgroundProps} fields={propsTableFields} />
                <i>
                    Note: in addition to the props shown above, the{" "}
                    <CodeSpan>ColorOverlay</CodeSpan> component props apply as
                    well.
                </i>
                <br />
                <hr />

                <h1>Button</h1>
                <TextJustify>
                    A polymorphic button component. Its color is based on{" "}
                    <CodeSpan>IContextState</CodeSpan> and include 2 alternative
                    variants.
                </TextJustify>
                <h3>Examples</h3>
                <h5>Default</h5>
                <div>
                    <Buttons />
                </div>
                <h5>Outlined</h5>
                <div>
                    <Buttons variant="outlined" />
                </div>
                <h5>Text</h5>
                <div>
                    <Buttons variant="text" />
                </div>
                <h5>Disabled</h5>
                <div>
                    <Buttons disabled />
                </div>
                <div>
                    <Buttons variant="outlined" disabled />
                </div>
                <div>
                    <Buttons variant="text" disabled />
                </div>
                <h3>Props</h3>
                <Table fields={propsTableFields} data={buttonProps} />
                <br />
                <hr />
                <h1>Catcher</h1>
                <TextJustify>
                    Catcher is the only component in TRC which is a class
                    component. This is because it needs to implement{" "}
                    <CodeSpan>componentDidCatch</CodeSpan>. Surround any
                    component with the Catcher to prevent the application from
                    crashing if an error happens. You can also specify a
                    fallback component.
                </TextJustify>
                <h3>Usage</h3>
                <h5>Using the component</h5>
                <CodeSnippet>{rawCatcherComponent}</CodeSnippet>
                <h5>Using the HOC</h5>
                <TextJustify>
                    Pass the required component as the first parameter and the
                    props as an options object:
                    <br />
                    <CodeSpan>withCatcher(Component, options)</CodeSpan>
                </TextJustify>
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
