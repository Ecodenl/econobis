import React from 'react';
import moment from 'moment/moment';
import { connect } from 'react-redux';

const ProductionProjectDetailsFormValueCourseView = props => {
    const { productionProject, date, bookWorth, transferWorth } = props.valueCourse;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-3">{productionProject ? productionProject.name : ''}</div>
                <div className="col-sm-2">{date ? moment(date).format('L') : ''}</div>
                <div className="col-sm-3">{bookWorth}</div>
                <div className="col-sm-3">{transferWorth ? transferWorth : ''}</div>
            </div>
            <div className="col-sm-1">
                {props.showActionButtons ? (
                    <a role="button" onClick={props.openEdit}>
                        <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                    </a>
                ) : (
                    ''
                )}
                {props.showActionButtons && props.permissions.manageFinancial ? (
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

export default connect(mapStateToProps)(ProductionProjectDetailsFormValueCourseView);
