import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setError } from '../../../../../actions/general/ErrorActions';
import AddressEnergySupplierAPI from '../../../../../api/contact/AddressEnergySupplierAPI';
import { newStateAddressEnergySupplier } from '../../../../../actions/contact/ContactDetailsActions';
import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import InputSelect from '../../../../../components/form/InputSelect';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import validator from 'validator';
import InputDate from '../../../../../components/form/InputDate';

class AddressDetailsFormAddressEnergySupplierNew extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showWarningEsNumber: true,
            addressEnergySupplier: {
                addressId: this.props.addressId,
                energySupplierId: '',
                energySupplyTypeId: '',
                memberSince: '',
                energySupplyStatusId: '',
                switchDate: '',
                endDate: '',
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

        if (name == 'esNumber') {
            this.setState({
                ...this.state,
                addressEnergySupplier: {
                    ...this.state.addressEnergySupplier,
                    [name]: value,
                },
                showWarningEsNumber: true,
            });
        } else {
            this.setState({
                ...this.state,
                addressEnergySupplier: {
                    ...this.state.addressEnergySupplier,
                    [name]: value,
                },
            });
        }
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

    toggleShowWarningEsNumber() {
        this.setState({
            ...this.state,
            showWarningEsNumber: !this.state.showWarningEsNumber,
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

        if (!addressEnergySupplier.memberSince || validator.isEmpty(addressEnergySupplier.memberSince)) {
            errors.memberSince = true;
            hasErrors = true;
        }

        if (
            !hasErrors &&
            addressEnergySupplier.endDate &&
            !validator.isEmpty(addressEnergySupplier.endDate) &&
            addressEnergySupplier.endDate < addressEnergySupplier.memberSince
        ) {
            errors.memberSince = true;
            errors.endDate = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            AddressEnergySupplierAPI.newAddressEnergySupplier(addressEnergySupplier)
                .then(payload => {
                    this.props.newStateAddressEnergySupplier(payload.data.data);
                    if (this.state.showWarningEsNumber && payload.data.data.addressEnergySuppliersWithDoubleEsNumber) {
                        this.props.setError(
                            412,
                            'Klantnummer leverancier ' +
                                payload.data.data.esNumber +
                                ' komt al voor bij een andere adres voor leverancier ' +
                                payload.data.data.energySupplier.name +
                                '. (N.B. dit kan ook bij een ander contact zijn). Gewijzigde gegevens van deze adres/energie leverancier zijn wel opgeslagen'
                        );
                        this.toggleShowWarningEsNumber();
                    }
                    this.props.toggleShowNew();
                })
                .catch(error => {
                    if (error.response) {
                        this.props.setError(error.response.status, error.response.data.message);
                    } else {
                        console.log(error);
                    }
                });
    };

    render() {
        const {
            energySupplierId,
            energySupplyTypeId,
            memberSince,
            energySupplyStatusId,
            switchDate,
            endDate,
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
                            <div className="form-group col-sm-6" />
                            <InputText
                                label={'Klantnummer'}
                                id={'esNumber'}
                                name={'esNumber'}
                                value={esNumber}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Klant sinds"
                                name="memberSince"
                                value={memberSince ? memberSince : ''}
                                onChangeAction={this.handleInputChangeDate}
                                required={true}
                                error={this.state.errors.memberSince}
                            />
                            <InputDate
                                label={'Eind datum'}
                                name="endDate"
                                value={endDate ? endDate : ''}
                                onChangeAction={this.handleInputChangeDate}
                                error={this.state.errors.endDate}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Mogelijke overstap datum"
                                name="switchDate"
                                value={switchDate ? switchDate : ''}
                                onChangeAction={this.handleInputChangeDate}
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
    };
};

const mapDispatchToProps = dispatch => ({
    newStateAddressEnergySupplier: addressEnergySupplier => {
        dispatch(newStateAddressEnergySupplier(addressEnergySupplier));
    },
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetailsFormAddressEnergySupplierNew);
