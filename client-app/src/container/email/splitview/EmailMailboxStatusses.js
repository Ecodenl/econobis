import React, { useState } from 'react';
import moment from 'moment';
import DataTable from '../../../components/dataTable/DataTable';
import DataTableHead from '../../../components/dataTable/DataTableHead';
import DataTableBody from '../../../components/dataTable/DataTableBody';
import { useSelector } from 'react-redux';
import ButtonText from '../../../components/button/ButtonText';

export default function EmailMailboxStatusses() {
    const [showMailboxStatussesPanel, setShowMailboxStatussesPanel] = useState(true);
    const [showMailboxStatusses, setShowMailboxStatusses] = useState(false);
    const activeMailboxes = useSelector(state => state.meDetails.activeMailboxes);

    return showMailboxStatussesPanel ? (
        <div className={'row'}>
            <div className="col-xs-12">
                <div
                    className="alert alert-info"
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                    role="alert"
                >
                    {showMailboxStatusses ? (
                        <div>
                            <div style={{ flex: '1 1 auto' }}>
                                <ButtonText
                                    buttonText={'Status mailboxen (verbergen)'}
                                    onClickAction={() => setShowMailboxStatusses(false)}
                                />
                            </div>
                            <div>&nbsp;</div>
                            <div style={{ flex: '1 1 auto' }}>
                                <DataTable>
                                    <DataTableHead>
                                        <th>Mailbox</th>
                                        <th>Email laatst opgehaald</th>
                                        <th>Meldingen</th>
                                    </DataTableHead>
                                    <DataTableBody>
                                        {activeMailboxes.map(mailbox => {
                                            return (
                                                <tr key={mailbox.id}>
                                                    <td>{mailbox.name}</td>
                                                    <td>
                                                        {mailbox.date_last_fetched
                                                            ? moment(mailbox.date_last_fetched).format(
                                                                  'DD-MM-YYYY HH:mm:ss'
                                                              )
                                                            : ''}
                                                    </td>
                                                    <td>
                                                        {!mailbox.valid ? (
                                                            <span style={{ color: 'red', fontWeight: 'bold' }}>
                                                                {'Fout in configuratie'}
                                                            </span>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </DataTableBody>{' '}
                                </DataTable>
                            </div>
                        </div>
                    ) : (
                        <div style={{ flex: '1 1 auto' }}>
                            <ButtonText
                                buttonText={'Status mailboxen (tonen)'}
                                onClickAction={() => setShowMailboxStatusses(true)}
                            />
                        </div>
                    )}
                    <div>
                        <a onClick={() => setShowMailboxStatussesPanel(false)} className="btn btn-sm">
                            x
                        </a>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}
