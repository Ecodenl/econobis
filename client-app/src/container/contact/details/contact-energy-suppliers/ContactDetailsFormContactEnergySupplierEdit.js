import React from 'react';
import { connect } from 'react-redux';

import InputText from '../../../../components/form/InputText';
import ButtonText from '../../../../components/button/ButtonText';
import InputSelect from "../../../../components/form/InputSelect";
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';
import InputDate from "../../../../components/form/InputDate";
import moment from "moment/moment";
moment.locale('nl');

const ContactDetailsFormContactEnergySupplierEdit = props => {
    const {energySupplierId, type, memberSince, eanElectricity, eanGas, contactEnergySupplyStatusId, switchDate } = props.contactEnergySupplier;

    return (
        <div>
            <form className="form-horizontal" onSubmit={props.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={"Energieleverancier"}
                                id="energySupplierId"
                                name={"energySupplierId"}
                                options={props.energySuppliers}
                                value={energySupplierId}
                                readOnly={true}
                            />
                            <InputText
                                label={"Type"}
                                id={"type"}
                                name={"type"}
                                value={type}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputDate
                                label="Klant sinds"
                                name="memberSince"
                                value={memberSince ? memberSince : ''}
                                onChangeAction={props.handleInputChangeDate}
                            />
                            <InputText
                                label={"Ean electriciteit"}
                                id={"eanElectricity"}
                                name={"eanElectricity"}
                                value={eanElectricity}
                                onChangeAction={props.handleInputChange}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label={"Ean gas"}
                                id={"eanGas"}
                                name={"eanGas"}
                                value={eanGas}
                                onChangeAction={props.handleInputChange}
                            />
                            <InputSelect
                                label={"Overstap status"}
                                id="contactEnergySupplyStatusId"
                                name={"contactEnergySupplyStatusId"}
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
                        </div>

                        <div className="pull-right btn-group" role="group">
                            <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"} onClickAction={props.cancelEdit}/>
                            <ButtonText buttonText={"Opslaan"} onClickAction={props.handleSubmit} type={"submit"} value={"Submit"}/>
                        </div>
                    </PanelBody>
                </Panel>
            </form>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        energySuppliers: state.systemData.energySuppliers,
        contactEnergySupplierStatus: state.systemData.contactEnergySupplierStatus,
    };
};

export default connect(mapStateToProps, null)(ContactDetailsFormContactEnergySupplierEdit);
