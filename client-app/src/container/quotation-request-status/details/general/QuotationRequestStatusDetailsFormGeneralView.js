import React from 'react';

import ViewText from '../../../../components/form/ViewText';
import Panel from '../../../../components/panel/Panel';
import PanelBody from '../../../../components/panel/PanelBody';

{
    /*todo WM: opschonen velden emailTemplateIdWf, mailCcToCoachWf en numberOfDaysToSendEmail*/
}
const QuotationRequestStatusDetailsFormGeneralView = ({
    name,
    usesWf,
    emailTemplateWorkflow,
    numberOfDaysToSendEmail,
    switchToEdit,
    explanationWf,
    mailCcToCoachWf,
    sendEmailReminder,
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

                    <div className="row">
                        <ViewText
                            label={'Verstuur herinnering'}
                            divSize={'col-sm-10'}
                            value={sendEmailReminder ? 'Ja' : 'Nee'}
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
                            {/*todo WM: opschonen velden emailTemplateIdWf, mailCcToCoachWf en numberOfDaysToSendEmail*/}
                            {/*<div className="row">*/}
                            {/*    <ViewText*/}
                            {/*        label={'Template e-mail bij deze status'}*/}
                            {/*        divSize={'col-sm-10'}*/}
                            {/*        value={emailTemplateWorkflow ? emailTemplateWorkflow.name : ''}*/}
                            {/*        className={'col-sm-10 form-group'}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="row">*/}
                            {/*    <ViewText*/}
                            {/*        label={'Aantal dagen e-mail na deze status'}*/}
                            {/*        divSize={'col-sm-10'}*/}
                            {/*        value={numberOfDaysToSendEmail}*/}
                            {/*        className={'col-sm-10 form-group'}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            {/*<div className="row">*/}
                            {/*    <ViewText*/}
                            {/*        label={'Email cc naar coach'}*/}
                            {/*        divSize={'col-sm-10'}*/}
                            {/*        value={mailCcToCoachWf ? 'Ja' : 'Nee'}*/}
                            {/*        className={'col-sm-10 form-group'}*/}
                            {/*    />*/}
                            {/*</div>*/}
                        </React.Fragment>
                    )}
                </PanelBody>
            </Panel>
        </div>
    );
};

export default QuotationRequestStatusDetailsFormGeneralView;
