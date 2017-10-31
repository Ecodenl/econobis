import React from 'react';
import { connect } from 'react-redux';

import GetNameByIdHelper from '../../../helpers/GetNameByIdHelper';

const ContactDetailFormPhoneView = props => {
    const {number, typeId, primary} = props.phoneNumber;

    return (
        <div className={`row ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div className="col-sm-3">
                <strong><GetNameByIdHelper id={typeId} items={props.phoneNumberTypes} /></strong>
            </div>
            <div className="col-sm-2">
                {number}
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
        phoneNumberTypes: state.systemData.phoneNumberTypes,
    };
};

export default connect(mapStateToProps, null)(ContactDetailFormPhoneView);
