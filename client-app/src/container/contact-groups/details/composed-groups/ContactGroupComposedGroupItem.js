import React, {Component} from 'react';

import ContactGroupComposedGroupView from './ContactGroupComposedGroupView';
import ContactGroupComposedGroupDelete from './ContactGroupComposedGroupDelete';

class ContactGroupComposedGroupItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightLine: '',
            showActionButtons: false,
            showDelete: false,
            composedGroup: {
                ...props.composedGroup,
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
                <ContactGroupComposedGroupView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    toggleDelete={this.toggleDelete}
                    showActionButtons={this.state.showActionButtons}
                    composedGroup={this.state.composedGroup}
                />
                {
                    this.state.showDelete &&
                    <ContactGroupComposedGroupDelete
                        closeDeleteItemModal={this.toggleDelete}
                        contactGroupId={this.props.contactGroupId}
                        composedGroup={this.state.composedGroup}
                    />
                }
            </div>
        );
    }
};

export default ContactGroupComposedGroupItem;
