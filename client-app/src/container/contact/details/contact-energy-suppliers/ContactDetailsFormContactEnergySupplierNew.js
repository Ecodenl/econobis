import React, { Component } from 'react';
import { connect } from 'react-redux';

import ContactEnergySupplierAPI from '../../../../api/contact/ContactEnergySupplierAPI';
import {newContactEnergySupplier} from '../../../../actions/contact/ContactDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import validator from "validator";
import InputToggle from "../../../../components/form/InputToggle";
import InputDate from "../../../../components/form/InputDate";

class ContactDetailsFormContactEnergySupplierNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            contactEnergySupplier: {
                contactId: this.props.id,
                energySupplierId: '',
                type: '',
                memberSince: '',
                eanElectricity: '',
                eanGas: '',
                contactEnergySupplyStatusId: '',
                switchDate: ''
            },
            errors: {
                energySupplierId: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            contactEnergySupplier: {
                ...this.state.contactEnergySupplier,
                [name]: value
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            contactEnergySupplier: {
                ...this.state.contactEnergySupplier,
                [name]: value
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { contactEnergySupplier } = this.state;

        let errors = {};
        let hasErrors = false;


        if(validator.isEmpty(contactEnergySupplier.energySupplierId)){
            errors.number = true;
            hasErrors = true;
        };

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            ContactEnergySupplierAPI.newContactEnergySupplier(contactEnergySupplier).then((payload) => {
                this.props.newContactEnergySupplier(payload);
                this.props.toggleShowNew();
            });
    };

    render() {
        const {energySupplierId, type, memberSince, eanElectricity, eanGas, contactEnergySupplyStatusId, switchDate } = this.state.contactEnergySupplier;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={"Energieleverancier"}
                                id="energySupplierId"
                                name={"energySupplierId"}
                                options={this.props.energySuppliers}
                                value={energySupplierId}
                                onChangeAction={this.handleInputChange}
                                required={"required"}
                                error={this.state.errors.energySupplierId}
                            />
                            <InputText
                                label={"Type"}
                                id={"type"}
                                name={"type"}
                                value={type}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Klant sinds"
                                name="memberSince"
                                value={memberSince}
                                onChangeAction={this.handleInputChangeDate}
                            />
                            <InputText
                                label={"Ean electriciteit"}
                                id={"eanElectricity"}
                                name={"eanElectricity"}
                                value={eanElectricity}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={"Ean gas"}
                                id={"eanGas"}
                                name={"eanGas"}
                                value={eanGas}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputSelect
                                label={"Overstap status"}
                                id="contactEnergySupplyStatusId"
                                name={"contactEnergySupplyStatusId"}
                                options={this.props.contactEnergySupplierStatus}
                                value={contactEnergySupplyStatusId}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Mogelijke overstap datum"
                                name="switchDate"
                                value={switchDate}
                                onChangeAction={this.handleInputChangeDate}
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
        energySuppliers: state.systemData.energySuppliers,
        contactEnergySupplierStatus: state.systemData.contactEnergySupplierStatus,
        id: state.contactDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newContactEnergySupplier: (contactEnergySupplier) => {
        dispatch(newContactEnergySupplier(contactEnergySupplier));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormContactEnergySupplierNew);
