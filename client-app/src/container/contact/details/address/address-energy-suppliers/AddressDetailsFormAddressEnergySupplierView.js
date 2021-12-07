import React from 'react';
import moment from 'moment/moment';
import { connect } from 'react-redux';
moment.locale('nl');

const AddressDetailsFormAddressEnergySupplierView = props => {
    const {
        energySupplier,
        energySupplyType,
        memberSince,
        energySupplyStatus,
        switchDate,
        endDate,
        esNumber,
        isCurrentSupplier,
    } = props.addressEnergySupplier;

    return (
        <div
            className={`row border ${props.highlightLine}`}
            onMouseEnter={() => props.onLineEnter()}
            onMouseLeave={() => props.onLineLeave()}
        >
            <div onClick={props.openEdit}>
                <div className="col-sm-2">{energySupplier && energySupplier.name}</div>
                <div className="col-sm-1">{energySupplyType ? energySupplyType.name : ''}</div>
                <div className="col-sm-1">{memberSince ? moment(memberSince).format('L') : ''}</div>
                <div className="col-sm-1">{endDate ? moment(endDate).format('L') : ''}</div>
                <div className="col-sm-2">{energySupplyStatus && energySupplyStatus.name}</div>
                <div className="col-sm-1">{switchDate ? moment(switchDate).format('L') : ''}</div>
                <div className="col-sm-1">{esNumber && esNumber}</div>
                <div className="col-sm-1">{isCurrentSupplier ? 'Ja' : ''}</div>
            </div>
            <div className="col-sm-1">
                {props.showActionButtons && (props.permissions.updatePerson || props.permissions.updateOrganisation) ? (
                    <a role="button" onClick={props.openEdit}>
                        <span className="glyphicon glyphicon-pencil mybtn-success" />{' '}
                    </a>
                ) : (
                    ''
                )}
                {props.showActionButtons && (props.permissions.updatePerson || props.permissions.updateOrganisation) ? (
                    <a role="button" onClick={props.toggleDelete}>
                        <span className="glyphicon glyphicon-trash mybtn-danger" />{' '}
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

export default connect(mapStateToProps)(AddressDetailsFormAddressEnergySupplierView);
