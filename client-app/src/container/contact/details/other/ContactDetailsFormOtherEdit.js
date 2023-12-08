import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
var ibantools = require('ibantools');

import * as ContactDetailsActions from '../../../../actions/contact/ContactDetailsActions';
import PersonAPI from '../../../../api/contact/PersonAPI';
import InputText from '../../../../components/form/InputText';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from '../../../../components/panel/PanelFooter';
import validator from 'validator';
import InputToggle from '../../../../components/form/InputToggle';
import InputSelect from '../../../../components/form/InputSelect';
import ErrorModal from '../../../../components/modal/ErrorModal';

class ContactDetailsFormOtherEdit extends Component {
    constructor(props) {
        super(props);

        const {
            person,
            iban,
            ibanAttn,
            liable,
            liabilityAmount,
            isCollectMandate,
            collectMandateCode,
            collectMandateSignatureDate,
            collectMandateFirstRunDate,
            collectMandateCollectionSchema,
        } = props.contactDetails;

        this.state = {
            other: {
                id: person.id,
                firstNamePartner: person.firstNamePartner,
                lastNamePartner: person.lastNamePartner,
                dateOfBirthPartner: person.dateOfBirthPartner
                    ? moment(person.dateOfBirthPartner).format('Y-MM-DD')
                    : '',
                iban: iban ? iban : '',
                ibanAttn: ibanAttn ? ibanAttn : '',
                liable: liable,
                liabilityAmount: liabilityAmount,
                isCollectMandate,
                collectMandateCode: collectMandateCode ? collectMandateCode : '',
                collectMandateSignatureDate: collectMandateSignatureDate
                    ? moment(collectMandateSignatureDate).format('Y-MM-DD')
                    : '',
                collectMandateFirstRunDate: collectMandateFirstRunDate
                    ? moment(collectMandateFirstRunDate).format('Y-MM-DD')
                    : '',
                collectMandateCollectionSchema: collectMandateCollectionSchema
                    ? collectMandateCollectionSchema
                    : 'core',
            },
            errors: {
                iban: false,
                collectMandateCode: false,
                collectMandateSignatureDate: false,
                collectMandateFirstRunDate: false,
            },
            showErrorModal: false,
            modalErrorMessage: '',
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            other: {
                ...this.state.other,
                [name]: value,
            },
        });
    };

    handleInputChangeCollectMandate = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let collectMandateCode = '';
        let collectMandateSignatureDate = '';
        let collectMandateFirstRunDate = '';
        let collectMandateCollectionSchema = '';

        if (value === true) {
            collectMandateCode = this.props.contactDetails.number;
            collectMandateSignatureDate = moment().format('Y-MM-DD');
            collectMandateFirstRunDate = moment()
                .add(1, 'M')
                .format('Y-MM-01');
            collectMandateCollectionSchema = 'core';
        }
        this.setState({
            ...this.state,
            other: {
                ...this.state.other,
                [name]: value,
                collectMandateCode,
                collectMandateSignatureDate,
                collectMandateFirstRunDate,
                collectMandateCollectionSchema,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            other: {
                ...this.state.other,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { other } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (!validator.isEmpty(other.iban)) {
            if (!ibantools.isValidIBAN(other.iban)) {
                errors.iban = true;
                hasErrors = true;
            }
        }

        if (other.isCollectMandate) {
            if (validator.isEmpty(other.iban)) {
                errors.iban = true;
                hasErrors = true;
            }

            if (validator.isEmpty(other.collectMandateCode)) {
                errors.collectMandateCode = true;
                hasErrors = true;
            }

            if (validator.isEmpty(other.collectMandateSignatureDate)) {
                errors.collectMandateSignatureDate = true;
                hasErrors = true;
            }

            if (validator.isEmpty(other.collectMandateFirstRunDate)) {
                errors.collectMandateFirstRunDate = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            PersonAPI.updatePerson(other)
                .then(payload => {
                    this.props.dispatch(ContactDetailsActions.updatePerson(payload.data.data));
                    this.props.switchToView();
                })
                .catch(error => {
                    // let errorObject = JSON.parse(JSON.stringify(error));

                    let errorMessage = 'Er is iets misgegaan bij opslaan. Probeer het opnieuw.';

                    if (error.response.status !== 500) {
                        errorMessage = error.response.data.message;
                    }

                    this.setState({
                        showErrorModal: true,
                        modalErrorMessage: errorMessage,
                    });
                });
    };

    closeErrorModal = () => {
        this.setState({ showErrorModal: false, modalErrorMessage: '' });
    };

    render() {
        const {
            firstNamePartner,
            lastNamePartner,
            dateOfBirthPartner,
            iban,
            ibanAttn,
            liable,
            liabilityAmount,
            isCollectMandate,
            collectMandateCode,
            collectMandateSignatureDate,
            collectMandateFirstRunDate,
            collectMandateCollectionSchema,
        } = this.state.other;

        return (
            <React.Fragment>
                <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <InputText
                            label={'IBAN'}
                            name={'iban'}
                            value={iban}
                            onChangeAction={this.handleInputChange}
                            readOnly={!this.props.permissions.updateContactIban}
                            error={this.state.errors.iban}
                            required={isCollectMandate ? 'required' : ''}
                        />
                        <InputText
                            label="Voornaam partner"
                            name={'firstNamePartner'}
                            value={firstNamePartner}
                            onChangeAction={this.handleInputChange}
                        />
                    </div>

                    <div className="row">
                        <InputText
                            label={'IBAN t.n.v.'}
                            name={'ibanAttn'}
                            value={ibanAttn}
                            onChangeAction={this.handleInputChange}
                        />
                        <InputText
                            label="Achternaam partner"
                            name={'lastNamePartner'}
                            value={lastNamePartner}
                            onChangeAction={this.handleInputChange}
                        />
                    </div>

                    <div className="row">
                        <div className="form-group col-sm-6" />
                        <InputDate
                            label="Geboortedatum partner"
                            name={'dateOfBirthPartner'}
                            value={dateOfBirthPartner}
                            onChangeAction={this.handleInputChangeDate}
                        />
                    </div>

                    <div className="row">
                        <InputToggle
                            label={'Aansprakelijkheid'}
                            name={'liable'}
                            value={liable}
                            onChangeAction={this.handleInputChange}
                        />
                        <InputText
                            type={'number'}
                            label={'Aansprakelijkheidsbedrag'}
                            name={'liabilityAmount'}
                            value={liabilityAmount}
                            onChangeAction={this.handleInputChange}
                        />
                    </div>

                    <div className="row">
                        <InputToggle
                            label={'Ingesteld op incasso'}
                            name={'isCollectMandate'}
                            value={isCollectMandate}
                            onChangeAction={this.handleInputChangeCollectMandate}
                        />
                        {isCollectMandate ? (
                            <InputText
                                label={'Machtigingskenmerk'}
                                name={'collectMandateCode'}
                                value={collectMandateCode}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.collectMandateCode}
                            />
                        ) : null}
                    </div>

                    {isCollectMandate ? (
                        <React.Fragment>
                            <div className="row">
                                <InputDate
                                    label={'Datum van ondertekening'}
                                    name={'collectMandateSignatureDate'}
                                    value={collectMandateSignatureDate}
                                    onChangeAction={this.handleInputChangeDate}
                                    required={'required'}
                                    error={this.state.errors.collectMandateSignatureDate}
                                />
                                <InputDate
                                    label={'Datum eerste incassoronde'}
                                    name={'collectMandateFirstRunDate'}
                                    value={collectMandateFirstRunDate}
                                    onChangeAction={this.handleInputChangeDate}
                                    required={'required'}
                                    error={this.state.errors.collectMandateFirstRunDate}
                                />
                            </div>
                            <div className="row">
                                <InputText
                                    type={'hidden'}
                                    name={'collectMandateCollectionSchema'}
                                    value={collectMandateCollectionSchema}
                                />
                            </div>
                        </React.Fragment>
                    ) : null}

                    <PanelFooter>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.switchToView}
                            />
                            <ButtonText buttonText={'Opslaan'} onClickAction={this.handleSubmit} />
                        </div>
                    </PanelFooter>
                </form>

                {this.state.showErrorModal && (
                    <ErrorModal
                        closeModal={this.closeErrorModal}
                        title={'Fout bij opslaan'}
                        errorMessage={this.state.modalErrorMessage}
                    />
                )}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        contactDetails: state.contactDetails,
        permissions: state.meDetails.permissions,
    };
};

export default connect(mapStateToProps)(ContactDetailsFormOtherEdit);
