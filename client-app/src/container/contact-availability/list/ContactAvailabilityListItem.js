import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';

export default function ContactAvailabilityListItem({ contact }) {
    const navigate = useNavigate();

    const [showActionButtons, setShowActionButtons] = useState(false);
    const [highlightRow, setHighlightRow] = useState('');
    const onRowEnter = () => {
        setShowActionButtons(true);
        setHighlightRow('highlight-row');
    };

    const onRowLeave = () => {
        setShowActionButtons(false);
        setHighlightRow('');
    };

    const openItem = () => {
        navigate(`/beschikbaarheid/${contact.id}`);
    };

    return (
        <tr className={highlightRow} onDoubleClick={openItem} onMouseEnter={onRowEnter} onMouseLeave={onRowLeave}>
            <td>{contact.name}</td>
            <td>
                {showActionButtons && (
                    <>
                        <a role="button" onClick={openItem}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    </>
                )}
            </td>
        </tr>
    );
}
