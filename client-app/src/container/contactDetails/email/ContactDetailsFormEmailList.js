import React from 'react';
import {connect} from 'react-redux';

import ContactDetailFormEmailItem from "./ContactDetailsFormEmailItem";

const ContactDetailsFormEmailList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Type</div>
                <div className="col-sm-8">Email</div>
                <div className="col-sm-1">Primair</div>
                <div className="col-sm-1"></div>
            </div>
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
