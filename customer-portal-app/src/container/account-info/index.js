import React from 'react';
import AccountInfoForm from './Form';

const AccountInfo = function() {
    // TODO Fetch values from API
    const initialValues = {
        clientNr: 'C2019-1',
        contactName: 'Rob Rollenberg',
        email: 'robennoortje@rollenberg.net',
        password: 'geheim',
        titleId: '1',
        firstName: 'Rob',
        lastNamePrefixId: '',
        lastName: 'Rollenberg',
        emailAddress1: '',
        emailAddress2: '',
        telephoneNumber1: '',
        telephoneNumber2: '',
        street: '',
        number: '',
        addition: '',
        postalCode: '',
        city: '',
        countryId: '',
        iban: '',
        ibanName: '',
        didAgreeAvg: '',
        energySupplierId: '',
    };

    return (
        <div className="content-section">
            <div className="content-container w-container">
                <h1 className="content-heading">Contactgegevens</h1>
                <div className="w-form" />
                <AccountInfoForm initialValues={initialValues} />
            </div>
        </div>
    );
};

export default AccountInfo;
