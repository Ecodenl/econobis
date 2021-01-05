import React, { useState } from 'react';
import { hashHistory } from 'react-router';
import moment from 'moment';

function FinancialOverviewContactItem({
    id,
    contactFullName,
    statusId,
    status,
    dateSent,
    emailedTo,
    showSelectFinancialOverviewContactsToSend,
    toggleFinancialOverviewContactCheck,
    financialOverviewContactIds,
}) {
    const dateSentFormated = dateSent ? moment(dateSent).format('DD-MM-Y') : '';
    const [highlightLine, setHighlightLine] = useState('');

    const inProgressRowClass =
        statusId === 'in-progress' ||
        statusId === 'is-sending' ||
        statusId === 'error-making' ||
        statusId === 'error-sending' ||
        statusId === 'is-resending'
            ? 'in-progress-row'
            : '';
    return (
        <tr
            className={`${highlightLine} ${inProgressRowClass}`}
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
                    <span className="glyphicon glyphicon-list-alt mybtn-success" />
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
        if (statusId === 'sent') {
            hashHistory.push(`/waardestaat-contact/inzien/${financialOverviewContactId}`);
        } else {
            hashHistory.push(`/waardestaat-contact/preview/${financialOverviewContactId}`);
        }
    }
}

export default FinancialOverviewContactItem;
