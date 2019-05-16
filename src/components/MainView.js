import React from "react";
import {
    Router,
    Route,
    Link
} from "react-router-dom";
import history from "../history";
import spotifyApi from "../api/Spotify";
import yourPartyApi from "../api/YourPartyApi";
import SearchPanel from "./SearchPanel";
import PlaylistPanel from "./PlaylistPanel"
import GroupIdPanel from "./GroupIdPanel";
import MoodPanel from "./MoodPanel";

class MainView extends React.Component {
    state = {
        token: this.props.token,
        groupId: this.props.groupId,
        hostName: this.props.hostName,
        isHost: this.props.isHost,
        isPlaying: false,
        hasSubmitted: false,
        modalIsOpen: false,
        playlist: []
    };

    setPlayState = () => {
        this.state.isPlaying ? this.setState({isPlaying: false}) : this.setState({isPlaying: true});
    };

    setSubmitState = (b) => {
        this.setState({hasSubmitted: b})
        console.log("resetted submit button")
    };

    addSongToPlaylist = async (name, artistName, imageUrl, spotifyUri, spotifyId) => {
        const features = await this.getTrackDetails(spotifyId);
        console.log(features);
        return yourPartyApi(
            {
                url: "/group/add/" + this.state.groupId,
                method: "POST",
                headers: {Authorization: "Bearer " + this.state.token},
                data: {
                    name: name,
                    artistName: artistName,
                    imageUrl: imageUrl,
                    spotifyUri: spotifyUri,
                    spotifyID: spotifyId,
                    danceability: features.danceability,
                    energy: features.energy
                }
            }
        )
    };

    getTrackDetails = async (id) => {
        const features = await spotifyApi.get('/audio-features/' + id, {
            headers: {Authorization: "Bearer " + this.state.token}
        });
        return features.data
    };

    removeFirstSongFromPlaylist = async () => {
        return yourPartyApi(
            {
                url: "/group/removefirst/" + this.state.groupId,
                method: "PUT",
                headers: {Authorization: "Bearer " + this.state.token},
            }
        )
    };

    setPlayingTrack = async (uri) => {
        return spotifyApi(
            {
                url: "/me/player/play",
                method: "PUT",
                headers: {Authorization: "Bearer " + this.state.token},
                data: {"uris": [uri]}
            }
        )
    };

    setPauseTrack = async () => {
        return spotifyApi(
            {
                url: "/me/player/pause",
                method: "PUT",
                headers: {Authorization: "Bearer " + this.state.token},
            }
        )
    };

    toggleModal = () => {
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    componentDidMount() {
        history.push("/home/playlist");
    };

    render() {
        return (
            <Router history={history}>
                <div className="home-display">
                    <div className="ui three item menu" style={{borderRadius: 0}}>
                        <Link className="item" to="/home/playlist">Playlist</Link>
                        <Link className="item" to="/home/search">Search</Link>
                        <Link className="item" to="/home/mood">Mood</Link>
                    </div>

                    <GroupIdPanel hostName={this.state.hostName} groupId={this.state.groupId}/>

                    <div className="item-display">
                        <Route
                            path="/home/search"
                            component={() => (
                                <SearchPanel
                                    token={this.state.token}
                                    groupId={this.state.groupId}
                                    hostName={this.state.hostName}
                                    addSongToPlaylist={this.addSongToPlaylist}
                                />
                            )}
                        />
                        <Route
                            path="/home/playlist"
                            component={() => (
                                <PlaylistPanel
                                    token={this.state.token}
                                    groupId={this.state.groupId}
                                    hostName={this.state.hostName}
                                    isHost={this.state.isHost}
                                    playlist={this.state.playlist}
                                    isPlaying={this.state.isPlaying}
                                    setPlayingTrack={this.setPlayingTrack}
                                    setPauseTrack={this.setPauseTrack}
                                    removeFirstSongFromPlaylist={this.removeFirstSongFromPlaylist}
                                    setPlayState={this.setPlayState}
                                />
                            )}
                        />
                        <Route
                            path="/home/mood"
                            component={() => (
                                <MoodPanel
                                    token={this.state.token}
                                    groupId={this.state.groupId}
                                    hostName={this.state.hostName}
                                    hasSubmitted={this.state.hasSubmitted}
                                    setSubmitState={this.setSubmitState}
                                />
                            )}
                        />
                    </div>
                </div>
            </Router>
        );
    }
}

export default MainView;