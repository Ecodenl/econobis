import React, { useState } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

function PortalFreeFieldsPageListItem({ id, name, isActive, showDeleteItemModal, permissions }) {
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
        hashHistory.push(`/vrije-velden-portaal-pagina/${id}`);
    }

    return (
        <tr
            className={`${highlightLine}`}
            onMouseEnter={() => onLineEnter()}
            onMouseLeave={() => onLineLeave()}
            onDoubleClick={() => openItem(id)}
        >
            <td>{name}</td>
            <td>{Boolean(isActive) ? 'Ja' : 'Nee'}</td>
            <td>
                {showActionButtons && permissions.manageFreeFields && permissions.managePortalSettings ? (
                    <a role="button" onClick={() => openItem(id)}>
                        <Icon className="mybtn-success" size={14} icon={pencil} />
                    </a>
                ) : (
                    ''
                )}
                {showActionButtons && permissions.manageFreeFields ? (
                    <a role="button" onClick={() => showDeleteItemModal(id, name)}>
                        <Icon className="mybtn-danger" size={14} icon={trash} />
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

export default connect(mapStateToProps)(PortalFreeFieldsPageListItem);
