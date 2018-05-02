import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';

import { updateOrganisation } from '../../../../actions/contact/ContactDetailsActions';
import OrganisationAPI from '../../../../api/contact/OrganisationAPI';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from "../../../../components/panel/PanelFooter";
import * as ibantools from "ibantools";
import InputToggle from "../../../../components/form/InputToggle";

class ContactDetailsFormOrganisationEdit extends Component {
    constructor(props) {
        super(props);

        const { number, organisation, status, iban, ibanAttn, createdAt, memberSince = {}, memberUntil = {}, newsletter, didAgreeAvg } = props.contactDetails;

        this.state = {
            organisation: {
                id: organisation.id,
                number: number,
                createdAt: createdAt.date,
                name: organisation.name,
                chamberOfCommerceNumber: organisation.chamberOfCommerceNumber,
                vatNumber: organisation.vatNumber,
                industryId: organisation.industryId ? organisation.industryId : '',
                statusId: status.id,
                memberSince: memberSince ? moment(memberSince.date).format('Y-MM-DD') : '',
                memberUntil: memberUntil ? moment(memberUntil.date).format('Y-MM-DD') : '',
                typeId: organisation.type ? organisation.type.id : '',
                website: organisation.website,
                iban: iban,
                ibanAttn: ibanAttn ? ibanAttn : '',
                squareMeters: organisation.squareMeters,
                newsletter: newsletter,
                didAgreeAvg: didAgreeAvg,
            },
            errors: {
                name: false,
                statusId: false,
                iban: false,
            },
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            organisation: {
                ...this.state.organisation,
                [name]: value
            },
        });
    };

    handleChangeMemberSince = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            organisation: {
                ...this.state.organisation,
                memberSince: formattedDate
            },
        });
    };

    handleChangeMemberUntilDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            organisation: {
                ...this.state.organisation,
                memberUntil: formattedDate
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { organisation }  = this.state;

        let errors = {};
        let hasErrors = false;

        if(!validator.isEmpty(organisation.iban)){
            if (!ibantools.isValidIBAN(organisation.iban)) {
                errors.iban = true;
                hasErrors = true;
            }
        }

        if(validator.isEmpty(organisation.name)){
            errors.name = true;
            hasErrors = true;
        };

        if(validator.isEmpty(organisation.statusId)){
            errors.statusId = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        !hasErrors &&
        OrganisationAPI.updateOrganisation(organisation).then((payload) => {
                this.props.updateOrganisation(payload);
                this.props.switchToView();
            });
    };

    render() {
        const { number, typeId, statusId, name, chamberOfCommerceNumber, vatNumber, industryId, createdAt, memberSince, memberUntil, newsletter, didAgreeAvg, website, iban, ibanAttn, squareMeters } = this.state.organisation;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Klantnummer"}
                        name={"number"}
                        value={number}
                        readOnly={ true }
                    />
                    <InputText
                        label={"Gemaakt op"}
                        name={"createdAt"}
                        value={ moment(createdAt).format('DD-MM-Y')  }
                        readOnly={ true }
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Naam"
                        name={"name"}
                        value={name}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.name}
                    />
                    <InputSelect
                        label={"Status"}
                        size={"col-sm-6"}
                        name={"statusId"}
                        options={this.props.contactStatuses}
                        value={statusId}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.statusId}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="KvK"
                        size={"col-sm-6"}
                        name="chamberOfCommerceNumber"
                        value={chamberOfCommerceNumber}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputDate
                        label={"Lid sinds"}
                        name="memberSince"
                        value={ memberSince }
                        onChangeAction={this.handleChangeMemberSince}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Btw nummer"
                        name="vatNumber"
                        value={vatNumber}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputDate
                        label={"Opzegdatum"}
                        size={"col-sm-6"}
                        name={"memberUntil"}
                        value={ memberUntil }
                        onChangeAction={this.handleChangeMemberUntilDate}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="IBAN"
                        name="iban"
                        value={iban}
                        onChangeAction={this.handleInputChange}
                        error={this.state.errors.iban}
                    />
                    <InputText
                        label="IBAN t.n.v."
                        name="ibanAttn"
                        value={ibanAttn}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={"Website"}
                        name={"website"}
                        value={website}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputSelect
                        label={"Industrie"}
                        size={"col-sm-6"}
                        name={"industryId"}
                        options={this.props.industries}
                        value={industryId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Soort contact"}
                        size={"col-sm-6"}
                        name={"typeId"}
                        options={this.props.organisationTypes}
                        value={typeId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label="Oppervlakte"
                        name="squareMeters"
                        value={squareMeters}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={"Nieuwsbrief"}
                        name={"newsletter"}
                        value={newsletter}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputToggle
                        label="Akkoord privacybeleid"
                        name="didAgreeAvg"
                        value={didAgreeAvg}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit}/>
                    </div>
                </PanelFooter>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
        organisationTypes: state.systemData.organisationTypes,
        contactStatuses: state.systemData.contactStatuses,
        industries: state.systemData.industries,
    };
};

const mapDispatchToProps = dispatch => ({
    updateOrganisation: (id) => {
        dispatch(updateOrganisation(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormOrganisationEdit);
