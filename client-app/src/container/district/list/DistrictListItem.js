import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from 'react-icons-kit';
import { calendar } from 'react-icons-kit/fa/calendar';
import { pencil } from 'react-icons-kit/fa/pencil';

export default function DistrictListItem({ district }) {
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
        navigate(`/afspraak-kalender/${district.id}`);
    };

    const openCalender = () => {
        navigate(`/afspraak-kalender/${district.id}/kalender`);
    };

    return (
        <tr className={highlightRow} onDoubleClick={openCalender} onMouseEnter={onRowEnter} onMouseLeave={onRowLeave}>
            <td>{district.name}</td>
            <td>{district.closed ? 'Gesloten' : 'Open'}</td>
            <td>
                {showActionButtons && (
                    <>
                        <a role="button" onClick={openCalender}>
                            <Icon className="mybtn-success" size={14} icon={calendar} />
                        </a>{' '}
                        <a role="button" onClick={openItem}>
                            <Icon className="mybtn-success" size={14} icon={pencil} />
                        </a>
                    </>
                )}
            </td>
        </tr>
    );
}
