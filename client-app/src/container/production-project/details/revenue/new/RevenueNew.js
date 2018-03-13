import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

moment.locale('nl');
import InputSelect from '../../../../../components/form/InputSelect';
import InputDate from '../../../../../components/form/InputDate';
import ButtonText from '../../../../../components/button/ButtonText';
import PanelFooter from "../../../../../components/panel/PanelFooter";
import InputText from "../../../../../components/form/InputText";
import InputToggle from "../../../../../components/form/InputToggle";

const RevenueNew = props => {

    const {
        typeId, confirmed, dateBegin, dateEnd, dateEntry, dateConfirmed, kwhStart, kwhEnd, kwhStartHigh, kwhEndHigh,
        kwhStartLow, kwhEndLow, revenue, datePayed, payPercentage, categoryId
    } = props.revenue;

    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>
            <div className="row">
                <InputSelect
                    label={"Soort"}
                    name={"categoryId"}
                    options={props.productionProjectRevenueCategories}
                    value={categoryId}
                    onChangeAction={props.handleInputChange}
                    required={"required"}
                    error={props.errors.categoryId}
                />
                <InputText
                    label={"Definitief"}
                    name={"confirmed"}
                    value={confirmed ?  'Ja' : 'Nee'}
                    readOnly={true}
                />
            </div>

            <div className="row">
                <InputDate
                    label={"Begin periode"}
                    name={"dateBegin"}
                    value={dateBegin}
                    onChangeAction={props.handleInputChangeDate}
                    required={'required'}
                />
                <InputDate
                    label={"Eind periode"}
                    name={"dateEnd"}
                    value={dateEnd}
                    onChangeAction={props.handleInputChangeDate}
                    required={'required'}
                />
            </div>

            <div className="row">
                <InputDate
                    label={"Datum invoer"}
                    name={"dateEntry"}
                    value={dateEntry}
                    onChangeAction={props.handleInputChangeDate}
                    required={'required'}
                />
                <InputDate
                    label={"Datum definitief"}
                    name={"dateConfirmed"}
                    value={dateConfirmed}
                    onChangeAction={props.handleInputChangeDateConfirmed}
                />
            </div>

            <div className="row">
                <InputText
                    type={"number"}
                    label={"Beginstand kWh"}
                    name={"kwhStart"}
                    value={kwhStart}
                    onChangeAction={props.handleInputChange}
                />
                <InputText
                    type={"number"}
                    label={"Eindstand kWh"}
                    name={"kwhEnd"}
                    value={kwhEnd}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputText
                    type={"number"}
                    label={"Beginstand kWh hoog"}
                    name={"kwhStartHigh"}
                    value={kwhStartHigh}
                    onChangeAction={props.handleInputChange}
                />
                <InputText
                    type={"number"}
                    label={"Eindstand kWh hoog"}
                    name={"kwhEndHigh"}
                    value={kwhEndHigh}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputText
                    type={"number"}
                    label={"Beginstand kWh laag"}
                    name={"kwhStartLow"}
                    value={kwhStartLow}
                    onChangeAction={props.handleInputChange}
                />
                <InputText
                    type={"number"}
                    label={"Eindstand kWh laag"}
                    name={"kwhEndLow"}
                    value={kwhEndLow}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <div className="row">
                <InputText
                    type={"number"}
                    label={"Euro opbrengst"}
                    name={"revenue"}
                    value={revenue}
                    onChangeAction={props.handleInputChange}
                />
                <InputDate
                    label={"Uitgekeerd op"}
                    name={"datePayed"}
                    value={datePayed}
                    onChangeAction={props.handleInputChangeDate}
                />
            </div>

            <div className="row">
                <InputText
                    type={"number"}
                    label={"Uitkering %"}
                    name={"payPercentage"}
                    value={payPercentage}
                    onChangeAction={props.handleInputChange}
                />
                <InputSelect
                    label={"Type opbrengst"}
                    name={"typeId"}
                    options={props.productionProjectRevenueTypes}
                    value={typeId}
                    onChangeAction={props.handleInputChange}
                />
            </div>

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText buttonClassName={"btn-default"} buttonText={"Annuleren"}
                                onClickAction={props.switchToView}/>
                    <ButtonText buttonText={"Opslaan"} onClickAction={props.handleSubmit} type={"submit"}
                                value={"Submit"}/>
                </div>
            </PanelFooter>
        </form>
    );
};

const mapStateToProps = (state) => {
    return {
        productionProjectRevenueTypes: state.systemData.productionProjectRevenueTypes,
        productionProjectRevenueCategories: state.systemData.productionProjectRevenueCategories,
    }
};

export default connect(mapStateToProps)(RevenueNew);
