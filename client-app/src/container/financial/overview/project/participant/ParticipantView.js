import React from 'react';
import MoneyPresenter from '../../../../../../../customer-portal-app/src/helpers/MoneyPresenter';

const ParticipantView = props => {
    // todo WM: opschonen log regels
    // console.log('ParticipantView');
    // console.log(props);
    const { participantProject, startValue, endValue } = props.financialOverviewProject;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div>
                <div className="col-sm-6">{participantProject.contact.fullName}</div>
                <div className="col-sm-3">{MoneyPresenter(startValue)}</div>
                <div className="col-sm-3">{MoneyPresenter(endValue)}</div>
            </div>
        </div>
    );
};

export default ParticipantView;
