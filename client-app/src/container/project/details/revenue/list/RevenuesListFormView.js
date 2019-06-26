import React from 'react';
import moment from 'moment/moment';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

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
    const { id, confirmed, category, dateBegin, dateEnd, datePayed, type, revenue, kwhResult } = revenueDetails;

    return (
        <div
            className={`row border ${highlightLine}`}
            onMouseEnter={() => onLineEnter()}
            onMouseLeave={() => onLineLeave()}
        >
            <div className="col-sm-1">{category ? category.name : ''}</div>
            <div className="col-sm-2">{dateBegin ? moment(dateBegin.date).format('L') : ''}</div>
            <div className="col-sm-2">{dateEnd ? moment(dateEnd.date).format('L') : ''}</div>
            <div className="col-sm-2">{datePayed ? moment(datePayed.date).format('L') : ''}</div>
            <div className="col-sm-2">{type ? type.name : ''}</div>
            <div className="col-sm-1">{revenue ? revenue : ''}</div>
            {projectTypeCodeRef === 'postalcode_link_capital' ? (
                <div className="col-sm-1">{kwhResult ? kwhResult : ''}</div>
            ) : (
                <div className="col-sm-1" />
            )}
            <div className="col-sm-1">
                {showActionButtons ? (
                    <a role="button" onClick={() => hashHistory.push(`/project/opbrengst/${id}`)}>
                        <span
                            className={`glyphicon ${
                                confirmed ? 'glyphicon-eye-open' : 'glyphicon-pencil'
                            } mybtn-success`}
                        />{' '}
                    </a>
                ) : (
                    ''
                )}
                {showActionButtons && permissions.manageFinancial && !confirmed ? (
                    <a role="button" onClick={toggleDelete}>
                        <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}
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
        projectTypeCodeRef: state.projectDetails.projectType.codeRef,
    };
};

export default connect(mapStateToProps)(RevenuesListFormView);
