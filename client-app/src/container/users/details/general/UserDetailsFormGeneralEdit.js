import React, {Component} from 'react';
import { connect } from 'react-redux';
import { hashHistory } from 'react-router';
import validator from 'validator';

import UserAPI from '../../../../api/user/UserAPI';
import { updateUser } from '../../../../actions/user/UserDetailsActions';
import InputText from '../../../../components/form/InputText';
import InputSelect from '../../../../components/form/InputSelect';
import InputCheckbox from '../../../../components/form/InputCheckbox';
import ButtonText from '../../../../components/button/ButtonText';
import PanelFooter from "../../../../components/panel/PanelFooter";

class UserDetailsFormGeneralEdit extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                ...this.props.userDetails,
                titleId: this.props.userDetails.title ? this.props.userDetails.title.id : '',
                lastNamePrefixId: this.props.userDetails.lastNamePrefix ? this.props.userDetails.lastNamePrefix.id : '',
                testArray: ['test1', 'test2'],
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
            UserAPI.updateUser(user).then((payload) => {
                this.props.updateUser(payload);
                this.props.switchToView();
            });
    };

    render() {
        const { email, titleId, firstName, lastNamePrefixId, lastName, phoneNumber, mobile, occupation, active } = this.state.user;

        return (
            <form className="form-horizontal col-md-12" onSubmit={this.handleSubmit}>
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

                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName={"btn-default"} buttonText={"Sluiten"} onClickAction={this.props.switchToView}/>
                        <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                    </div>
                </PanelFooter>
            </form>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        userDetails: state.userDetails,
        lastNamePrefixes: state.systemData.lastNamePrefixes,
        titles: state.systemData.titles,
    };
};

const mapDispatchToProps = dispatch => ({
    updateUser: (id) => {
        dispatch(updateUser(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsFormGeneralEdit);
