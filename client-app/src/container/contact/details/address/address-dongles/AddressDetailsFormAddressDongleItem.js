import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import { setError } from '../../../../../actions/general/ErrorActions';
// import AddressDongleAPI from '../../../../../api/contact/AddressDongleAPI';
import { updateStateAddressDongle } from '../../../../../actions/contact/ContactDetailsActions';
import { fetchContactDetails } from '../../../../../actions/contact/ContactDetailsActions';
import AddressDetailsFormAddressDongleView from './AddressDetailsFormAddressDongleView';
// import AddressDetailsFormAddressDongleEdit from './AddressDetailsFormAddressDongleEdit';
// import AddressDetailsFormAddressDongleDelete from './AddressDetailsFormAddressDongleDelete';
import { isEqual } from 'lodash';
import Modal from '../../../../../components/modal/Modal';
import { hashHistory } from 'react-router';

class AddressDetailsFormAddressDongleItem extends Component {
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

            addressDongle: {
                ...props.addressDongle,
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
        if (!isEqual(this.state.addressDongle, nextProps.addressDongle)) {
            this.setState({
                ...this.state,
                addressDongle: {
                    ...nextProps.addressDongle,
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
        this.props.setAddressDongleNewOrEditOpen(true);
    };

    closeEdit = () => {
        this.setState({ showEdit: false });
        this.props.setAddressDongleNewOrEditOpen(false);
    };

    cancelEdit = () => {
        this.setState({
            ...this.state,
            addressDongle: { ...this.props.addressDongle },
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
            addressDongle: {
                ...this.state.addressDongle,
                [name]: value,
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            addressDongle: {
                ...this.state.addressDongle,
                [name]: value,
            },
        });
    }

    setMessageDoubleEsNumber(esNumber, dongleName, messageDoubleEsNumberArray) {
        this.setState({
            ...this.state,
            messageDoubleEsNumber: esNumber,
            messageDoubleEsName: dongleName,
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
        const { addressDongle } = this.state;

        this.doUpdateAddressDongle(addressDongle);

        this.setState({
            ...this.state,
            showConfirmValidatePeriodOverlap: false,
            messageConfirmValidatePeriodOverlap: '',
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { addressDongle } = this.state;

        let errors = {};
        let hasErrors = false;

        if (!addressDongle.memberSince || validator.isEmpty(addressDongle.memberSince)) {
            errors.memberSince = true;
            hasErrors = true;
        }

        if (
            addressDongle.disabledAfter != '9999-12-31' &&
            (!addressDongle.endDate || validator.isEmpty(addressDongle.endDate))
        ) {
            errors.endDate = true;
            hasErrors = true;
        }

        if (
            !hasErrors &&
            addressDongle.endDate &&
            !validator.isEmpty(addressDongle.endDate) &&
            addressDongle.endDate < addressDongle.memberSince
        ) {
            errors.memberSince = true;
            errors.endDate = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        //     // If no errors send form
        //     if (!hasErrors) {
        //         AddressDongleAPI.validateAddressDongleForm(addressDongle)
        //             .then(payload => {
        //                 // indien geen overlap dan direct verwerken
        //                 if (!payload.data.responseOverlap.hasOverlap) {
        //                     this.doUpdateAddressDongle(addressDongle);
        //                 } else {
        //                     // indien wel overlap dan eerst bevestigen
        //                     this.setShowConfirmValidatePeriodOverlap(payload.data.responseOverlap.message);
        //                 }
        //             })
        //             .catch(error => {
        //                 hasErrors = true;
        //                 if (error.response) {
        //                     this.props.setError(error.response.status, error.response.data.message);
        //                 } else {
        //                     // this.props.setError(error);
        //                     console.log(error);
        //                 }
        //             });
        //     }
        // };
        //
        // doUpdateAddressDongle = addressDongle => {
        //     AddressDongleAPI.updateAddressDongle(addressDongle)
        //         .then(payload => {
        //             this.props.updateStateAddressDongle(payload.data.addressDongle);
        //
        //             if (payload.data.responseParticipations.hasParticipations) {
        //                 this.setMessageHasParticipations(
        //                     payload.data.responseParticipations.hasParticipations,
        //                     payload.data.responseParticipations.revenuePartsKwhRedirect,
        //                     payload.data.responseParticipations.projectsArray
        //                 );
        //             }
        //             if (payload.data.addressDongle.addressDonglesWithDoubleEsNumber) {
        //                 this.setMessageDoubleEsNumber(
        //                     payload.data.addressDongle.esNumber,
        //                     payload.data.addressDongle.dongle.name,
        //                     payload.data.addressDongle.addressDonglesWithDoubleEsNumber
        //                 );
        //             }
        //             if (payload.data.addressDongle.addressDonglesWithDoubleEsNumber) {
        //                 this.setShowMessageDoubleEsNumber();
        //             } else if (payload.data.responseParticipations.hasParticipations) {
        //                 this.setShowMessageHasParticipations();
        //             } else {
        //                 this.closeEdit();
        //                 this.reloadContact();
        //             }
        //         })
        //         .catch(error => {
        //             if (error.response) {
        //                 this.props.setError(error.response.status, error.response.data.message);
        //             } else {
        //                 console.log(error);
        //             }
        //         });
    };

    render() {
        return (
            <div>
                <AddressDetailsFormAddressDongleView
                    highlightLine={this.state.highlightLine}
                    showActionButtons={this.state.showActionButtons}
                    onLineEnter={this.onLineEnter}
                    onLineLeave={this.onLineLeave}
                    openEdit={this.openEdit}
                    toggleDelete={this.toggleDelete}
                    addressDongle={this.state.addressDongle}
                    addressDongleNewOrEditOpen={this.props.addressDongleNewOrEditOpen}
                />
                {/*{this.props.permissions.updateContactAddress &&*/}
                {/*    this.state.showEdit &&*/}
                {/*    (this.props.permissions.updatePerson || this.props.permissions.updateOrganisation) && (*/}
                {/*        <AddressDetailsFormAddressDongleEdit*/}
                {/*            addressDongle={this.state.addressDongle}*/}
                {/*            errors={this.state.errors}*/}
                {/*            handleInputChange={this.handleInputChange}*/}
                {/*            handleInputChangeDate={this.handleInputChangeDate}*/}
                {/*            handleSubmit={this.handleSubmit}*/}
                {/*            cancelEdit={this.cancelEdit}*/}
                {/*        />*/}
                {/*    )}*/}
                {/*{this.props.permissions.deleteContactAddress && this.state.showDelete && (*/}
                {/*    <AddressDetailsFormAddressDongleDelete*/}
                {/*        closeDeleteItemModal={this.toggleDelete}*/}
                {/*        reloadContact={this.reloadContact}*/}
                {/*        address={this.state.address}*/}
                {/*        {...this.state.addressDongle}*/}
                {/*    />*/}
                {/*)}*/}
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
                                ? () => hashHistory.push(`${this.state.messageHasParticipationsRedirect}`)
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
    // updateStateAddressDongle: addressDongles => {
    //     dispatch(updateStateAddressDongle(addressDongles));
    // },
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetailsFormAddressDongleItem);
