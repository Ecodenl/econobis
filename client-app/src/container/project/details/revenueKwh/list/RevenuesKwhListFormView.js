import React from 'react';
import moment from 'moment/moment';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

const RevenuesKwhListFormView = ({
    revenueKwh: revenueKwhDetails,
    showActionButtons,
    permissions,
    toggleDelete,
    highlightLine,
    onLineEnter,
    onLineLeave,
}) => {
    const {
        id,
        confirmed,
        dateBegin,
        dateEnd,
        status,
        deliveredTotalConcept,
        deliveredTotalConfirmed,
        deliveredTotalProcessed,
    } = revenueKwhDetails;

    const statusText = status => {
        switch (status) {
            case 'new':
                return 'Nieuw';
            case 'concept':
                return 'Concept';
            case 'confirmed':
                return 'Definitief';
            case 'in-progress':
                return 'Bezig...';
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
            <div className="col-sm-2">{dateBegin ? moment(dateBegin).format('L') : ''}</div>
            <div className="col-sm-2">{dateEnd ? moment(dateEnd).format('L') : ''}</div>
            <div className="col-sm-1">{status ? statusText(status) : ''}</div>
            <div className="col-sm-2">{deliveredTotalConcept ? deliveredTotalConcept : ''}</div>
            <div className="col-sm-2">{deliveredTotalConfirmed ? deliveredTotalConfirmed : ''}</div>
            <div className="col-sm-2">{deliveredTotalProcessed ? deliveredTotalProcessed : ''}</div>
            <div className="col-sm-1">
                {showActionButtons ? (
                    <a role="button" onClick={() => hashHistory.push(`/project/opbrengst-kwh/${id}`)}>
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

export default connect(mapStateToProps)(RevenuesKwhListFormView);
