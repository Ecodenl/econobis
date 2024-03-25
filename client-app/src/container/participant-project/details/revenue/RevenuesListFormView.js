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
    const { revenueId, categoryName, dateBegin, dateEnd, status, statusRevenue } = revenueDetails;

    const statusName = status => {
        switch (status) {
            case 'concept':
                return 'Concept';
            case 'confirmed':
                return 'Definitief';
            case 'processed':
                return 'Verwerkt';
        }
        return '';
    };
    const statusRevenueName = statusRevenue => {
        switch (statusRevenue) {
            case 'concept':
                return 'Concept';
            case 'confirmed':
                return 'Definitief';
            case 'processed':
                return 'Verwerkt';
        }
        return '';
    };

    return (
        <div
            className={`row border ${highlightLine}`}
            onMouseEnter={() => onLineEnter()}
            onMouseLeave={() => onLineLeave()}
        >
            <div className="col-sm-4">{projectName ? projectName : ''}</div>
            <div className="col-sm-2">{categoryName}</div>
            <div className={'col-sm-3'}>
                {dateBegin ? moment(dateBegin).format('L') : 'onbekend'}
                {' t/m '}
                {dateEnd ? moment(dateEnd).format('L') : 'onbekend'}
            </div>
            <div className="col-sm-2">
                {statusName(status)} / {statusRevenueName(statusRevenue)}
            </div>
            <div className="col-sm-1">
                {showActionButtons && permissions.menuProjects ? (
                    <a role="button" onClick={() => hashHistory.push(`/project/opbrengst/${revenueId}`)}>
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
