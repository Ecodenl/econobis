import React from 'react';
import moment from 'moment/moment';
import { hashHistory } from 'react-router';
import { connect } from 'react-redux';

const RevenuesListFormView = props => {
    const { id, confirmed, category, dateBegin, dateEnd, datePayed, type, revenue, kwhResult } = props.revenue;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div className="col-sm-1">{category ? category.name : ''}</div>
            <div className="col-sm-2">{dateBegin ? moment(dateBegin).format('L') : ''}</div>
            <div className="col-sm-2">{dateEnd ? moment(dateEnd).format('L') : ''}</div>
            <div className="col-sm-2">{datePayed ? moment(datePayed).format('L') : ''}</div>
            <div className="col-sm-2">{type ? type.name : ''}</div>
            <div className="col-sm-1">{revenue ? revenue : ''}</div>
            <div className="col-sm-1">{kwhResult ? kwhResult : ''}</div>
            <div className="col-sm-1">
                {props.showActionButtons ? (
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
                {props.showActionButtons && props.permissions.manageFinancial && !confirmed ? (
                    <a role="button" onClick={props.toggleDelete}>
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
    };
};

export default connect(mapStateToProps)(RevenuesListFormView);
