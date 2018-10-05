import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import moment from 'moment';
import validator from 'validator';

import OrganisationAPI from '../../../api/contact/OrganisationAPI';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from "../../../components/panel/PanelFooter";
import * as ibantools from "ibantools";
import InputToggle from "../../../components/form/InputToggle";

class ContactNewFormOrganisation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonLoading: false,
            organisation: {
                id: '',
                number: '',
                createdAt: '',
                name: '',
                chamberOfCommerceNumber: '',
                vatNumber: '',
                industryId: '',
                statusId: 'interested',
                memberSince: '',
                memberUntil: '',
                typeId: '',
                website: '',
                iban: '',
                ibanAttn: '',
                squareMeters: '',
                newsletter: false,
                ownerId: props.userId,
                didAgreeAvg: false
            },
            errors: {
                name: false,
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

    handleSubmit = event => {
        event.preventDefault();

        const { organisation }  = this.state;

        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(organisation.name)){
            errors.name = true;
            hasErrors = true;
        };

        if(!validator.isEmpty(organisation.iban)){
            if (!ibantools.isValidIBAN(organisation.iban)) {
                errors.iban = true;
                hasErrors = true;
            }
        }

        this.setState({ ...this.state, errors: errors })

        // If no errors send form
        if (!hasErrors) {
            if(this.state.buttonLoading){
                return false;
            }
            this.setState({
                buttonLoading: true
            });
            OrganisationAPI.newOrganisation(organisation).then((payload) => {
                hashHistory.push(`/contact/${payload.id}`);
            });
        }
    };

    render() {
        const { typeId, statusId, name, chamberOfCommerceNumber, vatNumber, industryId, memberSince, newsletter, website, iban, ibanAttn, squareMeters, ownerId, didAgreeAvg } = this.state.organisation;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Contactnummer"}
                        name={"number"}
                        value={''}
                        readOnly={ true }
                    />
                    <InputText
                        label={"Gemaakt op"}
                        name={"createdAt"}
                        value={ moment().format('DD-MM-Y') }
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
                        divClassName={'field-to-be-removed'}
                        options={this.props.contactStatuses}
                        value={statusId}
                        onChangeAction={this.handleInputChange}
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
                    <InputText
                        label={"Opzegdatum"}
                        name={"memberUntil"}
                        value={ '' }
                        readOnly={true}
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
                        divClassName={'field-to-be-removed'}
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
                        divClassName={'field-to-be-removed'}
                        options={this.props.organisationTypes}
                        value={typeId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputSelect
                        label={"Eigenaar"}
                        size={"col-sm-6"}
                        name={"ownerId"}
                        options={this.props.users}
                        value={ownerId}
                        optionName={"fullName"}
                        onChangeAction={this.handleInputChange}
                    />
                </div>
                <div className="row">
                    <InputText
                        label="Oppervlakte"
                        name="squareMeters"
                        divClassName={'field-to-be-removed'}
                        value={squareMeters}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputToggle
                        label={"Nieuwsbrief"}
                        name={"newsletter"}
                        value={newsletter}
                        className={'field-to-be-removed'}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputToggle
                        label={"Akkoord privacybeleid"}
                        name={"didAgreeAvg"}
                        value={didAgreeAvg}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText loading={this.state.buttonLoading} loadText={"Organisatie wordt aangemaakt."} buttonText={"Opslaan"} onClickAction={this.handleSubmit}/>
                    </div>
                </PanelFooter>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        organisationTypes: state.systemData.organisationTypes,
        contactStatuses: state.systemData.contactStatuses,
        industries: state.systemData.industries,
        users: state.systemData.users,
        userId: state.meDetails.id,
    };
};

export default connect(mapStateToProps)(ContactNewFormOrganisation);
