import React, {useState} from 'react';
import {hashHistory} from 'react-router';
import DistrictListItemDeleteModal from "./DistrictListItemDeleteModal";

import Icon from 'react-icons-kit';
import { calendar } from 'react-icons-kit/fa/calendar';
import { pencil } from 'react-icons-kit/fa/pencil';

export default function DistrictListItem({district, onDelete}) {
    const [showActionButtons, setShowActionButtons] = useState(false);
    const [highlightRow, setHighlightRow] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const onRowEnter = () => {
        setShowActionButtons(true);
        setHighlightRow('highlight-row');
    }

    const onRowLeave = () => {
        setShowActionButtons(false);
        setHighlightRow('');
    }

    const openItem = () => {
        hashHistory.push(`/afspraak-kalender/${district.id}`);
    }

    const openCalender = () => {
        hashHistory.push(`/afspraak-kalender/${district.id}/kalender`);
    }

    return (
        <tr
            className={highlightRow}
            onDoubleClick={openCalender}
            onMouseEnter={onRowEnter}
            onMouseLeave={onRowLeave}
        >
            <td>{district.name}</td>
            <td>
                {(showActionButtons || showDeleteModal) && (
                    <>
                        <a role="button" onClick={openCalender}>
                            <Icon class="mybtn-success" size={14} icon={calendar} />
                        </a>
                        {' '}
                        <a role="button" onClick={openItem}>
                            <Icon class="mybtn-success" size={14} icon={pencil} />
                        </a>
                        {' '}
                        <DistrictListItemDeleteModal district={district} onDelete={onDelete} setShowDeleteModal={setShowDeleteModal} showDeleteModal={showDeleteModal}/>
                    </>
                )}
            </td>
        </tr>
    );
}
