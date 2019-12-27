import React from "react";
import styled from "styled-components";
import _ from "lodash";
import tinycolor from "tinycolor2";
import { THEME_TRANSITION_TIME } from "../../config";

const Table = styled.table<{ stripped?: boolean }>`
    width: 100%;
    border-spacing: 0;
    padding: 0;
    border-collapse: collapse;
    transition: all ${THEME_TRANSITION_TIME}s;

    & thead th {
        font-weight: 700;
        text-align: left;
    }

    & th,
    & td {
        padding: 6px 13px;
        max-width: 500px;
    }

    & tbody tr:nth-child(odd) td {
        background: ${({ theme, stripped }) =>
            stripped && theme.colors.tableStrippedBackground};
    }

    & th,
    & tr:not(:last-child) td {
        border-bottom: 1px solid
            ${({ theme }) =>
                tinycolor(theme.colors.tableAltBorder)
                    .clone()
                    .setAlpha(0.5)
                    .toHex8String()};
    }
`;

const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
    padding: 0;
    margin: 10px 0;
    transition: all ${THEME_TRANSITION_TIME}s;
`;

// https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
export interface ITableField<T> {
    name: string;
    render: Extract<keyof T, React.ReactNode> | ((row: T) => React.ReactNode); // FIXME: This allows objects, which can't be rendered.
    renderHeader?: (name: string) => React.ReactNode;
}

export interface ITableProps<T extends {}> {
    hideHeader?: boolean;
    data: T[];
    fields: ITableField<T>[];
    stripped?: boolean;
}

export default <T extends {}>({
    fields,
    hideHeader,
    data,
    stripped,
}: ITableProps<T>) => {
    return (
        <TableWrapper>
            <Table stripped={stripped}>
                {!hideHeader && (
                    <thead>
                        <tr>
                            {_.map(fields, ({ name, renderHeader }) => (
                                <th
                                    children={
                                        typeof renderHeader === "function"
                                            ? renderHeader(name)
                                            : name
                                    }
                                    key={name}
                                />
                            ))}
                        </tr>
                    </thead>
                )}
                <tbody>
                    {_.map(data, (d, i) => (
                        <tr key={i}>
                            {_.map(fields, ({ render, name }) => (
                                <td key={name}>
                                    {typeof render === "function"
                                        ? render(d)
                                        : d[render]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </TableWrapper>
    );
};
