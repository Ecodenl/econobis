import React, { Component } from 'react';

import ContactDetailsGroupView from './ContactDetailsGroupView';

class ContactDetailsGroupItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightLine: '',

            group: {
                ...props.group,
            },
        };
    }

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
                <ContactDetailsGroupView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    group={this.state.group}
                />
            </div>
        );
    }
}

export default ContactDetailsGroupItem;
