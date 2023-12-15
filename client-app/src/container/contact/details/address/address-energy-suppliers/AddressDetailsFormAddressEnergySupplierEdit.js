import React from 'react';
import { connect } from 'react-redux';

import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import InputSelect from '../../../../../components/form/InputSelect';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputDate from '../../../../../components/form/InputDate';
import moment from 'moment/moment';
import ViewText from '../../../../../components/form/ViewText';
moment.locale('nl');

const AddressDetailsFormAddressEnergySupplierEdit = props => {
    const {
        energySupplierId,
        energySupplyTypeId,
        memberSince,
        energySupplyStatusId,
        switchDate,
        endDate,
        esNumber,
        isCurrentSupplier,
        createdAt,
        createdBy,
        disabledBefore,
        disabledAfter,
    } = props.addressEnergySupplier;

    return (
        <div>
            <form className="form-horizontal" onSubmit={props.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={'Energieleverancier'}
                                id="energySupplierId"
                                name={'energySupplierId'}
                                options={props.energySuppliers}
                                value={energySupplierId}
                                readOnly={true}
                            />
                            <InputSelect
                                label={'Type'}
                                id="energySupplyTypeId"
                                name={'energySupplyTypeId'}
                                options={props.energySupplierTypes}
                                value={energySupplyTypeId}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <ViewText
                                className={'form-group col-sm-6'}
                                label={'Is huidige leverancier'}
                                value={isCurrentSupplier ? 'Ja' : 'Nee'}
                            />
                            <InputText
                                label={'Klantnummer'}
                                name={'esNumber'}
                                value={esNumber ? esNumber : ''}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Klant sinds"
                                name="memberSince"
                                value={memberSince ? memberSince : ''}
                                disabledBefore={disabledBefore}
                                disabledAfter={disabledAfter}
                                onChangeAction={props.handleInputChangeDate}
                                required={'required'}
                                error={props.errors.memberSince}
                            />
                            <InputDate
                                label="Eind datum"
                                name="endDate"
                                value={endDate ? endDate : ''}
                                disabledBefore={disabledBefore}
                                disabledAfter={disabledAfter}
                                onChangeAction={props.handleInputChangeDate}
                                required={disabledAfter != '9999-12-31' ? 'required' : ''}
                                error={props.errors.endDate}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Mogelijke overstap datum"
                                name="switchDate"
                                value={switchDate ? switchDate : ''}
                                onChangeAction={props.handleInputChangeDate}
                            />
                            <InputSelect
                                label={'Overstap status'}
                                id="energySupplyStatusId"
                                name={'energySupplyStatusId'}
                                options={props.energySupplierStatuses}
                                value={energySupplyStatusId}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={'Gemaakt op'}
                                name={'createdAt'}
                                value={createdAt ? moment(createdAt).format('L') : ''}
                                readOnly={true}
                            />
                            <InputText
                                label={'Gemaakt door'}
                                name={'createdBy'}
                                value={createdBy ? createdBy.fullName : ''}
                                readOnly={true}
                            />
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText
                                buttonClassName={'btn-default'}
                                buttonText={'Annuleren'}
                                onClickAction={props.cancelEdit}
                            />
                            <ButtonText
                                buttonText={'Opslaan'}
                                onClickAction={props.handleSubmit}
                                type={'submit'}
                                value={'Submit'}
                            />
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        energySuppliers: state.systemData.energySuppliers,
        energySupplierTypes: state.systemData.energySupplierTypes,
        energySupplierStatuses: state.systemData.energySupplierStatuses,
    };
};

export default connect(mapStateToProps, null)(AddressDetailsFormAddressEnergySupplierEdit);
