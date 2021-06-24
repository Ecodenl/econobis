import React, { Component } from 'react';

import ContactGroupComposedGroupView from '../ContactGroupComposedGroupView';
import ContactGroupComposedExceptGroupDelete from './ContactGroupComposedExceptGroupDelete';

class ContactGroupComposedExceptGroupItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightLine: '',
            showActionButtons: false,
            showDelete: false,
            composedExceptGroup: {
                ...props.composedExceptGroup,
            },
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
                <ContactGroupComposedGroupView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    showActionButtons={this.state.showActionButtons}
                    composedGroup={this.state.composedExceptGroup}
                />
                {this.state.showDelete && (
                    <ContactGroupComposedExceptGroupDelete
                        closeDeleteItemModal={this.toggleDelete}
                        contactGroupId={this.props.contactGroupId}
                        composedExceptGroup={this.state.composedExceptGroup}
                    />
                )}
            </div>
        );
    }
}

export default ContactGroupComposedExceptGroupItem;
