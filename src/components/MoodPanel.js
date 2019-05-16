import React from 'react';

class MoodPanel extends React.Component {
    state = {
        token: this.props.token,
        groupId: this.props.groupId,
        host: this.props.host,
        energyToggle: 0,
        danceToggle: 0,
        hasSubmitted: this.props.hasSubmitted,
        danceToggleValue: 0,
        energyToggleValue: 0
    };

    componentDidMount() {
        setInterval(this.props.setSubmitState.bind(false), 300000)
    };

    getSubmitButtonType = () => {
        return this.state.hasSubmitted ? "ui disabled button" : "ui primary button"
    };

    onSubmit = () => {
        this.props.setSubmitState(true);
    };

    handleEnergyToggle = () => {
        this.state.energyToggleValue ? this.setState({energyToggleValue: 0}) : this.setState({energyToggleValue: 1});
    };

    handleDanceToggle = () => {
        this.state.danceToggleValue ? this.setState({danceToggleValue: 0}) : this.setState({danceToggleValue: 1});
    };


    renderContent = () => {
        return (
            <div className="ui segment search-view">
                <div className="ui two column grid">
                    <div className="row">
                        <div className="column">
                            <div className="ui card" style={{padding: "10px", width: "100%"}}>
                                <div className="inline field">
                                    <div className="ui toggle checkbox">
                                        <input type="checkbox" tabIndex={this.state.danceToggleValue}
                                               onChange={this.handleDanceToggle}/>
                                        <label>Would you like to dance?</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="column">
                            <div className="ui card" style={{padding: "10px", width: "100%"}}>
                                <div className="inline field">
                                    <div className="ui toggle checkbox">
                                        <input type="checkbox" tabIndex={this.state.energyToggleValue}
                                               onChange={this.handleEnergyToggle}/>
                                        <label>Would you like an energetic song?</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="ui horizontal divider">

                    </div>
                </div>

                <button className={this.getSubmitButtonType()} onClick={this.onSubmit}
                        style={{float: "bottom", width: "100%"}}>
                    Submit
                </button>
            </div>
        )
    };

    render() {
        return this.renderContent();
    }
}

export default MoodPanel;