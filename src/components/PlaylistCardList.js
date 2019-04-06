import React from 'react';

import '../styles/SongCardList.css'
import SongCard from './SongCard';

class PlaylistCardList extends React.Component {
    render() {
        const songs = this.props.songs.map(song => {
            return <SongCard key={song.spotifyID}
                             uri={song.spotifyUri}
                             id={song.spotifyID}
                             name={song.name}
                             artists={[song.artistName]}
                             coverArt={song.imageUrl}
                             withAddButton={this.props.withAddButton}/>
        });

        return <div className="ui list song-list">{songs}</div>
    }

};

export default PlaylistCardList;