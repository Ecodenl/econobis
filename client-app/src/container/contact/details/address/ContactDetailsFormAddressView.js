import React from 'react';
import { connect } from 'react-redux';

import GetNameByIdHelper from '../../../../helpers/GetNameByIdHelper';

const ContactDetailFormAddressView = props => {
    const {typeId, street, number, postalCode, city, primary } = props.address;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div onClick={props.openEdit}>
                <div className="col-sm-2">
                    <GetNameByIdHelper id={typeId} items={props.addressTypes} />
                </div>
                <div className="col-sm-3">
                    { street + ' ' + number }
                </div>
                <div className="col-sm-2">
                    { postalCode }
                </div>
                <div className="col-sm-3">
                    { city }
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
        addressTypes: state.systemData.addressTypes,
    };
};

export default connect(mapStateToProps, null)(ContactDetailFormAddressView);
