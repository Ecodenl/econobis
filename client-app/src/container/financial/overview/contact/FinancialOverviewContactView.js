import React from 'react';
import MoneyPresenter from '../../../../../../customer-portal-app/src/helpers/MoneyPresenter';
import moment from 'moment';

const FinancialOverviewContactView = props => {
    const { contact, status, dateSent, emailedTo } = props.financialOverviewContact;

    const dateSentFormated = dateSent ? moment(dateSent).format('DD-MM-Y') : '';

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div>
                <div className="col-sm-4">{contact.fullName}</div>
                <div className="col-sm-2">{status}</div>
                <div className="col-sm-2">{dateSentFormated}</div>
                <div className="col-sm-3">{emailedTo}</div>
                <div className="col-sm-1">
                    <a role="button" onClick={() => props.getFinancialOverviewPDF(props.financialOverviewContact.id)}>
                        <span className="glyphicon glyphicon-list-alt mybtn-success" />{' '}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FinancialOverviewContactView;
