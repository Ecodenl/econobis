import React from 'react';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const OpportunityStatusDetailsFormGeneralView = ({
    name,
    usesWf,
    emailTemplateWorkflow,
    numberOfDaysToSendEmail,
    switchToEdit,
    explanationWf,
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
                            label={'Gebruikt workflow bij deze status'}
                            divSize={'col-sm-10'}
                            value={usesWf ? 'Ja' : 'Nee'}
                            className={'col-sm-10 form-group'}
                        />
                    </div>

                    {usesWf == true && (
                        <React.Fragment>
                            <div className="row">
                                <ViewText
                                    label={'Uitleg workflow'}
                                    divSize={'col-sm-10'}
                                    value={explanationWf}
                                    className={'col-sm-10 form-group'}
                                />
                            </div>
                            <div className="row">
                                <ViewText
                                    label={'Template email bij deze status'}
                                    divSize={'col-sm-10'}
                                    value={emailTemplateWorkflow ? emailTemplateWorkflow.name : ''}
                                    className={'col-sm-10 form-group'}
                                />
                            </div>
                            <div className="row">
                                <ViewText
                                    label={'Aantal dagen email na deze status'}
                                    divSize={'col-sm-10'}
                                    value={numberOfDaysToSendEmail}
                                    className={'col-sm-10 form-group'}
                                />
                            </div>
                        </React.Fragment>
                    )}
                </PanelBody>
            </Panel>
        </div>
    );
};

export default OpportunityStatusDetailsFormGeneralView;
