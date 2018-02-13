import React, {Component} from 'react';

import IntakeDetailsOpportunityView from './IntakeDetailsOpportunityView';

class IntakeDetailsOpportunityItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightLine: '',
            opportunity: {
                ...props.opportunity,
            },
        };
    };

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    render() {
        return (
            <div>
                <IntakeDetailsOpportunityView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    opportunity={this.state.opportunity}
                />
            </div>
        );
    }
};

export default IntakeDetailsOpportunityItem;
