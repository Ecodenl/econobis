import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
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

// Functionele wrapper voor de class component
const AdministrationNewFormWrapper = props => {
    const navigate = useNavigate();
    return <AdministrationNewForm {...props} navigate={navigate} />;
};

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
                prefixInvoiceNumber: 'F',
                usesVat: true,
                emailBccNotas: '',
                portalSettingsLayoutId: '',
                usesMollie: false,
                mollieApiKey: '',
                usesInterimFinancialOverviews: false,
            },
            errors: {
                name: false,
                administrationCode: false,
                postalCode: false,
                kvkNumber: false,
                IBAN: false,
                email: false,
                website: false,
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

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        if (!hasErrors) {
            let loadingText = 'Aan het laden';

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
            data.append('prefixInvoiceNumber', administration.prefixInvoiceNumber);
            data.append('usesVat', administration.usesVat);
            data.append('emailBccNotas', administration.emailBccNotas);
            data.append('portalSettingsLayoutId', administration.portalSettingsLayoutId);
            data.append('logoName', administration.logoName);
            data.append('usesMollie', administration.usesMollie);
            data.append('mollieApiKey', administration.mollieApiKey);
            data.append('usesInterimFinancialOverviews', administration.usesInterimFinancialOverviews);

            AdministrationDetailsAPI.newAdministration(data)
                .then(payload => {
                    this.props.navigate(`/administratie/${payload.data.id}`);
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
            prefixInvoiceNumber,
            usesVat,
            emailBccNotas,
            portalSettingsLayoutId,
            usesMollie,
            mollieApiKey,
            usesInterimFinancialOverviews,
        } = this.state.administration;

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
                            <>
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
                                <div className="row">
                                    <InputToggle
                                        label={'Gebruikt tussentijdse waardestaten'}
                                        name={'usesInterimFinancialOverviews'}
                                        value={usesInterimFinancialOverviews}
                                        onChangeAction={this.handleInputChange}
                                    />
                                </div>
                            </>
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
        administrationsPeek: state.systemData.administrationsPeek,
        meDetails: state.meDetails,
    };
};

export default connect(mapStateToProps)(AdministrationNewFormWrapper);
