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

const StyledEm = styled.em`
    font-weight: normal;
`;

const RevenueNew = props => {
    const {
        typeId,
        confirmed,
        dateBegin,
        dateEnd,
        dateReference,
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
        keyAmountFirstPercentage,
        payPercentageValidFromKeyAmount,
        categoryId,
        payoutKwh,
    } = props.revenue;

    const currentProjectRevenueCategorie = props.projectRevenueCategories.find(
        projectRevenueCategorie => projectRevenueCategorie.id == categoryId
    );

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
                    options={props.projectRevenueCategories}
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
                    label={'Peildatum'}
                    name={'dateReference'}
                    value={dateReference}
                    onChangeAction={props.handleInputChangeDate}
                    required={'required'}
                    error={props.errors.dateReference}
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
                    options={props.projectRevenueTypes}
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

            {currentProjectRevenueCategorie && currentProjectRevenueCategorie.codeRef === 'revenueKwh' ? (
                <React.Fragment>
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

            {currentProjectRevenueCategorie && currentProjectRevenueCategorie.codeRef === 'revenueEuro' ? (
                <React.Fragment>
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
        projectRevenueTypes: state.systemData.projectRevenueTypes,
        projectRevenueCategories: state.systemData.projectRevenueCategories,
    };
};

export default connect(mapStateToProps)(RevenueNew);
