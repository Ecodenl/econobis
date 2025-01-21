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
    const { typeReadOut, dateSigned, macNumber, dateStart, typeDongle, dateEnd, energyId } = props.addressDongle;

    return (
        <div>
            <form className="form-horizontal" onSubmit={props.handleSubmit}>
                <Panel className={'panel-grey'}>
                    <PanelBody>
                        <div className="row">
                            <InputSelect
                                label={'Type uitlezing'}
                                id="typeReadOut"
                                name={'typeReadOut'}
                                options={props.typeReadOut}
                                value={typeReadOut}
                                onChangeAction={props.handleInputChange}
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
                                required={'required'}
                            />
                            <InputDate
                                label={'Start datum'}
                                name="dateStart"
                                value={dateStart}
                                onChangeAction={props.handleInputChangeDate}
                            />
                        </div>

                        <div className="row">
                            <InputSelect
                                label={'Type dongel'}
                                id="typeDongle"
                                name={'typeDongle'}
                                options={props.typeDongle}
                                value={typeDongle}
                                onChangeAction={props.handleInputChange}
                            />
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
                                required={'required'}
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
        typeReadOut: state.systemData.dongleTypeReadOut,
        typeDongle: state.systemData.dongleTypeDongle,
    };
};

export default connect(mapStateToProps, null)(AddressDetailsFormAddressDongleEdit);
