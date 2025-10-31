import React from 'react';
import moment from 'moment/moment';
import { connect } from 'react-redux';
import MoneyPresenter from '../../../../helpers/MoneyPresenter';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

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
                <div className="col-sm-2">{MoneyPresenter(bookWorth)}</div>
                <div className="col-sm-2">{MoneyPresenter(transferWorth)}</div>
                <div className="col-sm-2">{active ? 'Ja' : ''}</div>
            </div>
            <div className="col-sm-1">
                {props.showActionButtons ? (
                    <a role="button" onClick={props.openEdit}>
                        <Icon className="mybtn-success" size={14} icon={pencil} />
                    </a>
                ) : (
                    ''
                )}
                {props.showActionButtons && props.permissions.manageProject ? (
                    <a role="button" onClick={props.toggleDelete}>
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
        projectType: state.projectDetails.projectType,
    };
};

export default connect(mapStateToProps)(ProjectDetailsFormValueCourseView);
