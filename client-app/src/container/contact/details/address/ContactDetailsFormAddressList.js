import React from 'react';
import { connect } from 'react-redux';

import ContactDetailsFormAddressItem from './ContactDetailsFormAddressItem';

const ContactDetailsFormAddressList = props => {
    const numberOfAddresses = props.addresses.length;
    const addressesNotOld = props.addresses.filter(address => address.typeId !== 'old');
    const numberOfAddressesNotOld = addressesNotOld.length;

    return (
        <div>
            <div className="row border header">
                <div className="col-sm-1">Type</div>
                <div className="col-sm-2">Adres</div>
                <div className="col-sm-1">Postcode</div>
                <div className="col-sm-1">Plaats</div>
                <div className="col-sm-2">Buurt</div>
                {/*<div className="col-sm-2">Land</div>*/}
                <div className="col-sm-2">Energieleverancier</div>
                <div className="col-sm-1">Klantnummer</div>
                <div className="col-sm-1">
                    <span className="pull-right">Primair</span>
                </div>
                <div className="col-sm-1" />
            </div>
            {props.addresses.length > 0 ? (
                props.addresses.map(address => {
                    return (
                        <ContactDetailsFormAddressItem
                            key={address.id}
                            address={address}
                            numberOfAddresses={numberOfAddresses}
                            numberOfAddressesNotOld={numberOfAddressesNotOld}
                            setAddressEnergySupplierNewOrEditOpen={props.setAddressEnergySupplierNewOrEditOpen}
                            addressEnergySupplierNewOrEditOpen={props.addressEnergySupplierNewOrEditOpen}
                            setAddressDongleNewOrEditOpen={props.setAddressDongleNewOrEditOpen}
                            addressDongleNewOrEditOpen={props.addressDongleNewOrEditOpen}
                        />
                    );
                })
            ) : (
                <div>Geen adres bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        addresses: state.contactDetails.addresses,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormAddressList);
