import React from 'react';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

const QuotationRequestStatusDetailsFormGeneralView = ({
    name,
    usesWf,
    emailTemplateWorkflow,
    numberOfDaysToSendEmail,
    switchToEdit,
}) => {
    return (
        <div onClick={switchToEdit}>
            <Panel>
                <PanelBody>
                    <div className="row">
                        <ViewText label={'Omschrijving'} value={name} />
                    </div>
                    <div className="row">
                        <ViewText label={'Gebruikt workflow bij deze status'} value={usesWf ? 'Ja' : 'Nee'} />
                    </div>

                    {usesWf == true && (
                        <React.Fragment>
                            <div className="row">
                                <ViewText
                                    label={'Template email bij deze status'}
                                    value={emailTemplateWorkflow ? emailTemplateWorkflow.name : ''}
                                />
                            </div>
                            <div className="row">
                                <ViewText label={'Aantal dagen email na deze status'} value={numberOfDaysToSendEmail} />
                            </div>
                        </React.Fragment>
                    )}
                </PanelBody>
            </Panel>
        </div>
    );
};

export default QuotationRequestStatusDetailsFormGeneralView;
