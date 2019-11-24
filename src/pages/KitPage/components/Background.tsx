import React from "react";
import {
    TextStyles,
    CodeSnippet,
    Table,
    Background,
    Card,
    Layouts,
} from "../../../components";
import { Hooks } from "../../../modules";
import tableFields from "../tableFields";

import rawBackgroundComponent from "../snippets/Background-component.txt";
import rawBackgroundHook from "../snippets/Background-hook.txt";

const { TextLeft, CodeSpan } = TextStyles;
const { Flex } = Layouts;
const { useBackground } = Hooks;

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

export default () => {
    const BGCard = useBackground(Card, "assets/images/example-background.jpg");

    return (
        <>
            <h1 id="bg">Background</h1>
            <TextLeft>
                Add background to a div. The background also has a{" "}
                <CodeSpan>ColorOverlay</CodeSpan>.
            </TextLeft>
            <h3>Usage</h3>
            <TextLeft>
                There are two ways of using this component: using a React{" "}
                <b>component</b> or a <b>hook</b>.
            </TextLeft>
            <h5>Using the component</h5>
            <TextLeft>
                Although it is not recommended you use the component directly,
                you can add the <CodeSpan>&lt;Background /&gt;</CodeSpan> as the
                first child of the component you want to add the background to.
                Note that the parent needs to have{" "}
                <CodeSpan>overflow: hidden</CodeSpan> and both the parent and
                children need <CodeSpan>position: relative</CodeSpan> for this
                to work.
            </TextLeft>
            <CodeSnippet>{rawBackgroundComponent}</CodeSnippet>
            <h5>Using the hook</h5>
            <TextLeft>
                Use the <CodeSpan>useBackground</CodeSpan> hook. Pass optional
                props as an object. Behind the scenes, the hook just does the
                component method shown above and returns the resulting
                component. The children must have{" "}
                <CodeSpan>position: relative</CodeSpan> set for this to work.
            </TextLeft>
            <CodeSnippet>{rawBackgroundHook}</CodeSnippet>
            <h3>Examples</h3>
            {/* TODO: Editable test component with form elements */}
            <Flex itemMaxWidth="35%" justifyContent="center">
                <Card style={{ position: "relative", overflow: "hidden" }}>
                    <Background background="assets/images/example-background.jpg" />
                    <div style={{ position: "relative" }}>
                        <h5>Default props (component)</h5>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Non fuga, enim, iste aut laborum magnam voluptate
                        voluptatibus iure itaque nulla ducimus reiciendis rerum?
                        Ex est officia sint, at voluptate molestias?
                    </div>
                </Card>
                <BGCard>
                    <div style={{ position: "relative" }}>
                        <h5>Default props (hook)</h5>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Non fuga, enim, iste aut laborum magnam voluptate
                        voluptatibus iure itaque nulla ducimus reiciendis rerum?
                        Ex est officia sint, at voluptate molestias?
                    </div>
                </BGCard>
            </Flex>

            <h3>Props</h3>
            <Table data={backgroundProps} fields={tableFields} />
            <i>
                Note: in addition to the props shown above, the{" "}
                <CodeSpan>ColorOverlay</CodeSpan> component props apply as well.
            </i>
        </>
    );
};
