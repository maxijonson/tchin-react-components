import React from "react";
import styled from "styled-components";
import _ from "lodash";
import tinycolor from "tinycolor2";
import { THEME_TRANSITION_TIME } from "../../config";

const Table = styled.table<{ stripped?: boolean }>`
    width: 100%;
    border-radius: 5px 5px 0 0;
    border-spacing: 0;
    border-collapse: collapse;
    transition: all ${THEME_TRANSITION_TIME}s;
    background: ${({ theme }) => theme.colors.tableBackground};
    box-shadow: 0 2px 2px -1px ${({ theme }) => theme.colors.cardShadow},
        0 1px 5px -2px ${({ theme }) => theme.colors.cardShadow};

    & thead th {
        font-weight: 700;
        text-align: left;
    }

    & th,
    & td {
        padding: 0.6em 1.3em;
        max-width: 500px;
    }

    & tbody tr:nth-child(odd) td {
        background: ${({ theme, stripped }) =>
            stripped &&
            tinycolor(theme.colors.tableBackground)
                .clone()
                .darken(3)
                .toHexString()};
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

// https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
export interface ITableField<T> {
    name: string;
    render: keyof T | ((row: T) => React.ReactNode);
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
        <div style={{ overflowX: "auto", padding: "1%" }}>
            <Table stripped={stripped}>
                {!hideHeader && (
                    <thead>
                        <tr>
                            {_.map(fields, ({ name }) => (
                                <th children={name} key={name} />
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
        </div>
    );
};
