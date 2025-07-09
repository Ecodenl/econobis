import React, { Component } from 'react';

import CleanupItemView from './CleanupItemView';
import CleanupItemEdit from './CleanupItemEdit';

class CleanupItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,

            cleanupItem: {
                ...props.cleanupItem,
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
            cleanupItem: {
                ...this.props.cleanupItem,
            },
        });

        this.closeEdit();
    };

    updateResult = cleanupItem => {
        this.setState({
            ...this.state,
            cleanupItem: {
                ...cleanupItem,
            },
        });

        this.closeEdit();
    };

    render() {
        return (
            <div>
                <CleanupItemView
                    cleanupItem={this.state.cleanupItem}
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                />
                {this.state.showEdit && (
                    <CleanupItemEdit
                        cleanupItem={this.state.cleanupItem}
                        cancelEdit={this.cancelEdit}
                        updateResult={this.updateResult}
                    />
                )}
            </div>
        );
    }
}

export default CleanupItem;
