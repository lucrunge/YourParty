import React from 'react';

class MoodPanel extends React.Component {
    state = {
        token: this.props.token,
        groupId: this.props.groupId,
        host: this.props.host,
    };


    renderContent = () => {
        return (
            <div className="ui segment search-view">
                <div style={{display: "flex", flexDirection: "column", width: "50%"}}>
                    <div className="ui large buttons">
                        <button className="ui button">Dance</button>
                        <div className="or"></div>
                        <button className="ui button">No dance</button>
                    </div>
                    <div className="ui large buttons">
                        <button className="ui button">Energy</button>
                        <div className="or"></div>
                        <button className="ui button">No energy</button>
                    </div>
                </div>
            </div>
        )
    };

    render() {
        return this.renderContent();
    }
}

export default MoodPanel;