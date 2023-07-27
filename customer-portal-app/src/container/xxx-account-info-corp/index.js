import React from 'react';
import AccountInfoCorpForm from './Form';

const AccountInfoCorp = function() {
    // TODO Fetch values from API
    const initialValues = {
        number: 'C2019-1',
        email: 'robennoortje@rollenberg.net',
        companyName: 'Rollenberg BV',
        chamberOfCommerceNumber: '12345678',
        vatNumber: 'NL190934955B01',
        iban: '',
        website: 'http://',
        emailAddress1: '',
        emailAddress2: '',
        telephoneNumber1: '',
        telephoneNumber2: '',
        visitStreet: '',
        visitStreetNumber: '',
        visitStreetAddition: '',
        visitPostalCode: '',
        visitCity: '',
        visitCountryId: '',
        postalStreet: '',
        postalStreetNumber: '',
        postalStreetAddition: '',
        postalPostalCode: '',
        postalCity: '',
        postalCountryId: '',
        invoiceStreet: '',
        invoiceStreetNumber: '',
        invoiceStreetAddition: '',
        invoicePostalCode: '',
        invoiceCity: '',
        invoiceCountryId: '',
        didAgreeAvg: false,
        dateDidAgreeAvg: '',
        primaryOccupationContactName: 'Rob Rollenberg',
        primaryOccupationContactRole: 'Eigenaar',
        occupations: [
            { name: 'Noortje Rollenberg', role: 'Secretaris' },
            { name: 'Julia Rollenberg', role: 'Medewerker' },
            { name: 'Jasper Rollenberg', role: 'Medewerker' },
            { name: 'Jente Rollenberg', role: 'Medewerker' },
        ],
    };

    return (
        <div className="content-section">
            <div className="content-container w-container">
                <h1 className="content-heading">Contactgegevens zakelijk</h1>
                <div className="w-form" />
                <AccountInfoCorpForm initialValues={initialValues} />
            </div>
        </div>
    );
};

export default AccountInfoCorp;
