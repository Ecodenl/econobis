import React from 'react';
import moment from 'moment';

export default function EmailMailboxStatusses(props) {
    return (
        <div className={'row'}>
            <div className="col-xs-12">
                <div
                    className="alert alert-info"
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                    role="alert"
                >
                    <div style={{ flex: '1 1 auto' }}>
                        <h4>Mailboxen:</h4>
                        <ul style={{ listStyleType: 'none', padding: 0 }}>
                            {props.mailboxes.map(mailbox => {
                                let color = mailbox.is_active ? 'inherit' : 'red';
                                return (
                                    <li key={mailbox.id} style={{ fontFamily: 'courier', color: color }}>
                                        {mailbox.name}
                                        {!mailbox.is_active ? <span> | Niet actief</span> : ''}
                                        {!mailbox.valid && (
                                            <span style={{ color: 'red', fontWeight: 'bold' }}>
                                                {' | Fout in configuratie'}
                                            </span>
                                        )}
                                        <span>
                                            {' '}
                                            | Datetime last fetch:{' '}
                                            {moment(mailbox.date_last_fetched).format('YYYY-MM-DD HH:mm:ss')}
                                        </span>
                                        <span>
                                            {' '}
                                            | Datetime nu + 15 min:{' '}
                                            {moment()
                                                .add(15, 'minutes')
                                                .format('YYYY-MM-DD HH:mm:ss')}
                                        </span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div>
                        <a onClick={props.setShowMailboxStatusses} className="btn btn-sm">
                            x
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
