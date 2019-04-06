import React from 'react';
import {
    Router,
    Route,
} from "react-router-dom";
import history from '../history';
import LoginView from './LoginView';
import MainView from './MainView';
import yourPartyApi from '../api/YourPartyApi'
import "../styles/style.css";


class App extends React.Component {
    state = {token: '', groupId: '', hostName: '', isHost: false, loggedIn: false};

    getLoginData = async (props) => {
        this.setState({
            loggedIn: true,
            token: props.token.token.access_token,
            groupId: props.token.groupId.data,
            hostName: props.token.hostName,
            isHost: props.token.isHost
        });
        history.replace("/");
    };

    getJoinData = async (groupId) => {
        const group = await yourPartyApi.get('/group/' + groupId);
        console.log(group)
        this.setState({
            loggedIn: true,
            token: group.data.token,
            hostName: group.data.hostName,
            groupId: group.data.id,
            isHost: false
        });
        console.log(this.state.hostName)
        history.replace("/");
    };

    render() {
        return (
            <Router history={history}>
                <div className="background">
                    <Route
                        exact
                        path="/"
                        render={() =>
                            !this.state.loggedIn ? (
                                history.replace("/login")
                            ) : (
                                history.replace("/home")
                            )}
                    />
                    <Route
                        path="/login"
                        component={() => <LoginView onLogin={this.getLoginData} onJoin={this.getJoinData}/>}
                    />
                    <Route
                        path="/home"
                        render={() =>
                            this.state.loggedIn ? (
                                <MainView
                                    token={this.state.token}
                                    groupId={this.state.groupId}
                                    hostName={this.state.hostName}
                                    isHost={this.state.isHost}
                                />
                            ) : (
                                history.replace("/")

                            )}
                    />
                </div>
            </Router>


        )
    }
}

export default App;