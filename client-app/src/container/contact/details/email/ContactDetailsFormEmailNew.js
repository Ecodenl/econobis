import React, { Component } from 'react';
import { connect } from 'react-redux';
import validator from 'validator';

import EmailAddressAPI from '../../../../api/contact/EmailAddressAPI';
import {newEmailAddress, unsetPrimaryEmailAddresses} from '../../../../actions/contact/ContactDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputToggle from "../../../../components/form/InputToggle";

class ContactDetailsFormEmailNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emailAddress: {
                contactId: this.props.id,
                email: '',
                typeId: 'home',
                primary: false,
            },
            errors: {
                typeId: false,
                email: false,
            },
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            emailAddress: {
                ...this.state.emailAddress,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { emailAddress } = this.state;

        let errors = {};
        let hasErrors = false;

        if(!validator.isEmail(emailAddress.email)){
            errors.email = true;
            hasErrors = true;
        };

        if(validator.isEmpty(emailAddress.typeId)){
            errors.typeId = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            EmailAddressAPI.newEmailAddress(emailAddress).then((payload) => {
                if(emailAddress.primary) {
                    this.props.unsetPrimaryEmailAddresses();
                }
                this.props.newEmailAddress(payload);
                this.props.toggleShowNew();
            });
    };

    render() {
        const {email, typeId, primary} = this.state.emailAddress;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"E-mail"}
                                id={"email"}
                                size={"col-sm-6"}
                                name={"email"}
                                value={email}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.email}
                            />

                            <InputSelect
                                label={"Type"}
                                id="type"
                                size={"col-sm-6"}
                                name={"typeId"}
                                options={this.props.emailAddressTypes}
                                value={typeId}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.typeId}
                            />
                        </div>

                        <div className="row">
                            <InputToggle
                                label={"Primair e-mailadres"}
                                name={"primary"}
                                value={primary}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={this.props.toggleShowNew}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        emailAddressTypes: state.systemData.emailAddressTypes,
        id: state.contactDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newEmailAddress: (id) => {
        dispatch(newEmailAddress(id));
    },
    unsetPrimaryEmailAddresses: () => {
        dispatch(unsetPrimaryEmailAddresses());
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormEmailNew);