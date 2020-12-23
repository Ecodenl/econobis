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

class ProjectNewApp extends Component {
    constructor(props) {
        super(props);

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
                administrationId: '',
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
                isParticipationTransferable: false,
                postalcodeLink: '',
                contactGroupIds: '',
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
            },
            errors: {
                name: false,
                code: false,
                projectTypeId: false,
                projectStatusId: false,
                ownedById: false,
                postalCode: false,
                // countryId: false,
                contactGroupIds: false,
                dateEntry: false,
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
        let hasErrors = false;

        if (validator.isEmpty(project.name)) {
            errors.name = true;
            hasErrors = true;
        }

        if (validator.isEmpty('' + project.code)) {
            errors.code = true;
            hasErrors = true;
        }

        if (!project.projectTypeId) {
            errors.projectTypeId = true;
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

        if (
            !validator.isEmpty(project.dateEntry + '') &&
            !validator.isEmpty(this.state.disableBeforeEntryDate) &&
            project.dateEntry < this.state.disableBeforeEntryDate
        ) {
            errors.dateEntry = true;
            hasErrors = true;
        }

        // If isMemberShipRequired is false, set contactGroupIds to empty string
        if (!project.isMembershipRequired) {
            project.contactGroupIds = '';
        }

        this.setState({ ...this.state, errors: errors });

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
            ownedById,
            projectStatusId,
            dateStart,
            dateEnd,
            dateEntry,
            dateProduction,
            dateStartRegistrations,
            dateEndRegistrations,
            projectTypeId,
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
            isParticipationTransferable,
            administrationId,
            postalcodeLink,
            contactGroupIds,
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

        const projectType = this.props.projectTypes.find(projectType => projectType.id == projectTypeId);

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
                                        address={address}
                                        postalCode={postalCode}
                                        city={city}
                                        dateStartRegistrations={dateStartRegistrations}
                                        dateEndRegistrations={dateEndRegistrations}
                                        ownedById={ownedById}
                                        administrationId={administrationId}
                                        dateStart={dateStart}
                                        dateEnd={dateEnd}
                                        dateEntry={dateEntry}
                                        dateProduction={dateProduction}
                                        contactGroupIds={contactGroupIds}
                                        isMembershipRequired={isMembershipRequired}
                                        handleInputChange={this.handleInputChange}
                                        handleInputChangeAdministration={this.handleInputChangeAdministration}
                                        handleInputChangeDate={this.handleInputChangeDate}
                                        handleContactGroupIds={this.handleContactGroupIds}
                                        errors={this.state.errors}
                                        contactGroups={this.state.contactGroups}
                                        disableBeforeEntryDate={this.state.disableBeforeEntryDate}
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
        projectTypes: state.systemData.projectTypes,
    };
};

export default connect(mapStateToProps)(ProjectNewApp);
