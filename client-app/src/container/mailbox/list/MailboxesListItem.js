import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

class MailboxesListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightRow: '',
        };
    }

    onRowEnter() {
        this.setState({
            showActionButtons: true,
            highlightRow: 'highlight-row',
        });
    };

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    };

    openItem(id) {
        hashHistory.push(`/mailbox/${id}`);
    };

    render() {
        const { id, name, email, username, imapHost, smtpHost, valid } = this.props;

        return (
            <tr className={`${this.state.highlightRow}  ${valid ? '' : 'has-error'}`} onDoubleClick={() => this.openItem(id)} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
                <td>{ name }</td>
                <td>{ email }</td>
                <td>{ username }</td>
                <td>{ imapHost }</td>
                <td>{ smtpHost }</td>
                <td>
                    {(this.state.showActionButtons ? <a role="button" onClick={() => this.openItem(id)}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                </td>
            </tr>
        );
    }
}

export default MailboxesListItem;