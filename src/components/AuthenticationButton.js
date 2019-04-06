import React from 'react';
import SpotifyLogin from 'react-spotify-login'

import {clientId, redirectUri} from '../Settings';
import yourPartyApi from "../api/YourPartyApi";
import spotifyApi from "../api/Spotify";


class AuthenticationButton extends React.Component {
    state = {token: '', hostName: '', groupId: ''};

    onSuccess = async response => {
        this.setState({token: response});
        const hostName = await this.getHostName();
        const groupId = await this.createGroup(hostName);
        const token = this.state.token;
        const isHost = true;
        const itemsToPass = {token, hostName, groupId, isHost};
        await this.props.onLogin(itemsToPass)
    };

    onFailure = response => {
        console.error(response);
    };

    getHostName = async () => {
        const user = await spotifyApi.get('/me', {
            headers: {Authorization: "Bearer " + this.state.token.access_token}
        });
        return user.data.display_name;
    };

    createGroup = async (hostName) => {
        const createdGroup = await yourPartyApi(
            {
                url: "/group/create",
                method: "POST",
                data: {
                    "id": "",
                    "hostName": hostName,
                    "token": this.state.token.access_token,
                    "songList": []
                }
            }
        );
        return createdGroup;
    };

    render() {
        return (
            <SpotifyLogin
                className="ui basic green button"
                buttonText="Create party"
                clientId={clientId}
                redirectUri={redirectUri}
                scope={'user-read-currently-playing user-read-playback-state user-modify-playback-state'}
                onSuccess={this.onSuccess}
                onFailure={this.onFailure}/>
        )
    }
}

export default AuthenticationButton
