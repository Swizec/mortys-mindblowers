
import React, { Component } from 'react';

import Morty1 from './mortysegments/1.mp4';
import Morty2 from './mortysegments/2.mp4';
import Morty3 from './mortysegments/3.mp4';
import Morty4 from './mortysegments/4.mp4';
import Morty5 from './mortysegments/5.mp4';
import Morty6 from './mortysegments/6.mp4';
import Morty7 from './mortysegments/7.mp4';
import Morty8 from './mortysegments/8.mp4';
import Morty9 from './mortysegments/9.mp4';

const QUOTES = [
    "I’m sorry, but your opinion means very little to me.",
    "Think for yourselves. Don’t be sheep.",
    "Being nice is something stupid people do to hedge their bets.",
    "Uncertainty is inherently unsustainable. Eventually, everything either is or isn't.",
    "Sometimes science is more art than science, Morty. Lot of people don't get that.",
    "What, so everyone's supposed to sleep every single night now? Y-you realize that nighttime makes up half of all time?",
    "I hate to break it to you, but what people call 'love' is just a chemical reaction that compels animals to breed.",
    "Break the cycle, Morty. Rise above. Focus on science.",
    "Weddings are basically just funerals with cake.",
    "I know that new situations can be intimidating. You lookin' around and it's all scary and different, but y'know... meeting them head-on, charging into 'em like a bull—that's how we grow as people.",
    "Existence is pain.",
    "Just go with the flow...",
    "Get your shit together, get it all together and put it in a backpack. All your shit, so it's together.",
    "Nobody exists on purpose, nobody belongs anywhere, everybody's going to die. Come watch TV.",
    "Wubba Lubba Dub Dub!"
]

class Imgur {
    static URL = 'https://api.imgur.com/3/';
    static CLIENT_ID = 'c848e36012571f2';

    static async gifs(page) {
        const res = await fetch(`${Imgur.URL}gallery/hot/rising/${page}`,
                                {
                                    headers: {
                                        Authorization: `Client-ID ${Imgur.CLIENT_ID}`
                                    },
                                    mode: 'cors'
                                }),
              json = await res.json();

        if (json.success) {
            return json.data.filter(({ type }) => ['image/gif', 'video/mp4'].includes(type))
        }else{
            throw new Error(json.data.error);
        }
    }
}

class Video extends Component {
    componentDidMount() { this.update(); }

    componentDidUpdate() { this.update(); }

    update() {
        this.refs.video.setAttribute('muted', '1');
        this.refs.video.setAttribute('playsinline', '1');
        this.refs.video.setAttribute('autoplay', '1');
    }

    render() {
        const { src, onEnded, onClick } = this.props;

        return (
            <video src={src} autoPlay playsInLine muted onEnded={onEnded} onClick={onClick} ref="video"/>
        )
    }
};

const RickQuotes = () => {
    const quote = QUOTES[Math.floor(Math.random()*QUOTES.length)];

    document.title = quote;

    return (
        <h2 style={{color: 'white', textAlign: 'center'}}>
            {quote}
        </h2>
    )
}

const Skip = ({ onClick }) => (
    <div style={{alignItems: 'center', display: 'flex', flexDirection: 'column'}}>
        <button onClick={onClick}>Skip</button>
    </div>
)


class MortysMindblowers extends Component {
    state = {
        gifs: [],
        index: 0,
        page: 0,
        morty: true
    }

    morties = [ Morty1, Morty2,  Morty3,  Morty4,  Morty5,  Morty6,  Morty7,  Morty8,  Morty9 ]

    componentWillMount() {
        this.getGifs();
    }

    async getGifs() {
        const { page } = this.state,
              gifs = await Imgur.gifs(page);

        this.setState({
            gifs,
            index: 0,
            page: page+1
        });
    }

    get currentGif() {
        const { gifs, index, morty } = this.state;

        return morty ? this.morties[index % this.morties.length] : gifs[index].mp4;
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
            <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
                <RickQuotes />
                <Video src={this.currentGif}
                       onEnded={() => this.next()}
                       onClick={() => !morty ? this.next() : null} />
                {!morty ? <Skip onClick={() => this.next()} /> : null}
            </div>
        );
    }
}

export default MortysMindblowers;
