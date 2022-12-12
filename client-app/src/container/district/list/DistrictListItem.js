import React, {useState} from 'react';
import {hashHistory} from 'react-router';
import DistrictListItemDeleteModal from "./DistrictListItemDeleteModal";

export default function DistrictListItem({district, onDelete}) {
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
        hashHistory.push(`/wijk/${district.id}`);
    }

    return (
        <tr
            className={highlightRow}
            onDoubleClick={openItem}
            onMouseEnter={onRowEnter}
            onMouseLeave={onRowLeave}
        >
            <td>{district.name}</td>
            <td>
                {showActionButtons && (
                    <>
                        <a role="button" onClick={openItem}>
                            <span className="glyphicon glyphicon-pencil mybtn-success"/>
                        </a>
                        {' '}
                        <DistrictListItemDeleteModal district={district} onDelete={onDelete}/>
                    </>
                )}
            </td>
        </tr>
    );
}
