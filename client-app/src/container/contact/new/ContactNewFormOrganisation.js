import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import moment from 'moment';
import validator from 'validator';

import OrganisationAPI from '../../../api/contact/OrganisationAPI';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from '../../../components/panel/PanelFooter';
import * as ibantools from 'ibantools';
import InputToggle from '../../../components/form/InputToggle';

class ContactNewFormOrganisation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonLoading: false,
            organisation: {
                id: '',
                number: '',
                createdAt: '',
                name: '',
                chamberOfCommerceNumber: '',
                vatNumber: '',
                memberSince: '',
                memberUntil: '',
                website: '',
                iban: '',
                ibanAttn: '',
                newsletter: false,
                ownerId: props.userId,
                didAgreeAvg: false,
                isCollectMandate: false,
                collectMandateCode: '',
                collectMandateSignatureDate: '',
                collectMandateFirstRunDate: '',
                collectMandateCollectionSchema: 'b2b',
            },
            errors: {
                name: false,
                iban: false,
                collectMandateCode: false,
                collectMandateSignatureDate: false,
                collectMandateFirstRunDate: false,
            },
        };
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            organisation: {
                ...this.state.organisation,
                [name]: value,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            organisation: {
                ...this.state.organisation,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { organisation } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(organisation.name)) {
            errors.name = true;
            hasErrors = true;
        }

        if (!validator.isEmpty(organisation.iban)) {
            if (!ibantools.isValidIBAN(organisation.iban)) {
                errors.iban = true;
                hasErrors = true;
            }
        }

        if (organisation.isCollectMandate) {
            if (validator.isEmpty(organisation.collectMandateCode)) {
                errors.collectMandateCode = true;
                hasErrors = true;
            }

            if (validator.isEmpty(organisation.collectMandateSignatureDate)) {
                errors.collectMandateSignatureDate = true;
                hasErrors = true;
            }

            if (validator.isEmpty(organisation.collectMandateFirstRunDate)) {
                errors.collectMandateFirstRunDate = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        if (!hasErrors) {
            if (this.state.buttonLoading) {
                return false;
            }
            this.setState({
                buttonLoading: true,
            });
            OrganisationAPI.newOrganisation(organisation).then(payload => {
                hashHistory.push(`/contact/${payload.id}`);
            });
        }
    };

    render() {
        const {
            name,
            chamberOfCommerceNumber,
            vatNumber,
            memberSince,
            newsletter,
            website,
            iban,
            ibanAttn,
            ownerId,
            didAgreeAvg,
            isCollectMandate,
            collectMandateCode,
            collectMandateSignatureDate,
            collectMandateFirstRunDate,
            collectMandateCollectionSchema,
        } = this.state.organisation;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText label={'Contactnummer'} name={'number'} value={''} readOnly={true} />
                    <InputText
                        label={'Gemaakt op'}
                        name={'createdAt'}
                        value={moment().format('DD-MM-Y')}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Naam"
                        name={'name'}
                        value={name}
                        onChangeAction={this.handleInputChange}
                        required={'required'}
                        error={this.state.errors.name}
                    />
                    <InputDate
                        label={'Lid sinds'}
                        name="memberSince"
                        value={memberSince}
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="KvK"
                        size={'col-sm-6'}
                        name="chamberOfCommerceNumber"
                        value={chamberOfCommerceNumber}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText label={'Opzegdatum'} name={'memberUntil'} value={''} readOnly={true} />
                </div>

                <div className="row">
                    <InputText
                        label="Btw nummer"
                        name="vatNumber"
                        value={vatNumber}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="IBAN"
                        name="iban"
                        value={iban}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.iban}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="IBAN t.n.v."
                        name="ibanAttn"
                        value={ibanAttn}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={'Website'}
                        name={'website'}
                        value={website}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={'Eigenaar'}
                        size={'col-sm-6'}
                        name={'ownerId'}
                        options={this.props.users}
                        value={ownerId}
                        optionName={'fullName'}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputToggle
                        label={'Nieuwsbrief'}
                        name={'newsletter'}
                        value={newsletter}
                        className={'field-to-be-removed'}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={'Akkoord privacybeleid'}
                        name={'didAgreeAvg'}
                        value={didAgreeAvg}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={'Ingesteld op incasso'}
                        name={'isCollectMandate'}
                        value={isCollectMandate}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                {isCollectMandate ? (
                    <React.Fragment>
                        <div className="row">
                            <InputText
                                label={'Machtigingskenmerk'}
                                name={'collectMandateCode'}
                                value={collectMandateCode}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.collectMandateCode}
                            />
                        </div>
                        <div className="row">
                            <InputDate
                                label={'Datum van ondertekening'}
                                name={'collectMandateSignatureDate'}
                                value={collectMandateSignatureDate}
                                onChangeAction={this.handleInputChangeDate}
                                required={'required'}
                                error={this.state.errors.collectMandateSignatureDate}
                            />
                        </div>
                        <div className="row">
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
                            <InputSelect
                                label={'Incassoschema'}
                                name={'collectMandateCollectionSchema'}
                                value={collectMandateCollectionSchema}
                                options={[{ id: 'core', name: 'Core' }, { id: 'b2b', name: 'B2B' }]}
                                onChangeAction={this.handleInputChange}
                                emptyOption={false}
                                required={'required'}
                            />
                        </div>
                    </React.Fragment>
                ) : null}

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            loading={this.state.buttonLoading}
                            loadText={'Organisatie wordt aangemaakt.'}
                            buttonText={'Opslaan'}
                            onClickAction={this.handleSubmit}
                        />
                    </div>
                </PanelFooter>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        users: state.systemData.users,
        userId: state.meDetails.id,
    };
};

export default connect(mapStateToProps)(ContactNewFormOrganisation);
