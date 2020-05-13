import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { connect } from 'react-redux';
import validator from 'validator';

import { updateAdministration } from '../../../../actions/administration/AdministrationDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import * as ibantools from 'ibantools';
import AdministrationLogoNew from '../../new/AdministrationLogoNew';
import InputSelect from '../../../../components/form/InputSelect';
import EmailTemplateAPI from '../../../../api/email-template/EmailTemplateAPI';
import InputReactSelect from '../../../../components/form/InputReactSelect';
import axios from 'axios';
import MailboxAPI from '../../../../api/mailbox/MailboxAPI';
import InputToggle from '../../../../components/form/InputToggle';
import ViewText from '../../../../components/form/ViewText';
import InputDate from '../../../../components/form/InputDate';
import moment from 'moment';

class AdministrationDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.manageUsesTwinfield =
            this.props.meDetails.email == 'support@econobis.nl' || this.props.meDetails.email == 'info@xaris.nl'
                ? true
                : false;

        const {
            id,
            name,
            administrationNumber,
            address,
            emailTemplateIdCollection,
            emailTemplateIdTransfer,
            emailTemplateReminderId,
            emailTemplateExhortationId,
            postalCode,
            city,
            countryId,
            kvkNumber,
            btwNumber,
            IBAN,
            email,
            website,
            bic,
            sepaContractName,
            sepaCreditorId,
            rsinNumber,
            defaultPaymentTerm,
            logoName,
            ibanAttn,
            mailboxId,
            usesTwinfield,
            twinfieldUsername,
            twinfieldPassword,
            twinfieldPasswordChange,
            twinfieldOrganizationCode,
            twinfieldOfficeCode,
            dateSyncTwinfieldContacts,
            dateSyncTwinfieldPayments,
            usesVat,
            emailBccNotas,
        } = props.administrationDetails;

        this.state = {
            newLogo: false,
            emailTemplates: [],
            mailboxAddresses: [],
            isSaving: false,
            loadingText: 'Aan het opslaan',
            administration: {
                id,
                name: name ? name : '',
                administrationNumber: administrationNumber ? administrationNumber : '',
                address: address ? address : '',
                postalCode: postalCode ? postalCode : '',
                city: city ? city : '',
                countryId: countryId ? countryId : '',
                kvkNumber: kvkNumber ? kvkNumber : '',
                btwNumber: btwNumber ? btwNumber : '',
                IBAN: IBAN ? IBAN : '',
                ibanAttn: ibanAttn ? ibanAttn : '',
                email: email ? email : '',
                website: website ? website : '',
                bic: bic ? bic : '',
                sepaContractName: sepaContractName ? sepaContractName : '',
                sepaCreditorId: sepaCreditorId ? sepaCreditorId : '',
                rsinNumber: rsinNumber ? rsinNumber : '',
                defaultPaymentTerm: defaultPaymentTerm ? defaultPaymentTerm : '',
                logoName: logoName ? logoName : '',
                emailTemplateIdCollection: emailTemplateIdCollection ? emailTemplateIdCollection : '',
                emailTemplateIdTransfer: emailTemplateIdTransfer ? emailTemplateIdTransfer : '',
                emailTemplateReminderId: emailTemplateReminderId ? emailTemplateReminderId : '',
                emailTemplateExhortationId: emailTemplateExhortationId ? emailTemplateExhortationId : '',
                attachment: '',
                mailboxId: mailboxId ? mailboxId : '',
                usesTwinfield: usesTwinfield,
                twinfieldUsername: twinfieldUsername ? twinfieldUsername : '',
                twinfieldPassword: twinfieldPassword ? twinfieldPassword : '',
                twinfieldPasswordChange: twinfieldPasswordChange ? twinfieldPasswordChange : false,
                twinfieldOrganizationCode: twinfieldOrganizationCode ? twinfieldOrganizationCode : '',
                twinfieldOfficeCode: twinfieldOfficeCode ? twinfieldOfficeCode : '',
                dateSyncTwinfieldContacts: dateSyncTwinfieldContacts ? dateSyncTwinfieldContacts : '',
                dateSyncTwinfieldPayments: dateSyncTwinfieldPayments ? dateSyncTwinfieldPayments : '',
                usesVat: usesVat,
                emailBccNotas: emailBccNotas ? emailBccNotas : '',
            },
            errors: {
                name: false,
                administrationNumber: false,
                postalCode: false,
                kvkNumber: false,
                IBAN: false,
                email: false,
                website: false,
                twinfieldUsername: false,
                twinfieldPassword: false,
                twinfieldOrganizationCode: false,
                twinfieldOfficeCode: false,
                dateSyncTwinfieldContacts: false,
                dateSyncTwinfieldPayments: false,
                mailboxId: false,
                emailBccNotas: false,
                countryId: false,
            },
            peekLoading: {
                emailTemplates: true,
            },
        };
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    componentDidMount() {
        axios.all([EmailTemplateAPI.fetchEmailTemplatesPeek(), MailboxAPI.fetchMailboxesLoggedInUserPeek()]).then(
            axios.spread((emailTemplates, mailboxAddresses) => {
                this.setState({
                    emailTemplates,
                    mailboxAddresses,
                    peekLoading: {
                        ...this.state.peekLoading,
                        emailTemplates: false,
                    },
                });
            })
        );
    }

    toggleNewLogo = () => {
        this.setState({
            newLogo: !this.state.newLogo,
        });
    };

    addAttachment = file => {
        this.setState({
            ...this.state,
            administration: {
                ...this.state.administration,
                attachment: file[0],
                filename: file[0].name,
            },
        });
    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            administration: {
                ...this.state.administration,
                [name]: selectedOption,
            },
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            administration: {
                ...this.state.administration,
                [name]: value,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            [name]: value,
        });
    };

    handleUsesTwinfieldChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        if (value == true) {
            this.state.administration.twinfieldPasswordChange = true;
        }

        this.setState({
            ...this.state,
            administration: {
                ...this.state.administration,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { administration } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(administration.name + '')) {
            errors.name = true;
            hasErrors = true;
        }

        let countryId = administration.countryId;
        if (validator.isEmpty(administration.countryId + '')) {
            countryId = 'NL';
        }

        let postalCodeValid = true;
        if (!validator.isEmpty(administration.postalCode + '')) {
            if (countryId == 'NL') {
                postalCodeValid = validator.isPostalCode(administration.postalCode, 'NL');
            } else {
                postalCodeValid = validator.isPostalCode(administration.postalCode, 'any');
            }
            if (!postalCodeValid) {
                errors.postalCode = true;
                errors.countryId = true;
                hasErrors = true;
            }
        }

        if (!validator.isEmpty(administration.administrationNumber + '')) {
            if (!validator.isInt(administration.administrationNumber + '')) {
                errors.administrationNumber = true;
                hasErrors = true;
            }
        }

        if (!validator.isEmpty(administration.kvkNumber + '')) {
            if (!validator.isInt(administration.kvkNumber + '')) {
                errors.kvkNumber = true;
                hasErrors = true;
            }
        }

        if (!validator.isEmpty(administration.IBAN + '')) {
            if (!ibantools.isValidIBAN(administration.IBAN + '')) {
                errors.IBAN = true;
                hasErrors = true;
            }
        }

        if (!validator.isEmpty(administration.email + '')) {
            if (!validator.isEmail(administration.email + '')) {
                errors.email = true;
                hasErrors = true;
            }
        }

        if (!validator.isEmpty(administration.emailBccNotas + '')) {
            if (!validator.isEmail(administration.emailBccNotas + '')) {
                errors.emailBccNotas = true;
                hasErrors = true;
            }
        }

        if (!validator.isEmpty(administration.website + '')) {
            if (!validator.isFQDN(administration.website + '')) {
                errors.website = true;
                hasErrors = true;
            }
        }

        if (administration.usesTwinfield) {
            if (validator.isEmpty(administration.twinfieldUsername + '')) {
                errors.twinfieldUsername = true;
                hasErrors = true;
            }

            if (administration.twinfieldPasswordChange) {
                if (validator.isEmpty(administration.twinfieldPassword + '')) {
                    errors.twinfieldPassword = true;
                    hasErrors = true;
                }
            }

            if (validator.isEmpty(administration.twinfieldOfficeCode + '')) {
                errors.twinfieldOfficeCode = true;
                hasErrors = true;
            }

            if (validator.isEmpty(administration.twinfieldOrganizationCode + '')) {
                errors.twinfieldOrganizationCode = true;
                hasErrors = true;
            }

            let twinFieldOfficeAndOrganizationCodeNotUnique = false;

            this.props.administrations.map(
                existingTwinfieldAdministration =>
                    existingTwinfieldAdministration.twinfieldOfficeCode &&
                    administration.twinfieldOfficeCode &&
                    existingTwinfieldAdministration.twinfieldOfficeCode.toUpperCase() ===
                        administration.twinfieldOfficeCode.toUpperCase() &&
                    existingTwinfieldAdministration.twinfieldOrganizationCode &&
                    administration.twinfieldOrganizationCode &&
                    existingTwinfieldAdministration.twinfieldOrganizationCode.toUpperCase() ===
                        administration.twinfieldOrganizationCode.toUpperCase() &&
                    existingTwinfieldAdministration.id !== administration.id &&
                    (twinFieldOfficeAndOrganizationCodeNotUnique = true)
            );

            if (twinFieldOfficeAndOrganizationCodeNotUnique) {
                errors.twinfieldOfficeCode = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        if (!hasErrors) {
            let loadingText = 'Aan het laden';

            if (administration.usesTwinfield) {
                loadingText = 'De koppeling Econobis Twinfield wordt gemaakt. Dit kan enige tijd duren';
            }
            this.setState({
                ...this.state,
                loadingText: loadingText,
                isSaving: true,
            });

            const data = new FormData();

            data.append('id', administration.id);
            data.append('name', administration.name);
            data.append('administrationNumber', administration.administrationNumber);
            data.append('address', administration.address);
            data.append('postalCode', administration.postalCode);
            data.append('city', administration.city);
            data.append('countryId', administration.countryId);
            data.append('kvkNumber', administration.kvkNumber);
            data.append('btwNumber', administration.btwNumber);
            data.append('IBAN', administration.IBAN);
            data.append('ibanAttn', administration.ibanAttn);
            data.append('email', administration.email);
            data.append('website', administration.website);
            data.append('bic', administration.bic);
            data.append('sepaContractName', administration.sepaContractName);
            data.append('sepaCreditorId', administration.sepaCreditorId);
            data.append('rsinNumber', administration.rsinNumber);
            data.append('defaultPaymentTerm', administration.defaultPaymentTerm);
            data.append('emailTemplateIdCollection', administration.emailTemplateIdCollection);
            data.append('emailTemplateIdTransfer', administration.emailTemplateIdTransfer);
            data.append('emailTemplateReminderId', administration.emailTemplateReminderId);
            data.append('emailTemplateExhortationId', administration.emailTemplateExhortationId);
            data.append('attachment', administration.attachment);
            data.append('mailboxId', administration.mailboxId);
            data.append('usesTwinfield', administration.usesTwinfield);
            data.append('twinfieldUsername', administration.twinfieldUsername);
            // twinfield password alleen toevoegen indien ingevuld op scherm.
            if (administration.twinfieldPasswordChange) {
                data.append('twinfieldPassword', administration.twinfieldPassword);
            }
            data.append('twinfieldOrganizationCode', administration.twinfieldOrganizationCode);
            data.append('twinfieldOfficeCode', administration.twinfieldOfficeCode);
            data.append('dateSyncTwinfieldContacts', administration.dateSyncTwinfieldContacts);
            data.append('dateSyncTwinfieldPayments', administration.dateSyncTwinfieldPayments);
            data.append('usesVat', administration.usesVat);
            data.append('emailBccNotas', administration.emailBccNotas);

            this.props.updateAdministration(data, administration.id, this.props.switchToView);
        }
    };

    render() {
        const {
            name,
            administrationNumber,
            emailTemplateIdCollection,
            emailTemplateIdTransfer,
            emailTemplateReminderId,
            emailTemplateExhortationId,
            address,
            postalCode,
            city,
            countryId,
            kvkNumber,
            btwNumber,
            IBAN,
            email,
            website,
            bic,
            sepaContractName,
            sepaCreditorId,
            rsinNumber,
            defaultPaymentTerm,
            attachment,
            logoName,
            ibanAttn,
            mailboxId,
            usesTwinfield,
            twinfieldUsername,
            twinfieldPassword,
            twinfieldPasswordChange,
            twinfieldOrganizationCode,
            twinfieldOfficeCode,
            dateSyncTwinfieldContacts,
            dateSyncTwinfieldPayments,
            usesVat,
            emailBccNotas,
        } = this.state.administration;

        let disableBeforeDateSyncTwinfieldContacts = null;
        if (dateSyncTwinfieldContacts) {
            disableBeforeDateSyncTwinfieldContacts = moment(
                moment(dateSyncTwinfieldContacts).format('YYYY') + '-01-01'
            ).format('YYYY-01-01');
        } else {
            disableBeforeDateSyncTwinfieldContacts = moment(moment().format('YYYY') + '-01-01').format('YYYY-01-01');
        }
        let disableBeforeDateSyncTwinfieldPayments = null;
        if (dateSyncTwinfieldPayments) {
            disableBeforeDateSyncTwinfieldPayments = moment(
                moment(dateSyncTwinfieldPayments).format('YYYY') + '-01-01'
            ).format('YYYY-01-01');
        } else {
            disableBeforeDateSyncTwinfieldPayments = moment(moment().format('YYYY') + '-01-01').format('YYYY-01-01');
        }

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Naam"
                                name={'name'}
                                value={name}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.name}
                            />
                            <InputText
                                label="Administratie nummer"
                                name={'administrationNumber'}
                                value={administrationNumber}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.administrationNumber}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Adres"
                                name={'address'}
                                value={address}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label="Postcode"
                                name={'postalCode'}
                                value={postalCode}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.postalCode}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Plaats"
                                name={'city'}
                                value={city}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputSelect
                                label={'Land'}
                                id="countryId"
                                size={'col-sm-6'}
                                name={'countryId'}
                                options={this.props.countries}
                                value={countryId}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.countryId}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="KvK"
                                name={'kvkNumber'}
                                value={kvkNumber}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.kvkNumber}
                            />
                            <InputText
                                label="BTW nummer"
                                name={'btwNumber'}
                                value={btwNumber}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="IBAN"
                                name={'IBAN'}
                                value={IBAN}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.IBAN}
                            />
                            <InputText
                                label="IBAN t.n.v."
                                name={'ibanAttn'}
                                value={ibanAttn}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Website"
                                name={'website'}
                                value={website}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.website}
                            />
                            <InputText label="Bic" name={'bic'} value={bic} onChangeAction={this.handleInputChange} />
                        </div>

                        <div className="row">
                            <InputText
                                label="Sepa contractnaam"
                                name={'sepaContractName'}
                                value={sepaContractName}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label="Sepa crediteur id"
                                name={'sepaCreditorId'}
                                value={sepaCreditorId}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputReactSelect
                                label={'E-mail template nota incasso'}
                                name={'emailTemplateIdCollection'}
                                options={this.state.emailTemplates}
                                value={emailTemplateIdCollection}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.peekLoading.emailTemplates}
                                multi={false}
                            />
                            <InputText
                                label="E-mail"
                                name={'email'}
                                value={email}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.email}
                            />
                        </div>

                        <div className="row">
                            <InputReactSelect
                                label={'E-mail template nota overboeken'}
                                name={'emailTemplateIdTransfer'}
                                options={this.state.emailTemplates}
                                value={emailTemplateIdTransfer}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.peekLoading.emailTemplates}
                                multi={false}
                            />
                            <InputText
                                label="RSIN nummer"
                                name={'rsinNumber'}
                                value={rsinNumber}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputReactSelect
                                label={'E-mail template herinnering'}
                                name={'emailTemplateReminderId'}
                                options={this.state.emailTemplates}
                                value={emailTemplateReminderId}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.peekLoading.emailTemplates}
                                multi={false}
                            />
                            <InputText
                                label="Standaard betalingstermijn(dagen)"
                                type={'number'}
                                min={'0'}
                                max={'9999'}
                                name={'defaultPaymentTerm'}
                                value={defaultPaymentTerm}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputReactSelect
                                label={'E-mail template aanmaning'}
                                name={'emailTemplateExhortationId'}
                                options={this.state.emailTemplates}
                                value={emailTemplateExhortationId}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.peekLoading.emailTemplates}
                                multi={false}
                            />
                            <div className="form-group col-sm-6">
                                <label className="col-sm-6">Kies logo</label>
                                <div className="col-sm-6">
                                    <input
                                        type="text"
                                        className="form-control input-sm col-sm-6"
                                        value={attachment ? attachment.name : logoName}
                                        onClick={this.toggleNewLogo}
                                        onChange={() => {}}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <InputSelect
                                label={"Afzender van Rapportages en nota's is e-mail adres"}
                                id="mailboxId"
                                size={'col-sm-6'}
                                name={'mailboxId'}
                                options={this.state.mailboxAddresses}
                                optionName={'email'}
                                value={mailboxId}
                                onChangeAction={this.handleInputChange}
                            />
                            <ViewText
                                label={'Gebruikt BTW'}
                                value={usesVat ? 'Ja' : 'Nee'}
                                className={'col-sm-6 form-group'}
                                hidden={true}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Nota's ook mailen in BCC naar"
                                name={'emailBccNotas'}
                                value={emailBccNotas}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.emailBccNotas}
                            />
                        </div>

                        {this.state.newLogo && (
                            <AdministrationLogoNew
                                toggleShowNew={this.toggleNewLogo}
                                addAttachment={this.addAttachment}
                            />
                        )}

                        <div className="row">
                            <div className={'panel-part panel-heading'}>
                                <span className={'h5 text-bold'}>Twinfield</span>
                            </div>
                        </div>

                        <div className="row">
                            <InputToggle
                                label={'Gebruikt Twinfield'}
                                name={'usesTwinfield'}
                                value={usesTwinfield}
                                onChangeAction={this.handleUsesTwinfieldChange}
                                disabled={!this.manageUsesTwinfield && !isEmpty(twinfieldUsername) }
                            />
                        </div>

                        {( usesTwinfield == true || !isEmpty(twinfieldUsername) ) && (
                            <React.Fragment>
                                <div className="row">
                                    <InputText
                                        label="Gebruikersnaam"
                                        name={'twinfieldUsername'}
                                        value={twinfieldUsername}
                                        onChangeAction={this.handleInputChange}
                                        required={'required'}
                                        readOnly={usesTwinfield == false}
                                        error={this.state.errors.twinfieldUsername}
                                    />
                                    <InputText
                                        label="Wachtwoord"
                                        name={'twinfieldPassword'}
                                        value={twinfieldPassword}
                                        placeholder="**********"
                                        onChangeAction={this.handleInputChange}
                                        required={'required'}
                                        readOnly={usesTwinfield == false}
                                        error={this.state.errors.twinfieldPassword}
                                    />
                                </div>
                                <div className="row">
                                    <InputToggle
                                        label={'Wijzig wachtwoord'}
                                        name={'twinfieldPasswordChange'}
                                        value={twinfieldPasswordChange}
                                        onChangeAction={this.handleInputChange}
                                        className={'col-sm-push-6 col-sm-6'}
                                        disabled={usesTwinfield == false}
                                    />
                                </div>
                                <div className="row">
                                    <InputText
                                        label="Omgeving"
                                        name={'twinfieldOrganizationCode'}
                                        value={twinfieldOrganizationCode}
                                        onChangeAction={this.handleInputChange}
                                        required={'required'}
                                        readOnly={usesTwinfield == false}
                                        error={this.state.errors.twinfieldOrganizationCode}
                                    />
                                    <InputText
                                        label="Code"
                                        name={'twinfieldOfficeCode'}
                                        value={twinfieldOfficeCode}
                                        onChangeAction={this.handleInputChange}
                                        required={'required'}
                                        readOnly={usesTwinfield == false}
                                        error={this.state.errors.twinfieldOfficeCode}
                                    />
                                </div>
                                <div className="row">
                                    <InputDate
                                        label={
                                            <span>
                                                Synchroniseer contacten vanaf
                                                <br />
                                                <small style={{ color: '#ccc', fontWeight: 'normal' }}>
                                                    Nota aanmaakdatum vanaf wanneer contacten initieel gemaakt worden in
                                                    Twinfield
                                                </small>
                                            </span>
                                        }
                                        name={'dateSyncTwinfieldContacts'}
                                        value={dateSyncTwinfieldContacts}
                                        onChangeAction={this.handleInputChangeDate}
                                        disabledBefore={disableBeforeDateSyncTwinfieldContacts}
                                        readOnly={usesTwinfield == false}
                                        error={this.state.errors.dateSyncTwinfieldContacts}
                                    />
                                    <InputDate
                                        label={
                                            <span>
                                                Synchroniseer betalingen vanaf
                                                <br />
                                                <small style={{ color: '#ccc', fontWeight: 'normal' }}>
                                                    Nota aanmaakdatum vanaf wanneer betalingen opgehaald worden uit
                                                    Twinfield
                                                </small>
                                            </span>
                                        }
                                        name={'dateSyncTwinfieldPayments'}
                                        value={dateSyncTwinfieldPayments}
                                        onChangeAction={this.handleInputChangeDate}
                                        disabledBefore={disableBeforeDateSyncTwinfieldPayments}
                                        readOnly={usesTwinfield == false}
                                        error={this.state.errors.dateSyncTwinfieldPayments}
                                    />
                                </div>
                            </React.Fragment>
                        )}

                        {this.state.newLogo && (
                            <AdministrationLogoNew
                                toggleShowNew={this.toggleNewLogo}
                                addAttachment={this.addAttachment}
                            />
                        )}
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Sluiten'}
                                onClickAction={this.props.switchToView}
                            />
                            <ButtonText
                                loading={this.state.isSaving}
                                loadText={this.state.loadingText}
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        countries: state.systemData.countries,
        administrations: state.systemData.administrations,
        administrationDetails: state.administrationDetails,
    };
};

const mapDispatchToProps = dispatch => ({
    updateAdministration: (administration, administrationId, switchToView) => {
        dispatch(updateAdministration(administration, administrationId, switchToView));
    },
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdministrationDetailsFormGeneralEdit);
