import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/fa/trash';

const TeamDetailsUsersView = props => {
    const navigate = useNavigate();

    const { id, fullName } = props.user;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div className="col-sm-11">{fullName}</div>
            <div className="col-sm-1">
                {props.showActionButtons && props.permissions.createTeam ? (
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
    };
};

export default connect(mapStateToProps)(TeamDetailsUsersView);
