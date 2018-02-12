import React, { Component } from "react";

class Video extends Component {
    componentDidMount() {
        this.update();
    }

    componentDidUpdate() {
        this.update();
    }

    update() {
        this.refs.video.setAttribute("muted", "1");
        this.refs.video.setAttribute("playsinline", "1");
        this.refs.video.setAttribute("autoplay", "1");
    }

    render() {
        const { src, onEnded, onClick } = this.props;

        return (
            <video
                src={src}
                autoPlay
                playsInLine
                muted
                onEnded={onEnded}
                onClick={onClick}
                ref="video"
            />
        );
    }
}

export default Video;
