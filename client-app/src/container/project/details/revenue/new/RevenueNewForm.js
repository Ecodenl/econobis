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
        dateConfirmed,
        payoutTypeId,
        kwhStart,
        kwhEnd,
        kwhStartHigh,
        kwhEndHigh,
        kwhStartLow,
        kwhEndLow,
        revenue,
        payPercentage,
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
                    {projectTypeCodeRef === 'obligation' ? (
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
                    label={'Begin periode'}
                    name={'dateBegin'}
                    value={dateBegin}
                    onChangeAction={props.handleInputChangeDate}
                    required={'required'}
                    error={props.errors.dateBegin}
                    // disabledBefore={
                    //     category.codeRef === 'revenueEuro'
                    //         ? props.project.dateInterestBearing
                    //         : category.codeRef === 'redemptionEuro'
                    //         ? props.project.dateInterestBearingRedemption
                    //         : category.codeRef === 'revenueKwh'
                    //             ? props.project.dateInterestBearingKwh
                    //             : ''
                    disabledBefore={category.codeRef === 'revenueKwh' ? props.project.dateInterestBearingKwh : ''}
                />
                <InputDate
                    label={'Eind periode'}
                    name={'dateEnd'}
                    value={dateEnd}
                    onChangeAction={props.handleInputChangeDate}
                    required={'required'}
                    error={props.errors.dateEnd}
                    disabledBefore={dateBegin}
                    disabledAfter={moment(dateBegin)
                        .endOf('year')
                        .format('Y-MM-DD')}
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
                <React.Fragment>
                    <div className="row">
                        <div className={'panel-part panel-heading'}>
                            <span className={'h5 text-bold'}>Opbrengst kWh</span>
                        </div>
                    </div>

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
                                payoutKwh.toLocaleString('nl', { minimumFractionDigits: 3, maximumFractionDigits: 3 })
                            }
                            onChangeAction={props.handleInputChange}
                        />
                    </div>
                </React.Fragment>
            ) : null}

            {category.codeRef === 'revenueEuro' ? (
                <React.Fragment>
                    <div className="row">
                        <div className={'panel-part panel-heading'}>
                            <span className={'h5 text-bold'}>Opbrengst euro</span>
                        </div>
                    </div>
                    {projectTypeCodeRef === 'loan' || projectTypeCodeRef === 'obligation' ? (
                        <React.Fragment>
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Uitkering %'}
                                    name={'payPercentage'}
                                    value={payPercentage}
                                    onChangeAction={props.handleInputChange}
                                />
                                <InputText
                                    label={
                                        <React.Fragment>
                                            Bedrag <StyledEm>(uitkering % geldig tot en met)</StyledEm>
                                        </React.Fragment>
                                    }
                                    name={'keyAmountFirstPercentage'}
                                    value={keyAmountFirstPercentage}
                                    onChangeAction={props.handleInputChange}
                                />
                            </div>
                            {keyAmountFirstPercentage ? (
                                <div className="row">
                                    <InputText
                                        type={'number'}
                                        label={<React.Fragment>Uitkering % vanaf bedrag</React.Fragment>}
                                        name={'payPercentageValidFromKeyAmount'}
                                        value={payPercentageValidFromKeyAmount}
                                        onChangeAction={props.handleInputChange}
                                    />
                                </div>
                            ) : null}
                        </React.Fragment>
                    ) : null}
                    {projectTypeCodeRef === 'capital' || projectTypeCodeRef === 'postalcode_link_capital' ? (
                        <React.Fragment>
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Resultaat'}
                                    name={'revenue'}
                                    value={revenue}
                                    onChangeAction={props.handleInputChange}
                                />
                            </div>
                        </React.Fragment>
                    ) : null}
                </React.Fragment>
            ) : null}

            {category.codeRef === 'redemptionEuro' ? (
                <React.Fragment>
                    <div className="row">
                        <div className={'panel-part panel-heading'}>
                            <span className={'h5 text-bold'}>Aflossing euro</span>
                        </div>
                    </div>
                    {projectTypeCodeRef === 'loan' || projectTypeCodeRef === 'obligation' ? (
                        <React.Fragment>
                            <div className="row">
                                <InputText
                                    type={'number'}
                                    label={'Aflossing %'}
                                    name={'payPercentage'}
                                    value={payPercentage}
                                    onChangeAction={props.handleInputChange}
                                />
                            </div>
                        </React.Fragment>
                    ) : null}
                </React.Fragment>
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
