import React from 'react';
import spotifyApi from '../api/Spotify';

import SongCardList from './SongCardList';
import SearchBar from './SearchBargi';

class SearchPanel extends React.Component {
    state = {
        token: this.props.token,
        groupId: this.props.groupId,
        host: this.props.host,
        results: []
    };

    getTrack = async(term) => {
        const trackResponse = await spotifyApi.get('/search', {
            params: { q: term, type: "track" },
            headers: { Authorization: "Bearer " + this.state.token}
        });
        this.setState({results: trackResponse.data.tracks.items})
    };

    getTrackDetails = async() => {
        return await spotifyApi.get('/audio-features/' + this.state.results[0].id, {
            headers: { Authorization: "Bearer " + this.state.token}
        });
    };

    getCurrentPlayingTrack = async() => {
        return await spotifyApi.get('/me/player/currently-playing', {
            headers: { Authorization: "Bearer " + this.state.token}
        });
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

    testApi = async (term) => {
        await this.getTrack(term);
        await this.getTrackDetails();
        await this.getCurrentPlayingTrack();
    };

    renderContent = () => {
        return (
                <div className="ui segment search-view">
                    <SearchBar onSubmit={this.testApi}/>
                    <SongCardList onPlay={this.setPlayingTrack} songs={this.state.results}></SongCardList>
                </div>
        )
    };

    render() {
        return this.renderContent();
    }
}

export default SearchPanel;