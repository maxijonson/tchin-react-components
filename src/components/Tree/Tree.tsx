import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Ul from "../Layouts/Ul";
import Li from "../Layouts/Li";
import Collapsible from "../Collapsible/Collapsible";
import Button from "../Button/Button";

type ITreeItem = ITreeItems[0];
type IVariants = React.ComponentProps<typeof motion.div>["variants"];

export interface ITreeItems {
    [id: string]: {
        id: string;
        childrenOf?: string;
        name: React.ReactNode;
        ref: React.RefObject<HTMLElement>;
    };
}

export interface ITreeProps {
    items: ITreeItems;
    isCollapsible?: boolean;
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
const renderItems = (items: IGroupedTree, collapsible?: boolean) => (
    <>
        {_.size(items) > 0 && (
            <Ul>
                {_.map(items, (item) => (
                    <Item
                        key={item.id}
                        item={item}
                        isCollapsible={collapsible}
                    />
                ))}
            </Ul>
        )}
    </>
);

const variants: IVariants = {
    open: {
        rotate: 90,
    },
    closed: {
        rotate: 0,
    },
};

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
    isCollapsible,
}: {
    item: IGroupedTree[0];
    isCollapsible?: boolean;
}) => {
    const { id, subItems, ref, name } = item;
    const [isCollapsed, setIsCollapsed] = React.useState(true);
    return (
        <Li key={id} style={{ paddingBottom: 2, paddingTop: 2 }}>
            <div
                style={{
                    width: "25px",
                    height: "25px",
                    display: "inline-block",
                }}
            >
                {isCollapsible && _.size(subItems) > 0 && (
                    <Button
                        variant="text"
                        noScale
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        style={{
                            padding: 0,
                            margin: 0,
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <motion.div
                            initial={false}
                            animate={isCollapsed ? "closed" : "open"}
                            variants={variants}
                        >
                            <FontAwesomeIcon icon={faCaretRight} />
                        </motion.div>
                    </Button>
                )}
            </div>
            <ScrollTo to={ref}>{name}</ScrollTo>
            {isCollapsible ? (
                <Collapsible isCollapsed={isCollapsed}>
                    {renderItems(subItems, isCollapsible)}
                </Collapsible>
            ) : (
                renderItems(subItems)
            )}
        </Li>
    );
};

export default ({ items, isCollapsible }: ITreeProps) => {
    const groups = React.useMemo(() => groupItems(items), [items]);

    return <Tree>{renderItems(groups, isCollapsible)}</Tree>;
};
