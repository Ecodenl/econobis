import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');

import ViewText from '../../../../../../components/form/ViewText';
import styled from '@emotion/styled';

const StyledEm = styled.em`
    font-weight: normal;
`;

const RevenueFormView = props => {
    const {
        type,
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
        category,
        payoutKwh,
        distributionType,
    } = props.revenue;

    return (
        <div>
            <div className={'panel-heading'} onClick={props.switchToEdit}>
                <span className={'h5 text-bold'}>Algemeen</span>
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Soort'} value={category ? category.name : ''} />
                <ViewText label={'Definitief'} value={confirmed ? 'Ja' : 'Nee'} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Begin periode'} value={dateBegin ? moment(dateBegin.date).format('L') : ''} />
                <ViewText label={'Eind periode'} value={dateEnd ? moment(dateEnd.date).format('L') : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Peildatum'} value={dateReference ? moment(dateReference.date).format('L') : ''} />
                <ViewText
                    label={'Datum definitief'}
                    value={dateConfirmed ? moment(dateConfirmed.date).format('L') : ''}
                />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Type opbrengst'} value={type ? type.name : ''} />
                <ViewText label={'Datum uitgekeerd'} value={datePayed ? moment(datePayed.date).format('L') : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Type opbrengst verdeling'} value={distributionType ? distributionType.name : ''} />
            </div>

            {category.codeRef === 'revenueKwh' ? (
                <React.Fragment>
                    <div className={'panel-part panel-heading'} onClick={props.switchToEdit}>
                        <span className={'h5 text-bold'}>Opbrengst kWh</span>
                    </div>

                    <div className="row" onClick={props.switchToEdit}>
                        <ViewText label={'Beginstand kWh hoog'} value={kwhStartHigh && kwhStartHigh} />
                        <ViewText label={'Eindstand kWh hoog'} value={kwhEndHigh && kwhEndHigh} />
                    </div>

                    <div className="row" onClick={props.switchToEdit}>
                        <ViewText label={'Beginstand kWh laag'} value={kwhStartLow && kwhStartLow} />
                        <ViewText label={'Eindstand kWh laag'} value={kwhEndLow && kwhEndLow} />
                    </div>

                    <div className="row" onClick={props.switchToEdit}>
                        <ViewText label={'Beginstand kWh'} value={kwhStart && kwhStart} />
                        <ViewText label={'Eindstand kWh'} value={kwhEnd && kwhEnd} />
                    </div>

                    <div className="row" onClick={props.switchToEdit}>
                        <ViewText
                            label={'Opbrengst kWh €'}
                            value={
                                payoutKwh &&
                                '€ ' +
                                    payoutKwh.toLocaleString('nl', {
                                        minimumFractionDigits: 3,
                                        maximumFractionDigits: 3,
                                    })
                            }
                        />
                    </div>
                </React.Fragment>
            ) : null}

            {category.codeRef === 'revenueEuro' ? (
                <React.Fragment>
                    <div className={'panel-part panel-heading'} onClick={props.switchToEdit}>
                        <span className={'h5 text-bold'}>Opbrengst euro</span>
                    </div>
                    <div className="row" onClick={props.switchToEdit}>
                        <ViewText label={'Uitkering %'} value={payPercentage && payPercentage + '%'} />
                        <ViewText
                            label={
                                <React.Fragment>
                                    Bedrag <StyledEm>(uitkering % geldig tot en met)</StyledEm>
                                </React.Fragment>
                            }
                            value={keyAmountFirstPercentage && '€ ' + keyAmountFirstPercentage}
                        />
                    </div>
                    {keyAmountFirstPercentage ? (
                        <div className="row">
                            <ViewText
                                type={'number'}
                                label={<React.Fragment>Uitkering % vanaf bedrag</React.Fragment>}
                                value={payPercentageValidFromKeyAmount && payPercentageValidFromKeyAmount + '%'}
                            />
                        </div>
                    ) : null}
                </React.Fragment>
            ) : null}
        </div>
    );
};

const mapStateToProps = state => {
    return {
        revenue: state.projectRevenue,
    };
};

export default connect(mapStateToProps)(RevenueFormView);
