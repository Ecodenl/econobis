import React from 'react';
import { connect } from 'react-redux';

import ContactDetailFormPhoneItem from './ContactDetailsFormPhoneItem';

const ContactDetailsFormPhoneList = props => {
    return (
        <div>
            <div className="row header">
                <div className="col-sm-2">Type</div>
                <div className="col-sm-7">Telefoonnummers</div>
                <div className="col-sm-2">
                    <span className="pull-right">Primair</span>
                </div>
                <div className="col-sm-1" />
            </div>
            {props.phoneNumbers.length > 0 ? (
                props.phoneNumbers.map(phoneNumber => {
                    return (
                        <ContactDetailFormPhoneItem
                            key={phoneNumber.id}
                            phoneNumber={phoneNumber}
                            numberOfPhoneNumbers={props.phoneNumbers.length}
                        />
                    );
                })
            ) : (
                <div>Geen telefoonnummers bekend.</div>
            )}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        phoneNumbers: state.contactDetails.phoneNumbers,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormPhoneList);
