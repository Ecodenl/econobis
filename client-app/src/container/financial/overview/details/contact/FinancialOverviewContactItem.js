import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

import Icon from 'react-icons-kit';
import { eye } from 'react-icons-kit/fa/eye';

function FinancialOverviewContactItem({
    id,
    contactFullName,
    statusId,
    status,
    dateSent,
    emailedTo,
    allowInterimFinancialOverview,
    showSelectFinancialOverviewContactsToSend,
    toggleFinancialOverviewContactCheck,
    financialOverviewContactIds,
}) {
    const navigate = useNavigate();

    const dateSentFormated = dateSent ? moment(dateSent).format('DD-MM-Y') : '';
    const [highlightLine, setHighlightLine] = useState('');

    const rowClass =
        statusId === 'in-progress' ||
        statusId === 'is-sending' ||
        statusId === 'error-making' ||
        statusId === 'error-sending' ||
        statusId === 'is-resending'
            ? 'in-progress-row'
            : statusId === 'sent'
            ? 'success-row-light'
            : '';

    return (
        <tr
            className={`${highlightLine} ${rowClass}`}
            onMouseEnter={() => onLineEnter()}
            onMouseLeave={() => onLineLeave()}
        >
            {showSelectFinancialOverviewContactsToSend && (
                <td>
                    <input
                        type="checkbox"
                        name={id}
                        onChange={toggleFinancialOverviewContactCheck}
                        checked={
                            financialOverviewContactIds && financialOverviewContactIds.length > 0
                                ? financialOverviewContactIds.includes(id)
                                : false
                        }
                    />
                </td>
            )}
            <td>{contactFullName}</td>
            <td>{status}</td>
            <td>{dateSentFormated}</td>
            <td>{emailedTo}</td>
            <td>
                <a role="button" onClick={() => getFinancialOverviewPDF(id, statusId)}>
                    <Icon className="mybtn-success" size={14} icon={eye} />
                </a>
            </td>
        </tr>
    );

    function onLineEnter() {
        setHighlightLine('highlight-row');
    }

    function onLineLeave() {
        setHighlightLine('');
    }

    function getFinancialOverviewPDF(financialOverviewContactId, statusId) {
        if (statusId === 'sent' || statusId === 'error-sending') {
            navigate(`/waardestaat-contact/inzien/${financialOverviewContactId}`);
        } else {
            navigate(`/waardestaat-contact/preview/${financialOverviewContactId}`);
        }
    }
}

export default FinancialOverviewContactItem;
