import React, { useEffect, useState } from 'react';
import moment from 'moment/moment';
import Icon from 'react-icons-kit';
import { paperclip } from 'react-icons-kit/fa/paperclip';
import { trash } from 'react-icons-kit/fa/trash';
import EmailSplitViewBulkEditModal from './EmailSplitViewBulkEditModal';
import EmailGenericAPI from '../../../api/email/EmailGenericAPI';
import { getStatusIcon } from '../../../helpers/EmailStatusHelpers';

export default function EmailSplitViewSelectList({
    emails,
    folder,
    emailCount,
    fetchMoreEmails,
    selectedEmailId,
    setSelectedEmailId,
    onUpdated,
    multiselectEnabled,
    setMultiselectEnabled,
}) {
    const [selectedEmailIds, setSelectedEmailIds] = useState([]);

    const getTitle = () => {
        switch (folder) {
            case 'inbox':
                return 'Inbox';
            case 'sent':
                return 'Verzonden';
            case 'concept':
                return 'Concepten';
            case 'removed':
                return 'Verwijderd';
            default:
                return 'Onbekend';
        }
    };

    const selectEmail = email => {
        localStorage.setItem('lastOpenedEmailId', email.id);

        setSelectedEmailId(email.id);
    };

    const toggleSelectedEmail = email => {
        if (selectedEmailIds.includes(email.id)) {
            setSelectedEmailIds(selectedEmailIds.filter(id => id !== email.id));
        } else {
            setSelectedEmailIds([...selectedEmailIds, email.id]);
        }
    };

    const toggleSelectAll = () => {
        if (selectedEmailIds.length === emails.length) {
            setSelectedEmailIds([]);
        } else {
            setSelectedEmailIds(emails.map(email => email.id));
        }
    };

    const doDelete = () => {
        if (folder !== 'removed') {
            EmailGenericAPI.updateMultiple(selectedEmailIds, { folder: 'removed' }).then(() => {
                setSelectedEmailIds([]);
                onUpdated();
            });

            return;
        }

        if (!confirm('Weet je zeker dat je deze e-mails permanent wilt verwijderen?')) {
            return;
        }

        EmailGenericAPI.deleteMultiple(selectedEmailIds).then(() => {
            setSelectedEmailIds([]);
            onUpdated();
        });
    };

    const onUpdatedBulkEmails = () => {
        setSelectedEmailIds([]);
        setMultiselectEnabled(false);

        onUpdated();
    };

    const getEmailDate = email => {
        if (email.folder === 'concept') {
            return email.createdAt && moment(email.createdAt).format('DD-MM-YYYY HH:mm');
        }

        return email.date && moment(email.date).format('DD-MM-YYYY HH:mm');
    };

    const getEmailaddressToBeDisplayed = email => {
        if (email.folder === 'sent') {
            if (email.to.length === 0) {
                return 'Geen ontvanger';
            } else if (email.to.length === 1) {
                return email.to[0];
            } else {
                return email.to[0] + ' (+' + (email.to.length - 1) + ')';
            }
        }

        return email.from;
    };

    const getUserToBeDisplayed = email => {
        if (email.folder === 'sent') {
            return email.sentByUserName;
        }

        return email.responsibleName;
    };

    useEffect(() => {
        if (selectedEmailId) {
            return;
        }

        if (emails.length === 0) {
            return;
        }

        let lastOpenedEmailIndex = emails.findIndex(
            email => email.id === parseInt(localStorage.getItem('lastOpenedEmailId'))
        );

        selectEmail(emails[lastOpenedEmailIndex === -1 ? 0 : lastOpenedEmailIndex]);
    }, [emails]);

    useEffect(() => {
        setSelectedEmailIds([]);
        setMultiselectEnabled(false);
    }, [folder]);

    const handleScroll = e => {
        /**
         * E-mails bijladen als we onderaan de lijst gescrolld zijn
         */
        const hitBottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 10; // Komt niet altijd exact op 0, dus kleine marge inbouwen.

        if (!hitBottom) {
            return;
        }

        // if (emails.length == 0) {
        //     return;
        // }
        if (emails.length >= emailCount) {
            return;
        }

        fetchMoreEmails();
    };

    return (
        <div className="panel panel-default">
            <div
                className="panel-body panel-small"
                style={{ height: 'calc(100vh - 190px)', overflow: 'auto' }}
                onScroll={handleScroll}
            >
                {multiselectEnabled && (
                    <div className="row">
                        <div className="col-xs-12" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div
                                style={{ flex: 'none', display: 'flex', marginLeft: '6px', alignItems: 'center' }}
                                onClick={toggleSelectAll}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedEmailIds.length === emails.length}
                                    style={{ marginRight: '5px' }}
                                />
                                Selecteer alles
                            </div>
                            <div className="btn-group margin-small" role="group">
                                <EmailSplitViewBulkEditModal
                                    emailIds={selectedEmailIds}
                                    onSaved={onUpdatedBulkEmails}
                                />
                                <button
                                    type="button"
                                    title="Verwijderen"
                                    className={'btn btn-sm ' + (folder === 'removed' ? 'btn-danger' : 'btn-success')}
                                    onClick={doDelete}
                                >
                                    <Icon icon={trash} size={13} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                <table className="table table-condensed table-hover table-striped col-xs-12">
                    <thead>
                        <tr className="thead-title">
                            <th>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <div>
                                        {/*{getTitle()} ({emails.length})*/}
                                        {getTitle()} ({emailCount})
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {emails.length === 0 ? (
                            <tr>
                                <td>Geen e-mails gevonden!</td>
                            </tr>
                        ) : (
                            emails.map(email => (
                                <tr key={email.id} style={{ cursor: 'pointer' }}>
                                    <td
                                        style={{
                                            borderRadius: '5px',
                                            backgroundColor: email.id === selectedEmailId ? '#d6e1f3' : '#fff',
                                            fontWeight: email.status === 'unread' ? 'bold' : 'normal',
                                        }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {multiselectEnabled && (
                                                <div
                                                    style={{ flex: 'none', display: 'flex', marginRight: '10px' }}
                                                    onClick={() => toggleSelectedEmail(email)}
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedEmailIds.includes(email.id)}
                                                    />
                                                </div>
                                            )}
                                            <div style={{ flex: 1 }} onClick={() => selectEmail(email)}>
                                                <span style={{ fontSize: '15px' }}>
                                                    {getStatusIcon(email.status)} {getEmailaddressToBeDisplayed(email)}
                                                </span>{' '}
                                                <span style={{ fontSize: '12px' }}>({email.mailbox.name})</span>
                                                <br />
                                                <span>{email.subject}</span>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    alignItems: 'end',
                                                }}
                                                onClick={() => selectEmail(email)}
                                            >
                                                <span style={{ fontSize: '12px' }}>{getEmailDate(email)}</span>
                                                <div>
                                                    <span style={{ color: '#999' }}>{getUserToBeDisplayed(email)}</span>
                                                    {email.hasAttachments && <Icon icon={paperclip} size={18} />}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                        {emails.length < emailCount && (
                            // Zou niet meer nodig moeten zijn omdat we nu onScroll gebruiken om te fetchen
                            // Maar staat verder niet in de weg en is mooie backup mocht de fetch toch niet getriggerd worden.
                            <tr>
                                <td>
                                    <button className="btn btn-link pull-right" onClick={() => fetchMoreEmails()}>
                                        meer laden...
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
