import React from 'react';
import moment from 'moment/moment';
import { connect } from 'react-redux';
import MoneyPresenter from '../../../../helpers/MoneyPresenter';

const ProjectDetailsFormValueCourseView = props => {
    const { project, date, bookWorth, transferWorth, active } = props.valueCourse;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-3">{project ? project.name : ''}</div>
                <div className="col-sm-2">{date ? moment(date).format('L') : ''}</div>
                {props.projectType.codeRef !== 'obligation' ? (
                    <div className="col-sm-2">{MoneyPresenter(bookWorth)}</div>
                ) : null}
                <div className="col-sm-2">{MoneyPresenter(transferWorth)}</div>
                <div className="col-sm-2">{active ? 'Ja' : ''}</div>
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
        projectType: state.projectDetails.projectType,
    };
};

export default connect(mapStateToProps)(ProjectDetailsFormValueCourseView);
