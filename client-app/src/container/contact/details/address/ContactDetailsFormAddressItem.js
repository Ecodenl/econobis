import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { setError } from '../../../../actions/general/ErrorActions';
import AddressAPI from '../../../../api/contact/AddressAPI';
import { unsetPrimaryAddresses, updateAddress } from '../../../../actions/contact/ContactDetailsActions';
import ContactDetailsFormAddressView from './ContactDetailsFormAddressView';
import ContactDetailsFormAddressEdit from './ContactDetailsFormAddressEdit';
import ContactDetailsFormAddressDelete from './ContactDetailsFormAddressDelete';
import { isEqual } from 'lodash';
import Modal from '../../../../components/modal/Modal';
import AddressDetailsFormAddressEnergySupplier from './address-energy-suppliers/AddressDetailsFormAddressEnergySupplier';
import SharedAreaAPI from '../../../../api/shared-area/SharedAreaAPI';
import FreeFields from '../../../../components/freeFields/FreeFields';
import Dongles from './address-dongles/AddressDetailsFormAddressDongle';

class ContactDetailsFormAddressItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showModal: false,
            modalTitle: '',
            modalButtonCancelText: '',
            modalShowConfirmAction: false,
            modalConfirmAction: {},
            modalButtonConfirmText: '',
            modalText: '',
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showAddressEnergySupplier: false,
            showDelete: false,
            address: {
                ...props.address,
            },
            errors: {
                typeId: false,
                postalCode: false,
                number: false,
                countryId: false,
                endDate: false,
                eanElectricity: false,
                eanGas: false,
            },
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.address, nextProps.address)) {
            this.setState({
                ...this.state,
                address: {
                    ...nextProps.address,
                },
            });
        }
    }

    onLineEnter = () => {
        this.setState({
            showActionButtons: true,
            highlightLine: 'highlight-line',
        });
    };

    onLineLeave = () => {
        this.setState({
            showActionButtons: false,
            highlightLine: '',
        });
    };

    openEdit = () => {
        if (this.props.numberOfAddressesNotOld > 0 || this.state.address.primary === true) {
            this.setState({ showEdit: true });
            this.props.setAddressEnergySupplierNewOrEditOpen(true);
        }
    };

    closeEdit = () => {
        this.setState({ showEdit: false });
        this.props.setAddressEnergySupplierNewOrEditOpen(false);
    };

    openAddressEnergySupplier = () => {
        this.setState({ showAddressEnergySupplier: true });
    };

    closeAddressEnergySupplier = () => {
        this.setState({ showAddressEnergySupplier: false });
        this.props.setAddressEnergySupplierNewOrEditOpen(false);
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            address: { ...this.props.address },
        });

        this.closeEdit();
    };

    toggleDelete = () => {
        this.setState({ showDelete: !this.state.showDelete });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            address: {
                ...this.state.address,
                [name]: value,
            },
        });

        //if this is the primary address or used in Sce participation
        // todo WM: cleanup
        //         console.log('usedInActiveParticipationInSceOrPcrProject');
        //         console.log(this.state.address.usedInActiveParticipationInSceOrPcrProject);
        if (
            name === 'typeId' &&
            value === 'old' &&
            this.state.address.usedInActiveParticipationInSceOrPcrProject &&
            this.state.address.primary
        ) {
            this.setState({
                showModal: true,
                modalTitle: 'Waarschuwing',
                modalButtonCancelText: 'Ok',
                modalShowConfirmAction: false,
                modalConfirmAction: {},
                modalButtonConfirmText: '',
                modalText:
                    'Er is een deelname in een SCE of Postcoderoos project op dit adres. Deze deelname moet worden beëindigd en er moet een nieuwe deelname op het nieuwe adres worden aangemaakt. Er zal een taak aangemaakt worden.',
            });
        }

        //if this is not the primary address and its used in a non SCE project
        if (
            name === 'typeId' &&
            value === 'old' &&
            this.state.address.usedInActiveParticipationNotInSceOrPcrProject &&
            !this.state.address.primary
        ) {
            this.setState({
                showModal: true,
                modalTitle: 'Waarschuwing',
                modalButtonCancelText: 'Ok',
                modalShowConfirmAction: false,
                modalConfirmAction: {},
                modalButtonConfirmText: '',
                modalText:
                    'Er is een deelname in een project op dit adres. Deze deelname zal worden overgezet naar het primaire adres.',
            });
        }

        setTimeout(() => {
            const { address } = this.state;
            if (
                !validator.isEmpty(address.postalCode + '') &&
                validator.isPostalCode(address.postalCode, 'NL') &&
                !validator.isEmpty(address.number + '') &&
                validator.isEmpty(address.city + '') &&
                validator.isEmpty(address.street + '')
            ) {
                AddressAPI.getLvbagAddress(address.postalCode, address.number).then(payload => {
                    this.setState({
                        ...this.state,
                        address: {
                            ...this.state.address,
                            street: payload.street,
                            city: payload.city,
                        },
                    });
                });
            }
        }, 100);

        setTimeout(() => {
            const { address } = this.state;
            if (
                !validator.isEmpty(address.postalCode + '') &&
                validator.isPostalCode(address.postalCode, 'NL') &&
                !validator.isEmpty(address.number + '')
            ) {
                SharedAreaAPI.getSharedAreaDetails(address.postalCode, address.number).then(payload => {
                    this.setState({
                        ...this.state,
                        address: {
                            ...this.state.address,
                            areaName: payload.areaName,
                            districtName: payload.districtName,
                        },
                    });
                });
            }
        }, 100);
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            address: {
                ...this.state.address,
                [name]: value,
            },
        });
    };

    closeModal = () => {
        this.setState({ showModal: false });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { address } = this.state;

        // Postalcode always to uppercase
        if (address.postalCode) {
            address.postalCode = address.postalCode.toUpperCase();
        }

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(address.postalCode + '')) {
            errors.postalCode = true;
            hasErrors = true;
        }

        let countryId = address.countryId;
        if (validator.isEmpty(address.countryId + '')) {
            countryId = 'NL';
        }

        let postalCodeValid = true;
        if (!validator.isEmpty(address.postalCode + '')) {
            if (countryId === 'NL') {
                postalCodeValid = validator.isPostalCode(address.postalCode, 'NL');
            } else {
                postalCodeValid = validator.isPostalCode(address.postalCode, 'any');
            }
            if (!postalCodeValid) {
                errors.postalCode = true;
                errors.countryId = true;
                hasErrors = true;
            }
        }

        if (validator.isEmpty(address.number + '')) {
            errors.number = true;
            hasErrors = true;
        }

        if (validator.isEmpty(address.typeId + '')) {
            errors.typeId = true;
            hasErrors = true;
        }

        if (address.typeId === 'old' && (address.endDate === null || validator.isEmpty(address.endDate))) {
            errors.endDate = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });
        // If no errors send form
        !hasErrors &&
            AddressAPI.updateAddress(address)
                .then(payload => {
                    if (address.primary) {
                        this.props.unsetPrimaryAddresses();
                    }
                    this.props.updateAddress(payload.data.data);
                    this.closeEdit();
                })
                .catch(error => {
                    this.props.setError(error.response.status, error.response.data.message);
                });
    };

    render() {
        return (
            <div>
                <ContactDetailsFormAddressView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    showEdit={this.state.showEdit}
                    openAddressEnergySupplier={this.openAddressEnergySupplier}
                    toggleDelete={this.toggleDelete}
                    numberOfAddressesNotOld={this.props.numberOfAddressesNotOld}
                    address={this.state.address}
                    addressEnergySupplierNewOrEditOpen={this.props.addressEnergySupplierNewOrEditOpen}
                />
                {this.props.permissions.updateContactAddress && this.state.showEdit && (
                    <>
                        <ContactDetailsFormAddressEdit
                            numberOfAddresses={this.props.numberOfAddresses}
                            numberOfAddressesNotOld={this.props.numberOfAddressesNotOld}
                            address={this.state.address}
                            handleInputChange={this.handleInputChange}
                            handleInputChangeDate={this.handleInputChangeDate}
                            handleSubmit={this.handleSubmit}
                            typeIdError={this.state.errors.typeId}
                            endDateError={this.state.errors.endDate}
                            postalCodeError={this.state.errors.postalCode}
                            numberError={this.state.errors.number}
                            countryIdError={this.state.errors.countryId}
                            eanElectricityError={this.state.errors.eanElectricity}
                            eanGasError={this.state.errors.eanGas}
                            cancelEdit={this.cancelEdit}
                        />
                        <FreeFields table={'addresses'} recordId={this.props.address.id} />

                        {this.props.permissions.manageDongles && this.props.useDongleRegistration == true && (
                            <Dongles
                                address={this.state.address}
                                setAddressDongleNewOrEditOpen={this.props.setAddressDongleNewOrEditOpen}
                                closeAddressDongle={this.closeAddressDongle}
                                addressDongleNewOrEditOpen={this.props.addressDongleNewOrEditOpen}
                            />
                        )}
                    </>
                )}
                {this.state.showAddressEnergySupplier && (
                    <AddressDetailsFormAddressEnergySupplier
                        address={this.state.address}
                        setAddressEnergySupplierNewOrEditOpen={this.props.setAddressEnergySupplierNewOrEditOpen}
                        closeAddressEnergySupplier={this.closeAddressEnergySupplier}
                        addressEnergySupplierNewOrEditOpen={this.props.addressEnergySupplierNewOrEditOpen}
                    />
                )}

                {this.props.permissions.deleteContactAddress && this.state.showDelete && (
                    <ContactDetailsFormAddressDelete
                        closeDeleteItemModal={this.toggleDelete}
                        numberOfAddresses={this.props.numberOfAddresses}
                        {...this.props.address}
                    />
                )}
                {this.state.showModal && (
                    <Modal
                        title={this.state.modalTitle}
                        closeModal={this.closeModal}
                        showConfirmAction={this.state.modalShowConfirmAction}
                        confirmAction={this.state.modalConfirmAction}
                        buttonCancelText={this.state.modalButtonCancelText}
                        buttonConfirmText={this.state.modalButtonConfirmText}
                    >
                        {this.state.modalText}
                    </Modal>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
        useDongleRegistration: state.systemData.cooperation.use_dongle_registration,
    };
};
const mapDispatchToProps = dispatch => ({
    updateAddress: id => {
        dispatch(updateAddress(id));
    },
    unsetPrimaryAddresses: () => {
        dispatch(unsetPrimaryAddresses());
    },
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormAddressItem);
