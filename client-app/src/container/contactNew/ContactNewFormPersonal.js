import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import moment from 'moment';
import validator from 'validator';

import PersonAPI from '../../api/PersonAPI';
import AccountAPI from '../../api/AccountAPI';
import InputText from '../../components/form/InputText';
import InputSelect from '../../components/form/InputSelect';
import InputCheckbox from '../../components/form/InputCheckbox';
import InputDate from '../../components/form/InputDate';
import ButtonText from '../../components/button/ButtonText';
import PanelFooter from "../../components/panel/PanelFooter";

class ContactNewFormPersonal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            accountPeek: [],
            person: {
                id: '',
                number: '',
                createdAt: '',
                titleId: '',
                statusId: '',
                firstName: '',
                lastNamePrefixId: '',
                lastName: '',
                memberSince: '',
                memberUntil: '',
                typeId: '',
                accountId: props.accountId || '',
                dateOfBirth: '',
                newsletter: false,
                occupationId: '',
            },
            errors: {
                name: false,
                statusId: false,
            },
        }
    };

    componentDidMount() {
        AccountAPI.getAccountPeek().then(payload => {
            this.setState({
                ...this.state,
                accountPeek: payload,
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
        !hasErrors &&
            PersonAPI.newPerson(person).then((payload) => {
                hashHistory.push(`/contact/${payload.id}`);
            });
    };

    render() {
        const { typeId, statusId, titleId, firstName, lastNamePrefixId, lastName, memberSince, accountId, dateOfBirth, newsletter, occupationId } = this.state.person;

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
                        label="Voornaam"
                        size={"col-sm-6"}
                        name="firstName"
                        value={firstName}
                        onChangeAction={this.handleInputChange}
                        required={lastName === '' && "required"}
                        error={this.state.errors.name}
                    />
                    <InputDate
                        label={"Lid sinds"}
                        name="memberSince"
                        value={ memberSince }
                        onChangeAction={this.handleChangeMemberSince}
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
                    <InputText
                        label={"Opzegdatum"}
                        name={"memberUntil"}
                        value={ '' }
                        readOnly={true}
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
                        readOnly={true}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label={"Geboortedatum"}
                        name={"dateOfBirth"}
                        value={ dateOfBirth }
                        onChangeAction={this.handleChangeDateOfBirth}
                    />
                    <InputSelect
                        label={"Organisatie"}
                        name={"accountId"}
                        options={this.state.accountPeek}
                        value={accountId}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    { accountId !== '' ?
                        <InputSelect
                            label={"Functie"}
                            size={"col-sm-6"}
                            name={"occupationId"}
                            options={this.props.occupations}
                            value={occupationId}
                            onChangeAction={this.handleInputChange}
                        />
                        :
                        <div className="form-group col-sm-6"/>
                    }

                    <InputCheckbox
                        label={"Nieuwsbrief"}
                        name={"newsletter"}
                        checked={newsletter}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
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
        titles: state.systemData.titles,
    };
};

export default connect(mapStateToProps)(ContactNewFormPersonal);
