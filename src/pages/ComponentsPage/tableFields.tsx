import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { ITableField, TextStyles } from "../../components";
import { CSS } from "../../modules";

const { fonts } = CSS;

const { TextCenter } = TextStyles;

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
                <span style={{ fontFamily: fonts.firaCode.family }}>
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
            required && (
                <TextCenter>
                    <FontAwesomeIcon icon={faCheck} />
                </TextCenter>
            ),
        renderHeader: (name) => (
            <div style={{ textAlign: "center" }}>{name}</div>
        ),
    },
];

export default tableFields;
