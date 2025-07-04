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

class PortalSettingsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.manageTechnicalPortalSettings = true;
        // this.props.meDetails.email == 'support@econobis.nl' || this.props.meDetails.email == 'software@xaris.nl'
        //     ? true
        //     : false;

        this.state = {
            portalSettings: {
                ...props.portalSettings,
            },
            emailTemplates: {
                ...props.emailTemplates,
            },
            administrations: {
                ...props.administrations,
            },
            staticContactGroups: {
                ...props.staticContactGroups,
            },
            errors: {
                portalActive: false,
                portalName: false,
                cooperativeName: false,
                portalWebsite: false,
                portalUrl: false,
                responsibleUserId: false,
                checkContactTaskResponsibleUserId: false,
                checkContactTaskResponsibleTeamId: false,
                checkContactTaskResponsible: false,
                contactResponsibleOwnerUserId: false,
                emailTemplateNewAccountId: false,
                linkPrivacyPolicy: false,
                showNewAtCooperativeLink: false,
                newAtCooperativeLinkText: false,
                defaultContactGroupMemberId: false,
                defaultContactGroupNoMemberId: false,
                pcrPowerKwhConsumptionPercentage: false,
                pcrGeneratingCapacityOneSolorPanel: false,
                defaultAdministrationId: false,
            },
        };

        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

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

        const { portalSettings } = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if (!portalSettings.portalUrl || validator.isEmpty(portalSettings.portalUrl + '')) {
            errors.portalUrl = true;
            hasErrors = true;
        }
        if (portalSettings.portalActive && validator.isEmpty(portalSettings.responsibleUserId + '')) {
            errors.responsibleUserId = true;
            hasErrors = true;
        }
        if (portalSettings.portalActive && validator.isEmpty(portalSettings.contactResponsibleOwnerUserId + '')) {
            errors.contactResponsibleOwnerUserId = true;
            hasErrors = true;
        }
        if (portalSettings.portalActive && validator.isEmpty(portalSettings.checkContactTaskResponsible + '')) {
            errors.checkContactTaskResponsible = true;
            hasErrors = true;
        }
        if (portalSettings.portalActive && validator.isEmpty(portalSettings.newAtCooperativeLinkText)) {
            errors.newAtCooperativeLinkText = true;
            hasErrors = true;
        }
        if (portalSettings.portalActive && validator.isEmpty(portalSettings.defaultContactGroupMemberId + '')) {
            errors.defaultContactGroupMemberId = true;
            hasErrors = true;
        }
        if (portalSettings.portalActive && validator.isEmpty(portalSettings.defaultContactGroupNoMemberId + '')) {
            errors.defaultContactGroupNoMemberId = true;
            hasErrors = true;
        }
        if (portalSettings.portalActive && validator.isEmpty(portalSettings.linkPrivacyPolicy)) {
            errors.linkPrivacyPolicy = true;
            hasErrors = true;
        }
        if (portalSettings.portalActive && portalSettings.pcrPowerKwhConsumptionPercentage === null) {
            errors.pcrPowerKwhConsumptionPercentage = true;
            hasErrors = true;
        }
        if (portalSettings.portalActive && portalSettings.pcrGeneratingCapacityOneSolorPanel === null) {
            errors.pcrGeneratingCapacityOneSolorPanel = true;
            hasErrors = true;
        }
        if (portalSettings.portalActive && validator.isEmpty(portalSettings.emailTemplateNewAccountId + '')) {
            errors.emailTemplateNewAccountId = true;
            hasErrors = true;
        }
        if (portalSettings.portalActive && validator.isEmpty(portalSettings.portalName)) {
            errors.portalName = true;
            hasErrors = true;
        }
        if (portalSettings.portalActive && validator.isEmpty(portalSettings.cooperativeName)) {
            errors.cooperativeName = true;
            hasErrors = true;
        }
        if (portalSettings.portalActive && validator.isEmpty(portalSettings.portalWebsite)) {
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

        if (portalSettings.portalActive && validator.isEmpty(portalSettings.defaultAdministrationId + '')) {
            errors.defaultAdministrationId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        if (!hasErrors) {
            // pcrPowerKwhConsumptionPercentage als factor opslaan (04-07-2025 WM: niet meer)
            // portalSettings.pcrPowerKwhConsumptionPercentage =
            //     parseInt(portalSettings.pcrPowerKwhConsumptionPercentage) / 100;
            PortalSettingsAPI.updatePortalSettings(portalSettings)
                .then(payload => {
                    this.props.updateState(payload.data.data);
                    this.props.fetchSystemData();
                    this.props.peekAdministrations();
                    this.props.fetchStaticContactGroups();
                    this.props.switchToView();
                })
                .catch(error => {
                    if (error.response) {
                        this.props.setError(error.response.status, error.response.data.message);
                    } else {
                        console.log(error);
                        alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                    }
                });
        }
    };

    render() {
        const {
            portalActive,
            portalName,
            cooperativeName,
            portalWebsite,
            portalUrl,
            responsibleUserId,
            checkContactTaskResponsible,
            contactResponsibleOwnerUserId,
            emailTemplateNewAccountId,
            linkPrivacyPolicy,
            showNewAtCooperativeLink,
            newAtCooperativeLinkText,
            defaultContactGroupMemberId,
            defaultContactGroupNoMemberId,
            pcrPowerKwhConsumptionPercentage,
            pcrGeneratingCapacityOneSolorPanel,
            defaultAdministrationId,
        } = this.state.portalSettings;

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

                        <hr />

                        <div className="row">
                            <InputToggle
                                label="Contacten portal actief"
                                divSize={'col-sm-8'}
                                name={'portalActive'}
                                value={portalActive}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>
                        <div className="row">
                            <InputReactSelect
                                label="Verantwoordelijke portal"
                                divSize={'col-sm-8'}
                                name={'responsibleUserId'}
                                value={Number(responsibleUserId)}
                                options={this.props.users}
                                optionName={'fullName'}
                                onChangeAction={this.handleReactSelectChange}
                                required={portalActive ? 'required' : ''}
                                error={this.state.errors.responsibleUserId}
                            />
                        </div>
                        <div className="row">
                            <InputReactSelect
                                label="Eigenaar nieuwe contacten"
                                divSize={'col-sm-8'}
                                name={'contactResponsibleOwnerUserId'}
                                value={Number(contactResponsibleOwnerUserId)}
                                options={this.props.users}
                                optionName={'fullName'}
                                onChangeAction={this.handleReactSelectChange}
                                required={portalActive ? 'required' : ''}
                                error={this.state.errors.contactResponsibleOwnerUserId}
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
                                required={portalActive ? 'required' : ''}
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
                                    required={portalActive ? 'required' : ''}
                                    error={this.state.errors.newAtCooperativeLinkText}
                                />
                            </div>
                        ) : null}

                        <div className="row">
                            <InputReactSelect
                                label="Standaard contact groep lid worden"
                                divSize={'col-sm-8'}
                                name={'defaultContactGroupMemberId'}
                                value={Number(defaultContactGroupMemberId)}
                                options={this.props.staticContactGroups}
                                onChangeAction={this.handleReactSelectChange}
                                required={portalActive ? 'required' : ''}
                                error={this.state.errors.defaultContactGroupMemberId}
                            />
                        </div>
                        <div className="row">
                            <InputReactSelect
                                label="Standaard contact groep geen lid worden"
                                divSize={'col-sm-8'}
                                name={'defaultContactGroupNoMemberId'}
                                value={Number(defaultContactGroupNoMemberId)}
                                options={this.props.staticContactGroups}
                                onChangeAction={this.handleReactSelectChange}
                                required={portalActive ? 'required' : ''}
                                error={this.state.errors.defaultContactGroupNoMemberId}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Privacybeleid link"
                                divSize={'col-sm-8'}
                                name={'linkPrivacyPolicy'}
                                value={linkPrivacyPolicy}
                                onChangeAction={this.handleInputChange}
                                required={portalActive ? 'required' : ''}
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
                                required={portalActive ? 'required' : ''}
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
                                required={portalActive ? 'required' : ''}
                                error={this.state.errors.pcrGeneratingCapacityOneSolorPanel}
                            />
                        </div>
                        <div className="row">
                            <InputReactSelect
                                label="E-mail template Nieuwe account activeren"
                                divSize={'col-sm-8'}
                                name={'emailTemplateNewAccountId'}
                                value={Number(emailTemplateNewAccountId)}
                                options={this.props.emailTemplates}
                                onChangeAction={this.handleReactSelectChange}
                                required={portalActive ? 'required' : ''}
                                error={this.state.errors.emailTemplateNewAccountId}
                            />
                        </div>
                        <div className="row">
                            <InputText
                                label="Coöperatie portal naam"
                                divSize={'col-sm-8'}
                                name={'portalName'}
                                value={portalName}
                                onChangeAction={this.handleInputChange}
                                required={portalActive ? 'required' : ''}
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
                                required={portalActive ? 'required' : ''}
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
                                required={portalActive ? 'required' : ''}
                                error={this.state.errors.portalWebsite}
                            />
                        </div>
                        <div className="row">
                            <InputReactSelect
                                label="Standaard administratie / uitgevende instantie"
                                divSize={'col-sm-8'}
                                name={'defaultAdministrationId'}
                                value={Number(defaultAdministrationId)}
                                options={this.props.administrations}
                                onChangeAction={this.handleReactSelectChange}
                                required={portalActive ? 'required' : ''}
                                error={this.state.errors.defaultAdministrationId}
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
