import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
moment.locale('nl');
import validator from 'validator';

import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from "../../../../components/panel/PanelFooter";

import ProductionProjectDetailsAPI from '../../../../api/production-project/ProductionProjectDetailsAPI';

import { fetchProductionProject } from '../../../../actions/production-project/ProductionProjectDetailsActions';
import InputToggle from "../../../../components/form/InputToggle";
import ContactGroupAPI from "../../../../api/contact-group/ContactGroupAPI";
import InputMultiSelect from "../../../../components/form/InputMultiSelect";

class ProductionProjectFormEdit extends Component {
    constructor(props) {
        super(props);

        const {id, name, code, description, ownedById, productionProjectStatusId, dateStart,
            dateProduction, dateStartRegistrations, dateEndRegistrations, productionProjectTypeId, postalCode, address,
            city, ean, eanManager, warrantyOrigin, eanSupply,
            participationWorth, powerKwAvailable, maxParticipations, taxReferral, maxParticipationsYouth,
            totalParticipations, minParticipations, isMembershipRequired,
            isParticipationTransferable, administrationId, postalcodeLink, requiresContactGroups} = props.productionProject;

        this.state = {
            contactGroups: [],
            productionProject: {
                id,
                name: name,
                administrationId: administrationId,
                code: code,
                description: description ? description : '',
                ownedById: ownedById,
                productionProjectStatusId: productionProjectStatusId ? productionProjectStatusId : '',
                dateStart: dateStart ? dateStart : '',
                dateProduction: dateProduction ? dateProduction : '',
                dateStartRegistrations: dateStartRegistrations ? dateStartRegistrations : '',
                dateEndRegistrations: dateEndRegistrations ? dateEndRegistrations : '',
                productionProjectTypeId: productionProjectTypeId ? productionProjectTypeId : '',
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
                postalcodeLink: postalcodeLink ? postalcodeLink: '',
                contactGroupIds: requiresContactGroups && requiresContactGroups.map((requiresContactGroup) => requiresContactGroup.id).join(','),
            },
            errors: {
                name: false,
                code: false,
                ownedById: false,
                postalCode: false,
            },
        }
        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    };

    componentDidMount() {
        ContactGroupAPI.peekContactGroups().then((payload) => {
            this.setState({contactGroups: payload});
        });
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            productionProject: {
                ...this.state.productionProject,
                [name]: value
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            productionProject: {
                ...this.state.productionProject,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const {productionProject} = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(productionProject.name)){
            errors.name = true;
            hasErrors = true;
        };

        if(validator.isEmpty('' + productionProject.code)){
            errors.code = true;
            hasErrors = true;
        };

        if(validator.isEmpty('' + productionProject.ownedById)){
            errors.ownedById = true;
            hasErrors = true;
        };

        if(!validator.isEmpty('' + productionProject.postalCode) && !validator.isPostalCode(productionProject.postalCode, 'any')){
            errors.postalCode = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        ProductionProjectDetailsAPI.updateProductionProject(productionProject.id, productionProject).then(payload => {
            this.props.fetchProductionProject(productionProject.id);
            this.props.switchToView();
        });
    };

    handleContactGroupIds = (selectedOption) => {
        this.setState({
            ...this.state,
            productionProject: {
                ...this.state.productionProject,
                contactGroupIds: selectedOption
            },
        });
    };

    render() {
        const {name, code, description, ownedById, productionProjectStatusId, dateStart,
            dateProduction, dateStartRegistrations, dateEndRegistrations, productionProjectTypeId, postalCode, address,
            city, ean, eanManager, warrantyOrigin, eanSupply,
            participationWorth, powerKwAvailable, maxParticipations, taxReferral, maxParticipationsYouth,
            totalParticipations, minParticipations, isMembershipRequired,
            isParticipationTransferable, postalcodeLink, administrationId, contactGroupIds} = this.state.productionProject;
        const {issuedParticipations, participationsInOption, issuableParticipations, administration, hasPaymentInvoices}  = this.props.productionProject;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Naam"}
                        name={"name"}
                        value={name}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.name}
                    />
                    <InputText
                        label={"Projectcode"}
                        name={"code"}
                        value={code}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.code}
                    />
                </div>

                <div className="row">
                    <div className="form-group col-sm-12">
                        <div className="row">
                            <div className="col-sm-3">
                                <label htmlFor="description" className="col-sm-12">Omschrijving</label>
                            </div>
                            <div className="col-sm-8">
                                <textarea name='description' value={description} onChange={this.handleInputChange}
                                          className="form-control input-sm"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <InputSelect
                        label={"Verantwoordelijke"}
                        name={"ownedById"}
                        options={this.props.users}
                        optionName={'fullName'}
                        value={ownedById}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.ownedById}
                    />
                    <InputSelect
                        label={"Status"}
                        name={"productionProjectStatusId"}
                        options={this.props.productionProjectStatus}
                        value={productionProjectStatusId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label={"Start project"}
                        name={"dateStart"}
                        value={dateStart }
                        onChangeAction={this.handleInputChangeDate}
                    />
                    <InputDate
                        label={"Datum productie"}
                        name={"dateProduction"}
                        value={ dateProduction }
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label={"Start inschrijving"}
                        name={"dateStartRegistrations"}
                        value={ dateStartRegistrations }
                        onChangeAction={this.handleInputChangeDate}
                    />
                    <InputDate
                        label={"Eind inschrijving"}
                        name={"dateEndRegistrations"}
                        value={ dateEndRegistrations }
                        onChangeAction={this.handleInputChangeDate}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Type"}
                        name={"productionProjectTypeId"}
                        options={this.props.productionProjectTypes}
                        value={productionProjectTypeId}
                        onChangeAction={this.handleInputChange}
                    />

                    {/*Als er al facturen zijn gemaakt mag de administratie niet meer gewijzigd worden*/}
                    {hasPaymentInvoices ?
                        <InputText
                            label={"Administratie"}
                            name={"administration"}
                            value={administration ? administration.name : ''}
                            readOnly={'true'}
                        />
                        :
                        <InputSelect
                            label={"Administratie"}
                            name={"administrationId"}
                            options={this.props.administrations}
                            value={administrationId}
                            onChangeAction={this.handleInputChange}
                        />
                    }
                </div>

                <div className="row">
                    <InputText
                        label={"Postcode"}
                        name={"postalCode"}
                        value={postalCode}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.postalCode}
                    />
                    <InputText
                        label={"Adres"}
                        name={"address"}
                        value={address}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={"Plaats"}
                        name={"city"}
                        value={city}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"Postcoderoos"}
                        name={"postalcodeLink"}
                        value={postalcodeLink}
                        onChangeAction={this.handleInputChange}
                    />

                </div>

                <div className="row">
                    <InputText
                        label={"EAN"}
                        name={"ean"}
                        value={ean}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"EAN Netbeheer"}
                        name={"eanManager"}
                        value={eanManager}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={"Garantie van oorsprong"}
                        name={"warrantyOrigin"}
                        value={warrantyOrigin}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"EAN Levering"}
                        name={"eanSupply"}
                        value={eanSupply}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        type={"number"}
                        label={"Waarde per participatie"}
                        name={"participationWorth"}
                        value={participationWorth}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        type={"number"}
                        label={"Opgesteld vermogen kW"}
                        name={"powerKwAvailable"}
                        value={powerKwAvailable}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        type={"number"}
                        label={"Max aantal part. p/p"}
                        name={"maxParticipations"}
                        value={maxParticipations}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"Aanwijzing belastingdienst"}
                        name={"taxReferral"}
                        value={taxReferral}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        type={"number"}
                        label={"Max aantal part. jeugd"}
                        name={"maxParticipationsYouth"}
                        value={maxParticipationsYouth}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        type={"number"}
                        label={"Totaal aantal participaties"}
                        name={"totalParticipations"}
                        value={totalParticipations}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        type={"number"}
                        label={"Min. aantal part. p/p"}
                        name={"minParticipations"}
                        value={minParticipations}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"Uitgegeven participaties"}
                        name={"issuedParticipations"}
                        value={issuedParticipations ? issuedParticipations : ''}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={"Participaties overdraagbaar"}
                        name={"isParticipationTransferable"}
                        value={isParticipationTransferable}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"Participaties in optie"}
                        name={"participationsInOption"}
                        value={participationsInOption ? participationsInOption : ''}
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={"Deelname aan groep verplicht"}
                        name={"isMembershipRequired"}
                        value={isMembershipRequired}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"Uit te geven participaties"}
                        name={"issuableParticipations"}
                        value={issuableParticipations ? issuableParticipations : ''}
                        readOnly={true}
                    />
                </div>
                {isMembershipRequired == true &&
                <div className={'row'}>
                    <InputMultiSelect
                        label={"Onderdeel van groep"}
                        name={"contactGroupsIds"}
                        options={this.state.contactGroups}
                        value={contactGroupIds}
                        onChangeAction={this.handleContactGroupIds}
                    />
                </div>
                }

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                    onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"}
                                    value={"Submit"}/>
                    </div>
                </PanelFooter>
            </form>
        );
    };
};

const mapDispatchToProps = dispatch => ({
    fetchProductionProject: (id) => {
        dispatch(fetchProductionProject(id));
    },
});

const mapStateToProps = (state) => {
    return {
        productionProject: state.productionProjectDetails,
        users: state.systemData.users,
        productionProjectStatus: state.systemData.productionProjectStatus,
        productionProjectTypes: state.systemData.productionProjectTypes,
        administrations: state.meDetails.administrations,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductionProjectFormEdit);
