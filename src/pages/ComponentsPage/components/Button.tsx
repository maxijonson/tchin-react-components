import React from "react";
import { Button, Table, TextStyles } from "../../../components";
import tableFields from "../tableFields";

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
        prop: "disabled",
        definition: "Disables the button",
        type: "boolean",
        default: "false",
        required: false,
    },
];

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
        <Button disabled={disabled} state="success" variant={variant}>
            Success
        </Button>
        <Button disabled={disabled} state="info" variant={variant}>
            Info
        </Button>
    </>
);

export default () => (
    <>
        <Subtitle>Button</Subtitle>
        <TextLeft>
            A polymorphic button component. Its color is based on{" "}
            <CodeSpan>IContextState</CodeSpan> and include 2 alternative
            variants.
        </TextLeft>
        <H3>Examples</H3>
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
        <H3>Props</H3>
        <Table fields={tableFields} data={buttonProps} />
    </>
);
