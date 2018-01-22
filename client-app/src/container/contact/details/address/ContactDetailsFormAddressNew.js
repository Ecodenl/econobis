import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddressAPI from '../../../../api/contact/AddressAPI';
import { newAddress } from '../../../../actions/contact/ContactDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import InputCheckbox from "../../../../components/form/InputCheckbox";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import validator from "validator";

class ContactDetailsFormAddressNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            address: {
                contactId: this.props.id,
                street: '',
                number: '',
                postalCode: '',
                city: '',
                typeId: 'visit',
                primary: false,
            },
            errors: {
                typeId: false,
                postalCode: false,
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
            address: {
                ...this.state.address,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { address } = this.state;

        let errors = {};
        let hasErrors = false;

        if(!validator.isPostalCode(address.postalCode, 'NL')){
            errors.postalCode = true;
            hasErrors = true;
        };

        if(validator.isEmpty(address.number)){
            errors.number = true;
            hasErrors = true;
        };

        if(validator.isEmpty(address.typeId)){
            errors.typeId = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            AddressAPI.newAddress(address).then((payload) => {
                this.props.newAddress(payload);
                this.props.toggleShowNew();
            });
    };

    render() {
        const {street, number, postalCode, city, typeId, primary } = this.state.address;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Postcode"}
                                id={"postcode"}
                                size={"col-sm-4"}
                                maxLength={"7"}
                                name={"postalCode"}
                                value={postalCode}
                                onChangeAction={ this.handleInputChange }
                                required={"required"}
                                error={this.state.errors.postalCode}

                            />
                            <InputText
                                label={"Nummer"}
                                id={"nummer"}
                                size={"col-sm-3"}
                                name={"number"}
                                value={number}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.number}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={"Adres"}
                                id={"adres"}
                                size={"col-sm-6"}
                                name={"street"}
                                value={street}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label={"Plaats"}
                                id={"plaats"}
                                size={"col-sm-6"}
                                name={"city"}
                                value={city}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={"Type"}
                                id="type"
                                size={"col-sm-6"}
                                name={"typeId"}
                                options={this.props.addressTypes}
                                value={typeId}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.typeId}
                            />
                            <InputCheckbox
                                label={"Primair adres"}
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
        addressTypes: state.systemData.addressTypes,
        id: state.contactDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newAddress: (id) => {
        dispatch(newAddress(id));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormAddressNew);
