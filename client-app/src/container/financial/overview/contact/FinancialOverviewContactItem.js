import React, { Component } from 'react';
import FinancialOverviewContactView from './FinancialOverviewContactView';
import { hashHistory } from 'react-router';

class FinancialOverviewContactItem extends Component {
    constructor(props) {
        super(props);
        //todo WM: opschonen log
        // console.log('FinancialOverviewContactItem');
        // console.log(props);

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
        hashHistory.push(`/waardestaat-contact/preview/${financialOverviewId}/${contactId}`);
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
