import React, { useState } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';
import ContactToImportsAPI from '../../../api/contact-to-imports/ContactToImportsAPI';
import axiosInstance from '../../../api/default-setup/AxiosInstance';

function ContactToImportsListItem({
    id,
    number,
    firstName,
    lastName,
    street,
    housenumber,
    addition,
    postalCode,
    city,
    emailContact,
    phoneNumber,
    permissions,
    match,
    contactForImports,
    refreshContactToImports,
}) {
    const [showActionButtons, setShowActionButtons] = useState(false);
    const [highlightLine, setHighlightLine] = useState('');

    function onLineEnter() {
        setShowActionButtons(true);
        setHighlightLine('highlight-row');
    }

    function onLineLeave() {
        setShowActionButtons(false);
        setHighlightLine('');
    }

    function openItem(id) {
        hashHistory.push(`/contact-to-imports/${id}`);
    }

    function updateContactFromContactToImport(contactToImport, contactForImport) {
        ContactToImportsAPI.getContactFromContactToImport(contactToImport)
            .then(payload => {
                return axiosInstance.post(`/person/${contactForImport}`, payload.data);
            })
            .then(payload => {
                ContactToImportsAPI.setContactToImportStatus(contactToImport, 'imported-update', payload.data.data.id);
            })
            .then(() => {
                setTimeout(() => {
                    refreshContactToImports();
                }, 200);
            });
    }

    function createNewContactFromContactToImport(contactToImport) {
        ContactToImportsAPI.getContactFromContactToImport(contactToImport)
            .then(payload => {
                return axiosInstance.post('/person', payload.data);
            })
            .then(payload => {
                ContactToImportsAPI.setContactToImportStatus(contactToImport, 'imported-new', payload.data.data.id);
            })
            .then(() => {
                setTimeout(() => {
                    refreshContactToImports();
                }, 200);
            });
    }

    return (
        <>
            <tr
                className={`${highlightLine}`}
                onMouseEnter={() => onLineEnter()}
                onMouseLeave={() => onLineLeave()}
                onDoubleClick={() => openItem(id)}
            >
                <td>{number}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{street}</td>
                <td>{housenumber}</td>
                <td>{addition}</td>
                <td>{postalCode}</td>
                <td>{city}</td>
                <td>{emailContact}</td>
                <td>{phoneNumber}</td>
                <td>ean</td>
                <td>leverancier</td>
                <td>klantnummer</td>
                <td>{match}</td>
                <td>
                    {showActionButtons && permissions.manageContactToImports ? (
                        <a role="button" onClick={() => openItem(id)}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    ) : (
                        ''
                    )}

                    {showActionButtons ? (
                        <a
                            role="button"
                            className="btn btn-primary"
                            onClick={() => createNewContactFromContactToImport(id)}
                        >
                            <small>import nieuw</small>
                        </a>
                    ) : (
                        ''
                    )}
                </td>
            </tr>

            {contactForImports.map(contactForImport => {
                return (
                    <tr
                        className={`${highlightLine}`}
                        onMouseEnter={() => onLineEnter()}
                        onMouseLeave={() => onLineLeave()}
                        onDoubleClick={() => openItem(id)}
                    >
                        <td>{contactForImport.number}</td>
                        <td>{contactForImport.firstName}</td>
                        <td>{contactForImport.lastName}</td>
                        <td>{contactForImport.street}</td>
                        <td>{contactForImport.housenumber}</td>
                        <td>{contactForImport.addition}</td>
                        <td>{contactForImport.postalCode}</td>
                        <td>{contactForImport.city}</td>
                        <td>{contactForImport.emailContact}</td>
                        <td>{contactForImport.phoneNumber}</td>
                        <td>ean</td>
                        <td>leverancier</td>
                        <td>klantnummer</td>
                        <td>{contactForImport.match}</td>
                        <td>
                            {showActionButtons && permissions.manageContactToImports ? (
                                <a role="button" onClick={() => openItem(id)}>
                                    <Icon className="mybtn-success" size={14} icon={pencil} />
                                </a>
                            ) : (
                                ''
                            )}
                            <input
                                type="checkbox"
                                onChange={() => updateContactFromContactToImport(id, contactForImport.personId)}
                            />
                        </td>
                    </tr>
                );
            })}
        </>
    );
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(ContactToImportsListItem);
