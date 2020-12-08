import React, { Component } from 'react';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';
import ProjectView from '../../details/project/ProjectView';
import ParticipantView from './ParticipantView';

class ParticipantItem extends Component {
    constructor(props) {
        super(props);
        // todo WM: opschonen log regels
        console.log('ParticipantItem');
        console.log(props);

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
                    financialOverviewProject={this.props.financialOverviewParticipantProject}
                />
            </div>
        );
    }
}

export default ParticipantItem;
