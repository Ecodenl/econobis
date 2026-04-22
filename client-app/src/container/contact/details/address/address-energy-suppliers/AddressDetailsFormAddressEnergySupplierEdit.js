import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment/moment';

import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import InputSelect from '../../../../../components/form/InputSelect';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputDate from '../../../../../components/form/InputDate';
import ViewText from '../../../../../components/form/ViewText';

moment.locale('nl');

const AddressDetailsFormAddressEnergySupplierEdit = ({
    addressEnergySupplier,
    errors,
    handleInputChange,
    handleInputChangeDate,
    handleSubmit,
    cancelEdit,
    energySuppliers,
    energySupplierTypes,
    energySupplierStatuses,
}) => {
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
    } = addressEnergySupplier;

    const endDateRequired = disabledAfter !== '9999-12-31';

    return (
        <form className="form-horizontal" onSubmit={handleSubmit}>
            <Panel className="panel-grey">
                <PanelBody>
                    <div className="row">
                        <InputSelect
                            label="Energieleverancier"
                            id="energySupplierId"
                            name="energySupplierId"
                            options={energySuppliers}
                            value={energySupplierId}
                            readOnly={true}
                        />
                        <InputSelect
                            label="Type"
                            id="energySupplyTypeId"
                            name="energySupplyTypeId"
                            options={energySupplierTypes}
                            value={energySupplyTypeId}
                            readOnly={true}
                        />
                    </div>

                    <div className="row">
                        <ViewText
                            className="form-group col-sm-6"
                            label="Is huidige leverancier"
                            value={isCurrentSupplier ? 'Ja' : 'Nee'}
                        />
                        <InputText
                            label="Klantnummer"
                            name="esNumber"
                            value={esNumber || ''}
                            onChangeAction={handleInputChange}
                        />
                    </div>

                    <div className="row">
                        <InputDate
                            label="Klant sinds"
                            name="memberSince"
                            value={memberSince || ''}
                            disabledBefore={disabledBefore}
                            disabledAfter={disabledAfter}
                            onChangeAction={handleInputChangeDate}
                            required="required"
                            error={errors.memberSince}
                        />
                        <InputDate
                            label="Eind datum"
                            name="endDate"
                            value={endDate || ''}
                            disabledBefore={disabledBefore}
                            disabledAfter={disabledAfter}
                            onChangeAction={handleInputChangeDate}
                            required={endDateRequired ? 'required' : ''}
                            error={errors.endDate}
                        />
                    </div>

                    <div className="row">
                        <InputDate
                            label="Mogelijke overstap datum"
                            name="switchDate"
                            value={switchDate || ''}
                            onChangeAction={handleInputChangeDate}
                        />
                        <InputSelect
                            label="Overstap status"
                            id="energySupplyStatusId"
                            name="energySupplyStatusId"
                            options={energySupplierStatuses}
                            value={energySupplyStatusId}
                            onChangeAction={handleInputChange}
                        />
                    </div>

                    <div className="row">
                        <InputText
                            label="Gemaakt op"
                            name="createdAt"
                            value={createdAt ? moment(createdAt).format('L') : ''}
                            readOnly={true}
                        />
                        <InputText
                            label="Gemaakt door"
                            name="createdBy"
                            value={createdBy?.fullName || ''}
                            readOnly={true}
                        />
                    </div>

                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonClassName="btn-default" buttonText="Annuleren" onClickAction={cancelEdit} />
                        <ButtonText buttonText="Opslaan" onClickAction={handleSubmit} type="submit" value="Submit" />
                    </div>
                </PanelBody>
            </Panel>
        </form>
    );
};

const mapStateToProps = state => ({
    energySuppliers: state.systemData.energySuppliers,
    energySupplierTypes: state.systemData.energySupplierTypes,
    energySupplierStatuses: state.systemData.energySupplierStatuses,
});

export default connect(mapStateToProps)(AddressDetailsFormAddressEnergySupplierEdit);
