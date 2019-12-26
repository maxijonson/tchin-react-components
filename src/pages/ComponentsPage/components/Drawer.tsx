import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { motion } from "framer-motion";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    TextStyles,
    Button,
    Drawer,
    toggleDrawer,
    CodeSnippet,
    Layouts,
    Table,
    ScrollTo,
} from "../../../components";
import { Hooks } from "../../../modules";
import { BREAKPOINTS } from "../../../config";
import tableFields from "../tableFields";
import TreeContext from "../TreeContext";

import rawEventBased from "../snippets/Drawer-EventBased.txt";
import rawStateBased from "../snippets/Drawer-StateBased.txt";

const { Subtitle, H3, H4, H5, P, CodeSpan } = TextStyles;
const { CenterH, Hr } = Layouts;
const { useCurrentBreakpoint, useConnect } = Hooks;

const temporaryPositions: Required<
    React.ComponentProps<typeof Drawer>
>["position"][] = ["top", "right", "bottom", "left"];

const temporaryDrawerProps = [
    {
        prop: "position",
        definition: "The position where the Table appears from.",
        type: `"top" | "right" | "bottom" | "left"`,
        default: "left",
        required: false,
    },
];
const persistentDrawerProps = [
    {
        prop: "persistent",
        definition: "Makes the drawer persistent.",
        type: `true`,
        default: "",
        required: true,
    },
    {
        prop: "position",
        definition: "The position where the Table appears from.",
        type: `"left" | "right"`,
        default: "left",
        required: false,
    },
    {
        prop: "width",
        definition:
            "Because this kind of drawer pushes the content under it, the width needs to be set explicitly.",
        type: "string",
        default: "240px",
        required: false,
    },
    {
        prop: "allowSize",
        definition: `Change the allowed size on which persistent Drawers appear.`,
        type: `"xs" | "sm" | "md" | "lg" | "xl"`,
        default: "xl",
        required: false,
    },
    {
        prop: "portalQuery",
        definition: `Where the Drawer is placed in the DOM.`,
        type: `string`,
        default: "#app > div",
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
        prop: "initiallyOpen",
        definition: "If the Drawer should be initially opened.",
        type: "boolean",
        default: "false",
        required: false,
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
        prop: "isOpen",
        definition: (
            <>
                Sets the Drawer state manually. You are now in charge of
                managing the state of the Drawer.
            </>
        ),
        type: "boolean",
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

const TOCButton = styled(motion.svg)`
    position: fixed;
    bottom: 10vh;
    left: 0;
    width: 27px;
    height: 50px;
`;

export default () => {
    const { addItem, Component: Tree } = React.useContext(TreeContext);
    const breakpoint = useCurrentBreakpoint("window");
    const isDesktop = breakpoint >= BREAKPOINTS.xl;
    const [tocOpen, setTocOpen] = React.useState(isDesktop);
    const theme = useConnect(({ theme }) => theme);

    const subtitleRef = React.useRef(null);
    const motivationRef = React.useRef(null);
    const usageRef = React.useRef(null);
    const examplesRef = React.useRef(null);
    const propsRef = React.useRef(null);

    type IRenderItem = React.ComponentProps<typeof Tree>["renderItem"];
    const renderItem = React.useCallback<NonNullable<IRenderItem>>(
        ({ data: { ref, name } }) => (
            <ScrollTo to={ref}>
                <Button
                    variant="text"
                    noScale
                    style={{ margin: 0, padding: "2px" }}
                >
                    {name}
                </Button>
            </ScrollTo>
        ),
        []
    );

    React.useLayoutEffect(() => {
        const group = "drawer";
        const removeFns = [
            addItem({
                id: group,
                data: { name: "Drawer", ref: subtitleRef },
            }),
            addItem({
                id: `${group}_motivation`,
                data: { name: "Motivation", ref: motivationRef },
                group,
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
            {_.map(temporaryPositions, (position) => (
                <Drawer id={position} position={position} key={position}>
                    <P>This Drawer is on the {position}</P>
                    <P>The size of drawers ajdusts to its content</P>
                </Drawer>
            ))}
            <Drawer
                isOpen={tocOpen}
                persistent
                onRequestClose={() => setTocOpen(false)}
            >
                <div>
                    <div style={{ padding: "4px 37px" }}>
                        <div
                            style={{ fontWeight: "bolder", fontSize: "1.6em" }}
                        >
                            TRC
                        </div>
                        <div>Components</div>
                    </div>
                    <Hr />
                    <Tree isCollapsible renderItem={renderItem} />
                </div>
            </Drawer>
            <Drawer id="persistent-right" persistent position="right">
                <div>
                    {_.times(50, (i) => (
                        <div style={{ width: "100%", padding: "4%" }} key={i}>
                            Item
                        </div>
                    ))}
                </div>
            </Drawer>
            <Subtitle ref={subtitleRef}>Drawer</Subtitle>
            <P>
                Acts like a sidebar that can be presented in different modes and
                positions.
            </P>
            <H3 ref={motivationRef}>Motivation</H3>
            <P>
                In many other libraries, you must implement and manage your own
                state for the Drawer, which I, against popular beliefs, believe
                there should be an alternative that frees you from this task.
                That said, TRC allows 2 methods to manage the Drawer.
            </P>
            <H3 ref={usageRef}>Usage</H3>
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
                <CodeSpan>isOpen</CodeSpan> prop between{" "}
                <CodeSpan>true</CodeSpan> or <CodeSpan>false</CodeSpan> to
                toggle the Drawer. Your provided state will override the
                Drawer&apos;s internal state. This method should be used if the
                component using the Drawer needs to know its state.
            </P>
            <P>
                <i>
                    Note: if you are using TypeScript, the props typings have
                    been set so it disallows the use of both{" "}
                    <CodeSpan>id</CodeSpan> and <CodeSpan>isOpen</CodeSpan> at
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
            <H3 ref={examplesRef}>Examples</H3>
            <H4>Temporary Drawers</H4>
            <P>
                Temporary drawers appear on top of the content. Clicking on the
                color overlay will trigger an exit event.
            </P>
            <CenterH>
                {_.map(temporaryPositions, (position) => (
                    <Button
                        key={position}
                        onClick={() => toggleDrawer(position)}
                        state="primary"
                    >
                        Open {position}
                    </Button>
                ))}
            </CenterH>
            <H4>Persistent Drawers</H4>
            <P>
                Persistent drawers move the content to make space for them.
                Since they are not recommended for smaller devices, they will
                automatically be converted to temporary drawers for those
                devices (this behavior can be disabled). Note that only left and
                right positions are available when using persistent drawers.
            </P>
            <CenterH>
                <Button onClick={() => setTocOpen((s) => !s)} state="primary">
                    Open left
                </Button>
                <Button
                    onClick={() => toggleDrawer("persistent-right")}
                    state="primary"
                >
                    Open right
                </Button>
            </CenterH>
            {!isDesktop && (
                <TOCButton
                    initial={false}
                    animate={tocOpen ? "open" : "closed"}
                    variants={{
                        closed: {
                            x: "0%",
                            opacity: 1,
                            transition: { delay: 0.5, stiffness: 0 },
                        },
                        open: {
                            x: 125,
                            opacity: 0,
                            transitionEnd: { x: "-100%", opacity: 1 },
                        },
                    }}
                    onClick={() => setTocOpen((s) => !s)}
                    viewBox="0 0 27 50"
                >
                    <motion.path
                        d="m 0 3 a 1 1 0 0 1 0 45"
                        fill={theme.colors.pageBackground}
                        stroke={theme.colors.drawerBorder}
                        strokeWidth="2"
                    />
                    <FontAwesomeIcon
                        transform={{ size: 7, x: -1 }}
                        color={theme.colors.altText}
                        icon={faChevronRight}
                    />
                </TOCButton>
            )}
            <H3 ref={propsRef}>Props</H3>
            The drawer props take many forms depending on what kind of drawer is
            needed.
            <H4>Drawer mode</H4>
            <H5>Temporary Drawer</H5>
            <Table fields={tableFields} data={temporaryDrawerProps} />
            <H5>Persistent Drawer</H5>
            <Table fields={tableFields} data={persistentDrawerProps} />
            <P>
                <i>
                    As of this version, the sizes are the following: xs (
                    {BREAKPOINTS.xspx}), sm ({BREAKPOINTS.smpx}), md (
                    {BREAKPOINTS.mdpx}), lg ({BREAKPOINTS.lgpx}), xl (
                    {BREAKPOINTS.xlpx}),
                </i>
            </P>
            <H4>Drawer toggling method</H4>
            <H5>EventBased</H5>
            <Table fields={tableFields} data={drawerEventProps} />
            <H5>StateBased</H5>
            <Table fields={tableFields} data={drawerStateProps} />
        </>
    );
};
