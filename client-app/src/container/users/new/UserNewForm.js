import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import validator from 'validator';

import passwordValidator from '../../../helpers/PasswordValidator';
import UserAPI from '../../../api/user/UserAPI';
import InputText from '../../../components/form/InputText';
import InputSelect from '../../../components/form/InputSelect';
import ButtonText from '../../../components/button/ButtonText';
import PanelFooter from "../../../components/panel/PanelFooter";
import {setError} from "../../../actions/general/ErrorActions";
import {fetchSystemData} from "../../../actions/general/SystemDataActions";

class UserNewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                id: '',
                email: '',
                alfrescoPassword: '',
                titleId: '',
                firstName: '',
                lastNamePrefixId: '',
                lastName: '',
                telephoneNumber: '',
                mobileNumber: '',
                occupation: '',
            },
            errors: {
                email: false,
                alfrescoPassword: false,
                firstName: false,
                lastName: false,
            },
        };
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

        if(!passwordValidator(user.alfrescoPassword)){
            errors.alfrescoPassword = true;
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

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            UserAPI.newUser(user).then((payload) => {
                this.props.fetchSystemData();
                hashHistory.push(`/gebruiker/${payload.data.data.id}`);
            }).catch(function (error) {
                if(error.response.data.errors && typeof error.response.data.errors.email !== 'undefined'){
                    errors.email = true;
                    this.setState({ ...this.state, errors: errors });
                    this.setState({ ...this.state, backendEmailError: 'Dit email adres is al in gebruik.' });
                }
                else{
                    this.props.setError(error.response.status);
                }
            }.bind(this));
    };

    render() {
        const { email, alfrescoPassword, titleId, firstName, lastNamePrefixId, lastName, telephoneNumber, mobileNumber, occupation } = this.state.user;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="row">
                    <InputSelect
                        label="Aanspreektitel"
                        name={"titleId"}
                        options={this.props.titles}
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
                        errorMessage={this.state.backendEmailError}
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
                        name="telephoneNumber"
                        value={telephoneNumber}
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
                        name="mobileNumber"
                        value={mobileNumber}
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
                    <InputText
                        type={"password"}
                        label={"Alfresco wachtwoord"}
                        name={"alfrescoPassword"}
                        value={alfrescoPassword}
                        onChangeAction={this.handleInputChange}
                        required={"required"}
                        error={this.state.errors.alfrescoPassword}
                        errorMessage={'Het wachtwoord moet minmaal 8 karakters lang zijn en moet minimaal 1 cijfer en  1 hoofdletter bevatten.'}
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
        titles: state.systemData.titles,
    };
};

const mapDispatchToProps = dispatch => ({
    setError: (http_code) => {
        dispatch(setError(http_code));
    },
    fetchSystemData: () => {
        dispatch(fetchSystemData());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserNewForm);
