import React from 'react';
import {connect} from "react-redux";

const MailboxDetailsIgnoresView = props => {
    const {value, type} = props.ignore;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div className="col-sm-6" >{value}</div>
            <div className="col-sm-5" >{type ? type.name : ''}</div>
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

export default connect(mapStateToProps)(MailboxDetailsIgnoresView);
