import React, {useEffect, useRef, useState} from 'react';
import moment from "moment/moment";
import EmailAPI from "../../../api/email/EmailAPI";
import Icon from "react-icons-kit";
import {paperclip} from 'react-icons-kit/fa/paperclip';

export default function EmailSplitViewSelectPanel({emails, folder, emailCount, fetchMoreEmails, selectedEmailId, setSelectedEmailId, updateEmailAttributes}) {
    const markAsReadAfter = 2000;
    const lastSelectedEmailId = useRef(null);

    const getTitle = () => {
        switch (folder) {
            case 'inbox':
                return 'Inbox';
            case 'sent':
                return 'Verzonden';
            case 'drafts':
                return 'Concepten';
            case 'trash':
                return 'Prullenbak';
            default:
                return 'Onbekend';
        }
    }

    const selectEmail = (email) => {
        setSelectedEmailId(email.id);

        lastSelectedEmailId.current = email.id;

        setTimeout(() => {
            if (lastSelectedEmailId.current === email.id) {
                markAsRead(email);
            }
        }, markAsReadAfter);
    }

    const markAsRead = (email) => {
        if (email.status.id === 'unread') {
            EmailAPI.setStatus(email.id, 'read').then(() => {
                updateEmailAttributes(email.id, {status: {id: "read", name: "Gelezen"}});
            });
        }
    }

    useEffect(() => {
        if (selectedEmailId) {
            return;
        }

        if (emails.length === 0) {
            return;
        }

        selectEmail(emails[0]);
    }, [emails]);

    return (
        <div className="panel panel-default">
            <div className="panel-body panel-small"
                 style={{height: "calc(100vh - 160px)", overflow: 'auto'}}>
                <table className="table table-condensed table-hover table-striped col-xs-12">
                    <thead>
                    <tr className="thead-title">
                        <th>{getTitle()} ({emailCount})</th>
                    </tr>
                    </thead>

                    <tbody>
                    {emails.length === 0 ? (
                            <tr>
                                <td>Geen e-mails gevonden!</td>
                            </tr>
                        ) :
                        emails.map(email => (
                            <tr key={email.id} style={{cursor: 'pointer'}}>
                                <td onClick={() => selectEmail(email)}
                                    style={{
                                        borderRadius: '5px',
                                        backgroundColor: email.id === selectedEmailId ? '#d6e1f3' : '#fff',
                                        fontWeight: email.status.id === 'unread' ? 'bold' : 'normal',
                                    }}>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                        <div>
                                            <span style={{fontSize: '15px'}}>{email.from}</span>
                                            <br/><span>{email.subject}</span>
                                        </div>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'end',
                                        }}>
                                            <span style={{fontSize: '12px'}}>{email.date && moment(email.date).format('DD-MM-YYYY HH:mm')}</span>
                                            {
                                                email.hasAttachmentsWithoutCids && (
                                                    <Icon icon={paperclip} size={18}/>
                                                )
                                            }
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                    {emails.length < emailCount && (
                        <tr>
                            <td>
                                <button
                                    className="btn btn-link pull-right"
                                    onClick={() => fetchMoreEmails()}
                                >
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

