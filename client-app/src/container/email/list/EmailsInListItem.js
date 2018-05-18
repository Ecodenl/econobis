import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';
import EmailAPI from "../../../api/email/EmailAPI";
moment.locale('nl');

class EmailsInListItem extends Component {
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
        hashHistory.push(`/email/${id}`);
    };

    removeEmail(id){
        EmailAPI.moveToFolder(id, 'removed').then(() => {
            this.props.refreshData();
        });
    }

    render() {
        const { id, date, mailboxName, from, to, contacts, subject, status, folder, responsibleName } = this.props;

        return (
            <tr className={this.state.highlightRow} onDoubleClick={() => this.openItem(id)} onMouseEnter={() => this.onRowEnter()} onMouseLeave={() => this.onRowLeave()}>
                <td>{ date && moment(date.date).format('L')}</td>
                <td>{ mailboxName }</td>
                <td>{ from }</td>
                <td>{ to && to.map((to) => to).join(', ')}</td>
                <td>{ contacts && contacts.map((contact) => contact.fullName).join(', ')}</td>
                <td>{ subject }</td>
                {folder === 'inbox' ?
                    <td>{status ? status.name : ''}</td>
                    :
                    <td>{"Verzonden"}</td>
                }
                <td>{ responsibleName }</td>
                <td>
                    {(this.state.showActionButtons ? <a role="button" onClick={() => this.openItem(id)}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                    {(this.state.showActionButtons && (folder === 'inbox' || folder === 'sent') ? <a role="button" onClick={() => this.removeEmail(id)}><span className="glyphicon glyphicon-trash mybtn-danger"/> </a> : '')}
                </td>
            </tr>
        );
    }
}

export default EmailsInListItem;