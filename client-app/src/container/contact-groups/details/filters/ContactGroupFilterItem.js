import React, { Component } from 'react';

import ContactGroupFilterView from './ContactGroupFilterView';

class ContactGroupFilterItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightLine: '',

            filter: {
                ...props.filter,
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
                <ContactGroupFilterView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    filter={this.state.filter}
                />
            </div>
        );
    }
}

export default ContactGroupFilterItem;
