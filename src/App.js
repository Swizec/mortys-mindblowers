import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import styled from "styled-components";

import MortysMindblowers from "./MortysMindblowers";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const WhiteP = styled.p`
    color: white;
    textalign: center;
`;

const WhiteA = styled.a`
    color: "white";
`;

class App extends Component {
    render() {
        return (
            <Container>
                <MortysMindblowers />

                <WhiteP>
                    Built by Swizec Teller during a{" "}
                    <WhiteA href="https://www.youtube.com/watch?v=a4g81widnGM">
                        Livecoding Session
                    </WhiteA>. Morty's Mindblowers for gifs from Imgur's
                    frontpage.{" "}
                    <WhiteA href="https://github.com/Swizec/mortys-mindblowers">
                        Code on Github
                    </WhiteA>.
                </WhiteP>
            </Container>
        );
    }
}

export default App;
