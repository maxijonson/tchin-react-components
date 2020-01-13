import React from "react";
import _ from "lodash";
import styled from "styled-components";
import { motion } from "framer-motion";
import { ISpinnerProps } from "./model";

const Circle = styled(motion.circle)`
    fill: none;
    stroke: ${({ theme }) => theme.colors.loading};
    stroke-width: 2;
    stroke-linecap: round;
`;

const Spinner = styled.svg<{ size: ISpinnerProps["size"] }>`
    max-width: ${({ size }) => size ?? 100}px;
    max-height: ${({ size }) => size ?? 100}px;
`;

const SpinnerText = styled.text`
    text-anchor: middle;
    fill: ${({ theme }) => theme.colors.loading};
`;

const SPINNER_RADIUS = 20;

export default (props: ISpinnerProps) => {
    const c = Math.PI * SPINNER_RADIUS * 2;
    const progress = _.clamp(props.progress ?? 0, 0, 100);
    const percent = ((100 - (progress ?? 0)) / 100) * c;
    const hasProgress = props.progress != undefined || props.progress != null;

    return (
        <Spinner viewBox="0 0 44 44" size={props.size}>
            <Circle
                strokeDasharray={hasProgress ? "125" : undefined}
                animate={
                    hasProgress
                        ? {
                              strokeDashoffset: percent,
                          }
                        : {
                              rotate: 360,
                              strokeDasharray: ["1,200", "89,200", "89,200"],
                              strokeDashoffset: [0, -35, -124],
                          }
                }
                transition={
                    hasProgress
                        ? {
                              duration: 0.5,
                              ease: "easeInOut",
                          }
                        : {
                              duration: 1.5,
                              loop: Infinity,
                              ease: "linear",
                          }
                }
                cx="22"
                cy="22"
                strokeDashoffset={0}
                r={SPINNER_RADIUS}
            />
            {hasProgress && (
                <SpinnerText
                    fontSize={12}
                    x="50%"
                    y="51%"
                    dominantBaseline="middle"
                >
                    {progress}%
                </SpinnerText>
            )}
        </Spinner>
    );
};
