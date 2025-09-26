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
import { useNavigate } from 'react-router-dom';

// Functionele wrapper voor de class component
const AddressDetailsFormAddressEnergySupplierItemWrapper = props => {
    const navigate = useNavigate();
    return <AddressDetailsFormAddressEnergySupplierItem {...props} navigate={navigate} />;
};

class AddressDetailsFormAddressEnergySupplierItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showActionButtons: false,
            highlightLine: '',
            showEdit: false,
            showDelete: false,
            showConfirmValidatePeriodOverlap: false,
            showMessageDoubleEsNumber: false,
            messageDoubleEsNumber: '',
            messageDoubleEsName: '',
            messageDoubleEsNumberArray: [],
            showMessageHasParticipations: false,
            messageHasParticipations: false,
            messageHasParticipationsRedirect: '',
            messageHasParticipationsProjectsArray: [],

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

    UNSAFE_componentWillReceiveProps(nextProps) {
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
        this.props.setAddressEnergySupplierNewOrEditOpen(true);
    };

    closeEdit = () => {
        this.setState({ showEdit: false });
        this.props.setAddressEnergySupplierNewOrEditOpen(false);
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

    reloadContact = () => {
        this.props.fetchContactDetails(this.props.address.contactId);
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            addressEnergySupplier: {
                ...this.state.addressEnergySupplier,
                [name]: value,
            },
        });
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

    setMessageDoubleEsNumber(esNumber, energySupplierName, messageDoubleEsNumberArray) {
        this.setState({
            ...this.state,
            messageDoubleEsNumber: esNumber,
            messageDoubleEsName: energySupplierName,
            messageDoubleEsNumberArray: messageDoubleEsNumberArray,
        });
    }
    setShowMessageDoubleEsNumber() {
        this.setState({
            ...this.state,
            showMessageDoubleEsNumber: true,
        });
    }
    setHideMessageDoubleEsNumber = () => {
        this.setState({
            ...this.state,
            showMessageDoubleEsNumber: false,
            messageDoubleEsNumber: '',
            messageDoubleEsName: '',
            messageDoubleEsNumberArray: [],
        });
        if (this.state.messageHasParticipations) {
            this.setShowMessageHasParticipations();
        } else {
            this.closeEdit();
            this.reloadContact();
        }
    };

    setMessageHasParticipations(messageHasParticipations, messageHasParticipationsRedirect, projectsArray) {
        this.setState({
            ...this.state,
            messageHasParticipations: messageHasParticipations,
            messageHasParticipationsRedirect: messageHasParticipationsRedirect,
            messageHasParticipationsProjectsArray: projectsArray,
        });
    }
    setShowMessageHasParticipations() {
        this.setState({
            ...this.state,
            showMessageHasParticipations: true,
        });
    }
    setHideMessageHasParticipations = () => {
        this.setState({
            ...this.state,
            showMessageHasParticipations: false,
            messageHasParticipations: false,
            messageHasParticipationsRedirect: '',
            messageHasParticipationsProjectsArray: [],
        });
        this.closeEdit();
        this.reloadContact();
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
            AddressEnergySupplierAPI.validateAddressEnergySupplierForm(addressEnergySupplier)
                .then(payload => {
                    // indien geen overlap dan direct verwerken
                    if (!payload.data.responseOverlap.hasOverlap) {
                        this.doUpdateAddressEnergySupplier(addressEnergySupplier);
                    } else {
                        // indien wel overlap dan eerst bevestigen
                        this.setShowConfirmValidatePeriodOverlap(payload.data.responseOverlap.message);
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
    };

    doUpdateAddressEnergySupplier = addressEnergySupplier => {
        AddressEnergySupplierAPI.updateAddressEnergySupplier(addressEnergySupplier)
            .then(payload => {
                this.props.updateStateAddressEnergySupplier(payload.data.addressEnergySupplier);

                if (payload.data.responseParticipations.hasParticipations) {
                    this.setMessageHasParticipations(
                        payload.data.responseParticipations.hasParticipations,
                        payload.data.responseParticipations.revenuePartsKwhRedirect,
                        payload.data.responseParticipations.projectsArray
                    );
                }
                if (payload.data.addressEnergySupplier.addressEnergySuppliersWithDoubleEsNumber) {
                    this.setMessageDoubleEsNumber(
                        payload.data.addressEnergySupplier.esNumber,
                        payload.data.addressEnergySupplier.energySupplier.name,
                        payload.data.addressEnergySupplier.addressEnergySuppliersWithDoubleEsNumber
                    );
                }
                if (payload.data.addressEnergySupplier.addressEnergySuppliersWithDoubleEsNumber) {
                    this.setShowMessageDoubleEsNumber();
                } else if (payload.data.responseParticipations.hasParticipations) {
                    this.setShowMessageHasParticipations();
                } else {
                    this.closeEdit();
                    this.reloadContact();
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
                    addressEnergySupplierNewOrEditOpen={this.props.addressEnergySupplierNewOrEditOpen}
                />
                {this.props.permissions.updateContactAddress &&
                    this.state.showEdit &&
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
                {this.props.permissions.deleteContactAddress && this.state.showDelete && (
                    <AddressDetailsFormAddressEnergySupplierDelete
                        closeDeleteItemModal={this.toggleDelete}
                        reloadContact={this.reloadContact}
                        address={this.state.address}
                        {...this.state.addressEnergySupplier}
                    />
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
                {this.state.showMessageDoubleEsNumber && (
                    <Modal
                        title={'Waarschuwing'}
                        closeModal={this.setHideMessageDoubleEsNumber}
                        // modalClassName="modal-lg"
                        showConfirmAction={false}
                        buttonCancelText="Ok"
                    >
                        {'Klantnummer leverancier '} <strong>{this.state.messageDoubleEsNumber}</strong>
                        {' komt al voor bij een andere adres voor leverancier '}
                        <strong>{this.state.messageDoubleEsName}</strong>
                        {
                            '. (N.B. dit kan ook bij een ander contact zijn). Eventueel gewijzigde gegevens van deze adres/energie leverancier zijn wel opgeslagen.'
                        }
                        <br /> <br />
                        {'Contacten/adressen met dezelfde klantnummer leverancier zijn:'} <br />
                        <ul>
                            {this.state.messageDoubleEsNumberArray.map(item => (
                                <li>
                                    Contact: {item.contactName} ({item.contactNumber}) met adres:{' '}
                                    {item.addressStreetPostalCodeCity}
                                </li>
                            ))}
                        </ul>
                    </Modal>
                )}
                {this.state.showMessageHasParticipations && (
                    <Modal
                        title={'Waarschuwing'}
                        closeModal={this.setHideMessageHasParticipations}
                        // modalClassName="modal-lg"
                        // buttonCancelText="Ok"
                        buttonCancelText="Sluiten"
                        showConfirmAction={
                            this.state.messageHasParticipationsProjectsArray.length == 1 &&
                            this.state.messageHasParticipationsRedirect
                                ? true
                                : false
                        }
                        buttonConfirmText={
                            this.state.messageHasParticipationsProjectsArray.length == 1 &&
                            this.state.messageHasParticipationsRedirect
                                ? 'Naar eindafrekening'
                                : ''
                        }
                        confirmAction={
                            this.state.messageHasParticipationsProjectsArray.length == 1 &&
                            this.state.messageHasParticipationsRedirect
                                ? () => this.props.navigate(`${this.state.messageHasParticipationsRedirect}`)
                                : {}
                        }
                    >
                        Beëindigde adres/energieleverancier komt voor bij deelnames in volgende projecten: <br />
                        <ul>
                            {this.state.messageHasParticipationsProjectsArray.map(item => (
                                <li>{item.projectMessage}</li>
                            ))}
                        </ul>
                        <br />
                        {this.state.messageHasParticipationsProjectsArray.length == 1
                            ? 'Hiervoor kan nu eindafrekening voor teruggave EB gemaakt worden'
                            : 'Hiervoor kunnen nu eindafrekeningen voor teruggave EB gemaakt worden'}
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

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetailsFormAddressEnergySupplierItemWrapper);
