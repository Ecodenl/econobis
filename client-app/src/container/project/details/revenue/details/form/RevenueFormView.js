import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');

import ViewText from '../../../../../../components/form/ViewText';
import styled from '@emotion/styled';
import MoneyPresenter from '../../../../../../helpers/MoneyPresenter';

const StyledEm = styled.em`
    font-weight: normal;
`;

const RevenueFormView = props => {
    const {
        confirmed,
        dateBegin,
        dateEnd,
        dateReference,
        dateConfirmed,
        participantProjectPayoutType,
        kwhStart,
        kwhEnd,
        kwhStartHigh,
        kwhEndHigh,
        kwhStartLow,
        kwhEndLow,
        revenue,
        datePayed,
        payPercentage,
        payAmount,
        keyAmountFirstPercentage,
        payPercentageValidFromKeyAmount,
        category,
        project,
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

            {category.codeRef === 'revenueEuro' ? (
                <div className="row" onClick={props.switchToEdit}>
                    {project.projectType.codeRef === 'obligation' ? (
                        <ViewText
                            label={'Type opbrengst verdeling'}
                            value={distributionType ? distributionType.name : ''}
                        />
                    ) : null}
                    {distributionType && distributionType.id === 'inPossessionOf' ? (
                        <ViewText label={'Peildatum'} value={dateReference ? moment(dateReference).format('L') : ''} />
                    ) : null}
                </div>
            ) : null}

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Begin periode'} value={dateBegin ? moment(dateBegin).format('L') : ''} />
                <ViewText label={'Eind periode'} value={dateEnd ? moment(dateEnd).format('L') : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Datum definitief'} value={dateConfirmed ? moment(dateConfirmed).format('L') : ''} />
                {category.codeRef === 'revenueEuro' &&
                (project.projectType.codeRef === 'capital' ||
                    project.projectType.codeRef === 'postalcode_link_capital') ? (
                    <ViewText
                        label={'Uitkeren op'}
                        value={participantProjectPayoutType ? participantProjectPayoutType.name : ''}
                    />
                ) : null}
            </div>

            <div className="row" onClick={props.switchToEdit} />

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
                                        maximumFractionDigits: 5,
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
                        {project.projectType.codeRef === 'loan' || project.projectType.codeRef === 'obligation' ? (
                            <React.Fragment>
                                <div>
                                    <ViewText label={'Uitkering %'} value={payPercentage && payPercentage + '%'} />
                                    <ViewText
                                        label={
                                            project.projectType.codeRef === 'loan'
                                                ? 'of uitkeringsbedrag (per deelnemer)'
                                                : 'of uitkeringsbedrag (per participatie)'
                                        }
                                        value={MoneyPresenter(payAmount)}
                                    />
                                </div>
                                <div>
                                    <ViewText
                                        label={
                                            <React.Fragment>
                                                Bedrag <StyledEm>(uitkering % geldig tot en met)</StyledEm>
                                            </React.Fragment>
                                        }
                                        value={keyAmountFirstPercentage && '€ ' + keyAmountFirstPercentage}
                                    />
                                </div>
                            </React.Fragment>
                        ) : null}
                        {project.projectType.codeRef === 'capital' ||
                        project.projectType.codeRef === 'postalcode_link_capital' ? (
                            <React.Fragment>
                                <ViewText label={'Resultaat'} value={revenue} />
                            </React.Fragment>
                        ) : null}
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

            {category.codeRef === 'redemptionEuro' ? (
                <React.Fragment>
                    <div className={'panel-part panel-heading'} onClick={props.switchToEdit}>
                        <span className={'h5 text-bold'}>Aflossing euro</span>
                    </div>
                    {payAmount ? (
                        <React.Fragment>
                            <div className="row" onClick={props.switchToEdit}>
                                {project.projectType.codeRef === 'loan' ||
                                project.projectType.codeRef === 'obligation' ? (
                                    <ViewText
                                        label={'Aflossingsbedrag (per deelnemer)'}
                                        value={MoneyPresenter(payAmount)}
                                    />
                                ) : null}
                            </div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div className="row" onClick={props.switchToEdit}>
                                {project.projectType.codeRef === 'loan' ||
                                project.projectType.codeRef === 'obligation' ? (
                                    <ViewText label={'Aflossing %'} value={payPercentage && payPercentage + '%'} />
                                ) : null}
                            </div>
                        </React.Fragment>
                    )}
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
