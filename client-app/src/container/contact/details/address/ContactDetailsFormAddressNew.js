import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setError } from '../../../../actions/general/ErrorActions';
import AddressAPI from '../../../../api/contact/AddressAPI';
import { newAddress, unsetPrimaryAddresses } from '../../../../actions/contact/ContactDetailsActions';
import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import validator from 'validator';
import InputToggle from '../../../../components/form/InputToggle';
import InputDate from '../../../../components/form/InputDate';
import SharedAreaAPI from '../../../../api/shared-area/SharedAreaAPI';

class ContactDetailsFormAddressNew extends Component {
    constructor(props) {
        super(props);

        const addressesNotOld = props.addresses.filter(address => address.typeId !== 'old');
        const numberOfAddressesNotOld = addressesNotOld.length;

        this.state = {
            numberOfAddressesNotOld: numberOfAddressesNotOld,
            address: {
                contactId: this.props.id,
                street: '',
                number: '',
                addition: '',
                postalCode: '',
                city: '',
                areaName: '',
                districtName: '',
                typeId: 'visit',
                endDate: '',
                primary: numberOfAddressesNotOld == 0 ? true : false,
                countryId: '',
                eanElectricity: '',
                eanGas: '',
            },
            errors: {
                typeId: false,
                endDate: false,
                postalCode: false,
                number: false,
                countryId: false,
                eanElectricity: false,
                eanGas: false,
            },
        };
    }

    handleInputLvbagChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            address: {
                ...this.state.address,
                [name]: value,
            },
        });
        setTimeout(() => {
            const { address } = this.state;
            if (
                !validator.isEmpty(address.postalCode + '') &&
                validator.isPostalCode(address.postalCode, 'NL') &&
                !validator.isEmpty(address.number + '') &&
                validator.isEmpty(address.city + '') &&
                validator.isEmpty(address.street + '')
            ) {
                AddressAPI.getLvbagAddress(address.postalCode, address.number).then(payload => {
                    this.setState({
                        ...this.state,
                        address: {
                            ...this.state.address,
                            street: payload.street,
                            city: payload.city,
                        },
                    });
                });

                SharedAreaAPI.getSharedAreaDetails(address.postalCode, address.number).then(payload => {
                    this.setState({
                        ...this.state,
                        address: {
                            ...this.state.address,
                            areaName: payload.areaName,
                            districtName: payload.districtName,
                        },
                    });
                });
            }
        }, 100);

        setTimeout(() => {
            const { address } = this.state;
            if (
                !validator.isEmpty(address.postalCode + '') &&
                validator.isPostalCode(address.postalCode, 'NL') &&
                !validator.isEmpty(address.number + '')
            ) {
                SharedAreaAPI.getSharedAreaDetails(address.postalCode, address.number).then(payload => {
                    this.setState({
                        ...this.state,
                        address: {
                            ...this.state.address,
                            areaName: payload.areaName,
                            districtName: payload.districtName,
                        },
                    });
                });
            }
        }, 100);
    };

    handleInputChange = event => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            ...this.state,
            address: {
                ...this.state.address,
                [name]: value,
            },
        });
    };

    handleInputChangeDate = (value, name) => {
        this.setState({
            ...this.state,
            address: {
                ...this.state.address,
                [name]: value,
            },
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        const { address } = this.state;

        // Postalcode always to uppercase
        address.postalCode = address.postalCode.toUpperCase();

        let errors = {};
        let hasErrors = false;

        if (validator.isEmpty(address.postalCode + '')) {
            errors.postalCode = true;
            hasErrors = true;
        }
        let countryId = address.countryId;
        if (validator.isEmpty(address.countryId + '')) {
            countryId = 'NL';
        }

        let postalCodeValid = true;
        if (!validator.isEmpty(address.postalCode + '')) {
            if (countryId == 'NL') {
                postalCodeValid = validator.isPostalCode(address.postalCode, 'NL');
            } else {
                postalCodeValid = validator.isPostalCode(address.postalCode, 'any');
            }
            if (!postalCodeValid) {
                errors.postalCode = true;
                errors.countryId = true;
                hasErrors = true;
            }
        }

        if (validator.isEmpty(address.number + '')) {
            errors.number = true;
            hasErrors = true;
        }

        if (validator.isEmpty(address.typeId + '')) {
            errors.typeId = true;
            hasErrors = true;
        }

        if (address.typeId === 'old' && (address.endDate === null || validator.isEmpty(address.endDate))) {
            errors.endDate = true;
            hasErrors = true;
        }

        if (address.typeId === 'old' && address.primary) {
            errors.typeId = true;
            hasErrors = true;
        }

        this.setState({ ...this.state, errors: errors });

        // If no errors send form
        !hasErrors &&
            AddressAPI.newAddress(address)
                .then(payload => {
                    if (address.primary) {
                        this.props.unsetPrimaryAddresses();
                    }
                    this.props.newAddress(payload.data.data);
                    this.props.toggleShowNew();
                })
                .catch(error => {
                    this.props.setError(error.response.status, error.response.data.message);
                });
    };

    render() {
        const {
            street,
            number,
            addition,
            postalCode,
            city,
            areaName,
            districtName,
            typeId,
            endDate,
            primary,
            countryId,
            eanElectricity,
            eanGas,
        } = this.state.address;
        const { numberOfAddressesNotOld, errors } = this.state;
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={'Postcode'}
                                size={'col-sm-4'}
                                name={'postalCode'}
                                value={postalCode}
                                onChangeAction={this.handleInputLvbagChange}
                                required={'required'}
                                error={errors.postalCode}
                            />
                            <div className="form-group col-sm-6">
                                <label htmlFor={'number'} className={`col-sm-6 required`}>
                                    {'Nummer'}
                                </label>
                                <div className={`col-sm-4`}>
                                    <input
                                        type={'number'}
                                        className={`form-control input-sm ` + (errors.number ? 'has-error' : '')}
                                        id={'number'}
                                        name={'number'}
                                        value={number}
                                        onChange={this.handleInputLvbagChange}
                                    />
                                </div>
                                <div className={`col-sm-2`}>
                                    <input
                                        type={'text'}
                                        className={`form-control input-sm`}
                                        id={'addition'}
                                        name={'addition'}
                                        value={addition}
                                        onChange={this.handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <InputText
                                label={'Adres'}
                                id={'adres'}
                                size={'col-sm-6'}
                                name={'street'}
                                value={street}
                                onChangeAction={this.handleInputChange}
                            />
                            <InputText
                                label={'Plaats'}
                                id={'plaats'}
                                size={'col-sm-6'}
                                name={'city'}
                                value={city}
                                onChangeAction={this.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={'Type'}
                                id="type"
                                size={'col-sm-6'}
                                name={'typeId'}
                                options={this.props.addressTypes}
                                value={typeId}
                                onChangeAction={this.handleInputChange}
                                required={'required'}
                                error={errors.typeId}
                            />
                            {typeId === 'old' && (
                                <InputDate
                                    label="Eind datum"
                                    name="endDate"
                                    value={endDate}
                                    onChangeAction={this.handleInputChangeDate}
                                    error={errors.endDate}
                                />
                            )}
                        </div>
                        <div className="row">
                            <InputText
                                label={'Buurt'}
                                id={'areaName'}
                                size={'col-sm-6'}
                                name={'areaName'}
                                value={areaName}
                                disabled={true}
                            />
                            <InputText
                                label={'Wijk'}
                                id={'districtName'}
                                size={'col-sm-6'}
                                name={'districtName'}
                                value={districtName}
                                disabled={true}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={'Land'}
                                id="countryId"
                                size={'col-sm-6'}
                                name={'countryId'}
                                options={this.props.countries}
                                value={countryId}
                                onChangeAction={this.handleInputChange}
                                error={errors.countryId}
                            />
                            <InputToggle
                                label={'Primair adres'}
                                name={'primary'}
                                value={primary}
                                onChangeAction={this.handleInputChange}
                                disabled={numberOfAddressesNotOld == 0}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={'EAN elektriciteit'}
                                id={'eanElectricity'}
                                name={'eanElectricity'}
                                value={eanElectricity}
                                onChangeAction={this.handleInputChange}
                                error={errors.eanElectricity}
                            />
                            <InputText
                                label={'EAN gas'}
                                id={'eanGas'}
                                name={'eanGas'}
                                value={eanGas}
                                onChangeAction={this.handleInputChange}
                                error={errors.eanGas}
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
        addresses: state.contactDetails.addresses,
        addressTypes: state.systemData.addressTypes,
        countries: state.systemData.countries,
        id: state.contactDetails.id,
    };
};

const mapDispatchToProps = dispatch => ({
    newAddress: id => {
        dispatch(newAddress(id));
    },
    unsetPrimaryAddresses: () => {
        dispatch(unsetPrimaryAddresses());
    },
    setError: (http_code, message) => {
        dispatch(setError(http_code, message));
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetailsFormAddressNew);
