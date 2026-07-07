import React from 'react';
import moment from 'moment/moment';
import { connect } from 'react-redux';

import Icon from 'react-icons-kit';
import { pencil } from 'react-icons-kit/fa/pencil';
import { trash } from 'react-icons-kit/fa/trash';

moment.locale('nl');

const AddressDetailsFormAddressEnergySupplierView = ({
    addressEnergySupplier,
    highlightLine,
    onLineEnter,
    onLineLeave,
    openEdit,
    toggleDelete,
    showActionButtons,
    addressEnergySupplierNewOrEditOpen,
    permissions,
}) => {
    const {
        energySupplier,
        energySupplyType,
        memberSince,
        energySupplyStatus,
        switchDate,
        endDate,
        esNumber,
        isCurrentSupplier,
    } = addressEnergySupplier;

    const canEditOrDelete =
        showActionButtons &&
        !addressEnergySupplierNewOrEditOpen &&
        (permissions.updatePerson || permissions.updateOrganisation);

    return (
        <div className={`row border ${highlightLine}`} onMouseEnter={onLineEnter} onMouseLeave={onLineLeave}>
            <div className="col-sm-2" onClick={openEdit}>
                {energySupplier?.name || ''}
            </div>
            <div className="col-sm-1" onClick={openEdit}>
                {energySupplyType?.name || ''}
            </div>
            <div className="col-sm-1" onClick={openEdit}>
                {memberSince ? moment(memberSince).format('L') : ''}
            </div>
            <div className="col-sm-1" onClick={openEdit}>
                {endDate ? moment(endDate).format('L') : ''}
            </div>
            <div className="col-sm-2" onClick={openEdit}>
                {energySupplyStatus?.name || ''}
            </div>
            <div className="col-sm-1" onClick={openEdit}>
                {switchDate ? moment(switchDate).format('L') : ''}
            </div>
            <div className="col-sm-1" onClick={openEdit}>
                {esNumber || ''}
            </div>
            <div className="col-sm-1" onClick={openEdit}>
                {isCurrentSupplier ? 'Ja' : ''}
            </div>

            <div className="col-sm-1">
                {canEditOrDelete && (
                    <>
                        {permissions.updateContactAddress && (
                            <a role="button" onClick={openEdit} title="Wijzigen leveranciergegevens">
                                <Icon className="mybtn-success" size={14} icon={pencil} />
                            </a>
                        )}
                        {permissions.deleteContactAddress && (
                            <a role="button" onClick={toggleDelete} title="Verwijderen leveranciergegevens">
                                <Icon className="mybtn-danger" size={14} icon={trash} />
                            </a>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    permissions: state.meDetails.permissions,
});

export default connect(mapStateToProps)(AddressDetailsFormAddressEnergySupplierView);
