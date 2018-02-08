import React from 'react';
import moment from 'moment';
import {connect} from "react-redux";
import { hashHistory } from 'react-router';

const MailboxDetailsUsersView = props => {
    const {id, fullName} = props.user;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div className="col-sm-11" >{fullName}</div>
            <div className="col-sm-1">
                {(props.showActionButtons && props.permissions.createMailbox ? <a role="button" onClick={props.toggleDelete}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(MailboxDetailsUsersView);
