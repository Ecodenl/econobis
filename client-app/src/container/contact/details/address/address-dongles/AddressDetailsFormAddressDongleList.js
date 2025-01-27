import React from 'react';

import AddressDetailsFormAddressDongleItem from './AddressDetailsFormAddressDongleItem';

const AddressDetailsFormAddressDongleList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-3">Type uitlezing</div>
                <div className="col-sm-8">Startdatum</div>
                <div className="col-sm-1" />
            </div>
            {props.address.addressDongles && props.address.addressDongles.length > 0 ? (
                props.address.addressDongles.map(addressDongle => {
                    return (
                        <AddressDetailsFormAddressDongleItem
                            key={addressDongle.id}
                            addressDongle={addressDongle}
                            address={props.address}
                            setAddressDongleNewOrEditOpen={props.setAddressDongleNewOrEditOpen}
                            addressDongleNewOrEditOpen={props.addressDongleNewOrEditOpen}
                        />
                    );
                })
            ) : (
                <div>Geen dongels bekend.</div>
            )}
        </div>
    );
};

export default AddressDetailsFormAddressDongleList;
