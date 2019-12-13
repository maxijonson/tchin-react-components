import styled from "styled-components";

export default styled.div`
    position: relative;
    top: 50%;
    transform: perspective(1px) translateY(-50%);
    text-align: center;
    & > * {
        display: inline-block;
        text-align: initial;
    }
`;
