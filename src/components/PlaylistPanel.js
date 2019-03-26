import React from 'react';
import PlaylistCards from "./PlaylistCards";
import MusicPlayer from "./MusicPlayer";
import yourPartyApi from "../api/YourPartyApi";

class PlaylistPanel extends React.Component {
    state = {
        token: this.props.token,
        groupId: this.props.groupId,
        host: this.props.host,
        playlist: this.props.playlist
    };

    componentDidMount() {
        this.getPlaylist();
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

    render() {
        return (
            <div className="ui segment search-view">
                <div>
                    <h3>Group's playlist:</h3>
                    <MusicPlayer
                        playlist={this.state.playlist}
                        setPlayingTrack={this.props.setPlayingTrack}
                        setPauseTrack={this.props.setPauseTrack}
                    />
                </div>

                <PlaylistCards songs={this.state.playlist} withAddButton={false}></PlaylistCards>
            </div>
        )
    }
}

export default PlaylistPanel;