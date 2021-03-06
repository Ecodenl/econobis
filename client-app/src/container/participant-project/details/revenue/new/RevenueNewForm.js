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
    const {
        confirmed,
        dateBegin,
        dateEnd,
        kwhStart,
        kwhEnd,
        kwhTotal,
        kwhStartHigh,
        kwhEndCalendarYearHigh,
        kwhEndHigh,
        kwhStartLow,
        kwhEndCalendarYearLow,
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
                        <InputDate label={'Begin periode'} name={'dateBegin'} value={dateBegin} readOnly={true} />
                        <InputDate label={'Eind periode'} name={'dateEnd'} value={dateEnd} readOnly={true} />
                    </div>

                    <React.Fragment>
                        <div className="row">
                            <div className={'panel-part panel-heading'}>
                                <span className={'h5 text-bold'}>Opbrengst kWh</span>
                            </div>
                        </div>

                        {moment(dateBegin).year() !== moment(dateEnd).year() ? (
                            <>
                                <div className="row">
                                    {props.participation.nextRevenueKwhStartHigh > 0 ||
                                    props.participation.participantInConfirmedRevenue ? (
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
                                </div>
                                <div className="row">
                                    {props.participation.nextRevenueKwhStartLow > 0 ||
                                    props.participation.participantInConfirmedRevenue ? (
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
                                </div>
                                <div className="row">
                                    <InputText
                                        type={'number'}
                                        label={'Eindstand kWh op 31-12 hoog'}
                                        name={'kwhEndCalendarYearHigh'}
                                        value={kwhEndCalendarYearHigh}
                                        onChangeAction={props.handleInputChange}
                                        error={props.errors.kwhEndCalendarYearHigh}
                                        errorMessage={props.errorMessage.kwhEndCalendarYearHigh}
                                    />
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
                                    <InputText
                                        type={'number'}
                                        label={'Eindstand kWh op 31-12 laag'}
                                        name={'kwhEndCalendarYearLow'}
                                        value={kwhEndCalendarYearLow}
                                        onChangeAction={props.handleInputChange}
                                        error={props.errors.kwhEndCalendarYearLow}
                                        errorMessage={props.errorMessage.kwhEndCalendarYearLow}
                                    />
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
                            </>
                        ) : (
                            <>
                                <div className="row">
                                    {props.participation.nextRevenueKwhStartHigh > 0 ||
                                    props.participation.participantInConfirmedRevenue ? (
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
                                    {props.participation.nextRevenueKwhStartLow > 0 ||
                                    props.participation.participantInConfirmedRevenue ? (
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
                            </>
                        )}
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
                            <InputText
                                type={'number'}
                                label={'Totaal productie kWh'}
                                name={'kwhTotal'}
                                value={kwhTotal}
                                readOnly={true}
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
