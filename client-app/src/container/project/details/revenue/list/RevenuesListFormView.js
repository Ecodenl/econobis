import React from 'react';
import moment from 'moment/moment';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { eye } from 'react-icons-kit/fa/eye';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';
import MoneyPresenter from '../../../../../helpers/MoneyPresenter';

const RevenuesListFormView = ({
    revenue: revenueDetails,
    projectTypeCodeRef,
    showActionButtons,
    permissions,
    toggleDelete,
    highlightLine,
    onLineEnter,
    onLineLeave,
}) => {
    const { id, confirmed, category, dateBegin, dateEnd, datePayed, amountRevenue } = revenueDetails;

    return (
        <div
            className={`row border ${highlightLine}`}
            onMouseEnter={() => onLineEnter()}
            onMouseLeave={() => onLineLeave()}
        >
            <div className="col-sm-1 custom-col-width-12-5">{category ? category.name : ''}</div>
            <div className="col-sm-2">{dateBegin ? moment(dateBegin).format('L') : ''}</div>
            <div className="col-sm-2">{dateEnd ? moment(dateEnd).format('L') : ''}</div>
            <div className="col-sm-2">{datePayed ? moment(datePayed).format('L') : ''}</div>
            <div className="col-sm-1 custom-col-width-12-5">{confirmed ? 'Definitief' : 'Concept'}</div>
            <div className="col-sm-2">{amountRevenue ? MoneyPresenter(amountRevenue) : ''}</div>
            <div className="col-sm-1">
                {showActionButtons ? (
                    <a role="button" onClick={() => hashHistory.push(`/project/opbrengst/${id}`)}>
                        <Icon className="mybtn-success" size={14} icon={confirmed ? eye : pencil} />
                    </a>
                ) : (
                    ''
                )}
                {showActionButtons && permissions.manageFinancial && !confirmed ? (
                    <a role="button" onClick={toggleDelete}>
                        <Icon className="mybtn-danger" size={14} icon={trash} />
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
        projectTypeCodeRef: state.projectDetails.projectType?.codeRef,
    };
};

export default connect(mapStateToProps)(RevenuesListFormView);
