import React from 'react';

import moment from 'moment/moment';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { eye } from 'react-icons-kit/fa/eye';
import { pencil } from 'react-icons-kit/fa/pencil';
import MoneyPresenter from '../../../../helpers/MoneyPresenter';

const RevenuesListFormView = ({
    revenue: revenueDetails,
    projectName,
    permissions,
    showActionButtons,
    highlightLine,
    onLineEnter,
    onLineLeave,
}) => {
    const { id, confirmed, category, dateBegin, dateEnd, datePayed, type, amountRevenue } = revenueDetails;

    return (
        <div
            className={`row border ${highlightLine}`}
            onMouseEnter={() => onLineEnter()}
            onMouseLeave={() => onLineLeave()}
        >
            <div className="col-sm-4">{projectName ? projectName : ''}</div>
            <div className="col-sm-2">{category ? category.name : ''}</div>
            <div className={'col-sm-3'}>
                {dateBegin ? moment(dateBegin).format('L') : 'onbekend'}
                {' t/m '}
                {dateEnd ? moment(dateEnd).format('L') : 'onbekend'}
            </div>
            <div className="col-sm-2">{confirmed ? 'Definitief' : 'Concept'}</div>
            <div className="col-sm-1">
                {showActionButtons && permissions.menuProjects ? (
                    <a role="button" onClick={() => hashHistory.push(`/project/opbrengst/${id}`)}>
                        <Icon className="mybtn-success" size={14} icon={eye} />
                    </a>
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        projectName: state.participantProjectDetails.project?.name,
    };
};

export default connect(mapStateToProps)(RevenuesListFormView);
