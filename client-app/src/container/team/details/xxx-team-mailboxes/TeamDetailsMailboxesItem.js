import React, { Component } from 'react';

import { connect } from 'react-redux';
import TeamDetailsMailboxesView from './TeamDetailsMailboxesView';
import TeamDetailsMailboxesItemDelete from './TeamDetailsMailboxesDelete';

class TeamDetailsMailboxesItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,

            mailbox: props.mailbox,
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
                <TeamDetailsMailboxesView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    mailbox={this.state.mailbox}
                />
                {this.state.showDelete && this.props.permissions.createTeam && (
                    <TeamDetailsMailboxesItemDelete
                        toggleDelete={this.toggleDelete}
                        mailboxId={this.state.mailbox.id}
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

export default connect(mapStateToProps)(TeamDetailsMailboxesItem);
