import React from 'react';

import '../styles/SongCardList.css'
import SongCard from './SongCard';

class SongCardList extends React.Component {
    state = {addSongToPlaylist: this.props.addSongToPlaylist};

    render() {
        const songs = this.props.songs.map(song => {
            return <SongCard key={song.id}
                             addSongToPlaylist={this.state.addSongToPlaylist}
                             uri={song.uri}
                             id={song.id}
                             name={song.name}
                             artists={song.artists}
                             coverArt={song.album.images[0].url}
                             withAddButton={this.props.withAddButton}/>
        });

        return <div className="ui list song-list">{songs}</div>
    }

};

export default SongCardList