import React, {useState} from 'react';
import {hashHistory} from 'react-router';

export default function ContactAvailabilityListItem({contact}) {
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
        hashHistory.push(`/beschikbaarheid/${contact.id}`);
    }

    return (
        <tr
            className={highlightRow}
            onDoubleClick={openItem}
            onMouseEnter={onRowEnter}
            onMouseLeave={onRowLeave}
        >
            <td>{contact.name}</td>
            <td>
                {showActionButtons && (
                    <>
                        <a role="button" onClick={openItem}>
                            <span className="glyphicon glyphicon-pencil mybtn-success"/>
                        </a>
                    </>
                )}
            </td>
        </tr>
    );
}
