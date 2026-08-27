import React, { Component } from 'react';

import PortalFreeFieldsFieldsView from './PortalFreeFieldsFieldsView';
import PortalFreeFieldsFieldsEdit from './PortalFreeFieldsFieldsEdit';
import PortalFreeFieldsFieldsDelete from './PortalFreeFieldsFieldsDelete';

class PortalFreeFieldsFieldsItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,

            portalFreeFieldsField: {
                ...props.portalFreeFieldsField,
            },
        };
    }

    onLineEnter = () => {
        this.setState({
            showActionButtons: this.props.showEditPage ? true : false,
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
            portalFreeFieldsField: {
                ...this.props.portalFreeFieldsField,
            },
        });

        this.closeEdit();
    };

    updateResult = portalFreeFieldsField => {
        this.setState({
            ...this.state,
            portalFreeFieldsField: {
                ...portalFreeFieldsField,
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
                <PortalFreeFieldsFieldsView
                    portalFreeFieldsField={this.state.portalFreeFieldsField}
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                />
                {this.state.showEdit && (
                    <PortalFreeFieldsFieldsEdit
                        portalFreeFieldsField={this.state.portalFreeFieldsField}
                        cancelEdit={this.cancelEdit}
                        updateResult={this.updateResult}
                    />
                )}
                {this.state.showDelete && (
                    <PortalFreeFieldsFieldsDelete
                        portalFreeFieldsField={this.state.portalFreeFieldsField}
                        toggleDelete={this.toggleDelete}
                        removeResult={this.props.removeResult}
                    />
                )}
            </div>
        );
    }
}

export default PortalFreeFieldsFieldsItem;
