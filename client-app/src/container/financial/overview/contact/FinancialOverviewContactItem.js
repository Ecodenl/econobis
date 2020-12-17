import React, { Component } from 'react';
import FinancialOverviewContactView from './FinancialOverviewContactView';
import { hashHistory } from 'react-router';

class FinancialOverviewContactItem extends Component {
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

    getFinancialOverviewPDF(financialOverviewContactId) {
        hashHistory.push(`/waardestaat-contact/preview/${financialOverviewContactId}`);
    }

    render() {
        return (
            <div>
                <FinancialOverviewContactView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    getFinancialOverviewPDF={this.getFinancialOverviewPDF}
                    financialOverview={this.props.financialOverview}
                    financialOverviewContact={this.props.financialOverviewContact}
                />
            </div>
        );
    }
}

export default FinancialOverviewContactItem;
