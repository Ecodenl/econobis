import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import validator from 'validator';

import { updatePerson } from '../../../../actions/contact/ContactDetailsActions';
import PersonAPI from '../../../../api/contact/PersonAPI';
import OrganisationAPI from '../../../../api/contact/OrganisationAPI';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputCheckbox from "../../../../components/form/InputCheckbox";
import InputDate from '../../../../components/form/InputDate';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from "../../../../components/panel/PanelFooter";

class ContactDetailsFormPersonalEdit extends Component {
    constructor(props) {
        super(props);

        const { number, createdAt, person, status, memberSince = {}, memberUntil = {}, newsletter } = props.contactDetails;

        this.state = {
            organisationPeek: [
                {
                    id: person.organisation ? person.organisation.id : '',
                    name: person.organisation ? person.organisation.name : '',
                }
            ],
            person: {
                id: person.id,
                number: number,
                createdAt: createdAt.date,
                titleId: person.title ? person.title.id : '',
                statusId: status.id,
                firstName: person.firstName,
                lastNamePrefixId: person.lastNamePrefix ? person.lastNamePrefix.id : '',
                lastName: person.lastName,
                memberSince: memberSince ? moment(memberSince.date).format('Y-MM-DD') : '',
                memberUntil: memberUntil ? moment(memberUntil.date).format('Y-MM-DD') : '',
                typeId: person.type ? person.type.id : '',
                dateOfBirth: person.dateOfBirth ? moment(person.dateOfBirth.date).format('Y-MM-DD') : '',
                newsletter: newsletter,
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

    handleChangeMemberUntilDate = (date) => {
        const formattedDate = (date ? moment(date).format('Y-MM-DD') : '');

        this.setState({
            ...this.state,
            person: {
                ...this.state.person,
                memberUntil: formattedDate
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
        !hasErrors &&
        PersonAPI.updatePerson(person).then((payload) => {
            this.props.updatePerson(payload);
            this.props.switchToView();
        });
    };

    render() {
        const {number, createdAt, titleId, statusId, typeId, firstName, lastNamePrefixId, lastName, memberSince, memberUntil, dateOfBirth, newsletter} = this.state.person;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label={"Klantnummer"}
                        size={"col-sm-6"}
                        name={"number"}
                        readOnly={ true }
                        value={number}
                    />
                    <InputText
                        label={"Gemaakt op"}
                        id={"created_at"}
                        name={"createdAt"}
                        value={ moment(createdAt).format('DD-MM-Y') }
                        readOnly={ true }
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Aanspreektitel"}
                        size={"col-sm-6"}
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
                        label="Voornaam"
                        size={"col-sm-6"}
                        name={"firstName"}
                        value={firstName}
                        onChangeAction={this.handleInputChange}
                        required={lastName === '' && "required"}
                        error={this.state.errors.name}
                    />
                    <InputDate
                        label={"Lid sinds"}
                        size={"col-sm-6"}
                        name={"memberSince"}
                        value={ memberSince }
                        onChangeAction={this.handleChangeMemberSince}
                    />
                </div>

                <div className="row">
                    <InputSelect
                        label={"Tussenvoegsel"}
                        size={"col-sm-6"}
                        name={"lastNamePrefixId"}
                        options={this.props.lastNamePrefixes}
                        value={lastNamePrefixId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputDate
                        label={"Opzegdatum"}
                        size={"col-sm-6"}
                        name={"cancellationDate"}
                        value={ memberUntil }
                        onChangeAction={this.handleChangeMemberUntilDate}
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
                    <InputDate
                        label={"Geboortedatum"}
                        size={"col-sm-6"}
                        name={"dateOfBirth"}
                        value={ dateOfBirth }
                        onChangeAction={this.handleChangeDateOfBirth}
                    />
                    <InputCheckbox
                        label={"Nieuwsbrief"}
                        name={"newsletter"}
                        checked={newsletter}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                    </div>
                </PanelFooter>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        contactDetails: state.contactDetails,
        lastNamePrefixes: state.systemData.lastNamePrefixes,
        personTypes: state.systemData.personTypes,
        contactStatuses: state.systemData.contactStatuses,
        titles: state.systemData.titles,
    };
};

const mapDispatchToProps = dispatch => ({
    updatePerson: (id) => {
        dispatch(updatePerson(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormPersonalEdit);
