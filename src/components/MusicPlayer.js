import React from 'react';
import '../styles/MusicPlayer.css'
import spotifyApi from "../api/Spotify";

class MusicPlayer extends React.Component {
    state = {
        token: this.props.token,
        isPlaying: this.props.isPlaying,
        songName: 'No song playing',
        artistName: ''
    };

    componentDidMount() {
        setInterval(this.playNextSong, 5000)
    }

    playNextSong = async () => {
        if (this.state.isPlaying) {
            const response = await spotifyApi(
                {
                    url: "/me/player",
                    method: "GET",
                    headers: {Authorization: "Bearer " + this.state.token},
                }
            );
            if (!response.data.is_playing) {
                if (this.props.playlist[0] !== undefined) {
                    this.props.setPlayingTrack(this.props.playlist[0].spotifyUri);
                    await this.props.removeFirstSongFromPlaylist();
                    this.setState({
                        songName: this.props.playlist[0].name,
                        artistName: this.props.playlist[0].artistName
                    });
                    this.props.refreshPlaylist();
                }
            }
        }
    };

    onPlayStopClick = async () => {
        if (this.state.isPlaying) {
            this.props.setPauseTrack();
            this.setState({songName: 'No song playing', artistName: ''})
        } else {
            if (this.props.playlist[0] !== undefined) {
                this.props.setPlayingTrack(this.props.playlist[0].spotifyUri);
                await this.props.removeFirstSongFromPlaylist();
                this.setState({songName: this.props.playlist[0].name, artistName: this.props.playlist[0].artistName})
            }
        }
        ;
        this.state.isPlaying ? this.setState({isPlaying: false}) : this.setState({isPlaying: true})
        this.props.refreshPlaylist();
    };

    getButtonText() {
        return this.state.isPlaying ? "Stop" : "Play";
    }

    getIcon() {
        return this.state.isPlaying ? "stop" : "play";
    }

    render() {
        console.log(this.state.isPlaying)
        return (
            <div className="ui segment music-player">
                <div className="ui vertical labeled icon buttons" style={{width: "120px"}}>
                    <button className="ui compact labeled icon button" onClick={this.onPlayStopClick}>
                        <i className={this.getIcon() + " icon"}></i>
                        {this.getButtonText()}
                    </button>
                    <button className="ui button">
                        <i className="fast forward icon"></i>
                        Next
                    </button>
                </div>
                <div>
                    <p><b>{this.state.songName}</b></p>
                    <p>{this.state.artistName}</p>
                </div>
            </div>

        )
    }
};

export default MusicPlayer;