import React from "react";
import styled from "styled-components";
import _ from "lodash";
import shortid from "shortid";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Ul from "../Layouts/Ul";
import Li from "../Layouts/Li";
import { Link } from "../TextStyles";
import { THEME_TRANSITION_TIME } from "../../config";
import Collapsible, { toggleCollapsible } from "../Collapsible/Collapsible";
import BaseButton from "../Button/Button";

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

const Button = styled(BaseButton)`
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
`;

const Tree = styled.div`
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

    return <Link onClick={onClick}>{children}</Link>;
};

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
                {_.map(items, ({ id, ref, name, subItems }) => (
                    <Li key={id}>
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
                                    onClick={() =>
                                        toggleCollapsible(
                                            `tree-${collapsibleId}-${id}`
                                        )
                                    }
                                >
                                    <FontAwesomeIcon icon={faCaretRight} />
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
                ))}
            </Ul>
        )}
    </>
);

export default ({ items, collapsible }: ITreeProps) => {
    const groups = React.useMemo(() => groupItems(items), [items]);
    const collapsibleId = React.useMemo(
        () => (collapsible ? shortid.generate() : undefined),
        [collapsible]
    );

    return <Tree>{renderItems(groups, collapsibleId)}</Tree>;
};
