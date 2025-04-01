import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import validator from 'validator';
import * as ibantools from 'ibantools';
import axios from 'axios';

import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import PanelBody from '../../../components/panel/PanelBody';
import Panel from '../../../components/panel/Panel';
import AdministrationDetailsAPI from '../../../api/administration/AdministrationDetailsAPI';
import { connect } from 'react-redux';
import InputSelect from '../../../components/form/InputSelect';
import AdministrationLogoNew from './AdministrationLogoNew';
import EmailTemplateAPI from '../../../api/email-template/EmailTemplateAPI';
import InputReactSelect from '../../../components/form/InputReactSelect';
import MailboxAPI from '../../../api/mailbox/MailboxAPI';
import InputToggle from '../../../components/form/InputToggle';
import ViewText from '../../../components/form/ViewText';
import InputDate from '../../../components/form/InputDate';
import moment from 'moment';
import Image from 'react-bootstrap/lib/Image';
import PortalImageCrop from '../../../components/imageUploadAndCrop/PortalImageCrop';

class AdministrationNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPreviewInvoice: false,
            image: '',
            imageItemName: '',
            showModalUploadImage: false,
            showModalCropImage: false,
            useAutoCropper: true,
            emailTemplates: [],
            mailboxAddresses: [],
            isSaving: false,
            loadingText: 'Aan het opslaan',
            administration: {
                name: '',
                administrationCode: '',
                address: '',
                postalCode: '',
                city: '',
                countryId: '',
                kvkNumber: '',
                btwNumber: '',
                IBAN: '',
                ibanAttn: '',
                email: '',
                website: '',
                bic: '',
                sepaContractName: '',
                sepaCreditorId: '',
                rsinNumber: '',
                defaultPaymentTerm: '',
                numberOfInvoiceReminders: 3,
                logoName: '',
                emailTemplateIdCollection: '',
                emailTemplateIdTransfer: '',
                emailTemplateReminderId: '',
                emailTemplateExhortationId: '',
                emailTemplateFinancialOverviewId: '',
                attachment: '',
                mailboxId: '',
                usesTwinfield: false,
                twinfieldConnectionType: '',
                twinfieldUsername: '',
                twinfieldPassword: '',
                twinfieldClientId: '',
                twinfieldClientSecret: '',
                twinfieldOrganizationCode: '',
                twinfieldOfficeCode: '',
                dateSyncTwinfieldContacts: '',
                dateSyncTwinfieldPayments: moment('2019-01-01').format('YYYY-MM-DD'),
                dateSyncTwinfieldInvoices: moment('2019-01-01').format('YYYY-MM-DD'),
                pendingInvoicesPresent: false,
                oldestUnpaidInvoiceDate: '',
                oldestTwinfieldInvoiceDate: '',
                prefixInvoiceNumber: 'F',
                usesVat: true,
                emailBccNotas: '',
                portalSettingsLayoutId: '',
                usesMollie: false,
                mollieApiKey: '',
            },
            errors: {
                name: false,
                administrationCode: false,
                postalCode: false,
                kvkNumber: false,
                IBAN: false,
                email: false,
                website: false,
                twinfieldConnectionType: false,
                twinfieldUsername: false,
                twinfieldPassword: false,
                twinfieldClientId: false,
                twinfieldClientSecret: false,
                twinfieldOrganizationCode: false,
                twinfieldOfficeCode: false,
                dateSyncTwinfieldContacts: false,
                dateSyncTwinfieldPayments: false,
                dateSyncTwinfieldInvoices: false,
                prefixInvoiceNumber: false,
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
                    mailboxAddresses: mailboxAddresses.data.data,
                    peekLoading: {
                        ...this.state.peekLoading,
                        emailTemplates: false,
                    },
                });
            })
        );
    }

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            administration: {
                ...this.state.administration,
                [name]: selectedOption,
            },
        });
    }

    closeUploadImage = () => {
        this.setState({
            showModalUploadImage: false,
        });
    };
    toggleUploadImage = imageItemName => {
        this.setState({
            showModalUploadImage: !this.state.showModalUploadImage,
            imageItemName: imageItemName,
        });
    };

    addImage = (file, imageItemName, useAutoCropper) => {
        this.setState({
            ...this.state,
            image: file[0],
            useAutoCropper: useAutoCropper,
            showModalCropImage: true,
        });
    };

    closeShowCrop = () => {
        this.setState({
            showModalCropImage: false,
        });
    };
    cropImage = file => {
        this.setState({
            ...this.state,
            administration: {
                ...this.state.administration,
                attachment: file,
                filename: file.name,
                logoName: file.name,
                src: file.name,
            },
            showModalCropImage: false,
        });
    };

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

        if (
            !validator.isEmpty(administration.administrationCode + '') &&
            !/^([A-Za-z0-9_\\-]+)$/u.test(administration.administrationCode)
        ) {
            errors.administrationCode = true;
            hasErrors = true;
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
            if (!validator.isURL(administration.website + '')) {
                errors.website = true;
                hasErrors = true;
            }
        }

        if (administration.usesTwinfield) {
            if (validator.isEmpty(administration.twinfieldConnectionType + '')) {
                errors.twinfieldConnectionType = true;
                hasErrors = true;
            }

            if (administration.twinfieldConnectionType === 'openid') {
                if (validator.isEmpty(administration.twinfieldClientId + '')) {
                    errors.twinfieldClientId = true;
                    hasErrors = true;
                }

                if (validator.isEmpty(administration.twinfieldClientSecret + '')) {
                    errors.twinfieldClientSecret = true;
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

            let administrationCodeNotUnique = false;
            if (!validator.isEmpty(administration.administrationCode + '')) {
                this.props.administrationsPeek.map(
                    existingAdministrationCode =>
                        existingAdministrationCode.id !== administration.id &&
                        existingAdministrationCode.administrationCode !== null &&
                        !validator.isEmpty(existingAdministrationCode.administrationCode + '') &&
                        existingAdministrationCode.administrationCode &&
                        administration.administrationCode &&
                        existingAdministrationCode.administrationCode.toUpperCase() ===
                            administration.administrationCode.toUpperCase() &&
                        (administrationCodeNotUnique = true)
                );
            }
            if (administrationCodeNotUnique) {
                errors.administrationCode = true;
                hasErrors = true;
            }

            let twinFieldOfficeAndOrganizationCodeNotUnique = false;
            this.state.twinfieldInfoAdministrations.map(
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

            data.append('name', administration.name);
            data.append('administrationCode', administration.administrationCode);
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
            data.append('numberOfInvoiceReminders', administration.numberOfInvoiceReminders);
            data.append('emailTemplateIdCollection', administration.emailTemplateIdCollection);
            data.append('emailTemplateIdTransfer', administration.emailTemplateIdTransfer);
            data.append('emailTemplateReminderId', administration.emailTemplateReminderId);
            data.append('emailTemplateExhortationId', administration.emailTemplateExhortationId);
            data.append('emailTemplateFinancialOverviewId', administration.emailTemplateFinancialOverviewId);
            data.append('attachment', administration.attachment);
            data.append('usesTwinfield', administration.usesTwinfield);
            data.append('twinfieldConnectionType', administration.twinfieldConnectionType);
            data.append('twinfieldUsername', administration.twinfieldUsername);
            data.append('twinfieldPassword', administration.twinfieldPassword);
            data.append('twinfieldClientId', administration.twinfieldClientId);
            data.append('twinfieldClientSecret', administration.twinfieldClientSecret);
            data.append('twinfieldOrganizationCode', administration.twinfieldOrganizationCode);
            data.append('twinfieldOfficeCode', administration.twinfieldOfficeCode);
            data.append('dateSyncTwinfieldContacts', administration.dateSyncTwinfieldContacts);
            data.append('dateSyncTwinfieldPayments', administration.dateSyncTwinfieldPayments);
            data.append('dateSyncTwinfieldInvoices', administration.dateSyncTwinfieldInvoices);
            data.append('prefixInvoiceNumber', administration.prefixInvoiceNumber);
            data.append('usesVat', administration.usesVat);
            data.append('emailBccNotas', administration.emailBccNotas);
            data.append('portalSettingsLayoutId', administration.portalSettingsLayoutId);
            data.append('logoName', administration.logoName);
            data.append('usesMollie', administration.usesMollie);
            data.append('mollieApiKey', administration.mollieApiKey);

            AdministrationDetailsAPI.newAdministration(data)
                .then(payload => {
                    hashHistory.push(`/administratie/${payload.data.id}`);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    };

    render() {
        const {
            name,
            administrationCode,
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
            numberOfInvoiceReminders,
            attachment,
            logoName,
            emailTemplateIdCollection,
            emailTemplateIdTransfer,
            emailTemplateReminderId,
            emailTemplateExhortationId,
            emailTemplateFinancialOverviewId,
            ibanAttn,
            mailboxId,
            usesTwinfield,
            twinfieldConnectionType,
            twinfieldUsername,
            twinfieldPassword,
            twinfieldClientId,
            twinfieldClientSecret,
            twinfieldOrganizationCode,
            twinfieldOfficeCode,
            dateSyncTwinfieldContacts,
            dateSyncTwinfieldPayments,
            dateSyncTwinfieldInvoices,
            pendingInvoicesPresent,
            oldestUnpaidInvoiceDate,
            oldestTwinfieldInvoiceDate,
            prefixInvoiceNumber,
            usesVat,
            emailBccNotas,
            portalSettingsLayoutId,
            usesMollie,
            mollieApiKey,
        } = this.state.administration;

        let disableBeforeDateSyncTwinfieldContacts = moment(moment('2019-01-01').format('YYYY-MM-DD')).format(
            'YYYY-MM-DD'
        );
        let disableBeforeDateSyncTwinfieldInvoices = moment(moment('2019-01-01').format('YYYY-MM-DD')).format(
            'YYYY-MM-DD'
        );
        let disableBeforeDateSyncTwinfieldPayments = moment(moment('2019-01-01').format('YYYY-MM-DD')).format(
            'YYYY-MM-DD'
        );
        // let disableAfterDateSyncTwinfieldContacts = null;
        // let disableAfterDateSyncTwinfieldInvoices = null;
        // let disableAfterDateSyncTwinfieldPayments = null;

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
                                label="Administratie code"
                                name={'administrationCode'}
                                value={administrationCode}
                                maxLength={5}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.administrationCode}
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
                            />
                            <InputSelect
                                label={'Aantal keer herinneringen nota'}
                                id={'numberOfInvoiceReminders'}
                                size={'col-sm-6'}
                                name={'numberOfInvoiceReminders'}
                                options={[
                                    { id: '1', name: '1x' },
                                    { id: '2', name: '2x' },
                                    { id: '3', name: '3x' },
                                ]}
                                value={numberOfInvoiceReminders}
                                onChangeAction={this.handleInputChange}
                                emptyOption={false}
                            />
                        </div>

                        <div className="row">
                            <InputReactSelect
                                label={'E-mail template waardestaat'}
                                name={'emailTemplateFinancialOverviewId'}
                                options={this.state.emailTemplates}
                                value={emailTemplateFinancialOverviewId}
                                onChangeAction={this.handleReactSelectChange}
                                isLoading={this.state.peekLoading.emailTemplates}
                            />
                            <InputText
                                label="Prefix nota nummer"
                                name={'prefixInvoiceNumber'}
                                value={prefixInvoiceNumber}
                                maxLength={5}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.prefixInvoiceNumber}
                            />
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
                            <InputText
                                label="Logo"
                                divSize={'col-sm-6'}
                                value={attachment ? attachment.name : logoName}
                                onClickAction={() => {
                                    this.toggleUploadImage('logo-administration');
                                }}
                                onChangeaction={() => {}}
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
                            <div className="col-sm-6">
                                <label className="col-sm-6"></label>
                                <div className="col-sm-6">
                                    <Image
                                        src={attachment && attachment.preview ? attachment.preview : ''}
                                        style={{
                                            border: '1px solid #999',
                                            display: 'inline-block',
                                            padding: '1px',
                                            borderRadius: '1px',
                                            minWidth: '50px',
                                            height: '50px',
                                            boxShadow: '0 0 0 1px #fff inset',
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <InputReactSelect
                                label={'Portal instellingen layout'}
                                name={'portalSettingsLayoutId'}
                                options={this.props.portalSettingsLayouts}
                                optionName={'description'}
                                value={portalSettingsLayoutId}
                                onChangeAction={this.handleReactSelectChange}
                            />
                            <ViewText
                                label={'Gebruikt BTW'}
                                value={usesVat ? 'Ja' : 'Nee'}
                                className={'col-sm-6 form-group'}
                                hidden={true}
                            />
                        </div>

                        {(this.props.meDetails.email === 'support@econobis.nl' ||
                            this.props.meDetails.email === 'software@xaris.nl') && (
                            <div className="row">
                                <InputToggle
                                    label={'Gebruikt Mollie'}
                                    name={'usesMollie'}
                                    value={usesMollie}
                                    onChangeAction={this.handleInputChange}
                                />
                                {usesMollie && (
                                    <InputText
                                        label="Mollie API key"
                                        name={'mollieApiKey'}
                                        value={mollieApiKey}
                                        onChangeAction={this.handleInputChange}
                                    />
                                )}
                            </div>
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
                                onChangeAction={this.handleInputChange}
                            />
                            {usesTwinfield == true && (
                                <InputSelect
                                    label={'API connection type'}
                                    id="twinfieldConnectionType"
                                    name={'twinfieldConnectionType'}
                                    options={this.props.twinfieldConnectionTypes}
                                    value={twinfieldConnectionType}
                                    onChangeAction={this.handleInputChange}
                                    required={'required'}
                                    error={this.state.errors.twinfieldConnectionType}
                                />
                            )}
                        </div>

                        {usesTwinfield == true && (
                            <React.Fragment>
                                <div className="row">
                                    <InputText
                                        label="Gebruikersnaam"
                                        name={'twinfieldUsername'}
                                        value={twinfieldUsername}
                                        onChangeAction={this.handleInputChange}
                                        required={'required'}
                                        error={this.state.errors.twinfieldUsername}
                                    />
                                    <InputText
                                        label="Wachtwoord"
                                        name={'twinfieldPassword'}
                                        value={twinfieldPassword}
                                        onChangeAction={this.handleInputChange}
                                        error={this.state.errors.twinfieldPassword}
                                        required={'required'}
                                    />
                                </div>
                                <div className="row">
                                    <InputText
                                        label="Client Id"
                                        name={'twinfieldClientId'}
                                        value={twinfieldClientId}
                                        onChangeAction={this.handleInputChange}
                                        // required={'required'}
                                        error={this.state.errors.twinfieldClientId}
                                    />
                                    <InputText
                                        label="Client Secret"
                                        name={'twinfieldClientSecret'}
                                        value={twinfieldClientSecret}
                                        onChangeAction={this.handleInputChange}
                                        // required={'required'}
                                        error={this.state.errors.twinfieldClientSecret}
                                    />
                                </div>
                                <div className="row">
                                    <InputText
                                        label="Omgeving"
                                        name={'twinfieldOrganizationCode'}
                                        value={twinfieldOrganizationCode}
                                        onChangeAction={this.handleInputChange}
                                        required={'required'}
                                        error={this.state.errors.twinfieldOrganizationCode}
                                    />
                                    <InputText
                                        label="Code"
                                        name={'twinfieldOfficeCode'}
                                        value={twinfieldOfficeCode}
                                        onChangeAction={this.handleInputChange}
                                        error={this.state.errors.twinfieldOfficeCode}
                                        required={'required'}
                                    />
                                </div>
                                <div className="row">
                                    <InputDate
                                        label={'Synchroniseer contacten vanaf'}
                                        name={'dateSyncTwinfieldContacts'}
                                        value={dateSyncTwinfieldContacts}
                                        onChangeAction={this.handleInputChangeDate}
                                        disabledBefore={disableBeforeDateSyncTwinfieldContacts}
                                        disabledAfter={dateSyncTwinfieldInvoices}
                                        readOnly={usesTwinfield == false}
                                        error={this.state.errors.dateSyncTwinfieldContacts}
                                        size={'col-sm-5'}
                                        textToolTip={`Na het maken van de koppeling worden contacten met een nota in Econobis
                                            aangemaakt in Twinfield vanaf deze datum (op basis van nota datum). De nota’s
                                            uit Econobis worden niet overgezet. In Twinfield kunnen vervolgens oude nota’s
                                            worden gekoppeld. Als deze datum leeg blijft dan begint de synchronisatie vanaf
                                            de eerste datum van niet betaald nota’s synchroniseren. Deze synchronisatie
                                            draait ook automatisch nachts.`}
                                    />
                                    <ViewText
                                        className={'col-sm-6 form-group'}
                                        label={"Nota's in behandeling"}
                                        value={pendingInvoicesPresent ? 'Ja' : 'Nee'}
                                        name={'pendingInvoicesPresent'}
                                        textToolTip={`Nota's in behandeling zijn nota's met status 'Wordt definitief gemaakt',
                                         'Fout bij maken', 'Wordt verstuurd', 'Opnieuw te verzenden' of 'Wordt opnieuw verstuurd'.
                                          Zolang er nota's in behandeling zijn kunnen de datums "Synchroniseer nota's vanaf"
                                          en "Synchroniseer betalingen vanaf" niet gewijzigd worden.`}
                                    />
                                </div>
                                <div className="row">
                                    <InputDate
                                        label={"Synchroniseer nota's vanaf"}
                                        name={'dateSyncTwinfieldInvoices'}
                                        value={dateSyncTwinfieldInvoices}
                                        onChangeAction={this.handleInputChangeDate}
                                        disabledBefore={disableBeforeDateSyncTwinfieldInvoices}
                                        disabledAfter={oldestTwinfieldInvoiceDate}
                                        readOnly={usesTwinfield == false || pendingInvoicesPresent}
                                        error={this.state.errors.dateSyncTwinfieldInvoices}
                                        size={'col-sm-5'}
                                        textToolTip={`Niet betaalde nota’s, incl. de contacten worden vanaf deze datum (op basis van
                                            nota datum) gesynchroniseerd met Twinfield. De datum kan niet liggen na de datum van de oudste gesynchroniseerde
                                            nota. Deze synchronisatie moet handmatig aangevraagd worden.`}
                                    />
                                    <ViewText
                                        className={'col-sm-6 form-group'}
                                        label={'Oudste nota datum gesynchroniseerd met Twinfield'}
                                        value={
                                            oldestTwinfieldInvoiceDate
                                                ? moment(oldestTwinfieldInvoiceDate).format('L')
                                                : ''
                                        }
                                    />
                                </div>
                                <div className="row">
                                    {/*todo WM: opschonen*/}
                                    {/*<InputDate*/}
                                    {/*    label={'Synchroniseer betalingen vanaf'}*/}
                                    {/*    name={'dateSyncTwinfieldPayments'}*/}
                                    {/*    value={dateSyncTwinfieldPayments}*/}
                                    {/*    onChangeAction={this.handleInputChangeDate}*/}
                                    {/*    disabledBefore={disableBeforeDateSyncTwinfieldPayments}*/}
                                    {/*    disabledAfter={oldestUnpaidInvoiceDate}*/}
                                    {/*    readOnly={usesTwinfield == false || pendingInvoicesPresent}*/}
                                    {/*    error={this.state.errors.dateSyncTwinfieldPayments}*/}
                                    {/*    size={'col-sm-5'}*/}
                                    {/*    textToolTip={`In de nacht worden betalingen gesynchroniseerd. Dit gebeurt vanaf deze datum (op*/}
                                    {/*        basis van nota datum). De datum kan niet liggen na de datum van de oudste nog*/}
                                    {/*        niet betaalde nota.`}*/}
                                    {/*/>*/}
                                    <div className={'col-sm-6 form-group'} />
                                    <ViewText
                                        className={'col-sm-6 form-group'}
                                        label={'Oudste nota datum met status niet betaald'}
                                        value={
                                            oldestUnpaidInvoiceDate ? moment(oldestUnpaidInvoiceDate).format('L') : ''
                                        }
                                    />
                                </div>
                            </React.Fragment>
                        )}

                        {this.state.showModalUploadImage && (
                            <AdministrationLogoNew
                                closeUploadImage={this.closeUploadImage}
                                addAttachment={this.addImage}
                                imageItemName={this.state.imageItemName}
                            />
                        )}
                        {this.state.showModalCropImage && (
                            <PortalImageCrop
                                closeShowCrop={this.closeShowCrop}
                                useAutoCropper={this.state.useAutoCropper}
                                image={this.state.image}
                                imageItemName={this.state.imageItemName}
                                cropImage={this.cropImage}
                            />
                        )}
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
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
        portalSettingsLayouts: state.systemData.portalSettingsLayouts,
        twinfieldConnectionTypes: state.systemData.twinfieldConnectionTypes,
        administrationsPeek: state.systemData.administrationsPeek,
        meDetails: state.meDetails,
    };
};

export default connect(mapStateToProps)(AdministrationNewForm);
