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
            contactId: this.props.id,
            number: '',
            type: '',
            primary: false,
            errorNumber: false,
            errorType: false,
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

    handleSubmit = event => {
        event.preventDefault();

        const phoneNumber = this.state;

        PhoneNumberApi.newPhoneNumber(phoneNumber).then((payload) => {
            if(payload.status === 422) {
                payload.data.errors.number ? this.setState({errorNumber: true}) : this.setState({errorNumber: false});
                payload.data.errors.type ? this.setState({errorType: true}) : this.setState({errorType: false});
            }else{
                this.props.newPhoneNumber(payload);
                this.props.toggleShowNew();
            }
        });
    };

    render() {
        const {number, type, primary, errorNumber, errorType} = this.state;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Nummer"}
                                id={"nummer"}
                                size={"col-sm-6"}
                                name={"number"}
                                value={number}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={errorNumber}
                            />

                            <InputSelect
                                label={"Type"}
                                id="type"
                                size={"col-sm-6"}
                                name={"type"}
                                options={this.props.phoneNumberTypes}
                                value={type}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={errorType}
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