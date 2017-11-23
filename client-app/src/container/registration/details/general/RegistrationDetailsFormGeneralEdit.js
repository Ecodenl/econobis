import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import validator from 'validator';

import UserAPI from '../../../../api/UserAPI';
import { updateUser } from '../../../../actions/UserDetailsActions';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputCheckbox from '../../../../components/form/InputCheckbox';
import ButtonText from '../../../../components/button/ButtonText';

class RegistrationDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                ...this.props.userDetails,
                titleId: this.props.userDetails.title ? this.props.userDetails.title.id : '',
                lastNamePrefixId: this.props.userDetails.lastNamePrefix ? this.props.userDetails.lastNamePrefix.id : '',
            },
            errors: {
                email: false,
                firstName: false,
                lastName: false,
            },
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { user }  = this.state;

        // Validation
        let errors = {};
        let hasErrors = false;

        if(!validator.isEmail(user.email)){
            errors.email = true;
            hasErrors = true;
        };

        if(validator.isEmpty(user.firstName)){
            errors.firstName = true;
            hasErrors = true;
        };

        if(validator.isEmpty(user.lastName)){
            errors.lastName = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors })

        // If no errors send form
        !hasErrors &&
            RegistrationAPI.updateRegistration(user).then((payload) => {
                this.props.updateRegistration(payload);
                this.props.switchToView();
            });
    };

    render() {
        const { email, titleId, firstName, lastNamePrefixId, lastName, phoneNumber, mobile, occupation, active } = this.state.user;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputSelect
                        label="Aanspreektitel"
                        name={"titleId"}
                        options={ [{id: 1, name: 'De heer'}, {id: 2, name: 'Mevrouw'} ] }
                        value={titleId}
                        onChangeAction={this.handleInputChange}
                    />
                    <InputText
                        label={"E-mail"}
                        name={"email"}
                        value={email}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.email}
                    />
                </div>

                <div className="row">
                    <InputText
                        label={"Voornaam"}
                        name={"firstName"}
                        value={firstName}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.firstName}
                    />
                    <InputText
                        label={"Telefoonnummer"}
                        size={"col-sm-6"}
                        name="phoneNumber"
                        value={phoneNumber}
                        onChangeAction={this.handleInputChange}
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
                        label={"Mobiel nummer"}
                        size={"col-sm-6"}
                        name="mobile"
                        value={mobile}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputText
                        label="Achternaam"
                        size={"col-sm-6"}
                        name="lastName"
                        value={lastName}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.lastName}
                    />
                    <InputText
                        label="Functie"
                        size={"col-sm-6"}
                        name="occupation"
                        value={occupation}
                        onChangeAction={this.handleInputChange}
                    />
                </div>

                <div className="row">
                    <InputCheckbox
                        label={"Actief"}
                        name={"active"}
                        checked={active}
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
        userDetails: state.userDetails,
        lastNamePrefixes: state.systemData.lastNamePrefixes,
    };
};

const mapDispatchToProps = dispatch => ({
    updateRegistration: (id) => {
        dispatch(updateRegistration(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationDetailsFormGeneralEdit);
