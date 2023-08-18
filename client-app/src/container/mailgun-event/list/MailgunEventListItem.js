import React, {useState} from 'react';
import moment from "moment/moment";

export default function MailgunEventListItem({mailgunLog, hasError}) {
    const [highlightRow, setHighlightRow] = useState('');

    const onRowEnter = () => {
        setHighlightRow('highlight-row');
    }

    const onRowLeave = () => {
        setHighlightRow('');
    }

    return (
        <tr
            className={highlightRow}
            onMouseEnter={onRowEnter}
            onMouseLeave={onRowLeave}
        >
            <td>{moment(mailgunLog.eventDate).format('DD-MM-YYYY HH:mm')}</td>
            <td>{mailgunLog.domain.domain}</td>
            <td>
                {hasError ? (
                    <span className="text-danger">{mailgunLog.event}</span>
                ) : (
                    <span>{mailgunLog.event}</span>
                )}
            </td>
            <td>{mailgunLog.deliveryStatus}</td>
            <td>{mailgunLog.recipient}</td>
            <td>{mailgunLog.subject}</td>
        </tr>
    );
}
