import React from "react";
import _ from "lodash";
import { Layouts, TextStyles, Loading } from "../../components";
import { Hooks, HOCs, CSS } from "../../modules";
import {
    BackgroundDocs,
    ButtonDocs,
    CatcherDocs,
    TableDocs,
    DrawerDocs,
} from "./components";
import TreeContext, { IData } from "./TreeContext";

const { CodeSpan, TextLeft, Title, H3 } = TextStyles;
const { Viewport, Center, PaddingH, Page, Hr } = Layouts;
const { useTree, useSetInterval } = Hooks;
const { withBackground } = HOCs;
const { fonts } = CSS;

const Loadings = () => {
    const [progress, setProgress] = React.useState(0);

    useSetInterval(() => {
        setProgress(_.random(0, 100));
    }, 1500);

    return (
        <>
            <Loading type="spinner" />
            <Loading type="spinner" size={50} progress={progress} />
            <Loading type="bar" />
            <div style={{ width: "25%" }}>
                <Loading type="bar" />
            </div>
        </>
    );
};

export default () => {
    const BGViewport = withBackground(Viewport);
    const treeContext = useTree<IData>();

    return (
        <Page>
            <BGViewport background="assets/images/notfound-bg.jpg" parallax>
                <Center>
                    <div style={{ textAlign: "center" }}>
                        <H3
                            style={{
                                fontFamily: fonts.kaushan.family,
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
                <Loadings />
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
                <TreeContext.Provider value={treeContext}>
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
                    <DrawerDocs />
                </TreeContext.Provider>
                <Hr />
            </PaddingH>
        </Page>
    );
};
