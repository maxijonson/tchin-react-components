import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import {
    Layouts,
    TextStyles,
    CodeSnippet,
    Table,
    ITableField,
    Button,
} from "../../components";
import { Hooks } from "../../modules";

// SNIPPETS
import rawBackgroundComponent from "./snippets/Background-component.txt";
import rawBackgroundHook from "./snippets/Background-hook.txt";

const { CodeSpan } = TextStyles;
const { Viewport, Center, PaddingH, CenterH } = Layouts;
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
        definition: "Disables the buttons",
        type: "boolean",
        default: "false",
        required: false,
    },
    {
        prop: "...StyledComponent props",
        definition: "All StyledComponent props apply",
        type: "HTML Attributes",
        default: "",
        required: false,
    },
];

const propsTableFields: ITableField<typeof backgroundProps[0]>[] = [
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

export default () => {
    const BGViewport = useBackground(Viewport, "assets/images/notfound-bg.jpg");

    return (
        <>
            <BGViewport>
                <Center>Kit</Center>
            </BGViewport>
            <PaddingH>
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
                    This component is polymorphic: color is based on{" "}
                    <CodeSpan>IContextState</CodeSpan> and there are many
                    variants for it.
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
            </PaddingH>
        </>
    );
};
