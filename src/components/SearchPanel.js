import React from 'react';
import spotifyApi from '../api/Spotify';

import SongCardList from './SongCardList';
import SearchBar from './SearchBar';

class SearchPanel extends React.Component {
    state = {
        token: this.props.token,
        groupId: this.props.groupId,
        host: this.props.host,
        results: []
    };

    getTracks = async (term) => {
        const trackResponse = await spotifyApi.get('/search', {
            params: {q: term, type: "track"},
            headers: {Authorization: "Bearer " + this.state.token}
        });
        this.setState({results: trackResponse.data.tracks.items})
    };

    onSubmit = async (term) => {
        await this.getTracks(term);
    };

    renderContent = () => {
        return (
            <div className="ui segment search-view">
                <SearchBar onSubmit={this.onSubmit}/>
                <SongCardList addSongToPlaylist={this.props.addSongToPlaylist} songs={this.state.results}
                              withAddButton={true}></SongCardList>
            </div>
        )
    };

    render() {
        return this.renderContent();
    }
}

export default SearchPanel;