import React from "react";
import _ from "lodash";
import {
    TextStyles,
    CodeSnippet,
    Table,
    Background,
    Card,
    Layouts,
} from "../../../components";
import TreeContext from "../TreeContext";
import { Hooks } from "../../../modules";
import tableFields from "../tableFields";

import rawBackgroundComponent from "../snippets/Background-component.txt";
import rawBackgroundHook from "../snippets/Background-hook.txt";

const { TextLeft, CodeSpan, Subtitle, H3, H4 } = TextStyles;
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

    const subtitleRef = React.useRef(null);
    const usageRef = React.useRef(null);
    const examplesRef = React.useRef(null);
    const propsRef = React.useRef(null);
    const componentRef = React.useRef(null);

    const { addItem } = React.useContext(TreeContext);

    React.useLayoutEffect(() => {
        const groupId = "background";
        const removeFns = [
            addItem({
                id: groupId,
                name: "Background",
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
            <Subtitle ref={subtitleRef}>Background</Subtitle>
            <TextLeft>
                Add background to a div. The background also has a{" "}
                <CodeSpan>ColorOverlay</CodeSpan>.
            </TextLeft>

            <H3 ref={usageRef}>Usage</H3>
            <TextLeft>
                There are two ways of using this component: using a React{" "}
                <b>component</b> or a <b>hook</b>.
            </TextLeft>
            <H4 ref={componentRef}>Using the component</H4>
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
            <H4>Using the hook</H4>
            <TextLeft>
                Use the <CodeSpan>useBackground</CodeSpan> hook. Pass optional
                props as an object. Behind the scenes, the hook just does the
                component method shown above and returns the resulting
                component. The children must have{" "}
                <CodeSpan>position: relative</CodeSpan> set for this to work.
            </TextLeft>
            <CodeSnippet>{rawBackgroundHook}</CodeSnippet>

            <H3 ref={examplesRef}>Examples</H3>
            <Flex
                itemMaxWidth="35%"
                itemMinWidth="300px"
                justifyContent="center"
            >
                <Card style={{ position: "relative", overflow: "hidden" }}>
                    <Background background="assets/images/example-background.jpg" />
                    <div style={{ position: "relative" }}>
                        <H4>Default props (component)</H4>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Non fuga, enim, iste aut laborum magnam voluptate
                        voluptatibus iure itaque nulla ducimus reiciendis rerum?
                        Ex est officia sint, at voluptate molestias?
                    </div>
                </Card>
                <BGCard>
                    <div style={{ position: "relative" }}>
                        <H4>Default props (hook)</H4>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Non fuga, enim, iste aut laborum magnam voluptate
                        voluptatibus iure itaque nulla ducimus reiciendis rerum?
                        Ex est officia sint, at voluptate molestias?
                    </div>
                </BGCard>
            </Flex>

            <H3 ref={propsRef}>Props</H3>
            <Table data={backgroundProps} fields={tableFields} />
            <i>
                Note: in addition to the props shown above, the{" "}
                <CodeSpan>ColorOverlay</CodeSpan> component props apply as well.
            </i>
        </>
    );
};
