import * as React from "react";
import { Card } from "src/components";
import Modal from "./Modal";

interface IErrorModalOwnProps {
    errorReport: IErrorReport;
    visible: boolean;
    onRequestClose: () => void;
}

export default ({
    visible,
    onRequestClose,
    errorReport,
}: IErrorModalOwnProps) => (
    <Modal visible={visible} onRequestClose={onRequestClose}>
        <Card
            kClassName="ErrorModal--Modal--Card"
            title="Error Report"
            subtitle={errorReport.error.name}
        >
            <pre>{errorReport.error.stack}</pre>
        </Card>
    </Modal>
);
