import React, {useState} from 'react';
import {hashHistory} from 'react-router';
import DistrictListItemDeleteModal from "./DistrictListItemDeleteModal";

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
            <td>{district.closed ? 'Gesloten' : 'Open'}</td>
            <td>
                {(showActionButtons || showDeleteModal) && (
                    <>
                        <a role="button" onClick={openCalender}>
                            <span className="glyphicon glyphicon-calendar mybtn-success"/>
                        </a>
                        {' '}
                        <a role="button" onClick={openItem}>
                            <span className="glyphicon glyphicon-pencil mybtn-success"/>
                        </a>
                        {' '}
                        <DistrictListItemDeleteModal district={district} onDelete={onDelete} setShowDeleteModal={setShowDeleteModal} showDeleteModal={showDeleteModal}/>
                    </>
                )}
            </td>
        </tr>
    );
}
