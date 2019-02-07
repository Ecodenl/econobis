import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import validator from 'validator';

import ButtonText from '../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../components/panel/PanelFooter';

import ProjectDetailsAPI from '../../../../../api/project/ProjectDetailsAPI';

import { fetchProject } from '../../../../../actions/project/ProjectDetailsActions';
import ContactGroupAPI from '../../../../../api/contact-group/ContactGroupAPI';
import ProjectFormEditGeneral from './ProjectFormEditGeneral';
import ProjectFormEditLoan from './ProjectFormEditLoan';
import ProjectFormEditObligation from './ProjectFormEditObligation';
import ProjectFormEditPostalcodeLinkCapital from './ProjectFormEditPostalcodeLinkCapital';

class ProjectFormEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactGroups: [],
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
                ownedById: false,
                postalCode: false,
                contactGroupIds: false,
            },
        };
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
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
            ProjectDetailsAPI.updateProject(project.id, project).then(payload => {
                this.props.fetchProject(project.id);
                this.props.switchToView();
            });
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
            address,
            postalCode,
            city,
            dateStartRegistrations,
            dateEndRegistrations,
            ownedById,
            administrationId,
            dateStart,
            dateEnd,
            dateProduction,
            contactGroupIds,
            isMembershipRequired,
            amountOfLoanNeeded,
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
            isParticipationTransferable,
            postalcodeLink,
        } = this.state.project;
        const {
            issuedParticipations,
            participationsInOption,
            issuableParticipations,
            administration,
            hasPaymentInvoices,
            valueCourses,
        } = this.props.project;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <ProjectFormEditGeneral
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
                    administration={administration}
                    hasPaymentInvoices={hasPaymentInvoices}
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

                <ProjectFormEditLoan
                    amountOfLoanNeeded={amountOfLoanNeeded}
                    handleInputChange={this.handleInputChange}
                    projectTypeId={projectTypeId}
                />

                <ProjectFormEditObligation
                    participationWorth={participationWorth}
                    issuedParticipations={issuedParticipations}
                    participationsInOption={participationsInOption}
                    issuableParticipations={issuableParticipations}
                    totalParticipations={totalParticipations}
                    powerKwAvailable={powerKwAvailable}
                    minParticipations={minParticipations}
                    maxParticipations={maxParticipations}
                    maxParticipationsYouth={maxParticipationsYouth}
                    isParticipationTransferable={isParticipationTransferable}
                    valueCourses={valueCourses}
                    handleInputChange={this.handleInputChange}
                    projectTypeId={projectTypeId}
                />

                <ProjectFormEditPostalcodeLinkCapital
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
                            buttonClassName={'btn-default'}
                            buttonText={'Annuleren'}
                            onClickAction={this.props.switchToView}
                        />
                        <ButtonText
                            buttonText={'Opslaan'}
                            onClickAction={this.handleSubmit}
                            type={'submit'}
                            value={'Submit'}
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
