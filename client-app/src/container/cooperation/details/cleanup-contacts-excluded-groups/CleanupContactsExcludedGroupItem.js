import React, { Component } from 'react';

import CleanupContactsExcludedGroupView from './CleanupContactsExcludedGroupView';
import CleanupContactsExcludedGroupDelete from './CleanupContactsExcludedGroupDelete';

class CleanupContactsExcludedGroupItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showDelete: false,

            cleanupContactsExcludedGroup: {
                ...props.cleanupContactsExcludedGroup,
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

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    render() {
        return (
            <div>
                <CleanupContactsExcludedGroupView
                    cleanupContactsExcludedGroup={this.state.cleanupContactsExcludedGroup}
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                />
                {this.state.showDelete && (
                    <CleanupContactsExcludedGroupDelete
                        cleanupContactsExcludedGroup={this.state.cleanupContactsExcludedGroup}
                        toggleDelete={this.toggleDelete}
                        removeResult={this.props.removeResult}
                    />
                )}
            </div>
        );
    }
}

export default CleanupContactsExcludedGroupItem;
