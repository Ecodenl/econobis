import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import validator from 'validator';
import moment from 'moment';
moment.locale('nl');

import ButtonText from '../../../components/button/ButtonText';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import PortalSettingsAPI from '../../../api/portal-settings/PortalSettingsAPI';
import { bindActionCreators } from 'redux';
import { fetchSystemData } from '../../../actions/general/SystemDataActions';
import InputText from '../../../components/form/InputText';
import InputSelectGroup from '../../../components/form/InputSelectGroup';
import InputReactSelect from '../../../components/form/InputReactSelect';
import InputToggle from '../../../components/form/InputToggle';
import PortalLogoNew from './PortalLogoNew';
import PortalFaviconNew from './PortalFaviconNew';
import Image from 'react-bootstrap/es/Image';

class PortalSettingsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.manageTechnicalPortalSettings =
            this.props.meDetails.email == 'support@econobis.nl' || this.props.meDetails.email == 'info@xaris.nl'
                ? true
                : false;

        this.state = {
            portalSettings: {
                ...props.portalSettings,
            },
            emailTemplates: {
                ...props.emailTemplates,
            },
            attachmentLogo: '',
            filenameLogo: 'logo.png',
            newLogo: false,
            attachmentFavicon: '',
            filenameFavicon: 'favicon.ico',
            newFavicon: false,
            errors: {
                portalName: false,
                cooperativeName: false,
                portalWebsite: false,
                portalUrl: false,
                // defaultTextColor: false,
                backgroundColor: false,
                backgroundTextColor: false,
                backgroundImageColor: false,
                backgroundImageTextColor: false,
                headerPortalIconColor: false,
                backgroundSecondaryColor: false,
                backgroundSecondaryTextColor: false,
                buttonColor: false,
                buttonTextColor: false,
                responsibleUserId: false,
                checkContactTaskResponsibleUserId: false,
                checkContactTaskResponsibleTeamId: false,
                checkContactTaskResponsible: false,
                contactResponsibleOwnerUserId: false,
                emailTemplateNewAccountId: false,
                linkPrivacyPolicy: false,
                showNewAtCooperativeLink: false,
                newAtCooperativeLinkText: false,
                pcrPowerKwhConsumptionPercentage: false,
                pcrGeneratingCapacityOneSolorPanel: false,
            },
        };

        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    toggleNewLogo = () => {
        if (this.manageTechnicalPortalSettings) {
            this.setState({
                newLogo: !this.state.newLogo,
            });
        }
    };
    toggleNewFavicon = () => {
        if (this.manageTechnicalPortalSettings) {
            this.setState({
                newFavicon: !this.state.newFavicon,
            });
        }
    };
    addLogo = file => {
        this.setState({
            ...this.state,
            attachmentLogo: file[0],
            filenameLogo: file[0].name,
        });
    };
    addFavicon = file => {
        this.setState({
            ...this.state,
            attachmentFavicon: file[0],
            filenameFavicon: file[0].name,
        });
    };

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            ...this.state,
            portalSettings: {
                ...this.state.portalSettings,
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
            portalSettings: {
                ...this.state.portalSettings,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { portalSettings, attachmentLogo, attachmentFavicon } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(portalSettings.portalUrl)) {
            errors.portalUrl = true;
            hasErrors = true;
        }
        // if (validator.isEmpty(portalSettings.defaultTextColor)) {
        //     errors.defaultTextColor = true;
        //     hasErrors = true;
        // }
        if (validator.isEmpty(portalSettings.backgroundColor)) {
            errors.backgroundColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettings.backgroundTextColor)) {
            errors.backgroundTextColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettings.backgroundImageColor)) {
            errors.backgroundImageColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettings.backgroundImageTextColor)) {
            errors.backgroundImageTextColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettings.headerPortalIconColor)) {
            errors.headerPortalIconColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettings.backgroundSecondaryColor)) {
            errors.backgroundSecondaryColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettings.backgroundSecondaryTextColor)) {
            errors.backgroundSecondaryTextColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettings.buttonColor)) {
            errors.buttonColor = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettings.buttonTextColor)) {
            errors.buttonTextColor = true;
            hasErrors = true;
        }
        if (!this.manageTechnicalPortalSettings && validator.isEmpty(portalSettings.responsibleUserId + '')) {
            errors.responsibleUserId = true;
            hasErrors = true;
        }
        if (
            !this.manageTechnicalPortalSettings &&
            validator.isEmpty(portalSettings.contactResponsibleOwnerUserId + '')
        ) {
            errors.contactResponsibleOwnerUserId = true;
            hasErrors = true;
        }
        if (!this.manageTechnicalPortalSettings && validator.isEmpty(portalSettings.checkContactTaskResponsible + '')) {
            errors.checkContactTaskResponsible = true;
            hasErrors = true;
        }
        if (!this.manageTechnicalPortalSettings && validator.isEmpty(portalSettings.linkPrivacyPolicy)) {
            errors.linkPrivacyPolicy = true;
            hasErrors = true;
        }
        if (!this.manageTechnicalPortalSettings && validator.isEmpty(portalSettings.pcrPowerKwhConsumptionPercentage + '')) {
            errors.pcrPowerKwhConsumptionPercentage = true;
            hasErrors = true;
        }
        if (
            !this.manageTechnicalPortalSettings &&
            validator.isEmpty(portalSettings.pcrGeneratingCapacityOneSolorPanel)
        ) {
            errors.pcrGeneratingCapacityOneSolorPanel = true;
            hasErrors = true;
        }
        if (!this.manageTechnicalPortalSettings && validator.isEmpty(portalSettings.emailTemplateNewAccountId + '')) {
            errors.emailTemplateNewAccountId = true;
            hasErrors = true;
        }
        if (!this.manageTechnicalPortalSettings && validator.isEmpty(portalSettings.portalName)) {
            errors.portalName = true;
            hasErrors = true;
        }
        if (!this.manageTechnicalPortalSettings && validator.isEmpty(portalSettings.cooperativeName)) {
            errors.cooperativeName = true;
            hasErrors = true;
        }
        if (!this.manageTechnicalPortalSettings && validator.isEmpty(portalSettings.portalWebsite)) {
            errors.portalWebsite = true;
            hasErrors = true;
        }

        if (portalSettings.checkContactTaskResponsible.search('user') >= 0) {
            portalSettings.checkContactTaskResponsibleUserId = portalSettings.checkContactTaskResponsible.replace(
                'user',
                ''
            );
            portalSettings.checkContactTaskResponsibleTeamId = '';
        }

        if (portalSettings.checkContactTaskResponsible.search('team') >= 0) {
            portalSettings.checkContactTaskResponsibleUserId = '';
            portalSettings.checkContactTaskResponsibleTeamId = portalSettings.checkContactTaskResponsible.replace(
                'team',
                ''
            );
        }

        const data = new FormData();

        data.append('portalName', portalSettings.portalName ? portalSettings.portalName : '');
        data.append('cooperativeName', portalSettings.cooperativeName ? portalSettings.cooperativeName : '');
        data.append('portalWebsite', portalSettings.portalWebsite ? portalSettings.portalWebsite : '');
        data.append('portalUrl', portalSettings.portalUrl);
        // data.append('defaultTextColor', portalSettings.defaultTextColor);
        data.append('backgroundColor', portalSettings.backgroundColor);
        data.append('backgroundTextColor', portalSettings.backgroundTextColor);
        data.append('backgroundImageColor', portalSettings.backgroundImageColor);
        data.append('backgroundImageTextColor', portalSettings.backgroundImageTextColor);
        data.append('headerPortalIconColor', portalSettings.headerPortalIconColor);
        data.append('backgroundSecondaryColor', portalSettings.backgroundSecondaryColor);
        data.append('backgroundSecondaryTextColor', portalSettings.backgroundSecondaryTextColor);
        data.append('buttonColor', portalSettings.buttonColor);
        data.append('buttonTextColor', portalSettings.buttonTextColor);
        data.append('responsibleUserId', portalSettings.responsibleUserId ? portalSettings.responsibleUserId : '');
        data.append(
            'checkContactTaskResponsibleUserId',
            portalSettings.checkContactTaskResponsibleUserId ? portalSettings.checkContactTaskResponsibleUserId : ''
        );
        data.append(
            'checkContactTaskResponsibleTeamId',
            portalSettings.checkContactTaskResponsibleTeamId ? portalSettings.checkContactTaskResponsibleTeamId : ''
        );
        data.append(
            'contactResponsibleOwnerUserId',
            portalSettings.contactResponsibleOwnerUserId ? portalSettings.contactResponsibleOwnerUserId : ''
        );
        data.append(
            'emailTemplateNewAccountId',
            portalSettings.emailTemplateNewAccountId ? portalSettings.emailTemplateNewAccountId : ''
        );
        data.append('linkPrivacyPolicy', portalSettings.linkPrivacyPolicy ? portalSettings.linkPrivacyPolicy : '');
        data.append('showNewAtCooperativeLink', portalSettings.showNewAtCooperativeLink);
        data.append('newAtCooperativeLinkText', portalSettings.newAtCooperativeLinkText);
        data.append(
            'pcrPowerKwhConsumptionPercentage',
            portalSettings.pcrPowerKwhConsumptionPercentage
                ? parseInt(portalSettings.pcrPowerKwhConsumptionPercentage) / 100
                : 0
        );
        data.append(
            'pcrGeneratingCapacityOneSolorPanel',
            portalSettings.pcrGeneratingCapacityOneSolorPanel ? portalSettings.pcrGeneratingCapacityOneSolorPanel : 0
        );

        data.append('attachmentLogo', attachmentLogo);
        data.append('attachmentFavicon', attachmentFavicon);

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            PortalSettingsAPI.updatePortalSettings(data)
                .then(payload => {
                    this.props.updateState(portalSettings);
                    this.props.fetchSystemData();
                    this.props.switchToView();
                })
                .catch(error => {
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                });
    };

    render() {
        const {
            portalName,
            cooperativeName,
            portalWebsite,
            portalUrl,
            // defaultTextColor,
            backgroundColor,
            backgroundTextColor,
            backgroundImageColor,
            backgroundImageTextColor,
            headerPortalIconColor,
            backgroundSecondaryColor,
            backgroundSecondaryTextColor,
            buttonColor,
            buttonTextColor,
            responsibleUserId,
            checkContactTaskResponsible,
            contactResponsibleOwnerUserId,
            emailTemplateNewAccountId,
            linkPrivacyPolicy,
            showNewAtCooperativeLink,
            newAtCooperativeLinkText,
            pcrPowerKwhConsumptionPercentage,
            pcrGeneratingCapacityOneSolorPanel,
        } = this.state.portalSettings;

        const logoUrl = `${URL_API}/portal/images/logo.png?${this.props.imageHash}`;
        const faviconUrl = `${URL_API}/portal/favicon.ico?${this.props.imageHash}`;
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label="Contacten portal URL"
                                divSize={'col-sm-8'}
                                name={'portalUrl'}
                                value={portalUrl}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.portalUrl}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Logo"
                                divSize={'col-sm-8'}
                                value={this.state.attachmentLogo.name ? this.state.attachmentLogo.name : 'logo.png'}
                                onClickAction={this.toggleNewLogo}
                                onChangeaction={() => {}}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                            />
                            <Image
                                src={
                                    this.state.attachmentLogo && this.state.attachmentLogo.preview
                                        ? this.state.attachmentLogo.preview
                                        : logoUrl
                                }
                                style={{
                                    backgroundColor: backgroundImageColor,
                                    color: backgroundImageTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '1px',
                                    borderRadius: '1px',
                                    height: '50px',
                                    boxShadow: '0 0 0 1px #fff inset',
                                }}
                            />
                        </div>
                        {this.state.newLogo && (
                            <PortalLogoNew toggleShowNewLogo={this.toggleNewLogo} addLogo={this.addLogo} />
                        )}
                        <div className="row">
                            <InputText
                                label="Favicon"
                                divSize={'col-sm-8'}
                                value={'favicon.ico'}
                                onClickAction={this.toggleNewFavicon}
                                onChangeaction={() => {}}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                            />
                            <Image
                                src={
                                    this.state.attachmentFavicon && this.state.attachmentFavicon.preview
                                        ? this.state.attachmentFavicon.preview
                                        : faviconUrl
                                }
                                style={{
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '1px',
                                    borderRadius: '1px',
                                    height: '20px',
                                    boxShadow: '0 0 0 1px #fff inset',
                                }}
                            />
                        </div>
                        {this.state.newFavicon && (
                            <PortalFaviconNew
                                toggleShowNewFavicon={this.toggleNewFavicon}
                                addFavicon={this.addFavicon}
                            />
                        )}

                        {/*<div className="row">*/}
                        {/*<InputText*/}
                        {/*label="Standaard tekst kleur"*/}
                        {/*divSize={'col-sm-8'}*/}
                        {/*name={'defaultTextColor'}*/}
                        {/*value={defaultTextColor}*/}
                        {/*onChangeAction={this.handleInputChange}*/}
                        {/*readOnly={!this.manageTechnicalPortalSettings}*/}
                        {/*required={'required'}*/}
                        {/*error={this.state.errors.defaultTextColor}*/}
                        {/*/>*/}
                        {/*<span*/}
                        {/*className="rc-color-picker-trigger"*/}
                        {/*unselectable="unselectable"*/}
                        {/*style={{*/}
                        {/*backgroundColor: '#fff',*/}
                        {/*color: defaultTextColor,*/}
                        {/*border: '1px solid #999',*/}
                        {/*display: 'inline-block',*/}
                        {/*padding: '2px',*/}
                        {/*borderRadius: '2px',*/}
                        {/*width: '50px',*/}
                        {/*height: '30px',*/}
                        {/*boxShadow: '0 0 0 2px #fff inset',*/}
                        {/*}}*/}
                        {/*>Tekst</span>*/}
                        {/*</div>*/}
                        <div className="row">
                            <InputText
                                label="Login/Header - achtergrond afbeelding kleur"
                                divSize={'col-sm-8'}
                                name={'backgroundImageColor'}
                                value={backgroundImageColor}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.backgroundImageColor}
                            />
                            <span
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: backgroundImageColor,
                                    color: backgroundImageTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '2px',
                                    borderRadius: '2px',
                                    width: '50px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                Tekst
                            </span>
                        </div>
                        <div className="row">
                            <InputText
                                label="Login/Header - achtergrond afbeelding tekst kleur"
                                divSize={'col-sm-8'}
                                name={'backgroundImageTextColor'}
                                value={backgroundImageTextColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.backgroundImageTextColor}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Header - menu/poppetje kleur"
                                divSize={'col-sm-8'}
                                name={'headerPortalIconColor'}
                                value={headerPortalIconColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.headerPortalIconColor}
                            />
                            <span
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: backgroundImageColor,
                                    color: headerPortalIconColor,
                                    textAlign: 'center',
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '4px',
                                    borderRadius: '2px',
                                    width: '50px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                = <FaUser />
                            </span>
                        </div>
                        <div className="row">
                            <InputText
                                label="Login - veld achtergrond kleur"
                                divSize={'col-sm-8'}
                                name={'backgroundSecondaryColor'}
                                value={backgroundSecondaryColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.backgroundSecondaryColor}
                            />
                            <div
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: backgroundImageColor,
                                    display: 'inline-block',
                                }}
                            >
                                <span
                                    className="rc-color-picker-trigger"
                                    unselectable="unselectable"
                                    style={{
                                        backgroundColor: backgroundSecondaryColor,
                                        color: backgroundSecondaryTextColor,
                                        border: '1px solid #999',
                                        display: 'inline-block',
                                        padding: '2px',
                                        borderRadius: '2px',
                                        width: '50px',
                                        height: '30px',
                                        boxShadow: '0 0 0 2px #fff inset',
                                    }}
                                >
                                    Tekst
                                </span>
                            </div>
                        </div>
                        <div className="row">
                            <InputText
                                label="Login - veld tekst kleur"
                                divSize={'col-sm-8'}
                                name={'backgroundSecondaryTextColor'}
                                value={backgroundSecondaryTextColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.backgroundSecondaryTextColor}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Achtergrond kleur"
                                divSize={'col-sm-8'}
                                name={'backgroundColor'}
                                value={backgroundColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.backgroundColor}
                            />
                            <span
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: backgroundColor,
                                    color: backgroundTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '2px',
                                    borderRadius: '2px',
                                    width: '50px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                Tekst
                            </span>
                        </div>
                        <div className="row">
                            <InputText
                                label="Achtergrond tekst kleur"
                                divSize={'col-sm-8'}
                                name={'backgroundTextColor'}
                                value={backgroundTextColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.backgroundTextColor}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Buttonknop kleur"
                                divSize={'col-sm-8'}
                                name={'buttonColor'}
                                value={buttonColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.buttonColor}
                            />
                            <span
                                className="rc-color-picker-trigger"
                                unselectable="unselectable"
                                style={{
                                    backgroundColor: buttonColor,
                                    color: buttonTextColor,
                                    border: '1px solid #999',
                                    display: 'inline-block',
                                    padding: '2px',
                                    borderRadius: '2px',
                                    width: '50px',
                                    height: '30px',
                                    boxShadow: '0 0 0 2px #fff inset',
                                }}
                            >
                                Tekst
                            </span>
                        </div>
                        <div className="row">
                            <InputText
                                label="Buttonknop tekst kleur"
                                divSize={'col-sm-8'}
                                name={'buttonTextColor'}
                                value={buttonTextColor}
                                onChangeAction={this.handleInputChange}
                                readOnly={!this.manageTechnicalPortalSettings}
                                required={'required'}
                                error={this.state.errors.buttonTextColor}
                            />
                        </div>

                        <hr />

                        <div className="row">
                            <InputReactSelect
                                label="Verantwoordelijke portal"
                                divSize={'col-sm-8'}
                                name={'responsibleUserId'}
                                value={responsibleUserId}
                                options={this.props.users}
                                optionName={'fullName'}
                                onChangeAction={this.handleReactSelectChange}
                                required={!this.manageTechnicalPortalSettings ? 'required' : ''}
                                error={this.state.errors.responsibleUserId}
                                multi={false}
                            />
                        </div>
                        <div className="row">
                            <InputReactSelect
                                label="Eigenaar nieuwe contacten"
                                divSize={'col-sm-8'}
                                name={'contactResponsibleOwnerUserId'}
                                value={contactResponsibleOwnerUserId}
                                options={this.props.users}
                                optionName={'fullName'}
                                onChangeAction={this.handleReactSelectChange}
                                required={!this.manageTechnicalPortalSettings ? 'required' : ''}
                                error={this.state.errors.contactResponsibleOwnerUserId}
                                multi={false}
                            />
                        </div>

                        <div className="row">
                            <InputSelectGroup
                                label={'Verantwoordelijke uitvoeren taak'}
                                divSize={'col-sm-8'}
                                name={'checkContactTaskResponsible'}
                                optionsInGroups={[
                                    {
                                        name: 'user',
                                        label: 'Gebruikers',
                                        options: this.props.users,
                                        optionName: 'fullName',
                                    },
                                    { name: 'team', label: 'Teams', options: this.props.teams },
                                ]}
                                value={checkContactTaskResponsible}
                                onChangeAction={this.handleInputChange}
                                required={!this.manageTechnicalPortalSettings ? 'required' : ''}
                                error={this.state.errors.checkContactTaskResponsible}
                            />
                        </div>

                        <div className="row">
                            <InputToggle
                                label="Nieuwe contacten kunnen account aanmaken"
                                divSize={'col-sm-8'}
                                name={'showNewAtCooperativeLink'}
                                value={showNewAtCooperativeLink}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        {showNewAtCooperativeLink ? (
                            <div className="row">
                                <InputText
                                    label="Tekst voor het aanmaken nieuw account"
                                    divSize={'col-sm-8'}
                                    name={'newAtCooperativeLinkText'}
                                    value={newAtCooperativeLinkText}
                                    maxLength={255}
                                    onChangeAction={this.handleInputChange}
                                />
                                {/*<span*/}
                                {/*className="rc-color-picker-trigger"*/}
                                {/*unselectable="unselectable"*/}
                                {/*style={{*/}
                                {/*backgroundColor: backgroundImageColor,*/}
                                {/*color: backgroundImageTextColor,*/}
                                {/*border: '1px solid #999',*/}
                                {/*display: 'inline-block',*/}
                                {/*padding: '2px',*/}
                                {/*borderRadius: '2px',*/}
                                {/*width: '300px',*/}
                                {/*height: 'auto',*/}
                                {/*boxShadow: '0 0 0 2px #fff inset',*/}
                                {/*}}*/}
                                {/*>*/}
                                {/*{newAtCooperativeLinkText.replace('{cooperatie_naam}', cooperativeName)}*/}
                                {/*</span>*/}
                            </div>
                        ) : null}

                        <div className="row">
                            <InputText
                                label="Privacybeleid link"
                                divSize={'col-sm-8'}
                                name={'linkPrivacyPolicy'}
                                value={linkPrivacyPolicy}
                                onChangeAction={this.handleInputChange}
                                required={!this.manageTechnicalPortalSettings ? 'required' : ''}
                                error={this.state.errors.linkPrivacyPolicy}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Advies % te dekken jaarlijks verbruik zonnepanelen"
                                type={'number'}
                                min={0}
                                max={100}
                                divSize={'col-sm-8'}
                                name={'pcrPowerKwhConsumptionPercentage'}
                                value={pcrPowerKwhConsumptionPercentage}
                                onChangeAction={this.handleInputChange}
                                required={!this.manageTechnicalPortalSettings ? 'required' : ''}
                                error={this.state.errors.pcrPowerKwhConsumptionPercentage}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Opbrengstcapaciteit van 1 zonnepaneel"
                                type={'number'}
                                divSize={'col-sm-8'}
                                name={'pcrGeneratingCapacityOneSolorPanel'}
                                value={pcrGeneratingCapacityOneSolorPanel}
                                onChangeAction={this.handleInputChange}
                                required={!this.manageTechnicalPortalSettings ? 'required' : ''}
                                error={this.state.errors.pcrGeneratingCapacityOneSolorPanel}
                            />
                        </div>
                        <div className="row">
                            <InputReactSelect
                                label="E-mail template Nieuwe account activeren"
                                divSize={'col-sm-8'}
                                name={'emailTemplateNewAccountId'}
                                value={emailTemplateNewAccountId}
                                options={this.props.emailTemplates}
                                onChangeAction={this.handleReactSelectChange}
                                required={!this.manageTechnicalPortalSettings ? 'required' : ''}
                                error={this.state.errors.emailTemplateNewAccountId}
                                multi={false}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Coöperatie portal naam"
                                divSize={'col-sm-8'}
                                name={'portalName'}
                                value={portalName}
                                onChangeAction={this.handleInputChange}
                                required={!this.manageTechnicalPortalSettings ? 'required' : ''}
                                error={this.state.errors.portalName}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Coöperatie naam"
                                divSize={'col-sm-8'}
                                name={'cooperativeName'}
                                value={cooperativeName}
                                onChangeAction={this.handleInputChange}
                                required={!this.manageTechnicalPortalSettings ? 'required' : ''}
                                error={this.state.errors.cooperativeName}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Coöperatie website"
                                divSize={'col-sm-8'}
                                name={'portalWebsite'}
                                value={portalWebsite}
                                onChangeAction={this.handleInputChange}
                                required={!this.manageTechnicalPortalSettings ? 'required' : ''}
                                error={this.state.errors.portalWebsite}
                            />
                        </div>
                    </PanelBody>

                    <PanelBody>
                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Sluiten'}
                                onClickAction={this.props.switchToView}
                            />
                            <ButtonText buttonText={'Opslaan'} type={'submit'} value={'Submit'} />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSystemData }, dispatch);

export default connect(null, mapDispatchToProps)(PortalSettingsFormGeneralEdit);
