import React from 'react';
import { connect } from 'react-redux';

import ContactDetailFormEmailItem from './ContactDetailsFormEmailItem';

const ContactDetailsFormEmailList = props => {
    return (
        <div>
            <div className="row border header">
                <div className="col-sm-2">Type</div>
                <div className="col-sm-7">E-mail</div>
                <div className="col-sm-2">
                    <span className="pull-right">Primair</span>
                </div>
                <div className="col-sm-1" />
            </div>
            {props.emailAddresses.length > 0 ? (
                props.emailAddresses.map(emailAddress => {
                    return <ContactDetailFormEmailItem key={emailAddress.id} emailAddress={emailAddress} />;
                })
            ) : (
                <div>Geen e-mailadressen bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        emailAddresses: state.contactDetails.emailAddresses,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormEmailList);
