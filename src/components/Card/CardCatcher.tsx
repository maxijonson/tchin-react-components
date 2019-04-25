import * as React from "react";
import { Button, ErrorModal } from "src/components";
import { Hooks } from "src/modules";
import { withCatcher } from "../Catcher/Catcher";
import Card from "./Card";

const { useConnect } = Hooks;

// TODO: i18n
const Base = ({ errorReport }: { errorReport: IErrorReport }) => {
    const { theme } = useConnect(({ theme }) => ({ theme }));

    const [modalVisible, setModalVisible] = React.useState(false);

    const handleClick = () => {
        setModalVisible(true);
    };

    const onModalRequestClose = () => setModalVisible(false);

    return (
        <>
            <Card
                background={theme.colors.defaultErrorBg}
                title={
                    <span
                        style={{ color: theme.colors.defaultErrorText }}
                        children="UH OH"
                    />
                }
                subtitle={
                    <span
                        style={{ color: theme.colors.altErrorText }}
                        children="Something went wrong..."
                    />
                }
                headerSeparator={<span />}
                imageUrl="assets/images/warn.png"
            >
                <div
                    style={{
                        color: theme.colors.defaultErrorText,
                        textAlign: "center",
                    }}
                >
                    <p>
                        An unexpected error happened and this message was
                        rendered as fallback to prevent the rest from crashing!
                    </p>
                    <Button
                        title="Debug"
                        subtitle="see the cryptic stuff"
                        onClick={handleClick}
                    />
                </div>
            </Card>
            <ErrorModal
                errorReport={errorReport}
                visible={modalVisible}
                onRequestClose={onModalRequestClose}
            />
        </>
    );
};

// TODO: Let the Catcher handle this kind of event (a Fallback crashing)
export const CardCatcher = withCatcher(Base, {
    Fallback: () => (
        <Card
            background="#C1292E"
            title="Crashception"
            children="The original component crashed as well as the Fallback component... This should not happen, but it did."
        />
    ),
});
