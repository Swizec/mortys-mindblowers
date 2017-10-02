import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import MortysMindblowers from './MortysMindblowers';

class App extends Component {
    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'column',
                         justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                <MortysMindblowers />
                <p style={{color: 'white', textAlign: 'center'}}>
                    Built by Swizec Teller during a <a href="https://www.youtube.com/watch?v=a4g81widnGM" style={{color: 'white'}}>Livecoding Session</a>. Morty's Mindblowers for gifs from Imgur's frontpage. <a href="https://github.com/Swizec/mortys-mindblowers" style={{color: 'white'}}>Code on Github</a>.
                </p>
            </div>
        );
    }
}

export default App;
