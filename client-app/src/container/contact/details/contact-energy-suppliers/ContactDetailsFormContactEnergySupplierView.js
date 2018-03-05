import React from 'react';
import moment from "moment/moment";
import {connect} from "react-redux";
moment.locale('nl');

const ContactDetailsFormContactEnergySupplierView = props => {
    const {energySupplier, contactEnergySupplyType, memberSince, contactEnergySupplyStatus, switchDate, isCurrentSupplier } = props.contactEnergySupplier;

    return (
        <div className={`row border ${props.highlightLine}`} onMouseEnter={() => props.onLineEnter()} onMouseLeave={() => props.onLineLeave()}>
            <div onClick={props.openEdit}>

                <div className="col-sm-2">
                    { energySupplier && energySupplier.name }
                </div>
                <div className="col-sm-2">
                    { contactEnergySupplyType ? contactEnergySupplyType.name : '' }
                </div>
                <div className="col-sm-2">
                    {memberSince ? moment(memberSince).format('L') : ''}
                </div>
                <div className="col-sm-2">
                    { contactEnergySupplyStatus && contactEnergySupplyStatus.name }
                </div>
                <div className="col-sm-2">
                    {switchDate ? moment(switchDate).format('L') : ''}
                </div>
                <div className="col-sm-1">
                    {isCurrentSupplier ? 'Ja' : ''}
                </div>
            </div>
            <div className="col-sm-1">
                {(props.showActionButtons && (props.permissions.updatePerson || props.permissions.updateOrganisation) ? <a role="button" onClick={props.openEdit}><span className="glyphicon glyphicon-pencil mybtn-success" /> </a> : '')}
                {(props.showActionButtons && (props.permissions.updatePerson || props.permissions.updateOrganisation) ? <a role="button" onClick={props.toggleDelete}><span className="glyphicon glyphicon-trash mybtn-danger"  /> </a> : '')}
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        permissions: state.meDetails.permissions
    }
};

export default connect(mapStateToProps)(ContactDetailsFormContactEnergySupplierView);
