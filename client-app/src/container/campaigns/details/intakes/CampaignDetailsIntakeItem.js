import React, {Component} from 'react';

import CampaignDetailsIntakeView from './CampaignDetailsIntakeView';

class CampaignDetailsIntakeItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightLine: '',

            intake: {
                ...props.intake,
            },
        };
    };

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
                <CampaignDetailsIntakeView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    intake={this.state.intake}
                />
            </div>
        );
    }
};

export default CampaignDetailsIntakeItem;
