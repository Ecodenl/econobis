import React from 'react';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';

const TaskDetailFormPropertiesView = props => {
    const { value, property } = props.property;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-6">{property.name}</div>
                <div className="col-sm-5">{value}</div>
            </div>
            <div className="col-sm-1">
                {props.showActionButtons && props.permissions.manageTask ? (
                    <a role="button" onClick={props.openEdit}>
                        <Icon class="mybtn-success" size={14} icon={pencil} />
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

export default connect(mapStateToProps)(TaskDetailFormPropertiesView);
