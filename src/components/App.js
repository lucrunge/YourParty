import React from 'react';
import {Router,
    Route,
} from "react-router-dom";
import history from '../history';
import LoginView from './LoginView';
import MainView from "./MainView";
import "./style.css";


class App extends React.Component {
    state = { token: '', groupId: '', host: '', loggedIn: false};

    getLoginData = async (props) => {
        this.setState({loggedIn: true, token: props.token, groupId: props.token.groupId.data, host: props.token.host} );
        history.replace("/")
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
                            )
                        }
                    />
                    <Route
                        path="/login"
                        component={() => <LoginView onLogin={this.getLoginData} />}
                    />
                    <Route
                        path="/home"
                        component={() => (
                            <MainView
                                token={this.state.token}
                                groupId={this.state.groupId}
                                host={this.state.host}
                            />
                        )}
                    />
                </div>
            </Router>


        )
    }
}

export default App;