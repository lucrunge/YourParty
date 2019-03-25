import React from 'react';

import './SongCardList.css'
import SongCard from './SongCard';

class SongCardList extends React.Component {
    state = { onPlay: this.props.onPlay}
    render() {
        const songs = this.props.songs.map(song => {
            return <SongCard key={song.id} onPlay={this.state.onPlay} uri={song.uri} name={song.name} artists={song.artists} coverArt={song.album.images[0].url}/>
        });

        return <div className="ui list song-list" >{songs}</div>
    }

};

export default SongCardList