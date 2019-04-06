import React from 'react';
import AuthenticationButton from './AuthenticationButton'

const headerText = "Who's ready for a party?";
const dividerText = "Make a choice";
const headerTextJoin = "Did you bring the drinks?";
const dividerTextJoin = "Enter group code";


class LoginView extends React.Component {

    state = {joiningGroup: false, term: ''};

    onLogin = responseToken => {
        this.props.onLogin({token: responseToken});
    };

    onJoin = () => {
        this.props.onJoin(this.state.term);
    };

    switchToJoining = () => {
        this.setState({joiningGroup: true});
    };

    switchToLogin = () => {
        this.setState({joiningGroup: false});
    };

    renderView = () => {
        if (this.state.joiningGroup === true) {
            return (
                <div>
                    <h1 className="ui header">{headerTextJoin}</h1>
                    <div className="ui horizontal divider">
                        {dividerTextJoin}
                    </div>
                    <div className="ui fluid input">
                        <input
                            value={this.state.term}
                            onChange={(e) => this.setState({term: e.target.value})}
                            type="text"
                            placeholder="e.g. 123456"/>
                    </div>
                    <div className="ui two buttons">
                        <button onClick={this.switchToLogin} className="ui basic black button">Back</button>
                        <button onClick={this.onJoin} className="ui basic green button">Join</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <h1 className="ui header">{headerText}</h1>
                    <div className="ui horizontal divider">
                        {dividerText}
                    </div>
                    <div className="ui two buttons">
                        <button onClick={this.switchToJoining} className="ui basic black button">Join party</button>
                        <AuthenticationButton onLogin={this.onLogin}/>
                    </div>
                </div>
            )
        }
    };

    render() {
        return (
            <div className="login-display">
                <div className="ui segment" style={{margin: 10}}>
                    {this.renderView()}
                </div>
            </div>
        )

    }
}

export default LoginView;