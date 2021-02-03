import React, { Component } from 'react';
import { connect } from 'react-redux';

import PortalSettingsFormGeneralEdit from './PortalSettingsFormGeneralEdit';
import PortalSettingsFormGeneralView from './PortalSettingsFormGeneralView';
import EmailTemplateAPI from '../../../api/email-template/EmailTemplateAPI';
import ContactGroupAPI from '../../../api/contact-group/ContactGroupAPI';
import AdministrationsAPI from '../../../api/administration/AdministrationsAPI';

class PortalSettingsFormGeneral extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailTemplates: [],
            administrations: [],
            staticContactGroups: [],
            imageHash: Date.now(),
            showEdit: false,
            activeDiv: '',
        };
    }

    componentDidMount() {
        EmailTemplateAPI.fetchEmailTemplatesPeek().then(payload => {
            this.setState({
                emailTemplates: payload,
            });
        });
        this.peekAdministrations();
        this.fetchStaticContactGroups();
    }

    peekAdministrations = () => {
        AdministrationsAPI.peekAdministrations().then(payload => {
            this.setState({ administrations: payload });
        });
    };

    fetchStaticContactGroups = () => {
        ContactGroupAPI.peekStaticContactGroups().then(payload => {
            this.setState({ staticContactGroups: payload });
        });
    };

    switchToEdit = () => {
        this.setState({
            showEdit: true,
        });
    };

    switchToView = () => {
        this.setState({
            imageHash: Date.now(),
            showEdit: false,
            activeDiv: '',
        });
    };

    onDivEnter() {
        this.setState({
            activeDiv: 'panel-grey',
        });
    }

    onDivLeave() {
        if (!this.state.showEdit) {
            this.setState({
                activeDiv: '',
            });
        }
    }

    render() {
        const { permissions = {} } = this.props.meDetails;
        this.props.portalSettings.responsibleUser = '';
        if (this.props.portalSettings.responsibleUserId && this.props.portalSettings.responsibleUserId != 0) {
            this.props.portalSettings.responsibleUser = this.props.users.find(
                user => user.id == this.props.portalSettings.responsibleUserId
            );
        }
        this.props.portalSettings.contactResponsibleOwnerUser = '';
        if (
            this.props.portalSettings.contactResponsibleOwnerUserId &&
            this.props.portalSettings.contactResponsibleOwnerUserId != 0
        ) {
            this.props.portalSettings.contactResponsibleOwnerUser = this.props.users.find(
                user => user.id == this.props.portalSettings.contactResponsibleOwnerUserId
            );
        }
        this.props.portalSettings.emailTemplateNewAccount = '';
        if (
            this.props.portalSettings.emailTemplateNewAccountId &&
            this.props.portalSettings.emailTemplateNewAccountId != 0
        ) {
            this.props.portalSettings.emailTemplateNewAccount = this.state.emailTemplates.find(
                emailTemplate => emailTemplate.id == this.props.portalSettings.emailTemplateNewAccountId
            );
        }
        this.props.portalSettings.defaultContactGroupMember = '';
        if (
            this.props.portalSettings.defaultContactGroupMemberId &&
            this.props.portalSettings.defaultContactGroupMemberId != 0
        ) {
            this.props.portalSettings.defaultContactGroupMember = this.state.staticContactGroups.find(
                contactGroup => contactGroup.id == this.props.portalSettings.defaultContactGroupMemberId
            );
        }
        this.props.portalSettings.defaultContactGroupNoMember = '';
        if (
            this.props.portalSettings.defaultContactGroupNoMemberId &&
            this.props.portalSettings.defaultContactGroupNoMemberId != 0
        ) {
            this.props.portalSettings.defaultContactGroupNoMember = this.state.staticContactGroups.find(
                contactGroup => contactGroup.id == this.props.portalSettings.defaultContactGroupNoMemberId
            );
        }

        this.props.portalSettings.checkContactTaskResponsible = '';
        this.props.portalSettings.checkContactTaskResponsibleUser = null;
        this.props.portalSettings.checkContactTaskResponsibleTeam = null;
        if (
            this.props.portalSettings.checkContactTaskResponsibleUserId &&
            this.props.portalSettings.checkContactTaskResponsibleUserId != 0
        ) {
            this.props.portalSettings.checkContactTaskResponsible =
                'user' + this.props.portalSettings.checkContactTaskResponsibleUserId;
            this.props.portalSettings.checkContactTaskResponsibleUser = this.props.users.find(
                user => user.id == this.props.portalSettings.checkContactTaskResponsibleUserId
            );
        }
        if (
            this.props.portalSettings.checkContactTaskResponsibleTeamId &&
            this.props.portalSettings.checkContactTaskResponsibleTeamId != 0
        ) {
            this.props.portalSettings.checkContactTaskResponsible =
                'team' + this.props.portalSettings.checkContactTaskResponsibleTeamId;
            this.props.portalSettings.checkContactTaskResponsibleTeam = this.props.teams.find(
                team => team.id == this.props.portalSettings.checkContactTaskResponsibleTeamId
            );
        }
        this.props.portalSettings.defaultAdministration = '';
        if (
            this.props.portalSettings.defaultAdministrationId &&
            this.props.portalSettings.defaultAdministrationId != 0
        ) {
            this.props.portalSettings.defaultAdministration = this.state.administrations.find(
                administration => administration.id == this.props.portalSettings.defaultAdministrationId
            );
        }

        return (
            <div
                className={this.state.activeDiv}
                onMouseEnter={() => this.onDivEnter()}
                onMouseLeave={() => this.onDivLeave()}
            >
                {this.state.showEdit && permissions.managePortalSettings ? (
                    <PortalSettingsFormGeneralEdit
                        portalSettings={this.props.portalSettings}
                        emailTemplates={this.state.emailTemplates}
                        administrations={this.state.administrations}
                        staticContactGroups={this.state.staticContactGroups}
                        switchToView={this.switchToView}
                        peekAdministrations={this.peekAdministrations}
                        fetchStaticContactGroups={this.fetchStaticContactGroups}
                        imageHash={this.state.imageHash}
                        updateState={this.props.updateState}
                        users={this.props.users}
                        teams={this.props.teams}
                        meDetails={this.props.meDetails}
                    />
                ) : (
                    <PortalSettingsFormGeneralView
                        {...this.props.portalSettings}
                        switchToEdit={this.switchToEdit}
                        imageHash={this.state.imageHash}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        emailTemplates: state.emailTemplates,
        administrations: state.administrations,
        staticContactGroups: state.staticContactGroups,
        meDetails: state.meDetails,
        permissions: state.meDetails.permissions,
        teams: state.systemData.teams,
        users: state.systemData.users,
    };
};

export default connect(mapStateToProps)(PortalSettingsFormGeneral);
