import React, { Component } from 'react';

import { connect } from 'react-redux';
import TeamDetailsContactGroupsView from './TeamDetailsContactGroupsView';
import TeamDetailsContactGroupsItemDelete from './TeamDetailsContactGroupsDelete';

class TeamDetailsContactGroupsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,

            contactGroup: props.contactGroup,
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
                <TeamDetailsContactGroupsView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    contactGroup={this.state.contactGroup}
                />
                {this.state.showDelete && this.props.permissions.createTeam && (
                    <TeamDetailsContactGroupsItemDelete
                        toggleDelete={this.toggleDelete}
                        contactGroupId={this.state.contactGroup.id}
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

export default connect(mapStateToProps)(TeamDetailsContactGroupsItem);
