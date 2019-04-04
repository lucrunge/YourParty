import React from 'react';
import PlaylistCardList from "./PlaylistCardList";
import MusicPlayer from "./MusicPlayer";
import yourPartyApi from "../api/YourPartyApi";

class PlaylistPanel extends React.Component {
    state = {
        token: this.props.token,
        groupId: this.props.groupId,
        host: this.props.host,
        isHost: this.props.isHost,
        playlist: this.props.playlist
    };

    componentDidMount() {
        this.getPlaylist();
        setInterval(this.getPlaylist, 5000);
    }

    getPlaylist = async() => {
        const playlist = await yourPartyApi(
            {
                url: "/api/group/playlist/" + this.state.groupId,
                method: "GET",
                headers: { Authorization: "Bearer " + this.state.token },
            }
        );
        this.setState({playlist: playlist.data});
    };

    renderPlayer = () => {
        if (this.state.isHost) {
            return (
                <MusicPlayer
                    playlist={this.state.playlist}
                    setPlayingTrack={this.props.setPlayingTrack}
                    setPauseTrack={this.props.setPauseTrack}
                    removeFirstSongFromPlaylist={this.props.removeFirstSongFromPlaylist}
                    refreshPlaylist={this.getPlaylist}
                    isPlaying={this.props.isPlaying}
                    setPlayState={this.props.setPlayState}
                />
            )
        }
    }

    render() {
        return (
            <div className="ui segment search-view">
                <div>
                    <h3>Group's playlist:</h3>
                    {this.renderPlayer()}
                </div>

                <PlaylistCardList songs={this.state.playlist} withAddButton={false}></PlaylistCardList>
            </div>
        )
    }
}

export default PlaylistPanel;