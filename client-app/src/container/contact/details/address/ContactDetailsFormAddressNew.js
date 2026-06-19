import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setError } from '../../../../actions/general/ErrorActions';
import AddressAPI from '../../../../api/contact/AddressAPI';
import { newAddress, unsetPrimaryAddresses } from '../../../../actions/contact/ContactDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import validator from 'validator';
import InputToggle from '../../../../components/form/InputToggle';
import InputDate from '../../../../components/form/InputDate';
import SharedAreaAPI from '../../../../api/shared-area/SharedAreaAPI';

function ContactDetailsFormAddressNew({ toggleShowNew }) {
    const dispatch = useDispatch();

    const addresses = useSelector(state => state.contactDetails.addresses);
    const addressTypes = useSelector(state => state.systemData.addressTypes);
    const countries = useSelector(state => state.systemData.countries);
    const contactId = useSelector(state => state.contactDetails.id);

    const numberOfAddressesNotOld = addresses.filter(address => address.typeId !== 'old').length;

    const [address, setAddress] = useState({
        contactId,
        street: '',
        number: '',
        addition: '',
        postalCode: '',
        city: '',
        areaName: '',
        districtName: '',
        typeId: 'visit',
        endDate: '',
        primary: numberOfAddressesNotOld === 0,
        countryId: '',
        eanElectricity: '',
        eanGas: '',
    });

    const [errors, setErrors] = useState({
        typeId: false,
        endDate: false,
        postalCode: false,
        number: false,
        countryId: false,
        eanElectricity: false,
        eanGas: false,
    });

    const handleInputChange = event => {
        const { name, value, type, checked } = event.target;
        setAddress(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleInputChangeDate = (value, name) => {
        setAddress(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // 🧠 Auto-aanvullen adres via Lvbag
    useEffect(() => {
        const { postalCode, number, street, city } = address;

        const shouldFetch =
            !validator.isEmpty(postalCode + '') &&
            validator.isPostalCode(postalCode, 'NL') &&
            !validator.isEmpty(number + '') &&
            validator.isEmpty(city + '') &&
            validator.isEmpty(street + '');

        if (shouldFetch) {
            const timeoutId = setTimeout(() => {
                AddressAPI.getLvbagAddress(postalCode, number).then(payload => {
                    setAddress(prev => ({
                        ...prev,
                        street: payload.street,
                        city: payload.city,
                    }));
                });
            }, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [address.postalCode, address.number, address.street, address.city]);

    // 🧠 Auto-aanvullen buurt/wijk
    useEffect(() => {
        const { postalCode, number } = address;

        const shouldFetch =
            !validator.isEmpty(postalCode + '') &&
            validator.isPostalCode(postalCode, 'NL') &&
            !validator.isEmpty(number + '');

        if (shouldFetch) {
            const timeoutId = setTimeout(() => {
                SharedAreaAPI.getSharedAreaDetails(postalCode, number).then(payload => {
                    setAddress(prev => ({
                        ...prev,
                        areaName: payload.areaName,
                        districtName: payload.districtName,
                    }));
                });
            }, 100);
            return () => clearTimeout(timeoutId);
        }
    }, [address.postalCode, address.number]);

    const handleSubmit = event => {
        event.preventDefault();

        const updatedAddress = { ...address, postalCode: address.postalCode.toUpperCase() };

        let newErrors = {};
        let hasErrors = false;

        if (validator.isEmpty(updatedAddress.postalCode + '')) {
            newErrors.postalCode = true;
            hasErrors = true;
        }

        let countryId = updatedAddress.countryId;
        if (validator.isEmpty(countryId + '')) {
            countryId = 'NL';
        }

        let postalCodeValid = true;
        if (!validator.isEmpty(updatedAddress.postalCode + '')) {
            postalCodeValid = validator.isPostalCode(updatedAddress.postalCode, countryId === 'NL' ? 'NL' : 'any');
            if (!postalCodeValid) {
                newErrors.postalCode = true;
                newErrors.countryId = true;
                hasErrors = true;
            }
        }

        if (validator.isEmpty(updatedAddress.number + '')) {
            newErrors.number = true;
            hasErrors = true;
        }

        if (validator.isEmpty(updatedAddress.typeId + '')) {
            newErrors.typeId = true;
            hasErrors = true;
        }

        if (
            updatedAddress.typeId === 'old' &&
            (updatedAddress.endDate === null || validator.isEmpty(updatedAddress.endDate))
        ) {
            newErrors.endDate = true;
            hasErrors = true;
        }

        if (updatedAddress.typeId === 'old' && updatedAddress.primary) {
            newErrors.typeId = true;
            hasErrors = true;
        }

        setErrors(newErrors);

        if (!hasErrors) {
            AddressAPI.newAddress(updatedAddress)
                .then(payload => {
                    if (updatedAddress.primary) {
                        dispatch(unsetPrimaryAddresses());
                    }
                    dispatch(newAddress(payload.data.data));
                    toggleShowNew();
                })
                .catch(error => {
                    dispatch(setError(error.response.status, error.response.data.message));
                });
        }
    };

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel className={'panel-grey'}>
                <PanelBody>
                    <div className="row">
                        <InputText
                            label={'Postcode'}
                            size={'col-sm-4'}
                            name={'postalCode'}
                            value={address.postalCode}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.postalCode}
                        />
                        <div className="form-group col-sm-6">
                            <label htmlFor={'number'} className={`col-sm-6 required`}>
                                {'Nummer'}
                            </label>
                            <div className={`col-sm-4`}>
                                <input
                                    type={'number'}
                                    className={`form-control input-sm ${errors.number ? 'has-error' : ''}`}
                                    id={'number'}
                                    name={'number'}
                                    value={address.number}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className={`col-sm-2`}>
                                <input
                                    type={'text'}
                                    className="form-control input-sm"
                                    id={'addition'}
                                    name={'addition'}
                                    value={address.addition}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <InputText
                            label={'Adres'}
                            id={'adres'}
                            size={'col-sm-6'}
                            name={'street'}
                            value={address.street}
                            onChangeAction={handleInputChange}
                        />
                        <InputText
                            label={'Plaats'}
                            id={'plaats'}
                            size={'col-sm-6'}
                            name={'city'}
                            value={address.city}
                            onChangeAction={handleInputChange}
                        />
                    </div>

                    <div className="row">
                        <InputSelect
                            label={'Type'}
                            id="type"
                            size={'col-sm-6'}
                            name={'typeId'}
                            options={addressTypes}
                            value={address.typeId}
                            onChangeAction={handleInputChange}
                            required={'required'}
                            error={errors.typeId}
                        />
                        {address.typeId === 'old' && (
                            <InputDate
                                label="Eind datum"
                                name="endDate"
                                value={address.endDate}
                                onChangeAction={handleInputChangeDate}
                                error={errors.endDate}
                            />
                        )}
                    </div>

                    <div className="row">
                        <InputText
                            label={'Buurt'}
                            id={'areaName'}
                            size={'col-sm-6'}
                            name={'areaName'}
                            value={address.areaName}
                            disabled={true}
                        />
                        <InputText
                            label={'Wijk'}
                            id={'districtName'}
                            size={'col-sm-6'}
                            name={'districtName'}
                            value={address.districtName}
                            disabled={true}
                        />
                    </div>

                    <div className="row">
                        <InputSelect
                            label={'Land'}
                            id="countryId"
                            size={'col-sm-6'}
                            name={'countryId'}
                            options={countries}
                            value={address.countryId}
                            onChangeAction={handleInputChange}
                            error={errors.countryId}
                        />
                        <InputToggle
                            label={'Primair adres'}
                            name={'primary'}
                            value={address.primary}
                            onChangeAction={handleInputChange}
                            disabled={numberOfAddressesNotOld === 0}
                        />
                    </div>

                    <div className="row">
                        <InputText
                            label={'EAN elektriciteit'}
                            id={'eanElectricity'}
                            name={'eanElectricity'}
                            value={address.eanElectricity}
                            onChangeAction={handleInputChange}
                            error={errors.eanElectricity}
                        />
                        <InputText
                            label={'EAN gas'}
                            id={'eanGas'}
                            name={'eanGas'}
                            value={address.eanGas}
                            onChangeAction={handleInputChange}
                            error={errors.eanGas}
                        />
                    </div>

                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={toggleShowNew}
                        />
                        <ButtonText buttonText={'Opslaan'} type={'submit'} />
                    </div>
                </PanelBody>
            </Panel>
        </form>
    );
}

export default ContactDetailsFormAddressNew;
