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

    getFinancialOverviewPDF(financialOverviewId, contactId) {
        hashHistory.push(`/waardestaat-contact/${financialOverviewId}/${contactId}`);
    }

    render() {
        return (
            <div>
                <ParticipantView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    getFinancialOverviewPDF={this.getFinancialOverviewPDF}
                    financialOverview={this.props.financialOverview}
                    financialOverviewParticipantProject={this.props.financialOverviewParticipantProject}
                />
            </div>
        );
    }
}

export default ParticipantItem;
