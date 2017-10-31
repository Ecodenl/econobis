import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddressAPI from '../../../api/AddressAPI';
import { newAddress } from '../../../actions/ContactDetailsActions';
import InputText from '../../../components/form/InputText';
import ButtonText from '../../../components/button/ButtonText';
import InputSelect from "../../../components/form/InputSelect";
import InputCheckbox from "../../../components/form/InputCheckbox";
import Panel from '../../../components/panel/Panel';
import PanelBody from '../../../components/panel/PanelBody';

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
            typeIdError: false,
            postalCodeError: false,
            numberError: false,
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

    processError(fieldName, value) {
        this.setState({
            [fieldName]: value,
        })
    };

    validateForm(fieldNames) {
        fieldNames.map((fieldName) => {
            switch(fieldName) {
                case 'typeId':
                case 'postalCode':
                case 'number':
                    this.state.address[fieldName].length === 0 ?
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
            'postalCode',
        ]);

        const { address } = this.state;

        // Temp solution
        setTimeout(() => {
            !this.state.typeIdError && !this.state.postalCodeError && !this.state.numberError &&
                AddressAPI.newAddress(address).then((payload) => {
                    this.props.newAddress(payload);
                    this.props.toggleShowNew();
                });
        }, 100);
    };

    render() {
        const {street, number, postalCode, city, typeId, primary } = this.state.address;
        const {postalCodeError, numberError, typeIdError } = this.state;

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
                                error={postalCodeError}

                            />
                            <InputText
                                label={"Nummer"}
                                id={"nummer"}
                                size={"col-sm-3"}
                                name={"number"}
                                value={number}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={numberError}
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
                                error={typeIdError}
                            />
                            <InputCheckbox
                                label={"Primair adres"}
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
