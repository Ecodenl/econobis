import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');
import InputDate from '../../../../../components/form/InputDate';
import ButtonText from '../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../components/panel/PanelFooter';
import InputText from '../../../../../components/form/InputText';

import ViewText from '../../../../../components/form/ViewText';

const RevenuesKwhNew = props => {
    const { dateBegin, dateEnd, categoryId, payoutKwh } = props.revenuesKwh;
    const {
        valuesDateBegin,
        // valuesDateEnd,
        kwhStart,
        // kwhEnd,
        // kwhTotal,
        kwhStartHigh,
        // kwhEndCalendarYearHigh,
        // kwhEndHigh,
        kwhStartLow,
        // kwhEndCalendarYearLow,
        // kwhEndLow,
    } = props.revenuesKwh.valuesKwh;

    const category = props.projectRevenueCategories.find(
        projectRevenueCategorie => projectRevenueCategorie.id == categoryId
    );

    // const isPeriodExceedingYear = (dateBegin, dateEnd) => {
    //     dateBegin = moment(dateBegin);
    //     dateEnd = moment(dateEnd);
    //
    //     return dateEnd.year() > dateBegin.year();
    // };

    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>
            <div className="row">
                <div className={'panel-heading'}>
                    <span className={'h5 text-bold'}>Algemeen</span>
                </div>
            </div>
            <div className="row">
                <ViewText label={'Soort'} value={category ? category.name : ''} className={'form-group col-sm-6'} />
                <ViewText label={'Status'} value={'Nieuw'} className={'form-group col-sm-6'} />
            </div>

            <div className="row">
                <InputDate
                    label={
                        <span>
                            Begin periode
                            {props.project.dateInterestBearingKwhWrong
                                ?
                                <>
                                    <br />
                                    <small style={{ color: 'red', fontWeight: 'normal' }}>
                                        Afwijkende begindatum verwacht
                                    </small>
                                </>
                                : null
                            }
                        </span>
                    }
                    name={'dateBegin'}
                    value={dateBegin}
                    onChangeAction={props.handleInputChangeDate}
                    required={'required'}
                    error={props.errors.dateBegin}
                    errorMessage={props.errorMessage.dateBegin}
                    disabledBefore={props.project.dateInterestBearingKwh}
                />

                <InputDate
                    label={'Eind periode'}
                    name={'dateEnd'}
                    value={dateEnd}
                    onChangeAction={props.handleInputChangeDate}
                    required={'required'}
                    error={props.errors.dateEnd}
                    errorMessage={props.errorMessage.dateEnd}
                    disabledBefore={dateBegin}
                    disabledAfter={moment(dateBegin)
                        .add(1, 'year')
                        .add(6, 'month')
                        .add(-1, 'day')
                        .format('Y-MM-DD')}
                />
            </div>

            <React.Fragment>
                <div className="row">
                    <div className={'panel-part panel-heading'}>
                        <span className={'h5 text-bold'}>Opbrengst kWh</span>
                    </div>
                </div>

                {/*{isPeriodExceedingYear(dateBegin, dateEnd) ? (*/}
                {/*    <>*/}
                {/*        <div className="row">*/}
                {/*            <InputDate*/}
                {/*                label={'Datum beginstanden'}*/}
                {/*                name={'valuesDateBegin'}*/}
                {/*                value={valuesDateBegin}*/}
                {/*                readOnly={true}*/}
                {/*                // onChangeAction={props.handleInputChangeDateValuesKwh}*/}
                {/*                // required={'required'}*/}
                {/*                // error={props.errors.valuesDateBegin}*/}
                {/*                // errorMessage={props.errorMessage.valuesDateBegin}*/}
                {/*                // disabledBefore={props.project.dateBegin}*/}
                {/*            />*/}
                {/*            <InputDate*/}
                {/*                label={'Datum eindstanden'}*/}
                {/*                name={'valuesDateEnd'}*/}
                {/*                value={valuesDateEnd}*/}
                {/*                onChangeAction={props.handleInputChangeDateValuesKwh}*/}
                {/*                required={'required'}*/}
                {/*                error={props.errors.valuesDateEnd}*/}
                {/*                errorMessage={props.errorMessage.valuesDateEnd}*/}
                {/*                disabledBefore={valuesDateBegin}*/}
                {/*                disabledAfter={dateEnd}*/}
                {/*            />*/}
                {/*        </div>*/}

                {/*        <div className="row">*/}
                {/*            {props.project.kwhStartHighNextRevenue > 0 ? (*/}
                {/*                <InputText*/}
                {/*                    type={'number'}*/}
                {/*                    label={'Beginstand kWh hoog'}*/}
                {/*                    name={'kwhStartHigh'}*/}
                {/*                    value={kwhStartHigh}*/}
                {/*                    readOnly={true}*/}
                {/*                />*/}
                {/*            ) : (*/}
                {/*                <InputText*/}
                {/*                    type={'number'}*/}
                {/*                    label={'Beginstand kWh hoog'}*/}
                {/*                    name={'kwhStartHigh'}*/}
                {/*                    value={kwhStartHigh}*/}
                {/*                    onChangeAction={props.handleInputChangeValuesKwh}*/}
                {/*                />*/}
                {/*            )}*/}
                {/*        </div>*/}
                {/*        <div className="row">*/}
                {/*            {props.project.kwhStartHighNextRevenue > 0 ? (*/}
                {/*                <InputText*/}
                {/*                    type={'number'}*/}
                {/*                    label={'Beginstand kWh laag'}*/}
                {/*                    name={'kwhStartLow'}*/}
                {/*                    value={kwhStartLow}*/}
                {/*                    readOnly={true}*/}
                {/*                />*/}
                {/*            ) : (*/}
                {/*                <InputText*/}
                {/*                    type={'number'}*/}
                {/*                    label={'Beginstand kWh laag'}*/}
                {/*                    name={'kwhStartLow'}*/}
                {/*                    value={kwhStartLow}*/}
                {/*                    onChangeAction={props.handleInputChangeValuesKwh}*/}
                {/*                />*/}
                {/*            )}*/}
                {/*        </div>*/}
                {/*        <div className="row">*/}
                {/*            <InputText*/}
                {/*                type={'number'}*/}
                {/*                label={'Eindstand kWh op 31-12 hoog'}*/}
                {/*                name={'kwhEndCalendarYearHigh'}*/}
                {/*                value={kwhEndCalendarYearHigh}*/}
                {/*                onChangeAction={props.handleInputChangeValuesKwh}*/}
                {/*                error={props.errors.kwhEndCalendarYearHigh}*/}
                {/*                errorMessage={props.errorMessage.kwhEndCalendarYearHigh}*/}
                {/*                required={'required'}*/}
                {/*            />*/}
                {/*            <InputText*/}
                {/*                type={'number'}*/}
                {/*                label={'Eindstand kWh hoog'}*/}
                {/*                name={'kwhEndHigh'}*/}
                {/*                value={kwhEndHigh}*/}
                {/*                onChangeAction={props.handleInputChangeValuesKwh}*/}
                {/*                error={props.errors.kwhEndHigh}*/}
                {/*                errorMessage={props.errorMessage.kwhEndHigh}*/}
                {/*                required={'required'}*/}
                {/*            />*/}
                {/*        </div>*/}

                {/*        <div className="row">*/}
                {/*            <InputText*/}
                {/*                type={'number'}*/}
                {/*                label={'Eindstand kWh op 31-12 laag'}*/}
                {/*                name={'kwhEndCalendarYearLow'}*/}
                {/*                value={kwhEndCalendarYearLow}*/}
                {/*                onChangeAction={props.handleInputChangeValuesKwh}*/}
                {/*                error={props.errors.kwhEndCalendarYearLow}*/}
                {/*                errorMessage={props.errorMessage.kwhEndCalendarYearLow}*/}
                {/*            />*/}
                {/*            <InputText*/}
                {/*                type={'number'}*/}
                {/*                label={'Eindstand kWh laag'}*/}
                {/*                name={'kwhEndLow'}*/}
                {/*                value={kwhEndLow}*/}
                {/*                onChangeAction={props.handleInputChangeValuesKwh}*/}
                {/*                error={props.errors.kwhEndLow}*/}
                {/*                errorMessage={props.errorMessage.kwhEndLow}*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </>*/}
                {/*) : (*/}
                {/*    <>*/}
                <div className="row">
                    <InputDate
                        label={'Datum beginstanden'}
                        name={'valuesDateBegin'}
                        value={valuesDateBegin}
                        readOnly={true}
                        // onChangeAction={props.handleInputChangeDateValuesKwh}
                        // required={'required'}
                        // error={props.errors.valuesDateBegin}
                        // errorMessage={props.errorMessage.valuesDateBegin}
                        // disabledBefore={props.project.dateBegin}
                    />
                    {/*<InputDate*/}
                    {/*    label={'Datum eindstanden'}*/}
                    {/*    name={'valuesDateEnd'}*/}
                    {/*    value={valuesDateEnd}*/}
                    {/*    onChangeAction={props.handleInputChangeDateValuesKwh}*/}
                    {/*    required={'required'}*/}
                    {/*    error={props.errors.valuesDateEnd}*/}
                    {/*    errorMessage={props.errorMessage.valuesDateEnd}*/}
                    {/*    disabledBefore={valuesDateBegin}*/}
                    {/*    disabledAfter={dateEnd}*/}
                    {/*/>*/}
                </div>

                <div className="row">
                    {props.project.kwhStartHighNextRevenue > 0 ? (
                        <InputText
                            type={'number'}
                            label={
                                <span>
                                Beginstand kWh hoog
                                    {props.project.kwhStartHighNextRevenueWrong
                                        ?
                                        <>
                                            <br />
                                            <small style={{ color: 'red', fontWeight: 'normal' }}>
                                                Afwijkende beginstand kWh hoog verwacht
                                            </small>
                                        </>
                                        : null
                                    }
                                </span>
                            }
                            name={'kwhStartHigh'}
                            value={kwhStartHigh}
                            readOnly={true}
                        />
                    ) : (
                        <InputText
                            type={'number'}
                            label={'Beginstand kWh hoog'}
                            name={'kwhStartHigh'}
                            value={kwhStartHigh}
                            onChangeAction={props.handleInputChangeValuesKwh}
                        />
                    )}
                    {/*<InputText*/}
                    {/*    type={'number'}*/}
                    {/*    label={'Eindstand kWh hoog'}*/}
                    {/*    name={'kwhEndHigh'}*/}
                    {/*    value={kwhEndHigh}*/}
                    {/*    onChangeAction={props.handleInputChangeValuesKwh}*/}
                    {/*    error={props.errors.kwhEndHigh}*/}
                    {/*    errorMessage={props.errorMessage.kwhEndHigh}*/}
                    {/*/>*/}
                </div>
                <div className="row">
                    {props.project.kwhStartHighNextRevenue > 0 ? (
                        <InputText
                            type={'number'}
                            label={
                                <span>
                                Beginstand kWh laag
                                    {props.project.kwhStartLowNextRevenueWrong
                                        ?
                                        <>
                                            <br />
                                            <small style={{ color: 'red', fontWeight: 'normal' }}>
                                                Afwijkende beginstand kWh laag verwacht
                                            </small>
                                        </>
                                        : null
                                    }
                                </span>
                            }
                            name={'kwhStartLow'}
                            value={kwhStartLow}
                            readOnly={true}
                        />
                    ) : (
                        <InputText
                            type={'number'}
                            label={
                                <span>
                                Beginstand kWh laag
                                    {props.project.kwhStartLowNextRevenueWrong
                                        ?
                                        <>
                                            <br />
                                            <small style={{ color: 'red', fontWeight: 'normal' }}>
                                                Afwijkende beginstand kWh laag verwacht
                                            </small>
                                        </>
                                        : null
                                    }
                                </span>
                            }
                            name={'kwhStartLow'}
                            value={kwhStartLow}
                            onChangeAction={props.handleInputChangeValuesKwh}
                        />
                    )}
                    {/*<InputText*/}
                    {/*    type={'number'}*/}
                    {/*    label={'Eindstand kWh laag'}*/}
                    {/*    name={'kwhEndLow'}*/}
                    {/*    value={kwhEndLow}*/}
                    {/*    onChangeAction={props.handleInputChangeValuesKwh}*/}
                    {/*    error={props.errors.kwhEndLow}*/}
                    {/*    errorMessage={props.errorMessage.kwhEndLow}*/}
                    {/*/>*/}
                </div>
                {/*</>*/}
                {/*)}*/}

                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Beginstand kWh'}
                        name={'kwhStart'}
                        value={kwhStart}
                        readOnly={true}
                    />
                    {/*<InputText type={'number'} label={'Eindstand kWh'} name={'kwhEnd'} value={kwhEnd} readOnly={true} />*/}
                </div>

                <div className="row">
                    <InputText
                        type={'number'}
                        label={'Teruggave EB per kWh €'}
                        name={'payoutKwh'}
                        value={
                            payoutKwh &&
                            payoutKwh.toLocaleString('nl', { minimumFractionDigits: 3, maximumFractionDigits: 5 })
                        }
                        onChangeAction={props.handleInputChange}
                        error={props.errors.payoutKwh}
                        errorMessage={props.errorMessage.payoutKwh}
                        required={'required'}
                    />
                    {/*<InputText*/}
                    {/*    type={'number'}*/}
                    {/*    label={'Totaal productie kWh'}*/}
                    {/*    name={'kwhTotal'}*/}
                    {/*    value={kwhTotal}*/}
                    {/*    readOnly={true}*/}
                    {/*/>*/}
                </div>
            </React.Fragment>

            <PanelFooter>
                <div className="pull-right btn-group" role="group">
                    <ButtonText
                        buttonText={'Opslaan'}
                        onClickAction={props.handleSubmit}
                        type={'submit'}
                        value={'Submit'}
                        loading={props.isLoading}
                    />
                </div>
            </PanelFooter>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        projectRevenueCategories: state.systemData.projectRevenueCategories,
    };
};

export default connect(mapStateToProps)(RevenuesKwhNew);
