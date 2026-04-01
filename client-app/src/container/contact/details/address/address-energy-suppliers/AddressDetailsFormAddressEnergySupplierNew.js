import React, { useCallback, useMemo, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';

import { setError } from '../../../../../actions/general/ErrorActions';
import AddressEnergySupplierAPI from '../../../../../api/contact/AddressEnergySupplierAPI';
import {
    newStateAddressEnergySupplier,
    fetchContactDetails,
} from '../../../../../actions/contact/ContactDetailsActions';

import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import InputSelect from '../../../../../components/form/InputSelect';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputDate from '../../../../../components/form/InputDate';
import Modal from '../../../../../components/modal/Modal';

const AddressDetailsFormAddressEnergySupplierNewContainer = props => {
    const navigate = useNavigate();
    return <AddressDetailsFormAddressEnergySupplierNew {...props} navigate={navigate} />;
};

function AddressDetailsFormAddressEnergySupplierNew(props) {
    const {
        addressId,
        contactId,
        energySuppliers,
        energySupplierStatuses,
        energySupplierTypes,
        memberSinceGasDisabledBefore,
        memberSinceElectricityDisabledBefore,
        memberSinceGasAndElectricityDisabledBefore,
        toggleShowNew,
        newStateAddressEnergySupplier,
        fetchContactDetails,
        setError,
        navigate,
    } = props;

    const [showMessageDoubleEsNumber, setShowMessageDoubleEsNumber] = useState(false);
    const [messageDoubleEsNumber, setMessageDoubleEsNumber] = useState('');
    const [messageDoubleEsName, setMessageDoubleEsName] = useState('');
    const [messageDoubleEsNumberArray, setMessageDoubleEsNumberArray] = useState([]);

    const [showMessageHasParticipations, setShowMessageHasParticipations] = useState(false);
    const [messageHasParticipations, setMessageHasParticipations] = useState(false);
    const [messageHasParticipationsRedirect, setMessageHasParticipationsRedirect] = useState('');
    const [messageHasParticipationsProjectsArray, setMessageHasParticipationsProjectsArray] = useState([]);

    const [addressEnergySupplier, setAddressEnergySupplier] = useState({
        addressId: addressId,
        energySupplierId: '',
        energySupplyTypeId: '',
        memberSince: '',
        energySupplyStatusId: '',
        switchDate: '',
        endDate: '',
        esNumber: '',
        isCurrentSupplier: false,
    });

    const [memberSinceDisabledBefore, setMemberSinceDisabledBefore] = useState('1900-01-01');

    const [errors, setErrors] = useState({
        energySupplierId: false,
        energySupplyTypeId: false,
        memberSince: false,
        endDate: false,
    });

    const canRedirectToFinalSettlement = useMemo(() => {
        return messageHasParticipationsProjectsArray.length === 1 && !!messageHasParticipationsRedirect;
    }, [messageHasParticipationsProjectsArray, messageHasParticipationsRedirect]);

    const handleInputChange = useCallback(
        event => {
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;

            setAddressEnergySupplier(prev => ({
                ...prev,
                [name]: value,
            }));

            if (name === 'energySupplyTypeId') {
                const disabledBefore =
                    value == 1
                        ? memberSinceGasDisabledBefore
                        : value == 2
                        ? memberSinceElectricityDisabledBefore
                        : value == 3
                        ? memberSinceGasAndElectricityDisabledBefore
                        : '1900-01-01';

                setMemberSinceDisabledBefore(disabledBefore);
            }
        },
        [memberSinceGasDisabledBefore, memberSinceElectricityDisabledBefore, memberSinceGasAndElectricityDisabledBefore]
    );

    const handleInputChangeDate = useCallback((value, name) => {
        setAddressEnergySupplier(prev => ({
            ...prev,
            [name]: value,
        }));
    }, []);

    const handleSetMessageDoubleEsNumber = useCallback((esNumber, energySupplierName, duplicateArray) => {
        setMessageDoubleEsNumber(esNumber);
        setMessageDoubleEsName(energySupplierName);
        setMessageDoubleEsNumberArray(duplicateArray);
    }, []);

    const handleSetMessageHasParticipations = useCallback((hasParticipations, redirect, projectsArray) => {
        setMessageHasParticipations(hasParticipations);
        setMessageHasParticipationsRedirect(redirect);
        setMessageHasParticipationsProjectsArray(projectsArray);
    }, []);

    const hideMessageDoubleEsNumber = useCallback(() => {
        setShowMessageDoubleEsNumber(false);
        setMessageDoubleEsNumber('');
        setMessageDoubleEsName('');
        setMessageDoubleEsNumberArray([]);

        if (messageHasParticipations) {
            setShowMessageHasParticipations(true);
        } else {
            toggleShowNew();
            fetchContactDetails(contactId);
        }
    }, [messageHasParticipations, toggleShowNew, fetchContactDetails, contactId]);

    const hideMessageHasParticipations = useCallback(() => {
        setShowMessageHasParticipations(false);
        setMessageHasParticipations(false);
        setMessageHasParticipationsRedirect('');
        setMessageHasParticipationsProjectsArray([]);

        toggleShowNew();
        fetchContactDetails(contactId);
    }, [toggleShowNew, fetchContactDetails, contactId]);

    const doNewAddressEnergySupplier = useCallback(
        addressEnergySupplierToSave => {
            AddressEnergySupplierAPI.newAddressEnergySupplier(addressEnergySupplierToSave)
                .then(payload => {
                    newStateAddressEnergySupplier(payload.data.addressEnergySupplier);

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
                        toggleShowNew();
                        fetchContactDetails(contactId);
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
            newStateAddressEnergySupplier,
            handleSetMessageHasParticipations,
            handleSetMessageDoubleEsNumber,
            toggleShowNew,
            fetchContactDetails,
            contactId,
            setError,
        ]
    );

    const handleSubmit = useCallback(
        event => {
            event.preventDefault();

            let newErrors = {
                energySupplierId: false,
                energySupplyTypeId: false,
                memberSince: false,
                endDate: false,
            };
            let hasErrors = false;

            if (validator.isEmpty(addressEnergySupplier.energySupplierId)) {
                newErrors.energySupplierId = true;
                hasErrors = true;
            }

            if (validator.isEmpty(addressEnergySupplier.energySupplyTypeId)) {
                newErrors.energySupplyTypeId = true;
                hasErrors = true;
            }

            if (!addressEnergySupplier.memberSince || validator.isEmpty(addressEnergySupplier.memberSince)) {
                newErrors.memberSince = true;
                hasErrors = true;
            }

            if (
                !hasErrors &&
                addressEnergySupplier.memberSince &&
                memberSinceDisabledBefore > addressEnergySupplier.memberSince
            ) {
                newErrors.memberSince = true;
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
                            doNewAddressEnergySupplier(addressEnergySupplier);
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
        [addressEnergySupplier, memberSinceDisabledBefore, doNewAddressEnergySupplier, setError]
    );

    const {
        energySupplierId,
        energySupplyTypeId,
        memberSince,
        energySupplyStatusId,
        switchDate,
        endDate,
        esNumber,
    } = addressEnergySupplier;

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel className="panel-grey">
                <PanelBody>
                    <div className="row">
                        <InputSelect
                            label="Energieleverancier"
                            id="energySupplierId"
                            name="energySupplierId"
                            options={energySuppliers}
                            value={energySupplierId}
                            onChangeAction={handleInputChange}
                            required="required"
                            error={errors.energySupplierId}
                        />
                        <InputSelect
                            label="Type"
                            id="energySupplyTypeId"
                            name="energySupplyTypeId"
                            options={energySupplierTypes}
                            value={energySupplyTypeId}
                            onChangeAction={handleInputChange}
                            required="required"
                            error={errors.energySupplyTypeId}
                        />
                    </div>

                    <div className="row">
                        <div className="form-group col-sm-6" />
                        <InputText
                            label="Klantnummer"
                            id="esNumber"
                            name="esNumber"
                            value={esNumber}
                            onChangeAction={handleInputChange}
                        />
                    </div>

                    <div className="row">
                        <InputDate
                            label="Klant sinds"
                            name="memberSince"
                            value={memberSince || ''}
                            disabledBefore={memberSinceDisabledBefore}
                            onChangeAction={handleInputChangeDate}
                            required="required"
                            error={errors.memberSince}
                        />
                        <InputDate
                            label="Eind datum"
                            name="endDate"
                            value={endDate || ''}
                            onChangeAction={handleInputChangeDate}
                            error={errors.endDate}
                        />
                    </div>

                    <div className="row">
                        <InputDate
                            label="Mogelijke overstap datum"
                            name="switchDate"
                            value={switchDate || ''}
                            onChangeAction={handleInputChangeDate}
                        />
                        <InputSelect
                            label="Overstap status"
                            id="energySupplyStatusId"
                            name="energySupplyStatusId"
                            options={energySupplierStatuses}
                            value={energySupplyStatusId}
                            onChangeAction={handleInputChange}
                        />
                    </div>

                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName="btn-default"
                            buttonText="Annuleren"
                            onClickAction={toggleShowNew}
                        />
                        <ButtonText buttonText="Opslaan" onClickAction={handleSubmit} type="submit" value="Submit" />
                    </div>

                    {showMessageDoubleEsNumber && (
                        <Modal closeModal={hideMessageDoubleEsNumber} showConfirmAction={false} buttonCancelText="Ok">
                            {'Klantnummer leverancier '}
                            <strong>{messageDoubleEsNumber}</strong>
                            {' komt al voor bij een andere adres voor leverancier '}
                            <strong>{messageDoubleEsName}</strong>
                            {
                                '. (N.B. dit kan ook bij een ander contact zijn). Gewijzigde gegevens van deze adres/energieleverancier zijn wel opgeslagen.'
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
                            closeModal={hideMessageHasParticipations}
                            buttonCancelText="Sluiten"
                            showConfirmAction={canRedirectToFinalSettlement}
                            buttonConfirmText={canRedirectToFinalSettlement ? 'Naar eindafrekening' : ''}
                            confirmAction={
                                canRedirectToFinalSettlement
                                    ? () => navigate(messageHasParticipationsRedirect)
                                    : undefined
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
                </PanelBody>
            </Panel>
        </form>
    );
}

const mapStateToProps = state => ({
    energySuppliers: state.systemData.energySuppliers,
    energySupplierStatuses: state.systemData.energySupplierStatuses,
    energySupplierTypes: state.systemData.energySupplierTypes,
});

const mapDispatchToProps = dispatch => ({
    newStateAddressEnergySupplier: addressEnergySupplier => {
        dispatch(newStateAddressEnergySupplier(addressEnergySupplier));
    },
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
    setError: (httpCode, message) => {
        dispatch(setError(httpCode, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetailsFormAddressEnergySupplierNewContainer);
