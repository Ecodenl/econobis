import React, {Component} from 'react';
import {connect} from 'react-redux';

import PhoneNumberApi from '../../../api/PhoneNumberAPI';
import { newPhoneNumber } from '../../../actions/ContactDetailsActions';
import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import InputSelect from "../../../components/form/InputSelect";
import InputCheckbox from "../../../components/form/InputCheckbox";
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

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
            numberError: false,
            typeIdError: false,
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

    processError(fieldName, value) {
        this.setState({
            [fieldName]: value,
        })
    };

    validateForm(fieldNames) {
        fieldNames.map((fieldName) => {
            switch(fieldName) {
                case 'typeId':
                case 'number':
                    this.state.phoneNumber[fieldName].length === 0 ?
                        this.processError(fieldName + 'Error', true)
                        :
                        this.processError(fieldName + 'Error', false)
                    break;
                default:
                    break;
            }
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.validateForm([
            'typeId',
            'number',
        ]);

        const { phoneNumber } = this.state;

        // Temp solution
        setTimeout(() => {
            !this.state.typeIdError && !this.state.numberError &&
                PhoneNumberApi.newPhoneNumber(phoneNumber).then((payload) => {
                    this.props.newPhoneNumber(payload);
                    this.props.toggleShowNew();
                });
        }, 100);
    };

    render() {
        const {number, typeId, primary} = this.state.phoneNumber;
        const {numberError, typeIdError } = this.state;

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
                                error={numberError}
                            />

                            <InputSelect
                                label={"Type"}
                                size={"col-sm-6"}
                                name={"typeId"}
                                options={this.props.phoneNumberTypes}
                                value={typeId}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={typeIdError}
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
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Sluiten"} onClickAction={this.props.toggleShowNew}/>
                            <ButtonText buttonText={"Toevoegen"} onClickAction={this.handleSubmit} type={"submit"} value={"Submit"}/>
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