import React, {Component} from 'react';

import ContactGroupComposedGroupView from './ContactGroupComposedGroupView';

class ContactGroupComposedGroupItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightLine: '',

            composedGroup: {
                ...props.composedGroup,
            },
        };
    };

    onLineEnter = () => {
        this.setState({
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            highlightLine: '',
        });
    };

    render() {
        return (
            <div>
                <ContactGroupComposedGroupView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    composedGroup={this.state.composedGroup}
                />
            </div>
        );
    }
};

export default ContactGroupComposedGroupItem;
