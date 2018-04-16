import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import moment from 'moment';
import validator from 'validator';

import PersonAPI from '../../../api/contact/PersonAPI';
import OrganisationAPI from '../../../api/contact/OrganisationAPI';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from "../../../components/panel/PanelFooter";
import InputToggle from "../../../components/form/InputToggle";

class ContactNewFormPersonal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            buttonLoading: false,
            organisationPeek: [],
            person: {
                id: '',
                number: '',
                createdAt: '',
                titleId: '',
                statusId: 'interested',
                initials: '',
                firstName: '',
                lastNamePrefixId: '',
                lastName: '',
                memberSince: '',
                memberUntil: '',
                typeId: '',
                dateOfBirth: '',
                newsletter: false,
                ownerId: props.userId,
                didAgreeAvg: false,
            },
            errors: {
                name: false,
                statusId: false,
            },
        }
    };

    componentDidMount() {
        OrganisationAPI.getOrganisationPeek().then(payload => {
            this.setState({
                ...this.state,
                organisationPeek: payload,
            })
        })
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            person: {
                ...this.state.person,
                [name]: value
            },
        });
    };

    handleChangeMemberSince = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            person: {
                ...this.state.person,
                memberSince: formattedDate
            },
        });
    };

    handleChangeDateOfBirth = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            person: {
                ...this.state.person,
                dateOfBirth: formattedDate
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { person }  = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(person.firstName) && validator.isEmpty(person.lastName)){
            errors.name = true;
            hasErrors = true;
        };

        if(validator.isEmpty(person.statusId)){
            errors.statusId = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors })

        // If no errors send form
        if (!hasErrors) {
            if(this.state.buttonLoading){
                return false;
            }
            this.setState({
                buttonLoading: true
            });
            PersonAPI.newPerson(person).then((payload) => {
                hashHistory.push(`/contact/${payload.id}`);
            });
        }
    };

    render() {
        const { typeId, statusId, titleId, initials, firstName, lastNamePrefixId, lastName, memberSince, dateOfBirth, newsletter, ownerId, didAgreeAvg } = this.state.person;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Klantnummer"}
                        name={"number"}
                        readOnly={ true }
                        value={''}
                    />
                    <InputText
                        label={"Gemaakt op"}
                        name={"createdAt"}
                        value={ moment().format('DD-MM-Y') }
                        readOnly={ true }
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label="Aanspreektitel"
                        name={"titleId"}
                        options={this.props.titles}
                        value={titleId}
                        onChangeAction={this.handleInputChange}
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
                        label="Voorletters"
                        size={"col-sm-6"}
                        name="initials"
                        value={initials}
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
                        label="Voornaam"
                        size={"col-sm-6"}
                        name="firstName"
                        value={firstName}
                        onChangeAction={this.handleInputChange}
                        required={lastName === '' && "required"}
                        error={this.state.errors.name}
                    />
                    <InputText
                        label={"Opzegdatum"}
                        name={"memberUntil"}
                        value={ '' }
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label="Tussenvoegsel"
                        name="lastNamePrefixId"
                        options={this.props.lastNamePrefixes}
                        value={lastNamePrefixId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputSelect
                        label={"Soort contact"}
                        size={"col-sm-6"}
                        name={"typeId"}
                        options={this.props.personTypes}
                        value={typeId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={"Achternaam"}
                        size={"col-sm-6"}
                        name="lastName"
                        value={lastName}
                        onChangeAction={this.handleInputChange}
                        required={firstName === '' && "required"}
                        error={this.state.errors.name}
                    />
                    <InputDate
                        label={"Geboortedatum"}
                        name={"dateOfBirth"}
                        value={ dateOfBirth }
                        onChangeAction={this.handleChangeDateOfBirth}
                    />
                </div>

                <div className="row">
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
                    <InputToggle
                        label={"Nieuwsbrief"}
                        name={"newsletter"}
                        value={newsletter}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputToggle
                        label={"Akkoord privacybeleid"}
                        name={"didAgreeAvg"}
                        value={didAgreeAvg}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText loading={this.state.buttonLoading} loadText={"Persoon wordt aangemaakt."} buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                    </div>
                </PanelFooter>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        lastNamePrefixes: state.systemData.lastNamePrefixes,
        personTypes: state.systemData.personTypes,
        contactStatuses: state.systemData.contactStatuses,
        occupations: state.systemData.occupations,
        users: state.systemData.users,
        titles: state.systemData.titles,
        userId: state.meDetails.id,
    };
};

export default connect(mapStateToProps)(ContactNewFormPersonal);
