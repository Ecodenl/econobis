import React from 'react';
import { connect } from 'react-redux';

import GetNameByIdHelper from '../../../helpers/GetNameByIdHelper';

const ContactDetailFormEmailView = props => {
    const {email, typeId, primary} = props.emailAddress;

    return (
        <div className={`row ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div onClick={props.openEdit}>
                <div className="col-sm-2">
                    <strong><GetNameByIdHelper id={typeId} items={props.emailAddressTypes} /></strong>
                </div>
                <div className="col-sm-8">
                    {email}
                </div>
                <div className="col-sm-1">
                    { primary ? <span className="h6">Primair</span> : '' }
                </div>
            </div>
            <div className="col-sm-1">
                {(props.showActionButtons ? <a role="button" onClick={props.openEdit}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
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
