import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { ITableField } from "../../components";
import app from "../../app";

const tableFields: ITableField<{
    prop: React.ReactNode;
    definition: React.ReactNode;
    type: React.ReactNode;
    default: React.ReactNode;
    required: boolean;
}>[] = [
    {
        name: "Prop",
        render: "prop",
    },
    {
        name: "Defintion",
        render: "definition",
    },
    {
        name: "Type",
        render: ({ type }) =>
            type && (
                <span style={{ fontFamily: app.fonts.firaCode.family }}>
                    {type}
                </span>
            ),
    },
    {
        name: "Default",
        render: "default",
    },
    {
        name: "Required",
        render: ({ required }) =>
            required && <FontAwesomeIcon icon={faCheck} />,
    },
];

export default tableFields;
