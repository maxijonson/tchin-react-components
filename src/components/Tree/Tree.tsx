import React from "react";
import styled from "styled-components";
import _ from "lodash";
import Ul from "../Layouts/Ul";
import Li from "../Layouts/Li";
import { Link } from "../TextStyles";
import { THEME_TRANSITION_TIME } from "../../config";

interface ITreeItems {
    [id: string]: {
        id: string;
        childrenOf?: string;
        name: React.ReactNode;
        ref: React.RefObject<HTMLElement>;
    };
}

type ITreeItem = ITreeItems[0];

interface ITreeProps {
    items: ITreeItems;
}

interface IGroupedTree {
    [id: string]: ITreeItem & { subItems: IGroupedTree };
}

const Tree = styled.div`
    padding-left: 24px;
    padding-top: 10px;
    font-size: 1em;

    & ${Link} {
        color: ${({ theme }) => theme.colors.defaultText};
        border-radius: 4px;
        padding: 5px;
        transition: background-color ${THEME_TRANSITION_TIME}s;

        &:hover {
            background-color: ${({ theme }) => theme.colors.altPageBackground};
        }
    }
`;

const groupItems = (items: ITreeItems, group?: string) =>
    _(items)
        .filter((item) => item.childrenOf == group)
        .reduce(
            (acc, item) => {
                acc[item.id] = {
                    ...item,
                    subItems: groupItems(items, item.id),
                };
                return acc;
            },
            {} as IGroupedTree
        );

const renderSubItems = (subItems: IGroupedTree) =>
    _.map(subItems, (subItem) => (
        <Li key={subItem.id}>
            <GoTo to={subItem.ref}>{subItem.name}</GoTo>
            <Ul>{renderSubItems(subItem.subItems)}</Ul>
        </Li>
    ));

const GoTo = ({
    to,
    children,
}: {
    to: ITreeItems[0]["ref"];
    children: React.ReactNode;
}) => {
    const onClick = React.useCallback(() => {
        if (to.current) {
            window.scrollTo({ top: to.current.offsetTop, behavior: "smooth" });
        }
    }, [to]);

    return <Link onClick={onClick}>{children}</Link>;
};

export default ({ items }: ITreeProps) => {
    const groups = React.useMemo(() => groupItems(items), [items]);
    return (
        <Tree>
            <Ul>
                {_.map(groups, (item) => (
                    <Li key={item.id}>
                        <GoTo to={item.ref}>
                            <b>{item.name}</b>
                        </GoTo>
                        <Ul>{renderSubItems(item.subItems)}</Ul>
                    </Li>
                ))}
            </Ul>
        </Tree>
    );
};
