import React from 'react';
import AuthenticationButton from './AuthenticationButton'

class LoginView extends React.Component {
    onLogin = responseToken => {
        this.props.onLogin( { token: responseToken });

    };

    render() {
        const headerText = "Who's ready for a party?";
        const dividerText = "Make a choice";


        return (
                <div className="login-display">
                    <div className="ui segment" style={{margin: 10}}>
                        <h1 className="ui header">{headerText}</h1>
                        <div className="ui horizontal divider">
                            {dividerText}
                        </div>
                        <div className="ui two buttons">
                            <button className="ui basic black button">Join party</button>
                            <AuthenticationButton onLogin={this.onLogin}/>
                        </div>
                    </div>
                </div>

        )
    }
}

export default LoginView;