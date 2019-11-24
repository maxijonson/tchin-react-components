import React from "react";
import { Button, Table, TextStyles } from "../../../components";
import tableFields from "../tableFields";

const { TextLeft, CodeSpan } = TextStyles;

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
        <h1>Button</h1>
        <TextLeft>
            A polymorphic button component. Its color is based on{" "}
            <CodeSpan>IContextState</CodeSpan> and include 2 alternative
            variants.
        </TextLeft>
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
        <Table fields={tableFields} data={buttonProps} />
    </>
);
