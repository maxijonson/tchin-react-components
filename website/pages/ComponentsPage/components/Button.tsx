import React from "react";
import _ from "lodash";
import { Button, Table, TextStyles } from "../../../..";
import tableFields from "../tableFields";
import TreeContext from "../TreeContext";

const { TextLeft, CodeSpan, Subtitle, H3, H4, P } = TextStyles;

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
        prop: "noScale",
        definition: "Disables the scaling behaviour",
        type: "boolean",
        default: "false",
        required: false,
    },
];

const Buttons = ({
    variant,
    disabled,
}: {
    variant?: ComponentProps<typeof Button>["variant"];
    disabled?: ComponentProps<typeof Button>["disabled"];
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
        <Button disabled={disabled} state="success" variant={variant}>
            Success
        </Button>
        <Button disabled={disabled} state="info" variant={variant}>
            Info
        </Button>
    </>
);

export default () => {
    const { addItem } = React.useContext(TreeContext);

    const subtitleRef = React.useRef(null);
    const examplesRef = React.useRef(null);
    const propsRef = React.useRef(null);

    React.useLayoutEffect(() => {
        const group = "button";
        const removeFns = [
            addItem({
                id: group,
                data: { name: "Button", ref: subtitleRef },
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
            <Subtitle ref={subtitleRef}>Button</Subtitle>
            <TextLeft>
                A polymorphic button component. Its color is based on{" "}
                <CodeSpan>IContextState</CodeSpan> and include 2 alternative
                variants.
            </TextLeft>
            <H3 ref={examplesRef}>Examples</H3>
            <H4>Default</H4>
            <P>
                <Buttons />
            </P>
            <H4>Outlined</H4>
            <P>
                <Buttons variant="outlined" />
            </P>
            <H4>Text</H4>
            <P>
                <Buttons variant="text" />
            </P>
            <H4>Disabled</H4>
            <P>
                <Buttons disabled />
            </P>
            <P>
                <Buttons variant="outlined" disabled />
            </P>
            <P>
                <Buttons variant="text" disabled />
            </P>
            <H3 ref={propsRef}>Props</H3>
            <Table fields={tableFields} data={buttonProps} />
        </>
    );
};
