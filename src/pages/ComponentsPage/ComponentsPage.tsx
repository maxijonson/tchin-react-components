import React from "react";
import { Layouts, TextStyles } from "../../components";
import { Hooks } from "../../modules";
import {
    BackgroundDocs,
    ButtonDocs,
    CatcherDocs,
    TableDocs,
    DrawerDocs,
} from "./components";
import TreeContext from "./TreeContext";
import app from "../../app";

const { CodeSpan, TextLeft, Title, H3 } = TextStyles;
const { Viewport, Center, PaddingH, Page, Hr } = Layouts;
const { useBackground, useTree } = Hooks;

export default () => {
    const BGViewport = useBackground(
        Viewport,
        "assets/images/notfound-bg.jpg",
        { parallax: true }
    );

    const { addItem, Component: Tree } = useTree();

    return (
        <Page>
            <BGViewport>
                <Center>
                    <div style={{ textAlign: "center" }}>
                        <H3
                            style={{
                                fontFamily: app.fonts.kaushan.family,
                                color: "inherit",
                            }}
                        >
                            tchin-react-components
                        </H3>
                        <Title>Components</Title>
                    </div>
                </Center>
            </BGViewport>
            <PaddingH>
                <TextLeft>
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
                </TextLeft>
                <Hr />
                <TreeContext.Provider value={{ addItem }}>
                    <BackgroundDocs />
                    <Hr />
                    <br />
                    <ButtonDocs />
                    <br />
                    <Hr />
                    <CatcherDocs />
                    <br />
                    <Hr />
                    <TableDocs />
                    <br />
                    <Hr />
                    <DrawerDocs Tree={Tree} />
                </TreeContext.Provider>
                <Hr />
            </PaddingH>
        </Page>
    );
};
