import React from "react";
import styled from "styled-components";
import { Block, AdvancedCard } from "../components";

const AltBlock = styled(Block)`
    background: ${({ theme }) => theme.colors.altPageBackground};
    color: ${({ theme }) => theme.colors.defaultText};
`;

export default () => {
    return (
        <AltBlock>
            <AdvancedCard title="KitPage">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum,
                quod. Architecto, facere. Vitae nobis mollitia voluptates maxime
                quis enim ad delectus veritatis maiores voluptas. Reiciendis
                quaerat vel mollitia sunt accusamus.
            </AdvancedCard>
        </AltBlock>
    );
};
