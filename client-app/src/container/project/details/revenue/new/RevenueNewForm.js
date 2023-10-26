import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');
import InputSelect from '../../../../../components/form/InputSelect';
import InputDate from '../../../../../components/form/InputDate';
import ButtonText from '../../../../../components/button/ButtonText';
import PanelFooter from '../../../../../components/panel/PanelFooter';
import InputText from '../../../../../components/form/InputText';

import styled from '@emotion/styled';
import ViewText from '../../../../../components/form/ViewText';

const StyledEm = styled.em`
    font-weight: normal;
`;

const RevenueNew = props => {
    const {
        distributionTypeId,
        confirmed,
        dateBegin,
        dateEnd,
        dateReference,
        payoutTypeId,
        kwhStart,
        kwhEnd,
        kwhTotal,
        kwhStartHigh,
        kwhEndCalendarYearHigh,
        kwhEndHigh,
        kwhStartLow,
        kwhEndCalendarYearLow,
        kwhEndLow,
        revenue,
        payPercentage,
        payAmount,
        keyAmountFirstPercentage,
        payPercentageValidFromKeyAmount,
        categoryId,
        payoutKwh,
    } = props.revenue;

    const category = props.projectRevenueCategories.find(
        projectRevenueCategorie => projectRevenueCategorie.id == categoryId
    );

    let projectTypeCodeRef = '';
    if (props.project && props.project.projectType && props.project.projectType.codeRef) {
        projectTypeCodeRef = props.project.projectType.codeRef;
    }

    const isPeriodExceedingYear = (dateBegin, dateEnd) => {
        dateBegin = moment(dateBegin);
        dateEnd = moment(dateEnd);

        return dateEnd.year() > dateBegin.year();
    };

    return (
        <form className="form-horizontal col-md-12" onSubmit={props.handleSubmit}>
            <div className="row">
                <div className={'panel-heading'}>
                    <span className={'h5 text-bold'}>Algemeen</span>
                </div>
            </div>
            <div className="row">
                <ViewText label={'Soort'} value={category ? category.name : ''} className={'form-group col-sm-6'} />
                <ViewText label={'Definitief'} value={confirmed ? 'Ja' : 'Nee'} className={'form-group col-sm-6'} />
            </div>

            {category.codeRef === 'revenueEuro' ? (
                <div className="row">
                    {projectTypeCodeRef !== 'loan' ? (
                        <InputSelect
                            label={'Type opbrengst verdeling'}
                            name={'distributionTypeId'}
                            options={props.projectRevenueDistributionTypes}
                            value={distributionTypeId}
                            onChangeAction={props.handleInputChange}
                            error={props.errors.distributionTypeId}
                        />
                    ) : null}
                    {distributionTypeId === 'inPossessionOf' ? (
                        <InputDate
                            label={'Peildatum'}
                            name={'dateReference'}
                            value={dateReference}
                            onChangeAction={props.handleInputChangeDate}
                            required={'required'}
                            error={props.errors.dateReference}
                        />
                    ) : null}
                </div>
            ) : null}

            {category.codeRef === 'redemptionEuro' ? (
                <div className="row">
                    {distributionTypeId === 'inPossessionOf' ? (
                        <InputDate
                            label={'Peildatum'}
                            name={'dateReference'}
                            value={dateReference}
                            onChangeAction={props.handleInputChangeDate}
                            required={'required'}
                            error={props.errors.dateReference}
                        />
                    ) : null}
                </div>
            ) : null}

            <div className="row">
                <InputDate
                    label={
                        <span>
                            Begin periode
                            {props.project &&
                            props.project.dateInterestBearingRedemption &&
                            category.codeRef === 'redemptionEuro' &&
                            moment(dateBegin).format('Y-MM-DD') <
                                moment(props.project.dateInterestBearingRedemption).format('Y-MM-DD') ? (
                                <>
                                    <br />
                                    <small style={{ color: 'red', fontWeight: 'normal' }}>
                                        Let op de begin periode ligt voor de eind periode van de vorige aflossing.
                                    </small>
                                </>
                            ) : (
                                ''
                            )}
                            {category.codeRef === 'revenueEuro' && props.project.dateInterestBearingWrong ? (
                                <>
                                    <br />
                                    <small style={{ color: 'red', fontWeight: 'normal' }}>
                                        Afwijkende begindatum verwacht
                                    </small>
                                </>
                            ) : null}
                            {category.codeRef === 'redemptionEuro' &&
                            props.project.dateInterestBearingRedemptionWrong ? (
                                <>
                                    <br />
                                    <small style={{ color: 'red', fontWeight: 'normal' }}>
                                        Afwijkende begindatum verwacht
                                    </small>
                                </>
                            ) : null}
                        </span>
                    }
                    name={'dateBegin'}
                    value={dateBegin}
                    onChangeAction={props.handleInputChangeDate}
                    required={category.codeRef !== 'redemptionEuro' ? 'required' : ''}
                    error={props.errors.dateBegin}
                    errorMessage={props.errorMessage.dateBegin}
                    disabledBefore={
                        category.codeRef === 'revenueEuro' &&
                        (projectTypeCodeRef === 'loan' || projectTypeCodeRef === 'obligation')
                            ? props.project.dateInterestBearing
                            : category.codeRef === 'redemptionEuro'
                            ? moment(props.project.dateInterestBearingRedemption)
                                  .add(-1, 'year')
                                  .format('Y-MM-DD')
                            : category.codeRef === 'revenueKwh'
                            ? props.project.dateInterestBearingKwh
                            : ''
                    }
                />
                <InputDate
                    label={'Eind periode'}
                    name={'dateEnd'}
                    value={dateEnd}
                    onChangeAction={props.handleInputChangeDate}
                    required={category.codeRef !== 'redemptionEuro' ? 'required' : ''}
                    error={props.errors.dateEnd}
                    errorMessage={props.errorMessage.dateEnd}
                    disabledBefore={dateBegin}
                    disabledAfter={
                        category.codeRef === 'revenueKwh'
                            ? moment(dateBegin)
                                  .add(1, 'year')
                                  .add(6, 'month')
                                  .add(-1, 'day')
                                  .format('Y-MM-DD')
                            : moment(dateBegin)
                                  .add(1, 'year')
                                  .add(-1, 'day')
                                  .format('Y-MM-DD')
                    }
                />
            </div>

            <div className="row">
                <div className="form-group col-sm-6" />
                {category.codeRef === 'revenueEuro' &&
                (projectTypeCodeRef === 'capital' || projectTypeCodeRef === 'postalcode_link_capital') ? (
                    <InputSelect
                        label={'Uitkeren op'}
                        name={'payoutTypeId'}
                        id={'payoutTypeId'}
                        options={props.participantProjectPayoutTypes}
                        value={payoutTypeId}
                        onChangeAction={props.handleInputChange}
                        required={'required'}
                        error={props.errors.payoutTypeId}
                        errorMessage={props.errorMessage.payoutTypeId}
                    />
                ) : null}
            </div>

            {category.codeRef === 'revenueKwh' ? (
                <>
                    <div className="row">
                        <div className={'panel-part panel-heading'}>
                            <span className={'h5 text-bold'}>Opbrengst kWh</span>
                        </div>
                    </div>

                    {isPeriodExceedingYear(dateBegin, dateEnd) ? (
                        <>
                            <div className="row">
                                {props.project.kwhStartHighNextRevenue > 0 ? (
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
                                {props.project.kwhStartHighNextRevenue > 0 ? (
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
                                    required={'required'}
                                />
                                <InputText
                                    type={'number'}
                                    label={'Eindstand kWh hoog'}
                                    name={'kwhEndHigh'}
                                    value={kwhEndHigh}
                                    onChangeAction={props.handleInputChange}
                                    error={props.errors.kwhEndHigh}
                                    errorMessage={props.errorMessage.kwhEndHigh}
                                    required={'required'}
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
                                {props.project.kwhStartHighNextRevenue > 0 ? (
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
                                {props.project.kwhStartHighNextRevenue > 0 ? (
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
                        <InputText
                            type={'number'}
                            label={'Totaal productie kWh'}
                            name={'kwhTotal'}
                            value={kwhTotal}
                            readOnly={true}
                        />
                    </div>
                </>
            ) : null}

            {category.codeRef === 'revenueEuro' ? (
                <>
                    <div className="row">
                        <div className={'panel-part panel-heading'}>
                            <span className={'h5 text-bold'}>Opbrengst euro</span>
                        </div>
                    </div>
                    {projectTypeCodeRef === 'loan' || projectTypeCodeRef === 'obligation' ? (
                        <>
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Uitkering (rente) %'}
                                    name={'payPercentage'}
                                    value={payPercentage}
                                    onChangeAction={props.handleInputChange}
                                    error={props.errors.payPercentage}
                                    errorMessage={props.errorMessage.payPercentage}
                                />
                                <InputText
                                    type={'number'}
                                    label={'of uitkeringsbedrag per deelname'}
                                    name={'payAmount'}
                                    value={payAmount}
                                    onChangeAction={props.handleInputChange}
                                    error={props.errors.payAmount}
                                    errorMessage={props.errorMessage.payAmount}
                                />
                            </div>
                            <div className="row">
                                <InputText
                                    label={
                                        <>
                                            Bedrag <StyledEm>(uitkering % geldig tot en met)</StyledEm>
                                        </>
                                    }
                                    name={'keyAmountFirstPercentage'}
                                    value={keyAmountFirstPercentage}
                                    onChangeAction={props.handleInputChange}
                                    error={props.errors.keyAmountFirstPercentage}
                                />
                            </div>
                            {keyAmountFirstPercentage ? (
                                <div className="row">
                                    <InputText
                                        type={'number'}
                                        label={<>Uitkering (rente) % vanaf bedrag</>}
                                        name={'payPercentageValidFromKeyAmount'}
                                        value={payPercentageValidFromKeyAmount}
                                        onChangeAction={props.handleInputChange}
                                        error={props.errors.payPercentageValidFromKeyAmount}
                                    />
                                </div>
                            ) : null}
                        </>
                    ) : null}
                    {projectTypeCodeRef === 'capital' || projectTypeCodeRef === 'postalcode_link_capital' ? (
                        <>
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Resultaat'}
                                    name={'revenue'}
                                    value={revenue}
                                    onChangeAction={props.handleInputChange}
                                    size={'col-sm-5'}
                                    textToolTip={
                                        'Vul hier hier het totaal resultaat in dat je wilt verdelen over alle deelnemers. Econobis maakt vanuit dit totaal de verdeling per deelnemer'
                                    }
                                />
                            </div>
                        </>
                    ) : null}
                </>
            ) : null}

            {category.codeRef === 'redemptionEuro' ? (
                <>
                    <div className="row">
                        <div className={'panel-part panel-heading'}>
                            <span className={'h5 text-bold'}>Aflossing euro</span>
                        </div>
                    </div>
                    {projectTypeCodeRef === 'loan' || projectTypeCodeRef === 'obligation' ? (
                        <>
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Aflossing %'}
                                    name={'payPercentage'}
                                    value={payPercentage}
                                    onChangeAction={props.handleInputChange}
                                    error={props.errors.payPercentage}
                                    errorMessage={props.errorMessage.payPercentage}
                                />
                                <InputText
                                    type={'number'}
                                    label={'of aflossingsbedrag per deelname'}
                                    name={'payAmount'}
                                    value={payAmount}
                                    onChangeAction={props.handleInputChange}
                                    error={props.errors.payAmount}
                                    errorMessage={props.errorMessage.payAmount}
                                />
                            </div>
                        </>
                    ) : null}
                </>
            ) : null}

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
        projectRevenueTypes: state.systemData.projectRevenueTypes,
        projectRevenueCategories: state.systemData.projectRevenueCategories,
        projectRevenueDistributionTypes: state.systemData.projectRevenueDistributionTypes,
        participantProjectPayoutTypes: state.systemData.participantProjectPayoutTypes,
    };
};

export default connect(mapStateToProps)(RevenueNew);
