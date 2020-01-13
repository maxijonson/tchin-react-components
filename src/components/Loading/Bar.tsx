import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { IBarProps } from "./model";

const Bar = styled(motion.div)`
    width: 100%;
    height: 10px;
    margin: 1px 0;
    position: relative;
`;

const Line = styled(motion.div)`
    background: ${({ theme }) => theme.colors.defaultText};
    width: 100%;
    height: 100%;
    border-radius: 5px;
`;

export default (_props: IBarProps) => (
    <Bar
        animate={{
            paddingRight: ["100%", "60%", "20%", "0%"],
            paddingLeft: ["0%", "20%", "60%", "100%"],
        }}
        transition={{
            duration: 1.25,
            loop: Infinity,
        }}
    >
        <Line />
    </Bar>
);
