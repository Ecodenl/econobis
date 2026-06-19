import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

moment.locale('nl');

import ViewText from '../../../../../../components/form/ViewText';
import styled from '@emotion/styled';
import MoneyPresenter from '../../../../../../helpers/MoneyPresenter';
import PanelFooter from '../../../../../../components/panel/PanelFooter';
import ButtonText from '../../../../../../components/button/ButtonText';

const StyledEm = styled.em`
    font-weight: normal;
`;

const RevenueFormView = props => {
    const {
        confirmed,
        status,
        dateBegin,
        dateEnd,
        dateReference,
        dateConfirmed,
        participantProjectPayoutType,
        kwhStart,
        kwhEnd,
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
        category,
        project,
        payoutKwh,
        distributionType,
    } = props.revenue;

    const statusConcept = !!(status && status === 'concept');
    const kwhTotal = kwhEnd - kwhStart;

    let statusText = '';
    switch (status) {
        case 'concept':
            statusText = 'Concept';
            break;
        case 'concept-to-update':
            statusText = 'Concept (bijwerken noodzakelijk)';
            break;
        case 'confirmed':
            statusText = 'Definitief';
            break;
        case 'in-progress':
            statusText = 'Bezig...';
            break;
        case 'processed':
            statusText = 'Verwerkt';
            break;
    }

    return (
        <div>
            <div className={'panel-heading'} onClick={props.switchToEdit}>
                <span className={'h5 text-bold'}>Algemeen</span>
            </div>
            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Soort'} value={category ? category.name : ''} />
                <ViewText label={'Definitief'} value={confirmed ? 'Ja' : 'Nee'} />
            </div>

            {category.codeRef === 'revenueEuro' || category.codeRef === 'revenueParticipant' ? (
                <div className="row" onClick={props.switchToEdit}>
                    {project.projectType.codeRef !== 'loan' ? (
                        <>
                            <ViewText
                                label={'Type opbrengst verdeling'}
                                value={distributionType ? distributionType.name : ''}
                            />
                            {distributionType && distributionType.id === 'inPossessionOf' ? (
                                <ViewText
                                    label={'Peildatum'}
                                    value={dateReference ? moment(dateReference).format('L') : ''}
                                />
                            ) : null}
                        </>
                    ) : (
                        <ViewText
                            label={'Type Lening'}
                            value={project.projectLoanType ? project.projectLoanType.name : ''}
                        />
                    )}
                </div>
            ) : null}

            {category.codeRef === 'redemptionEuro' ? (
                <div className="row" onClick={props.switchToEdit}>
                    {project.projectType.codeRef === 'loan' ? (
                        <ViewText
                            label={'Type Lening'}
                            value={project.projectLoanType ? project.projectLoanType.name : ''}
                        />
                    ) : null}
                    {distributionType &&
                    distributionType.id === 'inPossessionOf' &&
                    (project.projectType.codeRef !== 'loan' || project.projectLoanType.codeRef === 'annuitair') ? (
                        <ViewText label={'Peildatum'} value={dateReference ? moment(dateReference).format('L') : ''} />
                    ) : null}
                </div>
            ) : null}

            <div className="row" onClick={props.switchToEdit}>
                <ViewText
                    label={
                        <span>
                            Begin periode
                            {project &&
                            !confirmed &&
                            project.dateInterestBearingRedemption &&
                            category.codeRef === 'redemptionEuro' &&
                            moment(dateBegin).format('Y-MM-DD') <
                                moment(project.dateInterestBearingRedemption).format('Y-MM-DD') ? (
                                <React.Fragment>
                                    <br />
                                    <small style={{ color: 'red', fontWeight: 'normal' }}>
                                        Let op de begin periode ligt voor de eind periode van de vorige aflossing.
                                    </small>
                                </React.Fragment>
                            ) : (
                                ''
                            )}
                        </span>
                    }
                    value={dateBegin ? moment(dateBegin).format('L') : ''}
                />
                <ViewText label={'Eind periode'} value={dateEnd ? moment(dateEnd).format('L') : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText label={'Status'} value={statusText} />
                <ViewText label={'Datum definitief'} value={dateConfirmed ? moment(dateConfirmed).format('L') : ''} />
            </div>

            <div className="row" onClick={props.switchToEdit}>
                <ViewText className={'col-sm-6'} />

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

                    {moment(dateBegin).year() !== moment(dateEnd).year() ? (
                        <>
                            <div className="row" onClick={props.switchToEdit}>
                                <ViewText label={'Beginstand kWh hoog'} value={kwhStartHigh && kwhStartHigh} />
                            </div>

                            <div className="row" onClick={props.switchToEdit}>
                                <ViewText label={'Beginstand kWh laag'} value={kwhStartLow && kwhStartLow} />
                            </div>

                            <div className="row" onClick={props.switchToEdit}>
                                <ViewText
                                    label={'Eindstand kWh op 31-12 hoog'}
                                    value={kwhEndCalendarYearHigh && kwhEndCalendarYearHigh}
                                />
                                <ViewText label={'Eindstand kWh hoog'} value={kwhEndHigh && kwhEndHigh} />
                            </div>

                            <div className="row" onClick={props.switchToEdit}>
                                <ViewText
                                    label={'Eindstand kWh op 31-12 laag'}
                                    value={kwhEndCalendarYearLow && kwhEndCalendarYearLow}
                                />
                                <ViewText label={'Eindstand kWh laag'} value={kwhEndLow && kwhEndLow} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="row" onClick={props.switchToEdit}>
                                <ViewText label={'Beginstand kWh hoog'} value={kwhStartHigh && kwhStartHigh} />
                                <ViewText label={'Eindstand kWh hoog'} value={kwhEndHigh && kwhEndHigh} />
                            </div>

                            <div className="row" onClick={props.switchToEdit}>
                                <ViewText label={'Beginstand kWh laag'} value={kwhStartLow && kwhStartLow} />
                                <ViewText label={'Eindstand kWh laag'} value={kwhEndLow && kwhEndLow} />
                            </div>
                        </>
                    )}
                    <div className="row" onClick={props.switchToEdit}>
                        <ViewText label={'Beginstand kWh'} value={kwhStart && kwhStart} />
                        <ViewText label={'Eindstand kWh'} value={kwhEnd && kwhEnd} />
                    </div>

                    <div className="row" onClick={props.switchToEdit}>
                        <ViewText
                            label={'Teruggave EB per kWh €'}
                            value={
                                payoutKwh &&
                                payoutKwh.toLocaleString('nl', {
                                    minimumFractionDigits: 3,
                                    maximumFractionDigits: 5,
                                })
                            }
                        />
                        <ViewText label={'Totaal productie kWh'} value={kwhTotal && kwhTotal} />
                    </div>
                </React.Fragment>
            ) : null}

            {category.codeRef === 'revenueEuro' || category.codeRef === 'revenueParticipant' ? (
                <React.Fragment>
                    <div className={'panel-part panel-heading'} onClick={props.switchToEdit}>
                        <span className={'h5 text-bold'}>Opbrengst euro</span>
                    </div>
                    {project.projectType.codeRef === 'loan' || project.projectType.codeRef === 'obligation' ? (
                        <>
                            <div className="row" onClick={props.switchToEdit}>
                                <div>
                                    <ViewText
                                        label={'Uitkering (rente) %'}
                                        value={payPercentage && payPercentage + '%'}
                                    />
                                    {distributionType && distributionType.id === 'inPossessionOf' ? (
                                        <ViewText
                                            label={'of uitkeringsbedrag per deelname'}
                                            value={MoneyPresenter(payAmount)}
                                        />
                                    ) : null}
                                </div>
                            </div>
                            <div className="row" onClick={props.switchToEdit}>
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
                            </div>
                        </>
                    ) : null}
                    {project.projectType.codeRef === 'capital' ||
                    project.projectType.codeRef === 'postalcode_link_capital' ? (
                        <div className="row" onClick={props.switchToEdit}>
                            <ViewText label={'Resultaat'} value={revenue} />
                        </div>
                    ) : null}
                    {keyAmountFirstPercentage ? (
                        <div className="row">
                            <ViewText
                                type={'number'}
                                label={<React.Fragment>Uitkering (rente) % vanaf bedrag</React.Fragment>}
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
                                        label={'Aflossing bedrag per deelname'}
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
            {statusConcept ? (
                <PanelFooter>
                    <div className="pull-right btn-group" role="group">
                        <ButtonText buttonText={'Definitief maken'} onClickAction={props.setConfirmModal} />
                    </div>
                </PanelFooter>
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
