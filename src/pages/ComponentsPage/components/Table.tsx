import React from "react";
import _ from "lodash";
import { TextStyles, CodeSnippet, Table } from "../../../components";
import tableFields from "../tableFields";
import TreeContext from "../TreeContext";

import rawTable from "../snippets/Table.txt";

const { Subtitle, P, H3, H4, CodeSpan } = TextStyles;

const tableProps = [
    {
        prop: "hideHeader",
        definition: "Hide the table header cells",
        type: "boolean",
        default: "false",
        required: false,
    },
    {
        prop: "data",
        definition: "The array of objects representing the data of the table",
        type: "T[]",
        default: "",
        required: true,
    },
    {
        prop: "fields",
        definition: "The field definitions",
        type: "ITableField<T>[]",
        default: "",
        required: true,
    },
    {
        prop: "stripped",
        definition: "Alternate the background color of each rows",
        type: "boolean",
        default: "false",
        required: false,
    },
];

const tableFieldProps = [
    {
        prop: "name",
        definition: "Name displayed in the header cell",
        type: "string",
        default: "",
        required: true,
    },
    {
        prop: "render",
        definition: (
            <>
                How the field is rendered. If the property you want to render is
                a valid <CodeSpan>ReactNode</CodeSpan>, you may only specify the
                property name. Otherwise, you must define how to render it using
                a function.
            </>
        ),
        type: "Extract<keyof T, React.ReactNode> | (T) => ReactNode",
        default: "",
        required: true,
    },
];

export default () => {
    const { addItem } = React.useContext(TreeContext);

    const subtitleRef = React.useRef(null);
    const usageRef = React.useRef(null);
    const examplesRef = React.useRef(null);
    const propsRef = React.useRef(null);

    React.useLayoutEffect(() => {
        const group = "table";
        const removeFns = [
            addItem({
                id: group,
                data: { name: "Table", ref: subtitleRef },
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
            <Subtitle ref={subtitleRef}>Table</Subtitle>
            <P>A table component to display data of a same structure.</P>
            <H3 ref={usageRef}>Usage</H3>
            <P>
                Here is a general case of using the Table component. You can
                declare the header fields and give it custom rendering if need
                be.
            </P>
            <CodeSnippet>{rawTable}</CodeSnippet>
            <H3 ref={examplesRef}>Example</H3>
            <Table
                stripped
                data={[
                    {
                        username: "jonathan",
                        age: 23,
                        isAdmin: true,
                        imageUrl: "/img/jo",
                    },
                    {
                        username: "mederic",
                        age: 19,
                        isAdmin: true,
                        imageUrl: "/img/med",
                    },
                    {
                        username: "felix",
                        age: 21,
                        isAdmin: false,
                        imageUrl: "/img/fil",
                    },
                ]}
                fields={[
                    { name: "Username", render: "username" },
                    { name: "Age", render: "age" },
                    {
                        name: "Admin",
                        render: ({ isAdmin }) => (isAdmin ? "Yes" : ""),
                    },
                    {
                        name: "Profile Image",
                        render: ({ imageUrl }) => (
                            <img src={imageUrl} alt={imageUrl} />
                        ),
                    },
                ]}
            />
            <H3 ref={propsRef}>Props</H3>
            <H4>Table Props</H4>
            <Table fields={tableFields} data={tableProps} />
            <H4>ITableField&lt;T&gt;</H4>
            <Table fields={tableFields} data={tableFieldProps} />
        </>
    );
};
