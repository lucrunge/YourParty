import React from 'react';
import SearchPanel from './SearchPanel';
import {Router,
    Route,
    Link
} from "react-router-dom";
import history from '../history';

class MainView extends React.Component {
    state = {
        token: this.props.token.token.access_token,
        groupId: this.props.groupId,
        host: this.props.host,
    };

    addSongToPlaylist = async() => {

    }

    componentDidMount() {
        console.log(this.state.host)
        history.push("/home/playlist");
    }

    render() {
        return (
            <Router history={history}>
                <div className="home-display">
                    <div className="ui three item menu" style={{borderRadius: 0}}>
                        <Link className="item" to="/home/playlist">Playlist</Link>
                        <Link className="item" to="/home/search">Search</Link>
                        <Link className="item" to="/home/mood">Mood</Link>
                    </div>
                    <div style={{marginBottom: "10px"}}>
                        <div className="ui grey image label">
                                {this.state.host.display_name}'s party
                                <div className="detail">{this.state.groupId}</div>
                        </div>
                    </div>
                    <div className="item-display">
                    <Route
                        path="/home/search"
                        component={() => (
                            <SearchPanel
                                token={this.state.token}
                                groupId={this.state.groupId}
                                host={this.state.host}
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