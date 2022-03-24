import React from 'react';
import { connect } from 'react-redux';

import ContactDetailFormAddressItem from './ContactDetailsFormAddressItem';

const ContactDetailsFormAddressList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-1">Type</div>
                <div className="col-sm-3">Adres</div>
                <div className="col-sm-2">Postcode</div>
                <div className="col-sm-2">Plaats</div>
                {/*<div className="col-sm-2">Land</div>*/}
                <div className="col-sm-2">Energieleverancier</div>
                <div className="col-sm-1">
                    <span className="pull-right">Primair</span>
                </div>
                <div className="col-sm-1" />
            </div>
            {props.addresses.length > 0 ? (
                props.addresses.map(address => {
                    return (
                        <ContactDetailFormAddressItem
                            key={address.id}
                            address={address}
                            numberOfAddresses={props.addresses.length}
                            setAddressEnergySupplierNewOrEditOpen={props.setAddressEnergySupplierNewOrEditOpen}
                            addressEnergySupplierNewOrEditOpen={props.addressEnergySupplierNewOrEditOpen}
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
