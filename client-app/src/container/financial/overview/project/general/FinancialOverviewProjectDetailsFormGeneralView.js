import React from 'react';

import ViewText from '../../../../../components/form/ViewText';
import Panel from '../../../../../components/panel/Panel';
import PanelBody from '../../../../../components/panel/PanelBody';
import moment from 'moment';
import moneyPresenter from '../../../../../helpers/MoneyPresenter';

const FinancialOverviewProjectDetailsFormGeneralView = props => {
    return (
        <div>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Project'} value={props.project.name} />
                    </div>
                    <div className="row">
                        <ViewText label={'Aantal deelnemers'} value={props.numberOfParticipantProjects} />
                    </div>
                    {props.financialOverview.usesInterimFinancialOverviews ? (
                        <div className="row">
                            <ViewText
                                label={'Aantal contacten reeds verwerkt'}
                                value={props.numberOfFinancialOverviewContactsSend}
                            />
                        </div>
                    ) : null}
                    {(props.totalQuantityStartValue !== null || props.totalQuantityEndValue !== null) && (
                        <div className="row">
                            <ViewText
                                label={'Totaal aantal deelnames per ' + moment(props.startDate).format('DD-MM-Y')}
                                value={props.totalQuantityStartValue}
                            />
                            <ViewText
                                label={'Totaal aantal deelnames per ' + moment(props.endDate).format('DD-MM-Y')}
                                value={props.totalQuantityEndValue}
                            />
                        </div>
                    )}
                    {(props.bookworthStartValue !== null || props.bookworthEndValue !== null) && (
                        <div className="row">
                            <ViewText
                                label={'Waarde per ' + moment(props.startDate).format('DD-MM-Y')}
                                value={moneyPresenter(props.bookworthStartValue)}
                            />
                            <ViewText
                                label={'Waarde per ' + moment(props.endDate).format('DD-MM-Y')}
                                value={moneyPresenter(props.bookworthEndValue)}
                            />
                        </div>
                    )}
                    {(props.totalAmountStartValue !== null || props.totalAmountEndValue !== null) && (
                        <div className="row">
                            <ViewText
                                label={'Totaal waarde per ' + moment(props.startDate).format('DD-MM-Y')}
                                value={moneyPresenter(props.totalAmountStartValue)}
                            />
                            <ViewText
                                label={'Totaal waarde per ' + moment(props.endDate).format('DD-MM-Y')}
                                value={moneyPresenter(props.totalAmountEndValue)}
                            />
                        </div>
                    )}
                </PanelBody>
            </Panel>
        </div>
    );
};

export default FinancialOverviewProjectDetailsFormGeneralView;
