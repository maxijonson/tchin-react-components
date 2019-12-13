import React from "react";
import styled from "styled-components";
import _ from "lodash";
import Ul from "../Layouts/Ul";
import Li from "../Layouts/Li";
import { Link } from "../TextStyles";

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
    font-size: 1em;
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
            window.scrollTo(0, to.current.offsetTop);
        }
    }, [to]);

    return <Link onClick={onClick}>{children}</Link>;
};

export default ({ items }: ITreeProps) => {
    const groups = groupItems(items);
    console.warn(groups);
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
