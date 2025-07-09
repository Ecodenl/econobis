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
import RequiredParticipantsHelper from '../../../../../helpers/RequiredParticipantsHelper';

const defaultTextInfoProjectOnlyMembers =
    'Om in te schrijven voor dit project moet u eerst lid worden van onze coöperatie.';

class ProjectFormEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactGroups: [],
            staticContactGroups: [],
            emailTemplates: [],
            documentTemplates: [],
            disableBeforeEntryDate: '',
            hasLastYearFinancialOverviewDefinitive: false,
            projectInfoLinkOrDocument: props.project.documentIdProjectInfo !== null ? 'document' : 'link',
            agreeTermsLinkOrDocument: props.project.documentIdAgreeTerms !== null ? 'document' : 'link',
            understandInfoLinkOrDocument: props.project.documentIdUnderstandInfo !== null ? 'document' : 'link',
            project: {
                ...props.project,
                showQuestionAboutMembership: Boolean(props.project.showQuestionAboutMembership),
                useTransactionCostsWithMembership: Boolean(props.project.useTransactionCostsWithMembership),
                isMembershipRequired: Boolean(props.project.isMembershipRequired),
                isParticipationTransferable: Boolean(props.project.isParticipationTransferable),
                contactGroupIds:
                    props.project.requiresContactGroups &&
                    props.project.requiresContactGroups.map(requiresContactGroup => requiresContactGroup.id).join(','),
                contactGroupIdsSelected: props.project.requiresContactGroups ? props.project.requiresContactGroups : [],
                allowChangeDateInterestBearingKwh:
                    props.project.dateInterestBearingKwhWrong != null &&
                    props.project.dateInterestBearingKwhWrong != undefined
                        ? props.project.dateInterestBearingKwhWrong
                        : false,
                allowChangeDateInterestBearing:
                    props.project.dateInterestBearingWrong != null &&
                    props.project.dateInterestBearingWrong != undefined
                        ? props.project.dateInterestBearingWrong
                        : false,
                allowChangeDateInterestBearingRedemption:
                    props.project.dateInterestBearingRedemptionWrong != null &&
                    props.project.dateInterestBearingRedemptionWrong != undefined
                        ? props.project.dateInterestBearingRedemptionWrong
                        : false,
                allowChangeKwhStartHighNextRevenue:
                    props.project.kwhStartHighNextRevenueWrong != null &&
                    props.project.kwhStartHighNextRevenueWrong != undefined
                        ? props.project.kwhStartHighNextRevenueWrong
                        : false,
                allowChangeKwhStartLowNextRevenue:
                    props.project.kwhStartLowNextRevenueWrong != null &&
                    props.project.kwhStartLowNextRevenueWrong != undefined
                        ? props.project.kwhStartLowNextRevenueWrong
                        : false,
            },
            errors: {
                name: false,
                code: false,
                projectStatusId: false,
                baseProjectCodeRef: false,
                postalcodeLink: false,
                addressNumberSeries: false,
                description: false,
                postalCode: false,
                // countryId: false,
                ownedById: false,
                administrationId: false,
                contactGroupIds: false,
                dateEntry: false,
                linkProjectInfo: false,
                documentIdProjectInfo: false,
                transactionCostsCodeRef: false,
                textTransactionCosts: false,
                transactionCostsAmountMin: false,
                transactionCostsAmountMax: false,
                transactionCostsAmount: false,
                transactionCostsAmount2: false,
                transactionCostsAmount3: false,
                transactionCostsPercentage: false,
                transactionCostsPercentage2: false,
                transactionCostsPercentage3: false,
                questionAboutMembershipGroupId: false,
                textRegisterPageHeader: false,
                textRegisterCurrentBookWorth: false,
                textRegisterParticipationSingular: false,
                textRegisterParticipationPlural: false,
                textIsMember: false,
                textIsNoMember: false,
                textBecomeMember: false,
                memberGroupId: false,
                textBecomeNoMember: false,
                noMemberGroupId: false,
                textAgreeTerms: false,
                linkAgreeTerms: false,
                documentIdAgreeTerms: false,
                textLinkAgreeTerms: false,
                textLinkNameAgreeTerms: false,
                linkUnderstandInfo: false,
                documentIdUnderstandInfo: false,
                textLinkUnderstandInfo: false,
                textLinkNameUnderstandInfo: false,
                textAcceptAgreement: false,
                textAcceptAgreementQuestion: false,
                documentTemplateAgreementId: false,
                emailTemplateAgreementId: false,
                allowIncreaseParticipationsInPortal: false,
                documentTemplateIncreaseParticipationsId: false,
                emailTemplateIncreaseParticipationsId: false,
                textRegistrationFinished: false,
                loanTypeId: false,
            },
            errorMessages: {
                name: '',
                code: '',
                projectStatusId: '',
                baseProjectCodeRef: '',
                postalcodeLink: '',
                addressNumberSeries: '',
                description: '',
                postalCode: '',
                // countryId: '',
                ownedById: '',
                administrationId: '',
                contactGroupIds: '',
                dateEntry: '',
                linkProjectInfo: '',
                documentIdProjectInfo: '',
                transactionCostsCodeRef: '',
                textTransactionCosts: '',
                transactionCostsAmountMin: '',
                transactionCostsAmountMax: '',
                transactionCostsAmount: '',
                transactionCostsAmount2: '',
                transactionCostsAmount3: '',
                transactionCostsPercentage: '',
                transactionCostsPercentage2: '',
                transactionCostsPercentage3: '',
                questionAboutMembershipGroupId: '',
                textRegisterPageHeader: '',
                textRegisterCurrentBookWorth: '',
                textRegisterParticipationSingular: '',
                textRegisterParticipationPlural: '',
                textIsMember: '',
                textIsNoMember: '',
                textBecomeMember: '',
                memberGroupId: '',
                textBecomeNoMember: '',
                noMemberGroupId: '',
                textAgreeTerms: '',
                linkAgreeTerms: '',
                documentIdAgreeTerms: '',
                textLinkAgreeTerms: '',
                textLinkNameAgreeTerms: '',
                linkUnderstandInfo: '',
                documentIdUnderstandInfo: '',
                textLinkUnderstandInfo: '',
                textLinkNameUnderstandInfo: '',
                textAcceptAgreement: '',
                textAcceptAgreementQuestion: '',
                documentTemplateAgreementId: '',
                emailTemplateAgreementId: '',
                allowIncreaseParticipationsInPortal: '',
                documentTemplateIncreaseParticipationsId: '',
                emailTemplateIncreaseParticipationsId: '',
                textRegistrationFinished: '',
                loanTypeId: '',
            },
            isSaving: false,
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleInputChangeAdministration = this.handleInputChangeAdministration.bind(this);
        this.handleReactSelectChange = this.handleReactSelectChange.bind(this);
    }

    componentDidMount() {
        this.setDisableBeforeEntryDate();

        if (this.state.project && !this.state.project.showQuestionAboutMembership) {
            // todo WM: check / anders
            //
            const portalSettingsId = 1;

            PortalSettingsAPI.fetchPortalSettingsDetails(portalSettingsId).then(payload => {
                let defaultTextIsMember = '';
                let defaultTextIsNoMember = '';
                let defaultTextBecomeMember = '';
                let defaultTextBecomeNoMember = '';
                let defaultContactGroupMemberId = '';
                let defaultContactGroupNoMemberId = '';
                if (payload.data.data.cooperativeName) {
                    let cooperatie_naam = payload.data.data.cooperativeName;
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
                defaultContactGroupMemberId = payload.data.data.defaultContactGroupMemberId
                    ? payload.data.data.defaultContactGroupMemberId
                    : null;
                defaultContactGroupNoMemberId = payload.data.data.defaultContactGroupNoMemberId
                    ? payload.data.data.defaultContactGroupNoMemberId
                    : null;

                this.setState({
                    project: {
                        ...this.state.project,

                        textInfoProjectOnlyMembers: isEmpty(this.state.project.textInfoProjectOnlyMembers)
                            ? defaultTextInfoProjectOnlyMembers
                            : this.state.project.textInfoProjectOnlyMembers,
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
                            ? defaultContactGroupMemberId != null
                                ? Number(defaultContactGroupMemberId)
                                : null
                            : this.state.project.memberGroupId,
                        noMemberGroupId: isEmpty(this.state.project.noMemberGroupId)
                            ? defaultContactGroupNoMemberId != null
                                ? Number(defaultContactGroupNoMemberId)
                                : null
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
                if (documentTemplate.group === 'registration') {
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

    handleInputChangeAdministration = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setDisableBeforeEntryDate();

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

    setDisableBeforeEntryDate() {
        let lastYearFinancialOverviewDefinitive = 0;
        if (this.props.project && this.props.project.lastYearFinancialOverviewDefinitive) {
            lastYearFinancialOverviewDefinitive = this.props.project.lastYearFinancialOverviewDefinitive;
        } else {
            let administration;
            administration = this.props.administrations.filter(
                administration => administration.id === this.props.project.administrationId
            );
            administration = administration[0];
            if (administration && administration.lastYearFinancialOverviewDefinitive) {
                lastYearFinancialOverviewDefinitive = administration.lastYearFinancialOverviewDefinitive;
            }
        }
        let disableBeforeEntryDate =
            lastYearFinancialOverviewDefinitive > 0
                ? moment(moment().year(lastYearFinancialOverviewDefinitive + 1)).format('YYYY-01-01')
                : '';

        const hasLastYearFinancialOverviewDefinitive = lastYearFinancialOverviewDefinitive > 0;

        this.setState({
            ...this.state,
            disableBeforeEntryDate: disableBeforeEntryDate,
            hasLastYearFinancialOverviewDefinitive: hasLastYearFinancialOverviewDefinitive,
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { project } = this.state;

        let errors = {};
        let errorMessages = {};
        let hasErrors = false;

        if (validator.isEmpty(project.name)) {
            errors.name = true;
            errorMessages.name = 'Verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty('' + project.code)) {
            errors.code = true;
            errorMessages.code = 'Verplicht';
            hasErrors = true;
        }

        if (
            project.isSceProject &&
            (project.baseProjectCodeRef == null || validator.isEmpty(project.baseProjectCodeRef))
        ) {
            errors.baseProjectCodeRef = true;
            errorMessages.baseProjectCodeRef = 'Verplicht';
            hasErrors = true;
        }

        if (!project.projectStatusId) {
            errors.projectStatusId = true;
            errorMessages.projectStatusId = 'Verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty('' + project.ownedById)) {
            errors.ownedById = true;
            errorMessages.ownedById = 'Verplicht';
            hasErrors = true;
        }

        if (validator.isEmpty('' + project.administrationId)) {
            errors.administrationId = true;
            errorMessages.administrationId = 'Verplicht';
            hasErrors = true;
        }

        if (this.state.projectInfoLinkOrDocument === 'link' || validator.isEmpty('' + project.documentIdProjectInfo)) {
            project.documentIdProjectInfo = null;
        }
        if (this.state.agreeTermsLinkOrDocument === 'link' || validator.isEmpty('' + project.documentIdAgreeTerms)) {
            project.documentIdAgreeTerms = null;
        }
        if (
            this.state.understandInfoLinkOrDocument === 'link' ||
            validator.isEmpty('' + project.documentIdUnderstandInfo)
        ) {
            project.documentIdUnderstandInfo = null;
        }

        if (validator.isEmpty('' + project.textTransactionCosts)) {
            errors.textTransactionCosts = true;
            errorMessages.textTransactionCosts = 'Verplicht';
            hasErrors = true;
        }
        if (validator.isEmpty('' + project.transactionCostsCodeRef)) {
            errors.transactionCostsCodeRef = true;
            errorMessages.transactionCostsCodeRef = 'Verplicht';
            hasErrors = true;
        }
        if (project.transactionCostsCodeRef === 'amount' || project.transactionCostsCodeRef === 'percentage') {
            if (
                project.transactionCostsAmountMin !== null &&
                !validator.isEmpty(project.transactionCostsAmountMin + '') &&
                project.transactionCostsAmountMin < 0
            ) {
                errors.transactionCostsAmountMin = true;
                errorMessages.transactionCostsAmountMin = 'Minimaal bedrag mag niet negatief zijn.';
                hasErrors = true;
            }
            if (
                project.transactionCostsAmountMax !== null &&
                !validator.isEmpty(project.transactionCostsAmountMax + '') &&
                project.transactionCostsAmountMax < 0
            ) {
                errors.transactionCostsAmountMax = true;
                errorMessages.transactionCostsAmountMin = 'Maximaal bedrag mag niet negatief zijn.';
                hasErrors = true;
            }
            if (
                project.transactionCostsAmountMin !== null &&
                project.transactionCostsAmountMax !== null &&
                !validator.isEmpty(project.transactionCostsAmountMin + '') &&
                !validator.isEmpty(project.transactionCostsAmountMax + '') &&
                Number(project.transactionCostsAmountMax) < Number(project.transactionCostsAmountMin)
            ) {
                errors.transactionCostsAmountMax = true;
                errorMessages.transactionCostsAmountMax = 'Maximaal bedrag mag niet kleiner zijn dan minimaal bedrag.';
                hasErrors = true;
            }
        }

        if (validator.isEmpty('' + project.baseProjectCodeRef)) {
            project.baseProjectCodeRef = null;
        }
        if (project.transactionCostsCodeRef === 'none') {
            project.transactionCostsAmountMin = null;
            project.transactionCostsAmountMax = null;
            project.transactionCostsAmount = null;
            project.transactionCostsPercentage = null;
            project.transactionCostsAmount2 = null;
            project.transactionCostsPercentage2 = null;
            project.transactionCostsAmount3 = null;
            project.transactionCostsPercentage3 = null;
        }
        if (project.transactionCostsCodeRef === 'amount-once') {
            project.transactionCostsAmountMin = null;
            project.transactionCostsAmountMax = null;
            project.transactionCostsPercentage = null;
            project.transactionCostsAmount2 = null;
            project.transactionCostsPercentage2 = null;
            project.transactionCostsAmount3 = null;
            project.transactionCostsPercentage3 = null;
            if (project.transactionCostsAmount === null || validator.isEmpty(project.transactionCostsAmount + '')) {
                errors.transactionCostsAmount = true;
                errorMessages.transactionCostsAmount = 'Vast bedrag is niet ingevuld.';
                hasErrors = true;
            } else if (Number(project.transactionCostsAmount) < 0) {
                errors.transactionCostsAmount = true;
                errorMessages.transactionCostsAmount = 'Vast bedrag mag niet negatief zijn.';
                hasErrors = true;
            }
        }
        if (project.transactionCostsCodeRef === 'amount') {
            project.transactionCostsPercentage = null;
            project.transactionCostsAmount2 = null;
            project.transactionCostsPercentage2 = null;
            project.transactionCostsAmount3 = null;
            project.transactionCostsPercentage3 = null;
            if (project.transactionCostsAmount === null || validator.isEmpty(project.transactionCostsAmount + '')) {
                errors.transactionCostsAmount = true;
                errorMessages.transactionCostsAmount = 'Bedrag per inleg is niet ingevuld.';
                hasErrors = true;
            } else if (Number(project.transactionCostsAmount) < 0) {
                errors.transactionCostsAmount = true;
                errorMessages.transactionCostsAmount = 'Bedrag per inleg mag niet negatief zijn.';
                hasErrors = true;
            }
        }
        if (project.transactionCostsCodeRef === 'percentage') {
            if (project.transactionCostsAmount === null || validator.isEmpty(project.transactionCostsAmount + '')) {
                errors.transactionCostsAmount = true;
                errorMessages.transactionCostsAmount = 'Eerste vanaf bedrag is niet ingevuld.';
                hasErrors = true;
            } else if (Number(project.transactionCostsAmount) < 0) {
                errors.transactionCostsAmount = true;
                errorMessages.transactionCostsAmount = 'Eerste vanaf bedrag mag niet negatief zijn.';
                hasErrors = true;
            }
            if (
                project.transactionCostsPercentage === null ||
                validator.isEmpty(project.transactionCostsPercentage + '')
            ) {
                errors.transactionCostsPercentage = true;
                errorMessages.transactionCostsPercentage = 'Eerste vanaf percentage is niet ingevuld.';
                hasErrors = true;
            } else if (Number(project.transactionCostsPercentage) < 0) {
                errors.transactionCostsPercentage = true;
                errorMessages.transactionCostsPercentage = 'Eerste vanaf percentage mag niet negatief zijn.';
                hasErrors = true;
            } else if (Number(project.transactionCostsPercentage) > 100) {
                errors.transactionCostsPercentage = true;
                errorMessages.transactionCostsPercentage = 'Eerste vanaf percentage mag niet hoger dan 100% zijn.';
                hasErrors = true;
            }
            if (project.transactionCostsAmount !== null && !validator.isEmpty(project.transactionCostsAmount + '')) {
                if (
                    project.transactionCostsAmount2 !== null &&
                    !validator.isEmpty(project.transactionCostsAmount2 + '') &&
                    Number(project.transactionCostsAmount2) < 0
                ) {
                    errors.transactionCostsAmount2 = true;
                    errorMessages.transactionCostsAmount2 = 'Tweede vanaf bedrag mag niet negatief zijn.';
                    hasErrors = true;
                }
                if (
                    project.transactionCostsAmount2 !== null &&
                    !validator.isEmpty(project.transactionCostsAmount2 + '') &&
                    Number(project.transactionCostsAmount2) < Number(project.transactionCostsAmount)
                ) {
                    errors.transactionCostsAmount2 = true;
                    errorMessages.transactionCostsAmount2 =
                        'Tweede vanaf bedrag mag niet kleiner zijn dan eerste vanaf bedrag.';
                    hasErrors = true;
                }
                if (
                    project.transactionCostsAmount2 !== null &&
                    !validator.isEmpty(project.transactionCostsAmount2 + '') &&
                    (project.transactionCostsPercentage2 === null ||
                        validator.isEmpty(project.transactionCostsPercentage2 + ''))
                ) {
                    errors.transactionCostsPercentage2 = true;
                    errorMessages.transactionCostsPercentage2 = 'Tweede vanaf percentage is niet ingevuld.';
                    hasErrors = true;
                } else if (Number(project.transactionCostsPercentage2) < 0) {
                    errors.transactionCostsPercentage2 = true;
                    errorMessages.transactionCostsPercentage2 = 'Tweede vanaf percentage mag niet negatief zijn.';
                    hasErrors = true;
                } else if (Number(project.transactionCostsPercentage2) > 100) {
                    errors.transactionCostsPercentage2 = true;
                    errorMessages.transactionCostsPercentage2 = 'Tweede vanaf percentage mag niet hoger dan 100% zijn.';
                    hasErrors = true;
                }
            }
            if (project.transactionCostsAmount2 !== null && !validator.isEmpty(project.transactionCostsAmount2 + '')) {
                if (
                    project.transactionCostsAmount3 !== null &&
                    !validator.isEmpty(project.transactionCostsAmount3 + '') &&
                    Number(project.transactionCostsAmount3) < 0
                ) {
                    errors.transactionCostsAmount3 = true;
                    errorMessages.transactionCostsAmount3 = 'Derde vanaf bedrag mag niet negatief zijn.';
                    hasErrors = true;
                }
                if (
                    project.transactionCostsAmount3 !== null &&
                    !validator.isEmpty(project.transactionCostsAmount3 + '') &&
                    Number(project.transactionCostsAmount3) < Number(project.transactionCostsAmount2)
                ) {
                    errors.transactionCostsAmount3 = true;
                    errorMessages.transactionCostsAmount3 =
                        'Derde vanaf bedrag mag niet kleiner zijn dan tweede vanaf bedrag.';
                    hasErrors = true;
                }
                if (
                    project.transactionCostsAmount3 !== null &&
                    !validator.isEmpty(project.transactionCostsAmount3 + '') &&
                    (project.transactionCostsPercentage3 === null ||
                        validator.isEmpty(project.transactionCostsPercentage3 + ''))
                ) {
                    errors.transactionCostsPercentage3 = true;
                    errorMessages.transactionCostsPercentage3 = 'Derde vanaf percentage is niet ingevuld.';
                    hasErrors = true;
                } else if (Number(project.transactionCostsPercentage3) < 0) {
                    errors.transactionCostsPercentage3 = true;
                    errorMessages.transactionCostsPercentage3 = 'Derde vanaf percentage mag niet negatief zijn.';
                    hasErrors = true;
                } else if (Number(project.transactionCostsPercentage3) > 100) {
                    errors.transactionCostsPercentage3 = true;
                    errorMessages.transactionCostsPercentage3 = 'Derde vanaf percentage mag niet hoger dan 100% zijn.';
                    hasErrors = true;
                }
            }
            if (project.transactionCostsAmount2 === null || validator.isEmpty(project.transactionCostsAmount2 + '')) {
                project.transactionCostsPercentage2 = null;
                project.transactionCostsAmount3 = null;
                project.transactionCostsPercentage3 = null;
            }
            if (project.transactionCostsAmount3 === null || validator.isEmpty(project.transactionCostsAmount3 + '')) {
                project.transactionCostsPercentage3 = null;
            }
        }
        if (validator.isEmpty(project.transactionCostsAmountMin + '')) {
            project.transactionCostsAmountMin = null;
        }
        if (validator.isEmpty(project.transactionCostsAmountMax + '')) {
            project.transactionCostsAmountMax = null;
        }
        if (validator.isEmpty(project.transactionCostsAmount + '')) {
            project.transactionCostsAmount = null;
        }
        if (validator.isEmpty(project.transactionCostsPercentage + '')) {
            project.transactionCostsPercentage = null;
        }
        if (validator.isEmpty(project.transactionCostsAmount2 + '')) {
            project.transactionCostsAmount2 = null;
        }
        if (validator.isEmpty(project.transactionCostsPercentage2 + '')) {
            project.transactionCostsPercentage2 = null;
        }
        if (validator.isEmpty(project.transactionCostsAmount3 + '')) {
            project.transactionCostsAmount3 = null;
        }
        if (validator.isEmpty(project.transactionCostsPercentage3 + '')) {
            project.transactionCostsPercentage3 = null;
        }

        if (validator.isEmpty('' + project.textRegisterPageHeader)) {
            errors.textRegisterPageHeader = true;
            errorMessages.textRegisterPageHeader = 'Verplicht';
            hasErrors = true;
        }
        if (validator.isEmpty('' + project.textRegisterCurrentBookWorth)) {
            errors.textRegisterCurrentBookWorth = true;
            errorMessages.textRegisterCurrentBookWorth = 'Verplicht';
            hasErrors = true;
        }
        if (validator.isEmpty('' + project.textRegisterParticipationSingular)) {
            errors.textRegisterParticipationSingular = true;
            errorMessages.textRegisterParticipationSingular = 'Verplicht';
            hasErrors = true;
        }
        if (validator.isEmpty('' + project.textRegisterParticipationPlural)) {
            errors.textRegisterParticipationPlural = true;
            errorMessages.textRegisterParticipationPlural = 'Verplicht';
            hasErrors = true;
        }

        if (project.showQuestionAboutMembership) {
            if (!project.questionAboutMembershipGroupId) {
                errors.questionAboutMembershipGroupId = true;
                errorMessages.questionAboutMembershipGroupId = 'Verplicht';
                hasErrors = true;
            }
            if (validator.isEmpty('' + project.textIsMember)) {
                errors.textIsMember = true;
                errorMessages.textIsMember = 'Verplicht';
                hasErrors = true;
            }
            if (validator.isEmpty('' + project.textIsNoMember)) {
                errors.textIsNoMember = true;
                errorMessages.textIsNoMember = 'Verplicht';
                hasErrors = true;
            }
            if (validator.isEmpty('' + project.textBecomeMember)) {
                errors.textBecomeMember = true;
                errorMessages.textBecomeMember = 'Verplicht';
                hasErrors = true;
            }
            if (!project.memberGroupId) {
                errors.memberGroupId = true;
                errorMessages.memberGroupId = 'Verplicht';
                hasErrors = true;
            }
            if (validator.isEmpty('' + project.textBecomeNoMember)) {
                errors.textBecomeNoMember = true;
                errorMessages.textBecomeNoMember = 'Verplicht';
                hasErrors = true;
            }
            if (!project.noMemberGroupId) {
                errors.noMemberGroupId = true;
                errorMessages.noMemberGroupId = 'Verplicht';
                hasErrors = true;
            }
        }
        if (validator.isEmpty('' + project.textAgreeTerms)) {
            errors.textAgreeTerms = true;
            errorMessages.textAgreeTerms = 'Verplicht';
            hasErrors = true;
        }
        if (validator.isEmpty('' + project.textLinkAgreeTerms)) {
            errors.textLinkAgreeTerms = true;
            errorMessages.textLinkAgreeTerms = 'Verplicht';
            hasErrors = true;
        }
        if (validator.isEmpty('' + project.textLinkNameAgreeTerms)) {
            errors.textLinkNameAgreeTerms = true;
            errorMessages.textLinkNameAgreeTerms = 'Verplicht';
            hasErrors = true;
        }
        if (validator.isEmpty('' + project.textLinkUnderstandInfo)) {
            errors.textLinkUnderstandInfo = true;
            errorMessages.textLinkUnderstandInfo = 'Verplicht';
            hasErrors = true;
        }
        if (validator.isEmpty('' + project.textLinkNameUnderstandInfo)) {
            errors.textLinkNameUnderstandInfo = true;
            errorMessages.textLinkNameUnderstandInfo = 'Verplicht';
            hasErrors = true;
        }
        if (validator.isEmpty('' + project.textAcceptAgreement)) {
            errors.textAcceptAgreement = true;
            errorMessages.textAcceptAgreement = 'Verplicht';
            hasErrors = true;
        }
        if (validator.isEmpty('' + project.textAcceptAgreementQuestion)) {
            errors.textAcceptAgreementQuestion = true;
            errorMessages.textAcceptAgreementQuestion = 'Verplicht';
            hasErrors = true;
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
        //         errorMessages.postalCode = 'Ongeldige postcode voor dit land';
        //         errorMessages.countryId = 'Ongeldige postcode voor dit land';
        //         hasErrors = true;
        //     }
        // }
        if (!validator.isEmpty('' + project.postalCode) && !validator.isPostalCode(project.postalCode, 'any')) {
            errors.postalCode = true;
            errorMessages.postalCode = 'Ongeldige postcode';
            hasErrors = true;
        }

        if (project.isMembershipRequired && validator.isEmpty(project.contactGroupIds)) {
            errors.contactGroupIds = true;
            errorMessages.contactGroupIds = 'Verplicht';
            hasErrors = true;
        }

        if (
            !validator.isEmpty(project.dateEntry + '') &&
            !validator.isEmpty(this.state.disableBeforeEntryDate) &&
            project.dateEntry < this.state.disableBeforeEntryDate
        ) {
            errors.dateEntry = true;
            errorMessages.dateEntry =
                'Ongeldige ingangsdatum, mag niet liggen voor ' +
                moment(this.state.disableBeforeEntryDate).format('DD-MM-YYYY');
            hasErrors = true;
        }

        // If isSceProject is false, init related fields.
        if (!project.isSceProject) {
            project.baseProjectCodeRef = null;
            project.checkDoubleAddresses = false;
            project.addressNumberSeries = '';
            project.hideWhenNotMatchingPostalCheck = true;
            if (project.projectType.codeRef !== 'postalcode_link_capital') {
                project.checkPostalcodeLink = false;
                project.postalcodeLink = '';
            }
        }

        // todo WM: zelfde controle postalcodeLink / addressNumberSeries zit nu ook in ProjectFormEditGeneral
        if (
            (project.checkPostalcodeLink || project.projectType.codeRef === 'postalcode_link_capital') &&
            (!project.postalcodeLink || validator.isEmpty('' + project.postalcodeLink))
        ) {
            errors.postalcodeLink = true;
            errorMessages.postalcodeLink = 'Verplicht als controle postcoderoosgebied aan staat.';
            hasErrors = true;
        } else if (project.postalcodeLink) {
            let regExpPostalcodeLink = new RegExp('^[0-9a-zA-Z,]*$');
            if (!regExpPostalcodeLink.exec(project.postalcodeLink)) {
                errors.postalcodeLink = true;
                errorMessages.postalcodeLink = 'Ongeldige invoer, klik (i) voor uitleg.';
                hasErrors = true;
            }
        }
        if (
            project.postalcodeLink &&
            (project.postalcodeLink.replace(/\D/g, '').length !== 4 ||
                project.postalcodeLink.replace(/[0-9]/g, '').trim().length !== 2)
        ) {
            project.addressNumberSeries = '';
        }
        if (project.addressNumberSeries) {
            let regExpAddressNumberSeries = new RegExp('^[0-9a-zA-Z,:-]*$');
            if (!regExpAddressNumberSeries.exec(project.addressNumberSeries)) {
                errors.addressNumberSeries = true;
                errorMessages.addressNumberSeries = 'Ongeldige invoer, klik (i) voor uitleg.';
                hasErrors = true;
            }
        }

        // If loan then loanTypeId required.
        if (project.projectType.codeRef === 'loan') {
            if (project.loanTypeId === null || validator.isEmpty('' + project.loanTypeId)) {
                errors.loanTypeId = true;
                errorMessages.loanTypeId = 'Type lening is verplicht bij Type project Lening.';
                hasErrors = true;
            }
        }

        // If isMemberShipRequired is false, set contactGroupIds to empty string, visibleForAllContacts to false
        if (!project.isMembershipRequired) {
            project.contactGroupIds = '';
            project.visibleForAllContacts = false;
        }

        // If visibleForAllContacts is false, set textInfoProjectOnlyMembers to default
        if (!project.visibleForAllContacts) {
            project.textInfoProjectOnlyMembers = defaultTextInfoProjectOnlyMembers;
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

        if (
            project.allowIncreaseParticipationsInPortal &&
            (project.documentTemplateIncreaseParticipationsId === null ||
                validator.isEmpty('' + project.documentTemplateIncreaseParticipationsId))
        ) {
            errors.documentTemplateIncreaseParticipationsId = true;
            errorMessages.documentTemplateIncreaseParticipationsId = 'Verplicht';
            hasErrors = true;
        }
        if (
            project.allowIncreaseParticipationsInPortal &&
            (project.emailTemplateIncreaseParticipationsId === null ||
                validator.isEmpty('' + project.emailTemplateIncreaseParticipationsId))
        ) {
            errors.emailTemplateIncreaseParticipationsId = true;
            errorMessages.emailTemplateIncreaseParticipationsId = 'Verplicht';
            hasErrors = true;
        }
        // If allowIncreaseParticipationsInPortal is false, set documentTemplateIncreaseParticipationsId and emailTemplateIncreaseParticipationsId to null
        if (!project.allowIncreaseParticipationsInPortal) {
            project.documentTemplateIncreaseParticipationsId = null;
            project.emailTemplateIncreaseParticipationsId = null;
        }

        this.setState({ ...this.state, errors: errors, errorMessages: errorMessages });

        if (!hasErrors) {
            this.setState({ isSaving: true });
            ProjectDetailsAPI.updateProject(project.id, project).then(() => {
                this.setState({ isSaving: false });
                this.props.fetchProject(project.id);
                this.props.switchToView();
            });
        } else if (!this.props.showCustomerPortalSettings) {
            this.props.toggleCustomerPortalSettings();
        }
    };

    handleContactGroupIds = selectedOption => {
        const contactGroupIds = selectedOption ? selectedOption.map(item => item.id).join(',') : '';
        this.setState({
            ...this.state,
            project: {
                ...this.state.project,
                contactGroupIds: contactGroupIds,
                contactGroupIdsSelected: selectedOption,
            },
        });
    };

    handleChangeProjectInfoLinkOrDocument = value => {
        this.setState({
            ...this.state,
            projectInfoLinkOrDocument: value,
        });
    };
    handleChangeAgreeTermsLinkOrDocument = value => {
        this.setState({
            ...this.state,
            agreeTermsLinkOrDocument: value,
        });
    };
    handleChangeUnderstandInfoLinkOrDocument = value => {
        this.setState({
            ...this.state,
            understandInfoLinkOrDocument: value,
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
            isSceProject,
            baseProjectCodeRef,
            checkDoubleAddresses,
            hideWhenNotMatchingPostalCheck,
            checkPostalcodeLink,
            disableChangeContactNameOnPortal,
            address,
            postalCode,
            city,
            dateStartRegistrations,
            dateEndRegistrations,
            ownedById,
            administrationId,
            usesMollie,
            dateStart,
            dateEnd,
            dateEntry,
            dateProduction,
            dateInterestBearingKwh,
            allowChangeDateInterestBearingKwh,
            dateInterestBearing,
            allowChangeDateInterestBearing,
            dateInterestBearingRedemption,
            allowChangeDateInterestBearingRedemption,
            kwhStartHighNextRevenue,
            allowChangeKwhStartHighNextRevenue,
            kwhStartLowNextRevenue,
            allowChangeKwhStartLowNextRevenue,
            isMembershipRequired,
            contactGroupIds,
            contactGroupIdsSelected,
            visibleForAllContacts,
            textInfoProjectOnlyMembers,
            loanTypeId,
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
            addressNumberSeries,
            documentTemplateAgreementId,
            emailTemplateAgreementId,
            allowIncreaseParticipationsInPortal,
            documentTemplateIncreaseParticipationsId,
            emailTemplateIncreaseParticipationsId,
            linkAgreeTerms,
            linkUnderstandInfo,
            linkProjectInfo,
            documentIdAgreeTerms,
            documentIdUnderstandInfo,
            documentIdProjectInfo,
            showQuestionAboutMembership,
            useTransactionCostsWithMembership,
            questionAboutMembershipGroupId,
            textRegisterPageHeader,
            textRegisterCurrentBookWorth,
            textRegisterParticipationSingular,
            textRegisterParticipationPlural,
            textIsMember,
            textIsNoMember,
            textBecomeMember,
            memberGroupId,
            textBecomeNoMember,
            noMemberGroupId,
            textAgreeTerms,
            textLinkAgreeTerms,
            textLinkNameAgreeTerms,
            textLinkUnderstandInfo,
            textLinkNameUnderstandInfo,
            textAcceptAgreement,
            textAcceptAgreementQuestion,
            textRegistrationFinished,
            textTransactionCosts,
            transactionCostsCodeRef,
            transactionCostsAmountMin,
            transactionCostsAmountMax,
            transactionCostsAmount,
            transactionCostsPercentage,
            transactionCostsAmount2,
            transactionCostsPercentage2,
            transactionCostsAmount3,
            transactionCostsPercentage3,
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
            hasConfirmedLoanRedemptionRevenue,
            valueCourses,
            amountOfParticipants,
            relatedDocumentsOnPortal,
        } = this.props.project;

        const requiredParticipants = RequiredParticipantsHelper(baseProjectCodeRef, powerKwAvailable);

        const numberOfParticipantsStillNeeded = requiredParticipants - amountOfParticipants;
        let useSceProject = false;
        if (projectType && projectType.codeRef !== 'postalcode_link_capital') {
            useSceProject = true;
        }

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <ProjectFormEditGeneral
                    showCustomerPortalSettings={this.props.showCustomerPortalSettings}
                    toggleCustomerPortalSettings={this.props.toggleCustomerPortalSettings}
                    name={name}
                    code={code}
                    description={description}
                    projectStatusId={projectStatusId}
                    projectType={projectType}
                    useSceProject={useSceProject}
                    isSceProject={isSceProject}
                    baseProjectCodeRef={baseProjectCodeRef}
                    powerKwAvailable={powerKwAvailable}
                    checkDoubleAddresses={checkDoubleAddresses}
                    postalcodeLink={postalcodeLink}
                    addressNumberSeries={addressNumberSeries}
                    hideWhenNotMatchingPostalCheck={hideWhenNotMatchingPostalCheck}
                    checkPostalcodeLink={checkPostalcodeLink}
                    disableChangeContactNameOnPortal={disableChangeContactNameOnPortal}
                    requiredParticipants={requiredParticipants}
                    numberOfParticipantsStillNeeded={numberOfParticipantsStillNeeded}
                    address={address}
                    postalCode={postalCode}
                    city={city}
                    dateStartRegistrations={dateStartRegistrations}
                    dateEndRegistrations={dateEndRegistrations}
                    ownedById={ownedById}
                    administrationId={administrationId}
                    administration={administration}
                    usesMollie={usesMollie}
                    hasPaymentInvoices={hasPaymentInvoices}
                    dateStart={dateStart}
                    dateEnd={dateEnd}
                    dateEntry={dateEntry}
                    dateProduction={dateProduction}
                    dateInterestBearingKwh={dateInterestBearingKwh}
                    allowChangeDateInterestBearingKwh={allowChangeDateInterestBearingKwh}
                    dateInterestBearing={dateInterestBearing}
                    allowChangeDateInterestBearing={allowChangeDateInterestBearing}
                    dateInterestBearingRedemption={dateInterestBearingRedemption}
                    allowChangeDateInterestBearingRedemption={allowChangeDateInterestBearingRedemption}
                    kwhStartHighNextRevenue={kwhStartHighNextRevenue}
                    allowChangeKwhStartHighNextRevenue={allowChangeKwhStartHighNextRevenue}
                    kwhStartLowNextRevenue={kwhStartLowNextRevenue}
                    allowChangeKwhStartLowNextRevenue={allowChangeKwhStartLowNextRevenue}
                    contactGroupIds={contactGroupIds}
                    contactGroupIdsSelected={contactGroupIdsSelected}
                    isMembershipRequired={isMembershipRequired}
                    visibleForAllContacts={visibleForAllContacts}
                    textInfoProjectOnlyMembers={textInfoProjectOnlyMembers}
                    handleInputChange={this.handleInputChange}
                    handleInputChangeAdministration={this.handleInputChangeAdministration}
                    handleInputChangeDate={this.handleInputChangeDate}
                    handleContactGroupIds={this.handleContactGroupIds}
                    handleReactSelectChange={this.handleReactSelectChange}
                    errors={this.state.errors}
                    errorMessages={this.state.errorMessages}
                    contactGroups={this.state.contactGroups}
                    staticContactGroups={this.state.staticContactGroups}
                    amountOfParticipants={amountOfParticipants}
                    documentTemplates={this.state.documentTemplates}
                    emailTemplates={this.state.emailTemplates}
                    documentTemplateAgreementId={documentTemplateAgreementId}
                    emailTemplateAgreementId={emailTemplateAgreementId}
                    allowIncreaseParticipationsInPortal={allowIncreaseParticipationsInPortal}
                    documentTemplateIncreaseParticipationsId={documentTemplateIncreaseParticipationsId}
                    emailTemplateIncreaseParticipationsId={emailTemplateIncreaseParticipationsId}
                    linkAgreeTerms={linkAgreeTerms}
                    linkUnderstandInfo={linkUnderstandInfo}
                    linkProjectInfo={linkProjectInfo}
                    documentIdAgreeTerms={documentIdAgreeTerms}
                    agreeTermsLinkOrDocument={this.state.agreeTermsLinkOrDocument}
                    handleChangeAgreeTermsLinkOrDocument={this.handleChangeAgreeTermsLinkOrDocument}
                    documentIdUnderstandInfo={documentIdUnderstandInfo}
                    understandInfoLinkOrDocument={this.state.understandInfoLinkOrDocument}
                    handleChangeUnderstandInfoLinkOrDocument={this.handleChangeUnderstandInfoLinkOrDocument}
                    documentIdProjectInfo={documentIdProjectInfo}
                    projectInfoLinkOrDocument={this.state.projectInfoLinkOrDocument}
                    handleChangeProjectInfoLinkOrDocument={this.handleChangeProjectInfoLinkOrDocument}
                    relatedDocumentsOnPortal={relatedDocumentsOnPortal}
                    showQuestionAboutMembership={showQuestionAboutMembership}
                    useTransactionCostsWithMembership={useTransactionCostsWithMembership}
                    questionAboutMembershipGroupId={questionAboutMembershipGroupId}
                    textRegisterPageHeader={textRegisterPageHeader}
                    textRegisterCurrentBookWorth={textRegisterCurrentBookWorth}
                    textRegisterParticipationSingular={textRegisterParticipationSingular}
                    textRegisterParticipationPlural={textRegisterParticipationPlural}
                    textIsMember={textIsMember}
                    textIsNoMember={textIsNoMember}
                    textBecomeMember={textBecomeMember}
                    memberGroupId={memberGroupId}
                    textBecomeNoMember={textBecomeNoMember}
                    noMemberGroupId={noMemberGroupId}
                    disableBeforeEntryDate={this.state.disableBeforeEntryDate}
                    hasLastYearFinancialOverviewDefinitive={this.state.hasLastYearFinancialOverviewDefinitive}
                    textAgreeTerms={textAgreeTerms}
                    textLinkAgreeTerms={textLinkAgreeTerms}
                    textLinkNameAgreeTerms={textLinkNameAgreeTerms}
                    textLinkUnderstandInfo={textLinkUnderstandInfo}
                    textLinkNameUnderstandInfo={textLinkNameUnderstandInfo}
                    textAcceptAgreement={textAcceptAgreement}
                    textAcceptAgreementQuestion={textAcceptAgreementQuestion}
                    textRegistrationFinished={textRegistrationFinished}
                    textTransactionCosts={textTransactionCosts}
                    transactionCostsCodeRef={transactionCostsCodeRef}
                    transactionCostsAmountMin={transactionCostsAmountMin}
                    transactionCostsAmountMax={transactionCostsAmountMax}
                    transactionCostsAmount={transactionCostsAmount}
                    transactionCostsPercentage={transactionCostsPercentage}
                    transactionCostsAmount2={transactionCostsAmount2}
                    transactionCostsPercentage2={transactionCostsPercentage2}
                    transactionCostsAmount3={transactionCostsAmount3}
                    transactionCostsPercentage3={transactionCostsPercentage3}
                />

                {projectType && projectType.codeRef === 'loan' ? (
                    <ProjectFormDefaultLoan
                        loanTypeId={loanTypeId}
                        projectLoanTypes={this.props.projectLoanTypes}
                        hasConfirmedLoanRedemptionRevenue={hasConfirmedLoanRedemptionRevenue}
                        amountOfLoanNeeded={amountOfLoanNeeded}
                        minAmountLoan={minAmountLoan}
                        maxAmountLoan={maxAmountLoan}
                        amountDefinitive={amountDefinitive}
                        amountGranted={amountGranted}
                        amountOptioned={amountOptioned}
                        amountInteressed={amountInteressed}
                        handleInputChange={this.handleInputChange}
                        errors={this.state.errors}
                        errorMessages={this.state.errorMessages}
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
                        errors={this.state.errors}
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
        administrations: state.meDetails.administrations,
        projectLoanTypes: state.systemData.projectLoanTypes,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFormEdit);
