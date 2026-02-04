import React, { Component } from 'react';

import { connect } from 'react-redux';
import TeamDetailsDocumentCreatedFromsView from './TeamDetailsDocumentCreatedFromsView';
import TeamDetailsDocumentCreatedFromsItemDelete from './TeamDetailsDocumentCreatedFromsDelete';

class TeamDetailsDocumentCreatedFromsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,

            documentCreatedFrom: props.documentCreatedFrom,
        };
    }

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
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        return (
            <div>
                <TeamDetailsDocumentCreatedFromsView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    documentCreatedFrom={this.state.documentCreatedFrom}
                />
                {this.state.showDelete && this.props.permissions.createTeam && (
                    <TeamDetailsDocumentCreatedFromsItemDelete
                        toggleDelete={this.toggleDelete}
                        documentCreatedFromId={this.state.documentCreatedFrom.id}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(TeamDetailsDocumentCreatedFromsItem);
