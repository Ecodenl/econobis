import React, {Component} from 'react';
import {connect} from 'react-redux';
import validator from 'validator';

import PhoneNumberApi from '../../../../api/contact/PhoneNumberAPI';
import { newPhoneNumber } from '../../../../actions/contact/ContactDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import InputCheckbox from "../../../../components/form/InputCheckbox";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

class ContactDetailsFormPhoneNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            phoneNumber: {
                contactId: this.props.id,
                number: '',
                typeId: '',
                primary: false,
            },
            errors: {
                typeId: false,
                number: false,
            },
        }
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            phoneNumber: {
                ...this.state.phoneNumber,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { phoneNumber } = this.state;
        // Validation
        let errors = {};
        let hasErrors = false;

        if(validator.isEmpty(phoneNumber.number)){
            errors.number = true;
            hasErrors = true;
        };

        if(validator.isEmpty(phoneNumber.typeId)){
            errors.typeId = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            PhoneNumberApi.newPhoneNumber(phoneNumber).then((payload) => {
                this.props.newPhoneNumber(payload);
                this.props.toggleShowNew();
            });
    };

    render() {
        const {number, typeId, primary} = this.state.phoneNumber;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Nummer"}
                                size={"col-sm-6"}
                                name={"number"}
                                value={number}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.number}
                            />

                            <InputSelect
                                label={"Type"}
                                size={"col-sm-6"}
                                name={"typeId"}
                                options={this.props.phoneNumberTypes}
                                value={typeId}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.typeId}
                            />
                        </div>


                        <div className="row">
                            <InputCheckbox
                                label={"Primair telefoonnummer"}
                                name={"primary"}
                                checked={primary}
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
        phoneNumberTypes: state.systemData.phoneNumberTypes,
        id: state.contactDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newPhoneNumber: (id) => {
        dispatch(newPhoneNumber(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormPhoneNew);