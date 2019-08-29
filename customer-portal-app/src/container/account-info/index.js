import React, { useState, useEffect } from 'react';
import AccountInfoForm from './Form';
import CustomerAPI from '../../api/customer/CustomerAPI';

// Todo fetch from API
const energySuppliers = [
    { id: 1, name: 'OM' },
    { id: 2, name: 'Budget Energie' },
    { id: 3, name: 'E.on' },
    { id: 4, name: 'Eneco' },
    { id: 5, name: 'Energiedirect' },
    { id: 6, name: 'Engie' },
    { id: 7, name: 'Essent' },
    { id: 8, name: 'Greenchoice' },
    { id: 9, name: 'Holland Wind' },
];

const AccountInfo = function() {
    const [customerData, setCustomerData] = useState({});
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        function callFetchCustomerDetails() {
            setLoading(true);
            CustomerAPI.fetchCustomerDetails()
                .then(payload => {
                    setCustomerData(payload.data.data);
                    setLoading(false);
                })
                .catch(error => {
                    alert('Er is iets misgegaan met laden. Herlaad de pagina opnieuw.');
                    setLoading(false);
                });
        }

        callFetchCustomerDetails();
    }, []);

    // TODO Fetch values from API
    const initialValues = {
        number: customerData.number,
        contactName: customerData.fullName,
        email: 'robennoortje@rollenberg.net',
        titleId: '1',
        firstName: 'Rob',
        lastNamePrefixId: '',
        lastName: 'Rollenberg',
        emailAddress1: '',
        emailAddress2: '',
        telephoneNumber1: '',
        telephoneNumber2: '',
        street: '',
        streetNumber: '',
        streetAddition: '',
        postalCode: '',
        city: '',
        countryId: '',
        iban: '',
        ibanName: '',
        didAgreeAvg: Boolean(customerData.didAgreeAvg),
        energySupplierId: '1',
        esNumber: '123',
        memberSince: '01-04-2019',
        eanElectricity: '871685900000546779',
        clientNr: '169572',
        clientSince: '01-04-2019',
    };

    function handleEnergySupplierChange(e, setFieldValue) {
        setFieldValue('energySupplierId', e.target.value);

        if (Number(initialValues.energySupplierId) !== e.target.value) {
            setFieldValue('esNumber', '');
            setFieldValue('memberSince', '');
            setFieldValue('eanElectricity', '');
            setFieldValue('clientNr', '');
            setFieldValue('clientSince', '');
        }
    }

    return (
        <div className="content-section">
            <div className="content-container w-container">
                <h1 className="content-heading">Contactgegevens</h1>
                <div className="w-form" />
                <AccountInfoForm
                    initialValues={initialValues}
                    energySuppliers={energySuppliers}
                    handleEnergySupplierChange={handleEnergySupplierChange}
                />
            </div>
        </div>
    );
};

export default AccountInfo;
