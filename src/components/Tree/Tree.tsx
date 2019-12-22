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

interface IBaseProps {
    items: ITreeItems;
}

interface ICollapsibleTreeProps extends IBaseProps {
    isCollapsible: true;
    initiallyCollapsed?: boolean;
}

interface INonCollapsibleTreeProps extends IBaseProps {
    isCollapsible?: false;
    initiallyCollapsed?: never;
}

export type ITreeProps = ICollapsibleTreeProps | INonCollapsibleTreeProps;

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
const renderItems = (items: IGroupedTree) => (
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

const TreeContext = React.createContext<Omit<ITreeProps, "items">>({
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

const Item = ({ item }: { item: IGroupedTree[0] }) => {
    const { id, subItems, ref, name } = item;
    const { isCollapsible, initiallyCollapsed } = React.useContext(TreeContext);
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
            <ScrollTo to={ref}>{name}</ScrollTo>
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

export default ({ items, isCollapsible, initiallyCollapsed }: ITreeProps) => {
    const groups = React.useMemo(() => groupItems(items), [items]);

    return (
        <TreeContext.Provider value={{ isCollapsible, initiallyCollapsed }}>
            <Tree>{renderItems(groups)}</Tree>
        </TreeContext.Provider>
    );
};
