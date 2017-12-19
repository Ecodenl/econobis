import React, {Component} from 'react';

import CampaignDetailsOrganisationView from './CampaignDetailsOrganisationView';
import CampaignDetailsOrganisationItemDelete from "./CampaignDetailsOrganisationItemDelete";

class CampaignDetailsOrganisationNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,

            organisation: {
                ...props.organisation,
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
                <CampaignDetailsOrganisationView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    organisation={this.state.organisation}
                />
                {
                    this.state.showDelete &&
                    <CampaignDetailsOrganisationItemDelete
                        toggleDelete={this.toggleDelete}
                        organisationId={this.state.organisation.id}
                    />
                }
            </div>
        );
    }
};

export default CampaignDetailsOrganisationNew;
