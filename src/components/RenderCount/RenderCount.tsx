import React from "react";
import styled from "styled-components";
import { Hooks } from "../../modules";

const { useUpdateEffect, useForceUpdate } = Hooks;

const RenderCount = styled.div`
    display: inline-block;
    background-color: ${({ theme }) => theme.colors.renderCount};
    padding: 2px 4px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.defaultText};
    color: ${({ theme }) => theme.colors.defaultText};
    cursor: pointer;
`;

export default React.memo(
    () => {
        const count = React.useRef(0);
        const forceUpdate = useForceUpdate();

        useUpdateEffect(() => {
            count.current += 1;
        });

        const onClick = React.useCallback(() => {
            count.current = 0;
            forceUpdate();
        }, [forceUpdate]);

        return <RenderCount children={count.current} onClick={onClick} />;
    },
    () => false
);
