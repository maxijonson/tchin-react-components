import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

interface ILoadingBaseProps {
    /** between 0 and 100 */
    progress?: number;
}

interface ILoadingSpinnerProps extends ILoadingBaseProps {
    type: "spinner";
    size?: number;
}

interface ILoadingBarProps extends ILoadingBaseProps {
    type: "bar";
    size?: never;
}

type ILoadingProps = ILoadingSpinnerProps | ILoadingBarProps;

const Circle = styled(motion.circle)`
    fill: none;
    stroke: ${({ theme }) => theme.colors.defaultText};
    stroke-width: 2;
    stroke-linecap: round;
`;

const Spinner = styled.svg`
    max-width: 100px;
    max-height: 100px;
`;

const SpinnerText = styled.text`
    text-anchor: middle;
    fill: ${({ theme }) => theme.colors.defaultText};
`;

export default (props: ILoadingProps) => {
    switch (props.type) {
        default:
        case "spinner":
            return (
                <Spinner viewBox="0 0 44 44">
                    <Circle
                        animate={{
                            rotate: 360,
                            strokeDasharray: ["1,200", "89,200", "89,200"],
                            strokeDashoffset: [0, -35, -124],
                        }}
                        transition={{
                            duration: 1.5,
                            loop: Infinity,
                            ease: "linear",
                        }}
                        cx="22"
                        cy="22"
                        r="20"
                    />
                    <SpinnerText
                        fontSize={12}
                        x="50%"
                        y="51%"
                        dominantBaseline="middle"
                    >
                        100%
                    </SpinnerText>
                </Spinner>
            );

        case "bar":
            return null;
    }
};
