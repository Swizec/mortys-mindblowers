import React, { Component } from "react";

import Morty1 from "./mortysegments/1.mp4";
import Morty2 from "./mortysegments/2.mp4";
import Morty3 from "./mortysegments/3.mp4";
import Morty4 from "./mortysegments/4.mp4";
import Morty5 from "./mortysegments/5.mp4";
import Morty6 from "./mortysegments/6.mp4";
import Morty7 from "./mortysegments/7.mp4";
import Morty8 from "./mortysegments/8.mp4";
import Morty9 from "./mortysegments/9.mp4";

import RickQuotes from "./RickQuotes";
import Video from "./Video";
import Skip from "./SkipButton";
import ImgurAPI from "./ImgurAPI";

class MortysMindblowers extends Component {
    state = {
        gifs: [],
        index: 0,
        page: 0,
        morty: true
    };

    morties = [
        Morty1,
        Morty2,
        Morty3,
        Morty4,
        Morty5,
        Morty6,
        Morty7,
        Morty8,
        Morty9
    ];

    componentWillMount() {
        this.getGifs();
    }

    async getGifs() {
        const { page } = this.state,
            gifs = await ImgurAPI.gifs(page);

        this.setState({
            gifs,
            index: 0,
            page: page + 1
        });
    }

    get currentGif() {
        const { gifs, index, morty } = this.state;

        return morty
            ? this.morties[index % this.morties.length]
            : gifs[index].mp4;
    }

    next() {
        const { index, morty, gifs } = this.state;

        if (index + 1 == gifs.length) {
            this.getGifs();
        }

        this.setState({
            index: morty ? index : index + 1,
            morty: !morty
        });
    }

    render() {
        const { gifs, index, morty } = this.state;

        return (
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                <RickQuotes />
                <Video
                    src={this.currentGif}
                    onEnded={() => this.next()}
                    onClick={() => (!morty ? this.next() : null)}
                />
                {!morty ? <Skip onClick={() => this.next()} /> : null}
            </div>
        );
    }
}

export default MortysMindblowers;
