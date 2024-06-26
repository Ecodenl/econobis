import React, { useState } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

function ContactsToImportListItem({
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
    emailInvoices,
    phoneNumber,
    permissions,
    match,
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
        hashHistory.push(`/contacts-to-import/${id}`);
    }

    return (
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
            <td>{emailInvoices}</td>
            <td>{phoneNumber}</td>
            <td>ean</td>
            <td>leverancier</td>
            <td>klantnummer</td>
            <td>{match}</td>
            <td>
                {showActionButtons && permissions.manageContactsToImport ? (
                    <a role="button" onClick={() => openItem(id)}>
                        <Icon className="mybtn-success" size={14} icon={pencil} />
                    </a>
                ) : (
                    ''
                )}
            </td>
        </tr>
    );
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(ContactsToImportListItem);
