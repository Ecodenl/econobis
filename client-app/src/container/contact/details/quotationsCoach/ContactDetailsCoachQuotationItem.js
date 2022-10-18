import React, { Component } from 'react';

import ContactDetailsCoachQuotationView from './ContactDetailsCoachQuotationView';

class ContactDetailsCoachQuotationItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            highlightLine: '',
            showEdit: false,

            quotation: {
                ...props.quotation,
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

    render() {
        return (
            <div>
                <ContactDetailsCoachQuotationView
                    highlightLine={this.state.highlightLine}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    quotation={this.state.quotation}
                />
            </div>
        );
    }
}

export default ContactDetailsCoachQuotationItem;
