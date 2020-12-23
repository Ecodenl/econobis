import React from 'react';
import MoneyPresenter from '../../../../../../../customer-portal-app/src/helpers/MoneyPresenter';

const ParticipantView = props => {
    const {
        participantProject,
        quantityStartValue,
        quantityEndValue,
        bookworthStartValue,
        bookworthEndValue,
        amountStartValue,
        amountEndValue,
    } = props.financialOverviewParticipantProject;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div>
                <div className="col-sm-2">{participantProject.contact.fullName}</div>
                <div className="col-sm-1 text-right">{quantityStartValue}</div>
                <div className="col-sm-2 text-right">{MoneyPresenter(bookworthStartValue)}</div>
                <div className="col-sm-2 text-right">{MoneyPresenter(amountStartValue)}</div>
                <div className="col-sm-1 text-right">{quantityEndValue}</div>
                <div className="col-sm-2 text-right">{MoneyPresenter(bookworthEndValue)}</div>
                <div className="col-sm-2 text-right">{MoneyPresenter(amountEndValue)}</div>
            </div>
        </div>
    );
};

export default ParticipantView;
