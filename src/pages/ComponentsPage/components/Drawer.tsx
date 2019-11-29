import React from "react";
import _ from "lodash";
import {
    TextStyles,
    Button,
    Drawer,
    toggleDrawer,
    CodeSnippet,
    Layouts,
    Table,
} from "../../../components";
import tableFields from "../tableFields";

import rawEventBased from "../snippets/Drawer-EventBased.txt";
import rawStateBased from "../snippets/Drawer-StateBased.txt";

const { Subtitle, H3, H4, P, CodeSpan } = TextStyles;
const { CenterH } = Layouts;

const positions: Required<React.ComponentProps<typeof Drawer>>["position"][] = [
    "top",
    "right",
    "bottom",
    "left",
];
const drawerBaseProps = [
    {
        prop: "position",
        definition: "The position where the Table appears from",
        type: `"top" | "right" | "bottom" | "left"`,
        default: "left",
        required: false,
    },
];
const drawerEventProps = [
    {
        prop: "id",
        definition: (
            <>
                Sets the Drawer id for event based Drawers. Call{" "}
                <CodeSpan>toggleDrawer</CodeSpan> with this id to toggle the
                Drawer.
            </>
        ),
        type: "string",
        default: "",
        required: true,
    },
    {
        prop: "onRequestClose",
        definition: (
            <>
                Function called when the Drawer receives an internal exit event.
                This function gets passed a <CodeSpan>toggle</CodeSpan> function
                which, when called, closes the Drawer. If this function is not
                specified, the Drawer will close automatically when the exit
                event happens.
            </>
        ),
        type: "(toggle: () => void) => void",
        default: "",
        required: false,
    },
];
const drawerStateProps = [
    {
        prop: "state",
        definition: (
            <>
                Sets the Drawer state manually. You are now in charge of
                managing the state of the Drawer.
            </>
        ),
        type: `"open" | "closed"`,
        default: "",
        required: true,
    },
    {
        prop: "onRequestClose",
        definition: (
            <>
                Function called when the Drawer receives an internal exit event.
                If this function is not specified, the internal exit events will
                not make the Drawer close. You should then manage this inside
                the Drawer&apos;s children.
            </>
        ),
        type: "() => void",
        default: "",
        required: false,
    },
];

export default () => {
    return (
        <>
            <Subtitle>Drawer</Subtitle>
            <P>
                Acts like a sidebar that can be presented in different modes and
                positions.
            </P>
            <H3>Motivation</H3>
            <P>
                In many other libraries, you must implement and manage your own
                state for the Drawer, which I, against popular beliefs, believe
                there should be an alternative that frees you from this task.
                However, some cases could still need this approach. That said,
                TRC allows 2 methods to manage the Drawer.
            </P>
            <H3>Usage</H3>
            <H4>Method 1: EventBased</H4>
            <P>
                This is the original solution TRC gives you. By giving the
                Drawer an <CodeSpan>id</CodeSpan> prop, it will add an event
                listener for that <CodeSpan>id</CodeSpan>. Use the{" "}
                <CodeSpan>toggleDrawer</CodeSpan> function that is exported
                along with the Drawer component to dispatch the toggle event
                with the <CodeSpan>id</CodeSpan> you provided.
            </P>
            <H4>Method 2: StateBased</H4>
            <P>
                This approach lets you manage the state manually. Just give it a{" "}
                <CodeSpan>state</CodeSpan> prop between{" "}
                <CodeSpan>open</CodeSpan> or <CodeSpan>closed</CodeSpan> to
                toggle the Drawer. Your provided state will override the
                Drawer&apos;s internal state. This method should be used if the
                component using the Drawer needs to know its state.
            </P>
            <P>
                <i>
                    Note: if you are using TypeScript, the props typings have
                    been set so it disallows the use of both{" "}
                    <CodeSpan>id</CodeSpan> and <CodeSpan>state</CodeSpan> at
                    the same time
                </i>
            </P>
            <H4>onRequestClose</H4>
            <P>
                This prop takes a function that is called whenever the Drawer
                gets an internal event to close itself (i.e. Clicking on the
                overlay outside of the Drawer).
            </P>
            <P>
                For EventBased Drawers, you do not need to specify this function
                since EventBased Drawers manage their own state. This means that
                when the user triggers an exit event, the Drawer will close
                itself. However, if you would like to prevent this, defining{" "}
                <CodeSpan>onRequestClose</CodeSpan> will give you the{" "}
                <CodeSpan>toggle</CodeSpan> function so you can call it
                yourself, or not.
            </P>
            <CodeSnippet>{rawEventBased}</CodeSnippet>
            <P>
                For StateBased Drawers, if you want your users to be able to
                close the Drawer when they trigger an exit event, you need to
                define the <CodeSpan>onRequestClose</CodeSpan> prop and set your
                state inside this function. Note that you do not get the{" "}
                <CodeSpan>toggle</CodeSpan> function passed as parameter, since
                that function manages the internal Drawer state, which is
                useless for a StateBased Drawer.
            </P>
            <CodeSnippet>{rawStateBased}</CodeSnippet>
            <H3>Examples</H3>
            <CenterH>
                {_.map(positions, (position) => (
                    <Button
                        onClick={() => toggleDrawer(position)}
                        state="primary"
                    >
                        Open {position}
                    </Button>
                ))}
            </CenterH>
            {_.map(positions, (position) => (
                <Drawer id={position} position={position}>
                    <P>This Drawer is on the {position}</P>
                    <P>The size of drawers ajdusts to its content</P>
                </Drawer>
            ))}
            <H3>Props</H3>
            <H4>Base Props</H4>
            <Table fields={tableFields} data={drawerBaseProps} />
            <H4>EventBased Props</H4>
            <Table fields={tableFields} data={drawerEventProps} />
            <H4>StateBased Props</H4>
            <Table fields={tableFields} data={drawerStateProps} />
        </>
    );
};
