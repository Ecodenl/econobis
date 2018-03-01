import React, {Component} from 'react';

import CampaignDetailsOpportunityView from './CampaignDetailsOpportunityView';

class CampaignDetailsOpportunityItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
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
                <CampaignDetailsOpportunityView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    opportunity={this.state.opportunity}
                />
            </div>
        );
    }
};

export default CampaignDetailsOpportunityItem;
