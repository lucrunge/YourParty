import React from 'react';

class SongCard extends React.Component {
    addSongToPlaylist = () => {
        this.props.addSongToPlaylist(this.props.name, this.props.artists[0].name, this.props.coverArt, this.props.uri, this.props.id);
    };

    render() {
        return (
            <div className="ui item">
                <img alt="Album cover" className="ui middle aligned tiny image" src={this.props.coverArt}/>
                <div className="content">
                    <div className="header" style={{
                        width: "140px",
                        wordWrap: "break-word"
                    }}> {this.props.name} </div>
                    <div className="description" style={{
                        width: "140px",
                        wordWrap: "break-word"
                    }}>{this.props.artists[0].name}</div>
                </div>
                {this.props.withAddButton ?
                    <button className="ui primary button" style={{float: "right", position: "relative"}}
                            onClick={this.addSongToPlaylist}>Add</button> :
                    <div/>
                }
                <div className="ui fitted divider"></div>
            </div>
        )
    }
};

export default SongCard