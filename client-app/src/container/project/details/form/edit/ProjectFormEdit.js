import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import validator from 'validator';

import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../components/panel/PanelFooter';

import ProjectDetailsAPI from '../../../../../api/project/ProjectDetailsAPI';

import { fetchProject } from '../../../../../actions/project/ProjectDetailsActions';
import InputToggle from '../../../../../components/form/InputToggle';
import ContactGroupAPI from '../../../../../api/contact-group/ContactGroupAPI';
import ProjectFormEditGeneral from './ProjectFormEditGeneral';
import ProjectFormEditLoan from './ProjectFormEditLoan';

class ProjectFormEdit extends Component {
    constructor(props) {
        super(props);

        const {
            id,
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
            requiresContactGroups,
        } = props.project;

        this.state = {
            contactGroups: [],
            project: {
                id,
                name: name,
                administrationId: administrationId,
                code: code,
                description: description ? description : '',
                ownedById: ownedById,
                projectStatusId: projectStatusId ? projectStatusId : '',
                dateStart: dateStart ? dateStart : '',
                dateEnd: dateEnd ? dateEnd : '',
                dateProduction: dateProduction ? dateProduction : '',
                dateStartRegistrations: dateStartRegistrations ? dateStartRegistrations : '',
                dateEndRegistrations: dateEndRegistrations ? dateEndRegistrations : '',
                projectTypeId: projectTypeId ? projectTypeId : '',
                postalCode: postalCode ? postalCode : '',
                address: address ? address : '',
                city: city ? city : '',
                ean: ean ? ean : '',
                eanManager: eanManager ? eanManager : '',
                warrantyOrigin: warrantyOrigin ? warrantyOrigin : '',
                eanSupply: eanSupply ? eanSupply : '',
                participationWorth: participationWorth ? participationWorth : '',
                powerKwAvailable: powerKwAvailable ? powerKwAvailable : '',
                maxParticipations: maxParticipations ? maxParticipations : '',
                taxReferral: taxReferral ? taxReferral : '',
                maxParticipationsYouth: maxParticipationsYouth ? maxParticipationsYouth : '',
                totalParticipations: totalParticipations ? totalParticipations : '',
                minParticipations: minParticipations ? minParticipations : '',
                isMembershipRequired: !!isMembershipRequired,
                isParticipationTransferable: !!isParticipationTransferable,
                postalcodeLink: postalcodeLink ? postalcodeLink : '',
                contactGroupIds:
                    requiresContactGroups &&
                    requiresContactGroups.map(requiresContactGroup => requiresContactGroup.id).join(','),
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
        const { issuedParticipations, participationsInOption, issuableParticipations } = this.props.project;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <ProjectFormEditGeneral
                    name={this.state.project.name}
                    code={this.state.project.code}
                    description={this.state.project.description}
                    projectStatusId={this.state.project.projectStatusId}
                    projectTypeId={this.state.project.projectTypeId}
                    address={this.state.project.address}
                    postalCode={this.state.project.postalCode}
                    dateStartRegistrations={this.state.project.dateStartRegistrations}
                    dateEndRegistrations={this.state.project.dateEndRegistrations}
                    ownedById={this.state.project.ownedById}
                    administrationId={this.state.project.administrationId}
                    administration={this.props.project && this.props.project.administration}
                    hasPaymentInvoices={this.props.project && this.props.project.hasPaymentInvoices}
                    dateStart={this.state.project.dateStart}
                    dateEnd={this.state.project.dateEnd}
                    dateProduction={this.state.project.dateProduction}
                    contactGroupIds={this.state.project.contactGroupIds}
                    isMembershipRequired={this.state.project.isMembershipRequired}
                    handleInputChange={this.handleInputChange}
                    handleInputChangeDate={this.handleInputChangeDate}
                    handleContactGroupIds={this.handleContactGroupIds}
                    errors={this.state.errors}
                    contactGroups={this.state.contactGroups}
                />
                <ProjectFormEditLoan handleInputChange={this.handleInputChange} />

                <h4>Obligatie, Kapitaal en Postcoderoos</h4>
                <h4>Postcoderoos kapitaal</h4>
                <div className="row">
                    <InputText label={'EAN'} name={'ean'} value={ean} onChangeAction={this.handleInputChange} />
                    <InputText
                        label={'EAN Netbeheer'}
                        name={'eanManager'}
                        value={eanManager}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputText
                        label={'Garantie van oorsprong'}
                        name={'warrantyOrigin'}
                        value={warrantyOrigin}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={'EAN Levering'}
                        name={'eanSupply'}
                        value={eanSupply}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Waarde per deelname'}
                        name={'participationWorth'}
                        value={participationWorth}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        type={'number'}
                        label={'Opgesteld vermogen kW'}
                        name={'powerKwAvailable'}
                        value={powerKwAvailable}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Max aantal part. p/p'}
                        name={'maxParticipations'}
                        value={maxParticipations}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={'Aanwijzing belastingdienst'}
                        name={'taxReferral'}
                        value={taxReferral}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Max aantal part. jeugd'}
                        name={'maxParticipationsYouth'}
                        value={maxParticipationsYouth}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        type={'number'}
                        label={'Totaal aantal deelnames'}
                        name={'totalParticipations'}
                        value={totalParticipations}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Min. aantal part. p/p'}
                        name={'minParticipations'}
                        value={minParticipations}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={'Uitgegeven deelnames'}
                        name={'issuedParticipations'}
                        value={issuedParticipations ? issuedParticipations : ''}
                        readOnly={true}
                    />
                </div>
                <div className="row">
                    <InputText
                        label={'Postcoderoos'}
                        name={'postalcodeLink'}
                        value={postalcodeLink}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputToggle
                        label={'Deelnames overdraagbaar'}
                        name={'isParticipationTransferable'}
                        value={isParticipationTransferable}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={'Deelnames in optie'}
                        name={'participationsInOption'}
                        value={participationsInOption ? participationsInOption : ''}
                        readOnly={true}
                    />
                </div>
                <div className="row">
                    <InputText
                        label={'Uit te geven deelnames'}
                        name={'issuableParticipations'}
                        value={issuableParticipations ? issuableParticipations : ''}
                        readOnly={true}
                    />
                </div>
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
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProjectFormEdit);
