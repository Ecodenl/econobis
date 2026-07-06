import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { isEqual } from 'lodash';

import { setError } from '../../../../../actions/general/ErrorActions';
import AddressEnergySupplierAPI from '../../../../../api/contact/AddressEnergySupplierAPI';
import {
    updateStateAddressEnergySupplier,
    fetchContactDetails,
} from '../../../../../actions/contact/ContactDetailsActions';

import AddressDetailsFormAddressEnergySupplierView from './AddressDetailsFormAddressEnergySupplierView';
import AddressDetailsFormAddressEnergySupplierEdit from './AddressDetailsFormAddressEnergySupplierEdit';
import AddressDetailsFormAddressEnergySupplierDelete from './AddressDetailsFormAddressEnergySupplierDelete';
import Modal from '../../../../../components/modal/Modal';

function AddressDetailsFormAddressEnergySupplierItemContainer(props) {
    const navigate = useNavigate();

    return <AddressDetailsFormAddressEnergySupplierItem {...props} navigate={navigate} />;
}

function AddressDetailsFormAddressEnergySupplierItem(props) {
    const {
        addressEnergySupplier: addressEnergySupplierProp,
        address,
        permissions,
        addressEnergySupplierNewOrEditOpen,
        setAddressEnergySupplierNewOrEditOpen,
        updateStateAddressEnergySupplier,
        fetchContactDetails,
        setError,
        navigate,
    } = props;

    const [showActionButtons, setShowActionButtons] = useState(false);
    const [highlightLine, setHighlightLine] = useState('');
    const [showEdit, setShowEdit] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [showMessageDoubleEsNumber, setShowMessageDoubleEsNumber] = useState(false);
    const [messageDoubleEsNumber, setMessageDoubleEsNumber] = useState('');
    const [messageDoubleEsName, setMessageDoubleEsName] = useState('');
    const [messageDoubleEsNumberArray, setMessageDoubleEsNumberArray] = useState([]);

    const [showMessageHasParticipations, setShowMessageHasParticipations] = useState(false);
    const [messageHasParticipations, setMessageHasParticipations] = useState(false);
    const [messageHasParticipationsRedirect, setMessageHasParticipationsRedirect] = useState('');
    const [messageHasParticipationsProjectsArray, setMessageHasParticipationsProjectsArray] = useState([]);

    const [localAddressEnergySupplier, setLocalAddressEnergySupplier] = useState({
        ...addressEnergySupplierProp,
    });

    const [errors, setErrors] = useState({
        memberSince: false,
        endDate: false,
    });

    useEffect(() => {
        if (!isEqual(localAddressEnergySupplier, addressEnergySupplierProp) && !showEdit) {
            setLocalAddressEnergySupplier({ ...addressEnergySupplierProp });
        }
    }, [addressEnergySupplierProp, showEdit]); // bewust geen localAddressEnergySupplier dependency

    const onLineEnter = useCallback(() => {
        setShowActionButtons(true);
        setHighlightLine('highlight-line');
    }, []);

    const onLineLeave = useCallback(() => {
        setShowActionButtons(false);
        setHighlightLine('');
    }, []);

    const openEdit = useCallback(() => {
        setShowEdit(true);
        setAddressEnergySupplierNewOrEditOpen(true);
    }, [setAddressEnergySupplierNewOrEditOpen]);

    const closeEdit = useCallback(() => {
        setShowEdit(false);
        setAddressEnergySupplierNewOrEditOpen(false);
    }, [setAddressEnergySupplierNewOrEditOpen]);

    const cancelEdit = useCallback(() => {
        setLocalAddressEnergySupplier({ ...addressEnergySupplierProp });
        setErrors({
            memberSince: false,
            endDate: false,
        });
        closeEdit();
    }, [addressEnergySupplierProp, closeEdit]);

    const toggleDelete = useCallback(() => {
        setShowDelete(prev => !prev);
    }, []);

    const reloadContact = useCallback(() => {
        fetchContactDetails(address.contactId);
    }, [fetchContactDetails, address.contactId]);

    const handleInputChange = useCallback(event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setLocalAddressEnergySupplier(prev => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleInputChangeDate = useCallback((value, name) => {
        setLocalAddressEnergySupplier(prev => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleSetMessageDoubleEsNumber = useCallback((esNumber, energySupplierName, duplicateArray) => {
        setMessageDoubleEsNumber(esNumber);
        setMessageDoubleEsName(energySupplierName);
        setMessageDoubleEsNumberArray(duplicateArray);
    }, []);

    const hideMessageDoubleEsNumber = useCallback(() => {
        setShowMessageDoubleEsNumber(false);
        setMessageDoubleEsNumber('');
        setMessageDoubleEsName('');
        setMessageDoubleEsNumberArray([]);

        if (messageHasParticipations) {
            setShowMessageHasParticipations(true);
        } else {
            closeEdit();
            reloadContact();
        }
    }, [messageHasParticipations, closeEdit, reloadContact]);

    const handleSetMessageHasParticipations = useCallback((hasParticipations, redirect, projectsArray) => {
        setMessageHasParticipations(hasParticipations);
        setMessageHasParticipationsRedirect(redirect);
        setMessageHasParticipationsProjectsArray(projectsArray);
    }, []);

    const hideMessageHasParticipations = useCallback(() => {
        setShowMessageHasParticipations(false);
        setMessageHasParticipations(false);
        setMessageHasParticipationsRedirect('');
        setMessageHasParticipationsProjectsArray([]);
        closeEdit();
        reloadContact();
    }, [closeEdit, reloadContact]);

    const doUpdateAddressEnergySupplier = useCallback(
        addressEnergySupplierToSave => {
            AddressEnergySupplierAPI.updateAddressEnergySupplier(addressEnergySupplierToSave)
                .then(payload => {
                    updateStateAddressEnergySupplier(payload.data.addressEnergySupplier);

                    if (payload.data.responseParticipations.hasParticipations) {
                        handleSetMessageHasParticipations(
                            payload.data.responseParticipations.hasParticipations,
                            payload.data.responseParticipations.revenuePartsKwhRedirect,
                            payload.data.responseParticipations.projectsArray
                        );
                    }

                    if (payload.data.addressEnergySupplier.addressEnergySuppliersWithDoubleEsNumber) {
                        handleSetMessageDoubleEsNumber(
                            payload.data.addressEnergySupplier.esNumber,
                            payload.data.addressEnergySupplier.energySupplier.name,
                            payload.data.addressEnergySupplier.addressEnergySuppliersWithDoubleEsNumber
                        );
                    }

                    if (payload.data.addressEnergySupplier.addressEnergySuppliersWithDoubleEsNumber) {
                        setShowMessageDoubleEsNumber(true);
                    } else if (payload.data.responseParticipations.hasParticipations) {
                        setShowMessageHasParticipations(true);
                    } else {
                        closeEdit();
                        reloadContact();
                    }
                })
                .catch(error => {
                    if (error.response) {
                        setError(error.response.status, error.response.data.message);
                    } else {
                        console.log(error);
                    }
                });
        },
        [
            updateStateAddressEnergySupplier,
            handleSetMessageHasParticipations,
            handleSetMessageDoubleEsNumber,
            closeEdit,
            reloadContact,
            setError,
        ]
    );

    const handleSubmit = useCallback(
        event => {
            event.preventDefault();

            const addressEnergySupplier = localAddressEnergySupplier;

            let newErrors = {};
            let hasErrors = false;

            if (!addressEnergySupplier.memberSince || validator.isEmpty(addressEnergySupplier.memberSince)) {
                newErrors.memberSince = true;
                hasErrors = true;
            }

            if (
                addressEnergySupplier.disabledAfter !== '9999-12-31' &&
                (!addressEnergySupplier.endDate || validator.isEmpty(addressEnergySupplier.endDate))
            ) {
                newErrors.endDate = true;
                hasErrors = true;
            }

            if (
                !hasErrors &&
                addressEnergySupplier.endDate &&
                !validator.isEmpty(addressEnergySupplier.endDate) &&
                addressEnergySupplier.endDate < addressEnergySupplier.memberSince
            ) {
                newErrors.memberSince = true;
                newErrors.endDate = true;
                hasErrors = true;
            }

            setErrors(newErrors);

            if (!hasErrors) {
                AddressEnergySupplierAPI.validateAddressEnergySupplierForm(addressEnergySupplier)
                    .then(payload => {
                        if (!payload.data.responseValidation.hasErrors) {
                            doUpdateAddressEnergySupplier(addressEnergySupplier);
                        } else {
                            setError(422, payload.data.responseValidation.message);
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                            setError(error.response.status, error.response.data.message);
                        } else {
                            console.log(error);
                        }
                    });
            }
        },
        [localAddressEnergySupplier, doUpdateAddressEnergySupplier, setError]
    );

    const canEdit = permissions.updateContactAddress && (permissions.updatePerson || permissions.updateOrganisation);

    const canDelete = permissions.deleteContactAddress;

    const canRedirectToFinalSettlement =
        messageHasParticipationsProjectsArray.length === 1 && !!messageHasParticipationsRedirect;

    return (
        <div>
            <AddressDetailsFormAddressEnergySupplierView
                highlightLine={highlightLine}
                showActionButtons={showActionButtons}
                onLineEnter={onLineEnter}
                onLineLeave={onLineLeave}
                openEdit={openEdit}
                toggleDelete={toggleDelete}
                addressEnergySupplier={localAddressEnergySupplier}
                addressEnergySupplierNewOrEditOpen={addressEnergySupplierNewOrEditOpen}
            />

            {canEdit && showEdit && (
                <AddressDetailsFormAddressEnergySupplierEdit
                    addressEnergySupplier={localAddressEnergySupplier}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    handleInputChangeDate={handleInputChangeDate}
                    handleSubmit={handleSubmit}
                    cancelEdit={cancelEdit}
                />
            )}

            {canDelete && showDelete && (
                <AddressDetailsFormAddressEnergySupplierDelete
                    closeDeleteItemModal={toggleDelete}
                    reloadContact={reloadContact}
                    address={address}
                    {...localAddressEnergySupplier}
                />
            )}

            {showMessageDoubleEsNumber && (
                <Modal
                    title="Waarschuwing"
                    closeModal={hideMessageDoubleEsNumber}
                    showConfirmAction={false}
                    buttonCancelText="Ok"
                >
                    {'Klantnummer leverancier '}
                    <strong>{messageDoubleEsNumber}</strong>
                    {' komt al voor bij een andere adres voor leverancier '}
                    <strong>{messageDoubleEsName}</strong>
                    {
                        '. (N.B. dit kan ook bij een ander contact zijn). Eventueel gewijzigde gegevens van deze adres/energie leverancier zijn wel opgeslagen.'
                    }
                    <br />
                    <br />
                    {'Contacten/adressen met dezelfde klantnummer leverancier zijn:'}
                    <br />
                    <ul>
                        {messageDoubleEsNumberArray.map(item => (
                            <li key={`${item.contactNumber}-${item.addressStreetPostalCodeCity}`}>
                                Contact: {item.contactName} ({item.contactNumber}) met adres:{' '}
                                {item.addressStreetPostalCodeCity}
                            </li>
                        ))}
                    </ul>
                </Modal>
            )}

            {showMessageHasParticipations && (
                <Modal
                    title="Waarschuwing"
                    closeModal={hideMessageHasParticipations}
                    buttonCancelText="Sluiten"
                    showConfirmAction={canRedirectToFinalSettlement}
                    buttonConfirmText={canRedirectToFinalSettlement ? 'Naar eindafrekening' : ''}
                    confirmAction={
                        canRedirectToFinalSettlement ? () => navigate(messageHasParticipationsRedirect) : undefined
                    }
                >
                    Beëindigde adres/energieleverancier komt voor bij deelnames in volgende projecten:
                    <br />
                    <ul>
                        {messageHasParticipationsProjectsArray.map((item, index) => (
                            <li key={`${index}-${item.projectMessage}`}>{item.projectMessage}</li>
                        ))}
                    </ul>
                    <br />
                    {messageHasParticipationsProjectsArray.length === 1
                        ? 'Hiervoor kan nu eindafrekening voor teruggave EB gemaakt worden'
                        : 'Hiervoor kunnen nu eindafrekeningen voor teruggave EB gemaakt worden'}
                </Modal>
            )}
        </div>
    );
}

const mapStateToProps = state => ({
    permissions: state.meDetails.permissions,
});

const mapDispatchToProps = dispatch => ({
    updateStateAddressEnergySupplier: addressEnergySupplier => {
        dispatch(updateStateAddressEnergySupplier(addressEnergySupplier));
    },
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
    setError: (httpCode, message) => {
        dispatch(setError(httpCode, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetailsFormAddressEnergySupplierItemContainer);
