import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setError } from '../../../../../actions/general/ErrorActions';
import AddressEnergySupplierAPI from '../../../../../api/contact/AddressEnergySupplierAPI';
import { newStateAddressEnergySupplier } from '../../../../../actions/contact/ContactDetailsActions';
import { fetchContactDetails } from '../../../../../actions/contact/ContactDetailsActions';
import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import InputSelect from '../../../../../components/form/InputSelect';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import validator from 'validator';
import InputDate from '../../../../../components/form/InputDate';
import Modal from '../../../../../components/modal/Modal';
import { useNavigate } from 'react-router-dom';

// Functionele wrapper voor de class component
const AddressDetailsFormAddressEnergySupplierNewWrapper = props => {
    const navigate = useNavigate();
    return <AddressDetailsFormAddressEnergySupplierNew {...props} navigate={navigate} />;
};

class AddressDetailsFormAddressEnergySupplierNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
                addressId: this.props.addressId,
                energySupplierId: '',
                energySupplyTypeId: '',
                memberSince: '',
                energySupplyStatusId: '',
                switchDate: '',
                endDate: '',
                esNumber: '',
                isCurrentSupplier: false,
            },
            memberSinceDisabledBefore: '1900-01-01',
            errors: {
                energySupplierId: false,
                energySupplyTypeId: false,
                memberSince: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        const memberSinceDisabledBefore =
            value == 1
                ? this.props.memberSinceGasDisabledBefore
                : value == 2
                ? this.props.memberSinceElectricityDisabledBefore
                : value == 3
                ? this.props.memberSinceGasAndElectricityDisabledBefore
                : '1900-01-01';

        if (name == 'energySupplyTypeId') {
            this.setState({
                ...this.state,
                addressEnergySupplier: {
                    ...this.state.addressEnergySupplier,
                    [name]: value,
                },
                memberSinceDisabledBefore: memberSinceDisabledBefore,
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
            this.props.toggleShowNew();
            this.props.fetchContactDetails(this.props.contactId);
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
        this.props.toggleShowNew();
        this.props.fetchContactDetails(this.props.contactId);
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

        this.doNewAddressEnergySupplier(addressEnergySupplier);

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

        if (validator.isEmpty(addressEnergySupplier.energySupplierId)) {
            errors.energySupplierId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(addressEnergySupplier.energySupplyTypeId)) {
            errors.energySupplyTypeId = true;
            hasErrors = true;
        }

        if (!addressEnergySupplier.memberSince || validator.isEmpty(addressEnergySupplier.memberSince)) {
            errors.memberSince = true;
            hasErrors = true;
        }

        if (
            !hasErrors &&
            addressEnergySupplier.memberSince &&
            this.state.memberSinceDisabledBefore > addressEnergySupplier.memberSince
        ) {
            errors.memberSince = true;
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
                        this.doNewAddressEnergySupplier(addressEnergySupplier);
                    } else {
                        // indien wel overlap dan eerst bevestigen
                        this.setShowConfirmValidatePeriodOverlap(payload.data.responseOverlap.message);
                        // this.props.setError(412, payload.data);
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

    doNewAddressEnergySupplier = addressEnergySupplier => {
        AddressEnergySupplierAPI.newAddressEnergySupplier(addressEnergySupplier)
            .then(payload => {
                this.props.newStateAddressEnergySupplier(payload.data.addressEnergySupplier);
                // todo WM: dit (fetchContactDetails) moet anders, want anders zie je show meldingen bepaald
                //  in doNewAddressEnergySupplier hieronder niet.
                // if (doFetchContact) {
                //     this.props.fetchContactDetails(this.props.contactId);
                // }

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
                    this.props.toggleShowNew();
                    this.props.fetchContactDetails(this.props.contactId);
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
        const {
            energySupplierId,
            energySupplyTypeId,
            memberSince,
            energySupplyStatusId,
            switchDate,
            endDate,
            esNumber,
        } = this.state.addressEnergySupplier;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={'Energieleverancier'}
                                id="energySupplierId"
                                name={'energySupplierId'}
                                options={this.props.energySuppliers}
                                value={energySupplierId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.energySupplierId}
                            />
                            <InputSelect
                                label={'Type'}
                                id="energySupplyTypeId"
                                name={'energySupplyTypeId'}
                                options={this.props.energySupplierTypes}
                                value={energySupplyTypeId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.energySupplyTypeId}
                            />
                        </div>

                        <div className="row">
                            <div className="form-group col-sm-6" />
                            <InputText
                                label={'Klantnummer'}
                                id={'esNumber'}
                                name={'esNumber'}
                                value={esNumber}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Klant sinds"
                                name="memberSince"
                                value={memberSince ? memberSince : ''}
                                disabledBefore={this.state.memberSinceDisabledBefore}
                                onChangeAction={this.handleInputChangeDate}
                                required={'required'}
                                error={this.state.errors.memberSince}
                            />
                            <InputDate
                                label={'Eind datum'}
                                name="endDate"
                                value={endDate ? endDate : ''}
                                onChangeAction={this.handleInputChangeDate}
                                error={this.state.errors.endDate}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Mogelijke overstap datum"
                                name="switchDate"
                                value={switchDate ? switchDate : ''}
                                onChangeAction={this.handleInputChangeDate}
                            />
                            <InputSelect
                                label={'Overstap status'}
                                id="energySupplyStatusId"
                                name={'energySupplyStatusId'}
                                options={this.props.energySupplierStatuses}
                                value={energySupplyStatusId}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.toggleShowNew}
                            />
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
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
                                closeModal={this.setHideMessageDoubleEsNumber}
                                // modalClassName="modal-lg"
                                showConfirmAction={false}
                                buttonCancelText="Ok"
                            >
                                {'Klantnummer leverancier '} <strong>{this.state.messageDoubleEsNumber}</strong>
                                {' komt al voor bij een andere adres voor leverancier '}
                                <strong>{this.state.messageDoubleEsName}</strong>
                                {
                                    '. (N.B. dit kan ook bij een ander contact zijn). Gewijzigde gegevens van deze adres/energieleverancier zijn wel opgeslagen.'
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
                                Beëindigde adres/energieleverancier komt voor bij deelnames in volgende projecten:{' '}
                                <br />
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
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        energySuppliers: state.systemData.energySuppliers,
        energySupplierStatuses: state.systemData.energySupplierStatuses,
        energySupplierTypes: state.systemData.energySupplierTypes,
    };
};

const mapDispatchToProps = dispatch => ({
    newStateAddressEnergySupplier: addressEnergySupplier => {
        dispatch(newStateAddressEnergySupplier(addressEnergySupplier));
    },
    fetchContactDetails: id => {
        dispatch(fetchContactDetails(id));
    },
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetailsFormAddressEnergySupplierNewWrapper);
