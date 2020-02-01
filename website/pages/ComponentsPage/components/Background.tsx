import React from "react";
import _ from "lodash";
import {
    TextStyles,
    CodeSnippet,
    Table,
    Background,
    Card,
    Layouts,
    HOCs,
} from "../../../..";
import TreeContext from "../TreeContext";
import tableFields from "../tableFields";

import rawBackgroundComponent from "../snippets/Background-component.txt";
import rawBackgroundHoc from "../snippets/Background-hoc.txt";

const { TextLeft, CodeSpan, Subtitle, H3, H4 } = TextStyles;
const { Flex } = Layouts;
const { withBackground } = HOCs;

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
    const BGCard = withBackground(Card);
    const { addItem } = React.useContext(TreeContext);

    const subtitleRef = React.useRef<HTMLHeadingElement>(null);
    const usageRef = React.useRef<HTMLHeadingElement>(null);
    const examplesRef = React.useRef<HTMLHeadingElement>(null);
    const propsRef = React.useRef<HTMLHeadingElement>(null);
    const componentRef = React.useRef<HTMLHeadingElement>(null);

    React.useLayoutEffect(() => {
        const group = "background";
        const removeFns = [
            addItem({
                id: group,
                data: { name: "Background", ref: subtitleRef },
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
            <H4>Using the HOC</H4>
            <TextLeft>
                Use the <CodeSpan>withBackground</CodeSpan> HOC. Behind the
                scenes, the HOC just applies the component method shown above
                and returns the resulting component. The children must have{" "}
                <CodeSpan>position: relative</CodeSpan> set for this to work.
            </TextLeft>
            <CodeSnippet>{rawBackgroundHoc}</CodeSnippet>

            <H3 ref={examplesRef}>Examples</H3>
            <Flex
                itemMaxWidth="35%"
                itemMinWidth="300px"
                justifyContent="center"
            >
                <Card style={{ position: "relative", overflow: "hidden" }}>
                    <Background background="assets/images/example-background.jpg" />
                    <div style={{ position: "relative" }}>
                        <H3>Default props (component)</H3>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Non fuga, enim, iste aut laborum magnam voluptate
                        voluptatibus iure itaque nulla ducimus reiciendis rerum?
                        Ex est officia sint, at voluptate molestias?
                    </div>
                </Card>
                <BGCard background="assets/images/example-background.jpg">
                    <div style={{ position: "relative" }}>
                        <H3>Default props (HOC)</H3>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Non fuga, enim, iste aut laborum magnam voluptate
                        voluptatibus iure itaque nulla ducimus reiciendis rerum?
                        Ex est officia sint, at voluptate molestias?
                    </div>
                </BGCard>
            </Flex>

            <H3 ref={propsRef}>Props</H3>
            <Table data={backgroundProps} fields={tableFields} />
            <TextLeft>
                <i>
                    Note: in addition to the props shown above, the{" "}
                    <CodeSpan>ColorOverlay</CodeSpan> component props apply as
                    well.
                </i>
            </TextLeft>
        </>
    );
};
