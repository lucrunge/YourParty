import React from 'react';

function GroupIdPanel(props) {
    return (
        <div style={{marginBottom: "10px"}}>
            <div className="ui grey image label">
                {props.hostName}'s party
                <div className="detail">{props.groupId}</div>
            </div>
        </div>
    )
}

export default GroupIdPanel;