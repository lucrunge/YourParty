import React from 'react';
import {Router,
    Route,
    Link
} from "react-router-dom";
import history from '../history';
import spotifyApi from "../api/Spotify";
import yourPartyApi from "../api/YourPartyApi";
import SearchPanel from './SearchPanel';
import PlaylistPanel from './PlaylistPanel'
import GroupIdPanel from "./GroupIdPanel";

class MainView extends React.Component {
    state = {
        token: this.props.token.token.access_token,
        groupId: this.props.groupId,
        host: this.props.host,
        playlist: []
    };

    addSongToPlaylist = async(name, artistName, imageUrl, spotifyUri, spotifyId) => {
        return yourPartyApi(
            {
                url: "/api/group/add/" + this.state.groupId,
                method: "POST",
                headers: { Authorization: "Bearer " + this.state.token },
                data: { name: name,
                        artistName: artistName,
                        imageUrl: imageUrl,
                        spotifyUri: spotifyUri,
                        spotifyID: spotifyId
                }
            }
        )
    };

    setPlayingTrack = async(uri) => {
        return spotifyApi(
            {
                url: "/me/player/play",
                method: "PUT",
                headers: { Authorization: "Bearer " + this.state.token },
                data: { "uris": [uri] }
            }
        )
    };


    setPauseTrack = async() => {
        return spotifyApi(
            {
                url: "/me/player/pause",
                method: "PUT",
                headers: { Authorization: "Bearer " + this.state.token },
            }
        )
    };

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

                    <GroupIdPanel host={this.state.host} groupId={this.state.groupId}/>

                    <div className="item-display">
                    <Route
                        path="/home/search"
                        component={() => (
                            <SearchPanel
                                token={this.state.token}
                                groupId={this.state.groupId}
                                host={this.state.host}
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
                                host={this.state.host}
                                playlist={this.state.playlist}
                                setPlayingTrack={this.setPlayingTrack}
                                setPauseTrack={this.setPauseTrack}
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