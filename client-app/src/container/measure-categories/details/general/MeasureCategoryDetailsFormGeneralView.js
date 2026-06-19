import React from 'react';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const MeasureCategoryDetailsFormGeneralView = ({
    name,
    usesWfCreateOpportunity,
    measureWorkflowCreateOpportunity,
    opportunityStatusWorkflowCreateOpportunity,
    usesWfCreateQuotationRequest,
    organisationWorkflowCreateQuotationRequest,
    usesWfEmailQuotationRequest,
    emailTemplateWorkflowCreateQuotationRequest,
    switchToEdit,
    explanationWfCreateOpportunity,
    explanationWfCreateQuotationRequest,
    explanationWfEmailQuotationRequest,
    calendarBackgroundColor,
    calendarTextColor
}) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText
                            label={'Omschrijving'}
                            divSize={'col-sm-10'}
                            value={name}
                            className={'col-sm-10 form-group'}
                        />
                    </div>
                    <div className="row">
                        <ViewText
                            label={'Gebruikt workflow maak kans'}
                            divSize={'col-sm-10'}
                            value={usesWfCreateOpportunity ? 'Ja' : 'Nee'}
                            className={'col-sm-10 form-group'}
                        />
                    </div>

                    {usesWfCreateOpportunity == true && (
                        <React.Fragment>
                            <div className="row">
                                <ViewText
                                    label={'Uitleg workflow maak kans'}
                                    divSize={'col-sm-10'}
                                    value={explanationWfCreateOpportunity}
                                    className={'col-sm-10 form-group'}
                                />
                            </div>
                            <div className="row">
                                <ViewText
                                    label={'Voor welke maatregel kans maken?'}
                                    divSize={'col-sm-10'}
                                    value={
                                        measureWorkflowCreateOpportunity ? measureWorkflowCreateOpportunity.name : ''
                                    }
                                    className={'col-sm-10 form-group'}
                                />
                            </div>
                            <div className="row">
                                <ViewText
                                    label={'Zet kans status'}
                                    divSize={'col-sm-10'}
                                    value={
                                        opportunityStatusWorkflowCreateOpportunity
                                            ? opportunityStatusWorkflowCreateOpportunity.name
                                            : ''
                                    }
                                    className={'col-sm-10 form-group'}
                                />
                            </div>

                            <div className="row">
                                <ViewText
                                    label={'Maak kansactie'}
                                    divSize={'col-sm-10'}
                                    value={usesWfCreateQuotationRequest ? 'Ja' : 'Nee'}
                                    className={'col-sm-10 form-group'}
                                />
                            </div>

                            {usesWfCreateQuotationRequest == true && (
                                <React.Fragment>
                                    <div className="row">
                                        <ViewText
                                            label={'Uitleg workflow maak kansactie'}
                                            divSize={'col-sm-10'}
                                            value={explanationWfCreateQuotationRequest}
                                            className={'col-sm-10 form-group'}
                                        />
                                    </div>
                                    <div className="row">
                                        <ViewText
                                            label={'Kansactie voor'}
                                            divSize={'col-sm-10'}
                                            value={
                                                organisationWorkflowCreateQuotationRequest
                                                    ? organisationWorkflowCreateQuotationRequest.name
                                                    : ''
                                            }
                                            className={'col-sm-10 form-group'}
                                        />
                                    </div>
                                    <div className="row">
                                        <ViewText
                                            label={'Stuur kansactie mail'}
                                            divSize={'col-sm-10'}
                                            value={usesWfEmailQuotationRequest ? 'Ja' : 'Nee'}
                                            className={'col-sm-10 form-group'}
                                        />
                                    </div>

                                    {usesWfEmailQuotationRequest == true && (
                                        <React.Fragment>
                                            <div className="row">
                                                <ViewText
                                                    label={'Uitleg workflow stuur kansactie mail'}
                                                    divSize={'col-sm-10'}
                                                    value={explanationWfEmailQuotationRequest}
                                                    className={'col-sm-10 form-group'}
                                                />
                                            </div>
                                            <div className="row">
                                                <ViewText
                                                    label={'Email template kansactie'}
                                                    divSize={'col-sm-10'}
                                                    value={
                                                        emailTemplateWorkflowCreateQuotationRequest
                                                            ? emailTemplateWorkflowCreateQuotationRequest.name
                                                            : ''
                                                    }
                                                    className={'col-sm-10 form-group'}
                                                />
                                            </div>
                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            )}
                        </React.Fragment>
                    )}

                    <div className="row">
                        <ViewText
                            label={'Kalenderitem achtergrondkleur'}
                            divSize={'col-sm-8'}
                            value={calendarBackgroundColor}
                            className={'col-sm-6 form-group'}
                            labelSize={'col-sm-10'}
                            valueSize={'col-sm-2'}
                        />
                        <span
                            className="rc-color-picker-trigger"
                            unselectable="unselectable"
                            style={{
                                backgroundColor: calendarBackgroundColor,
                                color: calendarTextColor,
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '2px 15px',
                                borderRadius: '2px',
                                width: '130px',
                                height: '30px',
                                boxShadow: '0 0 0 2px #fff inset',
                            }}
                        >
                            Kalender item
                        </span>
                    </div>

                    <div className="row">
                        <ViewText
                            label={'Kalenderitem tekstkleur'}
                            divSize={'col-sm-8'}
                            value={calendarTextColor}
                            className={'col-sm-6 form-group'}
                            labelSize={'col-sm-10'}
                            valueSize={'col-sm-2'}
                        />
                        <span
                            className="rc-color-picker-trigger"
                            unselectable="unselectable"
                            style={{
                                backgroundColor: calendarBackgroundColor,
                                color: calendarTextColor,
                                border: '1px solid #999',
                                display: 'inline-block',
                                padding: '2px 15px',
                                borderRadius: '2px',
                                width: '130px',
                                height: '30px',
                                boxShadow: '0 0 0 2px #fff inset',
                            }}
                        >
                            Kalender item
                        </span>
                    </div>
                </PanelBody>
            </Panel>
        </div>
    );
};

export default MeasureCategoryDetailsFormGeneralView;
