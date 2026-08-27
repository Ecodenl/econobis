import React from 'react';
import { connect } from 'react-redux';

import InputText from '../../../../../components/form/InputText';
import ButtonText from '../../../../../components/button/ButtonText';
import InputSelect from '../../../../../components/form/InputSelect';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import InputDate from '../../../../../components/form/InputDate';
import moment from 'moment/moment';
moment.locale('nl');

const AddressDetailsFormAddressDongleEdit = props => {
    const { typeReadOutId, dateSigned, macNumber, dateStart, typeDongleId, dateEnd, energyId } = props.addressDongle;

    const typesDongle = props.typesDongle.filter(typeDongle => typeDongle.typeReadOutId == typeReadOutId);

    return (
        <div>
            <form className="form-horizontal" onSubmit={props.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={'Type uitlezing'}
                                id="typeReadOutId"
                                name={'typeReadOutId'}
                                options={props.typesReadOut}
                                value={typeReadOutId}
                                required={'required'}
                                onChangeAction={props.handleInputChangeReadOutId}
                                error={props.errors.typeReadOutId}
                            />
                            <InputDate
                                label={'Datum ondertekening'}
                                id={'dateSigned'}
                                name={'dateSigned'}
                                value={dateSigned}
                                onChangeAction={props.handleInputChangeDate}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Mac nummer"
                                name="macNumber"
                                value={macNumber}
                                onChangeAction={props.handleInputChange}
                            />
                            <InputDate
                                label={'Start datum'}
                                name="dateStart"
                                value={dateStart}
                                onChangeAction={props.handleInputChangeDate}
                            />
                        </div>

                        <div className="row">
                            {typesDongle != '' ? (
                                <InputSelect
                                    label={'Type dongel'}
                                    id="typeDongleId"
                                    name={'typeDongleId'}
                                    options={typesDongle}
                                    value={typeDongleId}
                                    onChangeAction={props.handleInputChange}
                                />
                            ) : (
                                <div class="form-group col-sm-6 ">&nbsp;</div>
                            )}
                            <InputDate
                                label={'Eind datum'}
                                name="dateEnd"
                                value={dateEnd}
                                onChangeAction={props.handleInputChangeDate}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                label="Koppeling Energie ID"
                                name="energyId"
                                value={energyId}
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
        typesReadOut: state.systemData.dongleTypeReadOuts,
        typesDongle: state.systemData.dongleTypeDongles,
    };
};

export default connect(mapStateToProps, null)(AddressDetailsFormAddressDongleEdit);
