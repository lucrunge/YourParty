import React from 'react';

class MusicPlayer extends React.Component {
    state = {
        isPlaying: false,
        songName: '',
        artistName: ''
    };

    onPlayStopClick = () => {
        if (this.state.isPlaying) {
            this.props.setPauseTrack();
            this.setState({songName: '', artistName: ''})
        } else {
            this.props.setPlayingTrack(this.props.playlist[0].spotifyUri);
            this.setState({songName: this.props.playlist[0].name, artistName: this.props.playlist[0].artistName})
        };
        this.state.isPlaying ? this.setState({isPlaying: false}) : this.setState({isPlaying: true})

    };

    getButtonText() {
        return this.state.isPlaying ? "Pause" : "Play";
    }

    getIcon() {
        return this.state.isPlaying ? "stop" : "play";
    }

    render() {
        return (
            <div className="ui segment">
                <button className="ui compact labeled icon button" onClick={this.onPlayStopClick}>
                    <i className={this.getIcon() + " icon"}></i>
                    {this.getButtonText()}
                </button>
                <div className="content">
                    <div className="ui header">{this.state.songName}</div>
                    <div className="ui meta">{this.state.artistName}</div>
                </div>
            </div>

        )
    }
};

export default MusicPlayer;