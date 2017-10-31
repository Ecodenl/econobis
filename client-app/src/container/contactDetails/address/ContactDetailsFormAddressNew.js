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
            contactId: this.props.id,
            street: '',
            number: '',
            postalCode: '',
            city: '',
            type: 'visit',
            primary: false,
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

        const address = this.state;

        AddressAPI.newAddress(address).then((payload) => {
            if(payload.status === 422) {
                payload.data.errors.type ? this.setState({errorType: true}) : this.setState({errorType: false});
            }else{
                newAddress(payload);
                this.props.toggleShowNew();
            }
        });
    };

    render() {
        const {street, number, postalCode, city, type, primary, errorType} = this.state;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={"Postcode"}
                                id={"postcode"}
                                size={"col-sm-4"}
                                name={"postalCode"}
                                value={postalCode}
                                onChangeAction={ this.handleInputChange }
                                maxLength={"7"}
                            />
                            <InputText
                                label={"Nummer"}
                                id={"nummer"}
                                size={"col-sm-3"}
                                name={"number"}
                                value={number}
                                onChangeAction={this.handleInputChange}
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
                                name={"type"}
                                options={this.props.addressTypes}
                                value={type}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={errorType}
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
