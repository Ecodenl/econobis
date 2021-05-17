import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');
import InputDate from '../../../../../components/form/InputDate';
import ButtonText from '../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../components/panel/PanelFooter';
import InputText from '../../../../../components/form/InputText';

import ViewText from '../../../../../components/form/ViewText';

const RevenueNew = props => {
    // console.log(props);
    const {
        confirmed,
        dateBegin,
        dateEnd,
        kwhStart,
        kwhEnd,
        kwhStartHigh,
        kwhEndHigh,
        kwhStartLow,
        kwhEndLow,
        categoryId,
        payoutKwh,
    } = props.revenue;

    const category = props.projectRevenueCategories.find(
        projectRevenueCategorie => projectRevenueCategorie.id == categoryId
    );

    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>
            {props.participation && props.participation.project ? (
                <>
                    <div className="row">
                        <div className={'panel-heading'}>
                            <span className={'h5 text-bold'}>Algemene informatie</span>
                        </div>
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Soort'}
                            value={category ? category.name : ''}
                            className={'form-group col-sm-6'}
                        />
                        <ViewText
                            label={'Definitief'}
                            value={confirmed ? 'Ja' : 'Nee'}
                            className={'form-group col-sm-6'}
                        />
                    </div>

                    <div className="row">
                        <InputDate
                            label={'Begin periode'}
                            name={'dateBegin'}
                            value={dateBegin}
                            readOnly={true}
                            // onChangeAction={props.handleInputChangeDate}
                            // required={'required'}
                            // error={props.errors.dateBegin}
                            // errorMessage={props.errorMessage.dateBegin}
                            // disabledBefore={props.participation.project.dateInterestBearingKwh}
                        />
                        <InputDate
                            label={'Eind periode'}
                            name={'dateEnd'}
                            value={dateEnd}
                            readOnly={true}
                            // onChangeAction={props.handleInputChangeDate}
                            // required={'required'}
                            // error={props.errors.dateEnd}
                            // errorMessage={props.errorMessage.dateEnd}
                            // disabledBefore={dateBegin}
                            // disabledAfter={moment(dateBegin)
                            //     .add(1, 'year')
                            //     .add(6, 'month')
                            //     .add(-1, 'day')
                            //     .format('Y-MM-DD')}
                        />
                    </div>

                    <React.Fragment>
                        <div className="row">
                            <div className={'panel-part panel-heading'}>
                                <span className={'h5 text-bold'}>Opbrengst kWh</span>
                            </div>
                        </div>

                        <div className="row">
                            {props.participation.kwhStartHighNextRevenue > 0 ? (
                                <InputText
                                    type={'number'}
                                    label={'Beginstand kWh hoog'}
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
                                    onChangeAction={props.handleInputChange}
                                />
                            )}
                            <InputText
                                type={'number'}
                                label={'Eindstand kWh hoog'}
                                name={'kwhEndHigh'}
                                value={kwhEndHigh}
                                onChangeAction={props.handleInputChange}
                                error={props.errors.kwhEndHigh}
                                errorMessage={props.errorMessage.kwhEndHigh}
                            />
                        </div>

                        <div className="row">
                            {props.participation.kwhStartHighNextRevenue > 0 ? (
                                <InputText
                                    type={'number'}
                                    label={'Beginstand kWh laag'}
                                    name={'kwhStartLow'}
                                    value={kwhStartLow}
                                    readOnly={true}
                                />
                            ) : (
                                <InputText
                                    type={'number'}
                                    label={'Beginstand kWh laag'}
                                    name={'kwhStartLow'}
                                    value={kwhStartLow}
                                    onChangeAction={props.handleInputChange}
                                />
                            )}
                            <InputText
                                type={'number'}
                                label={'Eindstand kWh laag'}
                                name={'kwhEndLow'}
                                value={kwhEndLow}
                                onChangeAction={props.handleInputChange}
                                error={props.errors.kwhEndLow}
                                errorMessage={props.errorMessage.kwhEndLow}
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
                            <InputText
                                type={'number'}
                                label={'Eindstand kWh'}
                                name={'kwhEnd'}
                                value={kwhEnd}
                                readOnly={true}
                            />
                        </div>

                        <div className="row">
                            <InputText
                                type={'number'}
                                label={'Opbrengst kWh €'}
                                name={'payoutKwh'}
                                value={
                                    payoutKwh &&
                                    payoutKwh.toLocaleString('nl', {
                                        minimumFractionDigits: 3,
                                        maximumFractionDigits: 5,
                                    })
                                }
                                onChangeAction={props.handleInputChange}
                            />
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
                </>
            ) : null}
        </form>
    );
};

const mapStateToProps = state => {
    return {
        projectRevenueCategories: state.systemData.projectRevenueCategories,
        projectRevenueDistributionTypes: state.systemData.projectRevenueDistributionTypes,
        participantProjectPayoutTypes: state.systemData.participantProjectPayoutTypes,
    };
};

export default connect(mapStateToProps)(RevenueNew);
