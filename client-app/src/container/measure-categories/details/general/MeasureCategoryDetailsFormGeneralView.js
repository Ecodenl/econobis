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
                </PanelBody>
            </Panel>
        </div>
    );
};

export default MeasureCategoryDetailsFormGeneralView;
