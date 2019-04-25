import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');
import InputSelect from '../../../../../components/form/InputSelect';
import InputDate from '../../../../../components/form/InputDate';
import ButtonText from '../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../components/panel/PanelFooter';
import InputText from '../../../../../components/form/InputText';
import InputToggle from '../../../../../components/form/InputToggle';

const RevenueNew = props => {
    const {
        typeId,
        confirmed,
        dateBegin,
        dateEnd,
        dateEntry,
        dateConfirmed,
        kwhStart,
        kwhEnd,
        kwhStartHigh,
        kwhEndHigh,
        kwhStartLow,
        kwhEndLow,
        revenue,
        datePayed,
        payPercentage,
        categoryId,
        payoutKwh,
    } = props.revenue;

    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>
            <div className="row">
                <div className={'panel-heading'}>
                    <span className={'h5 text-bold'}>Algemeen</span>
                </div>
            </div>
            <div className="row">
                <InputSelect
                    label={'Soort'}
                    name={'categoryId'}
                    options={props.productionProjectRevenueCategories}
                    value={categoryId}
                    onChangeAction={props.handleInputChange}
                    required={'required'}
                    error={props.errors.categoryId}
                />
                <InputText label={'Definitief'} name={'confirmed'} value={confirmed ? 'Ja' : 'Nee'} readOnly={true} />
            </div>

            <div className="row">
                <InputDate
                    label={'Begin periode'}
                    name={'dateBegin'}
                    value={dateBegin}
                    onChangeAction={props.handleInputChangeDate}
                    required={'required'}
                    error={props.errors.dateBegin}
                />
                <InputDate
                    label={'Eind periode'}
                    name={'dateEnd'}
                    value={dateEnd}
                    onChangeAction={props.handleInputChangeDate}
                    required={'required'}
                    error={props.errors.dateEnd}
                />
            </div>

            <div className="row">
                <InputDate
                    label={'Datum invoer'}
                    name={'dateEntry'}
                    value={dateEntry}
                    onChangeAction={props.handleInputChangeDate}
                    required={'required'}
                    error={props.errors.dateEntry}
                />
                <InputDate
                    label={'Datum definitief'}
                    name={'dateConfirmed'}
                    value={dateConfirmed}
                    onChangeAction={props.handleInputChangeDateConfirmed}
                />
            </div>

            <div className="row">
                <InputSelect
                    label={'Type opbrengst'}
                    name={'typeId'}
                    options={props.productionProjectRevenueTypes}
                    value={typeId}
                    onChangeAction={props.handleInputChange}
                />
                <InputDate
                    label={'Uitgekeerd op'}
                    name={'datePayed'}
                    value={datePayed}
                    onChangeAction={props.handleInputChangeDate}
                />
            </div>

            <div className="row">
                <div className={'panel-part panel-heading'}>
                    <span className={'h5 text-bold'}>Opbrengst kWh</span>
                </div>
            </div>

            <div className="row">
                <InputText
                    type={'number'}
                    label={'Beginstand kWh hoog'}
                    name={'kwhStartHigh'}
                    value={kwhStartHigh}
                    onChangeAction={props.handleInputChange}
                />
                <InputText
                    type={'number'}
                    label={'Eindstand kWh hoog'}
                    name={'kwhEndHigh'}
                    value={kwhEndHigh}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputText
                    type={'number'}
                    label={'Beginstand kWh laag'}
                    name={'kwhStartLow'}
                    value={kwhStartLow}
                    onChangeAction={props.handleInputChange}
                />
                <InputText
                    type={'number'}
                    label={'Eindstand kWh laag'}
                    name={'kwhEndLow'}
                    value={kwhEndLow}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputText
                    type={'number'}
                    label={'Beginstand kWh'}
                    name={'kwhStart'}
                    value={kwhStart}
                    readOnly={true}
                />
                <InputText type={'number'} label={'Eindstand kWh'} name={'kwhEnd'} value={kwhEnd} readOnly={true} />
            </div>

            <div className="row">
                <InputText
                    type={'number'}
                    label={'Opbrengst kWh €'}
                    name={'payoutKwh'}
                    value={
                        payoutKwh &&
                        payoutKwh.toLocaleString('nl', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
                    }
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <div className={'panel-part panel-heading'}>
                    <span className={'h5 text-bold'}>Opbrengst euro</span>
                </div>
            </div>
            <div className="row">
                <InputText
                    type={'number'}
                    label={'Uitkering %'}
                    name={'payPercentage'}
                    value={payPercentage}
                    onChangeAction={props.handleInputChange}
                />
                <InputText
                    type={'number'}
                    label={'Euro opbrengst'}
                    name={'revenue'}
                    value={revenue}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText
                        buttonText={'Opslaan'}
                        onClickAction={props.handleSubmit}
                        type={'submit'}
                        value={'Submit'}
                    />
                </div>
            </PanelFooter>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        productionProjectRevenueTypes: state.systemData.productionProjectRevenueTypes,
        productionProjectRevenueCategories: state.systemData.productionProjectRevenueCategories,
    };
};

export default connect(mapStateToProps)(RevenueNew);
