import React, { Component, useState } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

function FreeFieldsListItem({
    id,
    tableName,
    fieldName,
    fieldFormatName,
    showDeleteItemModal,
    permissions,
    sortOrder,
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
        hashHistory.push(`/vrije-velden/${id}`);
    }

    return (
        <tr
            className={`${highlightLine}`}
            onMouseEnter={() => onLineEnter()}
            onMouseLeave={() => onLineLeave()}
            onDoubleClick={() => openItem(id)}
        >
            <td>{tableName}</td>
            <td>{fieldName}</td>
            <td>{fieldFormatName}</td>
            <td>{sortOrder}</td>
            <td>
                {showActionButtons && permissions.manageFreeFields ? (
                    <a role="button" onClick={() => openItem(id)}>
                        <Icon className="mybtn-success" size={14} icon={pencil} />
                    </a>
                ) : (
                    ''
                )}
                {showActionButtons && permissions.manageFreeFields ? (
                    <a role="button" onClick={() => showDeleteItemModal(id, fieldName)}>
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

export default connect(mapStateToProps)(FreeFieldsListItem);
