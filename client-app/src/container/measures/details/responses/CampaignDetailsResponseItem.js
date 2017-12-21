import React, {Component} from 'react';

import CampaignDetailsResponseView from './CampaignDetailsResponseView';
import CampaignDetailsResponseItemDelete from "./CampaignDetailsReponseItemDelete";

class CampaignDetailsResponseItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,

            response: {
                ...props.response,
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

    toggleDelete = () => {
        this.setState({showDelete: !this.state.showDelete});
    };

    render() {
        return (
            <div>
                <CampaignDetailsResponseView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    response={this.state.response}
                />
                {
                    this.state.showDelete &&
                    <CampaignDetailsResponseItemDelete
                        toggleDelete={this.toggleDelete}
                        contactId={this.state.response.contact.id}
                    />
                }
            </div>
        );
    }
};

export default CampaignDetailsResponseItem;
