import React from 'react';
import {connect} from 'react-redux';

import ContactDetailFormEmailItem from "./ContactDetailsFormEmailItem";

const ContactDetailsFormEmailList = props => {
    return (
        <div>
            {
                props.emailAddresses.length > 0 ?
                    props.emailAddresses.map(emailAddress => {
                        return <ContactDetailFormEmailItem
                            key={emailAddress.id}
                            emailAddress={emailAddress}
                        />;
                    })
                    :
                    <div>Geen e-mail adressen bekend</div>
            }
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        emailAddresses: state.contactDetails.emailAddresses,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormEmailList);