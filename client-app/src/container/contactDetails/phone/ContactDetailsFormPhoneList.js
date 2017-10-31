import React from 'react';
import {connect} from 'react-redux';

import ContactDetailFormPhoneItem from "./ContactDetailsFormPhoneItem";

const ContactDetailsFormPhoneList = props => {
    return (
        <div>
            {
                props.phoneNumbers.length > 0 ?
                    props.phoneNumbers.map(phoneNumber => {
                        return <ContactDetailFormPhoneItem
                            key={phoneNumber.id}
                            phoneNumber={phoneNumber}
                        />;
                    })
                    :
                    <div>Geen telefoon gegevens gevonden!</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        phoneNumbers: state.contactDetails.phoneNumbers,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormPhoneList);