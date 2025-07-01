import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';

// Functionele wrapper voor de class component
const MailboxesListItemWrapper = props => {
    const navigate = useNavigate();
    return <MailboxesListItem {...props} navigate={navigate} />;
};

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
    }

    onRowLeave() {
        this.setState({
            showActionButtons: false,
            highlightRow: '',
        });
    }

    openItem(id) {
        this.props.navigate(`/mailbox/${id}`);
    }

    render() {
        const {
            id,
            name,
            email,
            incomingServerType,
            incomingServerTypeName,
            outgoingServerType,
            outgoingServerTypeName,
            // username,
            imapHost,
            imapPort,
            smtpHost,
            smtpPort,
            mailgunDomain,
            valid,
            primary,
            isActive,
        } = this.props;
        //todo WM oauth: nog testen en opschonen !!!
        // const usesMailgun = outgoingServerType === 'mailgun';

        return (
            <tr
                className={`${this.state.highlightRow}  ${valid ? '' : 'has-error'}`}
                onDoubleClick={() => this.openItem(id)}
                onMouseEnter={() => this.onRowEnter()}
                onMouseLeave={() => this.onRowLeave()}
            >
                <td>{name}</td>
                <td>{email}</td>
                {/*<td>{username}</td>*/}
                {/*<td>{imapHost}</td>*/}
                {/*<td>{usesMailgun ? 'Ja' : 'Nee'}</td>*/}
                {/*<td>{usesMailgun ? mailgunDomain : smtpHost}</td>*/}
                {incomingServerType === 'imap' ? (
                    <td>
                        {incomingServerTypeName} {imapHost} ({imapPort})
                    </td>
                ) : (
                    <td>{incomingServerTypeName}</td>
                )}
                {outgoingServerType === 'smtp' ? (
                    <td>
                        {outgoingServerTypeName} {smtpHost} ({smtpPort})
                    </td>
                ) : outgoingServerType === 'mailgun' ? (
                    <td>
                        {outgoingServerTypeName} {mailgunDomain}
                    </td>
                ) : (
                    <td>{outgoingServerTypeName}</td>
                )}

                <td>{primary ? 'Primair' : ''}</td>
                <td>{isActive ? 'Ja' : 'Nee'}</td>
                <td>
                    {this.state.showActionButtons ? (
                        <a role="button" onClick={() => this.openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>
        );
    }
}

export default MailboxesListItemWrapper;
