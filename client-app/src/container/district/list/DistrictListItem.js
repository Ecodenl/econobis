import React, {useState} from 'react';
import {hashHistory} from 'react-router';

export default function DistrictListItem({district}) {
    const [showActionButtons, setShowActionButtons] = useState(false);
    const [highlightRow, setHighlightRow] = useState('');

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
                {showActionButtons && (
                    <>
                        <a role="button" onClick={openCalender}>
                            <span className="glyphicon glyphicon-calendar mybtn-success"/>
                        </a>
                        {' '}
                        <a role="button" onClick={openItem}>
                            <span className="glyphicon glyphicon-pencil mybtn-success"/>
                        </a>
                    </>
                )}
            </td>
        </tr>
    );
}
