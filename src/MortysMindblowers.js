
import React, { Component } from 'react';

import firstMorty from './mortysegments/first.mp4';

class Imgur {
    static URL = 'https://api.imgur.com/3/';
    static CLIENT_ID = 'c848e36012571f2';

    static async gifs() {
        const res = await fetch(`${Imgur.URL}gallery/hot/rising/0`,
                                {headers: { Authorization: `Client-ID ${Imgur.CLIENT_ID}`}}),
              json = await res.json();

        if (json.success) {
            return json.data.filter(({ type }) => ['image/gif', 'video/mp4'].includes(type))
        }else{
            throw new Error(json.data.error);
        }
    }
}

const Video = ({ src, onEnded }) => (
    <video src={src} autoPlay muted onEnded={onEnded} />
)


class MortysMindblowers extends Component {
    state = {
        gifs: [],
        index: 0,
        morty: true
    }

    async componentWillMount() {
        const gifs = await Imgur.gifs();

        this.setState({ gifs });
    }

    get currentGif() {
        const { gifs, index, morty } = this.state;

        return morty ? firstMorty : gifs[index].mp4;
    }

    next() {
        const { index, morty } = this.state;

        this.setState({
            index: morty ? index : index + 1,
            morty: !morty
        });
    }

    render() {
        const { gifs, index } = this.state;

        return (
            <div>
                <h1>Morty's Mindblowers</h1>
                <p>Got {gifs.length} gifs</p>
                <Video src={this.currentGif} onEnded={() => this.next()} />
            </div>
        );
    }
}

export default MortysMindblowers;
