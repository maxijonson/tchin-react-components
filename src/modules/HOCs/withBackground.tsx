import React from "react";
import styled from "styled-components";
import Background from "../../components/Background/Background";

type IBackgroundProps = { children: React.ReactNode } & ComponentProps<
    typeof Background
>;

export default (Component: React.ElementType) => {
    const StyledComponent = styled(Component)`
        position: relative;
        overflow: hidden;
    `;
    return ({ children, ...backgroundProps }: IBackgroundProps) => (
        <StyledComponent>
            <Background {...backgroundProps} />
            {children}
        </StyledComponent>
    );
};
