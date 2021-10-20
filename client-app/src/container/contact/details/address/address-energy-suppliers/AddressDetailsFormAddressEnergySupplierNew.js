import React, { Component } from 'react';
import { connect } from 'react-redux';

import AddressEnergySupplierAPI from '../../../../../api/contact/AddressEnergySupplierAPI';
import { newAddressEnergySupplier } from '../../../../../actions/contact/ContactDetailsActions';
import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import InputSelect from '../../../../../components/form/InputSelect';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import validator from 'validator';
import InputToggle from '../../../../../components/form/InputToggle';
import InputDate from '../../../../../components/form/InputDate';

class AddressDetailsFormAddressEnergySupplierNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressEnergySupplier: {
                contactId: this.props.id,
                energySupplierId: '',
                energySupplyTypeId: '',
                memberSince: '',
                eanElectricity: '',
                eanGas: '',
                energySupplyStatusId: '',
                switchDate: '',
                esNumber: '',
                isCurrentSupplier: false,
            },
            errors: {
                energySupplierId: false,
                energySupplyTypeId: false,
                memberSince: false,
            },
        };

        this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
    }

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            addressEnergySupplier: {
                ...this.state.addressEnergySupplier,
                [name]: value,
            },
        });
    };

    handleInputChangeDate(value, name) {
        this.setState({
            ...this.state,
            addressEnergySupplier: {
                ...this.state.addressEnergySupplier,
                [name]: value,
            },
        });
    }

    handleSubmit = event => {
        event.preventDefault();

        const { addressEnergySupplier } = this.state;

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(addressEnergySupplier.energySupplierId)) {
            errors.energySupplierId = true;
            hasErrors = true;
        }

        if (validator.isEmpty(addressEnergySupplier.energySupplyTypeId)) {
            errors.energySupplyTypeId = true;
            hasErrors = true;
        }

        if (
            addressEnergySupplier.isCurrentSupplier &&
            (!addressEnergySupplier.memberSince || validator.isEmpty(addressEnergySupplier.memberSince))
        ) {
            errors.memberSince = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            AddressEnergySupplierAPI.newAddressEnergySupplier(addressEnergySupplier).then(payload => {
                this.props.newAddressEnergySupplier(payload);
                this.props.toggleShowNew();
            });
    };

    render() {
        const {
            energySupplierId,
            energySupplyTypeId,
            memberSince,
            eanElectricity,
            eanGas,
            energySupplyStatusId,
            switchDate,
            esNumber,
            isCurrentSupplier,
        } = this.state.addressEnergySupplier;

        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={'Energieleverancier'}
                                id="energySupplierId"
                                name={'energySupplierId'}
                                options={this.props.energySuppliers}
                                value={energySupplierId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.energySupplierId}
                            />
                            <InputSelect
                                label={'Type'}
                                id="energySupplyTypeId"
                                name={'energySupplyTypeId'}
                                options={this.props.energySupplierTypes}
                                value={energySupplyTypeId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={this.state.errors.energySupplyTypeId}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Klant sinds"
                                name="memberSince"
                                value={memberSince ? memberSince : ''}
                                onChangeAction={this.handleInputChangeDate}
                                required={isCurrentSupplier ? 'required' : ''}
                                error={this.state.errors.memberSince}
                            />
                            <InputText
                                label={'EAN electriciteit'}
                                id={'eanElectricity'}
                                name={'eanElectricity'}
                                value={eanElectricity}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={'EAN gas'}
                                id={'eanGas'}
                                name={'eanGas'}
                                value={eanGas}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputSelect
                                label={'Overstap status'}
                                id="energySupplyStatusId"
                                name={'energySupplyStatusId'}
                                options={this.props.energySupplierStatuses}
                                value={energySupplyStatusId}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Mogelijke overstap datum"
                                name="switchDate"
                                value={switchDate ? switchDate : ''}
                                onChangeAction={this.handleInputChangeDate}
                            />
                            <InputText
                                label={'Klantnummer'}
                                id={'esNumber'}
                                name={'esNumber'}
                                value={esNumber}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputToggle
                                label={'Is huidige leverancier'}
                                name={'isCurrentSupplier'}
                                value={Boolean(isCurrentSupplier)}
                                onChangeAction={this.handleInputChange}
                                disabled={validator.isEmpty('' + memberSince)}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={this.props.toggleShowNew}
                            />
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={this.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        );
    }
}

const mapStateToProps = state => {
    return {
        energySuppliers: state.systemData.energySuppliers,
        energySupplierStatuses: state.systemData.energySupplierStatuses,
        energySupplierTypes: state.systemData.energySupplierTypes,
        id: state.contactDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newAddressEnergySupplier: addressEnergySupplier => {
        dispatch(newAddressEnergySupplier(addressEnergySupplier));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetailsFormAddressEnergySupplierNew);
