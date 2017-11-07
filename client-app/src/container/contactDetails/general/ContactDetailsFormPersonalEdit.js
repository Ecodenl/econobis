import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import { updatePerson } from '../../../actions/ContactDetailsActions';
import PersonAPI from '../../../api/PersonAPI';
import AccountAPI from '../../../api/AccountAPI';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import InputCheckbox from "../../../components/form/InputCheckbox";
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';

class ContactDetailsFormPersonalEdit extends Component {
    constructor(props) {
        super(props);

        const { number, createdAt, person, status, memberSince = {}, memberUntil = {}, newsletter } = props.contactDetails;

        this.state = {
            accountPeek: [
                {
                    id: person.account ? person.account.id : '',
                    name: person.account ? person.account.name : '',
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
                accountId: person.account ? person.account.id : '',
                dateOfBirth: person.dateOfBirth ? moment(person.dateOfBirth.date).format('Y-MM-DD') : '',
                newsletter: newsletter
            },
            statusIdError: false,
            firstNameError: false,
            lastNameError: false,
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
        const value = moment(date).format('Y-MM-DD');

        this.setState({
            ...this.state,
            person: {
                ...this.state.person,
                memberSince: value
            },
        });
    };

    handleChangeMemberUntilDate = (date) => {
        const value = moment(date).format('Y-MM-DD');

        this.setState({
            ...this.state,
            person: {
                ...this.state.person,
                memberUntil: value
            },
        });
    };

    handleChangeDateOfBirth = (date) => {
        const value = moment(date).format('Y-MM-DD');

        this.setState({
            ...this.state,
            person: {
                ...this.state.person,
                dateOfBirth: value
            },
        });
    };

    validateForm(fieldNames) {
        fieldNames.map((fieldName) => {
            switch(fieldName) {
                case 'statusId':
                case 'firstName':
                case 'lastName':
                    this.state.person[fieldName].length === 0 ?
                        this.processError(fieldName + 'Error', true)
                        :
                        this.processError(fieldName + 'Error', false)
                    break;
                default:
                    break;
            }
        });
    };

    processError(fieldName, value) {
        this.setState({
            [fieldName]: value,
        })
    };

    handleSubmit = event => {
        event.preventDefault();

        this.validateForm([
            'statusId',
            'firstName',
            'lastName',
        ]);

        const { person }  = this.state;

        // Temp solution
        setTimeout(() => {
            !this.state.statusIdError && !this.state.firstNameError && !this.state.lastNameError &&
                PersonAPI.updatePerson(person).then((payload) => {
                    this.props.updatePerson(payload);
                    this.props.switchToView();
                });
        }, 100);
    };

    render() {
        const {number, createdAt, titleId, statusId, typeId, firstName, lastNamePrefixId, lastName, memberSince, memberUntil, accountId, dateOfBirth, newsletter} = this.state.person;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
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
                        options={ [{id: 1, name: 'Dhr'}, {id: 2, name: 'Mevr'} ] }
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
                        error={this.state.statusIdError}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Voornaam"
                        size={"col-sm-6"}
                        name={"firstName"}
                        value={firstName}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.firstNameError}
                    />
                    <InputDate
                        label={"Lid sinds"}
                        size={"col-sm-6"}
                        name={"memberSince"}
                        value={ memberSince && moment(memberSince).format('DD-MM-Y') }
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
                        value={ memberUntil && moment(memberUntil).format('DD-MM-Y') }
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
                        required={"required"}
                        error={this.state.lastNameError}
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
                    <InputSelect
                        label={"Organisatie"}
                        size={"col-sm-6"}
                        name={"accountId"}
                        options={this.state.accountPeek}
                        value={accountId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputDate
                        label={"Geboortedatum"}
                        size={"col-sm-6"}
                        name={"dateOfBirth"}
                        value={ dateOfBirth && moment(dateOfBirth).format('DD-MM-Y') }
                        onChangeAction={this.handleChangeDateOfBirth}
                    />
                </div>
                <div className="row">
                    <InputCheckbox
                        label={"Nieuwsbrief"}
                        name={"newsletter"}
                        checked={newsletter}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="panel-footer">
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit}/>
                    </div>
                </div>
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
    };
};

const mapDispatchToProps = dispatch => ({
    updatePerson: (id) => {
        dispatch(updatePerson(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormPersonalEdit);
