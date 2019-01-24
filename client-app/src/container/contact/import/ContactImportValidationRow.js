import React, { Component } from 'react';

class ContactImportValidationRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let extraClass = '';
        if (this.props.data.prio === 1) {
            extraClass = 'error-row';
        }
        if (this.props.data.prio === 2) {
            extraClass = 'warning-row';
        }
        return (
            <tr className={extraClass}>
                <td>{this.props.data.field ? this.props.data.field : ''}</td>
                <td>{this.props.data.value ? this.props.data.value : ''} </td>
                <td>{this.props.data.line}</td>
                <td>{this.props.data.message}</td>
            </tr>
        );
    }
}

export default ContactImportValidationRow;
