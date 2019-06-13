import React from 'react';
import { connect } from 'react-redux';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from '../../../../components/form/InputSelect';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputDate from '../../../../components/form/InputDate';
import moment from 'moment/moment';
import InputToggle from '../../../../components/form/InputToggle';
moment.locale('nl');

const ContactDetailsFormContactEnergySupplierEdit = props => {
    const {
        energySupplierId,
        contactEnergySupplyTypeId,
        memberSince,
        contactEnergySupplyStatusId,
        switchDate,
        esNumber,
        isCurrentSupplier,
        createdAt,
        createdBy,
    } = props.contactEnergySupplier;

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
                                id="contactEnergySupplyTypeId"
                                name={'contactEnergySupplyTypeId'}
                                options={props.contactEnergySupplierTypes}
                                value={contactEnergySupplyTypeId}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Klant sinds"
                                name="memberSince"
                                value={memberSince ? memberSince : ''}
                                onChangeAction={props.handleInputChangeDate}
                            />
                            <InputSelect
                                label={'Overstap status'}
                                id="contactEnergySupplyStatusId"
                                name={'contactEnergySupplyStatusId'}
                                options={props.contactEnergySupplierStatus}
                                value={contactEnergySupplyStatusId}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Mogelijke overstap datum"
                                name="switchDate"
                                value={switchDate ? switchDate : ''}
                                onChangeAction={props.handleInputChangeDate}
                            />
                            <InputText
                                label={'Klantnummer'}
                                name={'esNumber'}
                                value={esNumber ? esNumber : ''}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={'Gemaakt op'}
                                name={'createdAt'}
                                value={createdAt ? moment(createdAt.date).format('L') : ''}
                                readOnly={true}
                            />
                            <InputText
                                label={'Gemaakt door'}
                                name={'createdBy'}
                                value={createdBy ? createdBy.fullName : ''}
                                readOnly={true}
                            />
                        </div>
                        <div className="row">
                            <InputToggle
                                label={'Is huidige leverancier'}
                                name={'isCurrentSupplier'}
                                value={isCurrentSupplier}
                                onChangeAction={props.handleInputChange}
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
        contactEnergySupplierTypes: state.systemData.contactEnergySupplierTypes,
        contactEnergySupplierStatus: state.systemData.contactEnergySupplierStatus,
    };
};

export default connect(
    mapStateToProps,
    null
)(ContactDetailsFormContactEnergySupplierEdit);
