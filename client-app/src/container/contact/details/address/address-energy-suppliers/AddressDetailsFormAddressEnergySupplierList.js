import React from 'react';
import AddressDetailsFormAddressEnergySupplierItem from './AddressDetailsFormAddressEnergySupplierItem';

const AddressDetailsFormAddressEnergySupplierList = ({
    address,
    setAddressEnergySupplierNewOrEditOpen,
    addressEnergySupplierNewOrEditOpen,
}) => {
    const addressEnergySuppliers = address.addressEnergySuppliers || [];

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

            {addressEnergySuppliers.length > 0 ? (
                addressEnergySuppliers.map(addressEnergySupplier => (
                    <AddressDetailsFormAddressEnergySupplierItem
                        key={addressEnergySupplier.id}
                        addressEnergySupplier={addressEnergySupplier}
                        address={address}
                        setAddressEnergySupplierNewOrEditOpen={setAddressEnergySupplierNewOrEditOpen}
                        addressEnergySupplierNewOrEditOpen={addressEnergySupplierNewOrEditOpen}
                    />
                ))
            ) : (
                <div>Geen energieleveranciers bekend.</div>
            )}
        </div>
    );
};

export default AddressDetailsFormAddressEnergySupplierList;
