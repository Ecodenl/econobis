import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import validator from 'validator';
import { isEmpty } from 'lodash';

import ButtonText from '../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../components/panel/PanelFooter';

import ProjectDetailsAPI from '../../../../../api/project/ProjectDetailsAPI';

import { fetchProject } from '../../../../../actions/project/ProjectDetailsActions';
import ContactGroupAPI from '../../../../../api/contact-group/ContactGroupAPI';
import ProjectFormEditGeneral from './ProjectFormEditGeneral';
import ProjectFormDefaultLoan from '../../../form-default/ProjectFormDefaultLoan';
import ProjectFormDefaultObligation from '../../../form-default/ProjectFormDefaultObligation';
import ProjectFormDefaultCapital from '../../../form-default/ProjectFormDefaultCapital';
import ProjectFormDefaultPostalcodeLinkCapital from '../../../form-default/ProjectFormDefaultPostalcodeLinkCapital';
import EmailTemplateAPI from '../../../../../api/email-template/EmailTemplateAPI';
import DocumentTemplateAPI from '../../../../../api/document-template/DocumentTemplateAPI';
import PortalSettingsAPI from '../../../../../api/portal-settings/PortalSettingsAPI';

class ProjectFormEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactGroups: [],
            staticContactGroups: [],
            emailTemplates: [],
            documentTemplates: [],
            project: {
                ...props.project,
                isMembershipRequired: Boolean(props.project.isMembershipRequired),
                isParticipationTransferable: Boolean(props.project.isParticipationTransferable),
                contactGroupIds:
                    props.project.requiresContactGroups &&
                    props.project.requiresContactGroups.map(requiresContactGroup => requiresContactGroup.id).join(','),
            },
            errors: {
                name: false,
                code: false,
                projectStatusId: false,
                ownedById: false,
                postalCode: false,
                // countryId: false,
                contactGroupIds: false,
            },
            isSaving: false,
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    componentDidMount() {
        if (this.state.project && !this.state.project.showQuestionAboutMembership) {
            const keys =
                '?keys[]=cooperativeName' +
                '&keys[]=defaultContactGroupMemberId' +
                '&keys[]=defaultContactGroupNoMemberId';
            PortalSettingsAPI.fetchPortalSettings(keys).then(payload => {
                let defaultTextIsMember;
                let defaultTextIsNoMember = '';
                let defaultTextBecomeMember = '';
                let defaultTextBecomeNoMember = '';
                let defaultContactGroupMemberId = null;
                let defaultContactGroupNoMemberId = null;
                if (payload.data.cooperativeName) {
                    let cooperatie_naam = payload.data.cooperativeName;
                    defaultTextIsMember = 'Ik ben lid van ' + cooperatie_naam + ' en ik betaal geen inschrijfkosten';
                    defaultTextIsNoMember = 'Ik ben geen lid van ' + cooperatie_naam;
                    defaultTextBecomeMember =
                        'Ik wil lid worden van ' + cooperatie_naam + ' en betaal daarom geen inschrijfkosten';
                    defaultTextBecomeNoMember =
                        'Ik ben en word geen lid van ' + cooperatie_naam + ' en betaal inschrijfkosten';
                } else {
                    defaultTextIsMember = 'Ik ben lid en ik betaal geen inschrijfkosten';
                    defaultTextIsNoMember = 'Ik ben geen lid';
                    defaultTextBecomeMember = 'Ik wil lid worden en betaal daarom geen inschrijfkosten';
                    defaultTextBecomeNoMember = 'Ik wil geen lid wordenen betaal inschrijfkosten';
                }
                defaultContactGroupMemberId = payload.data.defaultContactGroupMemberId
                    ? payload.data.defaultContactGroupMemberId
                    : null;
                defaultContactGroupNoMemberId = payload.data.defaultContactGroupNoMemberId
                    ? payload.data.defaultContactGroupNoMemberId
                    : null;

                this.setState({
                    project: {
                        ...this.state.project,
                        textIsMember: isEmpty(this.state.project.textIsMember)
                            ? defaultTextIsMember
                            : this.state.project.textIsMember,
                        textIsNoMember: isEmpty(this.state.project.textIsNoMember)
                            ? defaultTextIsNoMember
                            : this.state.project.textIsNoMember,
                        textBecomeMember: isEmpty(this.state.project.textBecomeMember)
                            ? defaultTextBecomeMember
                            : this.state.project.textBecomeMember,
                        textBecomeNoMember: isEmpty(this.state.project.textBecomeNoMember)
                            ? defaultTextBecomeNoMember
                            : this.state.project.textBecomeNoMember,
                        memberGroupId: isEmpty(this.state.project.memberGroupId)
                            ? defaultContactGroupMemberId
                            : this.state.project.memberGroupId,
                        noMemberGroupId: isEmpty(this.state.project.noMemberGroupId)
                            ? defaultContactGroupNoMemberId
                            : this.state.project.noMemberGroupId,
                    },
                });
            });
        }

        ContactGroupAPI.peekContactGroups().then(payload => {
            this.setState({ contactGroups: payload });
        });
        ContactGroupAPI.peekStaticContactGroups().then(payload => {
            this.setState({ staticContactGroups: payload });
        });
        EmailTemplateAPI.fetchEmailTemplatesPeek().then(payload => {
            this.setState({ emailTemplates: payload });
        });
        DocumentTemplateAPI.fetchDocumentTemplatesPeekGeneral().then(payload => {
            let documentTemplates = [];

            payload.forEach(function(documentTemplate) {
                if (documentTemplate.group == 'registration') {
                    documentTemplates.push({ id: documentTemplate.id, name: documentTemplate.name });
                }
            });

            this.setState({
                documentTemplates: documentTemplates,
            });
        });
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            project: {
                ...this.state.project,
                [name]: value,
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            project: {
                ...this.state.project,
                [name]: value,
            },
        });
    }

    handleReactSelectChange(selectedOption, name) {
        this.setState({
            project: {
                ...this.state.project,
                [name]: selectedOption,
            },
        });
    }
    handleSubmit = event => {
        event.preventDefault();

        const { project } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(project.name)) {
            errors.name = true;
            hasErrors = true;
        }

        if (validator.isEmpty('' + project.code)) {
            errors.code = true;
            hasErrors = true;
        }

        if (!project.projectStatusId) {
            errors.projectStatusId = true;
            hasErrors = true;
        }

        if (validator.isEmpty('' + project.ownedById)) {
            errors.ownedById = true;
            hasErrors = true;
        }

        if (validator.isEmpty('' + project.administrationId)) {
            errors.administrationId = true;
            hasErrors = true;
        }

        if (project.showQuestionAboutMembership) {
            if (!project.questionAboutMembershipGroupId) {
                errors.questionAboutMembershipGroupId = true;
                hasErrors = true;
            }
            if (validator.isEmpty('' + project.textIsMember)) {
                errors.textIsMember = true;
                hasErrors = true;
            }
            if (validator.isEmpty('' + project.textIsNoMember)) {
                errors.textIsNoMember = true;
                hasErrors = true;
            }
            if (validator.isEmpty('' + project.textBecomeMember)) {
                errors.textBecomeMember = true;
                hasErrors = true;
            }
            if (!project.memberGroupId) {
                errors.memberGroupId = true;
                hasErrors = true;
            }
            if (validator.isEmpty('' + project.textBecomeNoMember)) {
                errors.textBecomeNoMember = true;
                hasErrors = true;
            }
            if (!project.noMemberGroupId) {
                errors.noMemberGroupId = true;
                hasErrors = true;
            }
        }

        // todo projects doesn't have a countryId field yet
        // let countryId = project.countryId;
        // if (validator.isEmpty(project.countryId + '')) {
        //     countryId = 'NL';
        // }
        //
        // let postalCodeValid = true;
        // if (!validator.isEmpty(project.postalCode + '')) {
        //     if (countryId == 'NL') {
        //         postalCodeValid = validator.isPostalCode(project.postalCode, 'NL');
        //     } else {
        //         postalCodeValid = validator.isPostalCode(project.postalCode, 'any');
        //     }
        //     if (!postalCodeValid) {
        //         errors.postalCode = true;
        //         errors.countryId = true;
        //         hasErrors = true;
        //     }
        // }
        if (!validator.isEmpty('' + project.postalCode) && !validator.isPostalCode(project.postalCode, 'any')) {
            errors.postalCode = true;
            hasErrors = true;
        }

        if (project.isMembershipRequired && validator.isEmpty(project.contactGroupIds)) {
            errors.contactGroupIds = true;
            hasErrors = true;
        }

        // If isMemberShipRequired is false, set contactGroupIds to empty string
        if (!project.isMembershipRequired) {
            project.contactGroupIds = '';
        }

        if (isNaN(project.amountOfLoanNeeded)) {
            project.amountOfLoanNeeded = project.amountOfLoanNeeded.replace(/,/g, '.');
        }
        if (isNaN(project.minAmountLoan)) {
            project.minAmountLoan = project.minAmountLoan.replace(/,/g, '.');
        }
        if (isNaN(project.maxAmountLoan)) {
            project.maxAmountLoan = project.maxAmountLoan.replace(/,/g, '.');
        }

        this.setState({ ...this.state, errors: errors });

        if (!hasErrors) {
            this.setState({ isSaving: true });
            ProjectDetailsAPI.updateProject(project.id, project).then(payload => {
                this.setState({ isSaving: false });
                this.props.fetchProject(project.id);
                this.props.switchToView();
            });
        }
    };

    handleContactGroupIds = selectedOption => {
        this.setState({
            ...this.state,
            project: {
                ...this.state.project,
                contactGroupIds: selectedOption,
            },
        });
    };

    render() {
        const {
            name,
            code,
            description,
            projectStatusId,
            projectTypeId,
            projectType,
            address,
            postalCode,
            city,
            dateStartRegistrations,
            dateEndRegistrations,
            ownedById,
            administrationId,
            dateStart,
            dateEnd,
            dateEntry,
            dateProduction,
            contactGroupIds,
            isMembershipRequired,
            amountOfLoanNeeded,
            minAmountLoan,
            maxAmountLoan,
            ean,
            eanManager,
            warrantyOrigin,
            eanSupply,
            participationWorth,
            powerKwAvailable,
            maxParticipations,
            taxReferral,
            totalParticipations,
            minParticipations,
            isParticipationTransferable,
            postalcodeLink,
            documentTemplateAgreementId,
            documentTemplates,
            emailTemplateAgreementId,
            emailTemplates,
            linkAgreeTerms,
            linkUnderstandInfo,
            showQuestionAboutMembership,
            questionAboutMembershipGroupId,
            textIsMember,
            textIsNoMember,
            textBecomeMember,
            memberGroupId,
            textBecomeNoMember,
            noMemberGroupId,
        } = this.state.project;
        const {
            participationsDefinitive,
            participationsGranted,
            participationsOptioned,
            participationsInteressed,
            amountDefinitive,
            amountGranted,
            amountOptioned,
            amountInteressed,
            administration,
            hasPaymentInvoices,
            valueCourses,
            amountOfParticipants,
        } = this.props.project;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <ProjectFormEditGeneral
                    name={name}
                    code={code}
                    description={description}
                    projectStatusId={projectStatusId}
                    projectType={projectType}
                    address={address}
                    postalCode={postalCode}
                    city={city}
                    dateStartRegistrations={dateStartRegistrations}
                    dateEndRegistrations={dateEndRegistrations}
                    ownedById={ownedById}
                    administrationId={administrationId}
                    administration={administration}
                    hasPaymentInvoices={hasPaymentInvoices}
                    dateStart={dateStart}
                    dateEnd={dateEnd}
                    dateEntry={dateEntry}
                    dateProduction={dateProduction}
                    contactGroupIds={contactGroupIds}
                    isMembershipRequired={isMembershipRequired}
                    handleInputChange={this.handleInputChange}
                    handleInputChangeDate={this.handleInputChangeDate}
                    handleContactGroupIds={this.handleContactGroupIds}
                    handleReactSelectChange={this.handleReactSelectChange}
                    errors={this.state.errors}
                    contactGroups={this.state.contactGroups}
                    staticContactGroups={this.state.staticContactGroups}
                    amountOfParticipants={amountOfParticipants}
                    documentTemplateAgreementId={documentTemplateAgreementId}
                    documentTemplates={this.state.documentTemplates}
                    emailTemplateAgreementId={emailTemplateAgreementId}
                    emailTemplates={this.state.emailTemplates}
                    linkAgreeTerms={linkAgreeTerms}
                    linkUnderstandInfo={linkUnderstandInfo}
                    showQuestionAboutMembership={showQuestionAboutMembership}
                    questionAboutMembershipGroupId={questionAboutMembershipGroupId}
                    textIsMember={textIsMember}
                    textIsNoMember={textIsNoMember}
                    textBecomeMember={textBecomeMember}
                    memberGroupId={memberGroupId}
                    textBecomeNoMember={textBecomeNoMember}
                    noMemberGroupId={noMemberGroupId}
                />

                {projectType && projectType.codeRef === 'loan' ? (
                    <ProjectFormDefaultLoan
                        amountOfLoanNeeded={amountOfLoanNeeded}
                        minAmountLoan={minAmountLoan}
                        maxAmountLoan={maxAmountLoan}
                        amountDefinitive={amountDefinitive}
                        amountGranted={amountGranted}
                        amountOptioned={amountOptioned}
                        amountInteressed={amountInteressed}
                        handleInputChange={this.handleInputChange}
                    />
                ) : null}

                {projectType && projectType.codeRef === 'obligation' ? (
                    <ProjectFormDefaultObligation
                        participationWorth={participationWorth}
                        totalParticipations={totalParticipations}
                        participationsDefinitive={participationsDefinitive}
                        participationsGranted={participationsGranted}
                        participationsOptioned={participationsOptioned}
                        participationsInteressed={participationsInteressed}
                        powerKwAvailable={powerKwAvailable}
                        minParticipations={minParticipations}
                        maxParticipations={maxParticipations}
                        isParticipationTransferable={isParticipationTransferable}
                        valueCourses={valueCourses}
                        handleInputChange={this.handleInputChange}
                        projectTypeId={projectTypeId}
                    />
                ) : null}

                {(projectType && projectType.codeRef === 'capital') ||
                (projectType && projectType.codeRef === 'postalcode_link_capital') ? (
                    <ProjectFormDefaultCapital
                        participationWorth={participationWorth}
                        totalParticipations={totalParticipations}
                        participationsDefinitive={participationsDefinitive}
                        participationsGranted={participationsGranted}
                        participationsOptioned={participationsOptioned}
                        participationsInteressed={participationsInteressed}
                        powerKwAvailable={powerKwAvailable}
                        minParticipations={minParticipations}
                        maxParticipations={maxParticipations}
                        isParticipationTransferable={isParticipationTransferable}
                        valueCourses={valueCourses}
                        handleInputChange={this.handleInputChange}
                        projectTypeId={projectTypeId}
                    />
                ) : null}

                {projectType && projectType.codeRef === 'postalcode_link_capital' ? (
                    <ProjectFormDefaultPostalcodeLinkCapital
                        postalcodeLink={postalcodeLink}
                        ean={ean}
                        taxReferral={taxReferral}
                        eanManager={eanManager}
                        warrantyOrigin={warrantyOrigin}
                        eanSupply={eanSupply}
                        handleInputChange={this.handleInputChange}
                        projectTypeId={projectTypeId}
                    />
                ) : null}

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={this.handleSubmit}
                            type={'submit'}
                            value={'Submit'}
                            loading={this.state.isSaving}
                        />
                    </div>
                </PanelFooter>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    fetchProject: id => {
        dispatch(fetchProject(id));
    },
});

const mapStateToProps = state => {
    return {
        project: state.projectDetails,
        projectTypes: state.systemData.projectTypes,
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectFormEdit);
