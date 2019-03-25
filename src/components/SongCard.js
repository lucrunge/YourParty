import React from 'react';

class SongCard extends React.Component {

    playSong = () => {
        this.props.onPlay(this.props.uri);
    }

    render() {
        return (

            <div className="ui item">
                <img alt="Album cover" className="ui middle aligned tiny image" src={this.props.coverArt}/>
                <div className="content">
                    <div className="header"> {this.props.name} </div>
                    <div className="description"> {this.props.artists[0].name} </div>
                </div>
                <button className="ui primary button" style={{float: "right"}} onClick={this.playSong}>Play</button>
                <div className="ui fitted divider"></div>
            </div>
        )
    }
};

export default SongCard