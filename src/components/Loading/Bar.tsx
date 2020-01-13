import React from "react";
import styled from "styled-components";
import _ from "lodash";
import { motion } from "framer-motion";
import { IBarProps } from "./model";
import { fonts } from "../../modules/CSS";

const Bar = styled(motion.div)`
    width: 100%;
    height: 10px;
    margin: 1px 0;
    position: relative;
`;

const Line = styled(motion.div)`
    background: ${({ theme }) => theme.colors.loading};
    width: 100%;
    height: 100%;
    border-radius: 5px;
    text-align: center;
    font-size: 7px;
    color: ${({ theme }) => theme.colors.loadingText};
    overflow: hidden;
    font-family: ${fonts.bitter.family};
    font-weight: 100;
`;

export default (props: IBarProps) => {
    const progress = _.clamp(props.progress ?? 0, 0, 100);
    const hasProgress = props.progress != undefined || props.progress != null;

    return (
        <Bar
            animate={
                hasProgress
                    ? undefined
                    : {
                          paddingRight: ["100%", "60%", "20%", "0%"],
                          paddingLeft: ["0%", "20%", "60%", "100%"],
                      }
            }
            transition={
                hasProgress
                    ? undefined
                    : {
                          duration: 1.25,
                          loop: Infinity,
                      }
            }
        >
            <Line
                transition={
                    hasProgress
                        ? { duration: 0.5, ease: "easeInOut" }
                        : undefined
                }
                animate={hasProgress ? { width: `${progress}%` } : undefined}
            >
                {hasProgress && <b>{progress}%</b>}
            </Line>
        </Bar>
    );
};
