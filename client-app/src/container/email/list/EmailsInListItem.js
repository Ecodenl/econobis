import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import EmailAPI from '../../../api/email/EmailAPI';
import Icon from 'react-icons-kit';
moment.locale('nl');
import { trash } from 'react-icons-kit/fa/trash';
import { pencil } from 'react-icons-kit/fa/pencil';

// Functionele wrapper voor de class component
const EmailsInListItemWrapper = props => {
    const navigate = useNavigate();
    return <EmailsInListItem {...props} navigate={navigate} />;
};

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
    }

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    }

    openItem(id) {
        this.props.navigate(`/email/${id}`);
    }

    removeEmail(id) {
        EmailAPI.moveToFolder(id, 'removed').then(() => {
            this.props.fetchEmailsData();
        });
    }

    render() {
        const { id, date, mailboxName, from, to, contacts, subject, status, folder, responsibleName } = this.props;

        return (
            <tr
                className={this.state.highlightRow}
                onDoubleClick={() => this.openItem(id)}
                onMouseOver={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{date && moment(date).format('DD-MM-YYYY HH:mm')}</td>
                <td>{mailboxName}</td>
                <td>{from}</td>
                <td>{to && to.map(to => to).join(', ')}</td>
                <td>
                    {contacts && contacts.length > 3
                        ? contacts
                              .slice(0, 3)
                              .map(contact => contact.fullName)
                              .join(', ') +
                          ' ... en nog ' +
                          (contacts.length - 3) +
                          ' andere'
                        : contacts.map(contact => contact.fullName).join(', ')}
                </td>
                <td>{subject}</td>
                {folder === 'inbox' && <td>{status ? status.name : ''}</td>}
                {folder === 'sent' && <td>{'Verzonden'}</td>}
                {folder === 'removed' && <td>{'Verwijderd'}</td>}
                <td>{responsibleName}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                    {this.state.showActionButtons && (folder === 'inbox' || folder === 'sent') ? (
                        <a role="button" onClick={() => this.removeEmail(id)}>
                            <Icon className="mybtn-danger" size={14} icon={trash} />
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

export default EmailsInListItemWrapper;
