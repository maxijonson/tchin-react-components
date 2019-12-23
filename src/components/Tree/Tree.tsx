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

type IVariants = React.ComponentProps<typeof motion.div>["variants"];

export interface ITreeItem<T> {
    id: string;
    group?: string;
    data: T;
}

export interface ITreeItems<T> {
    [id: string]: ITreeItem<T>;
}

interface IBaseProps<T> {
    items: ITreeItems<T>;
    renderItem?: (item: ITreeItem<T>) => React.ReactNode;
}

interface ICollapsibleTreeProps<T> extends IBaseProps<T> {
    isCollapsible: true;
    initiallyCollapsed?: boolean;
}

interface INonCollapsibleTreeProps<T> extends IBaseProps<T> {
    isCollapsible?: false;
    initiallyCollapsed?: never;
}

export type ITreeProps<T> =
    | ICollapsibleTreeProps<T>
    | INonCollapsibleTreeProps<T>;

interface IGroupedTree<T> {
    [id: string]: ITreeItem<T> & { subItems: IGroupedTree<T> };
}

// Recursively groups items based on their childrenOf property
const groupItems = <T extends {}>(items: ITreeItems<T>, group?: string) =>
    _(items)
        .filter((item) => item.group == group)
        .reduce((acc, item) => {
            acc[item.id] = {
                ...item,
                subItems: groupItems(items, item.id),
            };
            return acc;
        }, {} as IGroupedTree<T>);

// Recursively renders items and their subItems
const renderItems = <T extends {}>(items: IGroupedTree<T>) => (
    <>
        {_.size(items) > 0 && (
            <Ul>
                {_.map(items, (item) => (
                    <Item key={item.id} item={item} />
                ))}
            </Ul>
        )}
    </>
);

const TreeContext = React.createContext<Omit<ITreeProps<any>, "items">>({
    isCollapsible: true,
    initiallyCollapsed: true,
});

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

const Item = <T extends {}>({ item }: { item: IGroupedTree<T>[0] }) => {
    const { id, subItems } = item;
    const { isCollapsible, initiallyCollapsed, renderItem } = React.useContext(
        TreeContext
    );
    const [isCollapsed, setIsCollapsed] = React.useState(
        initiallyCollapsed ?? true
    );
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
            {renderItem ? renderItem(item) : item.id}
            {isCollapsible ? (
                <Collapsible isCollapsed={isCollapsed}>
                    {renderItems(subItems)}
                </Collapsible>
            ) : (
                renderItems(subItems)
            )}
        </Li>
    );
};

export default <T extends {}>({
    items,
    isCollapsible,
    initiallyCollapsed,
    renderItem,
}: ITreeProps<T>) => {
    const groups = React.useMemo(() => groupItems(items), [items]);

    return (
        <TreeContext.Provider
            value={{ isCollapsible, initiallyCollapsed, renderItem }}
        >
            <Tree>{renderItems(groups)}</Tree>
        </TreeContext.Provider>
    );
};
