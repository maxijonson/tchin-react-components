import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { THEME_TRANSITION_TIME } from "../../config";

const Table = styled.table`
    max-width: 100%;
    overflow-x: scroll;
    filter: drop-shadow(
        0 0.12em 0.07em ${({ theme }) => theme.colors.defaultShadow}
    );
    border-radius: 5px;
    border-spacing: 0;
    transition: all ${THEME_TRANSITION_TIME}s;
    background: ${({ theme }) => theme.colors.tableBackground};

    & thead th {
        font-weight: 700;
        text-align: left;
    }

    & th,
    & td {
        padding: 0.6em 1.3em;
    }

    & th,
    & tr:not(:last-child) td {
        border-bottom: 1px solid ${({ theme }) => theme.colors.tableAltBorder};
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
}

export default <T extends {}>({ fields, hideHeader, data }: ITableProps<T>) => {
    return (
        <Table>
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
    );
};
