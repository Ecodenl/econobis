import React, { Component } from 'react';

import HoomCampaignsView from './HoomCampaignsView';
import HoomCampaignsEdit from './HoomCampaignsEdit';
import HoomCampaignsDelete from './HoomCampaignsDelete';

class HoomCampaignsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,

            hoomCampaign: {
                ...props.hoomCampaign,
            },
        };
    }

    onLineEnter = () => {
        this.setState({
            showActionButtons: this.props.showEditCooperation ? true : false,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    openEdit = () => {
        this.setState({ showEdit: true });
    };

    closeEdit = () => {
        this.setState({ showEdit: false });
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            hoomCampaign: {
                ...this.props.hoomCampaign,
            },
        });

        this.closeEdit();
    };

    updateResult = hoomCampaign => {
        this.setState({
            ...this.state,
            hoomCampaign: {
                ...hoomCampaign,
            },
        });

        this.closeEdit();
    };

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        return (
            <div>
                <HoomCampaignsView
                    hoomCampaign={this.state.hoomCampaign}
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                />
                {this.state.showEdit && (
                    <HoomCampaignsEdit
                        hoomCampaign={this.state.hoomCampaign}
                        cancelEdit={this.cancelEdit}
                        updateResult={this.updateResult}
                    />
                )}
                {this.state.showDelete && (
                    <HoomCampaignsDelete
                        hoomCampaign={this.state.hoomCampaign}
                        toggleDelete={this.toggleDelete}
                        removeResult={this.props.removeResult}
                    />
                )}
            </div>
        );
    }
}

export default HoomCampaignsItem;
