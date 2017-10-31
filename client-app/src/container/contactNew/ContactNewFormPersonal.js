import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import moment from 'moment';

import PersonAPI from '../../api/PersonAPI';
import AccountAPI from '../../api/AccountAPI';
import InputText from '../../components/form/InputText';
import InputSelect from '../../components/form/InputSelect';
import InputCheckbox from '../../components/form/InputCheckbox';
import InputDate from '../../components/form/InputDate';
import ButtonText from '../../components/button/ButtonText';

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
                accountId: '',
                dateOfBirth: '',
                newsletter: false,
            },
            errorStatus: false,
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

    handleSubmit = event => {
        event.preventDefault();

        const person = {
            ...this.state.person,
        };

        PersonAPI.newPerson(person).then((payload) => {
            if(payload.status === 422) {
                payload.data.errors.status ? this.setState({errorStatus: true}) : this.setState({errorStatus: false});
            }else{
                hashHistory.push(`/contact/${payload.id}`);
            }
        });
    };

    render() {
        const { typeId, statusId, titleId, firstName, lastNamePrefixId, lastName, memberSince, accountId, dateOfBirth, newsletter } = this.state.person;

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
                        options={ [{id: 1, name: 'De heer'}, {id: 2, name: 'Mevrouw'} ] }
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
                        error={this.state.errorStatus}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Voornaam"
                        size={"col-sm-6"}
                        name="firstName"
                        value={firstName}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                    />
                    <InputDate
                        label={"Lid sinds"}
                        name="memberSince"
                        value={ memberSince && moment(memberSince).format('DD-MM-Y') }
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
                        required={"required"}
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
                    <InputSelect
                        label={"Organisatie"}
                        name={"accountId"}
                        options={this.state.accountPeek}
                        value={accountId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputDate
                        label={"Geboortedatum"}
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
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Sluiten"} onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit}/>
                    </div>
                </div>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        lastNamePrefixes: state.systemData.lastNamePrefixes,
        personTypes: state.systemData.personTypes,
        contactStatuses: state.systemData.contactStatuses,
    };
};

export default connect(mapStateToProps)(ContactNewFormPersonal);
