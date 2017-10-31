import React from 'react';
import {connect} from 'react-redux';

import ContactDetailFormAddressItem from "./ContactDetailsFormAddressItem";

const ContactDetailsFormAddressList = props => {
    return (
        <div>
            {
                props.addresses.length > 0 ?
                    props.addresses.map(address => {
                        return <ContactDetailFormAddressItem
                            key={address.id}
                            address={address}
                        />;
                    })
                    :
                    <div>Geen adres bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        addresses: state.contactDetails.addresses,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormAddressList);
