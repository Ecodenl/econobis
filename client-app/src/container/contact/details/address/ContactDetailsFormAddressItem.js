import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { isEqual } from 'lodash';

import { setError } from '../../../../actions/general/ErrorActions';
import AddressAPI from '../../../../api/contact/AddressAPI';
import { unsetPrimaryAddresses, updateAddress } from '../../../../actions/contact/ContactDetailsActions';
import ContactDetailsFormAddressView from './ContactDetailsFormAddressView';
import ContactDetailsFormAddressEdit from './ContactDetailsFormAddressEdit';
import ContactDetailsFormAddressDelete from './ContactDetailsFormAddressDelete';
import Modal from '../../../../components/modal/Modal';
import AddressDetailsFormAddressEnergySupplier from './address-energy-suppliers/AddressDetailsFormAddressEnergySupplier';
import SharedAreaAPI from '../../../../api/shared-area/SharedAreaAPI';
import FreeFields from '../../../../components/freeFields/FreeFields';
import Dongles from './address-dongles/AddressDetailsFormAddressDongle';

function ContactDetailsFormAddressItem(props) {
    const dispatch = useDispatch();

    const permissions = useSelector(state => state.meDetails.permissions);
    const useDongleRegistration = useSelector(state => state.systemData?.cooperation?.use_dongle_registration ?? false);

    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState({
        title: '',
        buttonCancelText: '',
        showConfirmAction: false,
        confirmAction: {},
        buttonConfirmText: '',
        text: '',
    });

    const [showActionButtons, setShowActionButtons] = useState(false);
    const [highlightLine, setHighlightLine] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [showAddressEnergySupplier, setShowAddressEnergySupplier] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [address, setAddress] = useState({ ...props.address });

    const [errors, setErrors] = useState({
        typeId: false,
        postalCode: false,
        number: false,
        countryId: false,
        endDate: false,
        eanElectricity: false,
        eanGas: false,
    });

    useEffect(() => {
        if (!isEqual(address, props.address)) {
            setAddress({ ...props.address });
        }
    }, [props.address]);

    useEffect(() => {
        const { postalCode, number, city, street } = address;

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
    }, [address.postalCode, address.number, address.city, address.street]);

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

    const onLineEnter = () => {
        setShowActionButtons(true);
        setHighlightLine('highlight-line');
    };

    const onLineLeave = () => {
        setShowActionButtons(false);
        setHighlightLine('');
    };

    const openEdit = () => {
        if (props.numberOfAddressesNotOld > 0 || address.primary === true) {
            setShowEdit(true);
            props.setAddressEnergySupplierNewOrEditOpen(true);
        }
    };

    const closeEdit = () => {
        setShowEdit(false);
        props.setAddressEnergySupplierNewOrEditOpen(false);
    };

    const openAddressEnergySupplier = () => {
        setShowAddressEnergySupplier(true);
    };

    const closeAddressEnergySupplier = () => {
        setShowAddressEnergySupplier(false);
        props.setAddressEnergySupplierNewOrEditOpen(false);
    };

    const cancelEdit = () => {
        setAddress({ ...props.address });
        closeEdit();
    };

    const toggleDelete = () => {
        setShowDelete(!showDelete);
    };

    const handleInputChange = event => {
        const { name, type, checked, value } = event.target;
        const newValue = type === 'checkbox' ? checked : value;

        const newAddress = { ...address, [name]: newValue };
        setAddress(newAddress);

        // Check special warnings
        if (
            name === 'typeId' &&
            newValue === 'old' &&
            address.usedInActiveParticipationInSceOrPcrProject &&
            address.primary
        ) {
            setModalContent({
                title: 'Waarschuwing',
                buttonCancelText: 'Ok',
                showConfirmAction: false,
                confirmAction: {},
                buttonConfirmText: '',
                text:
                    'Er is een deelname in een SCE of Postcoderoos project op dit adres. Deze deelname moet worden beëindigd en er moet een nieuwe deelname op het nieuwe adres worden aangemaakt. Er zal een taak aangemaakt worden.',
            });
            setShowModal(true);
        }

        if (
            name === 'typeId' &&
            newValue === 'old' &&
            address.usedInActiveParticipationNotInSceOrPcrProject &&
            !address.primary
        ) {
            setModalContent({
                title: 'Waarschuwing',
                buttonCancelText: 'Ok',
                showConfirmAction: false,
                confirmAction: {},
                buttonConfirmText: '',
                text:
                    'Er is een deelname in een project op dit adres. Deze deelname zal worden overgezet naar het primaire adres.',
            });
            setShowModal(true);
        }
    };

    const handleInputChangeDate = (value, name) => {
        setAddress(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        const updatedAddress = { ...address };
        let localErrors = {};
        let hasErrors = false;

        if (updatedAddress.postalCode) {
            updatedAddress.postalCode = updatedAddress.postalCode.toUpperCase();
        }

        if (validator.isEmpty(updatedAddress.postalCode + '')) {
            localErrors.postalCode = true;
            hasErrors = true;
        }

        let countryId = updatedAddress.countryId || 'NL';

        if (!validator.isEmpty(updatedAddress.postalCode + '')) {
            const isValid =
                countryId === 'NL'
                    ? validator.isPostalCode(updatedAddress.postalCode, 'NL')
                    : validator.isPostalCode(updatedAddress.postalCode, 'any');

            if (!isValid) {
                localErrors.postalCode = true;
                localErrors.countryId = true;
                hasErrors = true;
            }
        }

        if (validator.isEmpty(updatedAddress.number + '')) {
            localErrors.number = true;
            hasErrors = true;
        }

        if (validator.isEmpty(updatedAddress.typeId + '')) {
            localErrors.typeId = true;
            hasErrors = true;
        }

        if (
            updatedAddress.typeId === 'old' &&
            (updatedAddress.endDate === null || validator.isEmpty(updatedAddress.endDate))
        ) {
            localErrors.endDate = true;
            hasErrors = true;
        }

        setErrors(localErrors);

        if (!hasErrors) {
            try {
                const response = await AddressAPI.updateAddress(updatedAddress);
                if (updatedAddress.primary) {
                    dispatch(unsetPrimaryAddresses());
                }
                dispatch(updateAddress(response.data.data));
                closeEdit();
            } catch (error) {
                dispatch(setError(error.response.status, error.response.data.message));
            }
        }
    };

    return (
        <div>
            <ContactDetailsFormAddressView
                highlightLine={highlightLine}
                showActionButtons={showActionButtons}
                onLineEnter={onLineEnter}
                onLineLeave={onLineLeave}
                openEdit={openEdit}
                showEdit={showEdit}
                openAddressEnergySupplier={openAddressEnergySupplier}
                toggleDelete={toggleDelete}
                numberOfAddressesNotOld={props.numberOfAddressesNotOld}
                address={address}
                addressEnergySupplierNewOrEditOpen={props.addressEnergySupplierNewOrEditOpen}
            />
            {permissions.updateContactAddress && showEdit && (
                <>
                    <ContactDetailsFormAddressEdit
                        numberOfAddresses={props.numberOfAddresses}
                        numberOfAddressesNotOld={props.numberOfAddressesNotOld}
                        address={address}
                        handleInputChange={handleInputChange}
                        handleInputChangeDate={handleInputChangeDate}
                        handleSubmit={handleSubmit}
                        typeIdError={errors.typeId}
                        endDateError={errors.endDate}
                        postalCodeError={errors.postalCode}
                        numberError={errors.number}
                        countryIdError={errors.countryId}
                        eanElectricityError={errors.eanElectricity}
                        eanGasError={errors.eanGas}
                        cancelEdit={cancelEdit}
                    />
                    <FreeFields table={'addresses'} recordId={props.address.id} />

                    {permissions.manageDongles && useDongleRegistration && (
                        <Dongles
                            address={address}
                            setAddressDongleNewOrEditOpen={props.setAddressDongleNewOrEditOpen}
                            closeAddressDongle={props.closeAddressDongle}
                            addressDongleNewOrEditOpen={props.addressDongleNewOrEditOpen}
                        />
                    )}
                </>
            )}
            {showAddressEnergySupplier && (
                <AddressDetailsFormAddressEnergySupplier
                    address={address}
                    setAddressEnergySupplierNewOrEditOpen={props.setAddressEnergySupplierNewOrEditOpen}
                    closeAddressEnergySupplier={closeAddressEnergySupplier}
                    addressEnergySupplierNewOrEditOpen={props.addressEnergySupplierNewOrEditOpen}
                />
            )}
            {permissions.deleteContactAddress && showDelete && (
                <ContactDetailsFormAddressDelete
                    closeDeleteItemModal={toggleDelete}
                    numberOfAddresses={props.numberOfAddresses}
                    {...props.address}
                />
            )}
            {showModal && (
                <Modal
                    title={modalContent.title}
                    closeModal={closeModal}
                    showConfirmAction={modalContent.showConfirmAction}
                    confirmAction={modalContent.confirmAction}
                    buttonCancelText={modalContent.buttonCancelText}
                    buttonConfirmText={modalContent.buttonConfirmText}
                >
                    {modalContent.text}
                </Modal>
            )}
        </div>
    );
}

export default ContactDetailsFormAddressItem;
