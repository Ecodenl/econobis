import React from 'react';
import { connect } from 'react-redux';

import GetNameByIdHelper from '../../../helpers/GetNameByIdHelper';

const ContactDetailFormEmailView = props => {
    const {email, type, primary} = props.emailAddress;

    return (
        <div className={`row ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div className="col-sm-3">
                <strong><GetNameByIdHelper id={type} items={props.emailAddressTypes} /></strong>
            </div>
            <div className="col-sm-2">
                {email}
            </div>
            <div className="col-sm-1 col-sm-offset-5">
                { primary ? <span className="h6">Primair</span> : '' }
            </div>
            <div className="col-sm-1">
                {(props.showActionButtons ? <a role="button" onClick={props.toggleEdit}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                {(props.showActionButtons ? <a role="button" onClick={props.toggleDelete}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        emailAddressTypes: state.systemData.emailAddressTypes,
    };
};

export default connect(mapStateToProps, null)(ContactDetailFormEmailView);
