import React from 'react';
import { useSelector } from 'react-redux';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputToggle from '../../../../components/form/InputToggle';
import InputDate from '../../../../components/form/InputDate';

const ContactDetailsFormAddressEdit = props => {
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
    } = props.address;

    // Redux state ophalen
    const addressTypes = useSelector(state => state.systemData.addressTypes);
    const countries = useSelector(state => state.systemData.countries);

    // filter 'old' adres type indien nodig
    let addressTypesToSelect = addressTypes;
    if (primary && props.numberOfAddressesNotOld > 1) {
        addressTypesToSelect = addressTypesToSelect.filter(type => type.id !== 'old');
    }

    return (
        <div>
            <form className="form-horizontal" onSubmit={props.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputText
                                label={'Postcode'}
                                size={'col-sm-4'}
                                name={'postalCode'}
                                value={postalCode}
                                onChangeAction={props.handleInputChange}
                                required={'required'}
                                error={props.postalCodeError}
                            />
                            <div className="form-group col-sm-6">
                                <label htmlFor={'number'} className="col-sm-6 required">
                                    Nummer
                                </label>
                                <div className="col-sm-4">
                                    <input
                                        type="number"
                                        className={`form-control input-sm${props.numberError ? ' has-error' : ''}`}
                                        id="number"
                                        name="number"
                                        value={number}
                                        onChange={props.handleInputChange}
                                    />
                                </div>
                                <div className="col-sm-2">
                                    <input
                                        type="text"
                                        className="form-control input-sm"
                                        id="addition"
                                        name="addition"
                                        value={addition}
                                        onChange={props.handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <InputText
                                label={'Adres'}
                                id="adres"
                                size={'col-sm-6'}
                                name="street"
                                value={street}
                                onChangeAction={props.handleInputChange}
                            />
                            <InputText
                                label={'Plaats'}
                                id="plaats"
                                size={'col-sm-6'}
                                name="city"
                                value={city}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={
                                    <span>
                                        Type
                                        {typeId === 'old' && primary && props.numberOfAddresses === 1 ? (
                                            <>
                                                <br />
                                                <small style={{ color: 'red', fontWeight: 'normal' }}>
                                                    <strong>Let op!</strong> Dit is een primair adres en enige adres bij
                                                    contact.
                                                </small>
                                            </>
                                        ) : typeId === 'old' && primary ? (
                                            <>
                                                <br />
                                                <small style={{ color: 'red', fontWeight: 'normal' }}>
                                                    <strong>Let op!</strong> Dit is een primair adres met type Oud.
                                                </small>
                                            </>
                                        ) : (
                                            ''
                                        )}
                                    </span>
                                }
                                id="type"
                                size="col-sm-6"
                                name="typeId"
                                options={addressTypesToSelect}
                                value={typeId}
                                onChangeAction={props.handleInputChange}
                                required="required"
                                error={props.typeIdError}
                            />
                            {typeId === 'old' && (
                                <InputDate
                                    label="Eind datum"
                                    name="endDate"
                                    value={endDate}
                                    onChangeAction={props.handleInputChangeDate}
                                    required="required"
                                    error={props.endDateError}
                                />
                            )}
                        </div>

                        <div className="row">
                            <InputText
                                label={'Buurt'}
                                id="areaName"
                                size="col-sm-6"
                                name="areaName"
                                value={areaName}
                                disabled={true}
                                onChangeAction={props.handleInputChange}
                            />
                            <InputText
                                label={'Wijk'}
                                id="districtName"
                                size="col-sm-6"
                                name="districtName"
                                value={districtName}
                                disabled={true}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label="Land"
                                id="countryId"
                                size="col-sm-6"
                                name="countryId"
                                options={countries}
                                value={countryId}
                                onChangeAction={props.handleInputChange}
                                error={props.countryIdError}
                            />
                            <InputToggle
                                label="Primair adres"
                                name="primary"
                                value={primary}
                                onChangeAction={props.handleInputChange}
                                disabled={primary && typeId !== 'old'}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="EAN elektriciteit"
                                id="eanElectricity"
                                name="eanElectricity"
                                value={eanElectricity}
                                onChangeAction={props.handleInputChange}
                                error={props.eanElectricityError}
                            />
                            <InputText
                                label="EAN gas"
                                id="eanGas"
                                name="eanGas"
                                value={eanGas}
                                onChangeAction={props.handleInputChange}
                                error={props.eanGasError}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName="btn-default"
                                buttonText="Annuleren"
                                onClickAction={props.cancelEdit}
                            />
                            <ButtonText
                                buttonText="Opslaan"
                                onClickAction={props.handleSubmit}
                                type="submit"
                                value="Submit"
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        </div>
    );
};

export default ContactDetailsFormAddressEdit;
