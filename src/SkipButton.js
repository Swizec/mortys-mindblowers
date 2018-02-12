import React from "react";
import styled from "styled-components";

const Centered = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const Skip = ({ onClick }) => (
    <Centered>
        <button onClick={onClick}>Skip</button>
    </Centered>
);

export default Skip;
