import React, {Component} from 'react';

import ContactDetailsCampaignView from './ContactDetailsCampaignView';

class ContactDetailsGroupItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightLine: '',
            showEdit: false,

            campaign: {
                ...props.campaign,
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
                <ContactDetailsCampaignView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    campaign={this.state.campaign}
                />
            </div>
        );
    }
};

export default ContactDetailsGroupItem;
