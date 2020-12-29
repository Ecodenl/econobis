import React, { Component } from 'react';
import ParticipantView from './ParticipantView';

class ParticipantItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightLine: '',
        };
    }

    onLineEnter = () => {
        this.setState({
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            highlightLine: '',
        });
    };

    render() {
        return (
            <div>
                <ParticipantView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    financialOverview={this.props.financialOverview}
                    financialOverviewParticipantProject={this.props.financialOverviewParticipantProject}
                />
            </div>
        );
    }
}

export default ParticipantItem;
