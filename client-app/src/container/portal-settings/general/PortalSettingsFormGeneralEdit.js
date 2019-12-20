import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class PortalSettingsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portalSettings: {
                ...props.portalSettings,
            },
            emailTemplates: {
                ...props.emailTemplates,
            },
            attachment: '',
            filename: 'logo.png',
            newLogo: false,
            errors: {
                portalName: false,
                cooperativeName: false,
                portalWebsite: false,
                portalUrl: false,
                backgroundColor: false,
                backgroundImageColor: false,
                backgroundSecondaryColor: false,
                buttonColor: false,
                responsibleUserId: false,
                checkContactTaskResponsibleUserId: false,
                checkContactTaskResponsibleTeamId: false,
                checkContactTaskResponsible: false,
                contactResponsibleOwnerUserId: false,
                emailTemplateNewAccountId: false,
                linkPrivacyPolicy: false,
                showNewAtCooperativeLink: false,
            },
        };

        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    toggleNewLogo = () => {
        this.setState({
            newLogo: !this.state.newLogo,
        });
    };
    addAttachment = file => {
        this.setState({
            ...this.state,
            attachment: file[0],
            filename: file[0].name,
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

        const { portalSettings, attachment, filename } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(portalSettings.portalUrl)) {
            errors.portalUrl = true;
            hasErrors = true;
        }
        if (validator.isEmpty(portalSettings.linkPrivacyPolicy)) {
            errors.linkPrivacyPolicy = true;
            hasErrors = true;
        }

        if (validator.isEmpty(portalSettings.checkContactTaskResponsible)) {
            errors.checkContactTaskResponsible = true;
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

        data.append('portalName', portalSettings.portalName);
        data.append('cooperativeName', portalSettings.cooperativeName);
        data.append('portalWebsite', portalSettings.portalWebsite);
        data.append('portalUrl', portalSettings.portalUrl);
        data.append('backgroundColor', portalSettings.backgroundColor);
        data.append('backgroundImageColor', portalSettings.backgroundImageColor);
        data.append('backgroundSecondaryColor', portalSettings.backgroundSecondaryColor);
        data.append('buttonColor', portalSettings.buttonColor);
        data.append('responsibleUserId', portalSettings.responsibleUserId);
        data.append('checkContactTaskResponsible', portalSettings.checkContactTaskResponsible);
        data.append('contactResponsibleOwnerUserId', portalSettings.contactResponsibleOwnerUserId);
        data.append('emailTemplateNewAccountId', portalSettings.emailTemplateNewAccountId);
        data.append('linkPrivacyPolicy', portalSettings.linkPrivacyPolicy);
        data.append('showNewAtCooperativeLink', portalSettings.showNewAtCooperativeLink);

        data.append('attachment', attachment);

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
            attachment,
            filename,
            cooperativeName,
            portalWebsite,
            portalUrl,
            backgroundColor,
            backgroundImageColor,
            backgroundSecondaryColor,
            buttonColor,
            responsibleUserId,
            checkContactTaskResponsible,
            contactResponsibleOwnerUserId,
            emailTemplateNewAccountId,
            linkPrivacyPolicy,
            showNewAtCooperativeLink,
        } = this.state.portalSettings;

        // console.log('File: ' + filename);

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
                                required={'required'}
                                error={this.state.errors.portalUrl}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Contacten portal Logo"
                                divSize={'col-sm-8'}
                                value={attachment ? attachment.name : filename}
                                onClickAction={this.toggleNewLogo}
                                onChangeaction={() => {}}
                            />
                        </div>
                        {this.state.newLogo && (
                            <PortalLogoNew toggleShowNew={this.toggleNewLogo} addAttachment={this.addAttachment} />
                        )}

                        <div className="row">
                            <InputText
                                label="Achtergrond kleur"
                                divSize={'col-sm-8'}
                                name={'backgroundColor'}
                                value={backgroundColor}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.backgroundColor}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Achtergrond afbeelding kleur"
                                divSize={'col-sm-8'}
                                name={'backgroundImageColor'}
                                value={backgroundImageColor}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.backgroundImageColor}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Tweede achtergrondkleur"
                                divSize={'col-sm-8'}
                                name={'backgroundSecondaryColor'}
                                value={backgroundSecondaryColor}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.backgroundSecondaryColor}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Buttonknop kleur"
                                divSize={'col-sm-8'}
                                name={'buttonColor'}
                                value={buttonColor}
                                onChangeAction={this.handleInputChange}
                                error={this.state.errors.buttonColor}
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
                                required={'required'}
                                error={this.state.errors.checkContactTaskResponsible}
                            />
                        </div>

                        <div className="row">
                            <InputToggle
                                label="Nieuw bij, aanmelden mogelijk"
                                divSize={'col-sm-8'}
                                name={'showNewAtCooperativeLink'}
                                value={showNewAtCooperativeLink}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Privacybeleid link"
                                divSize={'col-sm-8'}
                                name={'linkPrivacyPolicy'}
                                value={linkPrivacyPolicy}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.linkPrivacyPolicy}
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
                                required={'required'}
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
                                required={'required'}
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
                                required={'required'}
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

export default connect(
    null,
    mapDispatchToProps
)(PortalSettingsFormGeneralEdit);
