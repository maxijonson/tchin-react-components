import React from "react";
import styled from "styled-components";
import { Layouts } from "../components";
import { Hooks } from "../modules";

const { Viewport, Center, MarginV, Flex } = Layouts;
const { useBackground } = Hooks;

const Card = styled.div`
    width: 20%;
    background: lightgray;
    border: 1px solid black;
    border-radius: 0.15em;
    padding: 1%;
    height: 200px;
`;

export default () => {
    const BGViewport = useBackground(Viewport, "assets/images/notfound-bg.jpg");
    const BGCard = useBackground(Card, "assets/images/notfound-bg.jpg", {
        parallax: false,
        blurAmount: 0,
    });
    return (
        <>
            <BGViewport>
                <Center>Kit</Center>
            </BGViewport>
            <MarginV />
            <Flex>
                <BGCard>
                    <Center>BGCard</Center>
                </BGCard>
                <BGCard>
                    <Center>BGCard</Center>
                </BGCard>
            </Flex>
        </>
    );
};
