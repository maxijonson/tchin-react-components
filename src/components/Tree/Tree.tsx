import React from "react";
import styled from "styled-components";
import _ from "lodash";
import shortid from "shortid";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Ul from "../Layouts/Ul";
import Li from "../Layouts/Li";
import Collapsible, { toggleCollapsible } from "../Collapsible/Collapsible";
import Button from "../Button/Button";

export interface ITreeItems {
    [id: string]: {
        id: string;
        childrenOf?: string;
        name: React.ReactNode;
        ref: React.RefObject<HTMLElement>;
    };
}

type ITreeItem = ITreeItems[0];

export interface ITreeProps {
    items: ITreeItems;
    collapsible?: boolean;
}

interface IGroupedTree {
    [id: string]: ITreeItem & { subItems: IGroupedTree };
}

// Recursively groups items based on their childrenOf property
const groupItems = (items: ITreeItems, group?: string) =>
    _(items)
        .filter((item) => item.childrenOf == group)
        .reduce((acc, item) => {
            acc[item.id] = {
                ...item,
                subItems: groupItems(items, item.id),
            };
            return acc;
        }, {} as IGroupedTree);

// Recursively renders items and their subItems
const renderItems = (items: IGroupedTree, collapsibleId?: string) => (
    <>
        {_.size(items) > 0 && (
            <Ul>
                {_.map(items, (item) => (
                    <Item
                        key={item.id}
                        item={item}
                        collapsibleId={collapsibleId}
                    />
                ))}
            </Ul>
        )}
    </>
);

const Tree = styled.div`
    padding-top: 10px;
    font-size: 1em;

    & > ul > li > a {
        font-weight: bold;
    }
`;

const ScrollTo = ({
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

    return (
        <Button
            variant="text"
            onClick={onClick}
            style={{ padding: "5px", margin: 0 }}
            noScale
        >
            {children}
        </Button>
    );
};

const Item = ({
    item,
    collapsibleId,
}: {
    collapsibleId?: string;
    item: IGroupedTree[0];
}) => {
    const { id, subItems, ref, name } = item;
    return (
        <Li key={id} style={{ paddingBottom: 2, paddingTop: 2 }}>
            <div
                style={{
                    width: "25px",
                    height: "25px",
                    display: "inline-block",
                }}
            >
                {collapsibleId && _.size(subItems) > 0 && (
                    <Button
                        variant="text"
                        noScale
                        onClick={() =>
                            toggleCollapsible(`tree-${collapsibleId}-${id}`)
                        }
                        style={{
                            padding: 0,
                            margin: 0,
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <motion.span>
                            <FontAwesomeIcon icon={faCaretRight} />
                        </motion.span>
                    </Button>
                )}
            </div>
            <ScrollTo to={ref}>{name}</ScrollTo>
            {collapsibleId ? (
                <Collapsible id={`tree-${collapsibleId}-${id}`}>
                    {renderItems(subItems, collapsibleId)}
                </Collapsible>
            ) : (
                renderItems(subItems)
            )}
        </Li>
    );
};

export default ({ items, collapsible }: ITreeProps) => {
    const groups = React.useMemo(() => groupItems(items), [items]);
    const collapsibleId = React.useMemo(
        () => (collapsible ? shortid.generate() : undefined),
        [collapsible]
    );

    return <Tree>{renderItems(groups, collapsibleId)}</Tree>;
};
