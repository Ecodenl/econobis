import React from 'react';
import { connect } from 'react-redux';

import AddressDetailsFormAddressEnergySupplierItem from './AddressDetailsFormAddressEnergySupplierItem';

const AddressDetailsFormAddressEnergySupplierList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Energieleverancier</div>
                <div className="col-sm-1">Type</div>
                <div className="col-sm-1">Klant sinds</div>
                <div className="col-sm-1">Klant einddatum</div>
                <div className="col-sm-2">Overstap status</div>
                <div className="col-sm-1">Mogelijke overstap datum</div>
                <div className="col-sm-1">Klantnummer</div>
                <div className="col-sm-1">Huidige</div>
                <div className="col-sm-1" />
            </div>
            {props.address.addressEnergySuppliers.length > 0 ? (
                props.address.addressEnergySuppliers.map(addressEnergySupplier => {
                    return (
                        <AddressDetailsFormAddressEnergySupplierItem
                            key={addressEnergySupplier.id}
                            addressEnergySupplier={addressEnergySupplier}
                            address={props.address}
                            setAddressEnergySupplierNewOrEditOpen={props.setAddressEnergySupplierNewOrEditOpen}
                            addressEnergySupplierNewOrEditOpen={props.addressEnergySupplierNewOrEditOpen}
                        />
                    );
                })
            ) : (
                <div>Geen energieleveranciers bekend.</div>
            )}
        </div>
    );
};

export default AddressDetailsFormAddressEnergySupplierList;
