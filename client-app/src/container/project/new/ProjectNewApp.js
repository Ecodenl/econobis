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
import ProjectFormNewPostalcodeLinkCapital from './form/ProjectNewPostalcodeLinkCapital';
import ProjectFormNewObligation from './form/ProjectNewObligation';
import ProjectFormNewLoan from './form/ProjectFormNewLoan';

class ProjectNewApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactGroups: [],
            showPostalCodeLinkFields: false,
            project: {
                name: '',
                code: '',
                description: '',
                ownedById: '',
                projectStatusId: '',
                dateStart: '',
                dateEnd: '',
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
                maxParticipationsYouth: '',
                totalParticipations: '',
                minParticipations: '',
                isMembershipRequired: false,
                isParticipationTransferable: false,
                postalcodeLink: '',
                contactGroupIds: '',
                amountOfLoanNeeded: '',
            },
            errors: {
                name: false,
                code: false,
                projectTypeId: false,
                ownedById: false,
                postalCode: false,
                contactGroupIds: false,
            },
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
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

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            project: {
                ...this.state.project,
                [name]: value,
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

        if (!project.projectTypeId) {
            errors.projectTypeId = true;
            hasErrors = true;
        }

        if (validator.isEmpty('' + project.ownedById)) {
            errors.ownedById = true;
            hasErrors = true;
        }

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

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
            ProjectDetailsAPI.storeProject(project).then(payload => {
                hashHistory.push(`/project/${payload.id}`);
            });
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
            maxParticipationsYouth,
            totalParticipations,
            minParticipations,
            isMembershipRequired,
            isParticipationTransferable,
            administrationId,
            postalcodeLink,
            contactGroupIds,
            amountOfLoanNeeded,
        } = this.state.project;

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
                                        dateProduction={dateProduction}
                                        contactGroupIds={contactGroupIds}
                                        isMembershipRequired={isMembershipRequired}
                                        handleInputChange={this.handleInputChange}
                                        handleInputChangeDate={this.handleInputChangeDate}
                                        handleContactGroupIds={this.handleContactGroupIds}
                                        errors={this.state.errors}
                                        contactGroups={this.state.contactGroups}
                                    />

                                    <ProjectFormNewLoan
                                        amountOfLoanNeeded={amountOfLoanNeeded}
                                        handleInputChange={this.handleInputChange}
                                        projectTypeId={projectTypeId}
                                    />

                                    <ProjectFormNewObligation
                                        participationWorth={participationWorth}
                                        totalParticipations={totalParticipations}
                                        powerKwAvailable={powerKwAvailable}
                                        minParticipations={minParticipations}
                                        maxParticipations={maxParticipations}
                                        maxParticipationsYouth={maxParticipationsYouth}
                                        isParticipationTransferable={isParticipationTransferable}
                                        handleInputChange={this.handleInputChange}
                                        projectTypeId={projectTypeId}
                                    />

                                    <ProjectFormNewPostalcodeLinkCapital
                                        postalcodeLink={postalcodeLink}
                                        ean={ean}
                                        taxReferral={taxReferral}
                                        eanManager={eanManager}
                                        warrantyOrigin={warrantyOrigin}
                                        eanSupply={eanSupply}
                                        handleInputChange={this.handleInputChange}
                                        projectTypeId={projectTypeId}
                                    />

                                    <PanelFooter>
                                        <div className="pull-right btn-group" role="group">
                                            <ButtonText
                                                buttonText={'Opslaan'}
                                                onClickAction={this.handleSubmit}
                                                type={'submit'}
                                                value={'Submit'}
                                            />
                                        </div>
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
    };
};

export default connect(mapStateToProps)(ProjectNewApp);
