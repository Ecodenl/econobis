import React, { Component } from 'react';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';
import ProjectView from '../../details/project/ProjectView';
import ParticipantView from './ParticipantView';
import { hashHistory } from 'react-router';

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
