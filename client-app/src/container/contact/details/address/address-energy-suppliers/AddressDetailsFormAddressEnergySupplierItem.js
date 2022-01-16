import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { setError } from '../../../../../actions/general/ErrorActions';
import AddressEnergySupplierAPI from '../../../../../api/contact/AddressEnergySupplierAPI';
import { updateStateAddressEnergySupplier } from '../../../../../actions/contact/ContactDetailsActions';
import { fetchContactDetails } from '../../../../../actions/contact/ContactDetailsActions';
import AddressDetailsFormAddressEnergySupplierView from './AddressDetailsFormAddressEnergySupplierView';
import AddressDetailsFormAddressEnergySupplierEdit from './AddressDetailsFormAddressEnergySupplierEdit';
import AddressDetailsFormAddressEnergySupplierDelete from './AddressDetailsFormAddressEnergySupplierDelete';
import { isEqual } from 'lodash';
import Modal from '../../../../../components/modal/Modal';

class AddressDetailsFormAddressEnergySupplierItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            showWarningEsNumber: true,
            showMessageDoubleEsNumber: false,
            messageDoubleEsNumber: '',
            messageDoubleEsName: '',
            doubleEsNumberArray: [],
            showConfirmValidatePeriodOverlap: false,
            addressEnergySupplier: {
                ...props.addressEnergySupplier,
            },
            address: { ...props.address },
            errors: {
                memberSince: false,
                endDate: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEqual(this.state.addressEnergySupplier, nextProps.addressEnergySupplier)) {
            this.setState({
                ...this.state,
                addressEnergySupplier: {
                    ...nextProps.addressEnergySupplier,
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
        this.setState({ showEdit: true });
    };

    closeEdit = () => {
        this.setState({ showEdit: false });
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            addressEnergySupplier: { ...this.props.addressEnergySupplier },
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

        if (name == 'esNumber') {
            this.setState({
                ...this.state,
                addressEnergySupplier: {
                    ...this.state.addressEnergySupplier,
                    [name]: value,
                },
                showWarningEsNumber: true,
            });
        } else {
            this.setState({
                ...this.state,
                addressEnergySupplier: {
                    ...this.state.addressEnergySupplier,
                    [name]: value,
                },
            });
        }
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            addressEnergySupplier: {
                ...this.state.addressEnergySupplier,
                [name]: value,
            },
        });
    }

    toggleShowWarningEsNumber() {
        this.setState({
            ...this.state,
            showWarningEsNumber: !this.state.showWarningEsNumber,
        });
    }

    setShowMessageDoubleEsNumber(esNumber, energySupplierName, doubleEsNumberArray) {
        this.setState({
            ...this.state,
            showMessageDoubleEsNumber: true,
            messageDoubleEsNumber: esNumber,
            messageDoubleEsName: energySupplierName,
            doubleEsNumberArray: doubleEsNumberArray,
        });
    }
    setHideMessageDoubleEsNumber = () => {
        this.setState({
            ...this.state,
            showMessageDoubleEsNumber: false,
            messageDoubleEsNumber: '',
            messageDoubleEsName: '',
            doubleEsNumberArray: [],
        });
    };

    setShowConfirmValidatePeriodOverlap(message) {
        this.setState({
            ...this.state,
            showConfirmValidatePeriodOverlap: true,
            messageConfirmValidatePeriodOverlap: message,
        });
    }
    closeValidatePeriodOverlap = () => {
        this.setState({
            ...this.state,
            showConfirmValidatePeriodOverlap: false,
            messageConfirmValidatePeriodOverlap: '',
        });
    };
    confirmActionValidatePeriodOverlap = () => {
        const { addressEnergySupplier } = this.state;

        this.doUpdateAddressEnergySupplier(addressEnergySupplier);
        this.props.fetchContactDetails(this.props.address.contactId);

        this.setState({
            ...this.state,
            showConfirmValidatePeriodOverlap: false,
            messageConfirmValidatePeriodOverlap: '',
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { addressEnergySupplier } = this.state;

        let errors = {};
        let hasErrors = false;

        if (!addressEnergySupplier.memberSince || validator.isEmpty(addressEnergySupplier.memberSince)) {
            errors.memberSince = true;
            hasErrors = true;
        }

        if (
            addressEnergySupplier.disabledAfter != '9999-12-31' &&
            (!addressEnergySupplier.endDate || validator.isEmpty(addressEnergySupplier.endDate))
        ) {
            errors.endDate = true;
            hasErrors = true;
        }

        if (
            !hasErrors &&
            addressEnergySupplier.endDate &&
            !validator.isEmpty(addressEnergySupplier.endDate) &&
            addressEnergySupplier.endDate < addressEnergySupplier.memberSince
        ) {
            errors.memberSince = true;
            errors.endDate = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        if (!hasErrors) {
            // If no errors send form
            if (!hasErrors) {
                AddressEnergySupplierAPI.validatePeriodOverlap(addressEnergySupplier)
                    .then(payload => {
                        // indien geen overlap dan direct verwerken
                        if (!payload.data) {
                            this.doUpdateAddressEnergySupplier(addressEnergySupplier);
                        } else {
                            // indien wel overlap dan eerst bevestigen
                            this.setShowConfirmValidatePeriodOverlap(payload.data);
                        }
                    })
                    .catch(error => {
                        hasErrors = true;
                        if (error.response) {
                            this.props.setError(error.response.status, error.response.data.message);
                        } else {
                            // this.props.setError(error);
                            console.log(error);
                        }
                    });
            }
        }
    };

    doUpdateAddressEnergySupplier = addressEnergySupplier => {
        AddressEnergySupplierAPI.updateAddressEnergySupplier(addressEnergySupplier)
            .then(payload => {
                this.props.updateStateAddressEnergySupplier(payload.data.data);

                if (this.state.showWarningEsNumber && payload.data.data.addressEnergySuppliersWithDoubleEsNumber) {
                    this.setShowMessageDoubleEsNumber(
                        payload.data.data.esNumber,
                        payload.data.data.energySupplier.name,
                        payload.data.data.addressEnergySuppliersWithDoubleEsNumber
                    );
                    this.toggleShowWarningEsNumber();
                } else {
                    this.closeEdit();
                }
            })
            .catch(error => {
                if (error.response) {
                    this.props.setError(error.response.status, error.response.data.message);
                } else {
                    console.log(error);
                }
            });
    };

    render() {
        return (
            <div>
                <AddressDetailsFormAddressEnergySupplierView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    addressEnergySupplier={this.state.addressEnergySupplier}
                />
                {this.state.showEdit &&
                    (this.props.permissions.updatePerson || this.props.permissions.updateOrganisation) && (
                        <AddressDetailsFormAddressEnergySupplierEdit
                            addressEnergySupplier={this.state.addressEnergySupplier}
                            errors={this.state.errors}
                            handleInputChange={this.handleInputChange}
                            handleInputChangeDate={this.handleInputChangeDate}
                            handleSubmit={this.handleSubmit}
                            cancelEdit={this.cancelEdit}
                        />
                    )}
                {this.state.showDelete && (
                    <AddressDetailsFormAddressEnergySupplierDelete
                        closeDeleteItemModal={this.toggleDelete}
                        address={this.state.address}
                        {...this.state.addressEnergySupplier}
                    />
                )}
                {this.state.showMessageDoubleEsNumber && (
                    <Modal
                        closeModal={this.setHideMessageDoubleEsNumber}
                        // modalClassName="modal-lg"
                        showConfirmAction={false}
                        buttonCancelText="Ok"
                    >
                        {'Klantnummer leverancier '} <strong>{this.state.messageDoubleEsNumber}</strong>
                        {' komt al voor bij een andere adres voor leverancier '}
                        <strong>{this.state.messageDoubleEsName}</strong>
                        {
                            '. (N.B. dit kan ook bij een ander contact zijn). Gewijzigde gegevens van deze adres/energie leverancier zijn wel opgeslagen.'
                        }
                        <br /> <br />
                        {'Contacten/adressen met dezelfde klantnummer leverancier zijn:'} <br />
                        <ul>
                            {this.state.doubleEsNumberArray.map(item => (
                                <li>
                                    Contact: {item.contactName} ({item.contactNumber}) met adres:{' '}
                                    {item.addressStreetPostalCodeCity}
                                </li>
                            ))}
                        </ul>
                    </Modal>
                )}
                {this.state.showConfirmValidatePeriodOverlap && (
                    <Modal
                        buttonConfirmText="Bevestigen"
                        buttonClassName={'btn-danger'}
                        closeModal={this.closeValidatePeriodOverlap}
                        confirmAction={() => this.confirmActionValidatePeriodOverlap()}
                        title="Bevestig periode afsluiting"
                    >
                        {this.state.messageConfirmValidatePeriodOverlap}
                        <br />
                        <br />
                        {'Deze periode afsluiten op dag voor nieuwe Klant sinds datum?'}
                    </Modal>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        permissions: state.meDetails.permissions,
    };
};

const mapDispatchToProps = dispatch => ({
    updateStateAddressEnergySupplier: addressEnergySuppliers => {
        dispatch(updateStateAddressEnergySupplier(addressEnergySuppliers));
    },
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetailsFormAddressEnergySupplierItem);
