import React, {Component} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import * as ContactDetailsActions from '../../../actions/ContactDetailsActions';
import PersonAPI from '../../../api/PersonAPI';
import InputText from '../../../components/form/InputText';
import InputCheckbox from '../../../components/form/InputCheckbox';
import InputDate from '../../../components/form/InputDate';
import ButtonText from '../../../components/button/ButtonText';

class ContactDetailsFormOtherPersonEdit extends Component {
    constructor(props) {
        super(props);

        const {  person, iban, liable, liabilityAmount } = props.contactDetails;

        this.state = {
            id: person.id,
            firstNamePartner: person.firstNamePartner,
            lastNamePartner: person.lastNamePartner,
            dateOfBirthPartner: person.dateOfBirthPartner ? moment(person.dateOfBirthPartner).format('Y-MM-DD') : '',
            iban: iban,
            liable: liable,
            liabilityAmount: liabilityAmount,
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    };

    handleChangeDateOfBirthPartner = (date) => {
        const value = moment(date).format('Y-MM-DD');

        this.setState({
            ...this.state,
            dateOfBirthPartner: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const person = {
            ...this.state,
        };

        PersonAPI.updatePerson(person).then((payload) => {
            this.props.dispatch(ContactDetailsActions.updatePerson(payload));
        });

        this.props.switchToView();
    };

    render() {
        const { firstNamePartner, lastNamePartner, dateOfBirthPartner, iban, liable, liabilityAmount  } = this.state;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputText
                        label="Voornaam partner"
                        name={"firstNamePartner"}
                        value={firstNamePartner}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"IBAN"}
                        name={"iban"}
                        value={iban}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Achternaam partner"
                        name={"lastNamePartner"}
                        value={lastNamePartner}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputCheckbox
                        label={"Aansprakelijkheid"}
                        name={"liable"}
                        checked={liable}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputDate
                        label="Geboortedatum partner"
                        name={"dateOfBirthPartner"}
                        value={ dateOfBirthPartner && moment(dateOfBirthPartner).format('DD-MM-Y') }
                        onChangeAction={this.handleChangeDateOfBirthPartner}
                    />
                    <InputText
                        type={"number"}
                        label={"Aansprakelijkheidsbedrag"}
                        name={"liabilityAmount"}
                        value={liabilityAmount}
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
    };
};

export default connect(mapStateToProps)(ContactDetailsFormOtherPersonEdit);
