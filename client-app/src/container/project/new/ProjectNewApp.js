import React, { Component } from 'react';
import validator from 'validator';
import { hashHistory } from 'react-router';

import ProjectNewToolbar from './ProjectNewToolbar';

import ProjectDetailsAPI from '../../../api/project/ProjectDetailsAPI';
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';
import { connect } from 'react-redux';
import ContactGroupAPI from '../../../api/contact-group/ContactGroupAPI';
import PanelFooter from '../../../components/panel/PanelFooter';
import ButtonText from '../../../components/button/ButtonText';
import ProjectFormNewGeneral from './form/ProjectNewGeneral';
import ProjectFormDefaultPostalcodeLinkCapital from '../form-default/ProjectFormDefaultPostalcodeLinkCapital';
import ProjectFormDefaultCapital from '../form-default/ProjectFormDefaultCapital';
import ProjectFormDefaultObligation from '../form-default/ProjectFormDefaultObligation';
import ProjectFormDefaultLoan from '../form-default/ProjectFormDefaultLoan';
import moment from 'moment/moment';
import { isEmpty } from 'lodash';
import RequiredParticipantsHelper from '../../../helpers/RequiredParticipantsHelper';

const defaultTextInfoProjectOnlyMembers =
    'Om in te schrijven voor dit project moet u eerst lid worden van onze coöperatie.';

class ProjectNewApp extends Component {
    constructor(props) {
        super(props);

        const defaultTextRegisterPageHeader = 'Inschrijven project';
        const defaultTextRegisterCurrentBookWorth = 'Huidige boekwaarde';
        const defaultTextRegisterParticipationSingular = 'participatie';
        const defaultTextRegisterParticipationPlural = 'participaties';

        const defaultTextTransactionCosts = 'Transactiekosten';
        const defaultTextAgreeTerms =
            'Om deel te kunnen nemen dien je akkoord te gaan met de voorwaarden en dien je te bevestigen dat je de project informatie hebt gelezen en begrepen.';
        const defaultTextLinkAgreeTerms = 'Ik ga akkoord met de {voorwaarden_link}';
        const defaultTextLinkNameAgreeTerms = 'voorwaarden';
        const defaultTextLinkUnderstandInfo =
            'Ik heb de {project_informatie_link} (inclusief de daarin beschreven risico’s) behorende bij het project gelezen en begrepen';
        const defaultTextLinkNameUnderstandInfo = 'project informatie';
        const defaultTextAcceptAgreement =
            'Wanneer je akkoord gaat met het inschrijfformulier en in de inschrijving bevestigd, is je inschrijving definitief';
        const defaultTextAcceptAgreementQuestion = 'Ik ben akkoord met deze inschrijving';
        const defaultTextRegistrationFinished =
            'Bedankt voor je inschrijving. Per e-mail sturen wij een bevestiging van je inschrijving met informatie over de vervolgstappen. ' +
            'Het kan zijn dat de mail door een spamfilter is geblokkeerd. Spamfilters van bijvoorbeeld Gmail en Hotmail staan erg "scherp". Kijk even bij de Spam/Reclame of je onze mail daar terug vindt. ' +
            'Onder de menuknop “Huidige deelnames” vind je je inschrijving terug. ' +
            'Wil je je inschrijving aanpassen? Neem dan contact met ons op.';

        this.state = {
            contactGroups: [],
            showPostalCodeLinkFields: false,
            confirmSubmit: false,
            disableBeforeEntryDate: '',

            project: {
                name: '',
                code: '',
                description: '',
                ownedById: '',
                projectStatusId: '',
                dateStart: '',
                dateEnd: '',
                dateEntry: '',
                dateProduction: '',
                dateStartRegistrations: '',
                dateEndRegistrations: '',
                projectTypeId: '',
                isSceProject: false,
                baseProjectCodeRef: '',
                checkDoubleAddresses: false,
                administrationId: '',
                usesMollie: false,
                postalCode: '',
                address: '',
                city: '',
                ean: '',
                eanManager: '',
                warrantyOrigin: '',
                eanSupply: '',
                participationWorth: '',
                powerKwAvailable: '',
                maxParticipations: '',
                taxReferral: '',
                totalParticipations: '',
                minParticipations: '',
                isMembershipRequired: false,
                visibleForAllContacts: false,
                textInfoProjectOnlyMembers: defaultTextInfoProjectOnlyMembers,
                isParticipationTransferable: false,
                postalcodeLink: '',
                addressNumberSeries: '',
                checkPostalcodeLink: false,
                hideWhenNotMatchingPostalCheck: true,
                contactGroupIds: '',
                contactGroupIdsSelected: [],
                loanTypeId: '',
                amountOfLoanNeeded: null,
                minAmountLoan: null,
                maxAmountLoan: null,
                amountDefinitive: null,
                amountGranted: null,
                amountOptioned: null,
                amountInterresed: null,
                participationsDefinitive: null,
                participationsGranted: null,
                participationsOptioned: null,
                participationsInterresed: null,
                textRegisterPageHeader: defaultTextRegisterPageHeader,
                textRegisterCurrentBookWorth: defaultTextRegisterCurrentBookWorth,
                textRegisterParticipationSingular: defaultTextRegisterParticipationSingular,
                textRegisterParticipationPlural: defaultTextRegisterParticipationPlural,
                textTransactionCosts: defaultTextTransactionCosts,
                textAgreeTerms: defaultTextAgreeTerms,
                textLinkAgreeTerms: defaultTextLinkAgreeTerms,
                textLinkNameAgreeTerms: defaultTextLinkNameAgreeTerms,
                textLinkUnderstandInfo: defaultTextLinkUnderstandInfo,
                textLinkNameUnderstandInfo: defaultTextLinkNameUnderstandInfo,
                textAcceptAgreement: defaultTextAcceptAgreement,
                textAcceptAgreementQuestion: defaultTextAcceptAgreementQuestion,
                textRegistrationFinished: defaultTextRegistrationFinished,
            },
            errors: {
                name: false,
                code: false,
                projectTypeId: false,
                projectStatusId: false,
                baseProjectCodeRef: false,
                postalCodeLink: false,
                postalcodeLink: false,
                addressNumberSeries: false,
                description: false,
                postalCode: false,
                // countryId: false,
                ownedById: false,
                administrationId: false,
                contactGroupIds: false,
                dateEntry: false,
                loanTypeId: false,
            },
            errorMessages: {
                name: '',
                code: '',
                projectTypeId: '',
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
                loanTypeId: '',
            },
            loading: false,
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
        this.handleInputChangeAdministration = this.handleInputChangeAdministration.bind(this);
        this.toggleShowPostalCodeLinkFields = this.toggleShowPostalCodeLinkFields.bind(this);
        this.handleContactGroupIds = this.handleContactGroupIds.bind(this);
    }

    componentDidMount() {
        ContactGroupAPI.peekContactGroups().then(payload => {
            this.setState({ contactGroups: payload });
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

    handleInputChangeProjectType = event => {
        const target = event.target;
        const projectTypeId = target.value;

        let projectType;
        projectType = this.props.projectTypesActive.find(projectType => projectType.id == projectTypeId);

        let isSceProject = this.state.project.isSceProject;
        let checkPostalcodeLink = this.state.project.checkPostalcodeLink;
        if (projectType && projectType.codeRef === 'postalcode_link_capital') {
            isSceProject = false;
            checkPostalcodeLink = true;
        }

        this.setState({
            ...this.state,
            project: {
                ...this.state.project,
                isSceProject: isSceProject,
                checkPostalcodeLink: checkPostalcodeLink,
                projectTypeId: projectTypeId,
            },
        });
    };

    handleInputChangeAdministration = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let administration;

        administration = this.props.administrations.filter(administration => administration.id == value);
        administration = administration[0];
        let disableBeforeEntryDate = administration.lastYearFinancialOverviewDefinitive
            ? moment(moment().year(administration.lastYearFinancialOverviewDefinitive + 1)).format('YYYY-01-01')
            : '';
        this.setState({
            ...this.state,
            disableBeforeEntryDate: disableBeforeEntryDate,
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

    toggleConfirmSubmit = () => {
        this.setState(prevState => ({ confirmSubmit: !prevState.confirmSubmit }));
    };

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

        if (!project.projectTypeId) {
            errors.projectTypeId = true;
            errorMessages.projectTypeId = 'Verplicht';
            hasErrors = true;
        }
        let projectType;
        projectType = this.props.projectTypesActive.find(projectType => projectType.id == project.projectTypeId);

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
            if (projectType && projectType.codeRef !== 'postalcode_link_capital') {
                project.checkPostalcodeLink = false;
                project.postalcodeLink = '';
            }
        }

        // todo WM: zelfde controle postalcodeLink / addressNumberSeries zit nu ook in ProjectNewGeneral
        if (projectType) {
            if (
                (project.checkPostalcodeLink || projectType.codeRef === 'postalcode_link_capital') &&
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
        if (projectType && projectType.codeRef === 'loan') {
            if (project.loanTypeId === null || validator.isEmpty('' + project.loanTypeId)) {
                errors.loanTypeId = true;
                errorMessages.loanTypeId = 'Type lening is verplicht bij Type project Lening.';
                hasErrors = true;
            }
        }

        // If isMemberShipRequired is false, set contactGroupIds to empty string
        if (!project.isMembershipRequired) {
            project.contactGroupIds = '';
            project.contactGroupIdsSelected = [];
            project.visibleForAllContacts = false;
        }

        // If visibleForAllContacts is false, set textInfoProjectOnlyMembers to default
        if (!project.visibleForAllContacts) {
            project.textInfoProjectOnlyMembers = defaultTextInfoProjectOnlyMembers;
        }

        if (validator.isEmpty('' + project.baseProjectCodeRef)) {
            project.baseProjectCodeRef = null;
        }

        this.setState({ ...this.state, errors: errors, errorMessages: errorMessages });

        if (!hasErrors) {
            this.setState({ loading: true });
            ProjectDetailsAPI.storeProject(project)
                .then(payload => {
                    this.setState({ loading: false });
                    hashHistory.push(`/project/${payload.data.data.id}`);
                })
                .catch(error => {
                    console.log(error);
                    alert('Er is iets misgegaan bij opslaan. Herlaad de pagina en probeer het nogmaals.');
                    this.setState({ loading: false });
                });
        }
    };

    toggleShowPostalCodeLinkFields() {
        this.setState({ showPostalCodeLinkFields: !this.state.showPostalCodeLinkFields });
    }

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

    render() {
        const {
            name,
            code,
            description,
            ownedById,
            projectStatusId,
            dateStart,
            dateEnd,
            dateEntry,
            dateProduction,
            dateStartRegistrations,
            dateEndRegistrations,
            projectTypeId,
            isSceProject,
            baseProjectCodeRef,
            checkDoubleAddresses,
            postalCode,
            address,
            city,
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
            isMembershipRequired,
            visibleForAllContacts,
            textInfoProjectOnlyMembers,
            isParticipationTransferable,
            administrationId,
            usesMollie,
            postalcodeLink,
            addressNumberSeries,
            checkPostalcodeLink,
            hideWhenNotMatchingPostalCheck,
            contactGroupIds,
            contactGroupIdsSelected,
            loanTypeId,
            amountOfLoanNeeded,
            minAmountLoan,
            maxAmountLoan,
            amountDefinitive,
            amountGranted,
            amountOptioned,
            amountInteressed,
            participationsDefinitive,
            participationsGranted,
            participationsOptioned,
            participationsInteressed,
        } = this.state.project;

        const projectType = this.props.projectTypesActive.find(projectType => projectType.id == projectTypeId);
        const projectTypeCodeRef = projectType ? projectType.codeRef : null;

        const requiredParticipants = RequiredParticipantsHelper(baseProjectCodeRef, powerKwAvailable);

        const numberOfParticipantsStillNeeded = requiredParticipants;
        let useSceProject = false;
        if (projectType && projectType.codeRef !== 'postalcode_link_capital') {
            useSceProject = true;
        }

        return (
            <div className="row">
                <div className="col-md-9">
                    <div className="col-md-12">
                        <ProjectNewToolbar />
                    </div>

                    <div className="col-md-12">
                        <Panel>
                            <PanelBody>
                                <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                                    <ProjectFormNewGeneral
                                        name={name}
                                        code={code}
                                        description={description}
                                        projectStatusId={projectStatusId}
                                        projectTypeId={projectTypeId}
                                        projectTypeCodeRef={projectTypeCodeRef}
                                        useSceProject={useSceProject}
                                        isSceProject={isSceProject}
                                        postalcodeLink={postalcodeLink}
                                        addressNumberSeries={addressNumberSeries}
                                        hideWhenNotMatchingPostalCheck={hideWhenNotMatchingPostalCheck}
                                        checkPostalcodeLink={checkPostalcodeLink}
                                        baseProjectCodeRef={baseProjectCodeRef}
                                        powerKwAvailable={powerKwAvailable}
                                        checkDoubleAddresses={checkDoubleAddresses}
                                        requiredParticipants={requiredParticipants}
                                        numberOfParticipantsStillNeeded={numberOfParticipantsStillNeeded}
                                        address={address}
                                        postalCode={postalCode}
                                        city={city}
                                        dateStartRegistrations={dateStartRegistrations}
                                        dateEndRegistrations={dateEndRegistrations}
                                        ownedById={ownedById}
                                        administrationId={administrationId}
                                        usesMollie={usesMollie}
                                        dateStart={dateStart}
                                        dateEnd={dateEnd}
                                        dateEntry={dateEntry}
                                        dateProduction={dateProduction}
                                        contactGroupIds={contactGroupIds}
                                        contactGroupIdsSelected={contactGroupIdsSelected}
                                        isMembershipRequired={isMembershipRequired}
                                        visibleForAllContacts={visibleForAllContacts}
                                        textInfoProjectOnlyMembers={textInfoProjectOnlyMembers}
                                        handleInputChange={this.handleInputChange}
                                        handleInputChangeProjectType={this.handleInputChangeProjectType}
                                        handleInputChangeAdministration={this.handleInputChangeAdministration}
                                        handleInputChangeDate={this.handleInputChangeDate}
                                        handleContactGroupIds={this.handleContactGroupIds}
                                        errors={this.state.errors}
                                        errorMessages={this.state.errorMessages}
                                        contactGroups={this.state.contactGroups}
                                        disableBeforeEntryDate={this.state.disableBeforeEntryDate}
                                    />

                                    {projectType && projectType.codeRef === 'loan' ? (
                                        <ProjectFormDefaultLoan
                                            loanTypeId={loanTypeId}
                                            projectLoanTypes={this.props.projectLoanTypes}
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
                                        {this.state.confirmSubmit ? (
                                            <div className="pull-right">
                                                <span style={{ marginRight: '10px' }}>
                                                    Het type project kan maar één keer worden ingesteld. Weet u zeker
                                                    dat u dit type project wilt aanmaken?
                                                </span>
                                                <div className="btn-group" role="group">
                                                    <ButtonText
                                                        buttonText={'Ja'}
                                                        onClickAction={this.handleSubmit}
                                                        type={'submit'}
                                                        value={'Submit'}
                                                        loading={this.state.loading}
                                                        loadText={'Project wordt aangemaakt'}
                                                    />
                                                    <ButtonText
                                                        buttonText={'Nee'}
                                                        buttonClassName={'btn-default'}
                                                        onClickAction={this.toggleConfirmSubmit}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="pull-right btn-group" role="group">
                                                <ButtonText
                                                    buttonText={'Opslaan'}
                                                    onClickAction={this.toggleConfirmSubmit}
                                                />
                                            </div>
                                        )}
                                    </PanelFooter>
                                </form>
                            </PanelBody>
                        </Panel>
                    </div>
                </div>
                <div className="col-md-3" />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        administrations: state.meDetails.administrations,
        projectTypesActive: state.systemData.projectTypesActive,
        projectLoanTypes: state.systemData.projectLoanTypes,
    };
};

export default connect(mapStateToProps)(ProjectNewApp);
